import * as THREE from 'three'
import { useRef, useEffect, useState, useMemo } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { Sparkles } from '@react-three/drei'
import { Selection, Select, EffectComposer, Bloom, Noise, } from "@react-three/postprocessing"
import { Text } from '@react-three/drei'
import { shaderMaterial } from '@react-three/drei'
import vertexShader from '../shaders/water.vert'
import fragmentShader from '../shaders/water.frag'
import { Caustics } from '@react-three/drei'
import { Float, Sphere } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useThree } from '@react-three/fiber'

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
extend({ WaterMaterial })


export default function Underwater() {
  const groupRef = useRef()
  const htmlRef = useRef()
  const alienRef = useRef()
  const koiRef = useRef()
  const schoolRef = useRef()
  const materialRef = useRef()
  const topMaterialRef = useRef()




  const props = useTexture({
    map: '/seaTextures/Stylized_Sand_001_basecolor.jpg',
    normalMap: '/seaTextures/Stylized_Sand_001_normal.jpg',
    roughnessMap: '/seaTextures/Stylized_Sand_001_roughness.jpg',
    aoMap: '/seaTextures/Stylized_Sand_001_ambientOcclusion.jpg',
    displacementMap: '/seaTextures/Stylized_Sand_001_height.png'
  })

  const { scene: rock } = useGLTF('/sea_rock.glb')
  const { scene: coral } = useGLTF('/coral.glb')
  const { scene: coral1 } = useGLTF('/coral_piece.glb')

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


  // coral red
  const corals = useMemo(() => {
    const positions = [
      { position: [-2, -14, -15.4], rotation: [0, 2.5, 0], scale: 0.17 },
      { position: [0, -14, -12], rotation: [0, 1, 0], scale: 0.09, color: "#ffffff" },
    ]

    return positions.map(p => ({
      scene: SkeletonUtils.clone(coral),
      ...p
    }))
  }, [coral])

  // coral purple
  const coralPieces = useMemo(() => {
    const positions = [
      { position: [3, -14, -15], rotation: [0, 2.5, 0], scale: 0.9 },
      { position: [-8, -14, -25], rotation: [0, 1, 0], scale: 1.3, },
    ]

    return positions.map(p => ({
      scene: SkeletonUtils.clone(coral1),
      ...p
    }))
  }, [coral1])



const [active, setActive] = useState(false)
const [isUnderwater, setIsUnderwater] = useState(false)

useFrame((state) => {
  // 1. Guard clause for the main group reference
  if (!groupRef.current) return

  const { camera, clock } = state
  const z = camera.position.z
  const y = camera.position.y

  // 2. Visibility Logic
  // Combined the strict 'z' range from your first block with the 'z < -1.7' from the others.
  // Note: 'z < -1.7 && z > -34' naturally satisfies 'z < -1.7'.
  groupRef.current.visible = z < -1.7 && z > -34

  // 3. Underwater State Logic
  const underwater = y < -6
  if (underwater !== isUnderwater) {
    setIsUnderwater(underwater)
  }

  // 4. Material Uniform/Time Updates
  const elapsedTime = clock.getElapsedTime()
  
  if (materialRef.current) {
    materialRef.current.uTime = elapsedTime
  }
  if (topMaterialRef.current) {
    topMaterialRef.current.uTime = elapsedTime
  }
})

  // const [active, setActive] = useState(false)
  // useFrame(({ camera }) => {
  //   if (!groupRef.current) return
  //   const z = camera.position.z
  //   groupRef.current.visible = z < -1.7 && z > -22

  //   //    const isVisible = camera.position.y < -5
  //   // groupRef.current.visible = isVisible
  //   // if (htmlRef.current){
  //   //   htmlRef.current.style.display = isVisible ? 'block' : 'none'
  //   // }

  // })

  // const [isUnderwater, setIsUnderwater] = useState(false)

  // useFrame(({ camera }) => {
  //   if (!groupRef.current) return
  //   const z = camera.position.z
  //   const y = camera.position.y
  //   groupRef.current.visible = z < -1.7

  //   const underwater = y < -6
  //   if (underwater !== isUnderwater) setIsUnderwater(underwater)
  // })

  // useFrame((state) => {
  //   if (!groupRef.current) return
  //   const z = state.camera.position.z
  //   groupRef.current.visible = z < -1.7

  //   if (materialRef.current) {
  //     materialRef.current.uTime = state.clock.getElapsedTime()
  //   }
  // })

  // useFrame((state) => {
  //   if (materialRef.current) {
  //     materialRef.current.uTime = state.clock.getElapsedTime()
  //   }
  //   if (topMaterialRef.current) {
  //     topMaterialRef.current.uTime = state.clock.getElapsedTime()
  //   }
  // })
  const { viewport } = useThree()
  const fontSize = viewport.width < 5 ? 0.23 : viewport.width < 8 ? 0.28 : 0.40









  return (
    <group ref={groupRef}>


       //ocean top
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -6.6, 0]}>
        <planeGeometry args={[0, 0, 32, 32]} color="#005b96"/>
      </mesh> */}

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -6.6, 0]}>
        <planeGeometry args={[100, 100, 32, 32]} />
        <waterMaterial ref={topMaterialRef} transparent depthWrite={false} depthTest={true} />
      </mesh>


             //ocean floor
      {/* Sand floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -14, 0]}>
        <planeGeometry args={[100, 100, 128, 128]} />
        <meshStandardMaterial side={THREE.DoubleSide} {...props} displacementScale={0} />
      </mesh>

      {/* Caustic overlay - sits just above the floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -13.98, 0]}>
        <planeGeometry args={[64, 64, 1, 1]} />
        <waterMaterial ref={materialRef} transparent depthWrite={false} depthTest={true}  />
      </mesh>


   //rock
      <primitive
        object={rock}
        position={[0, -15, -25]}
        scale={33}
        rotation={[0, 4.7, 0]}
      />

    //coral
      {corals.map((coral, i) => (
        <primitive
          key={i}
          object={coral.scene}
          position={coral.position}
          rotation={coral.rotation}
          scale={coral.scale}
          color={coral.color}
        />

      ))}

      //coral1 coral piece
      {coralPieces.map((coral1, i) => (
        <primitive
          key={i}
          object={coral1.scene}
          position={coral1.position}
          rotation={coral1.rotation}
          scale={coral1.scale}
          color={coral1.color}
        />

      ))}



      //fish models
      <group ref={alienRef} position={[0, -12, -40]}>
        <primitive object={alienScene} scale={1.5} rotation={[0, 0.8, 0]} />
      </group>
      <group ref={koiRef} position={[0, -12, -30]}>
        <primitive object={koiScene} scale={1} />
      </group>
      <group ref={schoolRef}>
        <primitive object={schoolScene} position={[0, -12, -16]} scale={1} />
      </group>



     //ocean particle
      <Sparkles
        count={300}
        scale={[20, 10, 20]}
        position={[0, -13, -16]}
        size={2}
        speed={0.3}
        color="#88ccff"
      />

          // ocean text
      <Text
        ref={htmlRef}
        position={[0, -10.8, -13]}
        fontSize={fontSize}
        color="#d9faff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
        textAlign='center'
      // outlineWidth={0.02}
      // outlineColor="black"
      >
        Tera's Ocean Unmapped, Uncharted
        {/* <waterMaterial/> */}
      </Text>



      <Text ref={htmlRef}
        position={[0, -12, -24]}
        color="#d9faff"
        anchorX="center"
        anchorY="middle"
        textAlign='center'
      >

        Depth 3,000ft

      </Text>


      <Text
        position={[5, -12, -47]}
        rotation={[0, -Math.PI / 4, 0]}
        fontSize={0.8}
        color="#d9faff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
        textAlign='center'
      >
        The Abyss No LIght, No Return
      </Text>


      {/* noise and bloom  */}
      {isUnderwater && (
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} />
          <Noise opacity={0.03} premultiplied />
        </EffectComposer>
      )}


      <fogExp2 attach="fog" color="#0a1628" density={0.12} />
    </group>

  )
}

useGLTF.preload('/sea_rock.glb')
useGLTF.preload('/coral.glb')
useGLTF.preload('/coral_piece.glb')