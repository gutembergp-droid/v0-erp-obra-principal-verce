"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// ========================================
// TIPOS E INTERFACES
// ========================================

export interface KeyResult {
  id: string
  descricao: string
  meta: number
  atual: number
  unidade: string
  progresso: number
}

export interface OKR {
  id: string
  objetivo: string
  periodo: string
  tipo: "corporativo" | "departamental" | "obra"
  responsavel: string
  progresso: number
  status: "em-progresso" | "atrasado" | "concluido" | "cancelado"
  keyResults: KeyResult[]
  prazo: string
  createdAt: string
  updatedAt: string
}

export interface ObraEstrategica {
  id: string
  nome: string
  cliente: string
  valor: number
  margem: number
  potencialEstrategico: "alto" | "medio" | "baixo"
  status: "normal" | "atencao" | "critico" | "otimo"
  regiao: string
  idp: number
  idc: number
}

interface PlanejamentoContextType {
  okrs: OKR[]
  obras: ObraEstrategica[]
  addOKR: (okr: Omit<OKR, "id" | "createdAt" | "updatedAt">) => void
  updateOKR: (id: string, okr: Partial<OKR>) => void
  deleteOKR: (id: string) => void
  getOKRById: (id: string) => OKR | undefined
  addObra: (obra: Omit<ObraEstrategica, "id">) => void
  updateObra: (id: string, obra: Partial<ObraEstrategica>) => void
  deleteObra: (id: string) => void
  isLoading: boolean
}

// ========================================
// CONTEXT
// ========================================

const PlanejamentoContext = createContext<PlanejamentoContextType | undefined>(undefined)

// ========================================
// DADOS INICIAIS (SEED)
// ========================================

const initialOKRs: OKR[] = [
  {
    id: "okr-001",
    objetivo: "Aumentar receita consolidada em 25% até Q2/2026",
    periodo: "Q1-Q2 2026",
    tipo: "corporativo",
    responsavel: "Diretoria Executiva",
    progresso: 68,
    status: "em-progresso",
    prazo: "2026-06-30",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
    keyResults: [
      { id: "kr-001-1", descricao: "Fechar 3 novos contratos > R$ 500M", meta: 3, atual: 2, unidade: "contratos", progresso: 67 },
      { id: "kr-001-2", descricao: "Aumentar receita recorrente em 15%", meta: 15, atual: 10.2, unidade: "%", progresso: 68 },
      { id: "kr-001-3", descricao: "Expandir para 2 novas regiões", meta: 2, atual: 1, unidade: "regiões", progresso: 50 },
    ],
  },
  {
    id: "okr-002",
    objetivo: "Melhorar IDP médio corporativo para 0.98",
    periodo: "2026",
    tipo: "corporativo",
    responsavel: "Diretoria de Operações",
    progresso: 85,
    status: "em-progresso",
    prazo: "2026-12-31",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
    keyResults: [
      { id: "kr-002-1", descricao: "Reduzir obras em atraso para < 10%", meta: 10, atual: 15, unidade: "%", progresso: 67 },
      { id: "kr-002-2", descricao: "IDP médio acima de 0.98", meta: 0.98, atual: 0.97, unidade: "", progresso: 99 },
      { id: "kr-002-3", descricao: "Implementar sistema de alertas precoces", meta: 1, atual: 1, unidade: "sistema", progresso: 100 },
    ],
  },
  {
    id: "okr-003",
    objetivo: "Aumentar margem bruta média para 12%",
    periodo: "2026",
    tipo: "corporativo",
    responsavel: "Diretoria Financeira",
    progresso: 42,
    status: "atrasado",
    prazo: "2026-12-31",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
    keyResults: [
      { id: "kr-003-1", descricao: "Margem bruta média > 12%", meta: 12, atual: 10.5, unidade: "%", progresso: 88 },
      { id: "kr-003-2", descricao: "Reduzir custos indiretos em 8%", meta: 8, atual: 3.2, unidade: "%", progresso: 40 },
      { id: "kr-003-3", descricao: "Otimizar processos em 5 obras piloto", meta: 5, atual: 2, unidade: "obras", progresso: 40 },
    ],
  },
  {
    id: "okr-004",
    objetivo: "Expandir portfólio de obras em infraestrutura",
    periodo: "2026",
    tipo: "departamental",
    responsavel: "Diretoria Comercial",
    progresso: 91,
    status: "em-progresso",
    prazo: "2026-12-31",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-10T00:00:00Z",
    keyResults: [
      { id: "kr-004-1", descricao: "Adicionar 8 obras de infraestrutura", meta: 8, atual: 7, unidade: "obras", progresso: 88 },
      { id: "kr-004-2", descricao: "Valor total > R$ 2.5B", meta: 2500, atual: 2300, unidade: "R$ milhões", progresso: 92 },
    ],
  },
]

const initialObras: ObraEstrategica[] = [
  { id: "obra-001", nome: "BR-101 Duplicação Lote 3", cliente: "DNIT", valor: 850, margem: 14.2, potencialEstrategico: "alto", status: "otimo", regiao: "Nordeste", idp: 1.05, idc: 1.08 },
  { id: "obra-002", nome: "UHE Belo Monte Complementar", cliente: "Eletrobras", valor: 1200, margem: 11.8, potencialEstrategico: "alto", status: "normal", regiao: "Norte", idp: 0.98, idc: 0.95 },
  { id: "obra-003", nome: "BR-116 Modernização Lote 5", cliente: "DNIT", valor: 520, margem: 9.5, potencialEstrategico: "medio", status: "atencao", regiao: "Sul", idp: 0.92, idc: 0.88 },
  { id: "obra-004", nome: "Metrô Linha 4 - Extensão", cliente: "Estado SP", valor: 680, margem: 13.5, potencialEstrategico: "alto", status: "normal", regiao: "Sudeste", idp: 1.01, idc: 1.02 },
  { id: "obra-005", nome: "Porto de Santos - Terminal 3", cliente: "Porto de Santos", valor: 450, margem: 8.2, potencialEstrategico: "baixo", status: "atencao", regiao: "Sudeste", idp: 0.89, idc: 0.91 },
  { id: "obra-006", nome: "BR-040 Duplicação Lote 1", cliente: "DNIT", valor: 720, margem: 15.8, potencialEstrategico: "alto", status: "otimo", regiao: "Centro-Oeste", idp: 1.08, idc: 1.12 },
  { id: "obra-007", nome: "Ferrovia Norte-Sul Trecho 2", cliente: "VALEC", valor: 980, margem: 10.5, potencialEstrategico: "medio", status: "normal", regiao: "Norte", idp: 0.96, idc: 0.94 },
  { id: "obra-008", nome: "Aeroporto Internacional - Pista 2", cliente: "Infraero", valor: 320, margem: 7.8, potencialEstrategico: "baixo", status: "critico", regiao: "Nordeste", idp: 0.85, idc: 0.82 },
]

// ========================================
// PROVIDER
// ========================================

export function PlanejamentoProvider({ children }: { children: ReactNode }) {
  const [okrs, setOkrs] = useState<OKR[]>([])
  const [obras, setObras] = useState<ObraEstrategica[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Carregar dados do LocalStorage na montagem
  useEffect(() => {
    const loadData = () => {
      try {
        const storedOKRs = localStorage.getItem("genesis-okrs")
        const storedObras = localStorage.getItem("genesis-obras")

        if (storedOKRs) {
          setOkrs(JSON.parse(storedOKRs))
        } else {
          // Se não houver dados, usa os iniciais e salva
          setOkrs(initialOKRs)
          localStorage.setItem("genesis-okrs", JSON.stringify(initialOKRs))
        }

        if (storedObras) {
          setObras(JSON.parse(storedObras))
        } else {
          setObras(initialObras)
          localStorage.setItem("genesis-obras", JSON.stringify(initialObras))
        }
      } catch (error) {
        console.error("Erro ao carregar dados do LocalStorage:", error)
        setOkrs(initialOKRs)
        setObras(initialObras)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Salvar OKRs no LocalStorage quando mudarem
  useEffect(() => {
    if (!isLoading && okrs.length > 0) {
      localStorage.setItem("genesis-okrs", JSON.stringify(okrs))
    }
  }, [okrs, isLoading])

  // Salvar Obras no LocalStorage quando mudarem
  useEffect(() => {
    if (!isLoading && obras.length > 0) {
      localStorage.setItem("genesis-obras", JSON.stringify(obras))
    }
  }, [obras, isLoading])

  // ========================================
  // FUNÇÕES CRUD - OKRs
  // ========================================

  const addOKR = (okrData: Omit<OKR, "id" | "createdAt" | "updatedAt">) => {
    const newOKR: OKR = {
      ...okrData,
      id: `okr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    setOkrs((prev) => [...prev, newOKR])
  }

  const updateOKR = (id: string, updates: Partial<OKR>) => {
    setOkrs((prev) =>
      prev.map((okr) =>
        okr.id === id
          ? {
              ...okr,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : okr
      )
    )
  }

  const deleteOKR = (id: string) => {
    setOkrs((prev) => prev.filter((okr) => okr.id !== id))
  }

  const getOKRById = (id: string) => {
    return okrs.find((okr) => okr.id === id)
  }

  // ========================================
  // FUNÇÕES CRUD - Obras
  // ========================================

  const addObra = (obraData: Omit<ObraEstrategica, "id">) => {
    const newObra: ObraEstrategica = {
      ...obraData,
      id: `obra-${Date.now()}`,
    }
    setObras((prev) => [...prev, newObra])
  }

  const updateObra = (id: string, updates: Partial<ObraEstrategica>) => {
    setObras((prev) => prev.map((obra) => (obra.id === id ? { ...obra, ...updates } : obra)))
  }

  const deleteObra = (id: string) => {
    setObras((prev) => prev.filter((obra) => obra.id !== id))
  }

  return (
    <PlanejamentoContext.Provider
      value={{
        okrs,
        obras,
        addOKR,
        updateOKR,
        deleteOKR,
        getOKRById,
        addObra,
        updateObra,
        deleteObra,
        isLoading,
      }}
    >
      {children}
    </PlanejamentoContext.Provider>
  )
}

// ========================================
// HOOK CUSTOMIZADO
// ========================================

export function usePlanejamento() {
  const context = useContext(PlanejamentoContext)
  if (context === undefined) {
    throw new Error("usePlanejamento deve ser usado dentro de PlanejamentoProvider")
  }
  return context
}
