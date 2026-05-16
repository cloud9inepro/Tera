import * as THREE from 'three'
import { useRef, useEffect, useState } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { Sparkles } from '@react-three/drei'
import { Selection, Select, EffectComposer,Bloom,Noise,} from "@react-three/postprocessing"
import { Html } from '@react-three/drei'
import { shaderMaterial } from '@react-three/drei'
import vertexShader from '../shaders/water.vert'
import fragmentShader from '../shaders/water.frag'
import { Caustics } from '@react-three/drei'
import { Float, Sphere } from '@react-three/drei'

const WaterMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uColor: new THREE.Color('#005b96'),
    uLightColor: new THREE.Color('#b3e5fc'),
  },
  vertexShader,
  fragmentShader
)
extend({WaterMaterial})

export default function Underwater() {
  const groupRef = useRef()
  // const htmlRef = useRef()
  const alienRef = useRef()
  const koiRef = useRef()
  const schoolRef = useRef()
const materialRef = useRef()
const topMaterialRef = useRef()

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
  const { scene: coral} = useGLTF('/coral.glb')

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


  const [ active, setActive] = useState(false)
  useFrame(({camera }) => {
    if (!groupRef.current) return
    const z = camera.position.z
    groupRef.current.visible = z < -1.7 && z > -22

  //    const isVisible = camera.position.y < -5
  // groupRef.current.visible = isVisible
  // if (htmlRef.current){
  //   htmlRef.current.style.display = isVisible ? 'block' : 'none'
  // }

  
      
  })

useFrame((state) => {
  if (!groupRef.current) return
  const z = state.camera.position.z
  groupRef.current.visible = z < -1.7

  if (materialRef.current) {
    materialRef.current.uTime = state.clock.getElapsedTime()
  }
})

useFrame((state) => {
  if (materialRef.current) {
    materialRef.current.uTime = state.clock.getElapsedTime()
  }
  if (topMaterialRef.current) {
    topMaterialRef.current.uTime = state.clock.getElapsedTime()
  }
})

  return (
    <group ref={groupRef}>


       //ocean top 
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6.6, 0]}>
        <planeGeometry args={[0, 0, 32, 32]} color="#005b96"/>
        {/* <waterMaterial ref={materialRef} transparent side={THREE.DoubleSide}/> */}
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6.6, 0]}>
  <planeGeometry args={[64, 64, 32, 32]}/>
  <waterMaterial ref={topMaterialRef} transparent side={THREE.DoubleSide}/>
</mesh>
    

             //ocean floor
    {/* Sand floor */}
<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -14, 0]}>
  <planeGeometry args={[100, 100, 128, 128]}/>
  <meshStandardMaterial side={THREE.DoubleSide} {...props} displacementScale={0}/> 
</mesh>

{/* Caustic overlay - sits just above the floor */}
<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -13.98, 0]}>
  <planeGeometry args={[64, 64, 1, 1]}/>
  <waterMaterial ref={materialRef} transparent depthWrite={false} />
</mesh>

   //rock
    <primitive
      object={rock}
      position={[0, -15, -25]}
      scale={33}
      rotation={[0, 4.7, 0]}
    />

    //coral
    <primitive
      object={coral}
      position={[0, -14, -12]}
      scale={0.09}
      rotation={[0, 0, 0]}
    />



      //fish models
      <group ref={alienRef} position={[0, -12, -40]}>
        <primitive object={alienScene}  scale={1.5} rotation={[0, 0.8, 0]}/>
      </group>
      <group ref={koiRef} position={[0, -12, -30]}>
        <primitive object={koiScene}  scale={1} />
      </group>
      <group ref={schoolRef}>
        <primitive object={schoolScene} position={[0, -12, -16]} scale={1} />
      </group>

      

     //ocean particle
      <Sparkles 
  count={300}
  scale={[20, 10, 20]}
  position={[0, -12, -16]}
  size={2}
  speed={0.3}
  color="#88ccff"
/>
   
          // ocean text
      {/* <Html ref={htmlRef}  position={[0, -12, -20]} transform>
          <div className='text-blue-500'>
            hello
          </div>
      </Html> */}

         
    
    </group>
    
  )
}