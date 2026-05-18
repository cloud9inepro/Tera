import { useRef, useEffect } from 'react'
import Scene from './components/Scene'
import UI from './components/UI'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


export default function App() {
  const scrollContainerRef = useRef()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <div style={{ height: '2000vh' }} ref={scrollContainerRef}>
        <Scene scrollContainerRef={scrollContainerRef} />
        <UI scrollContainerRef={scrollContainerRef} />
      </div>
    </>
  )
}