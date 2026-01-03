// Tipos de usuário e funções de autenticação mock
export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "gerente" | "engenheiro"
  avatar?: string
}

// Mock de usuários para desenvolvimento
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "admin@genesis.com": {
    password: "admin123",
    user: {
      id: "1",
      name: "Administrador",
      email: "admin@genesis.com",
      role: "admin",
    },
  },
  "gerente@genesis.com": {
    password: "gerente123",
    user: {
      id: "2",
      name: "Gerente de Obra",
      email: "gerente@genesis.com",
      role: "gerente",
    },
  },
  "engenheiro@genesis.com": {
    password: "eng123",
    user: {
      id: "3",
      name: "Engenheiro",
      email: "engenheiro@genesis.com",
      role: "engenheiro",
    },
  },
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Simula delay de rede
  await new Promise((resolve) => setTimeout(resolve, 500))

  const userData = MOCK_USERS[email]
  if (userData && userData.password === password) {
    return userData.user
  }
  return null
}

export function getStoredAuth(): { user: User; token: string } | null {
  if (typeof window === "undefined") return null

  const stored = localStorage.getItem("genesis_auth")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  }
  return null
}

export function setStoredAuth(user: User, token: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem("genesis_auth", JSON.stringify({ user, token }))
}

export function clearStoredAuth(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem("genesis_auth")
}

export const DEFAULT_USER: User = {
  id: "1",
  name: "Administrador",
  email: "admin@genesis.com",
  role: "admin",
}
