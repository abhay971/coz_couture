import { useRef, useEffect } from 'react'
import { useInView } from '../../hooks/useInView'
import gsap from 'gsap'
import { cn } from '../../utils/cn'

export function ImageReveal({
  src,
  alt,
  className,
  overlayColor = '#1A1A1A',
  duration = 1.2,
  delay = 0,
  direction = 'left', // left, right, top, bottom
}) {
  const { ref, isInView } = useInView({ threshold: 0.3 })
  const overlayRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    if (!overlayRef.current || !imageRef.current) return

    if (isInView) {
      const tl = gsap.timeline({ delay })

      // Determine transform origin and animation based on direction
      const origins = {
        left: { origin: 'right', prop: 'scaleX' },
        right: { origin: 'left', prop: 'scaleX' },
        top: { origin: 'bottom', prop: 'scaleY' },
        bottom: { origin: 'top', prop: 'scaleY' },
      }

      const { origin, prop } = origins[direction]

      gsap.set(overlayRef.current, { transformOrigin: origin })

      tl.to(overlayRef.current, {
        [prop]: 0,
        duration,
        ease: 'power4.inOut',
      })

      tl.fromTo(
        imageRef.current,
        { scale: 1.3 },
        { scale: 1, duration: duration * 1.2, ease: 'power2.out' },
        0
      )
    }
  }, [isInView, duration, delay, direction])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10"
        style={{ backgroundColor: overlayColor }}
      />
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ transform: 'scale(1.3)' }}
      />
    </div>
  )
}
