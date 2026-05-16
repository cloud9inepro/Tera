import { useGLTF, useTexture } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Text } from '@react-three/drei'

export default function Terrain() {
  const { scene } = useGLTF('/mountain/scene.gltf')
  const texture = useTexture('/mountain/textures/wire_228184153_diffuse.jpeg')
  const ref = useRef()
  const [isVisible, setIsVisible] = useState(false)
  
useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture
        child.material.needsUpdate = true
      }
    })
  }, [scene, texture])


const { viewport } = useThree()
const fontSize = viewport.width < 5 ? 0.29 : viewport.width < 8 ? 0.28 : 0.40

const htmlRef = useRef()
useFrame(({ camera }) => {
  if (!ref.current) return
  const z = camera.position.z
  const y = camera.position.y
  const active = z < -1 && z > -8 && y > -0.3

  ref.current.visible = active
  if (active !== isVisible) setIsVisible(active)

  
})

  return (
  <>
  <primitive 
      object={scene} 
      position={[0, 0.05, -4]} 
      scale={0.001} 
      rotation={[0, 3, 0]} 
      ref={ref}
    />
    
   

    <Text
  position={[0, 0.8, -6]}
  fontSize={fontSize}
  color="white"
  anchorX="center"
  anchorY="middle"
  visible={isVisible}
>
  Conquer The Peak
</Text>
    
  </>
    
  )
}