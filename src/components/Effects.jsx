import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'




export default function Effects() {
  const bloomRef = useRef()

  useFrame(({ camera }) => {
    if (!bloomRef.current) return

    const z = camera.position.z

    bloomRef.current.intensity = MathUtils.clamp(
      MathUtils.mapLinear(z, 6, 2, 0.2, 3),
      0.2, 3
    )

    if (z < -1) {
      bloomRef.current.intensity = 0
    } else {
      bloomRef.current.intensity = MathUtils.clamp(
        MathUtils.mapLinear(z, 6, 2, 0.2, 3),
        0, 3
      )
    } 
  })

  return (
    <EffectComposer>
      <Bloom ref={bloomRef} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
    </EffectComposer>
  )
}