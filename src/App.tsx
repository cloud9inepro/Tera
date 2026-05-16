import { useRef } from 'react'
import Scene from './components/Scene'
import UI from './components/UI'

export default function App() {
  const scrollContainerRef = useRef()

  return (
    <>
      <div style={{ height: '2000vh' }} ref={scrollContainerRef}>
        <Scene scrollContainerRef={scrollContainerRef} />
        <UI scrollContainerRef={scrollContainerRef} />
      </div>
      
      
    </>
  )
}