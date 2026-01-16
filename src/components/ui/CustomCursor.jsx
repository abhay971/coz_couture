import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useCursor } from '../../context/CursorContext'

export function CustomCursor() {
  const cursorRef = useRef(null)
  const cursorInnerRef = useRef(null)
  const cursorTextRef = useRef(null)
  const { cursorState } = useCursor()
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isOverProtected, setIsOverProtected] = useState(false)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    const cursor = cursorRef.current
    const cursorInner = cursorInnerRef.current

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Check if hovering over protected elements (logo, brand colors)
      const element = document.elementFromPoint(e.clientX, e.clientY)
      const isProtected = element?.closest('[data-cursor-protect]') !== null
      setIsOverProtected(isProtected)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Smooth animation loop
    const animate = () => {
      const lerp = 0.12
      positionRef.current.x += (targetRef.current.x - positionRef.current.x) * lerp
      positionRef.current.y += (targetRef.current.y - positionRef.current.y) * lerp

      if (cursor) {
        cursor.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%)`
      }

      // Inner cursor follows faster
      if (cursorInner) {
        const innerLerp = 0.25
        const innerX = positionRef.current.x + (targetRef.current.x - positionRef.current.x) * innerLerp
        const innerY = positionRef.current.y + (targetRef.current.y - positionRef.current.y) * innerLerp
        cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%)`
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isTouchDevice, isVisible])

  // Handle cursor state changes
  useEffect(() => {
    if (!cursorRef.current || isTouchDevice) return

    const cursor = cursorRef.current

    if (cursorState.isHovering) {
      gsap.to(cursor, {
        width: 80,
        height: 80,
        duration: 0.4,
        ease: 'power3.out',
      })
    } else {
      gsap.to(cursor, {
        width: 40,
        height: 40,
        duration: 0.4,
        ease: 'power3.out',
      })
    }
  }, [cursorState.isHovering, isTouchDevice])

  if (isTouchDevice) return null

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] ${
          isOverProtected ? '' : 'mix-blend-difference'
        }`}
        style={{
          width: 40,
          height: 40,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <div
          className="w-full h-full rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isOverProtected ? 'rgba(243, 126, 58, 0.9)' : 'white',
          }}
        >
          {cursorState.text && (
            <span
              ref={cursorTextRef}
              className={`text-[10px] font-bold tracking-wider uppercase ${
                isOverProtected ? 'text-white' : 'text-black'
              }`}
            >
              {cursorState.text}
            </span>
          )}
        </div>
      </div>

      {/* Inner dot */}
      <div
        ref={cursorInnerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          opacity: isVisible && !cursorState.isHovering ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      >
        <div className="w-full h-full rounded-full bg-coz-orange" />
      </div>
    </>
  )
}
