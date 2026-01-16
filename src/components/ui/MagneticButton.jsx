import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useCursor } from '../../context/CursorContext'
import { cn } from '../../utils/cn'

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  onClick,
  ...props
}) {
  const buttonRef = useRef(null)
  const innerRef = useRef(null)
  const { setHovering, setClicking } = useCursor()

  useEffect(() => {
    const button = buttonRef.current
    const inner = innerRef.current
    if (!button || !inner) return

    // Check for fine pointer
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer) return

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY

      gsap.to(button, {
        x: distanceX * strength,
        y: distanceY * strength,
        duration: 0.3,
        ease: 'power2.out',
      })

      gsap.to(inner, {
        x: distanceX * strength * 0.5,
        y: distanceY * strength * 0.5,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      setHovering(true)
    }

    const handleMouseLeave = () => {
      setHovering(false)
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    const handleMouseDown = () => setClicking(true)
    const handleMouseUp = () => setClicking(false)

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
    button.addEventListener('mousedown', handleMouseDown)
    button.addEventListener('mouseup', handleMouseUp)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('mouseleave', handleMouseLeave)
      button.removeEventListener('mousedown', handleMouseDown)
      button.removeEventListener('mouseup', handleMouseUp)
    }
  }, [strength, setHovering, setClicking])

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={cn('magnetic-wrap', className)}
      {...props}
    >
      <span ref={innerRef} className="inline-block">
        {children}
      </span>
    </button>
  )
}
