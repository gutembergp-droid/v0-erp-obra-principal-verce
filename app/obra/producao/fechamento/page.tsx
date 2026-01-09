"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  AlertCircle,
  Lock,
  Unlock,
  FileCheck,
  Send,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardCheck,
} from "lucide-react"
import Link from "next/link"

// Dados do Fechamento
const fechamentoData = {
  periodo: "Janeiro/2024",
  status: "em_fechamento",
  dataInicio: "2024-01-01",
  dataFim: "2024-01-31",
  dataFechamento: null,
  indicadores: {
    avancoFisico: {
      previsto: 52.3,
      realizado: 48.5,
      desvio: -3.8,
      status: "atencao",
    },
    avancoFinanceiro: {
      previsto: 54.1,
      realizado: 51.2,
      desvio: -2.9,
      status: "atencao",
    },
    idp: {
      valor: 0.93,
      status: "atencao",
    },
    idc: {
      valor: 1.02,
      status: "ok",
    },
    spi: {
      valor: 0.91,
      status: "atencao",
    },
    cpi: {
      valor: 1.05,
      status: "ok",
    },
  },
  validacoes: [
    { id: "1", descricao: "Todas afericoes aprovadas", status: true },
    { id: "2", descricao: "Diarios de obra preenchidos", status: true },
    { id: "3", descricao: "Apropriacoes validadas", status: true },
    { id: "4", descricao: "Medicao de terceiros aprovada", status: false },
    { id: "5", descricao: "Revisao de custo realizada", status: true },
    { id: "6", descricao: "Aprovacao do engenheiro residente", status: false },
  ],
  distorcoes: [
    {
      id: "1",
      tipo: "atraso",
      item: "PBS-03.03 - Lajes",
      descricao: "Atraso na entrega de formas metalicas",
      impacto: "-5.0%",
      acao: "Reprogramacao para fevereiro",
    },
    {
      id: "2",
      tipo: "custo",
      item: "PBS-02.02 - Estacas",
      descricao: "Aumento no consumo de concreto",
      impacto: "+R$ 45.000",
      acao: "Analise de causa raiz em andamento",
    },
  ],
  historico: [
    { periodo: "Dezembro/2023", avancoFisico: 44.7, avancoFinanceiro: 46.8, idp: 0.95, idc: 1.01 },
    { periodo: "Novembro/2023", avancoFisico: 39.2, avancoFinanceiro: 40.5, idp: 0.94, idc: 1.02 },
    { periodo: "Outubro/2023", avancoFisico: 33.8, avancoFinanceiro: 34.2, idp: 0.96, idc: 1.03 },
  ],
}

export default function FechamentoPage() {
  const [activeTab, setActiveTab] = useState("resumo")
  const [periodoSelecionado, setPeriodoSelecionado] = useState("2024-01")
  const [observacoes, setObservacoes] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-600">OK</Badge>
      case "atencao":
        return <Badge className="bg-amber-500">Atencao</Badge>
      case "critico":
        return <Badge variant="destructive">Critico</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getIndicadorIcon = (valor: number, tipo: string) => {
    if (tipo === "indice") {
      if (valor >= 1) return <ArrowUpRight className="h-4 w-4 text-green-600" />
      return <ArrowDownRight className="h-4 w-4 text-red-600" />
    } else {
      if (valor >= 0) return <ArrowUpRight className="h-4 w-4 text-green-600" />
      return <ArrowDownRight className="h-4 w-4 text-red-600" />
    }
  }

  const validacoesCompletas = fechamentoData.validacoes.filter((v) => v.status).length
  const validacoesTotal = fechamentoData.validacoes.length
  const podeFechare = validacoesCompletas === validacoesTotal

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/obra/producao">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <ClipboardCheck className="h-5 w-5 text-amber-600" />
                  <h1 className="text-xl font-bold">Fechamento de Producao</h1>
                </div>
                <p className="text-sm text-muted-foreground">Obra: Torre Norte - Centro Empresarial</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-01">Janeiro/2024</SelectItem>
                  <SelectItem value="2023-12">Dezembro/2023</SelectItem>
                  <SelectItem value="2023-11">Novembro/2023</SelectItem>
                </SelectContent>
              </Select>
              <Badge
                variant={fechamentoData.status === "em_fechamento" ? "secondary" : "default"}
                className="px-3 py-1"
              >
                {fechamentoData.status === "em_fechamento" ? (
                  <>
                    <Unlock className="h-3 w-3 mr-1" />
                    Em Fechamento
                  </>
                ) : (
                  <>
                    <Lock className="h-3 w-3 mr-1" />
                    Fechado
                  </>
                )}
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700" disabled={!podeFechare}>
                    <Lock className="h-4 w-4 mr-2" />
                    Fechar Periodo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirmar Fechamento</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground">
                      Voce esta prestes a fechar o periodo <strong>{fechamentoData.periodo}</strong>. Apos o fechamento,
                      nao sera possivel alterar as informacoes de producao deste periodo.
                    </p>
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-sm font-medium text-amber-800">Atencao:</p>
                      <ul className="text-sm text-amber-700 list-disc list-inside mt-2">
                        <li>Todas as afericoes serao bloqueadas</li>
                        <li>Apropriacoes serao consolidadas</li>
                        <li>Indicadores serao congelados</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancelar</Button>
                    <Button className="bg-amber-600 hover:bg-amber-700">
                      <Lock className="h-4 w-4 mr-2" />
                      Confirmar Fechamento
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Cards de Indicadores */}
          <div className="grid grid-cols-6 gap-4 mb-6">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avanco Fisico</p>
                  {getStatusBadge(fechamentoData.indicadores.avancoFisico.status)}
                </div>
                <p className="text-2xl font-bold">{fechamentoData.indicadores.avancoFisico.realizado}%</p>
                <div className="flex items-center gap-1 mt-1 text-sm">
                  {getIndicadorIcon(fechamentoData.indicadores.avancoFisico.desvio, "desvio")}
                  <span
                    className={fechamentoData.indicadores.avancoFisico.desvio < 0 ? "text-red-600" : "text-green-600"}
                  >
                    {fechamentoData.indicadores.avancoFisico.desvio > 0 ? "+" : ""}
                    {fechamentoData.indicadores.avancoFisico.desvio}%
                  </span>
                  <span className="text-muted-foreground">vs previsto</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Avanco Financeiro</p>
                  {getStatusBadge(fechamentoData.indicadores.avancoFinanceiro.status)}
                </div>
                <p className="text-2xl font-bold">{fechamentoData.indicadores.avancoFinanceiro.realizado}%</p>
                <div className="flex items-center gap-1 mt-1 text-sm">
                  {getIndicadorIcon(fechamentoData.indicadores.avancoFinanceiro.desvio, "desvio")}
                  <span
                    className={
                      fechamentoData.indicadores.avancoFinanceiro.desvio < 0 ? "text-red-600" : "text-green-600"
                    }
                  >
                    {fechamentoData.indicadores.avancoFinanceiro.desvio > 0 ? "+" : ""}
                    {fechamentoData.indicadores.avancoFinanceiro.desvio}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">IDP</p>
                  {getStatusBadge(fechamentoData.indicadores.idp.status)}
                </div>
                <p className="text-2xl font-bold">{fechamentoData.indicadores.idp.valor.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Indice Desempenho Prazo</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">IDC</p>
                  {getStatusBadge(fechamentoData.indicadores.idc.status)}
                </div>
                <p className="text-2xl font-bold">{fechamentoData.indicadores.idc.valor.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Indice Desempenho Custo</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">SPI</p>
                  {getStatusBadge(fechamentoData.indicadores.spi.status)}
                </div>
                <p className="text-2xl font-bold">{fechamentoData.indicadores.spi.valor.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Schedule Performance</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">CPI</p>
                  {getStatusBadge(fechamentoData.indicadores.cpi.status)}
                </div>
                <p className="text-2xl font-bold">{fechamentoData.indicadores.cpi.valor.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground mt-1">Cost Performance</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
              <TabsTrigger value="validacoes">Validacoes</TabsTrigger>
              <TabsTrigger value="distorcoes">Distorcoes</TabsTrigger>
              <TabsTrigger value="historico">Historico</TabsTrigger>
            </TabsList>

            <TabsContent value="resumo" className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Validacoes Resumo */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileCheck className="h-4 w-4" />
                        Checklist de Validacoes
                      </CardTitle>
                      <Badge variant="outline">
                        {validacoesCompletas}/{validacoesTotal}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={(validacoesCompletas / validacoesTotal) * 100} className="mb-4" />
                    <div className="space-y-3">
                      {fechamentoData.validacoes.map((item) => (
                        <div key={item.id} className="flex items-center gap-3">
                          <Checkbox checked={item.status} disabled />
                          <span className={`text-sm ${item.status ? "text-muted-foreground" : "font-medium"}`}>
                            {item.descricao}
                          </span>
                          {item.status ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 ml-auto" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-amber-500 ml-auto" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Distorcoes Resumo */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Distorcoes Identificadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {fechamentoData.distorcoes.length > 0 ? (
                      <div className="space-y-4">
                        {fechamentoData.distorcoes.map((item) => (
                          <div key={item.id} className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant={item.tipo === "atraso" ? "destructive" : "secondary"}>
                                {item.tipo === "atraso" ? "Atraso" : "Custo"}
                              </Badge>
                              <span className="text-sm font-medium">{item.impacto}</span>
                            </div>
                            <p className="text-sm font-medium">{item.item}</p>
                            <p className="text-sm text-muted-foreground">{item.descricao}</p>
                            <p className="text-xs text-blue-600 mt-2">Acao: {item.acao}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">Nenhuma distorcao identificada</p>
                    )}
                  </CardContent>
                </Card>

                {/* Observacoes */}
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle className="text-base">Observacoes do Fechamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Registre observacoes sobre o fechamento do periodo..."
                      value={observacoes}
                      onChange={(e) => setObservacoes(e.target.value)}
                      rows={4}
                    />
                    <div className="flex justify-end mt-4">
                      <Button variant="outline">
                        <Send className="h-4 w-4 mr-2" />
                        Salvar Observacoes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="validacoes">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Validacoes Obrigatorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {fechamentoData.validacoes.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${
                          item.status ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox checked={item.status} />
                          <span className="font-medium">{item.descricao}</span>
                        </div>
                        {item.status ? (
                          <Badge className="bg-green-600">Concluido</Badge>
                        ) : (
                          <Badge className="bg-amber-500">Pendente</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="distorcoes">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    Detalhamento de distorcoes em desenvolvimento
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="historico">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Historico de Fechamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 p-3 bg-muted/50 font-medium text-sm">
                      <div>Periodo</div>
                      <div className="text-center">Avanco Fisico</div>
                      <div className="text-center">Avanco Financeiro</div>
                      <div className="text-center">IDP</div>
                      <div className="text-center">IDC</div>
                    </div>
                    {fechamentoData.historico.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-5 gap-4 p-3 border-t text-sm">
                        <div className="font-medium">{item.periodo}</div>
                        <div className="text-center">{item.avancoFisico}%</div>
                        <div className="text-center">{item.avancoFinanceiro}%</div>
                        <div className="text-center">
                          <Badge
                            variant={item.idp >= 1 ? "default" : "secondary"}
                            className={item.idp >= 1 ? "bg-green-600" : "bg-amber-500"}
                          >
                            {item.idp.toFixed(2)}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <Badge
                            variant={item.idc >= 1 ? "default" : "secondary"}
                            className={item.idc >= 1 ? "bg-green-600" : "bg-amber-500"}
                          >
                            {item.idc.toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
