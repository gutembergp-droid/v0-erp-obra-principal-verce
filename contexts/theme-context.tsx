"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Theme = "light" | "dark"
type ColorTheme = "aahbrant" | "mono" | "acro" | "dourado"

interface ThemeContextType {
  theme: Theme
  colorTheme: ColorTheme
  setTheme: (theme: Theme) => void
  setColorTheme: (colorTheme: ColorTheme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const colorThemeNames: Record<ColorTheme, string> = {
  aahbrant: "Aahbrant (Padrao)",
  mono: "Monocromatico",
  acro: "Acromatico",
  dourado: "Aahbrant Dourado",
}

export const colorThemeDescriptions: Record<ColorTheme, string> = {
  aahbrant: "Vermelho institucional com tons neutros - identidade visual padrao",
  mono: "Cinzas com subtom azulado frio - visual elegante e moderno",
  acro: "Preto e branco puro - contraste maximo e minimalista",
  dourado: "Vermelho Marsala com acentos dourados - visual premium",
}

function getStoredValue(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}

function setStoredValue(key: string, value: string): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignora erros de localStorage (modo privado, etc)
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light")
  const [colorTheme, setColorThemeState] = useState<ColorTheme>("aahbrant")
  const [mounted, setMounted] = useState(false)

  const applyTheme = (newTheme: Theme, newColorTheme: ColorTheme) => {
    if (typeof document === "undefined") return

    try {
      const root = document.documentElement

      // Remove todas as classes de tema
      root.classList.remove("light", "dark")
      document.body.classList.remove("light", "dark")

      root.classList.remove("color-aahbrant", "color-mono", "color-acro", "color-dourado")
      document.body.classList.remove("color-aahbrant", "color-mono", "color-acro", "color-dourado")

      // Adiciona a classe do tema atual
      root.classList.add(newTheme)
      document.body.classList.add(newTheme)

      // Adiciona a classe de cor (se nao for aahbrant - padrao)
      if (newColorTheme !== "aahbrant") {
        root.classList.add(`color-${newColorTheme}`)
        document.body.classList.add(`color-${newColorTheme}`)
      }

      // Define o atributo data-theme para compatibilidade
      root.setAttribute("data-theme", newTheme)
      root.setAttribute("data-color-theme", newColorTheme)

      // Define color-scheme para elementos nativos do browser
      root.style.colorScheme = newTheme

      // Salva no localStorage
      setStoredValue("genesis-theme", newTheme)
      setStoredValue("genesis-color-theme", newColorTheme)
    } catch {
      // Ignora erros de DOM
    }
  }

  useEffect(() => {
    try {
      const storedTheme = getStoredValue("genesis-theme", "") as Theme | ""
      const storedColorTheme = getStoredValue("genesis-color-theme", "") as ColorTheme | ""

      // Verifica preferencia do sistema
      const prefersDark =
        typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false

      const initialTheme: Theme =
        storedTheme === "light" || storedTheme === "dark" ? storedTheme : prefersDark ? "dark" : "light"

      const validColorThemes: ColorTheme[] = ["aahbrant", "mono", "acro", "dourado"]
      const initialColorTheme: ColorTheme = validColorThemes.includes(storedColorTheme as ColorTheme)
        ? (storedColorTheme as ColorTheme)
        : "aahbrant"

      setThemeState(initialTheme)
      setColorThemeState(initialColorTheme)
      applyTheme(initialTheme, initialColorTheme)
    } catch {
      // Fallback para valores padrao em caso de erro
      setThemeState("light")
      setColorThemeState("aahbrant")
    }

    setMounted(true)
  }, [])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    applyTheme(newTheme, colorTheme)
  }

  const setColorTheme = (newColorTheme: ColorTheme) => {
    setColorThemeState(newColorTheme)
    applyTheme(theme, newColorTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  // Os valores do contexto serao atualizados apos montagem
  return (
    <ThemeContext.Provider value={{ theme, colorTheme, setTheme, setColorTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
