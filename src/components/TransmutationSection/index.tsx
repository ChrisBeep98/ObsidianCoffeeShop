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
    desc: 'El origen. 1,850 metros sobre el nivel del mar. Suelos volcánicos.',
    img: 'https://images.unsplash.com/photo-1611162458324-a22863a72596?q=80&w=2560&auto=format&fit=crop',
    align: 'items-start text-left'
  },
  {
    id: 'albedo',
    step: '02',
    title: 'ALBEDO',
    subtitle: 'Purificación',
    desc: 'El proceso. Tueste de precisión para liberar los aceites esenciales.',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2560&auto=format&fit=crop',
    align: 'items-end text-right'
  },
  {
    id: 'rubedo',
    step: '03',
    title: 'RUBEDO',
    subtitle: 'Oro Líquido',
    desc: 'La extracción. 9 bares de presión. La culminación del ritual.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2560&auto=format&fit=crop',
    align: 'items-center text-center'
  }
]

export default function TransmutationSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      const cards = gsap.utils.toArray('.transmutation-card') as HTMLElement[]

      cards.forEach((card) => {
        const img = card.querySelector('.card-img')
        const content = card.querySelector('.content-group')

        // Parallax para la imagen
        gsap.fromTo(img, 
          { y: '-10%', scale: 1.1 },
          {
            y: '10%',
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        )

        // Revelado de contenido
        gsap.fromTo(content,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="w-full bg-void py-20 relative z-20">
      <div className="flex flex-col gap-20">
        {ACTS.map((act) => (
          <div 
            key={act.id} 
            className="transmutation-card relative w-full h-[80vh] md:h-[90vh] flex flex-col justify-center px-frame overflow-hidden"
          >
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 z-0 bg-charcoal">
                <div className="absolute inset-0 bg-black/60 z-10" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={act.img} 
                  alt={act.title}
                  className="card-img w-full h-[120%] object-cover object-center"
                />
            </div>

            {/* Content Group */}
            <div className={`content-group relative z-20 flex flex-col w-full ${act.align} pointer-events-none`}>
                <span className="text-gold font-sans tracking-[0.4em] text-[10px] md:text-xs mb-4 uppercase font-bold">
                    FASE {act.step} // {act.subtitle}
                </span>
                <h2 className="text-hero text-bone opacity-90 leading-none mb-6">
                    {act.title}
                </h2>
                <p className="text-body max-w-md text-bone/70 lowercase italic border-l border-gold/20 pl-6">
                    {act.desc}
                </p>
            </div>
            
            {/* Giant Background Number */}
            <div className="absolute bottom-10 right-10 z-10 opacity-5 pointer-events-none">
                <span className="text-[15rem] md:text-[25rem] font-serif leading-none text-white block">
                    {act.step}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
