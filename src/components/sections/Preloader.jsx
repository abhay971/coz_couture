import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLoading } from '../../context/LoadingContext'

export function Preloader() {
  const { isLoading, progress, completeLoading, updateProgress } = useLoading()
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const progressBarRef = useRef(null)
  const counterRef = useRef(null)
  const wordsRef = useRef(null)
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    // Animate entry
    const tl = gsap.timeline()

    tl.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'power4.out' },
      0.3
    )

    tl.fromTo(
      wordsRef.current?.querySelectorAll('.word'),
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      0.8
    )

    // Simulate loading progress
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12 + 3
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setTimeout(() => {
          completeLoading()
        }, 800)
      }
      updateProgress(Math.min(currentProgress, 100))
      setDisplayProgress(Math.round(Math.min(currentProgress, 100)))
    }, 100)

    return () => clearInterval(interval)
  }, [completeLoading, updateProgress])

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: progress / 100,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [progress])

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const tl = gsap.timeline()

      // Animate out
      tl.to(
        [logoRef.current, wordsRef.current, counterRef.current],
        {
          yPercent: -100,
          opacity: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power3.in',
        }
      )

      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
      })
    }
  }, [isLoading])

  if (!isLoading && progress === 100) {
    return null
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 bg-coz-charcoal flex flex-col items-center justify-center"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo Image */}
        <div ref={logoRef} className="mb-6 md:mb-8 px-8">
          <img
            src="/logo/COZ_COUTURE_White.png"
            alt="COZ COUTURE"
            className="h-12 sm:h-16 md:h-24 lg:h-28 w-auto max-w-[280px] sm:max-w-none mx-auto object-contain"
          />
        </div>

        {/* Tagline */}
        <div ref={wordsRef} className="flex items-center justify-center gap-3 mb-10 md:mb-12 px-4">
          <span className="overflow-hidden">
            <span className="word inline-block text-xs sm:text-sm md:text-base lg:text-lg font-medium tracking-[0.15em] md:tracking-[0.2em] uppercase text-white/60">
              CLUB of Lifestyle Products
            </span>
          </span>
        </div>

        {/* Progress */}
        <div ref={counterRef} className="w-64 mx-auto">
          <div className="flex items-center justify-between text-white/40 text-xs tracking-wider mb-3">
            <span>Loading</span>
            <span className="font-mono">{displayProgress}%</span>
          </div>
          <div className="h-0.5 bg-white/10 relative overflow-hidden rounded-full">
            <div
              ref={progressBarRef}
              className="absolute inset-y-0 left-0 right-0 origin-left rounded-full bg-coz-orange"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 text-white/20 text-xs tracking-widest">
        EST. 2009
      </div>
      <div className="absolute bottom-8 right-8 text-white/20 text-xs tracking-widest">
        INDIA
      </div>
    </div>
  )
}
