'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

const ObsidianPillar = () => (
  <svg 
    width="40" 
    height="40" 
    viewBox="0 0 40 40" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:scale-y-125 transition-transform duration-700"
  >
    {/* Tríptico de Pilares - La Arquitectura del Grano */}
    <rect x="10" y="10" width="2" height="20" fill="white" className="animate-pulse" />
    <rect x="18" y="5" width="4" height="30" fill="white" />
    <rect x="28" y="15" width="2" height="10" fill="white" className="animate-pulse" style={{ animationDelay: '1s' }} />
    
    {/* Línea de Horizonte */}
    <rect x="0" y="38" width="40" height="0.5" fill="white" fillOpacity="0.3" />
  </svg>
)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-frame flex items-center ${scrolled ? 'h-[80px]' : 'h-[84px] md:h-[92px]'} bg-transparent`}>
        <div className="w-full max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-4 items-center h-full mix-blend-difference">
          
          {/* LEFT: Branding & Pillar */}
          <div className="col-span-1 flex items-center gap-6 pointer-events-auto">
            <Link href="/" className="group flex items-center gap-4">
              <ObsidianPillar />
              <div className="flex flex-col">
                <span className="font-serif italic text-white text-2xl tracking-tighter leading-none">obsidiana</span>
                <span className="font-sans text-[7px] tracking-[0.5em] uppercase text-white/40 mt-1">coffee</span>
              </div>
            </Link>
          </div>

          {/* CENTER: Navigation (Protocol Nav) */}
          <div className="hidden md:flex col-span-2 justify-center items-center h-full pointer-events-auto">
            <nav className="flex items-center gap-16">
              {[
                { name: 'origen', code: 'p.01' },
                { name: 'maestría', code: 'p.02' },
                { name: 'manifiesto', code: 'p.03' }
              ].map((link) => (
                <Link 
                  key={link.name} 
                  href={`#${link.name}`} 
                  className="group flex flex-col items-center"
                >
                  <span className="font-mono text-[7px] text-white/30 mb-1 group-hover:text-white transition-colors">{link.code}</span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.5em] text-white group-hover:italic transition-all">
                    {link.name}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT: Action (The Anchor) */}
          <div className="col-span-1 flex justify-end items-center h-full pointer-events-auto gap-8">
            <Link 
                href="#catalogo" 
                className="hidden md:flex items-center gap-4 group"
            >
                <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 transition-all" />
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white">catálogo</span>
                <div className="w-2 h-2 border border-white rotate-45 group-hover:bg-white transition-all" />
            </Link>

            {/* Mobile Ritual Burger */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col gap-2 p-2 relative z-[110]"
              aria-label="Toggle Ritual"
            >
              <div className={`w-8 h-[0.5px] bg-white transition-all duration-700 ${isOpen ? 'rotate-45 translate-y-[9.5px]' : ''}`} />
              <div className={`w-5 h-[0.5px] bg-white self-end transition-all duration-700 ${isOpen ? 'opacity-0' : ''}`} />
              <div className={`w-8 h-[0.5px] bg-white transition-all duration-700 ${isOpen ? '-rotate-45 -translate-y-[9.5px]' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* THE VOID (Full Overlay) */}
      <div className={`fixed inset-0 bg-white z-[90] transition-all duration-1000 ease-in-out mix-blend-difference flex flex-col items-center justify-center ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="absolute top-24 left-frame font-mono text-[8px] tracking-[1em] text-black/20 uppercase">
            extraction_sequence_active
        </div>
        <nav className="flex flex-col items-center gap-12">
          {['catálogo', 'origen', 'maestría', 'manifiesto'].map((link, i) => (
            <Link 
              key={link} 
              href={`#${link}`} 
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-center"
            >
              <span className="text-hero text-6xl md:text-9xl lowercase group-hover:italic transition-all duration-700">
                {link}
              </span>
              <span className="font-mono text-[10px] tracking-[1em] opacity-20 group-hover:opacity-100 transition-all mt-4">
                idx_0{i}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}