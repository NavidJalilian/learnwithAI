'use client'

import React, { createContext, useContext, useState } from 'react'

interface ProgressContextType {
  progress: number
  setProgress: (progress: number) => void
  incrementProgress: (amount: number) => void
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgressState] = useState(0)

  const setProgress = (newProgress: number) => {
    setProgressState(Math.max(0, Math.min(100, newProgress)))
  }

  const incrementProgress = (amount: number) => {
    setProgressState((prev) => Math.max(0, Math.min(100, prev + amount)))
  }

  const resetProgress = () => {
    setProgressState(0)
  }

  const value: ProgressContextType = {
    progress,
    setProgress,
    incrementProgress,
    resetProgress,
  }

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  )
}
