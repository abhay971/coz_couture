import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const statsRef = useRef(null)
  const { setHovering } = useCursor()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { yPercent: 100, opacity: 0 },
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

      // Text paragraphs stagger
      const paragraphs = textRef.current?.querySelectorAll('p')
      if (paragraphs) {
        gsap.fromTo(
          paragraphs,
          { yPercent: 40, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 80%',
            },
          }
        )
      }

      // Image parallax
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: 15, scale: 1.1 },
          {
            yPercent: -15,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        )
      }

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item')
      if (statItems) {
        gsap.fromTo(
          statItems,
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-coz-cream overflow-hidden"
    >
      {/* Main Content */}
      <div className="section-padding container-padding">
        {/* Centered Main Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="overflow-hidden">
            <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight text-coz-orange">
              CLUB of Lifestyle
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-stretch">
          {/* Left - Content */}
          <div className="flex flex-col">
            {/* Section Label */}
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold leading-tight tracking-tight text-coz-charcoal">
                Where Tradition Meets Tomorrow
              </h3>
            </div>

            {/* Text Content */}
            <div ref={textRef} className="space-y-6 text-coz-gray justify-center text-justify leading-relaxed">
              <p className="text-lg">
                Every thread tells a story. Since 2009, we've been connecting global brands
                with exceptional textile manufacturing—partnering with skilled craftsmen and
                state-of-the-art facilities to deliver products that exceed expectations.
              </p>
              <p className="text-lg">
                We don't just source materials. We seek out the extraordinary—the master
                weavers who have perfected their craft over generations, the innovative
                manufacturers who blend traditional techniques with cutting-edge technology,
                and the quality-focused facilities that set industry standards.
              </p>
              <p className="text-lg">
                Excellence isn't a destination—it's our daily pursuit. Every piece we deliver
                carries the weight of our reputation, built on fifteen years of unwavering
                dedication to craft, quality, and the partnerships we've nurtured along the way.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 md:mt-12 pt-6 md:pt-8 border-t border-coz-silver/50">
              <div className="stat-item text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coz-orange">15+</span>
                <p className="text-xs sm:text-sm text-coz-gray mt-1">Years of Excellence</p>
              </div>
              <div className="stat-item text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coz-blue">500+</span>
                <p className="text-xs sm:text-sm text-coz-gray mt-1">Global Partners</p>
              </div>
              <div className="stat-item text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coz-green">25+</span>
                <p className="text-xs sm:text-sm text-coz-gray mt-1">Countries Served</p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative flex flex-col">
            <div className="relative flex-1 min-h-[300px] lg:min-h-0 overflow-hidden rounded-lg">
              <img
                ref={imageRef}
                src="/about/about.png"
                alt="Textile manufacturing excellence"
                className="absolute inset-0 w-full h-full object-cover"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              />
            </div>

            {/* Floating Quote */}
            <div className="relative lg:absolute lg:-bottom-6 xl:-bottom-8 lg:-left-8 xl:-left-12 mt-6 lg:mt-0 bg-coz-charcoal text-white p-5 sm:p-6 lg:p-6 xl:p-8 rounded-lg max-w-xs mx-auto lg:mx-0">
              <p className="text-sm lg:text-base italic leading-relaxed">
                "We don't just deliver textiles, <br/>
                We deliver trust."
              </p>
              <div className="mt-3 lg:mt-4 flex items-center justify-end gap-3">
                <span className="text-xs text-white/60 uppercase tracking-wider">Our Promise</span>
                <div className="w-8 lg:w-10 h-0.5 bg-coz-orange" />
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  )
}
