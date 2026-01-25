'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface HeroSequenceProps {
  frameCount: number
  baseUrl: string
  extension: string
}

export default function HeroSequence({ frameCount, baseUrl, extension }: HeroSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
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
        // Refresh ScrollTrigger to account for any layout changes
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
      img.onerror = updateProgress // Skip failed images but continue
    }

    return () => {
      isMounted = false
    }
  }, [frameCount, baseUrl, extension])

  useEffect(() => {
    if (images.length === 0 || !canvasRef.current || !containerRef.current) return

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
      
      // Use the first image as a reference for dimensions to avoid "jumps"
      const refImg = images[0]
      const imgWidth = refImg.width
      const imgHeight = refImg.height

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight)
      const newWidth = imgWidth * ratio
      const newHeight = imgHeight * ratio
      const x = (canvasWidth - newWidth) / 2
      const y = (canvasHeight - newHeight) / 2

      // Drawing the current image using the fixed reference dimensions
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

    const tl = gsap.to(airbnb, {
      frame: frameCount - 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        scrub: 0.1, // Very low scrub for maximum responsiveness with smooth feel
        pin: true,
        anticipatePin: 1,
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
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white z-10">
          <p className="text-xl font-medium animate-pulse">Loading Experience...</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
      />
    </div>
  )
}
