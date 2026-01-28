'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RITUAL_STEPS = [
  {
    id: 'origin',
    num: '01',
    label: 'EL ORIGEN',
    title: 'CAFÉ DE ALTURA',
    desc: 'Cultivamos nuestros granos a 1,850 metros sobre el nivel del mar, donde el clima y la altitud garantizan una maduración lenta y un sabor superior.',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop',
    fromX: '40%', // Empezamos fuera de pantalla
    align: 'justify-end text-right items-end'
  },
  {
    id: 'roast',
    num: '02',
    label: 'EL TOSTADO',
    title: 'TOSTE DE PRECISIÓN',
    desc: 'Controlamos la temperatura grado a grado mediante tostadores de aire fluido, resaltando las notas naturales de cada cosecha sin comprometer su pureza.',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    fromX: '-40%',
    align: 'justify-start text-left items-start'
  },
  {
    id: 'elixir',
    num: '03',
    label: 'LA EXTRACCIÓN',
    title: 'EL ESPRESSO PERFECTO',
    desc: 'Utilizamos 9 bares de presión constante para extraer la máxima concentración de sabor y una crema densa en cada taza.',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=2070&auto=format&fit=crop',
    fromX: '40%',
    align: 'justify-end text-right items-end'
  }
]

export default function TransmutationSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.monolith-item') as HTMLElement[]

      items.forEach((item, i) => {
        const step = RITUAL_STEPS[i]
        const img = item.querySelector('.monolith-img')
        const content = item.querySelector('.monolith-content')

        // 1. TIMELINE DE ENTRADA E ILUMINACIÓN (GPU OPTIMIZED)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            end: 'top 20%',
            scrub: 1,
            invalidateOnRefresh: true
          }
        })

        tl.fromTo(item, 
          { x: step.fromX, opacity: 0 },
          { 
            x: '0%', 
            opacity: 1, 
            ease: 'power2.out',
            force3D: true 
          }
        )
        
        // El "Encendido" de la imagen ocurre al final de la entrada
        tl.fromTo(img, 
          { filter: 'brightness(0.2) grayscale(0.5)', scale: 1.1 },
          { 
            filter: 'brightness(1) grayscale(0)', 
            scale: 1, 
            duration: 0.5,
            ease: 'sine.inOut',
            force3D: true 
          },
          '>-0.5' // Empieza un poco antes de que termine el movimiento
        )

        // 2. PARALLAX SUTIL (Solo en Y para no interferir con X)
        gsap.to(img, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        })

        // 3. REVELADO DE TEXTO
        gsap.from(content, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          scrollTrigger: {
            trigger: item,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-void py-32 md:py-64 z-20 overflow-x-hidden"
    >
      <div className="flex flex-col gap-32 md:gap-56">
        {RITUAL_STEPS.map((step, i) => (
          <div 
            key={step.id} 
            className={`monolith-item relative w-full flex ${
              i % 2 !== 0 
                ? 'justify-start pl-0 pr-5 md:pl-0 md:pr-32' 
                : 'justify-end pr-0 pl-5 md:pr-0 md:pl-32'
            } will-change-transform`}
          >
            {/* EL MONOLITO */}
            <div className={`relative w-full md:w-[75%] h-[60vh] md:h-[75vh] overflow-hidden group bg-charcoal shadow-2xl ${
              i % 2 !== 0 ? 'rounded-r-sm' : 'rounded-l-sm'
            }`}>
                
                {/* Viñetado Progresivo */}
                <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />
                <div className="absolute inset-0 z-10 shadow-[inset_0_0_100px_rgba(0,0,0,0.6)] md:shadow-[inset_0_0_250px_rgba(0,0,0,0.8)] pointer-events-none" />
                
                {/* Imagen con aceleración GPU */}
                <img 
                  src={step.img} 
                  alt={step.title} 
                  className="monolith-img w-full h-[120%] object-cover will-change-[transform,filter]"
                />

                {/* CONTENIDO EDITORIAL */}
                <div className={`monolith-content absolute inset-0 z-20 flex flex-col p-8 md:p-20 ${step.align} pointer-events-none`}>
                    
                    <div className="flex items-center gap-4 mb-auto" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>
                        <span className="font-mono text-[10px] md:text-xs text-gold/80 tracking-[0.5em] font-bold">0{step.num}</span>
                        <div className="h-[1px] w-10 bg-gold/30" />
                        <span className="font-sans text-[10px] md:text-xs text-bone/40 tracking-[0.4em] uppercase font-bold">{step.label}</span>
                    </div>

                    <div className="max-w-md md:max-w-2xl" style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,1))' }}>
                        <h3 className="font-serif text-3xl md:text-7xl text-bone mb-6 leading-[0.9] tracking-tight uppercase">
                            {step.title.split(' ').map((word, idx) => (
                                <span key={idx} className={idx === step.title.split(' ').length - 1 ? 'text-gold italic md:block' : 'md:inline'}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h3>
                        <p className="text-bone/60 text-base md:text-xl font-sans leading-relaxed lowercase italic border-l-2 border-gold/30 pl-6 md:pl-10">
                            {step.desc}
                        </p>
                    </div>

                    <div className="mt-auto opacity-20 font-mono text-[8px] md:text-[10px] tracking-[0.8em] text-white uppercase flex items-center gap-4">
                        <span>Obsidian Archive</span>
                        <div className="w-1 h-1 bg-gold rounded-full" />
                        <span>S_0{step.num}</span>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* FINAL ANCHOR */}
      <div className="mt-48 flex flex-col items-center opacity-10">
        <div className="w-[1px] h-40 bg-gradient-to-b from-gold via-gold to-transparent" />
      </div>

    </section>
  )
}