"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Send,
  Shield,
  Info,
  FileSignature,
  Ruler,
  Calculator,
  Package,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados - Planilha de Medição
const planilhaMedicao = [
  {
    codigo: "MED-001",
    descricao: "Mobilização e instalação de canteiro",
    unidade: "VB",
    qtdContratual: 1,
    peso: 5.0,
    criterio: "Conclusão total",
    documento: "Termo de aceite",
    status: "definido",
  },
  {
    codigo: "MED-002",
    descricao: "Terraplenagem - corte",
    unidade: "M³",
    qtdContratual: 125000,
    peso: 15.0,
    criterio: "Volume executado",
    documento: "Boletim de medição",
    status: "definido",
  },
  {
    codigo: "MED-003",
    descricao: "Terraplenagem - aterro",
    unidade: "M³",
    qtdContratual: 98000,
    peso: 12.0,
    criterio: "Volume compactado",
    documento: "Boletim de medição",
    status: "definido",
  },
  {
    codigo: "MED-004",
    descricao: "Sub-base granular",
    unidade: "M³",
    qtdContratual: 45000,
    peso: 10.0,
    criterio: "Volume executado",
    documento: "Laudo de compactação",
    status: "definido",
  },
  {
    codigo: "MED-005",
    descricao: "Base de brita graduada",
    unidade: "M³",
    qtdContratual: 38000,
    peso: 12.0,
    criterio: "Volume executado",
    documento: "Laudo de compactação",
    status: "definido",
  },
  {
    codigo: "MED-006",
    descricao: "Imprimação",
    unidade: "M²",
    qtdContratual: 320000,
    peso: 3.0,
    criterio: "Área executada",
    documento: "Relatório fotográfico",
    status: "definido",
  },
  {
    codigo: "MED-007",
    descricao: "Pintura de ligação",
    unidade: "M²",
    qtdContratual: 320000,
    peso: 2.0,
    criterio: "Área executada",
    documento: "Relatório fotográfico",
    status: "definido",
  },
  {
    codigo: "MED-008",
    descricao: "CBUQ - Binder",
    unidade: "TON",
    qtdContratual: 42000,
    peso: 12.0,
    criterio: "Tonelagem aplicada",
    documento: "Nota fiscal + ticket",
    status: "definido",
  },
  {
    codigo: "MED-009",
    descricao: "CBUQ - Capa de rolamento",
    unidade: "TON",
    qtdContratual: 28000,
    peso: 15.0,
    criterio: "Tonelagem aplicada",
    documento: "Nota fiscal + ticket",
    status: "pendente",
  },
  {
    codigo: "MED-010",
    descricao: "Sinalização horizontal",
    unidade: "M²",
    qtdContratual: 18500,
    peso: 4.0,
    criterio: "Área executada",
    documento: "Relatório de medição",
    status: "pendente",
  },
  {
    codigo: "MED-011",
    descricao: "Sinalização vertical",
    unidade: "UN",
    qtdContratual: 245,
    peso: 3.0,
    criterio: "Unidade instalada",
    documento: "Relatório fotográfico",
    status: "pendente",
  },
  {
    codigo: "MED-012",
    descricao: "Desmobilização",
    unidade: "VB",
    qtdContratual: 1,
    peso: 2.0,
    criterio: "Conclusão total",
    documento: "Termo de aceite",
    status: "pendente",
  },
]

// Vínculo com contrato
const vinculoContrato = {
  numeroContrato: "CT-2024-0892",
  itensVinculados: 10,
  itensSemVinculo: 2,
  itensContrato: 12,
}

// Regras de medição
const regrasMedicao = [
  { regra: "Periodicidade", valor: "Mensal (até dia 25)", observacao: "Corte no dia 25 de cada mês" },
  { regra: "Forma de consolidação", valor: "Acumulativa", observacao: "Medição atual = acumulado - medido anterior" },
  { regra: "Arredondamento", valor: "2 casas decimais", observacao: "Truncamento para baixo" },
  { regra: "Regra de aceite", valor: "Fiscalização em campo", observacao: "Obrigatório visto do fiscal" },
  { regra: "Limite de avanço", valor: "Máximo 100% por item", observacao: "Não permite medição acima do contratado" },
  { regra: "Tolerância de desvio", valor: "± 5%", observacao: "Acima disso requer justificativa" },
]

// Validações
const validacoes = [
  { item: "Soma de pesos = 100%", status: true, valor: "95% (faltam 5%)" },
  { item: "Todos os itens vinculados ao contrato", status: false, valor: "2 itens sem vínculo" },
  { item: "Critérios de avanço definidos", status: true, valor: "12/12 definidos" },
  { item: "Documentos comprobatórios definidos", status: true, valor: "12/12 definidos" },
  { item: "Unidades de medida validadas", status: true, valor: "Todas compatíveis" },
]

function EstruturacaoMedicaoContent() {
  const router = useRouter()
  const pathname = usePathname()

  const somaPesos = planilhaMedicao.reduce((acc, item) => acc + item.peso, 0)
  const prontoParaExecucao = somaPesos === 100 && vinculoContrato.itensSemVinculo === 0

  const navegacaoSetor = [
    { codigo: "EST-00", nome: "Visao Geral", rota: "/obra/comercial/estruturacao-geral", icon: FileText },
    { codigo: "EST-01", nome: "Contrato", rota: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
    { codigo: "EST-02", nome: "Medicao", rota: "/obra/comercial/estruturacao-medicao", icon: Ruler },
    { codigo: "EST-03", nome: "Custo", rota: "/obra/comercial/estruturacao-custo", icon: Calculator },
    { codigo: "EST-04", nome: "Suprimentos", rota: "/obra/comercial/estruturacao-suprimentos", icon: Package },
    { codigo: "EST-05", nome: "Indireto", rota: "/obra/comercial/estruturacao-indireto", icon: Building2 },
  ]

  return (
    <div className="h-full flex flex-col bg-background overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra/comercial/estruturacao-geral">
              <Button variant="ghost" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Estruturacao da Medicao</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-02
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-[10px] bg-accent-foreground/10 text-accent-foreground border-accent-foreground/20"
                >
                  Em Estruturacao
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Planilha de medicao e criterios de avanco</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs bg-transparent">
              <Send className="h-3.5 w-3.5" />
              Enviar para Revisao
            </Button>
            <Button size="sm" className="gap-1.5 text-xs" disabled={!prontoParaExecucao}>
              <Shield className="h-3.5 w-3.5" />
              Homologar Planilha
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
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

          {/* BLOCO 1 - Planilha de Medição */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Planilha de Medição</h2>
                <span className="text-[10px] text-muted-foreground">(Núcleo da Estruturação)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  Soma dos pesos:{" "}
                  <span className={somaPesos === 100 ? "text-emerald-600 font-medium" : "text-amber-600 font-medium"}>
                    {somaPesos.toFixed(1)}%
                  </span>
                </span>
                <Badge
                  variant={somaPesos === 100 ? "default" : "secondary"}
                  className={`text-[10px] ${somaPesos === 100 ? "bg-emerald-500" : "bg-amber-500"}`}
                >
                  {somaPesos === 100 ? "Balanceado" : `Faltam ${(100 - somaPesos).toFixed(1)}%`}
                </Badge>
              </div>
            </div>
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Código
                    </th>
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Descrição do Item
                    </th>
                    <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Unid.
                    </th>
                    <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Qtd. Contratual
                    </th>
                    <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Peso (%)
                    </th>
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Critério de Avanço
                    </th>
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Doc. Comprobatório
                    </th>
                    <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {planilhaMedicao.map((item, index) => (
                    <tr
                      key={item.codigo}
                      className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                    >
                      <td className="py-2.5 px-3 font-mono text-[11px]">{item.codigo}</td>
                      <td className="py-2.5 px-3 text-foreground">{item.descricao}</td>
                      <td className="py-2.5 px-3 text-center font-mono text-muted-foreground">{item.unidade}</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                        {item.qtdContratual.toLocaleString("pt-BR")}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-medium">
                        {item.peso.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">{item.criterio}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{item.documento}</td>
                      <td className="py-2.5 px-3 text-center">
                        {item.status === "definido" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-muted/50 border-t border-border">
                    <td
                      colSpan={4}
                      className="py-2.5 px-3 text-right font-medium text-muted-foreground uppercase text-[10px]"
                    >
                      Total
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">
                      {somaPesos.toFixed(1)}%
                    </td>
                    <td colSpan={3}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Grid 3 colunas */}
          <div className="grid grid-cols-12 gap-6">
            {/* BLOCO 2 - Vínculo com o Contrato */}
            <div className="col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <FileSignature className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Vínculo com o Contrato
                </h2>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-3 text-muted-foreground">Contrato de Referência</td>
                      <td className="py-2.5 px-3 text-right font-mono font-medium">{vinculoContrato.numeroContrato}</td>
                    </tr>
                    <tr className="border-b border-border/50 bg-muted/20">
                      <td className="py-2.5 px-3 text-muted-foreground">Itens no Contrato</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums">{vinculoContrato.itensContrato}</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2.5 px-3 text-muted-foreground">Itens Vinculados</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className="font-mono tabular-nums text-emerald-600 font-medium">
                          {vinculoContrato.itensVinculados}
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-muted/20">
                      <td className="py-2.5 px-3 text-muted-foreground">Itens sem Vínculo</td>
                      <td className="py-2.5 px-3 text-right">
                        {vinculoContrato.itensSemVinculo > 0 ? (
                          <span className="font-mono tabular-nums text-red-600 font-medium">
                            {vinculoContrato.itensSemVinculo}
                          </span>
                        ) : (
                          <span className="font-mono tabular-nums text-emerald-600 font-medium">0</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {vinculoContrato.itensSemVinculo > 0 && (
                <div className="mt-2 flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-[11px] text-red-600">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                  <span>
                    {vinculoContrato.itensSemVinculo} itens não possuem vínculo com o contrato. Verifique antes de
                    homologar.
                  </span>
                </div>
              )}
            </div>

            {/* BLOCO 3 - Regras de Medição */}
            <div className="col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Regras de Medição</h2>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Regra
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Definição
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {regrasMedicao.map((regra, index) => (
                      <tr
                        key={regra.regra}
                        className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2 px-3 text-muted-foreground">{regra.regra}</td>
                        <td className="py-2 px-3 font-medium">{regra.valor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BLOCO 4 - Validações */}
            <div className="col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Validações</h2>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    {validacoes.map((val, index) => (
                      <tr
                        key={val.item}
                        className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2 px-3 w-6">
                          {val.status ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </td>
                        <td className="py-2 px-3 text-muted-foreground">{val.item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Indicador de prontidão */}
              <div
                className={`mt-3 p-3 rounded border ${prontoParaExecucao ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Medição pronta para execução?</span>
                  <Badge
                    variant={prontoParaExecucao ? "default" : "secondary"}
                    className={`text-[10px] ${prontoParaExecucao ? "bg-emerald-500" : "bg-amber-500"}`}
                  >
                    {prontoParaExecucao ? "SIM" : "NÃO"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso de governança */}
          <div className="flex items-start gap-3 p-4 bg-muted/30 border border-border rounded-md">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Governança de Alterações</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Após homologação da planilha de medição, qualquer alteração deverá seguir o fluxo de governança (SME -
                Solicitação de Mudança de Escopo ou Aditivo Contratual). A medição homologada é a base oficial para
                avanço físico, financeiro e faturamento.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default function EstruturacaoMedicaoPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <EstruturacaoMedicaoContent />
      </Suspense>
    </div>
  )
}
