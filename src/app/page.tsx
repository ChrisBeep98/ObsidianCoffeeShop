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
          ease: 'power2.out',
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
      // Magnetic Button Effect
      const buttons = document.querySelectorAll('.magnetic-btn')
      buttons.forEach((btn) => {
        btn.addEventListener('mousemove', (e: any) => {
          const rect = btn.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2
          
          gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out'
          })
        })
        
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          })
        })
      })

      // HERO TRANSITION TIMELINE
      // Synchronized with the 400% scroll distance of the HeroSequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body', // We trigger from top
          start: 'top top',
          end: '+=400%', // Matches the HeroSequence pin duration
          scrub: 1,
        }
      })

      // 1. Texts depart to sides
      tl.to('.hero-left', { x: '-120%', opacity: 0, ease: 'power2.in' }, 0)
      tl.to('.hero-right', { x: '120%', opacity: 0, ease: 'power2.in' }, 0)
      
      // 2. Central Ritual Word Reveals
      // Starts halfway through the departure
      tl.fromTo('.hero-center-ritual', 
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 0.2, y: 0, duration: 0.5, ease: 'power1.out' },
        0.5 // Start at 50% of the timeline
      )
      
      // 3. Fade out the Ritual word just before unpinning
      tl.to('.hero-center-ritual', { opacity: 0, scale: 1.1, duration: 0.2 }, 0.8)

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
          scrub: 1,
        },
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.normalizeScroll(false)
      if (!isMobile) {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen bg-void selection:bg-gold selection:text-void">
      <HeroSequence 
        frameCount={162} 
        baseUrl="/images/hero-sequence" 
        extension="webp" 
      >
        <section className="relative h-full flex items-center px-frame pointer-events-none">
          {/* Central Ritual Word (Top Section - Massive & Subtle) */}
          <div className="hero-center-ritual absolute inset-0 flex items-start justify-center pointer-events-none opacity-0 z-0 pt-6">
            <h2 className="text-[19vw] font-serif font-bold tracking-[0.2em] select-none leading-none bg-gradient-to-b from-gold to-black bg-clip-text text-transparent">
              ORIGEN
            </h2>
          </div>

          <div className="grid grid-cols-12 w-full relative z-10">
            {/* Title Section (Up) */}
            <div className="hero-left col-span-12 md:col-span-10 md:-mt-32 will-change-transform">
              <h1 className="flex flex-col gap-0">
                <span className="text-hero font-medium text-bone">
                  El Secreto
                </span>
                <span className="font-sans text-2xl md:text-5xl lg:text-6xl tracking-[0.3em] md:tracking-[0.5em] text-gold uppercase font-extrabold md:ml-32 mt-4 md:mt-0">
                  De La Cosecha
                </span>
              </h1>
            </div>

            {/* Paragraph Section (Column 9 to 11, Align Left) */}
            <div className="hero-right col-span-12 md:col-start-9 md:col-span-3 text-left self-end md:mb-[-120px] flex flex-col gap-8 will-change-transform">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-cherry block opacity-100">
                  // Notas de Origen
                </span>
                <p className="text-body lowercase opacity-70 border-l border-gold/30 pl-4">
                  cultivado bajo los estándares más exigentes, cada grano cuenta una historia de dedicación y maestría en el arte del café.
                </p>
              </div>
              
              <div className="pl-0 mt-8">
                <button className="btn-ritual magnetic-btn pointer-events-auto">
                  <span>ver catálogo</span>
                  <svg 
                    width="18" 
                    height="14" 
                    viewBox="0 0 18 14" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current"
                  >
                    <path d="M1 7H17M17 7L11 1M17 7L11 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </HeroSequence>

      {/* Content Sections */}
      <div className="relative z-20 bg-void">
        <section className="min-h-screen flex items-center justify-center px-frame py-section reveal-container">
          <div className="max-w-2xl text-center">
            <h2 className="reveal-text text-title mb-6">La Alquimia de lo Puro</h2>
            <p className="reveal-text text-body">
              Cada experiencia de alta gama debe tener un arco narrativo. Participamos en un ritual antiguo donde la precisión se encuentra con el misterio de la tierra.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-frame py-section bg-charcoal/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="reveal-text p-10 bg-charcoal border border-bone/5 hover:border-gold/20 transition-colors duration-500">
                <span className="text-label mb-6 block opacity-60">Rito. 0{i}</span>
                <h3 className="text-title text-2xl mb-6">El Proceso</h3>
                <p className="text-body text-sm opacity-60">
                  Desde la selección manual del grano hasta el tostado preciso que libera el alma de la cosecha en cada taza.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA-like Section */}
        <section className="h-[70vh] flex flex-col items-center justify-center bg-gold text-void px-frame">
          <span className="font-sans text-xs tracking-[0.6em] uppercase mb-8">Comienza la experiencia</span>
          <h2 className="text-hero text-6xl md:text-[10rem] text-center">EL RITUAL</h2>
        </section>
      </div>
    </main>
  )
}