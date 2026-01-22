import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLoading } from '../../context/LoadingContext'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

// Hero images data
const heroSlides = [
  { id: 1, image: '/hero/hero1.png', label: 'Craftsmanship' },
  { id: 2, image: '/hero/hero2.png', label: 'Quality' },
  { id: 3, image: '/hero/hero3.png', label: 'Heritage' },
  { id: 4, image: '/hero/hero4.png', label: 'Innovation' },
]

const SLIDE_DURATION = 6000 // 6 seconds for smoother Ken Burns effect

export function Hero() {
  const { isLoading } = useLoading()
  const { setHovering } = useCursor()
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const descRef = useRef(null)
  const overlayRef = useRef(null)
  const imageRefs = useRef([])
  const slideRefs = useRef([])

  const [currentSlide, setCurrentSlide] = useState(0)
  const [initialAnimationDone, setInitialAnimationDone] = useState(false)
  const timerRef = useRef(null)
  const kenBurnsRef = useRef(null)

  // Ken Burns zoom animation for current slide
  useEffect(() => {
    if (isLoading || !initialAnimationDone) return

    const currentImage = imageRefs.current[currentSlide]
    if (!currentImage) return

    // Kill any existing Ken Burns animation
    if (kenBurnsRef.current) {
      kenBurnsRef.current.kill()
    }

    // Set initial scale for new slide
    gsap.set(currentImage, { scale: 1.15 })

    // Animate Ken Burns zoom out
    kenBurnsRef.current = gsap.to(currentImage, {
      scale: 1,
      duration: SLIDE_DURATION / 1000,
      ease: 'none',
    })

    // Set timer for next slide
    timerRef.current = setTimeout(() => {
      const nextIndex = (currentSlide + 1) % heroSlides.length
      setCurrentSlide(nextIndex)
    }, SLIDE_DURATION)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [currentSlide, isLoading, initialAnimationDone])

  // Initial page load animations
  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => setInitialAnimationDone(true)
      })

      // First slide entrance with Ken Burns
      const firstImage = imageRefs.current[0]
      const firstSlide = slideRefs.current[0]

      if (firstImage && firstSlide) {
        // Set initial state
        gsap.set(firstImage, { scale: 1.3 })
        gsap.set(firstSlide, { opacity: 1 })

        // Zoom out animation
        tl.to(firstImage, {
          scale: 1.15,
          duration: 2.5,
          ease: 'power2.out'
        }, 0)
      }

      // Overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0.5, duration: 1.5, ease: 'power2.out' },
        0
      )

      // Line 1
      const line1Chars = line1Ref.current?.querySelectorAll('.char')
      if (line1Chars) {
        tl.fromTo(
          line1Chars,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.03, ease: 'power4.out' },
          0.5
        )
      }

      // Line 2
      const line2Chars = line2Ref.current?.querySelectorAll('.char')
      if (line2Chars) {
        tl.fromTo(
          line2Chars,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, stagger: 0.02, ease: 'power4.out' },
          0.8
        )
      }

      // Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        1.5
      )

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.set(containerRef.current, { y: progress * -100 })
          gsap.set(overlayRef.current, { opacity: 0.5 + progress * 0.4 })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading])

  const scrollToCategories = () => {
    document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' })
  }

  const renderSplitText = (text, className = '') => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className={`char inline-block ${char === ' ' ? 'w-[0.3em]' : ''} ${className}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ))
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-150 lg:min-h-175 flex items-center justify-center overflow-hidden bg-coz-black"
    >
      {/* Image Slides with Ken Burns Effect */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            ref={el => slideRefs.current[index] = el}
            className="absolute inset-0 transition-opacity duration-1500 ease-in-out"
            style={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 10 : 0,
            }}
          >
            <img
              ref={el => imageRefs.current[index] = el}
              src={slide.image}
              alt={slide.label}
              className="w-full h-full object-cover will-change-transform"
              style={{
                transform: index === 0 && !initialAnimationDone ? 'scale(1.3)' : 'scale(1.15)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 100%)',
          opacity: 1
        }}
      />

      {/* Subtle Vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 100%)'
        }}
      />

      {/* Film Grain Texture */}
      <div
        className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-30 text-center container-padding max-w-7xl mx-auto"
      >
        <div className="space-y-6 lg:space-y-8">
          <div ref={line1Ref} className="overflow-hidden">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl tracking-[0.2em] text-white font-bold uppercase">
              {renderSplitText('The Art of')}
            </h1>
          </div>

          <div ref={line2Ref} className="overflow-hidden">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tight text-white">
              <span className="block md:hidden uppercase">{renderSplitText('Fabric')}</span>
              <span className="block md:hidden uppercase">{renderSplitText('Fashion')}</span>
              <span className="hidden md:block">
                <span className="">{renderSplitText('Fabric ')}</span>
                <span className="">{renderSplitText('To ')}</span>
                <span className="">{renderSplitText('Fashion')}</span>
              </span>
            </h1>
          </div>

          <div ref={descRef} className="w-full text-center" style={{ opacity: 0 }}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-bold">
              We bridge centuries of artisanal craftsmanship with modern manufacturing techniques for the global markets.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-30 py-4 md:py-6 container-padding">
        <div className="flex items-center justify-center md:justify-between text-white/40 text-[10px] md:text-xs tracking-wider uppercase">
          <span className="hidden md:block">CLUB of Lifestyle Products</span>
          <span>Scroll to Explore</span>
          <span className="hidden md:block">End-to-End Textile Supply Solutions</span>
        </div>
      </div> */}

      {/* Side Text */}
      {/* <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <span
          className="text-[10px] lg:text-xs tracking-[0.3em] text-white/30 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Crafted with Purpose
        </span>
      </div> */}

      {/* <div className="absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <span
          className="text-[10px] lg:text-xs tracking-[0.3em] text-white/30 uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Thinking Global, Acting Local
        </span>
      </div> */}
    </section>
  )
}
