/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ./public/models/car_house/scene.gltf -o ./src/components/HouseCar.jsx --shadows -T -r 
Files: ./public/models/car_house/scene.gltf [627.8KB] > scene-transformed.glb [78.74KB] (87%)
Author: Baydinman (https://sketchfab.com/baydinman)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/car-house-55df368a6980426b84e50d313b89b3ee
Title: Car House
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function HouseCar(props) {
  const { nodes, materials } = useGLTF("/models/car_house.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001_White_0.geometry}
        material={materials.PaletteMaterial001}
        position={[-1.301, 2.022, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.64}
      />
      <instancedMesh
        args={[
          nodes.Cube014_Material028_0.geometry,
          materials.PaletteMaterial001,
          103,
        ]}
        castShadow
        receiveShadow
        instanceMatrix={nodes.Cube014_Material028_0.instanceMatrix}
      />
      <instancedMesh
        args={[nodes.Cube034__0.geometry, materials.PaletteMaterial001, 174]}
        castShadow
        receiveShadow
        instanceMatrix={nodes.Cube034__0.instanceMatrix}
      />
    </group>
  );
}

useGLTF.preload("/models/car_house.glb");
