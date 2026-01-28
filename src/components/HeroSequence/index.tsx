'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HeroSequenceProps {
  frameCount: number
  baseUrl: string
  extension: string
  children?: React.ReactNode
}

export default function HeroSequence({ frameCount, baseUrl, extension, children }: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Preload images
  useEffect(() => {
    let isMounted = true
    const loadedImages: HTMLImageElement[] = []
    let loadedCount = 0

    const updateProgress = () => {
      if (!isMounted) return
      loadedCount++
      if (loadedCount === frameCount) {
        setImages([...loadedImages])
        setIsLoading(false)
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 100)
      }
    }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image()
      const frameIndex = i.toString().padStart(4, '0')
      img.src = `${baseUrl}/frame_${frameIndex}.${extension}`
      img.onload = () => {
        loadedImages[i] = img
        updateProgress()
      }
      img.onerror = updateProgress
    }

    return () => { isMounted = false }
  }, [frameCount, baseUrl, extension])

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current || !trackRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d', { alpha: false })
    if (!context) return

    const airbnb = { frame: 0 }

    const render = () => {
      const frameIndex = Math.floor(airbnb.frame)
      const img = images[frameIndex]
      if (!img) return
      
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const refImg = images[0]
      const imgWidth = refImg.width
      const imgHeight = refImg.height

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
      const newWidth = imgWidth * ratio
      const newHeight = imgHeight * ratio
      const x = (canvasWidth - newWidth) / 2
      const y = (canvasHeight - newHeight) / 2

      context.drawImage(img, x, y, newWidth, newHeight)
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      render()
    }

    window.addEventListener('resize', resize)
    resize()

    // Usamos el trackRef (500vh) como trigger para la animación del video
    const tl = gsap.to(airbnb, {
      frame: frameCount - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5,
      },
      onUpdate: render,
    })

    render()

    return () => {
      window.removeEventListener('resize', resize)
      tl.kill()
    }
  }, [images, frameCount])

  return (
    /* TRACK: Altura física real: 3200px en móvil, 4000px en desktop */
    <div ref={trackRef} className="hero-track-container relative w-full h-[3200px] md:h-[4000px] bg-black">
      
      {/* STICKY: Mantiene el video visible mientras recorres el track */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-50 bg-black">
            <p className="text-xl font-medium animate-pulse font-serif italic">The Ritual is loading...</p>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover"
        />
        <div className="hero-child-content absolute inset-0 z-10">
          {children}
        </div>
      </div>
    </div>
  )
}