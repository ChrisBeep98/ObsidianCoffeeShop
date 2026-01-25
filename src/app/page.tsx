'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSequence from '@/components/HeroSequence'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const boxRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // Enable GSAP smooth scrolling features
    ScrollTrigger.normalizeScroll(true)
    ScrollTrigger.config({ limitCallbacks: true })

    // Custom Keyboard Smoother (Version 1)
    const scrollProxy = { y: window.scrollY }
    const handleKeyDown = (e: KeyboardEvent) => {
      const isSpace = e.key === ' ' || e.key === 'Space'
      const isUp = e.key === 'ArrowUp' || e.key === 'PageUp'
      const isDown = e.key === 'ArrowDown' || e.key === 'PageDown' || isSpace

      if (isUp || isDown) {
        e.preventDefault()
        const scrollStep = (e.key.includes('Page') || isSpace) ? window.innerHeight * 0.8 : 150
        
        scrollProxy.y = window.scrollY
        const targetY = isDown 
          ? window.scrollY + scrollStep 
          : window.scrollY - scrollStep

        gsap.to(scrollProxy, {
          y: targetY,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
          onUpdate: () => window.scrollTo(0, scrollProxy.y)
        })
      }
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown, { passive: false })
    }

    const ctx = gsap.context(() => {
      gsap.to(boxRef.current, {
        rotate: 360,
        duration: 2,
        repeat: -1,
        ease: 'none',
      })

      gsap.from('.reveal-text', {
        opacity: 0,
        y: 100,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.reveal-container',
          start: 'top 90%',
          end: 'top 20%',
          scrub: 1, // Follows scroll with inertia
        },
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.normalizeScroll(false)
    }
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen">
      <HeroSequence 
        frameCount={162} 
        baseUrl="/images/hero-sequence" 
        extension="webp" 
      />

      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-24">
        <h1 className="text-6xl font-bold mb-8">Next.js + GSAP</h1>
        <div 
          ref={boxRef}
          className="w-32 h-32 bg-orange-500 rounded-2xl flex items-center justify-center text-black font-bold"
        >
          GSAP
        </div>
        <p className="mt-12 text-zinc-400">Scroll down to see more</p>
      </section>

      {/* Content Section */}
      <section className="h-screen flex items-center justify-center bg-zinc-900 text-white p-24 reveal-container">
        <div className="max-w-2xl text-center">
          <h2 className="reveal-text text-4xl font-bold mb-6">Native GSAP Scroll</h2>
          <p className="reveal-text text-xl text-zinc-400">
            Now using GSAP ScrollTrigger for global scroll normalization and high-performance animations.
          </p>
        </div>
      </section>

      {/* Another Section */}
      <section className="h-screen flex items-center justify-center bg-zinc-800 text-white p-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="reveal-text p-8 bg-zinc-700 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Feature {i}</h3>
              <p className="text-zinc-300">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer-like Section */}
      <section className="h-[50vh] flex items-center justify-center bg-orange-500 text-black p-24">
        <h2 className="text-5xl font-black italic">COFFEE SHOP 2</h2>
      </section>
    </main>
  )
}