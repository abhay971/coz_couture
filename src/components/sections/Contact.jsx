import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '../../data/categories'
import { useCursor } from '../../context/CursorContext'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const { setHovering, resetCursor } = useCursor()

  const [formState, setFormState] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    country: '',
    categories: [],
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

      // Form animation
      const formElements = formRef.current?.querySelectorAll('.form-element')
      if (formElements) {
        gsap.fromTo(
          formElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 75%',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryToggle = (categoryId) => {
    setFormState((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const renderSplitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="inline-block overflow-hidden">
        <span className={`char inline-block ${char === ' ' ? 'w-[0.25em]' : ''}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      </span>
    ))
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-coz-cream overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-coz-charcoal hidden lg:block" />

      <div className="relative z-10 section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Content */}
            <div className="lg:pr-12">
              <span className="inline-block text-xs font-bold tracking-[0.3em] text-coz-orange uppercase mb-6">
                Let&apos;s Connect
              </span>

              <div ref={headingRef} className="overflow-hidden mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-coz-charcoal">
                  {renderSplitText('Start Your Journey With Us')}
                </h2>
              </div>

              <p className="text-lg text-coz-gray leading-relaxed mb-12 max-w-lg">
                Ready to bring Indian craftsmanship to your brand? Share your requirements
                and our team will craft a tailored solution within 24 hours.
              </p>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-coz-gray uppercase block mb-2">
                    Email Us
                  </span>
                  <a
                    href="mailto:hello@cozcouture.com"
                    className="text-lg sm:text-xl md:text-2xl font-bold text-coz-charcoal hover:text-coz-orange transition-colors break-all sm:break-normal"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => resetCursor()}
                  >
                    contact@cozclub.com
                  </a>
                </div>

                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-coz-gray uppercase block mb-2">
                    Call Us
                  </span>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-coz-charcoal">
                   +91 92741 66689
                  </p>
                </div>

              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:pl-12 lg:py-8">
              <div className="bg-white p-5 sm:p-8 md:p-12 shadow-2xl">
                {isSubmitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-coz-green rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-coz-charcoal mb-4">Thank You!</h3>
                    <p className="text-coz-gray">
                      Your inquiry has been received. We&apos;ll get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <h3 className="text-xl font-bold text-coz-charcoal mb-8 form-element">
                      Send us an inquiry
                    </h3>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-element">
                          <label className="text-xs font-bold tracking-wider text-coz-gray uppercase block mb-2">
                            Company *
                          </label>
                          <input
                            type="text"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                            required
                            className="w-full px-0 py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal"
                            placeholder="Your company name"
                          />
                        </div>
                        <div className="form-element">
                          <label className="text-xs font-bold tracking-wider text-coz-gray uppercase block mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full px-0 py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal"
                            placeholder="Full name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-element">
                          <label className="text-xs font-bold tracking-wider text-coz-gray uppercase block mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full px-0 py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal"
                            placeholder="email@company.com"
                          />
                        </div>
                        <div className="form-element">
                          <label className="text-xs font-bold tracking-wider text-coz-gray uppercase block mb-2">
                            Country
                          </label>
                          <input
                            type="text"
                            name="country"
                            value={formState.country}
                            onChange={handleChange}
                            className="w-full px-0 py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal"
                            placeholder="Your country"
                          />
                        </div>
                      </div>

                      <div className="form-element">
                        <label className="text-xs font-bold tracking-wider text-coz-gray uppercase block mb-3">
                          Interested In
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {categories.slice(0, 6).map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => handleCategoryToggle(cat.id)}
                              className={`px-4 py-2 text-xs font-medium border transition-all ${
                                formState.categories.includes(cat.id)
                                  ? 'bg-coz-charcoal text-white border-coz-charcoal'
                                  : 'bg-transparent text-coz-gray border-coz-silver hover:border-coz-charcoal'
                              }`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="form-element">
                        <label className="text-xs font-bold tracking-wider text-coz-gray uppercase block mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-0 py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal resize-none"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>

                      <div className="form-element pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onMouseEnter={() => setHovering(true)}
                          onMouseLeave={() => resetCursor()}
                          className="w-full py-4 bg-coz-charcoal text-white font-bold tracking-wider uppercase hover:bg-coz-orange transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            'Send Inquiry'
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
