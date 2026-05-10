import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Billboard } from '@react-three/drei'

export default function MountainFog() {
  const meshRefs = useRef([])
  const texture = useTexture('/fog.png')

  const clouds = useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        -1 + (Math.random() - 0.5) * 2,
        -3 + (Math.random() - 0.5) * 4
      ],
      speed: 0.001 + Math.random() * 0.004,
      scale: 3 + Math.random() * 5
    }))
  }, [])

  // useFrame(({ camera }) => {
  //   const z = camera.position.z
  //   meshRefs.current.forEach((mesh, i) => {
  //     if (!mesh) return
  //     mesh.visible = z < -1 && z > -8
  //     mesh.position.x += clouds[i].speed
  //     if (mesh.position.x > 15) mesh.position.x = -15
  //   })
  // })

  useFrame(({ camera }) => {
  const z = camera.position.z
  const y = camera.position.y

  meshRefs.current.forEach((mesh, i) => {
    if (!mesh) return
    
    // show clouds during mountain zone and as camera starts descending
    mesh.visible = z < -1 && z > -8 && y > -3
    mesh.position.x += clouds[i].speed
    if (mesh.position.x > 15) mesh.position.x = -15
  })
})

  return (
    <>
      {clouds.map((cloud, i) => (
        <Billboard key={i} position={cloud.position}>
          <mesh ref={el => meshRefs.current[i] = el}>
            <planeGeometry args={[cloud.scale, cloud.scale * 0.5]} />
            <meshBasicMaterial map={texture} transparent opacity={0.6} depthWrite={false} />
          </mesh>
        </Billboard>
      ))}
    </>
  )
}