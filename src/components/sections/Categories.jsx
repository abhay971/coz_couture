import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '../../data/categories'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function Categories() {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)
  const horizontalRef = useRef(null)
  const headingRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { yPercent: 50, opacity: 0 },
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

      // Calculate scroll distance
      const getScrollDistance = () => {
        const containerWidth = horizontalRef.current?.scrollWidth || 0
        const viewportWidth = window.innerWidth
        return containerWidth - viewportWidth
      }

      // Horizontal scroll animation
      const horizontalScroll = gsap.to(horizontalRef.current, {
        x: () => -getScrollDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const newIndex = Math.floor(self.progress * categories.length)
            setActiveIndex(Math.min(newIndex, categories.length - 1))
          },
        },
      })

      // Parallax effect for each card image
      const cards = horizontalRef.current?.querySelectorAll('.category-card')
      cards?.forEach((card) => {
        const image = card.querySelector('.card-image')
        gsap.to(image, {
          xPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalScroll,
            start: 'left right',
            end: 'right left',
            scrub: 1,
          },
        })
      })

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative bg-white overflow-hidden"
    >
      {/* Header Section */}
      <div className="relative z-20 pt-32 pb-20">
        <div className="container-padding">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            {/* Left - Heading */}
            <div className="max-w-3xl">
              <span className="inline-block text-xs font-medium tracking-[0.3em] text-coz-orange uppercase mb-6">
                Our Categories
              </span>
              <div ref={headingRef}>
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-coz-charcoal">
                  Explore Our
                  <br />
                  <span className="text-coz-gray/50">Collections</span>
                </h2>
              </div>
            </div>

            {/* Right - Counter */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl lg:text-7xl font-light text-coz-charcoal tabular-nums">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl text-coz-gray/30">/</span>
                  <span className="text-xl text-coz-gray/30">
                    {String(categories.length).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Section */}
      <div ref={triggerRef} className="relative h-screen overflow-hidden">
        <div
          ref={horizontalRef}
          className="flex gap-6 lg:gap-8 pl-8 lg:pl-16 pr-[50vw] h-full items-center"
          style={{ width: 'fit-content' }}
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-20 py-20 bg-coz-cream">
        <div className="container-padding text-center">
          <p className="text-coz-gray text-sm tracking-wider uppercase mb-8">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-4"
          >
            <span className="text-xl lg:text-2xl font-medium text-coz-charcoal group-hover:text-coz-orange transition-colors duration-500">
              Let&apos;s discuss your requirements
            </span>
            <span className="relative w-14 h-14 rounded-full border border-coz-charcoal/20 flex items-center justify-center overflow-hidden group-hover:border-coz-orange transition-colors duration-500">
              <span className="absolute inset-0 bg-coz-orange scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
              <svg
                className="w-5 h-5 text-coz-charcoal group-hover:text-white relative z-10 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ category, index }) {
  const { setHovering, setCursorText, resetCursor } = useCursor()
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    setHovering(true)
    setCursorText('View')

    gsap.to(imageRef.current, {
      scale: 1.08,
      duration: 0.8,
      ease: 'power2.out',
    })

    gsap.to(contentRef.current, {
      y: -10,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    resetCursor()

    gsap.to(imageRef.current, {
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    })

    gsap.to(contentRef.current, {
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    })

    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(cardRef.current, {
      rotateY: x * 0.015,
      rotateX: -y * 0.015,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={cardRef}
      className="category-card relative shrink-0 w-[85vw] md:w-[55vw] lg:w-[38vw] h-[55vh] md:h-[60vh] lg:h-[65vh] cursor-none"
      style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full overflow-hidden rounded-xl bg-coz-charcoal">
        {/* Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            ref={imageRef}
            src={category.image}
            alt={category.name}
            className="card-image w-[115%] h-full object-cover opacity-90"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div
          ref={contentRef}
          className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8"
        >
          {/* Index */}
          <span className="text-white/30 text-sm font-medium tracking-widest mb-3">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-3 leading-tight">
            {category.name}
          </h3>

          {/* Description - Shows on hover */}
          <p className={`text-sm text-white/60 mb-4 max-w-sm leading-relaxed transition-all duration-400 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            {category.description}
          </p>

          {/* Tags - Shows on hover */}
          <div className={`flex flex-wrap gap-2 transition-all duration-400 delay-75 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            {category.details?.slice(0, 3).map((detail, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs text-white/70 bg-white/10 rounded-full"
              >
                {detail}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className={`absolute inset-0 rounded-xl border transition-all duration-400 pointer-events-none ${
          isHovered ? 'border-white/20' : 'border-transparent'
        }`} />
      </div>
    </div>
  )
}
