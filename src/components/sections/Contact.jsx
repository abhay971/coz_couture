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
      if (headingRef.current) {
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


  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-coz-cream overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[45%] xl:w-1/3 h-full bg-coz-charcoal hidden lg:block" />

      <div className="relative z-10 section-padding">
        <div className="container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-2 gap-10 lg:gap-8 xl:gap-16">
            {/* Left - Content */}
            <div className="lg:col-span-2 xl:col-span-1 lg:pr-4 xl:pr-12">
              <span className="inline-block text-base md:text-lg font-bold tracking-[0.3em] text-coz-orange uppercase mb-6">
                Let&apos;s Connect
              </span>

              <div ref={headingRef} className="mb-6 lg:mb-6 xl:mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-3xl xl:text-5xl font-bold leading-[1.3] tracking-tight text-coz-charcoal">
                  Start Your Journey With Us
                </h2>
              </div>

              <p className="text-base lg:text-base xl:text-lg text-coz-gray leading-relaxed mb-8 lg:mb-8 xl:mb-12 max-w-lg">
                Ready to bring exceptional quality to your brand? Share your requirements
                and our team will craft a tailored solution within 24 hours.
              </p>

              {/* Contact Info */}
              <div className="space-y-6 lg:space-y-4 xl:space-y-8">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-coz-gray uppercase block mb-2">
                    Email Us
                  </span>
                  <a
                    href="mailto:hello@cozcouture.com"
                    className="text-lg sm:text-xl lg:text-lg xl:text-2xl font-bold text-coz-charcoal hover:text-coz-orange transition-colors break-all sm:break-normal"
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
                  <p className="text-lg sm:text-xl lg:text-lg xl:text-2xl font-bold text-coz-charcoal">
                   +91 92741 66689
                  </p>
                </div>

              </div>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3 xl:col-span-1 lg:pl-4 xl:pl-12 lg:py-4 xl:py-8">
              <div className="bg-white p-5 sm:p-8 lg:p-6 xl:p-10 shadow-2xl">
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
                    <h3 className="text-lg lg:text-base xl:text-xl font-bold text-coz-charcoal mb-6 lg:mb-4 xl:mb-8 form-element">
                      Send us an inquiry
                    </h3>

                    <div className="space-y-5 lg:space-y-4 xl:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4 xl:gap-6">
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
                            className="w-full px-0 py-2 lg:py-2 xl:py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal text-sm lg:text-sm xl:text-base"
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
                            className="w-full px-0 py-2 lg:py-2 xl:py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal text-sm lg:text-sm xl:text-base"
                            placeholder="Full name"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-4 xl:gap-6">
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
                            className="w-full px-0 py-2 lg:py-2 xl:py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal text-sm lg:text-sm xl:text-base"
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
                            className="w-full px-0 py-2 lg:py-2 xl:py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal text-sm lg:text-sm xl:text-base"
                            placeholder="Your country"
                          />
                        </div>
                      </div>

                      <div className="form-element">
                        <label className="text-xs font-bold tracking-wider text-coz-gray uppercase block mb-2 lg:mb-2 xl:mb-3">
                          Interested In
                        </label>
                        <div className="flex flex-wrap gap-2 lg:gap-1.5 xl:gap-2">
                          {categories.slice(0, 6).map((cat) => (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => handleCategoryToggle(cat.id)}
                              className={`px-3 lg:px-2 xl:px-4 py-1.5 lg:py-1 xl:py-2 text-xs font-medium border transition-all ${
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
                          rows={3}
                          className="w-full px-0 py-2 lg:py-2 xl:py-3 bg-transparent border-b-2 border-coz-silver focus:border-coz-orange outline-none transition-colors text-coz-charcoal text-sm lg:text-sm xl:text-base resize-none"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>

                      <div className="form-element pt-2 lg:pt-2 xl:pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          onMouseEnter={() => setHovering(true)}
                          onMouseLeave={() => resetCursor()}
                          className="w-full py-3 lg:py-3 xl:py-4 bg-coz-charcoal text-white text-sm lg:text-sm xl:text-base font-bold tracking-wider uppercase hover:bg-coz-orange transition-colors disabled:opacity-50"
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