/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 ./public/models/diorama_house/scene.gltf -o ./src/components/HouseDiorama.jsx --shadows -T -r 
Files: ./public/models/diorama_house/scene.gltf [17.45KB] > scene-transformed.glb [1.67MB] (-9451%)
Author: Pau Torres (https://sketchfab.com/Stir17)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/house-diorama-ab85a249815b4d14b5b9a4c60efdb821
Title: House Diorama
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function HouseDiorama(props) {
  const { nodes, materials } = useGLTF("/models/diorama_house.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ESTRUCTURA_Material_#16_0"].geometry}
        material={materials.Material_16}
        position={[20.739, -1.029, -33.435]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.374, 1.378, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["DETALLES_Material_#19_0"].geometry}
        material={materials.Material_19}
        position={[-13.783, -1.408, 152.73]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["CABLEADO_Material_#20_0"].geometry}
        material={materials.Material_20}
        position={[94.157, 237.578, -13.495]}
        rotation={[-2.007, 0, 0]}
        scale={0.309}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["TEJAS_Material_#18_0"].geometry}
        material={materials.Material_18}
        position={[-31.781, 0.704, 101.378]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.154, 1, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["MADERAS_Material_#17_0"].geometry}
        material={materials.Material_17}
        position={[28.325, -53.293, -33.435]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.297, 1.49, 1.294]}
      />
    </group>
  );
}

useGLTF.preload("/models/diorama_house.glb");
