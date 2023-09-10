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

const Frame = ({ children, texture, name, id, ...props }) => {
  const map = useTexture(texture);

  const portalRef = useRef(null);

  const sphereMeshRef = useRef(null);

  const navigate = useNavigate();

  const params = useParams();

  const isActive = params.id === id;

  const handleDoubleClick = (e) => {
    e.stopPropagation();
    navigate(`/item/${id}`);
  };

  useEffect(() => {
    console.log(sphereMeshRef.current);
  }, [sphereMeshRef.current]);
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

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
        <MeshPortalMaterial
          ref={portalRef}
          // blend={id === params.id ? 1 : 0}
          side={THREE.DoubleSide}
        >
          <Environment preset="sunset" />
          {/* <ambientLight intensity={0.5} /> */}

          {children}
          <mesh ref={sphereMeshRef}>
            <sphereGeometry args={[1, 64, 64]} />
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
    console.log(id);
  }, [id, controls]);
  return <CameraControls makeDefault />;
};
