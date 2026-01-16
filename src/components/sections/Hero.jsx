import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLoading } from '../../context/LoadingContext'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const { isLoading } = useLoading()
  const { setHovering } = useCursor()
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)
  const descRef = useRef(null)
  const videoRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (isLoading) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Video/background scale
      tl.fromTo(
        videoRef.current,
        { scale: 1.3 },
        { scale: 1, duration: 2, ease: 'power3.out' },
        0
      )

      // Overlay fade
      tl.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0.5, duration: 1.5, ease: 'power2.out' },
        0
      )

      // Line 1 - "THE ART OF"
      const line1Chars = line1Ref.current?.querySelectorAll('.char')
      if (line1Chars) {
        tl.fromTo(
          line1Chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: 'power4.out',
          },
          0.5
        )
      }

      // Line 2 - "INDIAN TEXTILES"
      const line2Chars = line2Ref.current?.querySelectorAll('.char')
      if (line2Chars) {
        tl.fromTo(
          line2Chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.02,
            ease: 'power4.out',
          },
          0.8
        )
      }

      // Line 3 - "REIMAGINED"
      const line3Chars = line3Ref.current?.querySelectorAll('.char')
      if (line3Chars) {
        tl.fromTo(
          line3Chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.03,
            ease: 'power4.out',
          },
          1.1
        )
      }

      // Description
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        1.8
      )

      // Parallax on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress

          gsap.set(videoRef.current, {
            y: progress * 200,
            scale: 1 + progress * 0.1,
          })

          gsap.set(containerRef.current, {
            y: progress * -100,
          })

          gsap.set(overlayRef.current, {
            opacity: 0.5 + progress * 0.4,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isLoading])

  const scrollToCategories = () => {
    document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Split text into characters with overflow hidden wrapper
  const renderSplitText = (text, className = '') => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span
          className={`char inline-block ${char === ' ' ? 'w-[0.3em]' : ''} ${className}`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ))
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-coz-black"
    >
      {/* Video/Image Background */}
      <div className="absolute inset-0 z-0" ref={videoRef}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-weaving-on-a-loom-2170/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-coz-black"
        style={{ opacity: 1 }}
      />

      {/* Grain Texture */}
      <div
        className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div
        ref={containerRef}
        className="relative z-30 text-center container-padding max-w-7xl mx-auto"
      >
        {/* Eyebrow */}
        <div className="mb-8">
          {/* <span className="inline-block text-xs font-medium tracking-[0.3em] text-coz-orange uppercase">
            Since 2009 &mdash; Made in India
          </span> */}
        </div>

        {/* Main Headlines */}
        <div className="space-y-2 mb-8">
          {/* Line 1 */}
          <div ref={line1Ref} className="overflow-hidden">
            <h1 className="text-[clamp(1rem,3vw,1.5rem)] font-light tracking-[0.2em] text-white/70 uppercase">
              {renderSplitText('The Art of')}
            </h1>
          </div>

          {/* Line 2 - Main */}
          <div ref={line2Ref} className="overflow-hidden">
            <h1 className="text-[clamp(2rem,4.9vw,8rem)] font-bold leading-[0.85] tracking-[-0.03em] text-white uppercase mb-20">
              {renderSplitText('Textile Craftsmanship')}
            </h1>
          </div>

          {/* Line 3 */}
        
        </div>

        {/* Description */}
        <div ref={descRef} className="max-w-7xl mx-auto" style={{ opacity: 0 }}>
          <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-10">
            We bridge centuries of artisanal craftsmanship with modern global markets.
            <br />
            From the handlooms of Varanasi to the mills of Surat, we curate India&apos;s finest
            textiles for discerning brands worldwide.
          </p>

          {/* CTA */}
          <button
            onClick={scrollToCategories}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="group inline-flex items-center gap-4 text-white"
          >
            <span className="text-sm font-medium tracking-[0.2em] uppercase">
              Discover Our World
            </span>
            <span className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
              <svg
                className="w-5 h-5 group-hover:text-black transition-colors duration-500 rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 py-6 container-padding">
        <div className="flex items-center justify-between text-white/40 text-xs tracking-wider uppercase">
          <span>CLUB of Lifestyle Products</span>
          <span>Scroll to Explore</span>
          <span>End-to-End Textile Supply Solutions</span>
        </div>
      </div>

      {/* Side Text */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden xl:block">
        <span
          className="text-xs tracking-[0.3em] text-white/30 uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Crafted with Purpose
        </span>
      </div>

      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 hidden xl:block">
        <span
          className="text-xs tracking-[0.3em] text-white/30 uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          Thinking Global, Acting Local
        </span>
      </div>
    </section>
  )
}
