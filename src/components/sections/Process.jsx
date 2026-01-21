import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../../data/stats'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function Process() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const colors = ['#F37E3A', '#288EC2', '#6EBD49', '#1A1A1A']

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-coz-cream overflow-hidden"
    >
      <div className="section-padding container-padding">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          <span className="inline-block text-sm font-bold tracking-[0.3em] text-coz-orange uppercase mb-6">
            How It Works
          </span>
          <div ref={headingRef}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-none tracking-tight text-coz-charcoal">
              Your Vision, Our Mission
            </h2>
          </div>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* Left - Step Navigation */}
          <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <div className="space-y-2">
              {processSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className="w-full text-left group"
                >
                  <div className="flex items-center gap-6 py-6 px-4 transition-all duration-500">
                    {/* Number Circle */}
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shrink-0 ${
                        activeStep === index ? 'scale-110' : 'scale-100'
                      }`}
                      style={{
                        backgroundColor: activeStep === index ? colors[index] : '#F5F5F5',
                      }}
                    >
                      <span
                        className={`text-xl font-bold transition-colors duration-500 ${
                          activeStep === index ? 'text-white' : 'text-coz-gray'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="flex-1">
                      <h3
                        className={`text-lg lg:text-xl xl:text-2xl font-bold transition-colors duration-500 ${
                          activeStep === index ? 'text-coz-charcoal' : 'text-coz-gray'
                        }`}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Arrow */}
                    <svg
                      className={`w-6 h-6 transition-all duration-500 ${
                        activeStep === index
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4'
                      }`}
                      style={{ color: colors[index] }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>

                  {/* Active Indicator Line */}
                  <div
                    className="h-0.5 transition-all duration-500 origin-left"
                    style={{
                      backgroundColor: colors[index],
                      transform: activeStep === index ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Step Content */}
          <div className="col-span-12 lg:col-span-8">
            <div className="relative min-h-[400px] lg:min-h-[450px] xl:min-h-[500px]">
              {processSteps.map((step, index) => (
                <StepContent
                  key={step.id}
                  step={step}
                  index={index}
                  isActive={activeStep === index}
                  color={colors[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StepContent({ step, index, isActive, color }) {
  const { setHovering, resetCursor } = useCursor()
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      if (isActive) {
        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          }
        )
      } else {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: 'power2.in',
        })
      }
    }
  }, [isActive])

  return (
    <div
      ref={contentRef}
      className={`absolute inset-0 transition-all duration-300 ${
        isActive ? 'pointer-events-auto z-10' : 'pointer-events-none z-0'
      }`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => resetCursor()}
    >
      <div className="bg-white p-6 lg:p-8 xl:p-12 rounded-2xl h-full flex flex-col overflow-hidden">
        {/* Step Label */}
        <div className="mb-4 lg:mb-6">
          <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
            <div className="w-10 lg:w-12 h-1" style={{ backgroundColor: color }} />
            <span
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color }}
            >
              Step {step.number}
            </span>
          </div>
          <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-coz-charcoal leading-tight">
            {step.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm lg:text-base xl:text-lg text-coz-gray leading-relaxed mb-4 lg:mb-6 justify-center text-justify">
          {step.description}
        </p>

        {/* Highlights */}
        {step.highlights && (
          <div className="mt-auto space-y-2 lg:space-y-3">
            {step.highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-3 lg:gap-4">
                <div
                  className="w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ backgroundColor: `${color}20` }}
                >
                  <svg
                    className="w-2.5 h-2.5 lg:w-3 lg:h-3"
                    style={{ color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-sm lg:text-base text-coz-gray">{highlight}</span>
              </div>
            ))}
          </div>
        )}

        {/* Decorative Element */}
        <div className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 opacity-5 pointer-events-none">
          <span
            className="text-[8rem] lg:text-[10rem] xl:text-[12rem] font-bold leading-none"
            style={{ color }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
