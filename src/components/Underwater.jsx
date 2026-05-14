import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { Sparkles } from '@react-three/drei'
// import { EffectComposer,Bloom,Noise,} from "@react-three/postprocessing"
import { Html } from '@react-three/drei'
import * as THREE from 'three'

export default function Underwater() {
  const groupRef = useRef()
  // const htmlRef = useRef()
  const alienRef = useRef()
  const koiRef = useRef()
  const schoolRef = useRef()
 const direction = useRef(1)
const posX = useRef(0)
const rot = useRef(0)

const props = useTexture({
  map: '/seaTextures/Stylized_Sand_001_basecolor.jpg',
  normalMap: '/seaTextures/Stylized_Sand_001_normal.jpg',
  roughnessMap: '/seaTextures/Stylized_Sand_001_roughness.jpg',
  aoMap: '/seaTextures/Stylized_Sand_001_ambientOcclusion.jpg',
  displacementMap: '/seaTextures/Stylized_Sand_001_height.png'
})

  const {scene: rock} = useGLTF('/sea_rock.glb')
  console.log(rock)

  const { scene: alienScene, animations: alienAnims } = useGLTF('/alienFish.glb')
  const { scene: koiScene, animations: koiAnims } = useGLTF('/koiFish.glb')
  const { scene: schoolScene, animations: schoolAnims } = useGLTF('/fishSchool.glb')

  const { actions: alienActions } = useAnimations(alienAnims, alienRef)
  const { actions: koiActions } = useAnimations(koiAnims, koiRef)
  const { actions: schoolActions } = useAnimations(schoolAnims, schoolRef)
  useEffect(() => {
    Object.values(alienActions || {}).forEach(a => a?.play())
    Object.values(koiActions || {}).forEach(a => a?.play())
    Object.values(schoolActions || {}).forEach(a => a?.play())
  }, [alienActions, koiActions, schoolActions])

  useFrame(({camera }) => {
    if (!groupRef.current) return
    const z = camera.position.z
    groupRef.current.visible = z < -1.7 && z > -22

  //    const isVisible = camera.position.y < -5
  // groupRef.current.visible = isVisible
  // if (htmlRef.current){
  //   htmlRef.current.style.display = isVisible ? 'block' : 'none'
  // }


    
    // if (alienRef.current) {
    //   posX.current += 0.01 * direction.current
    //   alienRef.current.position.x = posX.current
    //   if (posX.current > 8) {
    //     direction.current = -1
    //   } else if (posX.current < -8) {
    //     direction.current = 1
    //   }
    // }

    // if (koiRef.current) {
    //   rot.current += 0.01
    //   koiRef.current.position.x = rot.current
    // }
      
  })

  // useEffect(()=>{
  //   Object.values(props).forEach((tex) => {
  //     tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  //     tex.repeat.set(1, 1)
  //   })
  // }, [props])

  return (
    <group ref={groupRef}>
      <group ref={alienRef} position={[0, -12, -40]}>
        <primitive object={alienScene}  scale={1.5} rotation={[0, 0.8, 0]}/>
      </group>
      <group ref={koiRef} position={[0, -12, -30]}>
        <primitive object={koiScene}  scale={1} />
      </group>
      <group ref={schoolRef}>
        <primitive object={schoolScene} position={[0, -12, -16]} scale={1} />
      </group>
      <Sparkles 
  count={300}
  scale={[20, 10, 20]}
  position={[0, -7, -16]}
  size={2}
  speed={0.3}
  color="#88ccff"
/>

    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -14, 0]}>
      <planeGeometry args={[64, 64, 128, 128]}/>
      <meshStandardMaterial  side={THREE.DoubleSide} {...props} displacementScale={0.2}/>
      
    </mesh>

    <primitive
      object={rock}
      position={[0, -13, -16]}
      scale={33}
      rotation={[0, 4.7, 0]}
    />

      {/* <Html ref={htmlRef}  position={[0, -12, -20]} transform>
          <div className='text-blue-500'>
            hello
          </div>
      </Html> */}

    </group>
  )
}