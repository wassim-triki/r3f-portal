import {
  CameraControls,
  Environment,
  Gltf,
  Html,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useNavigate, useParams } from "react-router-dom";
import { useSnapshot } from "valtio";
import state from "../store";

export const Experience = () => {
  const { scene } = useThree();
  const snap = useSnapshot(state);

  const objectOneRef = useRef(null);
  const spotLightOneRef = useRef(null);

  const objectTwoRef = useRef(null);
  const spotLightTwoRef = useRef(null);

  const objectThreeRef = useRef(null);
  const spotLightThreeRef = useRef(null);

  useEffect(() => {
    if (objectTwoRef.current && spotLightTwoRef.current) {
      spotLightTwoRef.current.target = objectTwoRef.current;
    }
    if (objectThreeRef.current && spotLightThreeRef.current) {
      spotLightThreeRef.current.target = objectThreeRef.current;
    }
    if (objectOneRef.current && spotLightOneRef.current) {
      spotLightOneRef.current.target = objectOneRef.current;
    }
  }, [spotLightTwoRef, spotLightThreeRef, spotLightOneRef]);
  useEffect(() => {
    state.objectOneRef = objectOneRef;
    state.objectTwoRef = objectTwoRef;
    state.objectThreeRef = objectThreeRef;
  }, [objectTwoRef, objectThreeRef, objectOneRef]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      <Rig />

      <Frame
        position-x={-2.5}
        rotation-y={degToRad(45)}
        name={"01"}
        id="01"
        bg="#9DD7E5"
      >
        <Gltf
          src="/models/cartoon_house.glb"
          name="house-01"
          scale={0.25}
          position={[0, 0.08, -1]}
          rotation-y={degToRad(45)}
          castShadow
          ref={objectOneRef}
        />
        <mesh position={[0, -1.002, -1.5]} rotation-x={-1.57} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#62D1DF" />
        </mesh>
        <spotLight
          ref={spotLightOneRef}
          castShadow
          args={["#fff", 0.4, 10, degToRad(40), 0.5, 0.6]}
          position={[1, 2, -2]}
        />
      </Frame>
      <Frame position-x={0} name={"02"} id="02" bg="#E8A663">
        <Gltf
          src="/models/diorama_house2.glb"
          name="house-02"
          scale={0.05}
          position={[0, -1, -2.5]}
          rotation-y={0.5}
          castShadow
          ref={objectTwoRef}
        />
        <mesh position={[0, -1.002, -1.5]} rotation-x={-1.57} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f7883d" />
        </mesh>
        <spotLight
          ref={spotLightTwoRef}
          castShadow
          args={["#fff", 0.4, 10, degToRad(40), 0.5, 0.6]}
          position={[-2, 3, -0.5]}
        />
      </Frame>

      <Frame
        position-x={2.5}
        rotation-y={degToRad(-45)}
        name={"03"}
        id="03"
        // bg="#5381B1"
        bg="#EC5D99"
      >
        <Gltf
          src="/models/sugarcube_corner.glb"
          name="house-03"
          // scale={0.13}
          scale={0.16}
          position={[0, -1.02, -1.5]}
          // rotation-y={degToRad(0)}
          rotation-y={degToRad(60)}
          castShadow
          ref={objectThreeRef}
        />
        <mesh position={[0, -1.002, -1.5]} rotation-x={-1.57} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial
            color="#ef476f"
            // color="#4F6F87"
          />
        </mesh>
        <spotLight
          ref={spotLightThreeRef}
          castShadow
          args={["#fff", 0.5, 10, degToRad(40), 0.5, 0.6]}
          position={[-2, 3, 1]}
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

  useFrame((_state, delta) => {
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
        <RoundedBox name={`rounded-box-${id}`} args={[2, 3, 0.1]}>
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

const Rig = ({}) => {
  const { controls, scene } = useThree();
  const { id } = useParams();
  const snap = useSnapshot(state);

  useEffect(() => {
    const frame = scene.getObjectByName(id);

    let modelLocalPosition = new THREE.Vector3(0, 0, 0);
    let defaultPosition = new THREE.Vector3(0, 0, 4);
    let modelWorldPosition = new THREE.Vector3();
    let framePosition = new THREE.Vector3();
    let focus = new THREE.Vector3();

    // Use the refs to get the GLTF object's world position directly
    switch (id) {
      case "01":
        state.objectOneRef?.current?.getWorldPosition(modelLocalPosition);
        break;
      case "02":
        state.objectTwoRef?.current?.getWorldPosition(modelLocalPosition);
        break;
      case "03":
        state.objectThreeRef?.current?.getWorldPosition(modelLocalPosition);
        break;
      default:
        break;
    }

    // Define a focus point relative to the gltf position if needed
    // let focus = gltfPosition.clone().add(new THREE.Vector3(0, 0, -2));
    let targetPosition;

    if (frame && snap.inPortal) {
      targetPosition = new THREE.Vector3();
      const offset = new THREE.Vector3(0, 0.5, 3);
      frame.getWorldPosition(framePosition);
      const angle = Math.PI - frame.parent.rotation.y;
      const z = -1 * (Math.cos(angle) * modelLocalPosition.z);
      const x = Math.sin(angle) * modelLocalPosition.z + framePosition.x;
      modelWorldPosition.add(new THREE.Vector3(x, 0, z));

      targetPosition.add(modelWorldPosition);
      targetPosition.add(offset);

      frame.parent.localToWorld(focus.set(0, 0, modelLocalPosition.z));
    }
    if (targetPosition) {
      controls?.setLookAt(
        ...targetPosition.toArray(),
        ...focus.toArray(),
        true
      );
    } else {
      controls?.setLookAt(
        ...defaultPosition.toArray(),
        ...focus.toArray(),
        true
      );
    }
  }, [id, controls, snap]);

  return (
    <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
  );
};
