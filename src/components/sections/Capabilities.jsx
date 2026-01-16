import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

const capabilities = [
  {
    id: 1,
    title: 'Custom Manufacturing',
    description: 'End-to-end production tailored to your specifications, from fabric selection to finished goods.',
    icon: 'manufacturing',
  },
  {
    id: 2,
    title: 'Private Label Production',
    description: 'Complete private label solutions with your branding, packaging, and quality standards.',
    icon: 'label',
  },
  {
    id: 3,
    title: 'Sampling & Prototyping',
    description: 'Rapid prototyping and sampling services to bring your designs to life.',
    icon: 'prototype',
  },
  {
    id: 4,
    title: 'Quality Assurance',
    description: 'Rigorous multi-point inspection ensuring every piece meets international standards.',
    icon: 'quality',
  },
  {
    id: 5,
    title: 'Logistics & Shipping',
    description: 'Global shipping with complete documentation and customs clearance support.',
    icon: 'shipping',
  },
  {
    id: 6,
    title: 'Design Consultation',
    description: 'Expert guidance on trends, fabrics, and construction techniques.',
    icon: 'design',
  },
]

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const listRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )

      // List items stagger
      const items = listRef.current?.querySelectorAll('.cap-item')
      if (items) {
        gsap.fromTo(
          items,
          { xPercent: 30, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 75%',
            },
          }
        )
      }

      // Card animation
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Animate card on capability change
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current.querySelector('.card-content'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [activeIndex])

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative bg-coz-cream overflow-hidden"
    >
      <div className="relative z-10 section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Left Column */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <span className="inline-block text-xs font-medium tracking-[0.3em] text-coz-orange uppercase mb-6">
                  What We Do
                </span>

                <div ref={headingRef} className="mb-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-coz-charcoal">
                    Our
                    <br />
                    <span className="text-coz-charcoal">Capabilities</span>
                  </h2>
                </div>

                <p className="text-lg text-coz-gray leading-relaxed mb-12 max-w-md">
                  End-to-end solutions tailored to your business needs. From concept
                  to delivery, we handle it all with precision and care.
                </p>

                {/* Active Capability Card */}
                <div
                  ref={cardRef}
                  className="hidden lg:block p-8 bg-white border border-coz-silver/30 rounded-lg"
                >
                  <div className="card-content">
                    <div className="w-14 h-14 rounded-lg bg-coz-orange flex items-center justify-center mb-6">
                      <CapabilityIcon name={capabilities[activeIndex]?.icon} />
                    </div>
                    <h3 className="text-2xl font-bold text-coz-charcoal mb-3">
                      {capabilities[activeIndex]?.title}
                    </h3>
                    <p className="text-coz-gray leading-relaxed">
                      {capabilities[activeIndex]?.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-coz-silver/50 flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-coz-orange" />
                        <span className="text-sm text-coz-gray">Expert Team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-coz-orange" />
                        <span className="text-sm text-coz-gray">Fast Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Capabilities List */}
            <div className="lg:col-span-7">
              <div ref={listRef} className="border-l border-coz-silver/50">
                {capabilities.map((cap, index) => (
                  <CapabilityItem
                    key={cap.id}
                    capability={cap}
                    index={index}
                    isActive={activeIndex === index}
                    onHover={() => setActiveIndex(index)}
                  />
                ))}
              </div>

              {/* CTA */}
              <div className="mt-16 pl-8">
                <p className="text-coz-gray/60 text-sm mb-4">Need something specific?</p>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group inline-flex items-center gap-4"
                >
                  <span className="text-lg font-medium text-coz-charcoal group-hover:text-coz-orange transition-colors duration-300">
                    Let&apos;s discuss your requirements
                  </span>
                  <span className="w-10 h-10 rounded-full border border-coz-charcoal/20 flex items-center justify-center group-hover:bg-coz-orange group-hover:border-coz-orange transition-all duration-300">
                    <svg className="w-4 h-4 text-coz-charcoal group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CapabilityItem({ capability, index, isActive, onHover }) {
  const { setHovering, resetCursor } = useCursor()
  const itemRef = useRef(null)
  const lineRef = useRef(null)

  const handleMouseEnter = () => {
    setHovering(true)
    onHover()
  }

  const handleMouseLeave = () => {
    resetCursor()
  }

  useEffect(() => {
    if (lineRef.current) {
      gsap.to(lineRef.current, {
        scaleY: isActive ? 1 : 0,
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }, [isActive])

  return (
    <div
      ref={itemRef}
      className={`cap-item relative pl-8 py-6 cursor-pointer transition-colors duration-300 ${
        isActive ? 'bg-white/50' : 'hover:bg-white/30'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Active Line */}
      <div
        ref={lineRef}
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-coz-orange origin-top"
        style={{ transform: 'scaleY(0)' }}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span
            className={`text-4xl lg:text-5xl font-light tabular-nums transition-colors duration-300 ${
              isActive ? 'text-coz-orange' : 'text-coz-silver'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3
              className={`text-xl lg:text-2xl font-semibold transition-colors duration-300 ${
                isActive ? 'text-coz-charcoal' : 'text-coz-gray'
              }`}
            >
              {capability.title}
            </h3>
            {/* Description on mobile */}
            <p className={`lg:hidden mt-2 text-sm text-coz-gray transition-all duration-300 ${
              isActive ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
            }`}>
              {capability.description}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isActive ? 'bg-coz-orange scale-100' : 'bg-coz-silver/20 scale-75 opacity-0'
          }`}
        >
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function CapabilityIcon({ name }) {
  const icons = {
    manufacturing: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    label: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    prototype: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    quality: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    shipping: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    design: (
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  }

  return icons[name] || icons.manufacturing
}
