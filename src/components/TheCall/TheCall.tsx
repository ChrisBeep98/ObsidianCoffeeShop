"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./TheCall.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function TheCall() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const beanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let targetScale = 0;
    let currentScale = 0;
    const lerpFactor = 0.06; 
    let containerHeight = 0;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !lineRef.current || !beanRef.current) return;

      // quickSetters para máxima performance en el ticker
      const setLineScale = gsap.quickSetter(lineRef.current, "scaleY");
      const setBeanPos = gsap.quickSetter(beanRef.current, "y", "px");
      const setBeanRot = gsap.quickSetter(beanRef.current, "rotation", "deg");

      // Cacheamos el alto solo al inicio y en resize para evitar layout thrashing
      const updateMetrics = () => {
        containerHeight = containerRef.current?.offsetHeight || 0;
      };
      updateMetrics();
      window.addEventListener("resize", updateMetrics);

      // 1. FÍSICA ULTRA-OPTIMIZADA (quickSetters + Caching)
      const updateLinePhysics = () => {
        const diff = targetScale - currentScale;
        if (Math.abs(diff) > 0.0001) {
          currentScale += diff * lerpFactor;
          
          setLineScale(currentScale);
          setBeanPos(currentScale * containerHeight);
          setBeanRot(currentScale * 360);
        }
      };

      gsap.ticker.add(updateLinePhysics);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 20%",
        end: "bottom 80%",
        onUpdate: (self) => {
          targetScale = self.progress;
        }
      });

      // 2. REVELADO CONSOLIDADO (SIN BLUR)
      const blocks = gsap.utils.toArray(`.${styles.storyBlock}`);
      const isMobile = window.innerWidth <= 768;

      blocks.forEach((block: any) => {
        const imgWrap = block.querySelector(`.${styles.imageWrap}`);
        const img = block.querySelector(`.${styles.imageWrap} img`);
        const serif = block.querySelector(`.${styles.serifThin}`);
        const sans = block.querySelector(`.${styles.sansBold}`);
        const label = block.querySelector(`.${styles.organicLabel}`);
        const line = block.querySelector(`.${styles.goldLine}`);
        const desc = block.querySelector(`.${styles.desc}`);
        const btn = block.querySelector(`.btn-ritual`);
        const isReversed = block.classList.contains(styles.reversed);

        // Timeline Única por bloque para reducir cantidad de triggers
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 100%", 
            end: "top 20%",
            scrub: 0.5,
          }
        });

        // Revelado de Imagen con Filtros Cinemáticos (Optimizado)
        if (imgWrap) {
          masterTl.fromTo(imgWrap, 
            { 
              clipPath: isReversed ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
              filter: "brightness(0) contrast(1.5)"
            },
            { 
              clipPath: "inset(0% 0% 0% 0%)", 
              filter: "brightness(0.9) contrast(1.1)",
              ease: "power1.inOut", 
              duration: 1 
            }, 0
          )
        }

        // Parallax de Imagen (Sincronizado con la duración del reveal - Desactivado en Mobile)
        if (img) {
          masterTl.fromTo(img, 
            { yPercent: isMobile ? 0 : -15 }, 
            { yPercent: isMobile ? 0 : 15, ease: "none", duration: 1 }, 0
          )
        }

        // Animación de Texto (Solo si los elementos existen)
        if (serif) masterTl.fromTo(serif, { opacity: 0, y: isMobile ? 0 : 30 }, { opacity: 1, y: 0, duration: 0.4 }, 0.2);
        if (sans) masterTl.fromTo(sans, { opacity: 0, y: isMobile ? 0 : 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.25);
        if (line || label) {
          const targets = [line, label].filter(Boolean);
          masterTl.fromTo(targets, { opacity: 0, x: isMobile ? 0 : -20 }, { opacity: 1, x: 0, duration: 0.3 }, 0.3);
        }
        if (desc) masterTl.fromTo(desc, { opacity: 0, y: isMobile ? 0 : 15 }, { opacity: 0.6, y: 0, duration: 0.4 }, 0.35);
        if (btn) masterTl.fromTo(btn, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.4);
      });

      return () => {
        gsap.ticker.remove(updateLinePhysics);
        window.removeEventListener("resize", updateMetrics);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.verticalAbyss}>
      
      {/* EL EJE NARRATIVO (CENTRAL) */}
      <div className={styles.centerAxis}>
        <div ref={lineRef} className={styles.lifeLine}></div>
        <div ref={beanRef} className={styles.beanHead}>
          <svg viewBox="0 0 64 64" fill="currentColor">
            {/* Cuerpo principal del grano */}
            <path d="M48 32c0 11-8.1 20-18 20S12 43 12 32s8.1-20 18-20 18 9 18 20z" />
            {/* La hendidura característica (S-Curve) */}
            <path d="M30 12c3 8 3 32 0 40" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className={styles.storyContainer}>
        
        {/* BLOQUE 1: EL ORIGEN */}
        <div className={styles.storyBlock}>
          <div className={styles.contentSide}>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-gold/80 tracking-[0.5em] font-bold">01</span>
              <div className="h-[1px] w-10 bg-gold/30" />
              <span className="font-sans text-xs text-bone/40 tracking-[0.4em] uppercase font-bold">El Origen</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-7xl text-bone mb-6 leading-[0.9] tracking-tight uppercase">
              Café de <span className="text-gold italic md:block">Altura</span>
            </h2>
            <p className="text-bone/60 text-base md:text-xl font-sans leading-relaxed lowercase italic border-l-2 border-gold/30 pl-6 md:pl-10">
              Cultivamos nuestros granos a 1,850 metros sobre el nivel del mar, donde el clima y la altitud garantizan una maduración lenta y un sabor superior.
            </p>
          </div>
          <div className={styles.visualSide}>
            <div className={styles.imageWrap}>
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" alt="Altitude" />
            </div>
          </div>
        </div>

        {/* BLOQUE 2: EL TOSTADO */}
        <div className={`${styles.storyBlock} ${styles.reversed}`}>
          <div className={styles.contentSide}>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-gold/80 tracking-[0.5em] font-bold">02</span>
              <div className="h-[1px] w-10 bg-gold/30" />
              <span className="font-sans text-xs text-bone/40 tracking-[0.4em] uppercase font-bold">El Tostado</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-7xl text-bone mb-6 leading-[0.9] tracking-tight uppercase">
              Toste de <span className="text-gold italic md:block">Precisión</span>
            </h2>
            <p className="text-bone/60 text-base md:text-xl font-sans leading-relaxed lowercase italic border-l-2 border-gold/30 pl-6 md:pl-10">
              Controlamos la temperatura grado a grado mediante tostadores de aire fluido, resaltando las notas naturales de cada cosecha sin comprometer su pureza.
            </p>
          </div>
          <div className={styles.visualSide}>
            <div className={styles.imageWrap}>
              <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop" alt="Volcanic Soil" />
            </div>
          </div>
        </div>

        {/* BLOQUE 3: LA EXTRACCIÓN */}
        <div className={styles.storyBlock}>
          <div className={styles.contentSide}>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono text-xs text-gold/80 tracking-[0.5em] font-bold">03</span>
              <div className="h-[1px] w-10 bg-gold/30" />
              <span className="font-sans text-xs text-bone/40 tracking-[0.4em] uppercase font-bold">La Extracción</span>
            </div>
            <h2 className="font-serif font-bold text-3xl md:text-7xl text-bone mb-6 leading-[0.9] tracking-tight uppercase">
              Espresso <span className="text-gold italic md:block">Perfecto</span>
            </h2>
            <p className="text-bone/60 text-base md:text-xl font-sans leading-relaxed lowercase italic border-l-2 border-gold/30 pl-6 md:pl-10">
              Utilizamos 9 bares de presión constante para extraer la máxima concentración de sabor y una crema densa en cada taza.
            </p>
          </div>
          <div className={styles.visualSide}>
            <div className={styles.imageWrap}>
              <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" alt="Manual Harvest" />
            </div>
          </div>
        </div>

      </div>

      <div className={styles.vignette}></div>
      <div className={styles.grain}></div>
    </section>
  );
}
