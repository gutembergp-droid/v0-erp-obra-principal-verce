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
  const [theme, setThemeState] = useState<Theme>("light")
  const [mounted, setMounted] = useState(false)

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    // Remove todas as classes de tema
    root.classList.remove("light", "dark")
    document.body.classList.remove("light", "dark")

    // Adiciona a classe do tema atual
    root.classList.add(newTheme)
    document.body.classList.add(newTheme)

    // Define o atributo data-theme para compatibilidade
    root.setAttribute("data-theme", newTheme)

    // Define color-scheme para elementos nativos do browser
    root.style.colorScheme = newTheme

    // Salva no localStorage
    localStorage.setItem("genesis-theme", newTheme)
  }

  useEffect(() => {
    setMounted(true)
    // Verifica se ha tema salvo
    const stored = localStorage.getItem("genesis-theme") as Theme | null
    // Verifica preferencia do sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = stored || (prefersDark ? "dark" : "light")
    setThemeState(initialTheme)
    applyTheme(initialTheme)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  // Evita flash de conteudo sem estilo
  if (!mounted) {
    return null
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
