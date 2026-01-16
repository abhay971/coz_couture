import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks, socialLinks } from '../../data/navigation'
import { capabilities } from '../../data/stats'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const { setHovering, resetCursor } = useCursor()
  const footerRef = useRef(null)
  const marqueeRef = useRef(null)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Marquee animation
      gsap.to('.marquee-track', {
        xPercent: -50,
        duration: 25,
        ease: 'none',
        repeat: -1,
      })

      // Reveal animations
      gsap.fromTo(
        '.footer-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          },
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={footerRef} className="bg-coz-charcoal text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Marquee CTA Section */}
      <div ref={marqueeRef} className="border-b border-white/10">
        <div className="relative py-16 lg:py-24">
          {/* Marquee Background - Behind */}
          <div className="absolute inset-0 overflow-hidden flex items-center">
            <div className="marquee-track flex whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center shrink-0">
                  <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent stroke-text uppercase tracking-tight px-8">
                    Let's Create Together
                  </span>
                  <span className="w-4 h-4 rounded-full bg-coz-orange mx-8" />
                  <span className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent stroke-text uppercase tracking-tight px-8">
                    Have a Project?
                  </span>
                  <span className="w-4 h-4 rounded-full bg-coz-blue mx-8" />
                </div>
              ))}
            </div>
          </div>

          {/* Centered CTA Button - In front */}
          {/* <div className="relative z-10 flex items-center justify-center">
            <button
              onClick={() => scrollToSection('#contact')}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => resetCursor()}
              className="group relative px-10 py-5 bg-coz-orange text-white font-semibold tracking-wide overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-3">
                Get in Touch
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <span className="absolute inset-0 flex items-center justify-center gap-3 text-coz-charcoal opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                Get in Touch
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </div> */}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative py-16 lg:py-20">
        <div className="container-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {/* Brand Section */}
            <div className="footer-reveal">
              <img
                src="/logo/COZ_COUTURE_White.png"
                alt="COZ COUTURE"
                className="h-12 w-auto mb-3"
              />
              <p className="text-white/70 text-sm font-medium tracking-wider uppercase mb-6">
                CLUB of Lifestyle Products
              </p>


              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/50 hover:bg-coz-orange hover:border-coz-orange hover:text-white transition-all duration-300"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => resetCursor()}
                    aria-label={social.label}
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="footer-reveal">
              <h4 className="text-xs font-bold tracking-[0.25em] text-coz-orange uppercase mb-6">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
                      onMouseEnter={() => setHovering(true)}
                      onMouseLeave={() => resetCursor()}
                    >
                      <span className="w-0 h-px bg-coz-orange group-hover:w-4 transition-all duration-300" />
                      <span className="text-sm tracking-wide">{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-reveal">
              <h4 className="text-xs font-bold tracking-[0.25em] text-coz-orange uppercase mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('#capabilities')}
                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => resetCursor()}
                  >
                    <span className="w-0 h-px bg-coz-orange group-hover:w-4 transition-all duration-300" />
                    
                    <span className="text-sm tracking-wide">Global Logistics</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#capabilities')}
                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => resetCursor()}
                  >
                    <span className="w-0 h-px bg-coz-orange group-hover:w-4 transition-all duration-300" />
                    
                     <span className="text-sm tracking-wide">Quality Assurance</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#capabilities')}
                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => resetCursor()}
                  >
                    <span className="w-0 h-px bg-coz-orange group-hover:w-4 transition-all duration-300" />
                    
                    <span className="text-sm tracking-wide">Custom Manufacturing</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#capabilities')}
                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => resetCursor()}
                  >
                    <span className="w-0 h-px bg-coz-orange group-hover:w-4 transition-all duration-300" />
                   
                    <span className="text-sm tracking-wide">Sampling & Prototyping</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('#capabilities')}
                    className="group flex items-center gap-3 text-white/60 hover:text-white transition-colors duration-300"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => resetCursor()}
                  >
                    <span className="w-0 h-px bg-coz-orange group-hover:w-4 transition-all duration-300" />
                    <span className="text-sm tracking-wide">Private Label Production</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Our Offices Section */}
      <div className="relative py-16 border-t border-white/10">
        <div className="container-padding">
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
              Our Offices
            </h3>
            <div className="w-12 h-1 bg-coz-orange mx-auto" />
          </div>

          {/* Office Locations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 max-w-5xl mx-auto">
            {/* India */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-coz-orange" />
                <span className="text-sm font-bold tracking-[0.2em] text-coz-orange uppercase">
                  India
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                5 Laxmi Soc, OP Road,<br />
                Vadodara - 07, Gujarat, INDIA.
              </p>
            </div>

            {/* USA */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-coz-orange" />
                <span className="text-sm font-bold tracking-[0.2em] text-coz-orange uppercase">
                  USA
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                6313 Plumcreek Road,<br />
                Frisco, Texas - 75036, USA.
              </p>
            </div>

            {/* UAE */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-coz-orange" />
                <span className="text-sm font-bold tracking-[0.2em] text-coz-orange uppercase">
                  UAE
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                Meydan FZ, 6th Floor,<br />
                Al Meydan Rd, Dubai, UAE.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative py-8 border-t border-white/5">
        <div className="container-padding">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-white/30">
              &copy; {currentYear} COZ COUTURE. All rights reserved.
            </p>
             <a
              href="https://www.cozclub.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 order-2 lg:order-3"
            >
              <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">A</span>
              <img
                src="/logo/footer_logo.png"
                alt="COZ CLUB"
                className="h-8 w-auto hover:scale-110 transition-transform duration-300"
              />
              <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">Company</span>
            </a>
          </div>
        </div>
      </div>

      {/* CSS for stroke text */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </footer>
  )
}

function SocialIcon({ name }) {
  switch (name) {
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    default:
      return null
  }
}
