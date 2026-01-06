"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "pt-BR" | "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  "pt-BR": {
    "status.available": "Disponivel",
    "status.busy": "Ocupado",
    "status.away": "Ausente",
    "status.dnd": "Nao Perturbe",
    "menu.profile": "Meu Perfil",
    "menu.settings": "Configuracoes",
    "menu.privacy": "Privacidade e Seguranca",
    "menu.display": "Display",
    "menu.theme": "Tema",
    "menu.language": "Idioma",
    "menu.logout": "Sair do Sistema",
    "language.pt": "Portugues (Brasil)",
    "language.en": "Ingles",
    "language.es": "Espanhol",
    notifications: "Notificacoes",
    "notifications.viewAll": "Ver todas as notificacoes",
  },
  en: {
    "status.available": "Available",
    "status.busy": "Busy",
    "status.away": "Away",
    "status.dnd": "Do Not Disturb",
    "menu.profile": "My Profile",
    "menu.settings": "Settings",
    "menu.privacy": "Privacy and Security",
    "menu.display": "Display",
    "menu.theme": "Theme",
    "menu.language": "Language",
    "menu.logout": "Log Out",
    "language.pt": "Portuguese (Brazil)",
    "language.en": "English",
    "language.es": "Spanish",
    notifications: "Notifications",
    "notifications.viewAll": "View all notifications",
  },
  es: {
    "status.available": "Disponible",
    "status.busy": "Ocupado",
    "status.away": "Ausente",
    "status.dnd": "No Molestar",
    "menu.profile": "Mi Perfil",
    "menu.settings": "Configuraciones",
    "menu.privacy": "Privacidad y Seguridad",
    "menu.display": "Pantalla",
    "menu.theme": "Tema",
    "menu.language": "Idioma",
    "menu.logout": "Cerrar Sesion",
    "language.pt": "Portugues (Brasil)",
    "language.en": "Ingles",
    "language.es": "Espanol",
    notifications: "Notificaciones",
    "notifications.viewAll": "Ver todas las notificaciones",
  },
}

const defaultValue: LanguageContextType = {
  language: "pt-BR",
  setLanguage: () => {},
  t: (key: string) => translations["pt-BR"][key] || key,
}

const LanguageContext = createContext<LanguageContextType>(defaultValue)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt-BR")

  useEffect(() => {
    try {
      const stored = localStorage.getItem("genesis-language") as Language | null
      if (stored && ["pt-BR", "en", "es"].includes(stored)) {
        setLanguageState(stored)
      }
    } catch (e) {
      console.error("Error accessing localStorage:", e)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    try {
      localStorage.setItem("genesis-language", newLanguage)
    } catch (e) {
      console.error("Error saving to localStorage:", e)
    }
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
