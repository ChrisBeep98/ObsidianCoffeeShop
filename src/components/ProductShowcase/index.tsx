'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ACT III: THE LIQUID GOLD (Polished)
 * Atmosphere: Peak Extraction / Alchemy.
 */
export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const bgTextLeftRef = useRef<HTMLDivElement>(null)
  const bgTextRightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. PINNING & BACKGROUND TRANSITION
      gsap.to(sectionRef.current, {
        backgroundColor: '#C9A227',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: true,
        }
      })

      // 2. BACKGROUND TEXT PARALLAX
      gsap.to(bgTextLeftRef.current, {
        y: -200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })

      gsap.to(bgTextRightRef.current, {
        y: 200,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      })

      // 3. PRODUCT IMAGE ENTRANCE
      gsap.fromTo(imageContainerRef.current,
        { y: 120, rotateY: -10, scale: 0.95, opacity: 0 },
        {
          y: 0,
          rotateY: 0,
          scale: 1,
          opacity: 1,
          ease: 'expo.out',
          duration: 2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
          }
        }
      )

      // 4. TYPOGRAPHY "IGNITION"
      const titles = gsap.utils.toArray('.ignite-text')
      titles.forEach((title: any) => {
        gsap.fromTo(title,
          { filter: 'blur(10px)', opacity: 0, y: 30 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 85%',
            }
          }
        )
      })

      // 5. MAGNETIC PHYSICS
      const handleMagnetic = (e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: 'power3.out' })
      }

      const resetMagnetic = (e: MouseEvent) => {
        const btn = e.currentTarget as HTMLElement
        gsap.to(btn, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' })
      }

      const magneticBtn = document.querySelector('.btn-gravitational')
      if (magneticBtn) {
        magneticBtn.addEventListener('mousemove', handleMagnetic as any)
        magneticBtn.addEventListener('mouseleave', resetMagnetic as any)
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen w-full py-section px-frame overflow-hidden flex items-center justify-center transition-colors duration-1000"
      style={{ backgroundColor: '#0A0A0A' }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

      {/* BACKGROUND TEXT */}
      <div ref={bgTextLeftRef} className="absolute top-0 left-4 md:left-12 opacity-[0.08] pointer-events-none select-none [writing-mode:vertical-rl] [text-orientation:mixed]">
        <span className="text-void font-mono text-[100px] md:text-[200px] font-black uppercase tracking-tighter whitespace-nowrap">
          PRECISION / MYSTERY
        </span>
      </div>
      
      <div ref={bgTextRightRef} className="absolute bottom-0 right-4 md:right-12 opacity-[0.08] pointer-events-none select-none [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
        <span className="text-void font-mono text-[100px] md:text-[200px] font-black uppercase tracking-tighter whitespace-nowrap">
          ALCHEMICAL / EXTRACTION
        </span>
      </div>

      <div ref={containerRef} className="container mx-auto grid grid-cols-12 gap-y-16 md:gap-y-0 items-center relative z-10">
        
        {/* LEFT: THE ARTIFACT */}
        <div className="col-span-12 md:col-span-6 flex justify-center perspective-[1200px]">
          <div 
            ref={imageContainerRef} 
            className="relative w-full max-w-lg aspect-[4/5] group md:translate-x-24"
          >
            <img 
              src="https://res.cloudinary.com/dnx0dmhq3/image/upload/v1769745585/Frame_1000004272_lzksxb.png" 
              alt="Obsidian Ritual Special Reserve" 
              className="w-full h-full object-contain transition-all duration-1000 scale-105 group-hover:scale-110 drop-shadow-[0_35px_60px_rgba(0,0,0,0.5)]"
            />

            {/* DECORATIVE MINI TAGS */}
            <div className="absolute top-[0%] -left-8 md:-left-16 flex items-center gap-3 transition-all duration-700">
              <span className="font-serif italic text-[13px] md:text-[14px] text-void/60 tracking-wider whitespace-nowrap">Origen Volcánico</span>
              <div className="w-8 md:w-12 h-[1px] bg-void/30 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-void/40 rotate-45"></div>
              </div>
            </div>

            <div className="absolute top-[25%] -right-8 md:-right-20 flex flex-row-reverse items-center gap-3 transition-all duration-700">
              <span className="font-serif italic text-[13px] md:text-[14px] text-void/60 tracking-wider whitespace-nowrap">Tostado Lento</span>
              <div className="w-8 md:w-12 h-[1px] bg-void/30 relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-void/40 rotate-45"></div>
              </div>
            </div>

            <div className="absolute bottom-[45%] -left-6 md:-left-12 flex items-center gap-3 transition-all duration-700">
              <span className="font-serif italic text-[13px] md:text-[14px] text-void/60 tracking-wider whitespace-nowrap">Esencia Pura</span>
              <div className="w-8 md:w-12 h-[1px] bg-void/30 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-void/40 rotate-45"></div>
              </div>
            </div>

            <div className="absolute bottom-8 right-8">
              <div className="flex flex-col items-end gap-2">
                <div className="h-[1px] bg-void/40 w-32"></div>
                <span className="text-[9px] text-void font-bold tracking-[0.5em] uppercase font-sans">Limited Reserve // 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: THE MANIFESTO */}
        <div className="col-span-12 md:col-start-8 md:col-span-5 flex flex-col gap-10 md:gap-14">
          
          <div className="flex flex-col gap-6">
            <h2 className="ignite-text text-void text-hero md:text-[9.5rem] leading-[0.8] tracking-tightest font-bold">
              Oro <br /> <span className="">Líquido</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <p className="ignite-text text-void/85 font-sans text-base md:text-2xl font-medium leading-snug tracking-wide pl-0">
              No es una bebida, es un cambio de estado. La esencia del grano volcánico liberada mediante precisión alquímica. Notas de cacao profundo, cereza negra y el eco de la tierra madre.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-4">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-void/50 uppercase tracking-widest font-black font-sans">Perfil Sensorial</span>
                <div className="h-[2px] bg-void/20 w-full"></div>
                <span className="text-void font-serif italic text-xl font-semibold">Terroso & Complejo</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-void/50 uppercase tracking-widest font-black font-sans">Intensidad Ritual</span>
                <div className="h-[2px] bg-void/20 w-full"></div>
                <span className="text-void font-serif italic text-xl font-semibold">9.4 / 10.0</span>
              </div>
            </div>
          </div>

          <div className="ignite-text pt-4">
            <button className="btn-gravitational group relative inline-flex items-center gap-8 px-16 py-8 border-2 border-void text-void font-sans text-xs uppercase tracking-[0.6em] overflow-hidden transition-all duration-500 hover:bg-void hover:text-gold">
              <span className="relative z-10 font-bold">Reclamar Legado</span>
              <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transition-transform duration-500 group-hover:translate-x-3">
                <path d="M17 1L23 7L17 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 7H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="absolute inset-0 bg-void translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1)"></div>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
