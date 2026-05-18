import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'

export default function Effects() {
  const bloomRef = useRef()
  const noiseRef = useRef()

  // useFrame(({ camera }) => {
  // if (!bloomRef.current) return

  // const z = camera.position.z
  // const y = camera.position.y

  // if (y < -6) {
  //   // underwater - check this FIRST
  //   bloomRef.current.intensity = 1.5
  //   if (noiseRef.current) noiseRef.current.opacity = 1
  //  } else if (z < -1) {
  //   bloomRef.current.intensity = 0
  //   if (noiseRef.current) noiseRef.current.opacity = 0
  // } else {
  //   bloomRef.current.intensity = MathUtils.clamp(
  //     MathUtils.mapLinear(z, 6, 2, 0.2, 3),
  //     0, 3
  //   )
  //   if (noiseRef.current) noiseRef.current.opacity = 0
  // }
// })

  return (
    <EffectComposer>
      <Bloom ref={bloomRef} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      <Noise ref={noiseRef} opacity={0} />
    </EffectComposer>
  )
}