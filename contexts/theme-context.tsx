"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "aahbrant" | "dark" | "high-contrast"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("aahbrant")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("genesis-theme") as Theme | null
    if (stored) {
      setTheme(stored)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement

    // Remove todas as classes de tema
    root.classList.remove("dark", "high-contrast")

    // Aplica a classe correta
    if (theme === "dark") {
      root.classList.add("dark")
    } else if (theme === "high-contrast") {
      root.classList.add("high-contrast")
    }

    // Salva no localStorage
    localStorage.setItem("genesis-theme", theme)
  }, [theme, mounted])

  if (!mounted) {
    return null
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
