"use client"

import { Suspense, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
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
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados
const dadosContrato = {
  cliente: "Departamento Nacional de Infraestrutura de Transportes - DNIT",
  numeroContrato: "CT-2024/0892",
  objeto: "Execução das obras de duplicação da BR-101/SC, trecho Florianópolis - Palhoça, com extensão de 18,5 km",
  valorContratual: 405000000,
  dataInicio: "2024-03-15",
  dataTermino: "2027-03-14",
  prazoContratual: 36,
  tipoContrato: "Preço Global",
}

const escoposContratuais = [
  {
    codigo: "ESC-001",
    descricao: "Terraplenagem",
    unidade: "m³",
    qtdContratual: 850000,
    valorUnit: 45.0,
    status: "ativo",
  },
  {
    codigo: "ESC-002",
    descricao: "Pavimentação asfáltica",
    unidade: "m²",
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
    descricao: "Sinalização horizontal",
    unidade: "m²",
    qtdContratual: 45000,
    valorUnit: 85.0,
    status: "ativo",
  },
  {
    codigo: "ESC-006",
    descricao: "Sinalização vertical",
    unidade: "un",
    qtdContratual: 380,
    valorUnit: 1200.0,
    status: "ativo",
  },
  {
    codigo: "ESC-007",
    descricao: "Defensas metálicas",
    unidade: "m",
    qtdContratual: 12000,
    valorUnit: 380.0,
    status: "ativo",
  },
  {
    codigo: "ESC-008",
    descricao: "Iluminação pública",
    unidade: "un",
    qtdContratual: 450,
    valorUnit: 8500.0,
    status: "pendente",
  },
]

const criteriosMedicao = [
  {
    item: "ESC-001",
    criterio: "Levantamento topográfico + Notas de serviço",
    unidade: "m³",
    regraAceite: "Tolerância ±2%",
    documento: "Boletim de Medição + RDO",
    periodicidade: "Mensal",
  },
  {
    item: "ESC-002",
    criterio: "Área executada conforme projeto",
    unidade: "m²",
    regraAceite: "Tolerância ±1%",
    documento: "Boletim de Medição + Ensaios",
    periodicidade: "Mensal",
  },
  {
    item: "ESC-003",
    criterio: "Extensão linear executada",
    unidade: "m",
    regraAceite: "100% conforme projeto",
    documento: "Boletim de Medição + Fotos",
    periodicidade: "Mensal",
  },
  {
    item: "ESC-004",
    criterio: "Etapas concluídas por OAE",
    unidade: "un",
    regraAceite: "Laudo estrutural aprovado",
    documento: "ART + Laudo Técnico",
    periodicidade: "Por etapa",
  },
  {
    item: "ESC-005",
    criterio: "Área demarcada e aprovada",
    unidade: "m²",
    regraAceite: "Conforme norma DNIT",
    documento: "Boletim + Fotos georreferenciadas",
    periodicidade: "Mensal",
  },
]

const regrasFaturamento = [
  { item: "ISS", descricao: "Imposto sobre Serviços", valor: "5,00%", observacao: "Retenção na fonte" },
  { item: "INSS", descricao: "Contribuição Previdenciária", valor: "11,00%", observacao: "Retenção na fonte" },
  { item: "IR", descricao: "Imposto de Renda", valor: "1,50%", observacao: "Retenção na fonte" },
  { item: "PIS/COFINS/CSLL", descricao: "Contribuições Federais", valor: "4,65%", observacao: "Retenção na fonte" },
  { item: "Pagamento", descricao: "Condição de pagamento", valor: "30 dias", observacao: "Após aprovação da medição" },
  { item: "Reajuste", descricao: "Índice de reajuste", valor: "IPCA", observacao: "Anual, na data-base" },
]

const documentosContratuais = [
  { tipo: "Contrato Principal", numero: "CT-2024/0892", data: "2024-02-28", status: "vigente" },
  { tipo: "Termo Aditivo 01", numero: "TA-001/2024", data: "2024-06-15", status: "vigente" },
  { tipo: "Anexo I - Projeto Executivo", numero: "PE-2024/0892", data: "2024-02-28", status: "vigente" },
  { tipo: "Anexo II - Cronograma Físico-Financeiro", numero: "CFF-2024/0892", data: "2024-02-28", status: "vigente" },
  { tipo: "Anexo III - BDI Detalhado", numero: "BDI-2024/0892", data: "2024-02-28", status: "vigente" },
]

function EstruturacaoContratoContent() {
  const [status] = useState<"nao_iniciado" | "em_estruturacao" | "revisado" | "homologado">("em_estruturacao")
  const router = useRouter()
  const pathname = usePathname()

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
            Não Iniciado
          </Badge>
        )
      case "em_estruturacao":
        return (
          <Badge className="bg-accent-foreground/10 text-accent-foreground border-accent-foreground/30">
            Em Estruturação
          </Badge>
        )
      case "revisado":
        return <Badge className="bg-primary/10 text-primary border-primary/30">Revisado</Badge>
      case "homologado":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Homologado</Badge>
    }
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
                <h1 className="text-xl font-semibold text-foreground">Estruturação do Contrato</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-01
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">Regras contratuais e critérios operacionais</p>
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
                    <td className="px-4 py-3 text-muted-foreground font-medium bg-muted/20">Número do Contrato</td>
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
                    <td className="px-4 py-3 text-muted-foreground font-medium bg-muted/20">Período</td>
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

          {/* BLOCO 2 - Estrutura Contratual / Escopos */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                2. Estrutura Contratual / Escopos
              </h2>
            </div>
            <div className="border border-border/60 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 border-b border-border/60">
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Código
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Descrição
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Unidade
                    </th>
                    <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Qtd. Contratual
                    </th>
                    <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Valor Unit.
                    </th>
                    <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Valor Total
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  {escoposContratuais.map((escopo) => (
                    <tr key={escopo.codigo} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs text-foreground">{escopo.codigo}</td>
                      <td className="px-4 py-3 text-foreground">{escopo.descricao}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{escopo.unidade}</td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground">
                        {escopo.qtdContratual.toLocaleString("pt-BR")}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums text-foreground">
                        {formatCurrency(escopo.valorUnit)}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums font-medium text-foreground">
                        {formatCurrency(escopo.qtdContratual * escopo.valorUnit)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge
                          variant="outline"
                          className={
                            escopo.status === "ativo"
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 text-[10px]"
                              : "bg-amber-500/10 text-amber-600 border-amber-500/30 text-[10px]"
                          }
                        >
                          {escopo.status === "ativo" ? "Ativo" : "Pendente"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/40 border-t border-border/60">
                    <td
                      colSpan={5}
                      className="px-4 py-3 text-right text-xs font-semibold uppercase text-muted-foreground"
                    >
                      Total Contratual
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums font-bold text-foreground">
                      {formatCurrency(escoposContratuais.reduce((acc, e) => acc + e.qtdContratual * e.valorUnit, 0))}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2 italic">
              Esta estrutura será a base da planilha de medição do cliente.
            </p>
          </section>

          {/* BLOCO 3 - Critérios de Medição do Cliente */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                3. Critérios de Medição do Cliente
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
                      Critério de Medição
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Unidade
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Regra de Aceite
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Documento Comprobatório
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
                      Descrição
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Valor/Percentual
                    </th>
                    <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Observação
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
                      Número
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Data
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Ações
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

          {/* BLOCO FINAL - Status e Governança */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-primary rounded-full" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-foreground">6. Status e Governança</h2>
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
                        Contrato pronto para medição?
                      </p>
                      <p
                        className={`text-lg font-semibold ${prontoParaMedicao ? "text-emerald-600" : "text-amber-600"}`}
                      >
                        {prontoParaMedicao ? "Sim - Estrutura Homologada" : "Não - Pendente de Homologação"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Send className="h-4 w-4" />
                    Enviar para Revisão
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
