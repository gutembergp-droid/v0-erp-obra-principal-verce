"use client"

import { Suspense, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Download,
  Upload,
  Eye,
  ChevronRight,
  FileSignature,
  Ruler,
  Calculator,
  Package,
  Building2,
  Plus,
} from "lucide-react"

// Dados mockados - Planilhas Contratuais Cadastradas
const planilhasIniciaisMock = [
  {
    id: "1",
    nome: "Planilha OrÃ§amentÃ¡ria Base",
    versao: "v1.0",
    status: "aprovada",
    dataCriacao: "2024-03-15",
    valorTotal: 405000000.0,
  },
  {
    id: "2",
    nome: "Planilha OrÃ§amentÃ¡ria Base (RevisÃ£o)",
    versao: "v2.0",
    status: "aprovada",
    dataCriacao: "2024-05-20",
    valorTotal: 405000000.0,
  },
  {
    id: "3",
    nome: "Aditivo 01 - AmpliaÃ§Ã£o de Escopo",
    versao: "v1.0",
    status: "em_analise",
    dataCriacao: "2024-11-10",
    valorTotal: 52000000.0,
  },
]
import { useRouter, usePathname } from "next/navigation"

// Dados mockados
const dadosContrato = {
  cliente: "Departamento Nacional de Infraestrutura de Transportes - DNIT",
  numeroContrato: "CT-2024/0892",
  objeto: "ExecuÃ§Ã£o das obras de duplicaÃ§Ã£o da BR-101/SC, trecho FlorianÃ³polis - PalhoÃ§a, com extensÃ£o de 18,5 km",
  valorContratual: 405000000,
  dataInicio: "2024-03-15",
  dataTermino: "2027-03-14",
  prazoContratual: 36,
  tipoContrato: "PreÃ§o Global",
}

const escoposContratuais = [
  {
    codigo: "ESC-001",
    descricao: "Terraplenagem",
    unidade: "mÂ³",
    qtdContratual: 850000,
    valorUnit: 45.0,
    status: "ativo",
  },
  {
    codigo: "ESC-002",
    descricao: "PavimentaÃ§Ã£o asfÃ¡ltica",
    unidade: "mÂ²",
    qtdContratual: 370000,
    valorUnit: 180.0,
    status: "ativo",
  },
  {
    codigo: "ESC-003",
    descricao: "Drenagem profunda",
    unidade: "m",
    qtdContratual: 28500,
    valorUnit: 420.0,
    status: "ativo",
  },
  {
    codigo: "ESC-004",
    descricao: "Obras de arte especiais",
    unidade: "un",
    qtdContratual: 12,
    valorUnit: 4500000.0,
    status: "ativo",
  },
  {
    codigo: "ESC-005",
    descricao: "SinalizaÃ§Ã£o horizontal",
    unidade: "mÂ²",
    qtdContratual: 45000,
    valorUnit: 85.0,
    status: "ativo",
  },
  {
    codigo: "ESC-006",
    descricao: "SinalizaÃ§Ã£o vertical",
    unidade: "un",
    qtdContratual: 380,
    valorUnit: 1200.0,
    status: "ativo",
  },
  {
    codigo: "ESC-007",
    descricao: "Defensas metÃ¡licas",
    unidade: "m",
    qtdContratual: 12000,
    valorUnit: 380.0,
    status: "ativo",
  },
  {
    codigo: "ESC-008",
    descricao: "IluminaÃ§Ã£o pÃºblica",
    unidade: "un",
    qtdContratual: 450,
    valorUnit: 8500.0,
    status: "pendente",
  },
]

const criteriosMedicao = [
  {
    item: "ESC-001",
    criterio: "Levantamento topogrÃ¡fico + Notas de serviÃ§o",
    unidade: "mÂ³",
    regraAceite: "TolerÃ¢ncia Â±2%",
    documento: "Boletim de MediÃ§Ã£o + RDO",
    periodicidade: "Mensal",
  },
  {
    item: "ESC-002",
    criterio: "Ãrea executada conforme projeto",
    unidade: "mÂ²",
    regraAceite: "TolerÃ¢ncia Â±1%",
    documento: "Boletim de MediÃ§Ã£o + Ensaios",
    periodicidade: "Mensal",
  },
  {
    item: "ESC-003",
    criterio: "ExtensÃ£o linear executada",
    unidade: "m",
    regraAceite: "100% conforme projeto",
    documento: "Boletim de MediÃ§Ã£o + Fotos",
    periodicidade: "Mensal",
  },
  {
    item: "ESC-004",
    criterio: "Etapas concluÃ­das por OAE",
    unidade: "un",
    regraAceite: "Laudo estrutural aprovado",
    documento: "ART + Laudo TÃ©cnico",
    periodicidade: "Por etapa",
  },
  {
    item: "ESC-005",
    criterio: "Ãrea demarcada e aprovada",
    unidade: "mÂ²",
    regraAceite: "Conforme norma DNIT",
    documento: "Boletim + Fotos georreferenciadas",
    periodicidade: "Mensal",
  },
]

const regrasFaturamento = [
  { item: "ISS", descricao: "Imposto sobre ServiÃ§os", valor: "5,00%", observacao: "RetenÃ§Ã£o na fonte" },
  { item: "INSS", descricao: "ContribuiÃ§Ã£o PrevidenciÃ¡ria", valor: "11,00%", observacao: "RetenÃ§Ã£o na fonte" },
  { item: "IR", descricao: "Imposto de Renda", valor: "1,50%", observacao: "RetenÃ§Ã£o na fonte" },
  { item: "PIS/COFINS/CSLL", descricao: "ContribuiÃ§Ãµes Federais", valor: "4,65%", observacao: "RetenÃ§Ã£o na fonte" },
  { item: "Pagamento", descricao: "CondiÃ§Ã£o de pagamento", valor: "30 dias", observacao: "ApÃ³s aprovaÃ§Ã£o da mediÃ§Ã£o" },
  { item: "Reajuste", descricao: "Ãndice de reajuste", valor: "IPCA", observacao: "Anual, na data-base" },
]

const documentosContratuais = [
  { tipo: "Contrato Principal", numero: "CT-2024/0892", data: "2024-02-28", status: "vigente" },
  { tipo: "Termo Aditivo 01", numero: "TA-001/2024", data: "2024-06-15", status: "vigente" },
  { tipo: "Anexo I - Projeto Executivo", numero: "PE-2024/0892", data: "2024-02-28", status: "vigente" },
  { tipo: "Anexo II - Cronograma FÃ­sico-Financeiro", numero: "CFF-2024/0892", data: "2024-02-28", status: "vigente" },
  { tipo: "Anexo III - BDI Detalhado", numero: "BDI-2024/0892", data: "2024-02-28", status: "vigente" },
]

function EstruturacaoContratoContent() {
  const [status] = useState<"nao_iniciado" | "em_estruturacao" | "revisado" | "homologado">("em_estruturacao")
  const router = useRouter()
  const pathname = usePathname()
  const [planilhas, setPlanilhas] = useState(planilhasIniciaisMock)
  const [dialogPlanilhaAberto, setDialogPlanilhaAberto] = useState(false)
  const [nomePlanilha, setNomePlanilha] = useState("")
  const [versaoPlanilha, setVersaoPlanilha] = useState("1.0")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR")
  }

  const getStatusBadge = () => {
    switch (status) {
      case "nao_iniciado":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            NÃ£o Iniciado
          </Badge>
        )
      case "em_estruturacao":
        return (
          <Badge className="bg-accent-foreground/10 text-accent-foreground border-accent-foreground/30">
            Em EstruturaÃ§Ã£o
          </Badge>
        )
      case "revisado":
        return <Badge className="bg-primary/10 text-primary border-primary/30">Revisado</Badge>
      case "homologado":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Homologado</Badge>
    }
  }

  const getStatusBadgePlanilha = (status: string) => {
    switch (status) {
      case "aprovada":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">âœ“ Aprovada</Badge>
      case "em_analise":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/30">â³ Em AnÃ¡lise</Badge>
      case "em_edicao":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/30">âœï¸ Em EdiÃ§Ã£o</Badge>
      case "rejeitada":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/30">âœ— Rejeitada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleCriarPlanilha = () => {
    if (!nomePlanilha.trim()) return
    
    const novaPlanilha = {
      id: Date.now().toString(),
      nome: nomePlanilha,
      versao: versaoPlanilha,
      status: "em_edicao",
      dataCriacao: new Date().toISOString().split("T")[0],
      valorTotal: 0,
    }
    
    setPlanilhas([...planilhas, novaPlanilha])
    setDialogPlanilhaAberto(false)
    setNomePlanilha("")
    setVersaoPlanilha("1.0")
  }

  const prontoParaMedicao = status === "homologado"

  const navegacaoSetor = [
    { codigo: "EST-00", nome: "Visao Geral", rota: "/obra/comercial/estruturacao-geral", icon: FileText },
    { codigo: "EST-01", nome: "Contrato", rota: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
    { codigo: "EST-02", nome: "Medicao", rota: "/obra/comercial/estruturacao-medicao", icon: Ruler },
    { codigo: "EST-03", nome: "Custo", rota: "/obra/comercial/estruturacao-custo", icon: Calculator },
    { codigo: "EST-04", nome: "Suprimentos", rota: "/obra/comercial/estruturacao-suprimentos", icon: Package },
    { codigo: "EST-05", nome: "Indireto", rota: "/obra/comercial/estruturacao-indireto", icon: Building2 },
  ]

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex-none border-b border-border bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">EstruturaÃ§Ã£o do Contrato</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-01
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">Regras contratuais e critÃ©rios operacionais</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge()}
            <Separator orientation="vertical" className="h-6" />
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Importar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-8">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            {navegacaoSetor.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.rota
              return (
                <Button
                  key={item.codigo}
                  variant="outline"
                  size="sm"
                  className={`h-8 gap-1.5 text-xs ${isActive ? "bg-muted/50 border-primary/30" : "bg-transparent"}`}
                  onClick={() => router.push(item.rota)}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.nome}
                </Button>
              )
            })}
          </div>

          {/* BLOCO 1 - Dados Gerais do Contrato */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                1. Dados Gerais do Contrato
              </h2>
            </div>
            <div className="border border-border/60 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border/40">
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 w-48 text-muted-foreground font-medium bg-muted/20">Cliente</td>
                    <td className="px-4 py-3 text-foreground">{dadosContrato.cliente}</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground font-medium bg-muted/20">NÃºmero do Contrato</td>
                    <td className="px-4 py-3 text-foreground font-mono">{dadosContrato.numeroContrato}</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground font-medium bg-muted/20">Objeto</td>
                    <td className="px-4 py-3 text-foreground">{dadosContrato.objeto}</td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground font-medium bg-muted/20">Valor Contratual</td>
                    <td className="px-4 py-3 text-foreground font-semibold tabular-nums">
                      {formatCurrency(dadosContrato.valorContratual)}
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground font-medium bg-muted/20">PerÃ­odo</td>
                    <td className="px-4 py-3 text-foreground tabular-nums">
                      {formatDate(dadosContrato.dataInicio)} a {formatDate(dadosContrato.dataTermino)} (
                      {dadosContrato.prazoContratual} meses)
                    </td>
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground font-medium bg-muted/20">Tipo de Contrato</td>
                    <td className="px-4 py-3 text-foreground">{dadosContrato.tipoContrato}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Planilhas Contratuais Cadastradas */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-primary rounded-full" />
                <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                  Planilhas Contratuais Cadastradas
                </h2>
              </div>
              <Button size="sm" onClick={() => setDialogPlanilhaAberto(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Nova Planilha
              </Button>
            </div>
            <div className="border border-border/60 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Nome da Planilha
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">
                      VersÃ£o
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-40">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider w-32">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {planilhas.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <FileSignature className="w-12 h-12 text-muted-foreground/30" />
                          <p className="text-sm font-medium">Nenhuma planilha cadastrada</p>
                          <p className="text-xs">Clique em "Nova Planilha" para comeÃ§ar</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    planilhas.map((planilha, index) => {
                      const isUltimaVersao = index === planilhas.length - 1
                      return (
                        <tr
                          key={planilha.id}
                          className={`${index % 2 === 0 ? "bg-background" : "bg-muted/20"} hover:bg-muted/30 transition-colors ${isUltimaVersao ? "border-l-4 border-l-primary" : ""}`}
                        >
                          <td className="px-6 py-4 text-foreground font-medium">
                            <div className="flex items-center gap-2">
                              {planilha.nome}
                              {isUltimaVersao && (
                                <Badge variant="outline" className="text-[9px] bg-primary/10 text-primary border-primary/30">
                                  ÃšLTIMA
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center font-mono text-xs text-muted-foreground">
                            {planilha.versao}
                          </td>
                          <td className="px-6 py-4 text-center">{getStatusBadgePlanilha(planilha.status)}</td>
                          <td className="px-6 py-4 text-center text-xs text-muted-foreground tabular-nums">
                            {new Date(planilha.dataCriacao).toLocaleDateString("pt-BR")}
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2 italic">
              Controle de versÃµes das planilhas contratuais cadastradas. A Ãºltima versÃ£o Ã© destacada.
            </p>
          </section>

          {/* BLOCO 3 - CritÃ©rios de MediÃ§Ã£o do Cliente */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                3. CritÃ©rios de MediÃ§Ã£o do Cliente
              </h2>
            </div>
            <div className="border border-border/60 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border/60">
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Item
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      CritÃ©rio de MediÃ§Ã£o
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Unidade
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Regra de Aceite
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Documento ComprobatÃ³rio
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Periodicidade
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {criteriosMedicao.map((criterio, idx) => (
                    <tr key={idx} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs text-foreground">{criterio.item}</td>
                      <td className="px-4 py-3 text-foreground">{criterio.criterio}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{criterio.unidade}</td>
                      <td className="px-4 py-3 text-foreground">{criterio.regraAceite}</td>
                      <td className="px-4 py-3 text-foreground text-xs">{criterio.documento}</td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant="outline" className="text-[10px]">
                          {criterio.periodicidade}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* BLOCO 4 - Regras de Faturamento */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                4. Regras de Faturamento
              </h2>
            </div>
            <div className="border border-border/60 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border/60">
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Item
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      DescriÃ§Ã£o
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Valor/Percentual
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      ObservaÃ§Ã£o
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {regrasFaturamento.map((regra, idx) => (
                    <tr key={idx} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium text-foreground">{regra.item}</td>
                      <td className="px-4 py-3 text-foreground">{regra.descricao}</td>
                      <td className="px-4 py-3 text-center font-mono tabular-nums text-foreground">{regra.valor}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{regra.observacao}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* BLOCO 5 - Documentos Contratuais */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                5. Documentos Contratuais
              </h2>
            </div>
            <div className="border border-border/60 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border/60">
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      NÃºmero
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Data
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      AÃ§Ãµes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {documentosContratuais.map((doc, idx) => (
                    <tr key={idx} className="hover:bg-muted/30">
                      <td className="px-4 py-3 text-foreground">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          {doc.tipo}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-foreground">{doc.numero}</td>
                      <td className="px-4 py-3 text-center tabular-nums text-muted-foreground">
                        {formatDate(doc.data)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge
                          variant="outline"
                          className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]"
                        >
                          Vigente
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* BLOCO FINAL - Status e GovernanÃ§a */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">6. Status e GovernanÃ§a</h2>
            </div>
            <div className="border border-border/60 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    {prontoParaMedicao ? (
                      <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                    ) : (
                      <AlertCircle className="h-8 w-8 text-amber-500" />
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Contrato pronto para mediÃ§Ã£o?
                      </p>
                      <p
                        className={`text-lg font-semibold ${prontoParaMedicao ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {prontoParaMedicao ? "Sim - Estrutura Homologada" : "NÃ£o - Pendente de HomologaÃ§Ã£o"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Send className="h-4 w-4" />
                    Enviar para RevisÃ£o
                  </Button>
                  <Button className="gap-2 bg-primary hover:bg-primary/90">
                    <CheckCircle2 className="h-4 w-4" />
                    Homologar Estrutura
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ScrollArea>

      {/* Dialog Nova Planilha */}
      <Dialog open={dialogPlanilhaAberto} onOpenChange={setDialogPlanilhaAberto}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nova Planilha Contratual</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nome-planilha">Nome da Planilha</Label>
              <Input
                id="nome-planilha"
                value={nomePlanilha}
                onChange={(e) => setNomePlanilha(e.target.value)}
                placeholder="Ex: Planilha OrÃ§amentÃ¡ria Base, Aditivo 01..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="versao-planilha">VersÃ£o</Label>
              <Input
                id="versao-planilha"
                value={versaoPlanilha}
                onChange={(e) => setVersaoPlanilha(e.target.value)}
                placeholder="Ex: v1.0, v2.0..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogPlanilhaAberto(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCriarPlanilha} disabled={!nomePlanilha.trim()}>
              Criar Planilha
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function EstruturacaoContratoPage() {
  return (
    <Suspense fallback={null}>
      <EstruturacaoContratoContent />
    </Suspense>
  )
}
