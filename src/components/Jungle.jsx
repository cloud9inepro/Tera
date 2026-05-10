import { useGLTF, useTexture } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'



export default function Jungle() {
const { scene } = useGLTF('/tropical.glb')
const { scene: scene2 } = useGLTF('/tropicalPlant.glb')


const trees = useMemo(() => {
  const positions = [
    // { position: [-8, -5, -10], rotation: [0, 0, 0], scale: 1 },
    // { position: [-4, -5, -12], rotation: [0, 1, 0], scale: 1.2 },
    // { position: [0, -5, -14], rotation: [0, 2, 0], scale: 0.9 },
    // { position: [4, -5, -12], rotation: [0, 0.5, 0], scale: 1.1 },
    // { position: [8, -5, -10], rotation: [0, 1.5, 0], scale: 1 },
    // { position: [-6, -5, -8], rotation: [0, 3, 0], scale: 0.8 },
    // { position: [6, -5, -8], rotation: [0, 2.5, 0], scale: 1.3 },
    { position: [0, -5, -9], rotation: [0, 1, 0], scale: 0.9 },
  ]
  
  return positions.map(p => ({
    scene: SkeletonUtils.clone(scene),
    ...p
  }))
}, [scene])


const plants = useMemo(() => {
  const positions = [
    { position: [-4, -5, -11], rotation: [0, 0, 0], scale: 0.9 },
    { position: [-2, -5, -5], rotation: [0, 1.5, 0], scale: 1 },
    { position: [-10, -5, -12], rotation: [0, 2, 0], scale: 0.8 },
    { position: [2.5, -5, -6], rotation: [0, 0.5, 0], scale: 1.1 },
  ]
  
  return positions.map(p => ({
    scene: SkeletonUtils.clone(scene2),
    ...p
  }))
}, [scene2])







const groupRef = useRef()

useFrame(({ camera }) => {
  if (!groupRef.current) return
  groupRef.current.visible = camera.position.y < -1
})

// useEffect(() => {
//   trees.forEach(tree => {
//     tree.scene.traverse((child) => {
//       if (child.isMesh) {
//         if (child.material) {
//           child.material.envMapIntensity = 1
//           if (child.material.map) {
//             child.material.alphaTest = 0.5
//             child.material.transparent = true
//             child.material.side = THREE.DoubleSide
//             child.material.needsUpdate = true
//           }
//         }
//       }
//     })
//   })
// }, [trees])


return (
  <group ref={groupRef}>
    {trees.map((tree, i) => (
      <primitive
        key={i}
        object={tree.scene}
        position={tree.position}
        rotation={tree.rotation}
        scale={tree.scale}
      />

    ))}
    
     {plants.map((plant, i) => (
  <primitive
    key={i}
    object={plant.scene}
    position={plant.position}
    rotation={plant.rotation}
    scale={plant.scale}
  />
))}

<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, -10]}>
  <planeGeometry args={[40, 20]}/>
  <meshStandardMaterial color="#2d5a1b" side={THREE.DoubleSide}/>
</mesh>
    
  </group>

  
)
}