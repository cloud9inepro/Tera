import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useFrame } from '@react-three/fiber'
import { MathUtils } from 'three'


export default function Planet() {
  const { scene, animations } = useGLTF("/earth1k.glb");
  
  const { actions } = useAnimations(animations, scene);
  
  
  useEffect(() => { 
      if (actions && actions["Clouds|CloudsAction"]) {
      actions['Clouds|CloudsAction'].play();
    }
  }, [actions]);



  const meshRef = useRef()

  useFrame(({ camera }) => {
  if (!meshRef.current) return

  const z = camera.position.z

  // move from left to center as camera goes from Z 6 to Z 2
  meshRef.current.position.x = MathUtils.clamp(
    MathUtils.mapLinear(z, 6, 2, -3, 0),
    -3, 0
  )

  // rotate on Y axis as camera approaches
  meshRef.current.rotation.y = MathUtils.clamp(
    MathUtils.mapLinear(z, 6, 2, 0, Math.PI * 2),
    0, Math.PI * 2
  )

    meshRef.current.visible = z > -1
//   const scale = MathUtils.clamp(
//   MathUtils.mapLinear(z, 6, 2, 0.004, 0.007),
//   0.004, 0.007
// )

// meshRef.current.scale.set(scale, scale, scale)
})
  return <primitive object={scene} scale={0.0032} position={[-3.5, -1, -2]} ref={meshRef} />;
}
useGLTF.preload("/earth1k.glb")