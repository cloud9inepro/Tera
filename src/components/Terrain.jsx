import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'



export default function Terrain() {
  const { scene } = useGLTF('/mountain/scene.gltf')
  const texture = useTexture('/mountain/textures/wire_228184153_diffuse.jpeg')
  const ref = useRef()

  
useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture
        child.material.needsUpdate = true
      }
    })
  }, [scene, texture])

//  useFrame(({ camera }) => {
//     if (!ref.current) return
//     const z = camera.position.z
//     ref.current.visible = z < -1 && z > -8
//   })

useFrame(({ camera }) => {
  if (!ref.current) return
  const z = camera.position.z
  const y = camera.position.y
  ref.current.visible = z < -1 && z > -8 && y > -0.3
})

  return (
    <primitive 
      object={scene} 
      position={[0, 0.05, -4]} 
      scale={0.001} 
      rotation={[0, 3, 0]} 
      ref={ref}
    />
  )
}