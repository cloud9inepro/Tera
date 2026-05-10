import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function UI({ scrollContainerRef }) {
  const titleRef = useRef()
   const wrapperRef = useRef()
   const cloudOverlayRef = useRef()


useEffect(() => {
  if (!scrollContainerRef.current) return

  let ctx = gsap.context(() => {
    // 1. The Title - Finished by 40%
    gsap.to(titleRef.current, {
      opacity: 0,
      scale: 8,
      ease: 'power1.in',
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        start: 'top top',
        end: '40% top', // <--- This is the magic line
        scrub: 1,
        onLeave: () => gsap.set(titleRef.current, { visibility: 'hidden' }),
        onEnterBack: () => gsap.set(titleRef.current, { visibility: 'visible' }),
      }
    })

    // 2. The Wrapper / Bottom Text
    gsap.to(wrapperRef.current, {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: scrollContainerRef.current,
        // If you want the bottom text to stay until the very end:
        start: '80% top',
        end: 'bottom bottom',
        scrub: true,
      }
    })
  })

  return () => ctx.revert()
}, [scrollContainerRef])

useEffect(() => {
  if (!scrollContainerRef.current) return

  ScrollTrigger.create({
    trigger: scrollContainerRef.current,
    start: 'bottom bottom',
    onEnter: () => {
      console.log(cloudOverlayRef.current)
      gsap.timeline()
        .to(cloudOverlayRef.current, {
          opacity: 1,
          x: '0%',
          duration: 1.2,
          ease: 'power2.inOut'
        })
        .to(cloudOverlayRef.current, {
          x: '100%',
          duration: 1.2,
          ease: 'power2.inOut',
          delay: 0.3
        })
    }
  })
}, [scrollContainerRef])

  return (
    <div className="fixed inset-0 text-white z-10 pointer-events-none" ref={wrapperRef}>
      <div ref={titleRef} className="absolute right-16 top-1/2 -translate-y-1/2">
        <h1 className="text-3xl font-bold">Explore Planet Tera</h1>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-sm italic opacity-70">Scroll to Explore</p>
      </div>

      <div 
  ref={cloudOverlayRef}
  className="fixed inset-0 z-50 pointer-events-none"
  style={{
    backgroundImage: 'url(/cloud.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // transform: 'translateX(-100%)',
    background: 'white',
    opacity: 0
  }}
/>
    </div>

    
  )
}