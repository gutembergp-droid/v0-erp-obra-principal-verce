// ================================================================
// TIPOS E INTERFACES - MÓDULO DE PLANEJAMENTO ESTRATÉGICO
// ERP-GNESIS - CONSTRUTORA AAHBRANT
// ================================================================

// ================================================================
// 1. CICLO ESTRATÉGICO
// ================================================================

export type StatusCiclo = "rascunho" | "em_revisao" | "consolidado" | "homologado" | "em_execucao" | "encerrado"

export type EtapaCiclo = "pestel" | "swot" | "gut" | "bcg" | "okrs" | "monitoramento" | "encerramento"

export interface CicloEstrategico {
  id: string
  nome: string
  periodo: {
    inicio: string // ISO date
    fim: string // ISO date
    tipo: "trimestral" | "semestral" | "anual" | "bienal"
  }
  status: StatusCiclo
  governante: {
    id: string
    nome: string
    cargo: string
  }
  etapaAtual: EtapaCiclo
  etapasConcluidas: EtapaCiclo[]
  criadoEm: string
  atualizadoEm: string
  encerramentoEm?: string
  historico: HistoricoAcao[]
}

export interface HistoricoAcao {
  id: string
  tipo: "criacao" | "aprovacao" | "mudanca_etapa" | "ajuste" | "encerramento" | "alerta" | "revisao" | "consolidacao" | "homologacao" | "desdobramento"
  descricao: string
  usuario: string
  dataHora: string
  detalhes?: Record<string, any>
}

// ================================================================
// 2. ANÁLISE PESTEL
// ================================================================

export type PilarPESTEL = "politico" | "economico" | "social" | "tecnologico" | "ambiental" | "legal"

export type TipoImpactoPESTEL = "risco" | "oportunidade"

export interface FatorPESTEL {
  id: string
  cicloId: string
  pilar: PilarPESTEL
  descricao: string
  tipo: TipoImpactoPESTEL
  impacto: 1 | 2 | 3 | 4 | 5 // 1=muito baixo, 5=muito alto
  observacoes?: string
  criadoEm: string
  criadoPor: string
}

export interface AnalisePESTEL {
  cicloId: string
  fatores: FatorPESTEL[]
  concluidaEm?: string
  resumo?: {
    totalRiscos: number
    totalOportunidades: number
    pilarMaisCritico: PilarPESTEL
  }
}

// ================================================================
// 3. ANÁLISE SWOT
// ================================================================

export type QuadranteSWOT = "forcas" | "fraquezas" | "oportunidades" | "ameacas"

export interface ItemSWOT {
  id: string
  cicloId: string
  quadrante: QuadranteSWOT
  descricao: string
  vinculoPESTEL?: string[] // IDs de fatores PESTEL relacionados
  prioridade?: 1 | 2 | 3 // 1=baixa, 3=alta
  criadoEm: string
}

export interface TemaEstrategico {
  id: string
  cicloId: string
  nome: string
  descricao: string
  origemSWOT: string[] // IDs de itens SWOT que geraram o tema
  criadoEm: string
}

export interface AnaliseSWOT {
  cicloId: string
  forcas: ItemSWOT[]
  fraquezas: ItemSWOT[]
  oportunidades: ItemSWOT[]
  ameacas: ItemSWOT[]
  temas: TemaEstrategico[]
  concluidaEm?: string
}

// ================================================================
// 4. MATRIZ GUT (GRAVIDADE, URGÊNCIA, TENDÊNCIA)
// ================================================================

export interface AvaliacaoGUT {
  id: string
  cicloId: string
  temaId: string
  temaNome: string
  gravidade: 1 | 2 | 3 | 4 | 5
  urgencia: 1 | 2 | 3 | 4 | 5
  tendencia: 1 | 2 | 3 | 4 | 5
  score: number // G × U × T (1-125)
  justificativa?: string
  criadoEm: string
  criadoPor: string
}

export interface MatrizGUT {
  cicloId: string
  avaliacoes: AvaliacaoGUT[]
  ranking: AvaliacaoGUT[] // Ordenado por score
  concluidaEm?: string
}

// ================================================================
// 5. MATRIZ BCG (BOSTON CONSULTING GROUP)
// ================================================================

export type ClassificacaoBCG = "estrela" | "vaca_leiteira" | "abacaxi" | "oportunidade"

export interface ItemBCG {
  id: string
  cicloId: string
  nome: string
  tipo: "obra" | "servico" | "produto" | "linha_negocio"
  participacaoMercado: number // 0-100 (%)
  crescimentoMercado: number // -100 a +100 (%)
  receitaAnual?: number
  margemLucro?: number
  classificacao: ClassificacaoBCG
  recomendacao: string
  criadoEm: string
}

export interface MatrizBCG {
  cicloId: string
  itens: ItemBCG[]
  analise?: {
    totalEstrelas: number
    totalVacas: number
    totalAbacaxis: number
    totalOportunidades: number
  }
  concluidaEm?: string
}

// ================================================================
// 6. OKRs (OBJECTIVES AND KEY RESULTS)
// ================================================================

export type StatusOKR = "rascunho" | "ativo" | "pausado" | "concluido" | "cancelado"

export type TipoOKR = "financeiro" | "operacional" | "cliente" | "pessoas" | "inovacao" | "qualidade"

export interface KeyResult {
  id: string
  descricao: string
  metrica: string
  valorInicial: number
  valorMeta: number
  valorAtual: number
  unidade: string
  progresso: number // 0-100 (%)
  prazo: string // ISO date
  responsavel: {
    id: string
    nome: string
  }
  integracaoERP?: {
    modulo: "financeiro" | "suprimentos" | "obras" | "rh"
    indicador: string
    atualizacaoAutomatica: boolean
  }
  ultimaAtualizacao: string
}

export interface OKR {
  id: string
  cicloId: string
  temaGUTId?: string // Vinculação obrigatória com GUT
  objetivo: string
  tipo: TipoOKR
  status: StatusOKR
  keyResults: KeyResult[]
  progresso: number // 0-100 (média dos KRs)
  periodo: {
    inicio: string
    fim: string
  }
  governante: {
    id: string
    nome: string
  }
  responsavel: {
    id: string
    nome: string
  }
  criadoEm: string
  atualizadoEm: string
  historico: {
    data: string
    tipo: "criacao" | "atualizacao" | "mudanca_status"
    descricao: string
    usuario: string
  }[]
}

// ================================================================
// 7. MONITORAMENTO E GOVERNANÇA
// ================================================================

export type NivelAlerta = "info" | "atencao" | "critico"

export interface Alerta {
  id: string
  cicloId: string
  okrId?: string
  krId?: string
  nivel: NivelAlerta
  titulo: string
  descricao: string
  geradoEm: string
  resolvidoEm?: string
  resolvidoPor?: string
  acaoTomada?: string
}

export interface Decisao {
  id: string
  cicloId: string
  tipo: "ajuste_meta" | "mudanca_responsavel" | "pausa_okr" | "cancelamento" | "alocacao_recurso"
  descricao: string
  justificativa: string
  tomadaPor: {
    id: string
    nome: string
    cargo: string
  }
  dataHora: string
  impacto?: string
}

export interface Monitoramento {
  cicloId: string
  alertas: Alerta[]
  decisoes: Decisao[]
  metricas: {
    okrsAtivos: number
    progressoMedio: number
    okrsEmRisco: number
    okrsNoPrazo: number
    okrsAtrasados: number
    alertasCriticos: number
  }
  ultimaAtualizacao: string
}

// ================================================================
// 8. ENCERRAMENTO DE CICLO
// ================================================================

export interface ResultadoFinal {
  okrId: string
  objetivo: string
  metaPlanejada: number
  resultadoAlcancado: number
  percentualAtingido: number
  status: "superado" | "atingido" | "parcial" | "nao_atingido"
}

export interface EncerramentoCiclo {
  cicloId: string
  dataEncerramento: string
  responsavel: {
    id: string
    nome: string
  }
  resultados: ResultadoFinal[]
  metricas: {
    totalOKRs: number
    okrsSuperados: number
    okrsAtingidos: number
    okrsParciais: number
    okrsNaoAtingidos: number
    taxaSucesso: number // 0-100 (%)
  }
  licoesAprendidas?: string
  recomendacoesProximoCiclo?: string
  relatorioGerado: boolean
  congeladoEm: string
}

// ================================================================
// 9. DASHBOARD E VISÕES CONSOLIDADAS
// ================================================================

export interface VerbaEstrategica {
  id: string
  nome: string
  orcado: number
  comprometido: number
  realizado: number
  disponivel: number
}

export interface DashboardEstrategico {
  cicloAtual?: CicloEstrategico
  resumoGeral: {
    totalCiclos: number
    cicloAtivo: boolean
    okrsAtivos: number
    progressoGeral: number
    alertasCriticos: number
  }
  desempenhoOKRs: {
    financeiro: number
    operacional: number
    cliente: number
    pessoas: number
    inovacao: number
    qualidade: number
  }
  obras: {
    total: number
    estrategicas: number
    emExecucao: number
    concluidas: number
  }
  financeiro: {
    receitaAcumulada: number
    receitaMeta: number
    margemMedia: number
    investimentoEstrategico: number
  }
  alertasRecentes: Alerta[]
  proximasRevisoes: {
    tipo: "okr" | "ciclo" | "governanca"
    data: string
    responsavel: string
  }[]
}

// ================================================================
// 10. PERMISSÕES E CONTROLE
// ================================================================

export interface PermissaoPlanejamento {
  usuarioId: string
  podeVisualizarCiclos: boolean
  podeCriarCiclos: boolean
  podeEditarCiclos: boolean
  podeEncerrarCiclos: boolean
  podeAprovarCiclos: boolean
  podeGerenciarOKRs: boolean
  podeTomarDecisoesEstrategicas: boolean
  nivelHierarquico: "operacional" | "tatico" | "estrategico" | "executivo"
}

// ================================================================
// 11. DESDOBRAMENTO DEPARTAMENTAL
// ================================================================

export type Departamento = "financeiro" | "comercial" | "obras" | "rh" | "operacoes" | "ti"

export interface OKRDepartamental {
  departamento: Departamento
  okrs: OKR[]
  responsavelDepartamento: {
    id: string
    nome: string
    cargo: string
  }
  metasDepartamento: {
    progressoEsperado: number
    progressoAtual: number
  }
}

export interface Desdobramento {
  cicloId: string
  dataDesdobramento: string
  desdobradoPor: {
    id: string
    nome: string
  }
  departamentos: OKRDepartamental[]
  radiacaoCalendario: {
    marcosEstrategicos: MarcoCorporativo[]
    revisoesAgendadas: RevisaoAgendada[]
  }
  status: "em_andamento" | "concluido"
}

export interface MarcoCorporativo {
  id: string
  titulo: string
  descricao: string
  data: string
  tipo: "inicio_ciclo" | "revisao_trimestral" | "encerramento" | "outro"
  departamentosEnvolvidos: Departamento[]
}

export interface RevisaoAgendada {
  id: string
  tipo: "trimestral" | "semestral" | "anual"
  data: string
  responsavel: string
  status: "pendente" | "realizada" | "cancelada"
}

// ================================================================
// 12. FILTROS TEMPORAIS E PERÍODOS
// ================================================================

export type Trimestre = "Q1" | "Q2" | "Q3" | "Q4"
export type Semestre = "S1" | "S2"

export interface FiltroTemporal {
  ano: number
  mes?: number // 1-12
  trimestre?: Trimestre
  semestre?: Semestre
  dataInicio?: string // ISO date
  dataFim?: string // ISO date
}

export interface DadosTrimestre {
  trimestre: Trimestre
  ano: number
  periodo: {
    inicio: string
    fim: string
  }
  okrsAtivos: number
  progressoMedio: number
  metasAlcancadas: number
  alertas: number
}

export interface DadosSemestre {
  semestre: Semestre
  ano: number
  periodo: {
    inicio: string
    fim: string
  }
  okrsAtivos: number
  progressoMedio: number
  metasAlcancadas: number
  alertas: number
}

// ================================================================
// 13. REVISÃO PERIÓDICA (Projetado vs. Real)
// ================================================================

export interface RevisaoPeriodica {
  id: string
  cicloAnteriorId: string
  cicloAtualId: string
  dataRevisao: string
  tipo: "comparativa_anual" | "ajuste_trimestral"
  comparacoes: ComparacaoMetrica[]
  licoesAprendidas: string[]
  ajustesSugeridos: AjusteSugerido[]
  realizadaPor: {
    id: string
    nome: string
  }
  status: "pendente" | "em_analise" | "concluida"
}

export interface ComparacaoMetrica {
  metrica: string
  projetado: number
  real: number
  desvio: number // percentual
  status: "superado" | "atingido" | "parcial" | "nao_atingido"
  impacto: "positivo" | "neutro" | "negativo"
  observacao?: string
}

export interface AjusteSugerido {
  id: string
  area: Departamento
  tipo: "meta" | "prazo" | "responsavel" | "recurso"
  descricao: string
  justificativa: string
  prioridade: "alta" | "media" | "baixa"
  status: "pendente" | "aprovado" | "rejeitado" | "implementado"
}
