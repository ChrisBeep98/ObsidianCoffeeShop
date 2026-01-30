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
      blocks.forEach((block: any) => {
        const imgWrap = block.querySelector(`.${styles.imageWrap}`);
        const img = block.querySelector(`.${styles.imageWrap} img`);
        const tag = block.querySelector(`.${styles.tag}`);
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
            start: "top 90%",
            end: "bottom 20%",
            scrub: 1,
          }
        });

        masterTl
          // Revelado de Imagen con Filtros Cinemáticos (Restaurados)
          .fromTo(imgWrap, 
            { 
              clipPath: isReversed ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
              filter: "brightness(0) contrast(2)"
            },
            { 
              clipPath: "inset(0% 0% 0% 0%)", 
              filter: "brightness(0.9) contrast(1.1)",
              ease: "none", 
              duration: 1 
            }, 0
          )
          // Parallax de Imagen
          .to(img, { yPercent: 20, ease: "none", duration: 1 }, 0)
          // Animación de Texto (Sin Blurs)
          .fromTo(tag, { opacity: 0, x: -20 }, { opacity: 0.7, x: 0, duration: 0.3 }, 0.1)
          .fromTo(serif, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 0.2)
          .fromTo(sans, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 }, 0.25)
          .fromTo([line, label], { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, 0.3)
          .fromTo(desc, { opacity: 0, y: 15 }, { opacity: 0.6, y: 0, duration: 0.4 }, 0.35);

        if (btn) {
          masterTl.fromTo(btn, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.3 }, 0.4);
        }
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
        
        {/* BLOQUE 1: LA CIMA (AIRE) */}
        <div className={styles.storyBlock}>
          <div className={styles.contentSide}>
            <div className={styles.editorialHeader}>
              <h2 className={styles.mainTitle}>
                <span className={styles.serifThin}>Altitud</span>
                <span className={styles.sansBold}>1,800M</span>
              </h2>
              <div className={styles.subtitleLine}>
                <div className={styles.goldLine}></div>
                <span className={styles.organicLabel}>El aliento de las alturas.</span>
              </div>
            </div>
            <p className={styles.desc}>En la cúspide de Sidamo, la niebla protege el grano del sol directo, permitiendo una maduración lenta que concentra los azúcares más complejos.</p>
          </div>
          <div className={styles.visualSide}>
            <div className={styles.imageWrap}>
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" alt="Altitude" />
            </div>
          </div>
        </div>

        {/* BLOQUE 2: LA TIERRA (MATERIA) */}
        <div className={`${styles.storyBlock} ${styles.reversed}`}>
          <div className={styles.contentSide}>
            <div className={styles.editorialHeader}>
              <h2 className={styles.mainTitle}>
                <span className={styles.serifThin}>Suelo</span>
                <span className={styles.sansBold}>VOLCÁNICO</span>
              </h2>
              <div className={styles.subtitleLine}>
                <div className={styles.goldLine}></div>
                <span className={styles.organicLabel}>Herencia de fuego y ceniza.</span>
              </div>
            </div>
            <p className={styles.desc}>Crecido en ceniza volcánica pura. Un suelo rico en minerales que otorga esa nota metálica y profunda exclusiva de nuestra cosecha.</p>
          </div>
          <div className={styles.visualSide}>
            <div className={styles.imageWrap}>
              <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=2070&auto=format&fit=crop" alt="Volcanic Soil" />
            </div>
          </div>
        </div>

        {/* BLOQUE 3: EL CRITERIO (HUMANO) */}
        <div className={styles.storyBlock}>
          <div className={styles.contentSide}>
            <div className={styles.editorialHeader}>
              <h2 className={styles.mainTitle}>
                <span className={styles.serifThin}>Cosecha</span>
                <span className={styles.sansBold}>MANUAL</span>
              </h2>
              <div className={styles.subtitleLine}>
                <div className={styles.goldLine}></div>
                <span className={styles.organicLabel}>El ritual de la paciencia.</span>
              </div>
            </div>
            <p className={styles.desc}>Cada grano es recolectado a mano en el punto exacto de madurez. Solo el 4% de la cosecha total califica para el sello Obsidian.</p>
            <div className="mt-12">
               <button className="btn-ritual">Ver el Resultado Final</button>
            </div>
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
