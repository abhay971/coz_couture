import { createContext, useContext, useState, useCallback } from 'react'

const CursorContext = createContext(null)

export function CursorProvider({ children }) {
  const [cursorState, setCursorState] = useState({
    isHovering: false,
    isClicking: false,
    text: '',
    variant: 'default', // default, text, hidden
  })

  const setHovering = useCallback((isHovering) => {
    setCursorState((prev) => ({ ...prev, isHovering }))
  }, [])

  const setClicking = useCallback((isClicking) => {
    setCursorState((prev) => ({ ...prev, isClicking }))
  }, [])

  const setCursorText = useCallback((text) => {
    setCursorState((prev) => ({ ...prev, text }))
  }, [])

  const setCursorVariant = useCallback((variant) => {
    setCursorState((prev) => ({ ...prev, variant }))
  }, [])

  const resetCursor = useCallback(() => {
    setCursorState({
      isHovering: false,
      isClicking: false,
      text: '',
      variant: 'default',
    })
  }, [])

  return (
    <CursorContext.Provider
      value={{
        cursorState,
        setHovering,
        setClicking,
        setCursorText,
        setCursorVariant,
        resetCursor,
      }}
    >
      {children}
    </CursorContext.Provider>
  )
}

export function useCursor() {
  const context = useContext(CursorContext)
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider')
  }
  return context
}
