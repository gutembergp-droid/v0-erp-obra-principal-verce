"use client"

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type {
  Cliente,
  Proposta,
  Contrato,
  ComercialContextType,
  Contato,
  InteracaoCliente,
  EstagioFunil,
  Aditivo,
  DocumentoContrato,
  DashboardComercial,
} from "@/lib/types/comercial"

// ============================================================================
// HOOK DE LOCALSTORAGE
// ============================================================================

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) {
        setStoredValue(JSON.parse(item))
      }
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error)
    }
  }, [key])

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error)
    }
  }

  return [storedValue, setValue]
}

// ============================================================================
// CONTEXT
// ============================================================================

const ComercialContext = createContext<ComercialContextType | undefined>(undefined)

// ============================================================================
// PROVIDER
// ============================================================================

export function ComercialProvider({ children }: { children: ReactNode }) {
  // Estado com LocalStorage
  const [clientes, setClientes] = useLocalStorage<Cliente[]>("comercial_clientes", SEED_CLIENTES)
  const [propostas, setPropostas] = useLocalStorage<Proposta[]>("comercial_propostas", SEED_PROPOSTAS)
  const [contratos, setContratos] = useLocalStorage<Contrato[]>("comercial_contratos", SEED_CONTRATOS)

  // Seleções
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null)
  const [propostaSelecionada, setPropostaSelecionada] = useState<Proposta | null>(null)
  const [contratoSelecionado, setContratoSelecionado] = useState<Contrato | null>(null)

  // ============================================================================
  // CRUD CLIENTES
  // ============================================================================

  const addCliente = (data: Omit<Cliente, "id" | "dataCadastro">) => {
    const novoCliente: Cliente = {
      ...data,
      id: `CLI-${Date.now()}`,
      dataCadastro: new Date().toISOString(),
    }
    setClientes([...clientes, novoCliente])
  }

  const updateCliente = (id: string, data: Partial<Cliente>) => {
    setClientes(clientes.map((c) => (c.id === id ? { ...c, ...data } : c)))
  }

  const deleteCliente = (id: string) => {
    setClientes(clientes.filter((c) => c.id !== id))
    if (clienteSelecionado?.id === id) setClienteSelecionado(null)
  }

  const toggleFavorito = (id: string) => {
    setClientes(clientes.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c)))
  }

  const addContatoCliente = (clienteId: string, data: Omit<Contato, "id" | "dataCadastro">) => {
    const novoContato: Contato = {
      ...data,
      id: `CONT-${Date.now()}`,
      dataCadastro: new Date().toISOString(),
    }
    setClientes(
      clientes.map((c) =>
        c.id === clienteId
          ? { ...c, contatos: [...c.contatos, novoContato] }
          : c
      )
    )
  }

  const addInteracaoCliente = (clienteId: string, data: Omit<InteracaoCliente, "id" | "clienteId">) => {
    const novaInteracao: InteracaoCliente = {
      ...data,
      id: `INT-${Date.now()}`,
      clienteId,
    }
    setClientes(
      clientes.map((c) =>
        c.id === clienteId
          ? { ...c, historico: [novaInteracao, ...c.historico], ultimoContato: new Date().toISOString() }
          : c
      )
    )
  }

  // ============================================================================
  // CRUD PROPOSTAS
  // ============================================================================

  const addProposta = (data: Omit<Proposta, "id" | "dataAbertura" | "historico">) => {
    const novaProposta: Proposta = {
      ...data,
      id: `PROP-${Date.now()}`,
      dataAbertura: new Date().toISOString(),
      historico: [
        {
          data: new Date().toISOString(),
          acao: "Proposta criada",
          usuario: data.responsavel,
        },
      ],
    }
    setPropostas([...propostas, novaProposta])
  }

  const updateProposta = (id: string, data: Partial<Proposta>) => {
    setPropostas(propostas.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }

  const deleteProposta = (id: string) => {
    setPropostas(propostas.filter((p) => p.id !== id))
    if (propostaSelecionada?.id === id) setPropostaSelecionada(null)
  }

  const moverPropostaEstagio = (id: string, novoEstagio: EstagioFunil) => {
    const proposta = propostas.find((p) => p.id === id)
    if (!proposta) return

    const estagios: Record<EstagioFunil, string> = {
      prospeccao: "Prospecção",
      qualificacao: "Qualificação",
      proposta: "Proposta Enviada",
      negociacao: "Negociação",
      fechamento: "Fechamento",
      perda: "Perdida",
    }

    const novoHistorico = {
      data: new Date().toISOString(),
      acao: `Movida para ${estagios[novoEstagio]}`,
      usuario: proposta.responsavel,
    }

    setPropostas(
      propostas.map((p) =>
        p.id === id
          ? { ...p, estagio: novoEstagio, historico: [...p.historico, novoHistorico] }
          : p
      )
    )
  }

  const addHistoricoProposta = (propostaId: string, acao: string) => {
    const proposta = propostas.find((p) => p.id === propostaId)
    if (!proposta) return

    const novoHistorico = {
      data: new Date().toISOString(),
      acao,
      usuario: proposta.responsavel,
    }

    setPropostas(
      propostas.map((p) =>
        p.id === propostaId ? { ...p, historico: [...p.historico, novoHistorico] } : p
      )
    )
  }

  // ============================================================================
  // CRUD CONTRATOS
  // ============================================================================

  const addContrato = (data: Omit<Contrato, "id" | "dataAssinatura" | "ultimaAtualizacao">) => {
    const novoContrato: Contrato = {
      ...data,
      id: `CT-${Date.now()}`,
      dataAssinatura: new Date().toISOString(),
      ultimaAtualizacao: new Date().toISOString(),
    }
    setContratos([...contratos, novoContrato])
  }

  const updateContrato = (id: string, data: Partial<Contrato>) => {
    setContratos(
      contratos.map((c) =>
        c.id === id ? { ...c, ...data, ultimaAtualizacao: new Date().toISOString() } : c
      )
    )
  }

  const deleteContrato = (id: string) => {
    setContratos(contratos.filter((c) => c.id !== id))
    if (contratoSelecionado?.id === id) setContratoSelecionado(null)
  }

  const addAditivoContrato = (contratoId: string, data: Omit<Aditivo, "id">) => {
    const novoAditivo: Aditivo = {
      ...data,
      id: `ADT-${Date.now()}`,
    }

    setContratos(
      contratos.map((c) =>
        c.id === contratoId
          ? {
              ...c,
              aditivosLista: [...c.aditivosLista, novoAditivo],
              aditivos: c.aditivos + 1,
              valorAditivos: c.valorAditivos + data.valorAditivo,
              valorAtual: data.novoValor,
              ultimaAtualizacao: new Date().toISOString(),
            }
          : c
      )
    )
  }

  const addDocumentoContrato = (contratoId: string, data: Omit<DocumentoContrato, "id" | "dataUpload">) => {
    const novoDocumento: DocumentoContrato = {
      ...data,
      id: `DOC-${Date.now()}`,
      dataUpload: new Date().toISOString(),
    }

    setContratos(
      contratos.map((c) =>
        c.id === contratoId
          ? {
              ...c,
              documentos: [...c.documentos, novoDocumento],
              ultimaAtualizacao: new Date().toISOString(),
            }
          : c
      )
    )
  }

  // ============================================================================
  // DASHBOARDS E HELPERS
  // ============================================================================

  const getDashboard = (): DashboardComercial => {
    const propostasAtivas = propostas.filter((p) => p.estagio !== "perda").length
    const pipelineTotal = propostas
      .filter((p) => p.estagio !== "perda")
      .reduce((acc, p) => acc + p.valor, 0)
    const taxaConversao = propostas.length > 0
      ? Math.round((propostas.filter((p) => p.estagio === "fechamento").length / propostas.length) * 100)
      : 0
    const clientesAtivos = clientes.filter((c) => c.status === "Ativo").length

    return {
      kpis: {
        propostasAtivas,
        pipelineTotal,
        taxaConversao,
        obrasAtivas: contratos.filter((c) => c.status === "ativo").length,
        clientesAtivos,
        propostas30dias: propostas.filter((p) => {
          const diff = Date.now() - new Date(p.dataAbertura).getTime()
          return diff <= 30 * 24 * 60 * 60 * 1000
        }).length,
      },
      performanceVendedores: [],
      performanceSegmentos: [],
      funilVendas: [],
      tendenciaMensal: [],
    }
  }

  const getClientePorId = (id: string) => clientes.find((c) => c.id === id)
  const getPropostaPorId = (id: string) => propostas.find((p) => p.id === id)
  const getContratoPorId = (id: string) => contratos.find((c) => c.id === id)
  const getPropostasPorCliente = (clienteId: string) => {
    const cliente = getClientePorId(clienteId)
    return cliente ? propostas.filter((p) => p.clienteNome === cliente.nome) : []
  }
  const getContratosPorCliente = (clienteId: string) => {
    const cliente = getClientePorId(clienteId)
    return cliente ? contratos.filter((c) => c.clienteNome === cliente.nome) : []
  }

  // ============================================================================
  // PROVIDER VALUE
  // ============================================================================

  const value: ComercialContextType = {
    clientes,
    propostas,
    contratos,
    clienteSelecionado,
    propostaSelecionada,
    contratoSelecionado,
    selecionarCliente: setClienteSelecionado,
    selecionarProposta: setPropostaSelecionada,
    selecionarContrato: setContratoSelecionado,
    addCliente,
    updateCliente,
    deleteCliente,
    toggleFavorito,
    addContatoCliente,
    addInteracaoCliente,
    addProposta,
    updateProposta,
    deleteProposta,
    moverPropostaEstagio,
    addHistoricoProposta,
    addContrato,
    updateContrato,
    deleteContrato,
    addAditivoContrato,
    addDocumentoContrato,
    getDashboard,
    getClientePorId,
    getPropostaPorId,
    getContratoPorId,
    getPropostasPorCliente,
    getContratosPorCliente,
  }

  return <ComercialContext.Provider value={value}>{children}</ComercialContext.Provider>
}

// ============================================================================
// HOOK
// ============================================================================

export function useComercial() {
  const context = useContext(ComercialContext)
  if (context === undefined) {
    throw new Error("useComercial deve ser usado dentro de ComercialProvider")
  }
  return context
}

// ============================================================================
// SEED DATA
// ============================================================================

const SEED_CLIENTES: Cliente[] = [
  {
    id: "CLI-1",
    nome: "DNIT",
    nomeCompleto: "Departamento Nacional de Infraestrutura de Transportes",
    tipo: "Publico",
    segmento: "Infraestrutura Rodoviária",
    cnpj: "04.892.707/0001-00",
    endereco: "SAN Quadra 3 Bloco A",
    cidade: "Brasília",
    uf: "DF",
    site: "www.dnit.gov.br",
    favorito: true,
    status: "Ativo",
    contatos: [
      {
        id: "CONT-1",
        nome: "Carlos Mendes",
        cargo: "Superintendente",
        email: "carlos.mendes@dnit.gov.br",
        telefone: "(61) 3315-4000",
        principal: true,
        ativo: true,
        dataCadastro: "2024-01-15",
      },
    ],
    contratos: 3,
    valorTotal: 1200000000,
    propostasAtivas: 2,
    ultimoContato: "2026-01-08",
    proximaAcao: "Reunião de acompanhamento BR-116",
    proximaAcaoData: "2026-01-15",
    historico: [
      {
        id: "INT-1",
        tipo: "reuniao",
        descricao: "Reunião de acompanhamento BR-101",
        data: "2026-01-08",
        usuario: "João Silva",
        clienteId: "CLI-1",
      },
    ],
    dataCadastro: "2024-01-15",
    responsavel: "João Silva",
  },
]

const SEED_PROPOSTAS: Proposta[] = [
  {
    id: "PROP-2026-001",
    titulo: "BR-116 Duplicação Trecho Sul",
    clienteId: "CLI-1",
    clienteNome: "DNIT",
    clienteContato: "Carlos Mendes",
    clienteEmail: "carlos.mendes@dnit.gov.br",
    clienteTelefone: "(61) 3315-4000",
    valor: 450000000,
    probabilidade: 75,
    estagio: "negociacao",
    dataAbertura: "2025-11-15",
    dataLimite: "2026-02-28",
    responsavel: "João Silva",
    responsavelAvatar: "JS",
    origem: "Licitação",
    tipo: "Infraestrutura Rodoviária",
    uf: "RS/SC",
    prazoExecucao: "36 meses",
    observacoes: "Proposta técnica aprovada. Aguardando análise de preços.",
    historico: [
      { data: "2025-11-15", acao: "Proposta criada", usuario: "João Silva" },
      { data: "2025-12-20", acao: "Visita técnica realizada", usuario: "Carlos Lima" },
      { data: "2026-01-05", acao: "Proposta técnica enviada", usuario: "Maria Santos" },
    ],
  },
]

const SEED_CONTRATOS: Contrato[] = [
  {
    id: "CT-2024-001",
    titulo: "Duplicação BR-101 Lote 3",
    clienteId: "CLI-1",
    clienteNome: "DNIT",
    objeto: "Obras de duplicação da BR-101, trecho SC/RS, incluindo obras de arte especiais, drenagem e pavimentação.",
    valorOriginal: 450000000,
    valorAtual: 478000000,
    aditivos: 2,
    valorAditivos: 28000000,
    status: "ativo",
    tipo: "Empreitada Global",
    modalidade: "Concorrência Pública",
    dataAssinatura: "2024-03-15",
    dataVigencia: "2027-03-15",
    prazoMeses: 36,
    garantia: 22500000,
    retencao: 5,
    reajuste: "IPCA",
    centrosCusto: ["CC-2024-001"],
    gerenteContrato: "João Silva",
    documentos: [],
    aditivosLista: [],
    ultimaAtualizacao: "2026-01-05",
  },
]
