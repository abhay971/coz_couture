import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '../../data/categories'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function Categories() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const gridRef = useRef(null)

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

      // Grid cards stagger animation
      const cards = gridRef.current?.querySelectorAll('.category-card')
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 100,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: {
              amount: 0.6,
              from: 'start'
            },
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="relative bg-coz-cream overflow-hidden"
    >
      <div className="section-padding container-padding">
        {/* Centered Header */}
        <div className="text-center mb-12 lg:mb-12">
          <span className="inline-block text-base md:text-lg font-bold tracking-[0.3em] text-coz-orange uppercase mb-6">
            What We Offer
          </span>
          <div ref={headingRef}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-coz-charcoal mb-6">
              Our Categories
            </h2>
            
          </div>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-12 lg:mt-16">
          <p className="text-coz-gray text-sm tracking-wider uppercase mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex items-center gap-3 sm:gap-4"
          >
            <span className="text-base sm:text-xl lg:text-xl font-medium text-coz-charcoal group-hover:text-coz-orange transition-colors duration-500">
              Let&apos;s discuss your requirements
            </span>
            <span className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-coz-charcoal/20 flex items-center justify-center overflow-hidden group-hover:border-coz-orange transition-colors duration-500">
              <span className="absolute inset-0 bg-coz-orange scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-coz-charcoal group-hover:text-white relative z-10 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div> */}
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
    setCursorText('Explore')

    // Image zoom
    gsap.to(imageRef.current, {
      scale: 1.1,
      duration: 0.8,
      ease: 'power2.out',
    })

    // Content lift
    gsap.to(contentRef.current, {
      y: -8,
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
  }

  // Determine card height based on position for bento effect
  const getCardHeight = () => {
    // Row 1: Fabrics (large), Apparel (normal), Technical Textile (normal)
    // Row 2: Footwear (normal), Accessories (normal), Jewellery (large)
    if (index === 0) return 'h-[400px] md:h-[450px] lg:h-[500px] md:row-span-1'
    if (index === 5) return 'h-[400px] md:h-[450px] lg:h-[500px] md:row-span-1'
    return 'h-[350px] md:h-[400px] lg:h-[450px]'
  }

  return (
    <div
      ref={cardRef}
      className={`category-card relative overflow-hidden rounded-2xl cursor-none ${getCardHeight()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8"
      >
        {/* Category Number */}
        <span
          className="text-white/40 text-sm font-medium tracking-widest mb-2"
          style={{ fontFamily: 'monospace' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Category Name */}
        <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 leading-tight">
          {category.name}
        </h3>

        {/* Description - Reveals on hover */}
        <div className={`overflow-hidden transition-all duration-500 ${
          isHovered ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <p className="text-sm lg:text-base text-white/80 leading-relaxed pr-4">
            {category.description}
          </p>
        </div>

        {/* Explore Link */}
        <div className={`flex items-center gap-2 mt-4 transition-all duration-500 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
        }`}>
          <span className="text-sm font-medium text-white uppercase tracking-wider">
            Explore
          </span>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>

        {/* Corner Accent */}
        <div
          className={`absolute top-4 right-4 w-3 h-3 rounded-full transition-all duration-500 ${
            isHovered ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}
          style={{ backgroundColor: category.color }}
        />
      </div>

      {/* Hover Border */}
      <div
        className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 pointer-events-none ${
          isHovered ? 'border-white/30' : 'border-transparent'
        }`}
      />
    </div>
  )
}
