import { useRef, useEffect } from 'react'
import { useInView } from '../../hooks/useInView'
import gsap from 'gsap'
import { cn } from '../../utils/cn'

export function RevealText({
  children,
  className,
  as: Component = 'div',
  delay = 0,
  duration = 0.8,
  y = 50,
  ...props
}) {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    if (isInView) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
        }
      )
    }
  }, [isInView, delay, duration, y])

  return (
    <Component ref={ref} className={cn('overflow-hidden', className)} {...props}>
      <div ref={textRef} style={{ opacity: 0, transform: `translateY(${y}px)` }}>
        {children}
      </div>
    </Component>
  )
}

export function RevealLines({
  children,
  className,
  as: Component = 'div',
  stagger = 0.1,
  delay = 0,
  ...props
}) {
  const { ref, isInView } = useInView({ threshold: 0.2 })
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !isInView) return

    const lines = containerRef.current.querySelectorAll('.reveal-line')
    gsap.fromTo(
      lines,
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger,
        delay,
        ease: 'power4.out',
      }
    )
  }, [isInView, stagger, delay])

  // Split children into lines if it's a string
  const content = typeof children === 'string'
    ? children.split('\n').map((line, i) => (
        <div key={i} className="split-line">
          <span className="reveal-line inline-block">{line}</span>
        </div>
      ))
    : children

  return (
    <Component ref={ref} className={className} {...props}>
      <div ref={containerRef}>{content}</div>
    </Component>
  )
}
