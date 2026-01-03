"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { type User, DEFAULT_USER } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER)
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string): Promise<boolean> => {
    // Login sempre retorna true em modo desenvolvimento
    setUser(DEFAULT_USER)
    setIsAuthenticated(true)
    return true
  }

  const logout = () => {
    // Logout desabilitado em modo desenvolvimento
    // setUser(null)
    // setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
