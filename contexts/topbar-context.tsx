"use client"

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react"

interface TopbarContextType {
  title?: string
  subtitle?: string
  actions?: ReactNode
  showQuickActions?: boolean
  setTopbarConfig: (config: {
    title?: string
    subtitle?: string
    actions?: ReactNode
    showQuickActions?: boolean
  }) => void
  resetTopbar: () => void
}

const TopbarContext = createContext<TopbarContextType | undefined>(undefined)

export function TopbarProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<{
    title?: string
    subtitle?: string
    actions?: ReactNode
    showQuickActions?: boolean
  }>({
    showQuickActions: true,
  })

  const setTopbarConfig = useCallback((newConfig: {
    title?: string
    subtitle?: string
    actions?: ReactNode
    showQuickActions?: boolean
  }) => {
    setConfig(newConfig)
  }, [])

  const resetTopbar = useCallback(() => {
    setConfig({ showQuickActions: true })
  }, [])

  return (
    <TopbarContext.Provider
      value={{
        ...config,
        setTopbarConfig,
        resetTopbar,
      }}
    >
      {children}
    </TopbarContext.Provider>
  )
}

export function useTopbar() {
  const context = useContext(TopbarContext)
  if (context === undefined) {
    throw new Error("useTopbar must be used within a TopbarProvider")
  }
  return context
}
