// ============================================================================
// TIPOS DO DEPARTAMENTO COMERCIAL
// ERP-GNESIS - Aahbrant Engenharia e Construções
// ============================================================================

// ============================================================================
// ENUMS E TIPOS BASE
// ============================================================================

export type TipoCliente = "Publico" | "Privado" | "Misto"
export type StatusCliente = "Ativo" | "Prospeccao" | "Inativo"
export type SegmentoCliente = 
  | "Infraestrutura Rodoviária"
  | "Saneamento" 
  | "Energia"
  | "Portuário"
  | "Transporte Metroviário"
  | "Concessões Rodoviárias"
  | "Outro"

export type EstagioFunil = 
  | "prospeccao"
  | "qualificacao" 
  | "proposta"
  | "negociacao"
  | "fechamento"
  | "perda"

export type StatusContrato = "ativo" | "suspenso" | "encerrado" | "cancelado"
export type TipoContrato = "Empreitada Global" | "Empreitada por Preço Unitário" | "Administração" | "Fornecimento"
export type ModalidadeContrato = "Concorrência Pública" | "Tomada de Preços" | "Convite" | "Pregão" | "RDC" | "Dispensa" | "Inexigibilidade"

export type TipoInteracao = "reuniao" | "email" | "telefone" | "visita" | "proposta" | "contrato" | "negociacao" | "prospeccao"
export type OrigemProposta = "Licitação" | "Convite" | "Indicação" | "Prospecção Ativa" | "RFP" | "Parceria"

// ============================================================================
// INTERFACES - CLIENTE & CRM
// ============================================================================

export interface Contato {
  id: string
  nome: string
  cargo: string
  email: string
  telefone: string
  principal: boolean
  ativo: boolean
  dataCadastro: string
  observacoes?: string
}

export interface InteracaoCliente {
  id: string
  tipo: TipoInteracao
  descricao: string
  data: string
  usuario: string
  clienteId: string
  proximaAcao?: string
  proximaAcaoData?: string
  anexos?: string[]
}

export interface Cliente {
  id: string
  nome: string
  nomeCompleto: string
  tipo: TipoCliente
  segmento: SegmentoCliente
  cnpj: string
  endereco: string
  cidade: string
  uf: string
  site?: string
  favorito: boolean
  status: StatusCliente
  contatos: Contato[]
  contratos: number
  valorTotal: number
  propostasAtivas: number
  ultimoContato: string
  proximaAcao?: string
  proximaAcaoData?: string
  historico: InteracaoCliente[]
  observacoes?: string
  dataCadastro: string
  responsavel: string
}

// ============================================================================
// INTERFACES - PROPOSTAS
// ============================================================================

export interface HistoricoProposta {
  data: string
  acao: string
  usuario: string
  observacoes?: string
}

export interface Proposta {
  id: string
  titulo: string
  clienteId: string
  clienteNome: string
  clienteContato: string
  clienteEmail: string
  clienteTelefone: string
  valor: number
  probabilidade: number
  estagio: EstagioFunil
  dataAbertura: string
  dataLimite: string
  responsavel: string
  responsavelAvatar: string
  origem: OrigemProposta
  tipo: SegmentoCliente
  uf: string
  prazoExecucao: string
  observacoes: string
  historico: HistoricoProposta[]
  anexos?: string[]
  tags?: string[]
}

// ============================================================================
// INTERFACES - CONTRATOS
// ============================================================================

export interface Aditivo {
  id: string
  numero: number
  tipo: "Prazo" | "Valor" | "Escopo" | "Misto"
  dataAssinatura: string
  valorAditivo: number
  novoValor: number
  novoPrazo?: string
  justificativa: string
  aprovador: string
  documentos?: string[]
}

export interface DocumentoContrato {
  id: string
  nome: string
  tipo: "Contrato" | "Aditivo" | "Medicao" | "Fatura" | "Nota Fiscal" | "Garantia" | "Outro"
  dataUpload: string
  usuario: string
  url: string
  tamanho: number
}

export interface Contrato {
  id: string
  titulo: string
  clienteId: string
  clienteNome: string
  objeto: string
  valorOriginal: number
  valorAtual: number
  aditivos: number
  valorAditivos: number
  status: StatusContrato
  tipo: TipoContrato
  modalidade: ModalidadeContrato
  dataAssinatura: string
  dataVigencia: string
  prazoMeses: number
  garantia: number
  retencao: number
  reajuste: string
  centrosCusto: string[]
  gerenteContrato: string
  documentos: DocumentoContrato[]
  aditivosLista: Aditivo[]
  ultimaAtualizacao: string
  observacoes?: string
}

// ============================================================================
// INTERFACES - ANALYTICS & KPIs
// ============================================================================

export interface KPIComercial {
  valor: number
  variacao: number
  meta?: number
  unidade?: string
  periodo?: string
}

export interface PerformanceVendedor {
  usuarioId: string
  nome: string
  propostas: number
  ganhas: number
  valor: number
  taxaConversao: number
}

export interface PerformanceSegmento {
  segmento: SegmentoCliente
  propostas: number
  valor: number
  participacao: number
  taxaConversao: number
}

export interface FunilVendas {
  estagio: string
  quantidade: number
  valor: number
  conversao: number
}

export interface TendenciaMensal {
  mes: string
  propostas: number
  valor: number
  ganhas: number
}

export interface DashboardComercial {
  kpis: {
    propostasAtivas: number
    pipelineTotal: number
    taxaConversao: number
    obrasAtivas: number
    clientesAtivos: number
    propostas30dias: number
  }
  performanceVendedores: PerformanceVendedor[]
  performanceSegmentos: PerformanceSegmento[]
  funilVendas: FunilVendas[]
  tendenciaMensal: TendenciaMensal[]
}

// ============================================================================
// INTERFACE - CONTEXT
// ============================================================================

export interface ComercialContextType {
  // Estado
  clientes: Cliente[]
  propostas: Proposta[]
  contratos: Contrato[]
  clienteSelecionado: Cliente | null
  propostaSelecionada: Proposta | null
  contratoSelecionado: Contrato | null
  
  // Seleção
  selecionarCliente: (cliente: Cliente | null) => void
  selecionarProposta: (proposta: Proposta | null) => void
  selecionarContrato: (contrato: Contrato | null) => void
  
  // CRUD Clientes
  addCliente: (cliente: Omit<Cliente, "id" | "dataCadastro">) => void
  updateCliente: (id: string, data: Partial<Cliente>) => void
  deleteCliente: (id: string) => void
  toggleFavorito: (id: string) => void
  addContatoCliente: (clienteId: string, contato: Omit<Contato, "id" | "dataCadastro">) => void
  addInteracaoCliente: (clienteId: string, interacao: Omit<InteracaoCliente, "id" | "clienteId">) => void
  
  // CRUD Propostas
  addProposta: (proposta: Omit<Proposta, "id" | "dataAbertura" | "historico">) => void
  updateProposta: (id: string, data: Partial<Proposta>) => void
  deleteProposta: (id: string) => void
  moverPropostaEstagio: (id: string, novoEstagio: EstagioFunil) => void
  addHistoricoProposta: (propostaId: string, acao: string) => void
  
  // CRUD Contratos
  addContrato: (contrato: Omit<Contrato, "id" | "dataAssinatura" | "ultimaAtualizacao">) => void
  updateContrato: (id: string, data: Partial<Contrato>) => void
  deleteContrato: (id: string) => void
  addAditivoContrato: (contratoId: string, aditivo: Omit<Aditivo, "id">) => void
  addDocumentoContrato: (contratoId: string, documento: Omit<DocumentoContrato, "id" | "dataUpload">) => void
  
  // Dashboards
  getDashboard: () => DashboardComercial
  getClientePorId: (id: string) => Cliente | undefined
  getPropostaPorId: (id: string) => Proposta | undefined
  getContratoPorId: (id: string) => Contrato | undefined
  getPropostasPorCliente: (clienteId: string) => Proposta[]
  getContratosPorCliente: (clienteId: string) => Contrato[]
}
