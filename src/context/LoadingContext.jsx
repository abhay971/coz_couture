import { createContext, useContext, useState, useCallback } from 'react'

const LoadingContext = createContext(null)

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  const completeLoading = useCallback(() => {
    setProgress(100)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  const updateProgress = useCallback((value) => {
    setProgress(value)
  }, [])

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        progress,
        completeLoading,
        updateProgress,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}
