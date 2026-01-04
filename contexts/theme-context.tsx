"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("genesis-theme") as Theme | null
    if (stored && (stored === "light" || stored === "dark")) {
      setTheme(stored)
      applyTheme(stored)
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement
    const body = document.body

    // Remove classe dark
    html.classList.remove("dark")
    body.classList.remove("dark")

    // Aplica classe dark se necessario
    if (newTheme === "dark") {
      html.classList.add("dark")
      body.classList.add("dark")
      html.style.colorScheme = "dark"
    } else {
      html.style.colorScheme = "light"
    }

    // Salva no localStorage
    localStorage.setItem("genesis-theme", newTheme)
  }

  useEffect(() => {
    if (mounted) {
      applyTheme(theme)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
