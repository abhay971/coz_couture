import { useRef, useEffect, useState } from 'react'
import { useInView } from '../../hooks/useInView'
import gsap from 'gsap'

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
}) {
  const { ref, isInView } = useInView({ threshold: 0.5 })
  const [displayValue, setDisplayValue] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true

      const obj = { val: 0 }
      gsap.to(obj, {
        val: value,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayValue(Math.round(obj.val))
        },
      })
    }
  }, [isInView, value, duration])

  const formatNumber = (num) => {
    return num.toLocaleString()
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  )
}
