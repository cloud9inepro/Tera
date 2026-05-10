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
import { Color, MathUtils } from 'three'
import MountainFog from './MountainFog'
import Jungle from './Jungle'



gsap.registerPlugin(ScrollTrigger);



const cameraProxy = { z: 6, y: 0 }
  

  function CameraRig() {
    const {camera, scene} = useThree()

    useFrame(()=> {
      camera.position.z = cameraProxy.z
      camera.position.y = cameraProxy.y

      if (camera.position.z < -1) {
        scene.background = new Color('#aab8ce')
      } else {
        scene.background = null
      } if (camera.position.y < -2) {
        scene.background = new Color('#727c88')
      } if (camera.position.y < -4) {
        scene.background = new Color('#022b6d')
      }
    })
    return null
  }

export default function Scene({ scrollContainerRef }) {
  

useEffect(()=>{
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollContainerRef.current, 
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      // snap: {
      //   snapTO: 'labels',
      //   duration: 0.5,
      //   ease: 'power2.inOut'
      // }
    }
  })
  tl.addLabel('exosphere')
    .to(cameraProxy, {z: 2, y: 0, duration: 1})
    .addLabel('atmosphere')
    .to(cameraProxy, {z: -2, y: 0, duration: 1})
    .addLabel('mountain')
    .to(cameraProxy, {z: -2, y: -4, duration: 1})
    .addLabel('jungle')
    .to(cameraProxy, {z: -2, y: -10, duration: 1})
    .addLabel('underwater')
    .to(cameraProxy, { z: -10, y: -10, duration: 1 })
    .addLabel('core')
    return()=>{
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
}, [])

  return (
    <div  ref={scrollContainerRef}>
  <Canvas
    className="!fixed !top-0 !left-0 !w-full !h-full"
    camera={{ position: [0, 0, 9], fov: 65 }} 
    gl={{ powerPreference: 'high-performance', antialias: true, useLegacyLights: false }}
  >
        <CameraRig  />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <StarField/>
        <Planet/>
        <Effects/>
        <Atmosphere/>
        <Environment files="/puresky.hdr" environmentIntensity={0.1} />
        <Terrain/>
        <MountainFog/>
        <Jungle/>
        {/* <OrbitControls/> */}
        {/* <fog attach="fog" args={['#b0bec5', 5, 20]} /> */}
      </Canvas>
      
    </div>

    
  )
}