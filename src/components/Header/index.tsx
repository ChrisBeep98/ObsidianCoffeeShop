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
                { name: 'origen', color: 'bg-gold' },
                { name: 'maestría', color: 'bg-cherry' },
                { name: 'manifiesto', color: 'bg-white' }
              ].map((link) => (
                <Link 
                  key={link.name} 
                  href={`#${link.name}`} 
                  className="group flex flex-col items-center"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${link.color} mb-2 opacity-30 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-110`} />
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
      <div className={`fixed inset-0 bg-void z-[90] transition-all duration-1000 ease-in-out flex flex-col items-end justify-center px-frame ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <div className="absolute top-24 right-frame font-mono text-[8px] tracking-[1em] text-gold/20 uppercase text-right">
            extraction_sequence_active
        </div>
        <nav className="flex flex-col items-end gap-10">
          {[
            { name: 'catálogo', phase: 'fase_00' },
            { name: 'origen', phase: 'fase_01' },
            { name: 'maestría', phase: 'fase_02' },
            { name: 'manifiesto', phase: 'fase_03' }
          ].map((link, i) => (
            <Link 
              key={link.name} 
              href={`#${link.name}`} 
              onClick={() => setIsOpen(false)}
              className="group flex flex-col items-end"
            >
              <span className="font-serif italic text-[10px] text-gold/50 tracking-[0.2em] mb-1">
                {link.phase}
              </span>
              <span className="font-sans text-4xl uppercase tracking-[0.2em] text-bone group-hover:text-gold transition-all duration-500">
                {link.name}
              </span>
            </Link>
          ))}
          
          {/* Contacto Mobile */}
          <Link 
            href="#contacto" 
            onClick={() => setIsOpen(false)}
            className="mt-12 flex items-center gap-4 group"
          >
            <div className="w-8 h-[1px] bg-gold/30 group-hover:w-12 transition-all" />
            <span className="font-sans text-xs uppercase tracking-[0.5em] text-gold">contacto</span>
          </Link>
        </nav>
      </div>
    </>
  )
}