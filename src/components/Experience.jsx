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
import { Stone } from "./Stone";
import { useLayoutEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

export const Experience = () => {
  const [aciveFrame, setActiveFrame] = useState(null);

  const scene = useThree((state) => state.scene);
  const cameraCtrlsRef = useRef(null);

  useLayoutEffect(() => {
    if (aciveFrame) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(aciveFrame).getWorldPosition(targetPosition);
      cameraCtrlsRef.current.setLookAt(
        0,
        0.5,
        1,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      cameraCtrlsRef.current.setLookAt(0, 0, 4, 0, 0, 0, true);
    }
  }, [aciveFrame]);
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />

      {/* <OrbitControls /> */}
      <CameraControls ref={cameraCtrlsRef} />
      <Frame
        texture={"/textures/ionia.jpg"}
        position-x={-2.5}
        rotation-y={0.7}
        aciveFrame={aciveFrame}
        setActiveFrame={setActiveFrame}
        name={"fuck"}
      >
        <mesh position-y={-0.8}>
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
      >
        <mesh position-y={-0.8}>
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
      >
        <mesh position-y={-0.8}>
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
  ...props
}) => {
  const map = useTexture(texture);

  const isActive = aciveFrame === name;

  const portalRef = useRef(null);

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
        name={name}
        radius={0.1}
        onDoubleClick={() => setActiveFrame(isActive ? null : name)}
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
