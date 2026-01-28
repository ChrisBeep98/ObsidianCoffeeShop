'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ACTS = [
  {
    id: 'nigredo',
    step: '01',
    title: 'NIGREDO',
    subtitle: 'Materia Oscura',
    desc: 'El origen. 1,850 metros sobre el nivel del mar. Suelos volcánicos donde el misterio de la tierra se concentra en cada grano.',
    img: 'https://images.unsplash.com/photo-1611162458324-a22863a72596?q=80&w=2560&auto=format&fit=crop',
    align: 'md:flex-row'
  },
  {
    id: 'albedo',
    step: '02',
    title: 'ALBEDO',
    subtitle: 'Purificación',
    desc: 'El proceso. Tueste de precisión para liberar los aceites esenciales, transformando la densidad en pura luz aromática.',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2560&auto=format&fit=crop',
    align: 'md:flex-row-reverse'
  },
  {
    id: 'rubedo',
    step: '03',
    title: 'RUBEDO',
    subtitle: 'Oro Líquido',
    desc: 'La extracción. 9 bares de presión. La culminación del ritual donde el café alcanza su estado de perfección absoluta.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2560&auto=format&fit=crop',
    align: 'md:flex-row'
  }
]

export default function TransmutationSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      const cards = gsap.utils.toArray('.transmutation-card') as HTMLElement[]

      cards.forEach((card) => {
        const imgContainer = card.querySelector('.img-reveal-wrapper')
        const img = card.querySelector('.card-img')
        const text = card.querySelector('.text-reveal')
        const number = card.querySelector('.giant-number')

        // 1. Revelado de la imagen por máscara (clip-path)
        gsap.fromTo(imgContainer,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'power4.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            }
          }
        )

        // 2. Efecto Parallax en la imagen
        gsap.fromTo(img,
          { scale: 1.3, y: '10%' },
          {
            scale: 1,
            y: '-10%',
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )

        // 3. Revelado del texto
        gsap.fromTo(text,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
            }
          }
        )

        // 4. Movimiento del número gigante
        gsap.fromTo(number,
          { y: 100, opacity: 0 },
          {
            y: -50,
            opacity: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="w-full bg-void py-32 relative z-20">
      <div className="flex flex-col gap-40 md:gap-64">
        {ACTS.map((act) => (
          <div 
            key={act.id} 
            className={`transmutation-card flex flex-col ${act.align} items-center gap-12 md:gap-24 px-frame`}
          >
            {/* Imagen con Revelado */}
            <div className="img-reveal-wrapper relative w-full md:w-1/2 aspect-[4/5] md:aspect-square overflow-hidden bg-charcoal rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={act.img} 
                  alt={act.title}
                  className="card-img w-full h-[120%] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            {/* Contenido Editorial */}
            <div className="text-reveal w-full md:w-1/2 flex flex-col gap-6 relative">
                <div className="giant-number absolute -top-20 -left-10 text-[12rem] md:text-[20rem] font-serif font-bold text-white select-none">
                    {act.step}
                </div>
                
                <div className="relative z-10">
                    <span className="text-label mb-4 block">// FASE {act.step}</span>
                    <h2 className="text-hero text-6xl md:text-8xl lg:text-9xl leading-none mb-2">
                        {act.title}
                    </h2>
                    <h3 className="text-title text-2xl md:text-4xl text-gold italic mb-8">
                        {act.subtitle}
                    </h3>
                    <p className="text-body max-w-md border-l border-gold/30 pl-8 lowercase">
                        {act.desc}
                    </p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}