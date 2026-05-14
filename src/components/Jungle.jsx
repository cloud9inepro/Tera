import { useGLTF, useTexture } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
// import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function Jungle() {
const { scene: scene1 } = useGLTF('/tropical.glb')
const { scene: scene2 } = useGLTF('/tropicalPlant.glb')
// const floorTexture = useTexture('/textures/forrest_ground.jpg')
const props = useTexture({
  map: '/textures/forrest_ground.jpg',
  normalMap: '/textures/forrest_ground_01_nor.jpg',
  roughnessMap: '/textures/forrest_ground_01_rough.jpg',
  aoMap: '/textures/forrest_ground_01_ao.jpg',
  displacementMap: '/textures/forrest_ground_01_disp.jpg'
})


const trees = useMemo(() => {
  const positions = [
    // { position: [-8, -5, -10], rotation: [0, 0, 0], scale: 1 },
    // { position: [-4, -5, -12], rotation: [0, 1, 0], scale: 1.2 },
    // { position: [0, -5, -14], rotation: [0, 2, 0], scale: 0.9 },
    // { position: [4, -5, -12], rotation: [0, 0.5, 0], scale: 1.1 },
    // { position: [8, -5, -10], rotation: [0, 1.5, 0], scale: 1 },
    // { position: [-6, -5, -8], rotation: [0, 3, 0], scale: 0.8 },
    // { position: [6, -5, -8], rotation: [0, 2.5, 0], scale: 1.3 },
    { position: [0, -5, -9], rotation: [0, 1, 0], scale: 0.9 },
  ]
  
  return positions.map(p => ({
    scene: SkeletonUtils.clone(scene1),
    ...p
  }))
}, [scene1])


const plants = useMemo(() => {
  const positions = [
    { position: [-4, -5, -11], rotation: [0, 0, 0], scale: 0.9 },
    { position: [-2, -5, -5], rotation: [0, 1.5, 0], scale: 1 },
    { position: [-10, -5, -12], rotation: [0, 2, 0], scale: 0.8 },
    { position: [2.5, -5, -6], rotation: [0, 0.5, 0], scale: 1.1 },
  ]
  
  return positions.map(p => ({
    scene: SkeletonUtils.clone(scene2),
    ...p
  }))
}, [scene2])







const groupRef = useRef()
const htmlRef = useRef()

useFrame(({ camera }) => {
  if (!groupRef.current) return
  groupRef.current.visible = camera.position.y < -1 && camera.position.y > -5

  const isVisible = camera.position.y < -1 && camera.position.y > -5
  groupRef.current.visible = isVisible
  if (htmlRef.current){
    htmlRef.current.style.display = isVisible ? 'block' : 'none'
  }
})


useEffect(()=>{
  Object.values(props).forEach((tex) => {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(1, 1)
  })
}, [props])



return (
  <group ref={groupRef}>
    {trees.map((tree, i) => (
      <primitive
        key={i}
        object={tree.scene}
        position={tree.position}
        rotation={tree.rotation}
        scale={tree.scale}
      />

    ))}
    
     {plants.map((plant, i) => (
  <primitive
    key={i}
    object={plant.scene}
    position={plant.position}
    rotation={plant.rotation}
    scale={plant.scale}
  />
))}



<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.1, -10]}>
  <planeGeometry args={[40, 20, 64, 64]}/>
  <meshStandardMaterial  side={THREE.DoubleSide} {...props} displacementScale={0.2}/>
  
</mesh>


{/* <Html ref={htmlRef} transform center position={[0, 0, -10]}  distanceFactor={5}>
    <div className='text-white text-5xl font-extrabold md:flex md:w-screen '>
      Explore the Beauty <br/> of Planet Tera
    </div>

    <div className='text-white '>
      From lush forests to hidden islands, <br/> experience the world like never before.
    </div>
</Html> */}
  </group>

)
}

// color="#2d5a1b"