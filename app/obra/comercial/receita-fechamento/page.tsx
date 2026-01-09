"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Send,
  Lock,
  Calendar,
  ClipboardCheck,
  MessageSquare,
} from "lucide-react"

// Dados mockados
const resumoFechamento = {
  competencia: "Janeiro/2026",
  dataCorte: "31/01/2026",
  dataFechamento: "05/02/2026",
  status: "em_fechamento",
}

const medicaoProducao = {
  servicosExecutados: 846,
  valorExecutado: 4250000,
  avancoFisico: 67.8,
  metaFisica: 70.0,
  variacao: -2.2,
}

const medicaoCliente = {
  servicosAprovados: 789,
  valorAprovado: 3825000,
  avancoFinanceiro: 62.3,
  metaFinanceira: 65.0,
  variacao: -2.7,
}

const comparativo = {
  diferencaServicos: 57,
  diferencaValor: 425000,
  impactoPercentual: 10.0,
  status: "divergente",
}

const validacoes = [
  { id: 1, item: "Medicao de Producao fechada", status: "ok", responsavel: "Producao", data: "02/02/2026" },
  { id: 2, item: "Medicao do Cliente aprovada", status: "ok", responsavel: "Comercial", data: "03/02/2026" },
  { id: 3, item: "Divergencias analisadas", status: "pendente", responsavel: "Custo/Meta", data: null },
  { id: 4, item: "Faturamento emitido", status: "ok", responsavel: "Financeiro", data: "04/02/2026" },
  { id: 5, item: "Indicadores atualizados", status: "pendente", responsavel: "Comercial", data: null },
  { id: 6, item: "Reuniao de fechamento realizada", status: "pendente", responsavel: "Gerente", data: null },
]

const indicadoresPerformance = [
  { nome: "IDP (Indice de Desempenho de Prazo)", valor: 0.97, meta: 1.0, status: "atencao" },
  { nome: "IDC (Indice de Desempenho de Custo)", valor: 1.03, meta: 1.0, status: "ok" },
  { nome: "F/CD (Faturamento/Custo Direto)", valor: 1.15, meta: 1.1, status: "ok" },
  { nome: "Taxa de Conversao (MP→MC)", valor: 0.9, meta: 0.95, status: "atencao" },
]

const distorcoes = [
  {
    id: 1,
    tipo: "Servico nao remunerado",
    descricao: "Escavacao adicional Km 8-10",
    valorMP: 180000,
    valorMC: 0,
    diferenca: 180000,
    justificativa: "",
    status: "pendente",
  },
  {
    id: 2,
    tipo: "Quantidade divergente",
    descricao: "CBUQ - Diferenca de medicao",
    valorMP: 245000,
    valorMC: 220000,
    diferenca: 25000,
    justificativa: "Ajuste de espessura solicitado pelo cliente",
    status: "justificado",
  },
  {
    id: 3,
    tipo: "Servico glosado",
    descricao: "Base granular - Area contestada",
    valorMP: 128000,
    valorMC: 76000,
    diferenca: 52000,
    justificativa: "",
    status: "em_analise",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value)
}

export default function ReceitaFechamentoPage() {
  const [competencia, setCompetencia] = useState("jan-2026")
  const [observacoes, setObservacoes] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return (
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Concluido
          </Badge>
        )
      case "pendente":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "erro":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Erro
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDistorcaoStatus = (status: string) => {
    switch (status) {
      case "justificado":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Justificado</Badge>
      case "pendente":
        return <Badge variant="destructive">Pendente</Badge>
      case "em_analise":
        return <Badge className="bg-accent text-accent-foreground">Em Analise</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const validacoesConcluidas = validacoes.filter((v) => v.status === "ok").length
  const totalValidacoes = validacoes.length
  const percentualConcluido = (validacoesConcluidas / totalValidacoes) * 100

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 border border-primary/20">
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Fechamento de Receita/Medicao</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  RM-05
                </Badge>
                <InfoTooltip content="Consolidacao do ciclo de medicao e receita para fechamento economico" />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Consolidacao do periodo para fechamento economico</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={competencia} onValueChange={setCompetencia}>
              <SelectTrigger className="w-40 bg-transparent">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jan-2026">Janeiro/2026</SelectItem>
                <SelectItem value="dez-2025">Dezembro/2025</SelectItem>
                <SelectItem value="nov-2025">Novembro/2025</SelectItem>
              </SelectContent>
            </Select>
            <Badge className="bg-accent text-accent-foreground">Em Fechamento</Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Resumo Comparativo MP x MC */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Resumo Comparativo
              </h2>
              <InfoTooltip content="Comparativo entre Medicao de Producao (MP) e Medicao do Cliente (MC)" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Medicao Producao */}
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-primary" />
                    Medicao de Producao (MP)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Servicos Executados</span>
                    <span className="font-mono font-semibold">{medicaoProducao.servicosExecutados}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Valor Executado</span>
                    <span className="font-mono font-semibold text-primary">
                      {formatCurrency(medicaoProducao.valorExecutado)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Avanco Fisico</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">{medicaoProducao.avancoFisico}%</span>
                      {medicaoProducao.variacao < 0 ? (
                        <Badge variant="destructive" className="text-[10px]">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {medicaoProducao.variacao}%
                        </Badge>
                      ) : (
                        <Badge className="bg-primary/10 text-primary text-[10px]">
                          <TrendingUp className="w-3 h-3 mr-1" />+{medicaoProducao.variacao}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${medicaoProducao.avancoFisico}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Medicao Cliente */}
              <Card className="border-border/50">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Medicao do Cliente (MC)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Servicos Aprovados</span>
                    <span className="font-mono font-semibold">{medicaoCliente.servicosAprovados}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Valor Aprovado</span>
                    <span className="font-mono font-semibold text-primary">
                      {formatCurrency(medicaoCliente.valorAprovado)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Avanco Financeiro</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold">{medicaoCliente.avancoFinanceiro}%</span>
                      {medicaoCliente.variacao < 0 ? (
                        <Badge variant="destructive" className="text-[10px]">
                          <TrendingDown className="w-3 h-3 mr-1" />
                          {medicaoCliente.variacao}%
                        </Badge>
                      ) : (
                        <Badge className="bg-primary/10 text-primary text-[10px]">
                          <TrendingUp className="w-3 h-3 mr-1" />+{medicaoCliente.variacao}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${medicaoCliente.avancoFinanceiro}%` }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Diferenca */}
              <Card className={`border-accent/30 ${comparativo.status === "divergente" ? "bg-accent/5" : ""}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-accent-foreground" />
                    Diferenca (MP - MC)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Servicos Nao Remunerados</span>
                    <span className="font-mono font-semibold text-accent-foreground">
                      {comparativo.diferencaServicos}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Valor Nao Remunerado</span>
                    <span className="font-mono font-semibold text-accent-foreground">
                      {formatCurrency(comparativo.diferencaValor)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Impacto no Desempenho</span>
                    <Badge variant="destructive">{comparativo.impactoPercentual}%</Badge>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="text-[10px] text-accent-foreground italic">
                      Divergencia requer analise e justificativa antes do fechamento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Distorcoes */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Distorcoes Identificadas
                </h2>
                <Badge variant="outline" className="text-[10px]">
                  {distorcoes.filter((d) => d.status === "pendente").length} pendentes
                </Badge>
              </div>
            </div>

            <Card className="border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descricao</TableHead>
                    <TableHead className="text-right">Valor MP</TableHead>
                    <TableHead className="text-right">Valor MC</TableHead>
                    <TableHead className="text-right">Diferenca</TableHead>
                    <TableHead>Justificativa</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {distorcoes.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/20">
                      <TableCell>
                        <Badge variant="outline" className="text-[10px]">
                          {item.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{item.descricao}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.valorMP)}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.valorMC)}</TableCell>
                      <TableCell className="text-right font-mono text-sm font-semibold text-accent-foreground">
                        {formatCurrency(item.diferenca)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                        {item.justificativa || "-"}
                      </TableCell>
                      <TableCell className="text-center">{getDistorcaoStatus(item.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          {/* Indicadores de Performance */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Indicadores de Performance
              </h2>
              <InfoTooltip content="Indicadores calculados com base nas medicoes do periodo" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {indicadoresPerformance.map((ind) => (
                <Card key={ind.nome} className="border-border/50">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">{ind.nome}</p>
                    <div className="flex items-end justify-between">
                      <span
                        className={`text-2xl font-bold tabular-nums ${ind.status === "ok" ? "text-primary" : "text-accent-foreground"}`}
                      >
                        {ind.valor.toFixed(2)}
                      </span>
                      <div className="text-right">
                        <span className="text-[10px] text-muted-foreground">Meta: {ind.meta.toFixed(2)}</span>
                        {ind.status === "ok" ? (
                          <div className="flex items-center text-primary text-[10px]">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Dentro da meta
                          </div>
                        ) : (
                          <div className="flex items-center text-accent-foreground text-[10px]">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Abaixo da meta
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Checklist de Validacoes */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Checklist de Fechamento
                </h2>
                <Badge variant="outline" className="text-[10px]">
                  {validacoesConcluidas}/{totalValidacoes} concluidos
                </Badge>
              </div>
              <div className="w-32 h-2 bg-muted rounded-full">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${percentualConcluido}%` }} />
              </div>
            </div>

            <Card className="border-border/50">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Item de Validacao</TableHead>
                    <TableHead>Responsavel</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validacoes.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/20">
                      <TableCell>
                        <Checkbox checked={item.status === "ok"} disabled />
                      </TableCell>
                      <TableCell className="text-sm font-medium">{item.item}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.responsavel}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{item.data || "-"}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </section>

          {/* Observacoes da Reuniao */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Observacoes da Reuniao de Fechamento
              </h2>
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
            </div>

            <Card className="border-border/50">
              <CardContent className="p-4">
                <Textarea
                  placeholder="Registre aqui as observacoes, decisoes e pontos discutidos na reuniao de fechamento..."
                  className="min-h-[100px] bg-transparent"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                />
              </CardContent>
            </Card>
          </section>

          {/* Acoes */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Ultimo salvamento: 05/02/2026 14:32</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Exportar Relatorio
              </Button>
              <Button variant="outline" className="bg-transparent">
                <Send className="w-4 h-4 mr-2" />
                Enviar para Aprovacao
              </Button>
              <Button disabled={validacoesConcluidas < totalValidacoes}>
                <Lock className="w-4 h-4 mr-2" />
                Fechar Periodo
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
