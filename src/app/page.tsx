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
      // Starts at 64% as requested
      tl.fromTo('.hero-center-ritual', 
        { scale: 0.95, opacity: 0, y: 30 },
        { scale: 1, opacity: 0.5, y: 0, duration: 0.7, ease: 'power2.out' },
        0.64
      )
      
      tl.fromTo('.hero-subtitle',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out' },
        0.7 // Slightly staggered after ORIGEN starts at 64%
      )
      
      // HUD Reveal
      tl.fromTo('.hero-center-hud',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' },
        0.75
      )
      
      // 3. Fade out the Ritual word just before unpinning
      tl.to('.hero-center-ritual', { opacity: 0, y: -20, duration: 0.4 }, 0.95)
      tl.to('.hero-subtitle', { opacity: 0, y: -20, duration: 0.4 }, 0.95)
      tl.to('.hero-center-hud', { opacity: 0, scale: 1.1, duration: 0.4 }, 0.95)

      gsap.to(boxRef.current, {
        rotate: 360,
        duration: 2,
        repeat: -1,
        ease: 'none',
      })

      // Improved Reveal Animation for Editorial Sections
      const revealContainers = document.querySelectorAll('.reveal-container')
      revealContainers.forEach((container) => {
        const texts = container.querySelectorAll('.reveal-text')
        
        ScrollTrigger.create({
          trigger: container,
          start: 'top 80%',
          onEnter: () => {
            texts.forEach((text, i) => {
              gsap.delayedCall(i * 0.15, () => {
                text.classList.add('active')
              })
            })
          }
        })
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
        {/* Cinematic Overlays (Hero Only) */}
        <div className="noise-overlay"></div>
        <div className="vignette-overlay"></div>

        <section className="relative h-full flex items-center px-frame pointer-events-none">
          {/* Central Ritual Word (Absolute Top Center) */}
          <div className="hero-center-ritual absolute top-0 left-0 w-full h-full flex items-start justify-center pt-12 pointer-events-none opacity-0 z-0">
            <h2 className="text-[18vw] leading-none font-serif font-bold tracking-[0.15em] select-none text-transparent bg-clip-text"
                style={{ 
                  backgroundImage: 'linear-gradient(180deg, rgba(201, 162, 39, 0.4) 0%, rgba(201, 162, 39, 0) 100%)',
                  filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))'
                }}>
              ORIGEN
            </h2>
          </div>

          {/* Floating Chip Marker (Left, Maximum Contrast) */}
          <div className="hero-center-hud absolute top-[48%] left-[15%] flex items-center pointer-events-none opacity-0 z-0">
            {/* The Chip */}
            <div className="bg-[#0A0A0A] border border-gold/40 px-5 py-2.5 flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,1)] relative overflow-hidden">
              {/* Left Accent Bar */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gold"></div>
              
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse shadow-[0_0_12px_rgba(201,162,39,0.9)]"></div>
              <span className="font-serif text-[13px] text-white tracking-[0.1em] italic first-letter:capitalize">
                Pureza de grano
              </span>
            </div>
            
            {/* The Pointing Line */}
            <div className="w-24 h-[1px] bg-gold/50 shadow-[0_0_8px_rgba(201,162,39,0.4)]"></div>
            
            {/* The Target Dot */}
            <div className="w-2.5 h-2.5 bg-gold rounded-full shadow-[0_0_20px_rgba(201,162,39,1)]"></div>
          </div>

          {/* Subtitle Message (Columns 8-12, Bottom Right) */}
          <div className="hero-subtitle absolute bottom-20 md:bottom-32 w-full px-frame pointer-events-none opacity-0 z-0">
            <div className="grid grid-cols-12 w-full">
              <div className="col-span-12 md:col-start-7 md:col-span-6 text-left">
                 <h3 className="font-sans text-6xl md:text-8xl lg:text-[9rem] font-bold lowercase tracking-tighter text-bone leading-[0.8]"
                     style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}>
                   la alquimia <br/> <span className="text-gold tracking-widest text-4xl md:text-6xl lg:text-7xl block mt-4">de lo eterno</span>
                 </h3>
              </div>
            </div>
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
        <section className="min-h-screen px-frame py-section reveal-container">
          <div className="grid grid-cols-12 w-full gap-y-20">
            {/* Philosophical Header */}
            <div className="col-span-12 md:col-span-6">
              <span className="text-label mb-8 block">// El Manifiesto</span>
              <h2 className="reveal-text text-hero text-6xl md:text-8xl lg:text-9xl leading-none">
                La Alquimia <br/> <span className="text-gold">de lo Puro</span>
              </h2>
            </div>

            {/* Narrative Paragraph (Asymmetrical Placement) */}
            <div className="col-span-12 md:col-start-7 md:col-span-5 self-end">
              <p className="reveal-text text-body border-l border-gold/20 pl-8">
                Cada experiencia de alta gama debe tener un arco narrativo. Participamos en un ritual antiguo donde la precisión se encuentra con el misterio de la tierra. No es solo café; es una transición de estado, un momento donde el tiempo se detiene para revelar la esencia del grano.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section (The Ledger) */}
        <section className="px-frame py-section bg-charcoal/20 reveal-container">
          <div className="flex flex-col gap-0 border-t border-bone/10">
            {[
              { id: 'I', title: 'Selección de Altura', desc: 'Granos cultivados a más de 1,800 metros sobre el nivel del mar.' },
              { id: 'II', title: 'Tueste de Precisión', desc: 'Control térmico por sensores para liberar el perfil exacto de sabor.' },
              { id: 'III', title: 'Molienda Diamantada', desc: 'Uniformidad absoluta para una extracción perfecta y controlada.' }
            ].map((item, i) => (
              <div key={i} className="reveal-text mask-reveal border-b border-bone/10 py-12 grid grid-cols-12 items-center hover:bg-gold/5 transition-colors duration-700 group">
                <span className="col-span-1 font-serif text-2xl text-gold/60">{item.id}</span>
                <h3 className="col-span-11 md:col-span-4 text-title text-3xl group-hover:translate-x-4 transition-transform duration-500">{item.title}</h3>
                <p className="col-span-12 md:col-start-7 md:col-span-6 text-body text-sm opacity-40">
                  {item.desc}
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