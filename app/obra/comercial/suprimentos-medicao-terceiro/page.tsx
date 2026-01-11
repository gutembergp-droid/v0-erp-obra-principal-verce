"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  CheckCircle2,
  Clock,
  X,
  Search,
  Plus,
  AlertTriangle,
  DollarSign,
  Calendar,
  User,
  Upload,
  Truck,
  BarChart3,
  Ban,
  Send,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados mockados - Medicao de Terceiros
const medicoesTerceiroMock = [
  {
    id: "MT-2025-0015",
    contrato: "CT-TERRAP-001",
    fornecedor: "Terraplenagem Silva Ltda",
    cnpj: "12.345.678/0001-90",
    servico: "Escavacao e transporte de material",
    competencia: "Janeiro/2025",
    valorMedido: 450000,
    valorRetido: 22500,
    valorLiquido: 427500,
    status: "pendente_validacao",
    dataEnvio: "2025-01-08",
    documentos: {
      memorialCalculo: true,
      docsFuncionarios: true,
      relatorioTecnico: true,
      inspecaoQualidade: false,
      projeto: true,
    },
    validacoes: {
      quantitativos: false,
      suprimentos: false,
      custoMeta: false,
      gerenteContrato: false,
    },
    solicitante: "Producao",
  },
  {
    id: "MT-2025-0014",
    contrato: "CT-CONC-002",
    fornecedor: "Concreteira Norte",
    cnpj: "98.765.432/0001-10",
    servico: "Fornecimento de concreto usinado",
    competencia: "Janeiro/2025",
    valorMedido: 280000,
    valorRetido: 14000,
    valorLiquido: 266000,
    status: "em_validacao",
    dataEnvio: "2025-01-06",
    documentos: {
      memorialCalculo: true,
      docsFuncionarios: true,
      relatorioTecnico: true,
      inspecaoQualidade: true,
      projeto: true,
    },
    validacoes: {
      quantitativos: true,
      suprimentos: true,
      custoMeta: false,
      gerenteContrato: false,
    },
    solicitante: "Engenharia",
  },
  {
    id: "MT-2025-0013",
    contrato: "CT-ARM-003",
    fornecedor: "Armacao Estrutural ME",
    cnpj: "45.678.901/0001-23",
    servico: "Armacao de aco para estruturas",
    competencia: "Janeiro/2025",
    valorMedido: 185000,
    valorRetido: 9250,
    valorLiquido: 175750,
    status: "aprovada",
    dataEnvio: "2025-01-03",
    documentos: {
      memorialCalculo: true,
      docsFuncionarios: true,
      relatorioTecnico: true,
      inspecaoQualidade: true,
      projeto: true,
    },
    validacoes: {
      quantitativos: true,
      suprimentos: true,
      custoMeta: true,
      gerenteContrato: true,
    },
    solicitante: "Producao",
  },
  {
    id: "MT-2025-0012",
    contrato: "CT-TOP-004",
    fornecedor: "GeoTech Topografia",
    cnpj: "78.901.234/0001-56",
    servico: "Servicos de topografia",
    competencia: "Janeiro/2025",
    valorMedido: 45000,
    valorRetido: 0,
    valorLiquido: 45000,
    status: "liberada_pagamento",
    dataEnvio: "2025-01-02",
    documentos: {
      memorialCalculo: true,
      docsFuncionarios: true,
      relatorioTecnico: true,
      inspecaoQualidade: true,
      projeto: true,
    },
    validacoes: {
      quantitativos: true,
      suprimentos: true,
      custoMeta: true,
      gerenteContrato: true,
    },
    solicitante: "Planejamento",
    dataLiberacao: "2025-01-07",
  },
]

export default function SuprimentosMedicaoTerceiroPage() {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [medicaoSelecionada, setMedicaoSelecionada] = useState<(typeof medicoesTerceiroMock)[0] | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente_validacao":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pendente Validacao
          </Badge>
        )
      case "em_validacao":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Em Validacao
          </Badge>
        )
      case "aprovada":
        return (
          <Badge className="bg-primary/10 text-primary border border-primary/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Aprovada
          </Badge>
        )
      case "liberada_pagamento":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <DollarSign className="w-3 h-3 mr-1" />
            Liberada p/ Pagamento
          </Badge>
        )
      case "glosada":
        return (
          <Badge className="bg-destructive/10 text-destructive border border-destructive/20">
            <Ban className="w-3 h-3 mr-1" />
            Glosada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Metricas
  const pendentes = medicoesTerceiroMock.filter(
    (m) => m.status === "pendente_validacao" || m.status === "em_validacao",
  ).length
  const aprovadas = medicoesTerceiroMock.filter((m) => m.status === "aprovada").length
  const liberadas = medicoesTerceiroMock.filter((m) => m.status === "liberada_pagamento").length
  const valorTotal = medicoesTerceiroMock.reduce((acc, m) => acc + m.valorMedido, 0)

  const medicoesFiltradas = medicoesTerceiroMock.filter((m) => {
    const matchBusca =
      busca === "" ||
      m.id.toLowerCase().includes(busca.toLowerCase()) ||
      m.fornecedor.toLowerCase().includes(busca.toLowerCase()) ||
      m.servico.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" || m.status === filtroStatus
    return matchBusca && matchStatus
  })

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Medicao de Terceiros</h1>
                <Badge variant="outline" className="text-xs">
                  SP-08
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">Gestao de medicoes de servicos subcontratados</p>
            </div>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Nova Medicao
            </Button>
          </div>

          {/* Navegacao */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-visao")}
            >
              <BarChart3 className="w-3 h-3 mr-2" />
              SP-01 Visao Geral
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-contratos")}
            >
              <FileText className="w-3 h-3 mr-2" />
              SP-04 Contratos
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-muted/50"
              onClick={() => router.push("/obra/comercial/suprimentos-medicao-terceiro")}
            >
              <Truck className="w-3 h-3 mr-2" />
              SP-08 Medicao Terceiros
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-500">{pendentes}</p>
                  <p className="text-xs text-muted-foreground">Pendentes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{aprovadas}</p>
                  <p className="text-xs text-muted-foreground">Aprovadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <DollarSign className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-500">{liberadas}</p>
                  <p className="text-xs text-muted-foreground">Liberadas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <DollarSign className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(valorTotal)}</p>
                  <p className="text-xs text-muted-foreground">Volume Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por medicao, fornecedor ou servico..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pendente_validacao">Pendente Validacao</SelectItem>
              <SelectItem value="em_validacao">Em Validacao</SelectItem>
              <SelectItem value="aprovada">Aprovada</SelectItem>
              <SelectItem value="liberada_pagamento">Liberada p/ Pagamento</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de Medicoes */}
        <div className="space-y-3">
          {medicoesFiltradas.map((medicao) => (
            <Card
              key={medicao.id}
              className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => setMedicaoSelecionada(medicao)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm text-muted-foreground">{medicao.id}</span>
                      {getStatusBadge(medicao.status)}
                    </div>
                    <p className="font-medium text-foreground">{medicao.fornecedor}</p>
                    <p className="text-sm text-muted-foreground">{medicao.servico}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {medicao.contrato}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {medicao.competencia}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Solicitante: {medicao.solicitante}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatCurrency(medicao.valorMedido)}</p>
                    {medicao.valorRetido > 0 && (
                      <p className="text-xs text-destructive">-{formatCurrency(medicao.valorRetido)} retencao</p>
                    )}
                    <p className="text-sm font-medium text-primary">{formatCurrency(medicao.valorLiquido)}</p>
                    <p className="text-xs text-muted-foreground">Valor Liquido</p>
                  </div>
                </div>

                {/* Documentos e Validacoes */}
                <div className="mt-4 pt-3 border-t border-border grid grid-cols-2 gap-4">
                  {/* Documentos */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Documentos:</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {Object.entries(medicao.documentos).map(([doc, ok]) => (
                        <Badge
                          key={doc}
                          variant="outline"
                          className={`text-xs ${ok ? "border-emerald-500/30 text-emerald-600" : "border-destructive/30 text-destructive"}`}
                        >
                          {ok ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                          {doc === "memorialCalculo"
                            ? "Memorial"
                            : doc === "docsFuncionarios"
                              ? "Docs Func."
                              : doc === "relatorioTecnico"
                                ? "Rel. Tecnico"
                                : doc === "inspecaoQualidade"
                                  ? "Inspecao"
                                  : doc === "projeto"
                                    ? "Projeto"
                                    : doc}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Validacoes */}
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Validacoes:</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {medicao.validacoes.quantitativos ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-xs">Qtd</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {medicao.validacoes.suprimentos ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-xs">Supri</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {medicao.validacoes.custoMeta ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-xs">Custo</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {medicao.validacoes.gerenteContrato ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Clock className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span className="text-xs">GC</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Painel Lateral */}
      {medicaoSelecionada && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80" onClick={() => setMedicaoSelecionada(null)} />
          <div className="relative w-full max-w-lg bg-card border-l border-border shadow-lg overflow-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-semibold text-foreground">Detalhe da Medicao</h3>
                <p className="text-xs text-muted-foreground font-mono">{medicaoSelecionada.id}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setMedicaoSelecionada(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(medicaoSelecionada.status)}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Fornecedor</p>
                <p className="font-medium text-foreground">{medicaoSelecionada.fornecedor}</p>
                <p className="text-xs text-muted-foreground">{medicaoSelecionada.cnpj}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Servico</p>
                <p className="font-medium text-foreground">{medicaoSelecionada.servico}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contrato</p>
                  <p className="font-medium font-mono">{medicaoSelecionada.contrato}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Competencia</p>
                  <p className="font-medium">{medicaoSelecionada.competencia}</p>
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Valor Medido</span>
                  <span className="font-medium">{formatCurrency(medicaoSelecionada.valorMedido)}</span>
                </div>
                {medicaoSelecionada.valorRetido > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Retencao (5%)</span>
                    <span className="font-medium text-destructive">
                      -{formatCurrency(medicaoSelecionada.valorRetido)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm font-medium">Valor Liquido</span>
                  <span className="font-bold text-primary">{formatCurrency(medicaoSelecionada.valorLiquido)}</span>
                </div>
              </div>

              {/* Documentos */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Documentos Anexados</p>
                <div className="space-y-2">
                  {Object.entries(medicaoSelecionada.documentos).map(([doc, ok]) => (
                    <div key={doc} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">
                        {doc === "memorialCalculo"
                          ? "Memorial de Calculo"
                          : doc === "docsFuncionarios"
                            ? "Documentos de Funcionarios"
                            : doc === "relatorioTecnico"
                              ? "Relatorio Tecnico"
                              : doc === "inspecaoQualidade"
                                ? "Inspecao de Qualidade"
                                : doc === "projeto"
                                  ? "Projeto"
                                  : doc}
                      </span>
                      {ok ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                          <Upload className="w-3 h-3 mr-1" />
                          Anexar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Fluxo de Validacao */}
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Fluxo de Validacao</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <span className="text-sm">Validacao de Quantitativos</span>
                      <p className="text-xs text-muted-foreground">{medicaoSelecionada.solicitante}</p>
                    </div>
                    {medicaoSelecionada.validacoes.quantitativos ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Button size="sm" className="h-6 text-xs bg-primary">
                        Validar
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <span className="text-sm">Validacao Contratual</span>
                      <p className="text-xs text-muted-foreground">Suprimentos</p>
                    </div>
                    {medicaoSelecionada.validacoes.suprimentos ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Button size="sm" className="h-6 text-xs bg-primary">
                        Validar
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <span className="text-sm">Validacao de Custo</span>
                      <p className="text-xs text-muted-foreground">Custo/Meta</p>
                    </div>
                    {medicaoSelecionada.validacoes.custoMeta ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Button size="sm" className="h-6 text-xs bg-primary">
                        Validar
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <div>
                      <span className="text-sm">Aprovacao Final</span>
                      <p className="text-xs text-muted-foreground">Gerente de Contrato</p>
                    </div>
                    {medicaoSelecionada.validacoes.gerenteContrato ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Button size="sm" className="h-6 text-xs bg-primary">
                        Aprovar
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {medicaoSelecionada.status === "aprovada" && (
                <div className="pt-4 border-t border-border">
                  <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                    <Send className="w-4 h-4 mr-2" />
                    Liberar para Pagamento
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
