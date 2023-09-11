import {
  CameraControls,
  Environment,
  Html,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store";
import { HouseAbandoned } from "./HouseAbandoned";
import { HouseDiorama } from "./HouseDiorama";
import { HouseCar } from "./HouseCar";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      <Rig />

      <Frame
        position-x={-2.5}
        rotation-y={0.7}
        name={"01"}
        id="01"
        bg="#E3D7A1"
      >
        <FrameScene
          color="#ffd166"
          object={HouseCar}
          scale={0.3}
          position={[0, -0.5, -1.5]}
          rotation-y={degToRad(-45)}
        />
      </Frame>
      <Frame position-x={0} name={"02"} id="02" bg="#EC5D99">
        <FrameScene
          color="#ef476f"
          object={HouseDiorama}
          scale={0.004}
          position={[0, -0.5, -1.5]}
        />
      </Frame>

      <Frame
        position-x={2.5}
        rotation-y={-0.7}
        name={"03"}
        id="03"
        bg="#B7BACB"
      >
        <FrameScene
          color="#A8A3A5"
          object={HouseAbandoned}
          scale={0.15}
          position={[0, -0.5, -1.5]}
          rotation-y={degToRad(-45)}
        />
      </Frame>
    </>
  );
};

const FrameScene = ({ color = "#fff", object: Object, ...props }) => {
  const targetRef = useRef(null);
  const spotLightRef = useRef(null);
  const defaultTarget = new THREE.Vector3(0, 0, 0);
  useEffect(() => {
    if (targetRef.current && spotLightRef.current) {
      spotLightRef.current.target = targetRef.current;

      console.log(spotLightRef.current);
    }
  }, [targetRef.current, spotLightRef.current]);
  return (
    <>
      {/* <mesh ref={targetRef} position={[0, -0.5, -1]} castShadow>
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh> */}
      <Object {...props} />
      <spotLight
        castShadow
        ref={spotLightRef}
        args={["#fff", 0.3, 7, degToRad(80), 0.5, 0.6]}
        position={[1, 1.5, -2]}
      />
      <spotLight
        castShadow
        ref={spotLightRef}
        args={["#fff", 0.3, 7, degToRad(80), 0.5, 0.6]}
        position={[-1, 1.5, -2]}
      />
      <spotLight
        castShadow
        ref={spotLightRef}
        args={["#fff", 0.3, 7, degToRad(80), 0.5, 0.5]}
        position={[0, 1.5, 1]}
      />
      <mesh position={[0, -0.52, -1.5]} rotation-x={-1.57} receiveShadow>
        <planeGeometry args={[20, 20]} />
        {/* <meshBasicMaterial color={color} /> */}
        <meshStandardMaterial color={color} />
      </mesh>
    </>
  );
};
function degToRad(deg) {
  return deg * (Math.PI / 180);
}

const Frame = ({ children, texture, name, id, bg = "#000", ...props }) => {
  // const map = useTexture(texture);

  const portalRef = useRef(null);

  const sphereMeshRef = useRef(null);

  const navigate = useNavigate();

  const params = useParams();

  const isActive = params.id === id;

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    navigate(`/item/${id}`);
  };

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  useFrame((_state, delta) => {
    console.log("frame");
    easing.damp(portalRef.current, "blend", isActive ? 1 : 0, 0.2, delta);

    // Calculate the target scale based on isActive
    const large = new THREE.Vector3(100, 100, 100);
    const small = new THREE.Vector3(0.1, 0.1, 0.1);
    const defaultScale = new THREE.Vector3(5, 5, 5);

    if (isActive) {
      easing.damp3(sphereMeshRef.current.scale, large, 1, delta);
    } else {
      easing.damp3(sphereMeshRef.current.scale, defaultScale, 0.2, delta);
    }
  });

  const [hovering, setHovering] = useState(false);

  useCursor(hovering);
  return (
    <group {...props}>
      <Text
        font="/fonts/Poppins/Poppins-Medium.ttf"
        // color={"black"}
        fontSize={0.5}
        position={[-0.2, 0.75, 0.051]} // modified x and y based on the dimensions of RoundedBox
        anchorX={"right"}
        anchorY={"bottom"}
      >
        {name}
      </Text>

      <mesh
        name={id}
        onDoubleClick={handleDoubleClick}
        onPointerEnter={(e) => setHovering(true)}
        onPointerLeave={(e) => setHovering(false)}
      >
        {/* <planeGeometry args={[2, 3]} /> */}
        <RoundedBox args={[2, 3, 0.1]}>
          <MeshPortalMaterial
            ref={portalRef}
            // blend={id === params.id ? 1 : 0}
            side={THREE.DoubleSide}
          >
            <Environment preset="sunset" />
            <ambientLight intensity={0.5} />

            {children}
            <mesh ref={sphereMeshRef}></mesh>
            <color attach="background" args={[bg]} />
          </MeshPortalMaterial>
        </RoundedBox>
      </mesh>
    </group>
  );
};

const Rig = ({
  position = new THREE.Vector3(0, 0, 4),
  focus = new THREE.Vector3(0, 0, 0),
}) => {
  const { controls, scene } = useThree();
  const { id } = useParams();
  useEffect(() => {
    const frame = scene.getObjectByName(id);
    if (frame) {
      frame.parent.localToWorld(position.set(0, 0.5, 0.25));
      frame.parent.localToWorld(focus.set(0, 0, -2));
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
  }, [id, controls]);
  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
};
