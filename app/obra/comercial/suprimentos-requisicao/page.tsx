"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  ClipboardList,
  Search,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Package,
  AlertTriangle,
  X,
  Calendar,
  User,
  FileText,
  RefreshCw,
} from "lucide-react"

// Dados mockados - Requisicoes do Usuario
const minhasRequisicoesMock = [
  {
    id: "REQ-2025-0142",
    descricao: "Aco CA-50 para fundacoes Bloco A",
    categoria: "Material",
    quantidade: 15000,
    unidade: "kg",
    valorEstimado: 142500,
    dataSolicitacao: "2025-01-05",
    dataEntrega: "2025-01-15",
    status: "aprovada",
    etapaAtual: "Em Entrega",
    origem: "EAP 1.2.1 - Fundacoes",
    tipoEntrega: "imediata",
    tempoDecorrido: 4,
  },
  {
    id: "REQ-2025-0138",
    descricao: "Concreto usinado FCK 30",
    categoria: "Material",
    quantidade: 250,
    unidade: "m3",
    valorEstimado: 130000,
    dataSolicitacao: "2025-01-03",
    dataEntrega: "2025-01-20",
    status: "em_cotacao",
    etapaAtual: "Cotacao",
    origem: "EAP 1.2.3 - Estrutura",
    tipoEntrega: "sob_demanda",
    tempoDecorrido: 6,
  },
  {
    id: "REQ-2025-0135",
    descricao: "Locacao de escavadeira hidraulica",
    categoria: "Equipamento",
    quantidade: 1,
    unidade: "un",
    valorEstimado: 85000,
    dataSolicitacao: "2025-01-02",
    dataEntrega: "2025-01-10",
    status: "pendente",
    etapaAtual: "Aguardando Aprovacao",
    origem: "EAP 1.1.2 - Terraplanagem",
    tipoEntrega: "imediata",
    tempoDecorrido: 7,
  },
  {
    id: "REQ-2025-0128",
    descricao: "Forma metalica para pilares",
    categoria: "Equipamento",
    quantidade: 50,
    unidade: "m2",
    valorEstimado: 45000,
    dataSolicitacao: "2024-12-28",
    dataEntrega: "2025-01-08",
    status: "entregue",
    etapaAtual: "Concluido",
    origem: "EAP 1.2.3 - Estrutura",
    tipoEntrega: "imediata",
    tempoDecorrido: 12,
  },
  {
    id: "REQ-2025-0125",
    descricao: "EPI - Capacetes e luvas",
    categoria: "Material",
    quantidade: 100,
    unidade: "un",
    valorEstimado: 8500,
    dataSolicitacao: "2024-12-26",
    dataEntrega: null,
    status: "negada",
    etapaAtual: "Negada",
    origem: "Almoxarifado",
    tipoEntrega: "imediata",
    tempoDecorrido: 14,
    motivoNegacao: "Estoque suficiente disponivel no almoxarifado central",
  },
]

// Timeline de uma requisicao
const timelineRequisicao = [
  { etapa: "Solicitacao", data: "05/01/2025 09:15", status: "concluida", responsavel: "Joao Silva" },
  { etapa: "Analise Suprimentos", data: "05/01/2025 14:30", status: "concluida", responsavel: "Ana Costa" },
  { etapa: "Cotacao", data: "06/01/2025 10:00", status: "concluida", responsavel: "Sistema" },
  { etapa: "Aprovacao Comercial", data: "06/01/2025 16:45", status: "concluida", responsavel: "Roberto Mendes" },
  { etapa: "Ordem de Compra", data: "07/01/2025 08:30", status: "concluida", responsavel: "Ana Costa" },
  { etapa: "Em Transito", data: "08/01/2025 11:00", status: "em_andamento", responsavel: "Fornecedor" },
  { etapa: "Entrega", data: "Previsto 15/01/2025", status: "pendente", responsavel: "Almoxarifado" },
]

export default function RequisicaoUsuarioPage() {
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")
  const [requisicaoSelecionada, setRequisicaoSelecionada] = useState<(typeof minhasRequisicoesMock)[0] | null>(null)

  // Metricas
  const totalRequisicoes = minhasRequisicoesMock.length
  const aprovadas = minhasRequisicoesMock.filter((r) => r.status === "aprovada" || r.status === "entregue").length
  const pendentes = minhasRequisicoesMock.filter((r) => r.status === "pendente" || r.status === "em_cotacao").length
  const negadas = minhasRequisicoesMock.filter((r) => r.status === "negada").length

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
      case "aprovada":
        return (
          <Badge className="bg-primary/10 text-primary border border-primary/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Aprovada
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "em_cotacao":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <RefreshCw className="w-3 h-3 mr-1" />
            Em Cotacao
          </Badge>
        )
      case "entregue":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <Package className="w-3 h-3 mr-1" />
            Entregue
          </Badge>
        )
      case "negada":
        return (
          <Badge className="bg-destructive/10 text-destructive border border-destructive/20">
            <XCircle className="w-3 h-3 mr-1" />
            Negada
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getEtapaIcon = (etapa: string) => {
    switch (etapa) {
      case "Em Entrega":
        return <Truck className="w-4 h-4 text-primary" />
      case "Cotacao":
        return <RefreshCw className="w-4 h-4 text-blue-500" />
      case "Aguardando Aprovacao":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "Concluido":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      case "Negada":
        return <XCircle className="w-4 h-4 text-destructive" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const requisicoesFiltradas = minhasRequisicoesMock.filter((r) => {
    const matchBusca =
      busca === "" ||
      r.id.toLowerCase().includes(busca.toLowerCase()) ||
      r.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" || r.status === filtroStatus
    return matchBusca && matchStatus
  })

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">Minhas Requisicoes</h1>
              <Badge variant="outline" className="text-xs">
                Painel do Usuario
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">Acompanhe o status de todas as suas solicitacoes de compra</p>
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Nova Requisicao
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <ClipboardList className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-foreground">{totalRequisicoes}</p>
                <p className="text-xs text-muted-foreground">Total de Requisicoes</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <CheckCircle2 className="w-5 h-5 text-primary" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-primary">{aprovadas}</p>
                <p className="text-xs text-muted-foreground">Aprovadas/Entregues</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-amber-500" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-amber-500">{pendentes}</p>
                <p className="text-xs text-muted-foreground">Em Andamento</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <XCircle className="w-5 h-5 text-destructive" />
              </div>
              <div className="mt-2">
                <p className="text-2xl font-bold text-destructive">{negadas}</p>
                <p className="text-xs text-muted-foreground">Negadas</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID ou descricao..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            {["todos", "pendente", "em_cotacao", "aprovada", "entregue", "negada"].map((status) => (
              <Button
                key={status}
                variant={filtroStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFiltroStatus(status)}
                className={filtroStatus === status ? "bg-primary text-primary-foreground" : "bg-transparent"}
              >
                {status === "todos"
                  ? "Todos"
                  : status === "em_cotacao"
                    ? "Em Cotacao"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de Requisicoes */}
        <div className="space-y-3">
          {requisicoesFiltradas.map((requisicao) => (
            <Card
              key={requisicao.id}
              className={`bg-card border-border hover:border-primary/30 transition-colors cursor-pointer ${
                requisicao.status === "negada" ? "opacity-60" : ""
              }`}
              onClick={() => setRequisicaoSelecionada(requisicao)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 rounded-lg bg-muted">{getEtapaIcon(requisicao.etapaAtual)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{requisicao.id}</span>
                        {getStatusBadge(requisicao.status)}
                        <Badge variant="outline" className="text-xs">
                          {requisicao.categoria}
                        </Badge>
                      </div>
                      <p className="font-medium text-foreground">{requisicao.descricao}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {requisicao.origem}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Solicitado em {new Date(requisicao.dataSolicitacao).toLocaleDateString("pt-BR")}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {requisicao.tempoDecorrido} dias
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatCurrency(requisicao.valorEstimado)}</p>
                    <p className="text-xs text-muted-foreground">
                      {requisicao.quantidade} {requisicao.unidade}
                    </p>
                    {requisicao.dataEntrega && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Entrega: {new Date(requisicao.dataEntrega).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                </div>

                {/* Barra de Progresso */}
                {requisicao.status !== "negada" && (
                  <div className="mt-4 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>Etapa Atual: {requisicao.etapaAtual}</span>
                      <span>{requisicao.tipoEntrega === "imediata" ? "Entrega Imediata" : "Sob Demanda"}</span>
                    </div>
                    <Progress
                      value={
                        requisicao.status === "entregue"
                          ? 100
                          : requisicao.status === "aprovada"
                            ? 75
                            : requisicao.status === "em_cotacao"
                              ? 40
                              : requisicao.status === "pendente"
                                ? 20
                                : 0
                      }
                      className="h-2"
                    />
                  </div>
                )}

                {/* Motivo de Negacao */}
                {requisicao.status === "negada" && requisicao.motivoNegacao && (
                  <div className="mt-3 p-2 bg-destructive/5 rounded-lg border border-destructive/20">
                    <p className="text-xs text-destructive">
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      Motivo: {requisicao.motivoNegacao}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Painel Lateral - Timeline da Requisicao */}
      {requisicaoSelecionada && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80" onClick={() => setRequisicaoSelecionada(null)} />
          <div className="relative w-full max-w-md bg-card border-l border-border shadow-lg overflow-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-semibold text-foreground">Acompanhar Requisicao</h3>
                <p className="text-xs text-muted-foreground font-mono">{requisicaoSelecionada.id}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setRequisicaoSelecionada(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              {/* Resumo */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(requisicaoSelecionada.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Descricao</p>
                  <p className="font-medium text-foreground">{requisicaoSelecionada.descricao}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Valor Estimado</p>
                    <p className="font-medium text-foreground">{formatCurrency(requisicaoSelecionada.valorEstimado)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantidade</p>
                    <p className="font-medium text-foreground">
                      {requisicaoSelecionada.quantidade} {requisicaoSelecionada.unidade}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-sm font-medium text-foreground mb-4">Timeline do Pedido</p>
                <div className="relative space-y-0">
                  {timelineRequisicao.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-6 last:pb-0">
                      {/* Linha vertical */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            item.status === "concluida"
                              ? "bg-primary"
                              : item.status === "em_andamento"
                                ? "bg-amber-500 animate-pulse"
                                : "bg-muted"
                          }`}
                        />
                        {index < timelineRequisicao.length - 1 && (
                          <div className={`w-0.5 flex-1 ${item.status === "concluida" ? "bg-primary" : "bg-muted"}`} />
                        )}
                      </div>
                      {/* Conteudo */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-center justify-between">
                          <p
                            className={`font-medium ${
                              item.status === "pendente" ? "text-muted-foreground" : "text-foreground"
                            }`}
                          >
                            {item.etapa}
                          </p>
                          {item.status === "em_andamento" && (
                            <Badge className="bg-amber-500/10 text-amber-600 text-xs">Em andamento</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{item.data}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <User className="w-3 h-3" />
                          {item.responsavel}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Acoes */}
              {requisicaoSelecionada.status === "aprovada" && requisicaoSelecionada.tipoEntrega === "sob_demanda" && (
                <div className="pt-4 border-t border-border">
                  <Button className="w-full bg-primary text-primary-foreground">
                    <Truck className="w-4 h-4 mr-2" />
                    Solicitar Entrega Parcial
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
