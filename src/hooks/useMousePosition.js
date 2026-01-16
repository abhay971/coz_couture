import { useState, useEffect, useCallback, useRef } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const targetRef = useRef({ x: 0, y: 0 })

  const lerp = (start, end, factor) => start + (end - start) * factor

  const handleMouseMove = useCallback((e) => {
    targetRef.current = { x: e.clientX, y: e.clientY }
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, targetRef.current.x, 0.15),
        y: lerp(prev.y, targetRef.current.y, 0.15),
      }))
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleMouseMove])

  return { position, smoothPosition }
}
