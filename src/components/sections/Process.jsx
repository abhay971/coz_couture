import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../../data/stats'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function Process() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stepsRef = useRef(null)
  const progressRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const chars = headingRef.current?.querySelectorAll('.char')
      if (chars) {
        gsap.fromTo(
          chars,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.02,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
            },
          }
        )
      }

      // Progress line animation
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: stepsRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: 1,
        },
      })

      // Steps animation
      const steps = stepsRef.current?.querySelectorAll('.process-step')
      steps?.forEach((step, i) => {
        // Reveal animation
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              onEnter: () => setActiveStep(i),
              onEnterBack: () => setActiveStep(i),
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const renderSplitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className={`char inline-block ${char === ' ' ? 'w-[0.25em]' : ''}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ))
  }

  const colors = ['#F37E3A', '#288EC2', '#6EBD49']

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-coz-cream overflow-hidden"
    >
      {/* Large Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="text-[20vw] font-black text-coz-charcoal/[0.02] whitespace-nowrap">
          PROCESS
        </span>
      </div>

      <div className="relative z-10 section-padding">
        <div className="container-padding">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            <div>
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-coz-blue uppercase mb-6">
                How We Work
              </span>
              <div ref={headingRef} className="overflow-hidden">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-coz-charcoal">
                  {renderSplitText('From Vision')}
                  <br />
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-coz-charcoal">
                    {renderSplitText('To Reality')}
                  </span>
                </h2>
              </div>
            </div>
            {/* <div className="flex items-end">
              <p className="text-xl text-coz-gray leading-relaxed">
                One accountable partner for your entire journey. We guide you through
                every step with transparency, expertise, and unwavering commitment to quality.
              </p>
            </div> */}
          </div>

          {/* Process Steps */}
          <div ref={stepsRef} className="relative">
            {/* Vertical Progress Line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-coz-silver lg:-translate-x-1/2">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 w-full bg-linear-to-b from-coz-orange via-coz-blue to-coz-green origin-top"
                style={{ transform: 'scaleY(0)', height: '100%' }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-16 lg:space-y-24">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.id}
                  step={step}
                  index={index}
                  isActive={activeStep >= index}
                  color={colors[index % 3]}
                  isEven={index % 2 === 0}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <p className="text-coz-gray mb-6">Ready to start your journey?</p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex items-center gap-4 px-8 py-4 bg-coz-charcoal text-white font-medium tracking-wider uppercase hover:bg-coz-orange transition-colors duration-500"
            >
              <span>Get Started</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessStep({ step, index, isActive, color, isEven }) {
  const { setHovering, resetCursor } = useCursor()
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(cardRef.current, {
      rotateY: x * 0.01,
      rotateX: -y * 0.01,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    resetCursor()
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
  }

  return (
    <div
      className={`process-step relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
        isEven ? '' : 'lg:direction-rtl'
      }`}
      style={{ perspective: '1000px' }}
    >
      {/* Number Node */}
      <div
        className={`absolute left-8 lg:left-1/2 top-0 w-16 h-16 rounded-full flex items-center justify-center z-20 transition-all duration-500 lg:-translate-x-1/2 ${
          isActive ? 'scale-100' : 'scale-75 opacity-50'
        }`}
        style={{ backgroundColor: color }}
      >
        <span className="text-2xl font-bold text-white">{step.number}</span>
      </div>

      {/* Content Side */}
      <div
        className={`pl-28 lg:pl-0 ${isEven ? 'lg:pr-20 lg:text-right' : 'lg:pl-20 lg:text-left lg:direction-ltr'}`}
      >
        <span
          className="text-xs font-bold tracking-[0.3em] uppercase mb-3 inline-block"
          style={{ color }}
        >
          Step {step.number}
        </span>
        <h3 className="text-2xl lg:text-3xl font-bold text-coz-charcoal mb-4">
          {step.title}
        </h3>
        <p className="text-lg text-coz-gray leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Card Side */}
      <div className={`pl-28 lg:pl-0 ${isEven ? 'lg:pl-20' : 'lg:pr-20 lg:direction-ltr'}`}>
        <div
          ref={cardRef}
          className="group relative bg-white p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-none"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseEnter={() => setHovering(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Icon/Visual */}
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundColor: `${color}15` }}
          >
            <StepIcon index={index} color={color} />
          </div>

          {/* Highlights */}
          <div className="space-y-3">
            {step.highlights?.map((highlight, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-coz-gray">{highlight}</span>
              </div>
            )) || (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm text-coz-gray">Expert guidance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm text-coz-gray">Transparent process</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-sm text-coz-gray">Quality assured</span>
                </div>
              </>
            )}
          </div>

          {/* Corner Accent */}
          <div
            className="absolute bottom-0 right-0 w-20 h-20 opacity-10"
            style={{
              background: `linear-gradient(315deg, ${color} 0%, transparent 50%)`,
            }}
          />

          {/* Hover border effect */}
          <div
            className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ borderColor: color }}
          />
        </div>
      </div>
    </div>
  )
}

function StepIcon({ index, color }) {
  const icons = [
    // Inquiry - Chat bubble
    <svg key="0" className="w-8 h-8" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>,
    // Consultation - Users
    <svg key="1" className="w-8 h-8" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>,
    // Sourcing - Globe
    <svg key="2" className="w-8 h-8" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>,
    // Production - Cog
    <svg key="3" className="w-8 h-8" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
    </svg>,
    // Delivery - Truck
    <svg key="4" className="w-8 h-8" fill="none" stroke={color} viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>,
  ]

  return icons[index] || icons[0]
}
