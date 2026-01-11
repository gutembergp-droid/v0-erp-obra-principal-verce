"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  Truck,
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  Calendar,
  Search,
  X,
  Box,
  AlertTriangle,
  RefreshCw,
  Building2,
  BarChart3,
  Scale,
} from "lucide-react"

// Dados mockados - Pedidos em Rastreio
const pedidosRastreioMock = [
  {
    id: "OC-2025-0089",
    descricao: "Aco CA-50 para fundacoes",
    fornecedor: "Gerdau S.A.",
    valorTotal: 133500,
    dataCompra: "2025-01-07",
    previsaoEntrega: "2025-01-15",
    status: "em_transito",
    progresso: 65,
    etapaAtual: "Em Transito",
    origem: "Sao Paulo - SP",
    destino: "Obra BR-101",
    transportadora: "TNT Mercurio",
    rastreio: "BR123456789",
    itensEntregues: 8,
    itensTotal: 12,
  },
  {
    id: "OC-2025-0085",
    descricao: "Concreto usinado FCK 30",
    fornecedor: "Votorantim Cimentos",
    valorTotal: 138000,
    dataCompra: "2025-01-05",
    previsaoEntrega: "2025-01-20",
    status: "em_separacao",
    progresso: 30,
    etapaAtual: "Em Separacao",
    origem: "Curitiba - PR",
    destino: "Obra BR-101",
    transportadora: "Proprio",
    rastreio: null,
    itensEntregues: 0,
    itensTotal: 5,
  },
  {
    id: "OC-2025-0078",
    descricao: "Tubos PEAD DN 600",
    fornecedor: "Tigre S.A.",
    valorTotal: 234000,
    dataCompra: "2025-01-02",
    previsaoEntrega: "2025-01-10",
    status: "entregue",
    progresso: 100,
    etapaAtual: "Entregue",
    origem: "Joinville - SC",
    destino: "Obra BR-101",
    transportadora: "Jamef",
    rastreio: "JAM987654321",
    itensEntregues: 8,
    itensTotal: 8,
  },
  {
    id: "OC-2025-0092",
    descricao: "Locacao Escavadeira",
    fornecedor: "Sotreq Equipamentos",
    valorTotal: 156000,
    dataCompra: "2025-01-08",
    previsaoEntrega: "2025-01-12",
    status: "atrasado",
    progresso: 45,
    etapaAtual: "Aguardando Transporte",
    origem: "Belo Horizonte - MG",
    destino: "Obra BR-101",
    transportadora: "A definir",
    rastreio: null,
    itensEntregues: 0,
    itensTotal: 2,
    motivoAtraso: "Aguardando documentacao de transporte especial",
  },
]

// Timeline de rastreio
const timelineRastreio = [
  { etapa: "Pedido Realizado", data: "07/01/2025 08:30", status: "concluida", local: "Sistema" },
  { etapa: "Confirmado pelo Fornecedor", data: "07/01/2025 10:15", status: "concluida", local: "Gerdau - Sao Paulo" },
  { etapa: "Em Separacao", data: "08/01/2025 09:00", status: "concluida", local: "CD Gerdau - Guarulhos" },
  {
    etapa: "Coletado pela Transportadora",
    data: "09/01/2025 14:30",
    status: "concluida",
    local: "CD Gerdau - Guarulhos",
  },
  { etapa: "Em Transito", data: "09/01/2025 16:00", status: "em_andamento", local: "Rodovia BR-116, km 245" },
  { etapa: "Chegada no Destino", data: "Previsto 15/01/2025", status: "pendente", local: "Obra BR-101" },
  { etapa: "Entrega Realizada", data: "-", status: "pendente", local: "Almoxarifado Obra" },
]

export default function SuprimentosRastreioPage() {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  const [pedidoSelecionado, setPedidoSelecionado] = useState<(typeof pedidosRastreioMock)[0] | null>(null)

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
      case "entregue":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Entregue
          </Badge>
        )
      case "em_transito":
        return (
          <Badge className="bg-primary/10 text-primary border border-primary/20">
            <Truck className="w-3 h-3 mr-1" />
            Em Transito
          </Badge>
        )
      case "em_separacao":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <Box className="w-3 h-3 mr-1" />
            Em Separacao
          </Badge>
        )
      case "atrasado":
        return (
          <Badge className="bg-destructive/10 text-destructive border border-destructive/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Atrasado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case "entregue":
        return "[&>div]:bg-emerald-500"
      case "em_transito":
        return "[&>div]:bg-primary"
      case "em_separacao":
        return "[&>div]:bg-blue-500"
      case "atrasado":
        return "[&>div]:bg-destructive"
      default:
        return ""
    }
  }

  // Metricas
  const emTransito = pedidosRastreioMock.filter((p) => p.status === "em_transito").length
  const entregues = pedidosRastreioMock.filter((p) => p.status === "entregue").length
  const atrasados = pedidosRastreioMock.filter((p) => p.status === "atrasado").length

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Rastreio de Pedidos</h1>
                <Badge variant="outline" className="text-xs">
                  SP-06
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">Acompanhe a entrega dos seus pedidos em tempo real</p>
            </div>
            <Button variant="outline" className="bg-transparent">
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar
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
              onClick={() => router.push("/obra/comercial/suprimentos-pedidos")}
            >
              <Package className="w-3 h-3 mr-2" />
              SP-02 Pedidos
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-transparent"
              onClick={() => router.push("/obra/comercial/suprimentos-cotacao")}
            >
              <Scale className="w-3 h-3 mr-2" />
              SP-05 Cotacao
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-muted/50"
              onClick={() => router.push("/obra/comercial/suprimentos-rastreio")}
            >
              <Truck className="w-3 h-3 mr-2" />
              SP-06 Rastreio
            </Button>
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{emTransito}</p>
                  <p className="text-xs text-muted-foreground">Em Transito</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Box className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-500">1</p>
                  <p className="text-xs text-muted-foreground">Em Separacao</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-500">{entregues}</p>
                  <p className="text-xs text-muted-foreground">Entregues</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{atrasados}</p>
                  <p className="text-xs text-muted-foreground">Atrasados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Busca */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por OC, descricao ou codigo de rastreio..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Lista de Pedidos em Rastreio */}
        <div className="space-y-4">
          {pedidosRastreioMock.map((pedido) => (
            <Card
              key={pedido.id}
              className={`bg-card border-border hover:border-primary/30 transition-colors cursor-pointer ${
                pedido.status === "atrasado" ? "border-destructive/30" : ""
              }`}
              onClick={() => setPedidoSelecionado(pedido)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm text-muted-foreground">{pedido.id}</span>
                      {getStatusBadge(pedido.status)}
                    </div>
                    <p className="font-medium text-foreground">{pedido.descricao}</p>
                    <p className="text-sm text-muted-foreground">{pedido.fornecedor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatCurrency(pedido.valorTotal)}</p>
                    <p className="text-xs text-muted-foreground">
                      {pedido.itensEntregues}/{pedido.itensTotal} itens
                    </p>
                  </div>
                </div>

                {/* Barra de Progresso Estilo Mercado Livre */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {pedido.origem}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {pedido.destino}
                    </span>
                  </div>
                  <Progress value={pedido.progresso} className={`h-3 ${getProgressColor(pedido.status)}`} />
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Compra: {new Date(pedido.dataCompra).toLocaleDateString("pt-BR")}
                    </span>
                    <span
                      className={
                        pedido.status === "atrasado" ? "text-destructive font-medium" : "text-muted-foreground"
                      }
                    >
                      <Clock className="w-3 h-3 inline mr-1" />
                      Previsao: {new Date(pedido.previsaoEntrega).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>

                {/* Alerta de Atraso */}
                {pedido.status === "atrasado" && pedido.motivoAtraso && (
                  <div className="mt-3 p-2 bg-destructive/5 rounded-lg border border-destructive/20">
                    <p className="text-xs text-destructive">
                      <AlertTriangle className="w-3 h-3 inline mr-1" />
                      {pedido.motivoAtraso}
                    </p>
                  </div>
                )}

                {/* Info Transportadora */}
                {pedido.rastreio && (
                  <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                    <span>
                      <Truck className="w-3 h-3 inline mr-1" />
                      {pedido.transportadora}
                    </span>
                    <span className="font-mono">{pedido.rastreio}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Painel Lateral - Timeline Detalhada */}
      {pedidoSelecionado && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80" onClick={() => setPedidoSelecionado(null)} />
          <div className="relative w-full max-w-md bg-card border-l border-border shadow-lg overflow-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-semibold text-foreground">Rastreio Detalhado</h3>
                <p className="text-xs text-muted-foreground font-mono">{pedidoSelecionado.id}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setPedidoSelecionado(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              {/* Resumo */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  {getStatusBadge(pedidoSelecionado.status)}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Descricao</p>
                  <p className="font-medium text-foreground">{pedidoSelecionado.descricao}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fornecedor</p>
                  <p className="font-medium text-foreground">{pedidoSelecionado.fornecedor}</p>
                </div>
              </div>

              {/* Rota */}
              <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm">{pedidoSelecionado.origem}</span>
                </div>
                <div className="ml-1 border-l-2 border-dashed border-muted-foreground/30 h-4" />
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm">{pedidoSelecionado.destino}</span>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <p className="text-sm font-medium text-foreground mb-4">Historico de Movimentacao</p>
                <div className="relative space-y-0">
                  {timelineRastreio.map((item, index) => (
                    <div key={index} className="flex gap-4 pb-6 last:pb-0">
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
                        {index < timelineRastreio.length - 1 && (
                          <div className={`w-0.5 flex-1 ${item.status === "concluida" ? "bg-primary" : "bg-muted"}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-2">
                        <p
                          className={`font-medium ${
                            item.status === "pendente" ? "text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {item.etapa}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.data}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {item.local}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contato Transportadora */}
              {pedidoSelecionado.transportadora && pedidoSelecionado.transportadora !== "A definir" && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground mb-3">Transportadora</p>
                  <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{pedidoSelecionado.transportadora}</span>
                    </div>
                    {pedidoSelecionado.rastreio && (
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-mono">{pedidoSelecionado.rastreio}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
