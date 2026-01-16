import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks } from '../../data/navigation'
import { useCursor } from '../../context/CursorContext'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { setHovering, resetCursor } = useCursor()

  useEffect(() => {
    const handleScroll = () => {
      // Show full header after scrolling past hero section (100vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Hero Header - Only visible when not scrolled */}
      <div
        className={`fixed top-0 left-0 right-0 z-100 py-6 transition-all duration-700 ${
          isScrolled || isMobileMenuOpen ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100'
        }`}
      >
        <div className="container-padding flex items-center justify-between">
          {/* Logo - Top Left */}
          <a
            href="#"
            data-cursor-protect
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => resetCursor()}
          >
            <img
              src="/logo/COZ_COUTURE_White.png"
              alt="COZ COUTURE Logo"
              className="h-12 w-auto"
              data-cursor-protect
            />
            <span className="font-bold text-white mt-1 tracking-wide">
                CLUB of Lifestyle Products
              </span>
          </a>

          {/* Mobile Menu Button - Hero */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className="w-6 h-0.5 block bg-white" />
              <span className="w-6 h-0.5 block bg-white" />
              <span className="w-6 h-0.5 block bg-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Full Header - Visible when scrolled */}
      <header
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-700 ${
          isScrolled
            ? 'py-4 bg-coz-cream/95 backdrop-blur-md translate-y-0 opacity-100'
            : 'py-6 bg-transparent -translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-padding flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="relative z-10 group"
            data-cursor-protect
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => resetCursor()}
          >
            <img
              src="/logo/COZ_COUTURE.png"
              alt="COZ COUTURE Logo"
              className="h-12 w-auto transition-opacity duration-500"
              data-cursor-protect
            />
            <span className="font-bold text-gray-900 mt-1 tracking-wide">
                CLUB of Lifestyle Products
              </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium tracking-wide relative overflow-hidden group transition-colors text-coz-gray hover:text-coz-charcoal"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => resetCursor()}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-px transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 bg-coz-orange" />
              </button>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          {/* <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('#contact')}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => resetCursor()}
              className="px-6 py-3 text-sm font-medium tracking-wider uppercase transition-all duration-300 bg-coz-charcoal text-white hover:bg-coz-orange"
            >
              Get in Touch
            </button>
          </div> */}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-6 h-0.5 block transition-colors ${
                  isMobileMenuOpen ? 'bg-coz-charcoal' : 'bg-coz-charcoal'
                }`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="w-6 h-0.5 block bg-coz-charcoal"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`w-6 h-0.5 block transition-colors ${
                  isMobileMenuOpen ? 'bg-coz-charcoal' : 'bg-coz-charcoal'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-99 bg-coz-cream lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-3xl md:text-4xl font-bold text-coz-charcoal hover:text-coz-orange transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
                className="mt-8"
              >
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="px-8 py-4 bg-coz-charcoal text-white font-bold tracking-wider uppercase"
                >
                  Get in Touch
                </button>
              </motion.div>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <p className="text-xs text-coz-gray tracking-widest uppercase">
                  Crafted with Purpose
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
