// Tipos para Analise Prismatica
// Camada adicional - NAO ALTERA COMPONENTES EXISTENTES

export type PrismStatus = "GREEN" | "YELLOW" | "RED" | "NEUTRAL"

export type PrismFace =
  | "ORCAMENTARIO"
  | "CONTRATUAL"
  | "EXECUTADO"
  | "PROJETADO_EAC"
  | "TECNICO"
  | "PRODUTIVIDADE"
  | "TEMPORAL"
  | "RISCO"
  | "GOVERNANCA_ALCADA"

export type DecisionState = "AUTO_APPROVED" | "NEEDS_JUSTIFICATION" | "BLOCKED_ESCALATE" | "NO_DATA"

export interface FaceResult {
  face: PrismFace
  status: PrismStatus
  metricLabel?: string
  metricValue?: number
  thresholdYellow?: number
  thresholdRed?: number
  limitLabel?: string
  reasonCode?: string
  reasonDetail?: string
}

export interface PrismSummary {
  green: number
  yellow: number
  red: number
  neutral: number
}

export interface PrismResult {
  globalStatus: PrismStatus
  decisionState: DecisionState
  pressureText: string
  faces: FaceResult[]
  summary: PrismSummary
  updatedAt: string
}

// Labels amigaveis para cada face
export const FACE_LABELS: Record<PrismFace, string> = {
  ORCAMENTARIO: "Orcamento",
  CONTRATUAL: "Contrato",
  EXECUTADO: "Executado",
  PROJETADO_EAC: "EAC",
  TECNICO: "Tecnico",
  PRODUTIVIDADE: "Produtividade",
  TEMPORAL: "Prazo",
  RISCO: "Risco",
  GOVERNANCA_ALCADA: "Alcada",
}

// Labels para status global
export const STATUS_LABELS: Record<PrismStatus, string> = {
  GREEN: "Aprovado",
  YELLOW: "Atencao",
  RED: "Critico",
  NEUTRAL: "Sem dados",
}

// Labels para decisao
export const DECISION_LABELS: Record<DecisionState, string> = {
  AUTO_APPROVED: "Aprovacao Automatica",
  NEEDS_JUSTIFICATION: "Requer Justificativa",
  BLOCKED_ESCALATE: "Bloqueado - Escalar",
  NO_DATA: "Dados Insuficientes",
}
