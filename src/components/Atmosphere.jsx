import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'
import { useTexture } from '@react-three/drei'



export default function Atmosphere() {
  const matRef = useRef()
const mat2Ref = useRef()
const mat3Ref = useRef()

const cloudTexture = useTexture('/cloud.png')

  useFrame(({ camera }) => {
    if (!matRef.current) return

    const z = camera.position.z
    // console.log('Camera Z:', z)
    
    matRef.current.opacity = MathUtils.clamp(MathUtils.mapLinear(z, 2, 0, 0, 1), 0, 1)
mat2Ref.current.opacity = MathUtils.clamp(MathUtils.mapLinear(z, 1, -1, 0, 0.5), 0, 0.5)
mat3Ref.current.opacity = MathUtils.clamp(MathUtils.mapLinear(z, 0, -2, 0, 1), 0, 1)
  })

 return (
  <>
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial ref={matRef} map={cloudTexture} transparent={true} opacity={0} />
    </mesh>
    <mesh position={[1, 0, -1]}>
      <planeGeometry args={[4, 4]} />
      <meshBasicMaterial ref={mat2Ref} map={cloudTexture} transparent={true} opacity={0} />
    </mesh>
    <mesh position={[-1, 0, -2]}>
      <planeGeometry args={[4, 4]} />
      <meshBasicMaterial ref={mat3Ref} map={cloudTexture} transparent={true} opacity={0} />
    </mesh>
  </>
)
}