"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type {
  CicloEstrategico,
  StatusCiclo,
  EtapaCiclo,
  FatorPESTEL,
  AnalisePESTEL,
  ItemSWOT,
  TemaEstrategico,
  AnaliseSWOT,
  AvaliacaoGUT,
  MatrizGUT,
  ItemBCG,
  MatrizBCG,
  Alerta,
  Decisao,
  Monitoramento,
  EncerramentoCiclo,
  DashboardEstrategico,
  HistoricoAcao,
  PilarPESTEL,
  QuadranteSWOT,
  Desdobramento,
  Departamento,
  OKRDepartamental,
  RevisaoPeriodica,
  ComparacaoMetrica,
  FiltroTemporal,
  DadosTrimestre,
  DadosSemestre,
} from "@/lib/types/planejamento"

// ================================================================
// INTERFACE DO CONTEXT
// ================================================================

interface CicloEstrategicoContextType {
  // Estado
  ciclos: CicloEstrategico[]
  cicloAtual: CicloEstrategico | null
  pestel: Record<string, AnalisePESTEL>
  swot: Record<string, AnaliseSWOT>
  gut: Record<string, MatrizGUT>
  bcg: Record<string, MatrizBCG>
  alertas: Alerta[]
  decisoes: Decisao[]
  monitoramento: Record<string, Monitoramento>
  encerramentos: Record<string, EncerramentoCiclo>
  desdobramentos: Record<string, Desdobramento>
  revisoesperiodicas: RevisaoPeriodica[]
  filtroTemporal: FiltroTemporal
  isLoading: boolean

  // Ciclos
  criarCiclo: (dados: Omit<CicloEstrategico, "id" | "criadoEm" | "atualizadoEm" | "historico">, preCarregarDe?: string) => string
  atualizarCiclo: (id: string, dados: Partial<CicloEstrategico>) => void
  avancarEtapa: (cicloId: string) => boolean
  encerrarCiclo: (cicloId: string, dados: Omit<EncerramentoCiclo, "cicloId" | "congeladoEm">) => void
  selecionarCiclo: (id: string) => void
  
  // Mudanças de Estado
  enviarParaRevisao: (cicloId: string) => boolean
  consolidarCiclo: (cicloId: string) => boolean
  homologarCiclo: (cicloId: string, homologadoPor: { id: string; nome: string; cargo: string }) => boolean
  desdobrarCiclo: (cicloId: string) => boolean
  voltarParaRascunho: (cicloId: string) => boolean

  // PESTEL
  adicionarFatorPESTEL: (cicloId: string, fator: Omit<FatorPESTEL, "id" | "cicloId" | "criadoEm">) => void
  atualizarFatorPESTEL: (cicloId: string, fatorId: string, dados: Partial<FatorPESTEL>) => void
  removerFatorPESTEL: (cicloId: string, fatorId: string) => void
  concluirPESTEL: (cicloId: string) => void

  // SWOT
  adicionarItemSWOT: (cicloId: string, item: Omit<ItemSWOT, "id" | "cicloId" | "criadoEm">) => void
  atualizarItemSWOT: (cicloId: string, itemId: string, dados: Partial<ItemSWOT>) => void
  removerItemSWOT: (cicloId: string, itemId: string) => void
  adicionarTema: (cicloId: string, tema: Omit<TemaEstrategico, "id" | "cicloId" | "criadoEm">) => void
  concluirSWOT: (cicloId: string) => void

  // GUT
  adicionarAvaliacaoGUT: (cicloId: string, avaliacao: Omit<AvaliacaoGUT, "id" | "cicloId" | "score" | "criadoEm">) => void
  atualizarAvaliacaoGUT: (cicloId: string, avaliacaoId: string, dados: Partial<AvaliacaoGUT>) => void
  removerAvaliacaoGUT: (cicloId: string, avaliacaoId: string) => void
  concluirGUT: (cicloId: string) => void

  // BCG
  adicionarItemBCG: (cicloId: string, item: Omit<ItemBCG, "id" | "cicloId" | "classificacao" | "criadoEm">) => void
  atualizarItemBCG: (cicloId: string, itemId: string, dados: Partial<ItemBCG>) => void
  removerItemBCG: (cicloId: string, itemId: string) => void
  concluirBCG: (cicloId: string) => void

  // Monitoramento
  adicionarAlerta: (cicloId: string, alerta: Omit<Alerta, "id" | "cicloId" | "geradoEm">) => void
  resolverAlerta: (alertaId: string, resolvidoPor: string, acaoTomada: string) => void
  adicionarDecisao: (cicloId: string, decisao: Omit<Decisao, "id" | "cicloId" | "dataHora">) => void
  
  // Desdobramento
  getDesdobramento: (cicloId: string) => Desdobramento | undefined
  getOKRsDepartamento: (cicloId: string, departamento: Departamento) => any[]
  
  // Revisão Periódica
  criarRevisaoPeriodica: (cicloAnteriorId: string, cicloAtualId: string) => void
  getRevisoesParaCiclo: (cicloId: string) => RevisaoPeriodica[]
  
  // Filtros Temporais
  setFiltroTemporal: (filtro: Partial<FiltroTemporal>) => void
  getDadosTrimestre: (cicloId: string, trimestre: "Q1" | "Q2" | "Q3" | "Q4", ano: number) => DadosTrimestre
  getDadosSemestre: (cicloId: string, semestre: "S1" | "S2", ano: number) => DadosSemestre

  // Utilitários
  getDashboard: () => DashboardEstrategico
  validarAvancoEtapa: (cicloId: string, etapaDesejada: EtapaCiclo) => { valido: boolean; motivo?: string }
}

// ================================================================
// CONTEXT
// ================================================================

const CicloEstrategicoContext = createContext<CicloEstrategicoContextType | undefined>(undefined)

// ================================================================
// DADOS INICIAIS (SEED)
// ================================================================

const cicloSeed: CicloEstrategico = {
  id: "ciclo-2026-anual",
  nome: "Planejamento Estratégico 2026",
  periodo: {
    inicio: "2026-01-01",
    fim: "2026-12-31",
    tipo: "anual",
  },
  status: "em_execucao",
  governante: {
    id: "gov-001",
    nome: "Carlos Henrique Pontes",
    cargo: "Diretor Executivo",
  },
  etapaAtual: "gut",
  etapasConcluidas: ["pestel", "swot"],
  criadoEm: "2025-12-15T00:00:00Z",
  atualizadoEm: "2026-01-10T10:30:00Z",
  historico: [
    {
      id: "hist-001",
      tipo: "criacao",
      descricao: "Ciclo estratégico 2026 criado",
      usuario: "Carlos Henrique Pontes",
      dataHora: "2025-12-15T00:00:00Z",
    },
    {
      id: "hist-002",
      tipo: "aprovacao",
      descricao: "Ciclo aprovado pela diretoria executiva",
      usuario: "Carlos Henrique Pontes",
      dataHora: "2025-12-20T14:00:00Z",
    },
    {
      id: "hist-003",
      tipo: "mudanca_etapa",
      descricao: "Análise PESTEL concluída",
      usuario: "Equipe de Planejamento",
      dataHora: "2026-01-05T16:30:00Z",
    },
    {
      id: "hist-004",
      tipo: "mudanca_etapa",
      descricao: "Análise SWOT concluída",
      usuario: "Equipe de Planejamento",
      dataHora: "2026-01-08T11:00:00Z",
    },
  ],
}

const pestelSeed: Record<string, AnalisePESTEL> = {
  "ciclo-2026-anual": {
    cicloId: "ciclo-2026-anual",
    fatores: [
      {
        id: "pestel-001",
        cicloId: "ciclo-2026-anual",
        pilar: "politico",
        descricao: "Mudanças na lei de licitações favorecendo parcerias público-privadas",
        tipo: "oportunidade",
        impacto: 4,
        criadoEm: "2026-01-02T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
      {
        id: "pestel-002",
        cicloId: "ciclo-2026-anual",
        pilar: "economico",
        descricao: "Aumento da taxa de juros impactando financiamento de obras",
        tipo: "risco",
        impacto: 5,
        criadoEm: "2026-01-02T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
      {
        id: "pestel-003",
        cicloId: "ciclo-2026-anual",
        pilar: "tecnologico",
        descricao: "Adoção de BIM obrigatória em obras públicas acima de R$ 500M",
        tipo: "oportunidade",
        impacto: 4,
        criadoEm: "2026-01-02T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
      {
        id: "pestel-004",
        cicloId: "ciclo-2026-anual",
        pilar: "ambiental",
        descricao: "Novas exigências de licenciamento ambiental mais rígidas",
        tipo: "risco",
        impacto: 4,
        criadoEm: "2026-01-02T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
      {
        id: "pestel-005",
        cicloId: "ciclo-2026-anual",
        pilar: "social",
        descricao: "Crescente demanda por infraestrutura sustentável e inclusiva",
        tipo: "oportunidade",
        impacto: 3,
        criadoEm: "2026-01-02T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
    ],
    concluidaEm: "2026-01-05T16:30:00Z",
    resumo: {
      totalRiscos: 2,
      totalOportunidades: 3,
      pilarMaisCritico: "economico",
    },
  },
}

const swotSeed: Record<string, AnaliseSWOT> = {
  "ciclo-2026-anual": {
    cicloId: "ciclo-2026-anual",
    forcas: [
      {
        id: "swot-f-001",
        cicloId: "ciclo-2026-anual",
        quadrante: "forcas",
        descricao: "Portfolio diversificado de obras em infraestrutura",
        prioridade: 3,
        criadoEm: "2026-01-06T00:00:00Z",
      },
      {
        id: "swot-f-002",
        cicloId: "ciclo-2026-anual",
        quadrante: "forcas",
        descricao: "Equipe técnica altamente qualificada",
        prioridade: 3,
        criadoEm: "2026-01-06T00:00:00Z",
      },
      {
        id: "swot-f-003",
        cicloId: "ciclo-2026-anual",
        quadrante: "forcas",
        descricao: "Solidez financeira e capacidade de investimento",
        prioridade: 3,
        criadoEm: "2026-01-06T00:00:00Z",
      },
    ],
    fraquezas: [
      {
        id: "swot-fr-001",
        cicloId: "ciclo-2026-anual",
        quadrante: "fraquezas",
        descricao: "Processos operacionais pouco padronizados",
        prioridade: 2,
        criadoEm: "2026-01-06T00:00:00Z",
      },
      {
        id: "swot-fr-002",
        cicloId: "ciclo-2026-anual",
        quadrante: "fraquezas",
        descricao: "Dependência de poucos fornecedores estratégicos",
        prioridade: 2,
        criadoEm: "2026-01-06T00:00:00Z",
      },
    ],
    oportunidades: [
      {
        id: "swot-o-001",
        cicloId: "ciclo-2026-anual",
        quadrante: "oportunidades",
        descricao: "Expansão do PAC com R$ 120 bilhões em infraestrutura",
        vinculoPESTEL: ["pestel-001"],
        prioridade: 3,
        criadoEm: "2026-01-06T00:00:00Z",
      },
      {
        id: "swot-o-002",
        cicloId: "ciclo-2026-anual",
        quadrante: "oportunidades",
        descricao: "Digitalização e automação em canteiros de obra",
        vinculoPESTEL: ["pestel-003"],
        prioridade: 2,
        criadoEm: "2026-01-06T00:00:00Z",
      },
    ],
    ameacas: [
      {
        id: "swot-a-001",
        cicloId: "ciclo-2026-anual",
        quadrante: "ameacas",
        descricao: "Aumento do custo de capital devido à alta de juros",
        vinculoPESTEL: ["pestel-002"],
        prioridade: 3,
        criadoEm: "2026-01-06T00:00:00Z",
      },
      {
        id: "swot-a-002",
        cicloId: "ciclo-2026-anual",
        quadrante: "ameacas",
        descricao: "Atrasos nos licenciamentos ambientais",
        vinculoPESTEL: ["pestel-004"],
        prioridade: 2,
        criadoEm: "2026-01-06T00:00:00Z",
      },
    ],
    temas: [
      {
        id: "tema-001",
        cicloId: "ciclo-2026-anual",
        nome: "Capturar oportunidades do PAC",
        descricao: "Estruturar equipe e processos para maximizar participação em licitações do PAC",
        origemSWOT: ["swot-o-001", "swot-f-001"],
        criadoEm: "2026-01-07T00:00:00Z",
      },
      {
        id: "tema-002",
        cicloId: "ciclo-2026-anual",
        nome: "Digitalizar operações",
        descricao: "Implementar BIM e automação para ganhar eficiência e reduzir custos",
        origemSWOT: ["swot-o-002", "swot-fr-001"],
        criadoEm: "2026-01-07T00:00:00Z",
      },
      {
        id: "tema-003",
        cicloId: "ciclo-2026-anual",
        nome: "Mitigar risco financeiro",
        descricao: "Otimizar estrutura de capital e buscar alternativas de financiamento",
        origemSWOT: ["swot-a-001", "swot-f-003"],
        criadoEm: "2026-01-07T00:00:00Z",
      },
      {
        id: "tema-004",
        cicloId: "ciclo-2026-anual",
        nome: "Diversificar fornecedores",
        descricao: "Reduzir dependência de poucos fornecedores críticos",
        origemSWOT: ["swot-fr-002"],
        criadoEm: "2026-01-07T00:00:00Z",
      },
    ],
    concluidaEm: "2026-01-08T11:00:00Z",
  },
}

const gutSeed: Record<string, MatrizGUT> = {
  "ciclo-2026-anual": {
    cicloId: "ciclo-2026-anual",
    avaliacoes: [
      {
        id: "gut-001",
        cicloId: "ciclo-2026-anual",
        temaId: "tema-001",
        temaNome: "Capturar oportunidades do PAC",
        gravidade: 5,
        urgencia: 5,
        tendencia: 5,
        score: 125,
        justificativa: "Janela de oportunidade limitada e alto potencial de receita",
        criadoEm: "2026-01-09T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
      {
        id: "gut-002",
        cicloId: "ciclo-2026-anual",
        temaId: "tema-002",
        temaNome: "Digitalizar operações",
        gravidade: 4,
        urgencia: 4,
        tendencia: 5,
        score: 80,
        justificativa: "Necessário para competitividade futura",
        criadoEm: "2026-01-09T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
      {
        id: "gut-003",
        cicloId: "ciclo-2026-anual",
        temaId: "tema-003",
        temaNome: "Mitigar risco financeiro",
        gravidade: 5,
        urgencia: 5,
        tendencia: 4,
        score: 100,
        justificativa: "Impacto direto na viabilidade financeira da empresa",
        criadoEm: "2026-01-09T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
      {
        id: "gut-004",
        cicloId: "ciclo-2026-anual",
        temaId: "tema-004",
        temaNome: "Diversificar fornecedores",
        gravidade: 3,
        urgencia: 3,
        tendencia: 4,
        score: 36,
        justificativa: "Risco médio mas com tendência de agravamento",
        criadoEm: "2026-01-09T00:00:00Z",
        criadoPor: "Equipe Estratégia",
      },
    ],
    ranking: [], // Será calculado automaticamente
    concluidaEm: undefined,
  },
}

// ================================================================
// PROVIDER
// ================================================================

export function CicloEstrategicoProvider({ children }: { children: ReactNode }) {
  const [ciclos, setCiclos] = useState<CicloEstrategico[]>([cicloSeed])
  const [cicloAtual, setCicloAtual] = useState<CicloEstrategico | null>(cicloSeed)
  const [pestel, setPestel] = useState<Record<string, AnalisePESTEL>>(pestelSeed)
  const [swot, setSwot] = useState<Record<string, AnaliseSWOT>>(swotSeed)
  const [gut, setGut] = useState<Record<string, MatrizGUT>>(gutSeed)
  const [bcg, setBcg] = useState<Record<string, MatrizBCG>>({})
  const [alertas, setAlertas] = useState<Alerta[]>([])
  const [decisoes, setDecisoes] = useState<Decisao[]>([])
  const [monitoramento, setMonitoramento] = useState<Record<string, Monitoramento>>({})
  const [encerramentos, setEncerramentos] = useState<Record<string, EncerramentoCiclo>>({})
  const [desdobramentos, setDesdobramentos] = useState<Record<string, Desdobramento>>({})
  const [revisoesPeriodicas, setRevisoesPeriodicas] = useState<RevisaoPeriodica[]>([])
  const [filtroTemporal, setFiltroTemporal] = useState<FiltroTemporal>({ ano: new Date().getFullYear() })
  const [isLoading, setIsLoading] = useState(true)

  // ================================================================
  // CARREGAR/SALVAR DADOS
  // ================================================================

  useEffect(() => {
    const loadData = () => {
      try {
        const storedCiclos = localStorage.getItem("genesis-ciclos")
        const storedPestel = localStorage.getItem("genesis-pestel")
        const storedSwot = localStorage.getItem("genesis-swot")
        const storedGut = localStorage.getItem("genesis-gut")
        const storedBcg = localStorage.getItem("genesis-bcg")
        const storedAlertas = localStorage.getItem("genesis-alertas")
        const storedDecisoes = localStorage.getItem("genesis-decisoes")
        const storedDesdobramentos = localStorage.getItem("genesis-desdobramentos")
        const storedRevisoes = localStorage.getItem("genesis-revisoes-periodicas")

        if (storedCiclos) setCiclos(JSON.parse(storedCiclos))
        else localStorage.setItem("genesis-ciclos", JSON.stringify([cicloSeed]))

        if (storedPestel) setPestel(JSON.parse(storedPestel))
        else localStorage.setItem("genesis-pestel", JSON.stringify(pestelSeed))

        if (storedSwot) setSwot(JSON.parse(storedSwot))
        else localStorage.setItem("genesis-swot", JSON.stringify(swotSeed))

        if (storedGut) setGut(JSON.parse(storedGut))
        else localStorage.setItem("genesis-gut", JSON.stringify(gutSeed))

        if (storedBcg) setBcg(JSON.parse(storedBcg))
        if (storedAlertas) setAlertas(JSON.parse(storedAlertas))
        if (storedDecisoes) setDecisoes(JSON.parse(storedDecisoes))
        if (storedDesdobramentos) setDesdobramentos(JSON.parse(storedDesdobramentos))
        if (storedRevisoes) setRevisoesPeriodicas(JSON.parse(storedRevisoes))
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Salvar automaticamente
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("genesis-ciclos", JSON.stringify(ciclos))
      localStorage.setItem("genesis-pestel", JSON.stringify(pestel))
      localStorage.setItem("genesis-swot", JSON.stringify(swot))
      localStorage.setItem("genesis-gut", JSON.stringify(gut))
      localStorage.setItem("genesis-bcg", JSON.stringify(bcg))
      localStorage.setItem("genesis-alertas", JSON.stringify(alertas))
      localStorage.setItem("genesis-decisoes", JSON.stringify(decisoes))
      localStorage.setItem("genesis-desdobramentos", JSON.stringify(desdobramentos))
      localStorage.setItem("genesis-revisoes-periodicas", JSON.stringify(revisoesPeriodicas))
    }
  }, [ciclos, pestel, swot, gut, bcg, alertas, decisoes, desdobramentos, revisoesPeriodicas, isLoading])

  // ================================================================
  // FUNÇÕES - CICLOS
  // ================================================================

  const criarCiclo = (dados: Omit<CicloEstrategico, "id" | "criadoEm" | "atualizadoEm" | "historico">, preCarregarDe?: string): string => {
    const novoCicloId = `ciclo-${Date.now()}`
    const novoCiclo: CicloEstrategico = {
      ...dados,
      id: novoCicloId,
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
      historico: [
        {
          id: `hist-${Date.now()}`,
          tipo: "criacao",
          descricao: `Ciclo ${dados.nome} criado`,
          usuario: dados.governante.nome,
          dataHora: new Date().toISOString(),
        },
      ],
    }
    
    // Se preCarregarDe foi fornecido, copiar dados do ciclo anterior
    if (preCarregarDe) {
      const cicloAnterior = ciclos.find((c) => c.id === preCarregarDe)
      if (cicloAnterior) {
        // Copiar PESTEL
        if (pestel[preCarregarDe]) {
          setPestel((prev) => ({
            ...prev,
            [novoCicloId]: {
              ...pestel[preCarregarDe],
              cicloId: novoCicloId,
              concluidaEm: undefined,
              fatores: pestel[preCarregarDe].fatores.map((f) => ({
                ...f,
                id: `pestel-${Date.now()}-${Math.random()}`,
                cicloId: novoCicloId,
              })),
            },
          }))
        }
        
        // Copiar SWOT
        if (swot[preCarregarDe]) {
          setSwot((prev) => ({
            ...prev,
            [novoCicloId]: {
              ...swot[preCarregarDe],
              cicloId: novoCicloId,
              concluidaEm: undefined,
              forcas: swot[preCarregarDe].forcas.map((item) => ({ ...item, id: `swot-${Date.now()}-${Math.random()}`, cicloId: novoCicloId })),
              fraquezas: swot[preCarregarDe].fraquezas.map((item) => ({ ...item, id: `swot-${Date.now()}-${Math.random()}`, cicloId: novoCicloId })),
              oportunidades: swot[preCarregarDe].oportunidades.map((item) => ({ ...item, id: `swot-${Date.now()}-${Math.random()}`, cicloId: novoCicloId })),
              ameacas: swot[preCarregarDe].ameacas.map((item) => ({ ...item, id: `swot-${Date.now()}-${Math.random()}`, cicloId: novoCicloId })),
              temas: swot[preCarregarDe].temas.map((tema) => ({ ...tema, id: `tema-${Date.now()}-${Math.random()}`, cicloId: novoCicloId })),
            },
          }))
        }
        
        // Adicionar histórico de pré-carga
        novoCiclo.historico.push({
          id: `hist-${Date.now()}-1`,
          tipo: "criacao",
          descricao: `Dados de contexto pré-carregados de ${cicloAnterior.nome}`,
          usuario: dados.governante.nome,
          dataHora: new Date().toISOString(),
        })
      }
    }
    
    setCiclos((prev) => [...prev, novoCiclo])
    return novoCicloId
  }

  const atualizarCiclo = (id: string, dados: Partial<CicloEstrategico>) => {
    setCiclos((prev) => prev.map((c) => (c.id === id ? { ...c, ...dados, atualizadoEm: new Date().toISOString() } : c)))
    if (cicloAtual?.id === id) {
      setCicloAtual((prev) => (prev ? { ...prev, ...dados, atualizadoEm: new Date().toISOString() } : null))
    }
  }

  const selecionarCiclo = (id: string) => {
    const ciclo = ciclos.find((c) => c.id === id)
    if (ciclo) setCicloAtual(ciclo)
  }
  
  // ================================================================
  // FUNÇÕES DE MUDANÇA DE ESTADO
  // ================================================================
  
  const enviarParaRevisao = (cicloId: string): boolean => {
    const ciclo = ciclos.find((c) => c.id === cicloId)
    if (!ciclo) return false
    if (ciclo.status !== "rascunho") return false
    
    atualizarCiclo(cicloId, {
      status: "em_revisao",
      historico: [
        ...ciclo.historico,
        {
          id: `hist-${Date.now()}`,
          tipo: "revisao",
          descricao: "Ciclo enviado para revisão",
          usuario: ciclo.governante.nome,
          dataHora: new Date().toISOString(),
        },
      ],
    })
    return true
  }
  
  const consolidarCiclo = (cicloId: string): boolean => {
    const ciclo = ciclos.find((c) => c.id === cicloId)
    if (!ciclo) return false
    if (ciclo.status !== "em_revisao") return false
    
    atualizarCiclo(cicloId, {
      status: "consolidado",
      historico: [
        ...ciclo.historico,
        {
          id: `hist-${Date.now()}`,
          tipo: "consolidacao",
          descricao: "Ciclo consolidado - aguardando homologação",
          usuario: ciclo.governante.nome,
          dataHora: new Date().toISOString(),
        },
      ],
    })
    return true
  }
  
  const homologarCiclo = (cicloId: string, homologadoPor: { id: string; nome: string; cargo: string }): boolean => {
    const ciclo = ciclos.find((c) => c.id === cicloId)
    if (!ciclo) return false
    if (ciclo.status !== "consolidado") return false
    
    atualizarCiclo(cicloId, {
      status: "homologado",
      historico: [
        ...ciclo.historico,
        {
          id: `hist-${Date.now()}`,
          tipo: "homologacao",
          descricao: `Ciclo homologado por ${homologadoPor.nome} (${homologadoPor.cargo})`,
          usuario: homologadoPor.nome,
          dataHora: new Date().toISOString(),
        },
      ],
    })
    return true
  }
  
  const desdobrarCiclo = (cicloId: string): boolean => {
    const ciclo = ciclos.find((c) => c.id === cicloId)
    if (!ciclo) return false
    if (ciclo.status !== "homologado") return false
    
    // Criar estrutura de desdobramento (simplificado para MVP)
    const novoDesdobramento: Desdobramento = {
      cicloId,
      dataDesdobramento: new Date().toISOString(),
      desdobradoPor: {
        id: ciclo.governante.id,
        nome: ciclo.governante.nome,
      },
      departamentos: [
        {
          departamento: "financeiro",
          okrs: [],
          responsavelDepartamento: { id: "fin-001", nome: "Diretor Financeiro", cargo: "Diretor" },
          metasDepartamento: { progressoEsperado: 0, progressoAtual: 0 },
        },
        {
          departamento: "comercial",
          okrs: [],
          responsavelDepartamento: { id: "com-001", nome: "Diretor Comercial", cargo: "Diretor" },
          metasDepartamento: { progressoEsperado: 0, progressoAtual: 0 },
        },
        {
          departamento: "obras",
          okrs: [],
          responsavelDepartamento: { id: "obr-001", nome: "Diretor de Obras", cargo: "Diretor" },
          metasDepartamento: { progressoEsperado: 0, progressoAtual: 0 },
        },
        {
          departamento: "rh",
          okrs: [],
          responsavelDepartamento: { id: "rh-001", nome: "Diretor de RH", cargo: "Diretor" },
          metasDepartamento: { progressoEsperado: 0, progressoAtual: 0 },
        },
      ],
      radiacaoCalendario: {
        marcosEstrategicos: [
          {
            id: `marco-${Date.now()}-1`,
            titulo: "Início do Ciclo Estratégico",
            descricao: `Início da execução do ${ciclo.nome}`,
            data: ciclo.periodo.inicio,
            tipo: "inicio_ciclo",
            departamentosEnvolvidos: ["financeiro", "comercial", "obras", "rh"],
          },
          {
            id: `marco-${Date.now()}-2`,
            titulo: "Revisão Q1",
            descricao: "Primeira revisão trimestral",
            data: new Date(new Date(ciclo.periodo.inicio).setMonth(3)).toISOString(),
            tipo: "revisao_trimestral",
            departamentosEnvolvidos: ["financeiro", "comercial", "obras", "rh"],
          },
        ],
        revisoesAgendadas: [
          {
            id: `rev-${Date.now()}-1`,
            tipo: "trimestral",
            data: new Date(new Date(ciclo.periodo.inicio).setMonth(3)).toISOString(),
            responsavel: ciclo.governante.nome,
            status: "pendente",
          },
        ],
      },
      status: "concluido",
    }
    
    setDesdobramentos((prev) => ({ ...prev, [cicloId]: novoDesdobramento }))
    
    atualizarCiclo(cicloId, {
      status: "em_execucao",
      historico: [
        ...ciclo.historico,
        {
          id: `hist-${Date.now()}`,
          tipo: "desdobramento",
          descricao: "Ciclo desdobrado para departamentos e radiado para calendário corporativo",
          usuario: ciclo.governante.nome,
          dataHora: new Date().toISOString(),
        },
      ],
    })
    return true
  }
  
  const voltarParaRascunho = (cicloId: string): boolean => {
    const ciclo = ciclos.find((c) => c.id === cicloId)
    if (!ciclo) return false
    if (ciclo.status !== "em_revisao" && ciclo.status !== "consolidado") return false
    
    atualizarCiclo(cicloId, {
      status: "rascunho",
      historico: [
        ...ciclo.historico,
        {
          id: `hist-${Date.now()}`,
          tipo: "ajuste",
          descricao: "Ciclo retornou para rascunho para ajustes",
          usuario: ciclo.governante.nome,
          dataHora: new Date().toISOString(),
        },
      ],
    })
    return true
  }

  const validarAvancoEtapa = (cicloId: string, etapaDesejada: EtapaCiclo): { valido: boolean; motivo?: string } => {
    const ordemEtapas: EtapaCiclo[] = ["pestel", "swot", "gut", "bcg", "okrs", "monitoramento", "encerramento"]
    const ciclo = ciclos.find((c) => c.id === cicloId)

    if (!ciclo) return { valido: false, motivo: "Ciclo não encontrado" }

    const indexAtual = ordemEtapas.indexOf(ciclo.etapaAtual)
    const indexDesejada = ordemEtapas.indexOf(etapaDesejada)

    if (indexDesejada > indexAtual + 1) {
      return { valido: false, motivo: "Não é possível pular etapas. Complete a etapa atual primeiro." }
    }

    // Validações específicas por etapa
    if (etapaDesejada === "swot" && (!pestel[cicloId] || !pestel[cicloId].concluidaEm)) {
      return { valido: false, motivo: "Complete a análise PESTEL primeiro" }
    }

    if (etapaDesejada === "gut" && (!swot[cicloId] || !swot[cicloId].concluidaEm)) {
      return { valido: false, motivo: "Complete a análise SWOT primeiro" }
    }

    if (etapaDesejada === "okrs" && (!gut[cicloId] || !gut[cicloId].concluidaEm)) {
      return { valido: false, motivo: "Complete a matriz GUT primeiro" }
    }

    return { valido: true }
  }

  const avancarEtapa = (cicloId: string): boolean => {
    const ordemEtapas: EtapaCiclo[] = ["pestel", "swot", "gut", "bcg", "okrs", "monitoramento", "encerramento"]
    const ciclo = ciclos.find((c) => c.id === cicloId)

    if (!ciclo) return false

    const indexAtual = ordemEtapas.indexOf(ciclo.etapaAtual)
    if (indexAtual >= ordemEtapas.length - 1) return false

    const proximaEtapa = ordemEtapas[indexAtual + 1]
    const validacao = validarAvancoEtapa(cicloId, proximaEtapa)

    if (!validacao.valido) {
      console.warn(validacao.motivo)
      return false
    }

    atualizarCiclo(cicloId, {
      etapaAtual: proximaEtapa,
      etapasConcluidas: [...ciclo.etapasConcluidas, ciclo.etapaAtual],
    })

    return true
  }

  const encerrarCiclo = (cicloId: string, dados: Omit<EncerramentoCiclo, "cicloId" | "congeladoEm">) => {
    const encerramento: EncerramentoCiclo = {
      ...dados,
      cicloId,
      congeladoEm: new Date().toISOString(),
    }

    setEncerramentos((prev) => ({ ...prev, [cicloId]: encerramento }))
    atualizarCiclo(cicloId, { status: "encerrado", encerramentoEm: new Date().toISOString() })
  }

  // ================================================================
  // FUNÇÕES - PESTEL
  // ================================================================

  const adicionarFatorPESTEL = (cicloId: string, fator: Omit<FatorPESTEL, "id" | "cicloId" | "criadoEm">) => {
    const novoFator: FatorPESTEL = {
      ...fator,
      id: `pestel-${Date.now()}`,
      cicloId,
      criadoEm: new Date().toISOString(),
    }

    setPestel((prev) => {
      const analiseAtual = prev[cicloId] || { cicloId, fatores: [] }
      return {
        ...prev,
        [cicloId]: {
          ...analiseAtual,
          fatores: [...analiseAtual.fatores, novoFator],
        },
      }
    })
  }

  const atualizarFatorPESTEL = (cicloId: string, fatorId: string, dados: Partial<FatorPESTEL>) => {
    setPestel((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        fatores: prev[cicloId].fatores.map((f) => (f.id === fatorId ? { ...f, ...dados } : f)),
      },
    }))
  }

  const removerFatorPESTEL = (cicloId: string, fatorId: string) => {
    setPestel((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        fatores: prev[cicloId].fatores.filter((f) => f.id !== fatorId),
      },
    }))
  }

  const concluirPESTEL = (cicloId: string) => {
    const analise = pestel[cicloId]
    if (!analise) return

    const riscos = analise.fatores.filter((f) => f.tipo === "risco")
    const oportunidades = analise.fatores.filter((f) => f.tipo === "oportunidade")

    const pilarMaisCritico = analise.fatores.reduce(
      (acc, f) => {
        acc[f.pilar] = (acc[f.pilar] || 0) + f.impacto
        return acc
      },
      {} as Record<PilarPESTEL, number>
    )

    const pilarMax = Object.entries(pilarMaisCritico).reduce((a, b) => (b[1] > a[1] ? b : a))[0] as PilarPESTEL

    setPestel((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        concluidaEm: new Date().toISOString(),
        resumo: {
          totalRiscos: riscos.length,
          totalOportunidades: oportunidades.length,
          pilarMaisCritico: pilarMax,
        },
      },
    }))
  }

  // ================================================================
  // FUNÇÕES - SWOT
  // ================================================================

  const adicionarItemSWOT = (cicloId: string, item: Omit<ItemSWOT, "id" | "cicloId" | "criadoEm">) => {
    const novoItem: ItemSWOT = {
      ...item,
      id: `swot-${item.quadrante}-${Date.now()}`,
      cicloId,
      criadoEm: new Date().toISOString(),
    }

    setSwot((prev) => {
      const analiseAtual = prev[cicloId] || { cicloId, forcas: [], fraquezas: [], oportunidades: [], ameacas: [], temas: [] }
      const quadrante = `${item.quadrante}` as QuadranteSWOT
      return {
        ...prev,
        [cicloId]: {
          ...analiseAtual,
          [quadrante]: [...(analiseAtual[quadrante] as ItemSWOT[]), novoItem],
        },
      }
    })
  }

  const atualizarItemSWOT = (cicloId: string, itemId: string, dados: Partial<ItemSWOT>) => {
    setSwot((prev) => {
      const analise = prev[cicloId]
      if (!analise) return prev

      return {
        ...prev,
        [cicloId]: {
          ...analise,
          forcas: analise.forcas.map((i) => (i.id === itemId ? { ...i, ...dados } : i)),
          fraquezas: analise.fraquezas.map((i) => (i.id === itemId ? { ...i, ...dados } : i)),
          oportunidades: analise.oportunidades.map((i) => (i.id === itemId ? { ...i, ...dados } : i)),
          ameacas: analise.ameacas.map((i) => (i.id === itemId ? { ...i, ...dados } : i)),
        },
      }
    })
  }

  const removerItemSWOT = (cicloId: string, itemId: string) => {
    setSwot((prev) => {
      const analise = prev[cicloId]
      if (!analise) return prev

      return {
        ...prev,
        [cicloId]: {
          ...analise,
          forcas: analise.forcas.filter((i) => i.id !== itemId),
          fraquezas: analise.fraquezas.filter((i) => i.id !== itemId),
          oportunidades: analise.oportunidades.filter((i) => i.id !== itemId),
          ameacas: analise.ameacas.filter((i) => i.id !== itemId),
        },
      }
    })
  }

  const adicionarTema = (cicloId: string, tema: Omit<TemaEstrategico, "id" | "cicloId" | "criadoEm">) => {
    const novoTema: TemaEstrategico = {
      ...tema,
      id: `tema-${Date.now()}`,
      cicloId,
      criadoEm: new Date().toISOString(),
    }

    setSwot((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        temas: [...prev[cicloId].temas, novoTema],
      },
    }))
  }

  const concluirSWOT = (cicloId: string) => {
    setSwot((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        concluidaEm: new Date().toISOString(),
      },
    }))
  }

  // ================================================================
  // FUNÇÕES - GUT
  // ================================================================

  const calcularScoreGUT = (g: number, u: number, t: number) => g * u * t

  const adicionarAvaliacaoGUT = (cicloId: string, avaliacao: Omit<AvaliacaoGUT, "id" | "cicloId" | "score" | "criadoEm">) => {
    const novaAvaliacao: AvaliacaoGUT = {
      ...avaliacao,
      id: `gut-${Date.now()}`,
      cicloId,
      score: calcularScoreGUT(avaliacao.gravidade, avaliacao.urgencia, avaliacao.tendencia),
      criadoEm: new Date().toISOString(),
    }

    setGut((prev) => {
      const matrizAtual = prev[cicloId] || { cicloId, avaliacoes: [], ranking: [] }
      const novasAvaliacoes = [...matrizAtual.avaliacoes, novaAvaliacao]
      const novoRanking = [...novasAvaliacoes].sort((a, b) => b.score - a.score)

      return {
        ...prev,
        [cicloId]: {
          ...matrizAtual,
          avaliacoes: novasAvaliacoes,
          ranking: novoRanking,
        },
      }
    })
  }

  const atualizarAvaliacaoGUT = (cicloId: string, avaliacaoId: string, dados: Partial<AvaliacaoGUT>) => {
    setGut((prev) => {
      const matriz = prev[cicloId]
      if (!matriz) return prev

      const avaliacaoAtualizada = matriz.avaliacoes.map((a) => {
        if (a.id === avaliacaoId) {
          const updated = { ...a, ...dados }
          if (dados.gravidade || dados.urgencia || dados.tendencia) {
            updated.score = calcularScoreGUT(updated.gravidade, updated.urgencia, updated.tendencia)
          }
          return updated
        }
        return a
      })

      const novoRanking = [...avaliacaoAtualizada].sort((a, b) => b.score - a.score)

      return {
        ...prev,
        [cicloId]: {
          ...matriz,
          avaliacoes: avaliacaoAtualizada,
          ranking: novoRanking,
        },
      }
    })
  }

  const removerAvaliacaoGUT = (cicloId: string, avaliacaoId: string) => {
    setGut((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        avaliacoes: prev[cicloId].avaliacoes.filter((a) => a.id !== avaliacaoId),
        ranking: prev[cicloId].ranking.filter((a) => a.id !== avaliacaoId),
      },
    }))
  }

  const concluirGUT = (cicloId: string) => {
    setGut((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        concluidaEm: new Date().toISOString(),
      },
    }))
  }

  // ================================================================
  // FUNÇÕES - BCG
  // ================================================================

  const classificarBCG = (participacao: number, crescimento: number): any => {
    if (participacao >= 50 && crescimento >= 10) return "estrela"
    if (participacao >= 50 && crescimento < 10) return "vaca_leiteira"
    if (participacao < 50 && crescimento >= 10) return "oportunidade"
    return "abacaxi"
  }

  const adicionarItemBCG = (cicloId: string, item: Omit<ItemBCG, "id" | "cicloId" | "classificacao" | "criadoEm">) => {
    const novoItem: ItemBCG = {
      ...item,
      id: `bcg-${Date.now()}`,
      cicloId,
      classificacao: classificarBCG(item.participacaoMercado, item.crescimentoMercado),
      criadoEm: new Date().toISOString(),
    }

    setBcg((prev) => {
      const matrizAtual = prev[cicloId] || { cicloId, itens: [] }
      return {
        ...prev,
        [cicloId]: {
          ...matrizAtual,
          itens: [...matrizAtual.itens, novoItem],
        },
      }
    })
  }

  const atualizarItemBCG = (cicloId: string, itemId: string, dados: Partial<ItemBCG>) => {
    setBcg((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        itens: prev[cicloId].itens.map((i) => {
          if (i.id === itemId) {
            const updated = { ...i, ...dados }
            if (dados.participacaoMercado !== undefined || dados.crescimentoMercado !== undefined) {
              updated.classificacao = classificarBCG(updated.participacaoMercado, updated.crescimentoMercado)
            }
            return updated
          }
          return i
        }),
      },
    }))
  }

  const removerItemBCG = (cicloId: string, itemId: string) => {
    setBcg((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        itens: prev[cicloId].itens.filter((i) => i.id !== itemId),
      },
    }))
  }

  const concluirBCG = (cicloId: string) => {
    const matriz = bcg[cicloId]
    if (!matriz) return

    const analise = {
      totalEstrelas: matriz.itens.filter((i) => i.classificacao === "estrela").length,
      totalVacas: matriz.itens.filter((i) => i.classificacao === "vaca_leiteira").length,
      totalAbacaxis: matriz.itens.filter((i) => i.classificacao === "abacaxi").length,
      totalOportunidades: matriz.itens.filter((i) => i.classificacao === "oportunidade").length,
    }

    setBcg((prev) => ({
      ...prev,
      [cicloId]: {
        ...prev[cicloId],
        analise,
        concluidaEm: new Date().toISOString(),
      },
    }))
  }

  // ================================================================
  // FUNÇÕES - MONITORAMENTO
  // ================================================================

  const adicionarAlerta = (cicloId: string, alerta: Omit<Alerta, "id" | "cicloId" | "geradoEm">) => {
    const novoAlerta: Alerta = {
      ...alerta,
      id: `alerta-${Date.now()}`,
      cicloId,
      geradoEm: new Date().toISOString(),
    }
    setAlertas((prev) => [...prev, novoAlerta])
  }

  const resolverAlerta = (alertaId: string, resolvidoPor: string, acaoTomada: string) => {
    setAlertas((prev) =>
      prev.map((a) =>
        a.id === alertaId
          ? {
              ...a,
              resolvidoEm: new Date().toISOString(),
              resolvidoPor,
              acaoTomada,
            }
          : a
      )
    )
  }

  const adicionarDecisao = (cicloId: string, decisao: Omit<Decisao, "id" | "cicloId" | "dataHora">) => {
    const novaDecisao: Decisao = {
      ...decisao,
      id: `decisao-${Date.now()}`,
      cicloId,
      dataHora: new Date().toISOString(),
    }
    setDecisoes((prev) => [...prev, novaDecisao])
  }

  // ================================================================
  // FUNÇÕES - DESDOBRAMENTO
  // ================================================================
  
  const getDesdobramento = (cicloId: string): Desdobramento | undefined => {
    return desdobramentos[cicloId]
  }
  
  const getOKRsDepartamento = (cicloId: string, departamento: Departamento): any[] => {
    const desdobramento = desdobramentos[cicloId]
    if (!desdobramento) return []
    
    const dept = desdobramento.departamentos.find((d) => d.departamento === departamento)
    return dept?.okrs || []
  }
  
  // ================================================================
  // FUNÇÕES - REVISÃO PERIÓDICA
  // ================================================================
  
  const criarRevisaoPeriodica = (cicloAnteriorId: string, cicloAtualId: string): void => {
    const cicloAnterior = ciclos.find((c) => c.id === cicloAnteriorId)
    const cicloAtual = ciclos.find((c) => c.id === cicloAtualId)
    
    if (!cicloAnterior || !cicloAtual) return
    
    // Criar comparações simuladas (em produção, viriam de dados reais)
    const comparacoes: ComparacaoMetrica[] = [
      {
        metrica: "Receita Total",
        projetado: 150000000,
        real: 142000000,
        desvio: -5.3,
        status: "parcial",
        impacto: "negativo",
        observacao: "Meta não atingida devido a atrasos em 2 obras",
      },
      {
        metrica: "Margem Bruta (%)",
        projetado: 12,
        real: 10.5,
        desvio: -12.5,
        status: "parcial",
        impacto: "negativo",
        observacao: "Aumento de custos com materiais",
      },
      {
        metrica: "Obras Entregues",
        projetado: 15,
        real: 13,
        desvio: -13.3,
        status: "parcial",
        impacto: "negativo",
      },
      {
        metrica: "Novos Contratos",
        projetado: 8,
        real: 10,
        desvio: 25,
        status: "superado",
        impacto: "positivo",
        observacao: "Expansão comercial bem-sucedida",
      },
    ]
    
    const novaRevisao: RevisaoPeriodica = {
      id: `revisao-${Date.now()}`,
      cicloAnteriorId,
      cicloAtualId,
      dataRevisao: new Date().toISOString(),
      tipo: "comparativa_anual",
      comparacoes,
      licoesAprendidas: [
        "Necessidade de melhor gestão de prazos em obras de grande porte",
        "Controle de custos de materiais precisa ser fortalecido",
        "Estratégia comercial agressiva gerou resultados positivos",
      ],
      ajustesSugeridos: [
        {
          id: `ajuste-${Date.now()}-1`,
          area: "obras",
          tipo: "meta",
          descricao: "Ajustar meta de obras entregues considerando complexidade",
          justificativa: "Obras de infraestrutura têm prazo médio 20% maior que o estimado",
          prioridade: "alta",
          status: "pendente",
        },
        {
          id: `ajuste-${Date.now()}-2`,
          area: "financeiro",
          tipo: "recurso",
          descricao: "Implementar hedge para materiais estratégicos",
          justificativa: "Volatilidade de preços impactou margem em 2025",
          prioridade: "alta",
          status: "pendente",
        },
      ],
      realizadaPor: {
        id: cicloAtual.governante.id,
        nome: cicloAtual.governante.nome,
      },
      status: "concluida",
    }
    
    setRevisoesPeriodicas((prev) => [...prev, novaRevisao])
  }
  
  const getRevisoesParaCiclo = (cicloId: string): RevisaoPeriodica[] => {
    return revisoesPeriodicas.filter((r) => r.cicloAtualId === cicloId || r.cicloAnteriorId === cicloId)
  }
  
  // ================================================================
  // FUNÇÕES - FILTROS TEMPORAIS
  // ================================================================
  
  const getDadosTrimestre = (cicloId: string, trimestre: "Q1" | "Q2" | "Q3" | "Q4", ano: number): DadosTrimestre => {
    const trimestreMap = {
      Q1: { inicio: `${ano}-01-01`, fim: `${ano}-03-31` },
      Q2: { inicio: `${ano}-04-01`, fim: `${ano}-06-30` },
      Q3: { inicio: `${ano}-07-01`, fim: `${ano}-09-30` },
      Q4: { inicio: `${ano}-10-01`, fim: `${ano}-12-31` },
    }
    
    return {
      trimestre,
      ano,
      periodo: trimestreMap[trimestre],
      okrsAtivos: 10, // Mock - em produção, filtrar por data
      progressoMedio: 65,
      metasAlcancadas: 7,
      alertas: 2,
    }
  }
  
  const getDadosSemestre = (cicloId: string, semestre: "S1" | "S2", ano: number): DadosSemestre => {
    const semestreMap = {
      S1: { inicio: `${ano}-01-01`, fim: `${ano}-06-30` },
      S2: { inicio: `${ano}-07-01`, fim: `${ano}-12-31` },
    }
    
    return {
      semestre,
      ano,
      periodo: semestreMap[semestre],
      okrsAtivos: 20,
      progressoMedio: 68,
      metasAlcancadas: 15,
      alertas: 3,
    }
  }

  // ================================================================
  // FUNÇÕES - DASHBOARD
  // ================================================================

  const getDashboard = (): DashboardEstrategico => {
    // Implementação simplificada - será expandida
    return {
      cicloAtual: cicloAtual || undefined,
      resumoGeral: {
        totalCiclos: ciclos.length,
        cicloAtivo: ciclos.some((c) => c.status === "em_execucao"),
        okrsAtivos: 0,
        progressoGeral: 0,
        alertasCriticos: alertas.filter((a) => a.nivel === "critico" && !a.resolvidoEm).length,
      },
      desempenhoOKRs: {
        financeiro: 0,
        operacional: 0,
        cliente: 0,
        pessoas: 0,
        inovacao: 0,
        qualidade: 0,
      },
      obras: {
        total: 0,
        estrategicas: 0,
        emExecucao: 0,
        concluidas: 0,
      },
      financeiro: {
        receitaAcumulada: 0,
        receitaMeta: 0,
        margemMedia: 0,
        investimentoEstrategico: 0,
      },
      alertasRecentes: alertas.slice(0, 5),
      proximasRevisoes: [],
    }
  }

  // ================================================================
  // PROVIDER VALUE
  // ================================================================

  const value: CicloEstrategicoContextType = {
    ciclos,
    cicloAtual,
    pestel,
    swot,
    gut,
    bcg,
    alertas,
    decisoes,
    monitoramento,
    encerramentos,
    desdobramentos,
    revisoesPeriodicas: revisoesPeriodicas,
    filtroTemporal,
    isLoading,

    criarCiclo,
    atualizarCiclo,
    avancarEtapa,
    encerrarCiclo,
    selecionarCiclo,
    
    enviarParaRevisao,
    consolidarCiclo,
    homologarCiclo,
    desdobrarCiclo,
    voltarParaRascunho,

    adicionarFatorPESTEL,
    atualizarFatorPESTEL,
    removerFatorPESTEL,
    concluirPESTEL,

    adicionarItemSWOT,
    atualizarItemSWOT,
    removerItemSWOT,
    adicionarTema,
    concluirSWOT,

    adicionarAvaliacaoGUT,
    atualizarAvaliacaoGUT,
    removerAvaliacaoGUT,
    concluirGUT,

    adicionarItemBCG,
    atualizarItemBCG,
    removerItemBCG,
    concluirBCG,

    adicionarAlerta,
    resolverAlerta,
    adicionarDecisao,
    
    getDesdobramento,
    getOKRsDepartamento,
    
    criarRevisaoPeriodica,
    getRevisoesParaCiclo,
    
    setFiltroTemporal,
    getDadosTrimestre,
    getDadosSemestre,

    getDashboard,
    validarAvancoEtapa,
  }

  return <CicloEstrategicoContext.Provider value={value}>{children}</CicloEstrategicoContext.Provider>
}

// ================================================================
// HOOK
// ================================================================

export function useCicloEstrategico() {
  const context = useContext(CicloEstrategicoContext)
  if (!context) {
    throw new Error("useCicloEstrategico deve ser usado dentro de CicloEstrategicoProvider")
  }
  return context
}
