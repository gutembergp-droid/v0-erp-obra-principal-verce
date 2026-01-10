// ============================================================================
// TYPES: PROPOSTAS - ANÁLISE CORPORATIVA
// ============================================================================

export type StatusProposta = 
  | "em_cadastro"
  | "em_documentos"
  | "em_analise"
  | "em_decisao"
  | "liberada"
  | "arquivada"

export type StatusBloco = "pendente" | "em_andamento" | "completo" | "bloqueado"

export type OrigemProposta = "prospeccao" | "direta"

export type TipoObra = 
  | "infraestrutura"
  | "edificacao"
  | "industrial"
  | "energia"
  | "saneamento"
  | "outro"

export type StatusJuridico = "seguro" | "atencao" | "inseguro"

export type ClassificacaoRisco = "baixo" | "medio" | "alto" | "critico"

export type CategoriaRisco = 
  | "tecnico"
  | "operacional"
  | "financeiro"
  | "economico"
  | "juridico"
  | "contratual"
  | "reputacional"

export type TipoDocumento = 
  | "tecnico"
  | "comercial"
  | "financeiro"
  | "legal"
  | "outro"

export type StatusDocumento = "ok" | "pendente" | "vencido"

export type DecisaoProposta = 
  | "aprovar"
  | "aprovar_com_ressalvas"
  | "reprovar"
  | "solicitar_excecao"

// ============================================================================
// INTERFACES
// ============================================================================

export interface PropostaCompleta {
  id: string
  
  // Status Geral
  status: StatusProposta
  statusBlocos: {
    cadastro: StatusBloco
    documentos: StatusBloco
    analiseViabilidade: StatusBloco
    analiseJuridica: StatusBloco
    analiseRisco: StatusBloco
    decisao: StatusBloco
  }
  
  // Cadastro
  cadastro: CadastroProposta
  
  // Documentos
  documentos: DocumentoProposta[]
  
  // Análise de Viabilidade (6 Pilares)
  analiseViabilidade: AnaliseViabilidade
  
  // Análise Jurídica
  analiseJuridica: AnaliseJuridica
  
  // Análise de Risco
  analiseRisco: AnaliseRisco
  
  // Decisão
  decisao?: DecisaoRegistrada
  
  // Metadados
  criadoPor: string
  criadoEm: string
  modificadoEm: string
  liberadoParaFunilEm?: string
}

export interface CadastroProposta {
  clienteId: string
  clienteNome: string
  nomeObra: string
  tipoObra: TipoObra
  localizacao: {
    cidade: string
    estado: string
    regiao: string
  }
  origem: OrigemProposta
  valorPublico: boolean
  valor?: number
  regimeContratual: string
  dataAlvo?: string
  observacoes?: string
}

export interface DocumentoProposta {
  id: string
  nome: string
  tipo: TipoDocumento
  status: StatusDocumento
  obrigatorio: boolean
  dataUpload: string
  url?: string
  observacao?: string
}

export interface AnaliseViabilidade {
  pilares: {
    tecnica: PilarAnalise
    operacional: PilarAnalise
    financeira: PilarAnalise
    economica: PilarAnalise
    juridica: PilarAnalise
    risco: PilarAnalise
  }
  conclusao: "viavel" | "viavel_com_ressalvas" | "inviavel"
  observacoes?: string
}

export interface PilarAnalise {
  score: number // 0-10
  comentario: string
  responsavel?: string
  dataAvaliacao?: string
}

export interface AnaliseJuridica {
  exigenciasConformes: boolean
  licencasOk: boolean
  clausulasAtipicas: boolean
  riscoRegulatorio: boolean
  parecer: string
  status: StatusJuridico
  responsavel?: string
  dataAnalise?: string
}

export interface AnaliseRisco {
  riscos: ItemRisco[]
  matrizResumo: {
    baixo: number
    medio: number
    alto: number
    critico: number
  }
}

export interface ItemRisco {
  id: string
  descricao: string
  categoria: CategoriaRisco
  probabilidade: number // 1-5
  impacto: number // 1-5
  classificacao: ClassificacaoRisco
  mitigacao: string
  responsavel?: string
}

export interface DecisaoRegistrada {
  tipo: DecisaoProposta
  justificativa: string
  mitigacoes?: string[]
  decisor: string
  dataDecisao: string
}

// ============================================================================
// HELPERS
// ============================================================================

export function calcularClassificacaoRisco(probabilidade: number, impacto: number): ClassificacaoRisco {
  const score = probabilidade * impacto
  if (score <= 6) return "baixo"
  if (score <= 12) return "medio"
  if (score <= 20) return "alto"
  return "critico"
}

export function podeLiberarParaFunil(proposta: PropostaCompleta): { pode: boolean; motivos: string[] } {
  const motivos: string[] = []
  
  // Cadastro completo
  if (proposta.statusBlocos.cadastro !== "completo") {
    motivos.push("Cadastro incompleto")
  }
  
  // Documentos mínimos
  const docsObrigatorios = proposta.documentos.filter(d => d.obrigatorio)
  const docsPendentes = docsObrigatorios.filter(d => d.status !== "ok")
  if (docsPendentes.length > 0) {
    motivos.push(`${docsPendentes.length} documento(s) obrigatório(s) pendente(s)`)
  }
  
  // 6 Pilares preenchidos
  const pilares = Object.values(proposta.analiseViabilidade.pilares)
  if (pilares.some(p => p.score === 0 || !p.comentario)) {
    motivos.push("Análise de viabilidade incompleta (6 pilares)")
  }
  
  // Status jurídico
  if (proposta.analiseJuridica.status === "inseguro" && proposta.decisao?.tipo !== "solicitar_excecao") {
    motivos.push("Status jurídico INSEGURO - solicite exceção")
  }
  
  // Matriz de risco
  if (proposta.analiseRisco.riscos.length === 0) {
    motivos.push("Análise de risco não preenchida")
  }
  
  const riscoCritico = proposta.analiseRisco.riscos.some(r => r.classificacao === "critico")
  if (riscoCritico && proposta.decisao?.tipo !== "solicitar_excecao") {
    motivos.push("Risco CRÍTICO identificado - solicite exceção")
  }
  
  // Decisão registrada
  if (!proposta.decisao) {
    motivos.push("Decisão corporativa não registrada")
  }
  
  return {
    pode: motivos.length === 0,
    motivos
  }
}
