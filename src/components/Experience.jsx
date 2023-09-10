import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Text,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const Experience = () => {
  const [aciveFrame, setActiveFrame] = useState(null);

  const scene = useThree((state) => state.scene);
  const cameraCtrlsRef = useRef(null);

  // useLayoutEffect(() => {
  //   if (aciveFrame) {
  //     const targetPosition = new THREE.Vector3();
  //     scene.getObjectByName(aciveFrame).getWorldPosition(targetPosition);
  //     cameraCtrlsRef.current.setLookAt(
  //       0,
  //       0.5,
  //       1,
  //       targetPosition.x,
  //       targetPosition.y,
  //       targetPosition.z,
  //       true
  //     );
  //   } else {
  //     cameraCtrlsRef.current.setLookAt(0, 0, 4, 0, 0, 0, true);
  //   }
  // }, [aciveFrame]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      {/* <OrbitControls /> */}
      {/* <CameraControls ref={cameraCtrlsRef} /> */}

      <Rig />

      <Frame
        texture={"/textures/ionia.jpg"}
        position-x={-2.5}
        rotation-y={0.7}
        aciveFrame={aciveFrame}
        setActiveFrame={setActiveFrame}
        name={"fuck"}
        id="01"
      >
        <mesh position={[0, -1, -1.5]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </Frame>
      <Frame
        texture={"/textures/desert.jpeg"}
        position-x={0}
        aciveFrame={aciveFrame}
        setActiveFrame={setActiveFrame}
        name={"this"}
        id="02"
      >
        <mesh position={[0, -1, -1.5]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </Frame>
      <Frame
        texture={"/textures/purple.jpeg"}
        position-x={2.5}
        rotation-y={-0.7}
        aciveFrame={aciveFrame}
        setActiveFrame={setActiveFrame}
        name={"shit"}
        id="03"
      >
        <mesh position={[0, -1, -1.5]}>
          <boxGeometry />
          <meshNormalMaterial />
        </mesh>
      </Frame>
    </>
  );
};

const Frame = ({
  children,
  texture,
  aciveFrame,
  setActiveFrame,
  name,
  id,
  ...props
}) => {
  const map = useTexture(texture);

  const isActive = aciveFrame === name;

  const portalRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDoubleClick = (e) => {
    // e.stopPropagation();
    navigate(`/item/${id}`);
  };

  useFrame((_state, delta) => {
    easing.damp(portalRef.current, "blend", isActive ? 1 : 0, 0.2, delta);
  });
  return (
    <group {...props}>
      <Text
        font="/fonts/Poppins/Poppins-Medium.ttf"
        // color={"black"}
        fontSize={0.5}
        position={[0, 0.75, 0.051]} // modified x and y based on the dimensions of RoundedBox
        anchorX={"right"}
        anchorY={"bottom"}
      >
        {name}
      </Text>

      <RoundedBox
        args={[2, 3, 0.1]}
        name={id}
        // name={name}

        radius={0.1}
        onDoubleClick={handleDoubleClick}
      >
        <MeshPortalMaterial ref={portalRef} side={THREE.DoubleSide}>
          <Environment preset="sunset" />
          {/* <ambientLight intensity={0.5} /> */}

          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

const Rig = ({
  position = new THREE.Vector3(0, 0, 5),
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
    console.log(controls, frame?.parent.position);
  }, [id, controls]);
  return <CameraControls makeDefault />;
};
