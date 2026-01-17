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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left - Content */}
          <div>
            {/* Eyebrow */}
            <span className="inline-block text-xs font-medium tracking-[0.3em] text-coz-orange uppercase mb-8">
              About Us
            </span>

            {/* Heading */}
            <div className="overflow-hidden mb-8">
              <h2 ref={headingRef} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-coz-charcoal">
                Where Tradition 
                <br />
                Meets Tomorrow
                {/* <span className="text-coz-gray/50">Meets Tomorrow</span> */}
              </h2>
            </div>

            {/* Text Content */}
            <div ref={textRef} className="space-y-6 text-coz-gray leading-relaxed">
              <p className="text-lg">
                Every thread tells a story. Since 2009, we've been privileged to share
                India's most extraordinary textile stories with the world—stories woven
                through generations of master craftsmen, stories dyed in traditions older
                than time itself.
              </p>
              <p>
                We don't just source fabrics. We seek out the extraordinary—the Banarasi
                weaver whose family has perfected their craft for seven generations, the
                block printer in Jaipur whose patterns carry centuries of heritage, the
                modern mills pushing the boundaries of innovation.
              </p>
              <p>
                Excellence isn't a destination—it's our daily pursuit. Every piece we deliver
                carries the weight of our reputation, built on fifteen years of unwavering
                dedication to craft, quality, and the relationships we've nurtured along the way.
              </p>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 md:mt-12 pt-6 md:pt-8 border-t border-coz-silver/50">
              <div className="stat-item text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coz-orange">15+</span>
                <p className="text-xs sm:text-sm text-coz-gray mt-1">Years of Craft</p>
              </div>
              <div className="stat-item text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coz-blue">500+</span>
                <p className="text-xs sm:text-sm text-coz-gray mt-1">Artisan Networks</p>
              </div>
              <div className="stat-item text-center sm:text-left">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coz-green">25+</span>
                <p className="text-xs sm:text-sm text-coz-gray mt-1">Countries Reached</p>
              </div>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&q=80"
                alt="Indian textile craftsmanship"
                className="w-full h-full object-cover"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              />
            </div>

            {/* Floating Quote */}
            <div className="relative lg:absolute lg:-bottom-8 lg:-left-12 mt-6 lg:mt-0 bg-coz-charcoal text-white p-5 sm:p-6 lg:p-8 rounded-lg max-w-xs mx-auto lg:mx-0">
              <p className="text-sm lg:text-base italic leading-relaxed">
                "We don't just deliver textiles. We deliver trust."
              </p>
              <div className="mt-3 lg:mt-4 flex items-center gap-3">
                <div className="w-8 lg:w-10 h-0.5 bg-coz-orange" />
                <span className="text-xs text-white/60 uppercase tracking-wider">Our Promise</span>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  )
}
