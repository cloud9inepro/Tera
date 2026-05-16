import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import StarField from './Starfield'
import Planet from './Planet'
import Effects from './Effects'
import Atmosphere from './Atmosphere'
import Terrain from './Terrain'
import { Environment } from '@react-three/drei'
import { Color, MathUtils } from 'three'
import MountainFog from './MountainFog'
import Jungle from './Jungle'
import Underwater from './Underwater'
import * as THREE from 'three'


gsap.registerPlugin(ScrollTrigger);



const cameraProxy = { z: 6, y: 0 }
  

  function CameraRig() {
    const {camera, scene} = useThree()

    useFrame(()=> {
      camera.position.z = cameraProxy.z
      camera.position.y = cameraProxy.y
      camera.position.x = 0
      camera.rotation.set(0, 0, 0)  // lock all rotation
  camera.quaternion.set(0, 0, 0, 1) 

      if (camera.position.z < -1) {
        scene.background = new Color('#aab8ce')
      } else {
        scene.background = null
      } if (camera.position.y < -2) {
        scene.background = new Color('#727c88')
       } if (camera.position.y < -4.5) {
         scene.background = new Color('#0d2137')
       } 
    })
    return null
  }

export default function Scene({ scrollContainerRef }) {
  

useEffect(()=>{
  console.log('scrollContainerRef:', scrollContainerRef.current)
  console.log('scroll height:', scrollContainerRef.current?.scrollHeight)
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
    .to(cameraProxy, {z: -3, y: -8, duration: 1})
    .addLabel('underwater_enter')
    .to(cameraProxy, { z: -8, y: -11, duration: 1 })
    .addLabel('underwater_fish1')
    .to(cameraProxy, { z: -15, y: -8, duration: 1 })
    .addLabel('underwater_fish2')
    .to(cameraProxy, { z: -20, y: -11, duration: 1 })
    .addLabel('underwater_fish3')
    .to(cameraProxy, { z: -25, y: -7, duration: 1 })
    return()=>{
      tl.kill()
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
}, [])

  return (
    <div  ref={scrollContainerRef}>
  <Canvas
    dpr={[1, 2]}
    style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    camera={{ position: [0, 0, 9], fov: 65 }} 
    gl={{ powerPreference: 'high-performance', antialias: true, useLegacyLights: false, alpha: true }}
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
        <Underwater/>
      </Canvas>
      
    </div>

    
  )
}