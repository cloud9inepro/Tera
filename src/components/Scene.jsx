import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StarField from './Starfield'
import Planet from './Planet'
import Effects from './Effects'
import Atmosphere from './Atmosphere'
import Terrain from './Terrain'
import { OrbitControls } from '@react-three/drei'
import { Environment } from '@react-three/drei'
import { Color } from 'three'
import MountainFog from './MountainFog'

gsap.registerPlugin(ScrollTrigger);

function CameraRig({ targetZ }) {
  const { camera, gl, scene } = useThree()

  useFrame(() => {
    camera.position.z += (targetZ.current - camera.position.z) * 0.05

       if (camera.position.z < -1) {
      scene.background = new Color('#b0bec5')
    } else {
      scene.background = null
    }
  })

  return null
}


export default function Scene({ scrollContainerRef }) {
  const targetZ = useRef(6)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        targetZ.current = gsap.utils.mapRange(0, 1, 6, -12, self.progress)
        targetZ.current = Math.max(-2, targetZ.current)
      }
    })

    return () => trigger.kill()
  }, [])

  return (
    <div  ref={scrollContainerRef}>
  <Canvas
    className="!fixed !top-0 !left-0 !w-full !h-full"
    camera={{ position: [0, 0, 9], fov: 65 }} 
    gl={{ powerPreference: 'high-performance', antialias: true, useLegacyLights: false }}
  >
        <CameraRig targetZ={targetZ} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <StarField/>
        <Planet/>
        <Effects/>
        <Atmosphere/>
        <Environment files="/puresky.hdr" environmentIntensity={0.1} />
        <Terrain/>
        <MountainFog/>
        {/* <OrbitControls/> */}
        {/* <fog attach="fog" args={['#b0bec5', 5, 20]} /> */}
      </Canvas>
      
    </div>
  )
}