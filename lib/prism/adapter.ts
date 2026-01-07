// Prism Adapter - Calcula faces a partir de dados existentes
// Camada adicional - NAO ALTERA COMPONENTES EXISTENTES

import type { PrismStatus, PrismFace, FaceResult, PrismResult, DecisionState, PrismSummary } from "./types"

// Interface para dados de entrada (campos que podem existir nos cards)
export interface PrismInputData {
  // Orcamentario
  valorOrcado?: number
  valorComprometido?: number
  // Contratual
  limiteContrato?: number
  // Executado
  valorExecutado?: number
  // EAC
  valorProjetadoEAC?: number
  // Tecnico
  scoreTecnico?: number // 0-1
  // Produtividade
  produtividadeReal?: number
  produtividadePlanejada?: number
  // Temporal
  impactoCaminhoCritico?: boolean
  temAtraso?: boolean
  // Risco
  scoreRisco?: number // 0-1
  // Alcada
  alcadaUsuario?: number
  alcadaRequerida?: number
}

// Calcula status baseado em thresholds
function calcStatus(value: number, thresholdYellow: number, thresholdRed: number, inverso = false): PrismStatus {
  if (inverso) {
    // Quanto MAIOR melhor (ex: tecnico, produtividade)
    if (value >= thresholdYellow) return "GREEN"
    if (value >= thresholdRed) return "YELLOW"
    return "RED"
  } else {
    // Quanto MENOR melhor (ex: orcamento, risco)
    if (value <= thresholdYellow) return "GREEN"
    if (value <= thresholdRed) return "YELLOW"
    return "RED"
  }
}

// Calcula cada face
function calcOrcamentario(data: PrismInputData): FaceResult {
  const face: PrismFace = "ORCAMENTARIO"

  if (!data.valorOrcado || !data.valorComprometido) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  const percent = data.valorComprometido / data.valorOrcado
  const status = calcStatus(percent, 0.95, 1.0)

  return {
    face,
    status,
    metricLabel: `${(percent * 100).toFixed(0)}% do orcamento`,
    metricValue: percent,
    thresholdYellow: 0.95,
    thresholdRed: 1.0,
    reasonCode: status === "GREEN" ? "OK" : status === "YELLOW" ? "BUDGET_NEAR_LIMIT" : "BUDGET_OVER_100",
    reasonDetail:
      status === "RED"
        ? "Comprometido excedeu o orcamento aprovado"
        : status === "YELLOW"
          ? "Comprometido proximo do limite orcado"
          : undefined,
  }
}

function calcContratual(data: PrismInputData): FaceResult {
  const face: PrismFace = "CONTRATUAL"

  if (!data.limiteContrato || !data.valorComprometido) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  const percent = data.valorComprometido / data.limiteContrato
  const status = calcStatus(percent, 0.95, 1.0)

  return {
    face,
    status,
    metricLabel: `${(percent * 100).toFixed(0)}% do contrato`,
    metricValue: percent,
    thresholdYellow: 0.95,
    thresholdRed: 1.0,
    reasonCode: status === "GREEN" ? "OK" : status === "YELLOW" ? "CONTRACT_NEAR_LIMIT" : "CONTRACT_OVER_100",
    reasonDetail:
      status === "RED"
        ? "Comprometido excedeu o limite contratual"
        : status === "YELLOW"
          ? "Comprometido proximo do limite contratual"
          : undefined,
  }
}

function calcExecutado(data: PrismInputData): FaceResult {
  const face: PrismFace = "EXECUTADO"

  if (!data.valorOrcado || !data.valorExecutado) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  const percent = data.valorExecutado / data.valorOrcado
  const status = calcStatus(percent, 0.9, 1.0)

  return {
    face,
    status,
    metricLabel: `${(percent * 100).toFixed(0)}% executado`,
    metricValue: percent,
    thresholdYellow: 0.9,
    thresholdRed: 1.0,
    reasonCode: status === "GREEN" ? "OK" : status === "YELLOW" ? "EXEC_NEAR_LIMIT" : "EXEC_OVER_100",
    reasonDetail:
      status === "RED"
        ? "Executado excedeu o orcamento"
        : status === "YELLOW"
          ? "Executado proximo do limite"
          : undefined,
  }
}

function calcEAC(data: PrismInputData): FaceResult {
  const face: PrismFace = "PROJETADO_EAC"

  if (!data.valorOrcado || !data.valorProjetadoEAC) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  const percent = data.valorProjetadoEAC / data.valorOrcado
  const status = calcStatus(percent, 0.98, 1.05)

  return {
    face,
    status,
    metricLabel: `${(percent * 100).toFixed(0)}% EAC`,
    metricValue: percent,
    thresholdYellow: 0.98,
    thresholdRed: 1.05,
    reasonCode: status === "GREEN" ? "OK" : status === "YELLOW" ? "EAC_UPTREND" : "EAC_OVER_LIMIT",
    reasonDetail:
      status === "RED"
        ? "Projecao final excede tolerancia"
        : status === "YELLOW"
          ? "Projecao acima do orcamento, ainda dentro da tolerancia"
          : undefined,
  }
}

function calcTecnico(data: PrismInputData): FaceResult {
  const face: PrismFace = "TECNICO"

  if (data.scoreTecnico === undefined) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  const status = calcStatus(data.scoreTecnico, 0.9, 0.75, true)

  return {
    face,
    status,
    metricLabel: `Conformidade ${(data.scoreTecnico * 100).toFixed(0)}%`,
    metricValue: data.scoreTecnico,
    thresholdYellow: 0.75,
    thresholdRed: 0.6,
    reasonCode: status === "GREEN" ? "OK" : status === "YELLOW" ? "TECH_BELOW_TARGET" : "TECH_CRITICAL",
    reasonDetail:
      status === "RED"
        ? "Conformidade tecnica critica"
        : status === "YELLOW"
          ? "Conformidade tecnica abaixo do ideal"
          : undefined,
  }
}

function calcProdutividade(data: PrismInputData): FaceResult {
  const face: PrismFace = "PRODUTIVIDADE"

  if (!data.produtividadeReal || !data.produtividadePlanejada) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  const ratio = data.produtividadeReal / data.produtividadePlanejada
  const status = calcStatus(ratio, 0.95, 0.85, true)

  return {
    face,
    status,
    metricLabel: `${(ratio * 100).toFixed(0)}% da meta`,
    metricValue: ratio,
    thresholdYellow: 0.85,
    thresholdRed: 0.7,
    reasonCode: status === "GREEN" ? "OK" : status === "YELLOW" ? "PROD_BELOW_TARGET" : "PROD_CRITICAL",
    reasonDetail:
      status === "RED"
        ? "Produtividade muito abaixo da meta"
        : status === "YELLOW"
          ? "Produtividade abaixo da meta"
          : undefined,
  }
}

function calcTemporal(data: PrismInputData): FaceResult {
  const face: PrismFace = "TEMPORAL"

  if (data.impactoCaminhoCritico === undefined) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  let status: PrismStatus = "GREEN"
  let reasonCode = "OK"
  let reasonDetail: string | undefined

  if (data.impactoCaminhoCritico) {
    if (data.temAtraso) {
      status = "RED"
      reasonCode = "CRITICAL_PATH_DELAYED"
      reasonDetail = "Impacto no caminho critico com atraso"
    } else {
      status = "YELLOW"
      reasonCode = "CRITICAL_PATH_RISK"
      reasonDetail = "Impacto potencial no caminho critico"
    }
  }

  return {
    face,
    status,
    metricLabel: status === "GREEN" ? "Sem impacto critico" : status === "YELLOW" ? "Risco no prazo" : "Atraso critico",
    reasonCode,
    reasonDetail,
  }
}

function calcRisco(data: PrismInputData): FaceResult {
  const face: PrismFace = "RISCO"

  if (data.scoreRisco === undefined) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  const status = calcStatus(data.scoreRisco, 0.3, 0.6)

  return {
    face,
    status,
    metricLabel: `Risco ${(data.scoreRisco * 100).toFixed(0)}%`,
    metricValue: data.scoreRisco,
    thresholdYellow: 0.6,
    thresholdRed: 0.8,
    reasonCode: status === "GREEN" ? "OK" : status === "YELLOW" ? "RISK_MODERATE" : "RISK_HIGH",
    reasonDetail:
      status === "RED" ? "Nivel de risco elevado" : status === "YELLOW" ? "Nivel de risco moderado" : undefined,
  }
}

function calcAlcada(data: PrismInputData): FaceResult {
  const face: PrismFace = "GOVERNANCA_ALCADA"

  if (data.alcadaUsuario === undefined || data.alcadaRequerida === undefined) {
    return { face, status: "NEUTRAL", reasonCode: "NO_DATA" }
  }

  const status: PrismStatus = data.alcadaUsuario >= data.alcadaRequerida ? "GREEN" : "RED"

  return {
    face,
    status,
    metricLabel: status === "GREEN" ? "Alcada OK" : "Alcada insuficiente",
    reasonCode: status === "GREEN" ? "OK" : "INSUFFICIENT_AUTHORITY",
    reasonDetail: status === "RED" ? "Usuario nao possui alcada necessaria" : undefined,
  }
}

// Funcao principal do adapter
export function prismAdapter(data: PrismInputData): PrismResult | null {
  const faces: FaceResult[] = [
    calcOrcamentario(data),
    calcContratual(data),
    calcExecutado(data),
    calcEAC(data),
    calcTecnico(data),
    calcProdutividade(data),
    calcTemporal(data),
    calcRisco(data),
    calcAlcada(data),
  ]

  // Se todas as faces sao NEUTRAL, retorna null
  const nonNeutralFaces = faces.filter((f) => f.status !== "NEUTRAL")
  if (nonNeutralFaces.length === 0) {
    return null
  }

  // Calcular status global
  const hasRed = faces.some((f) => f.status === "RED")
  const hasYellow = faces.some((f) => f.status === "YELLOW")
  const hasGreen = faces.some((f) => f.status === "GREEN")

  let globalStatus: PrismStatus = "NEUTRAL"
  let decisionState: DecisionState = "NO_DATA"

  if (hasRed) {
    globalStatus = "RED"
    decisionState = "BLOCKED_ESCALATE"
  } else if (hasYellow) {
    globalStatus = "YELLOW"
    decisionState = "NEEDS_JUSTIFICATION"
  } else if (hasGreen) {
    globalStatus = "GREEN"
    decisionState = "AUTO_APPROVED"
  }

  // Calcular pressao (quantas em atencao = YELLOW ou RED)
  const attentionCount = faces.filter((f) => f.status === "YELLOW" || f.status === "RED").length
  const totalCalculated = nonNeutralFaces.length
  const pressureText = `${attentionCount}/${totalCalculated} em atencao`

  const summary: PrismSummary = {
    green: faces.filter((f) => f.status === "GREEN").length,
    yellow: faces.filter((f) => f.status === "YELLOW").length,
    red: faces.filter((f) => f.status === "RED").length,
    neutral: faces.filter((f) => f.status === "NEUTRAL").length,
  }

  return {
    globalStatus,
    decisionState,
    pressureText,
    faces,
    summary,
    updatedAt: new Date().toISOString(),
  }
}

// Mocks para demonstracao
export const MOCK_VERDE: PrismResult = {
  globalStatus: "GREEN",
  decisionState: "AUTO_APPROVED",
  pressureText: "0/9 em atencao",
  summary: { green: 9, yellow: 0, red: 0, neutral: 0 },
  updatedAt: new Date().toISOString(),
  faces: [
    {
      face: "ORCAMENTARIO",
      status: "GREEN",
      metricLabel: "92% do orcamento",
      metricValue: 0.92,
      thresholdYellow: 0.95,
      thresholdRed: 1.0,
      reasonCode: "OK",
    },
    {
      face: "CONTRATUAL",
      status: "GREEN",
      metricLabel: "90% do contrato",
      metricValue: 0.9,
      thresholdYellow: 0.95,
      thresholdRed: 1.0,
      reasonCode: "OK",
    },
    {
      face: "EXECUTADO",
      status: "GREEN",
      metricLabel: "85% executado",
      metricValue: 0.85,
      thresholdYellow: 0.9,
      thresholdRed: 1.0,
      reasonCode: "OK",
    },
    {
      face: "PROJETADO_EAC",
      status: "GREEN",
      metricLabel: "97% EAC",
      metricValue: 0.97,
      thresholdYellow: 0.98,
      thresholdRed: 1.05,
      reasonCode: "OK",
    },
    {
      face: "TECNICO",
      status: "GREEN",
      metricLabel: "Conformidade 95%",
      metricValue: 0.95,
      thresholdYellow: 0.75,
      thresholdRed: 0.6,
      reasonCode: "OK",
    },
    {
      face: "PRODUTIVIDADE",
      status: "GREEN",
      metricLabel: "98% da meta",
      metricValue: 0.98,
      thresholdYellow: 0.85,
      thresholdRed: 0.7,
      reasonCode: "OK",
    },
    { face: "TEMPORAL", status: "GREEN", metricLabel: "Sem impacto critico", reasonCode: "OK" },
    {
      face: "RISCO",
      status: "GREEN",
      metricLabel: "Risco 20%",
      metricValue: 0.2,
      thresholdYellow: 0.6,
      thresholdRed: 0.8,
      reasonCode: "OK",
    },
    { face: "GOVERNANCA_ALCADA", status: "GREEN", metricLabel: "Alcada OK", reasonCode: "OK" },
  ],
}

export const MOCK_AMARELO: PrismResult = {
  globalStatus: "YELLOW",
  decisionState: "NEEDS_JUSTIFICATION",
  pressureText: "2/9 em atencao",
  summary: { green: 7, yellow: 2, red: 0, neutral: 0 },
  updatedAt: new Date().toISOString(),
  faces: [
    {
      face: "ORCAMENTARIO",
      status: "YELLOW",
      metricLabel: "99% do orcamento",
      metricValue: 0.99,
      thresholdYellow: 0.95,
      thresholdRed: 1.0,
      reasonCode: "BUDGET_NEAR_LIMIT",
      reasonDetail: "Comprometido proximo do limite orcado",
    },
    {
      face: "CONTRATUAL",
      status: "GREEN",
      metricLabel: "88% do contrato",
      metricValue: 0.88,
      thresholdYellow: 0.95,
      thresholdRed: 1.0,
      reasonCode: "OK",
    },
    {
      face: "EXECUTADO",
      status: "GREEN",
      metricLabel: "86% executado",
      metricValue: 0.86,
      thresholdYellow: 0.9,
      thresholdRed: 1.0,
      reasonCode: "OK",
    },
    {
      face: "PROJETADO_EAC",
      status: "YELLOW",
      metricLabel: "103% EAC",
      metricValue: 1.03,
      thresholdYellow: 0.98,
      thresholdRed: 1.05,
      reasonCode: "EAC_UPTREND",
      reasonDetail: "Projecao acima do orcamento, ainda dentro da tolerancia",
    },
    {
      face: "TECNICO",
      status: "GREEN",
      metricLabel: "Conformidade 90%",
      metricValue: 0.9,
      thresholdYellow: 0.75,
      thresholdRed: 0.6,
      reasonCode: "OK",
    },
    {
      face: "PRODUTIVIDADE",
      status: "GREEN",
      metricLabel: "95% da meta",
      metricValue: 0.95,
      thresholdYellow: 0.85,
      thresholdRed: 0.7,
      reasonCode: "OK",
    },
    { face: "TEMPORAL", status: "GREEN", metricLabel: "Sem impacto critico", reasonCode: "OK" },
    {
      face: "RISCO",
      status: "GREEN",
      metricLabel: "Risco 35%",
      metricValue: 0.35,
      thresholdYellow: 0.6,
      thresholdRed: 0.8,
      reasonCode: "OK",
    },
    { face: "GOVERNANCA_ALCADA", status: "GREEN", metricLabel: "Alcada OK", reasonCode: "OK" },
  ],
}

export const MOCK_VERMELHO: PrismResult = {
  globalStatus: "RED",
  decisionState: "BLOCKED_ESCALATE",
  pressureText: "3/9 em atencao",
  summary: { green: 6, yellow: 1, red: 2, neutral: 0 },
  updatedAt: new Date().toISOString(),
  faces: [
    {
      face: "ORCAMENTARIO",
      status: "RED",
      metricLabel: "108% do orcamento",
      metricValue: 1.08,
      thresholdYellow: 0.95,
      thresholdRed: 1.0,
      reasonCode: "BUDGET_OVER_100",
      reasonDetail: "Comprometido excedeu o orcamento aprovado",
    },
    {
      face: "CONTRATUAL",
      status: "GREEN",
      metricLabel: "92% do contrato",
      metricValue: 0.92,
      thresholdYellow: 0.95,
      thresholdRed: 1.0,
      reasonCode: "OK",
    },
    {
      face: "EXECUTADO",
      status: "YELLOW",
      metricLabel: "98% executado",
      metricValue: 0.98,
      thresholdYellow: 0.9,
      thresholdRed: 1.0,
      reasonCode: "EXEC_NEAR_LIMIT",
      reasonDetail: "Executado proximo do limite do orcamento",
    },
    {
      face: "PROJETADO_EAC",
      status: "RED",
      metricLabel: "112% EAC",
      metricValue: 1.12,
      thresholdYellow: 0.98,
      thresholdRed: 1.05,
      reasonCode: "EAC_OVER_LIMIT",
      reasonDetail: "Projecao final excede tolerancia",
    },
    {
      face: "TECNICO",
      status: "GREEN",
      metricLabel: "Conformidade 88%",
      metricValue: 0.88,
      thresholdYellow: 0.75,
      thresholdRed: 0.6,
      reasonCode: "OK",
    },
    {
      face: "PRODUTIVIDADE",
      status: "GREEN",
      metricLabel: "93% da meta",
      metricValue: 0.93,
      thresholdYellow: 0.85,
      thresholdRed: 0.7,
      reasonCode: "OK",
    },
    { face: "TEMPORAL", status: "GREEN", metricLabel: "Sem impacto critico", reasonCode: "OK" },
    {
      face: "RISCO",
      status: "GREEN",
      metricLabel: "Risco 40%",
      metricValue: 0.4,
      thresholdYellow: 0.6,
      thresholdRed: 0.8,
      reasonCode: "OK",
    },
    { face: "GOVERNANCA_ALCADA", status: "GREEN", metricLabel: "Alcada OK", reasonCode: "OK" },
  ],
}
