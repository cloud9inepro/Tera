import { PointMaterial } from "@react-three/drei";
import React, { useMemo } from "react";
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

  

function PointsComponent() {
  const ref = useRef()
  
  const points = useMemo(() => {
  const temp = []
    

  for (let i = 0; i < 5000; i++) {
    const radius = 50 + Math.random() * 250  // minimum 50 units away
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    
    temp.push(radius * Math.sin(phi) * Math.cos(theta)) // x
    temp.push(radius * Math.sin(phi) * Math.sin(theta)) // y
    temp.push(radius * Math.cos(phi))                   // z
  }
  return new Float32Array(temp)
}, [])

 useFrame(({ camera }) => {
    if (!ref.current) return
    ref.current.visible = camera.position.z > -1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}

        />
      </bufferGeometry>
      <PointMaterial size={0.11} color="#fff" depthWrite={false}  depthTest={true}/>
    </points>
  );
}

export default PointsComponent;