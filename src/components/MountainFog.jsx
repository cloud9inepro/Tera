import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'


export default function MountainFog() {
  const cloud1 = useRef()
  const cloud2 = useRef()
  const cloud3 = useRef()
  const texture = useTexture('/fog.png')

  useFrame(({ camera }) => {
    const z = camera.position.z
    const visible = z < -1 && z > -8

    if (cloud1.current) {
      cloud1.current.visible = visible
      cloud1.current.position.x += 0.003
      if (cloud1.current.position.x > 15) cloud1.current.position.x = -15
    }
    if (cloud2.current) {
      cloud2.current.visible = visible
      cloud2.current.position.x += 0.005
      if (cloud2.current.position.x > 15) cloud2.current.position.x = -15
    }
    if (cloud3.current) {
      cloud3.current.visible = visible
      cloud3.current.position.x += 0.002
      if (cloud3.current.position.x > 15) cloud3.current.position.x = -15
    }
  })

  return (
    <>
      <mesh ref={cloud1} position={[-5, -1, -3]}>
        <planeGeometry args={[12, 6]} />
        <meshBasicMaterial map={texture} transparent opacity={1} depthWrite={false} />
      </mesh>
      <mesh ref={cloud2} position={[0, -1.5, -4]}>
        <planeGeometry args={[15, 7]} />
        <meshBasicMaterial map={texture} transparent opacity={1} depthWrite={false} />
      </mesh>
      <mesh ref={cloud3} position={[5, -2, -5]}>
        <planeGeometry args={[10, 5]} />
        <meshBasicMaterial map={texture} transparent opacity={1} depthWrite={false} />
      </mesh>
    </>
  )
}