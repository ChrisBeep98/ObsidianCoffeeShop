'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSequence from '@/components/HeroSequence'
import TransmutationSection from '@/components/TransmutationSection'
import ProductShowcase from '@/components/ProductShowcase'
import TheCall from '@/components/TheCall/TheCall'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef(null)

  useEffect(() => {
    ScrollTrigger.config({ limitCallbacks: true })

    const ctx = gsap.context(() => {
      // HERO TRANSITION TIMELINE
      // Disparamos con el contenedor del Hero para que dure los 500vh exactos
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-track-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      })

      tl.to('.hero-left', { x: '-120%', opacity: 0, ease: 'power2.in' }, 0)
      tl.to('.hero-right', { x: '120%', opacity: 0, ease: 'power2.in' }, 0)
      
      tl.fromTo('.hero-center-ritual',
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 0.5, y: 0, scale: 1, duration: 0.1, ease: 'power2.out' },
        0.64
      )
      tl.fromTo('.hero-subtitle',
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 0.1, ease: 'power2.out' },
        0.64
      )
      tl.fromTo('.hero-center-hud',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.1, ease: 'power2.out' },
        0.64
      )
      
      tl.to('.hero-center-ritual', { opacity: 0, y: -40, duration: 0.1, ease: 'power2.in' }, 0.9)
      tl.to('.hero-subtitle', { opacity: 0, x: -150, duration: 0.1, ease: 'power2.in' }, 0.9)
      tl.to('.hero-center-hud', { opacity: 0, scale: 0.7, duration: 0.1, ease: 'power2.in' }, 0.9)
      
      tl.set(['.hero-center-ritual', '.hero-subtitle', '.hero-center-hud'], { opacity: 0 }, 1.0)

      // Magnetic Button Effect
      const buttons = document.querySelectorAll('.magnetic-btn')
      buttons.forEach((btn) => {
        btn.addEventListener('mousemove', (e: any) => {
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' })
        })
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
        })
      })

      // Refresh final
      ScrollTrigger.refresh()
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const isProd = process.env.NODE_ENV === 'production'
  const heroBaseUrl = isProd ? 'images/hero-sequence' : '/images/hero-sequence'

  return (
    <main ref={containerRef} className="min-h-screen bg-void selection:bg-gold selection:text-void">
      <HeroSequence 
        frameCount={162} 
        baseUrl={heroBaseUrl} 
        extension="webp" 
      >
        <div className="noise-overlay"></div>
        <div className="vignette-overlay"></div>

        <section className="relative h-full flex flex-col justify-between pb-32 pt-20 md:justify-center md:py-0 px-frame pointer-events-none">
          <div className="hero-center-ritual absolute top-0 left-0 w-full h-full flex items-start justify-center pt-32 md:pt-12 pointer-events-none opacity-0 z-0">
            <h2 className="text-cinematic-display"
                style={{ backgroundImage: 'linear-gradient(180deg, rgba(var(--color-gold-rgb), 0.6) 0%, rgba(var(--color-gold-rgb), 0) 100%)' }}>
              ORIGEN
            </h2>
          </div>

          <div className="hero-center-hud absolute top-[36%] md:top-[44%] left-[10%] md:left-[15%] flex items-center pointer-events-none opacity-0 z-0">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-md border border-gold/40 px-3 py-1.5 md:px-5 md:py-2.5 flex items-center gap-2 md:gap-3 shadow-[0_20px_50px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gold"></div>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gold rounded-full animate-pulse shadow-gold"></div>
              <span className="font-serif text-[11px] md:text-[13px] text-white tracking-[0.1em] italic capitalize">Pureza de grano</span>
            </div>
            <div className="w-12 md:w-24 h-[1px] bg-gold/50 shadow-gold"></div>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gold rounded-full shadow-gold"></div>
          </div>

          <div className="hero-subtitle absolute bottom-40 md:bottom-32 left-0 w-full pointer-events-none opacity-0 z-0">
            <div className="w-full text-center md:text-left md:px-frame md:grid md:grid-cols-12">
              <div className="md:col-start-7 md:col-span-6">
                 <h3 className="font-sans text-7xl md:text-8xl lg:text-[9rem] font-bold lowercase tracking-tighter text-bone leading-[0.8]">
                   la alquimia <br/> <span className="text-gold tracking-widest text-5xl md:text-6xl lg:text-7xl block mt-4">de lo eterno</span>
                 </h3>
              </div>
            </div>
          </div>

          <div className="hero-left w-full md:grid md:grid-cols-12 will-change-transform z-10 mt-[52px] md:mt-0">
            <div className="col-span-12 md:col-span-10">
              <h1 className="flex flex-col gap-0">
                <span className="text-hero font-medium text-bone">El Secreto</span>
                <span className="text-hero-sub md:ml-32 mt-1 md:mt-0">De La Cosecha</span>
              </h1>
            </div>
          </div>

          <div className="hero-right w-full md:grid md:grid-cols-12 will-change-transform z-10">
            <div className="col-span-12 md:col-start-9 md:col-span-3 text-left flex flex-col gap-8">
              <p className="text-body lowercase opacity-70 border-l border-gold/30 pl-4">
                cultivado bajo los estándares más exigentes, cada grano cuenta una historia de dedicación y maestría en el arte del café.
              </p>
              <div className="pl-0">
                <button className="btn-ritual magnetic-btn pointer-events-auto">
                  <span>ver catálogo</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </HeroSequence>

      {/* ACT II: The Transmutation Triptych */}
      <div className="relative z-20 bg-void">
        <TheCall />

        {/* ACT III: The Liquid Gold Product Showcase */}
        <ProductShowcase />
      </div>
    </main>
  )
}
