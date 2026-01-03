// Utilitários de autenticação JWT próprio
// Compatível com o backend Express.js existente

export interface User {
  id: string
  nome: string
  email: string
  cargo: string
  perfil: "admin" | "gerente" | "engenheiro" | "operador"
  avatar?: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

const AUTH_STORAGE_KEY = "genesis_auth"
const USER_STORAGE_KEY = "genesis_user"

export function getStoredAuth(): AuthTokens | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(USER_STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export function setAuth(tokens: AuthTokens, user: User): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens))
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY)
  localStorage.removeItem(USER_STORAGE_KEY)
}

export function isAuthenticated(): boolean {
  return getStoredAuth() !== null
}

// Mock login para desenvolvimento (substituir por API real)
export async function loginUser(email: string, password: string): Promise<{ tokens: AuthTokens; user: User }> {
  // Simula delay de API
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Mock de usuários para desenvolvimento
  const mockUsers: Record<string, { password: string; user: User }> = {
    "admin@genesis.com": {
      password: "admin123",
      user: {
        id: "1",
        nome: "Administrador",
        email: "admin@genesis.com",
        cargo: "Diretor de Operações",
        perfil: "admin",
      },
    },
    "gerente@genesis.com": {
      password: "gerente123",
      user: {
        id: "2",
        nome: "Carlos Silva",
        email: "gerente@genesis.com",
        cargo: "Gerente de Obras",
        perfil: "gerente",
      },
    },
    "engenheiro@genesis.com": {
      password: "eng123",
      user: {
        id: "3",
        nome: "Ana Oliveira",
        email: "engenheiro@genesis.com",
        cargo: "Engenheira Civil",
        perfil: "engenheiro",
      },
    },
  }

  const userData = mockUsers[email]
  if (!userData || userData.password !== password) {
    throw new Error("Credenciais inválidas")
  }

  return {
    tokens: {
      accessToken: `mock_access_token_${Date.now()}`,
      refreshToken: `mock_refresh_token_${Date.now()}`,
    },
    user: userData.user,
  }
}
