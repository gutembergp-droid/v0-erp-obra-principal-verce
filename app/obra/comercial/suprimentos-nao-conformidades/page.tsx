"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  X,
  Camera,
  Search,
  Plus,
  AlertCircle,
  Truck,
  BarChart3,
  Ban,
  MessageSquare,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados mockados - Nao Conformidades
const naoConformidadesMock = [
  {
    id: "NC-2025-0012",
    pedido: "OC-2025-0089",
    fornecedor: "Gerdau S.A.",
    descricao: "Aco CA-50 para fundacoes",
    tipo: "quantidade_menos",
    tipoLabel: "Quantidade a Menos",
    detalhe: "Pedido de 15.000kg, recebido 12.500kg. Faltam 2.500kg.",
    dataRegistro: "2025-01-09",
    status: "aberta",
    impactoFinanceiro: 23750,
    responsavel: "Jose Almoxarife",
    fotos: 3,
    aprovacoes: {
      producao: false,
      suprimentos: false,
      gerenteContrato: false,
    },
  },
  {
    id: "NC-2025-0011",
    pedido: "OC-2025-0085",
    fornecedor: "Votorantim Cimentos",
    descricao: "Concreto usinado FCK 30",
    tipo: "baixa_qualidade",
    tipoLabel: "Baixa Qualidade",
    detalhe: "Slump fora do especificado. Solicitado 10cm, recebido 15cm. Material rejeitado.",
    dataRegistro: "2025-01-08",
    status: "em_analise",
    impactoFinanceiro: 45000,
    responsavel: "Carlos Engenheiro",
    fotos: 5,
    aprovacoes: {
      producao: true,
      suprimentos: false,
      gerenteContrato: false,
    },
  },
  {
    id: "NC-2025-0010",
    pedido: "OC-2025-0078",
    fornecedor: "Tigre S.A.",
    descricao: "Tubos PEAD DN 600",
    tipo: "material_danificado",
    tipoLabel: "Material Danificado",
    detalhe: "3 tubos com trincas visiveis. Possivelmente dano no transporte.",
    dataRegistro: "2025-01-07",
    status: "resolvida",
    impactoFinanceiro: 12000,
    responsavel: "Jose Almoxarife",
    fotos: 8,
    resolucao: "Fornecedor enviou reposicao em 24h. Material substituido.",
    aprovacoes: {
      producao: true,
      suprimentos: true,
      gerenteContrato: true,
    },
  },
  {
    id: "NC-2025-0009",
    pedido: "OC-2025-0072",
    fornecedor: "Usina Asfalto Norte",
    descricao: "CBUQ Faixa C",
    tipo: "material_diferente",
    tipoLabel: "Material Diferente",
    detalhe: "Entregue CBUQ Faixa B ao inves de Faixa C conforme pedido.",
    dataRegistro: "2025-01-05",
    status: "pendente_aprovacao",
    impactoFinanceiro: 0,
    responsavel: "Maria Qualidade",
    fotos: 2,
    aprovacoes: {
      producao: true,
      suprimentos: true,
      gerenteContrato: false,
    },
  },
]

// Tipos de nao conformidade
const tiposNC = [
  { value: "quantidade_menos", label: "Quantidade a Menos" },
  { value: "quantidade_mais", label: "Quantidade a Mais" },
  { value: "material_danificado", label: "Material Danificado" },
  { value: "baixa_qualidade", label: "Baixa Qualidade" },
  { value: "material_diferente", label: "Material Diferente do Pedido" },
  { value: "distorcao_nota", label: "Distorcao na Nota Fiscal" },
]

export default function SuprimentosNaoConformidadesPage() {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [ncSelecionada, setNcSelecionada] = useState<(typeof naoConformidadesMock)[0] | null>(null)
  const [dialogNovaNC, setDialogNovaNC] = useState(false)

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
      case "aberta":
        return (
          <Badge className="bg-destructive/10 text-destructive border border-destructive/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Aberta
          </Badge>
        )
      case "em_analise":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Em Analise
          </Badge>
        )
      case "pendente_aprovacao":
        return (
          <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pendente Aprovacao
          </Badge>
        )
      case "resolvida":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Resolvida
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "quantidade_menos":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-500/30">
            Qtd a Menos
          </Badge>
        )
      case "quantidade_mais":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-500/30">
            Qtd a Mais
          </Badge>
        )
      case "material_danificado":
        return (
          <Badge variant="outline" className="text-destructive border-destructive/30">
            Danificado
          </Badge>
        )
      case "baixa_qualidade":
        return (
          <Badge variant="outline" className="text-destructive border-destructive/30">
            Baixa Qualidade
          </Badge>
        )
      case "material_diferente":
        return (
          <Badge variant="outline" className="text-purple-600 border-purple-500/30">
            Material Diferente
          </Badge>
        )
      case "distorcao_nota":
        return (
          <Badge variant="outline" className="text-orange-600 border-orange-500/30">
            Distorcao NF
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  // Metricas
  const abertas = naoConformidadesMock.filter((nc) => nc.status === "aberta").length
  const emAnalise = naoConformidadesMock.filter(
    (nc) => nc.status === "em_analise" || nc.status === "pendente_aprovacao",
  ).length
  const resolvidas = naoConformidadesMock.filter((nc) => nc.status === "resolvida").length
  const impactoTotal = naoConformidadesMock
    .filter((nc) => nc.status !== "resolvida")
    .reduce((acc, nc) => acc + nc.impactoFinanceiro, 0)

  const ncFiltradas = naoConformidadesMock.filter((nc) => {
    const matchBusca =
      busca === "" ||
      nc.id.toLowerCase().includes(busca.toLowerCase()) ||
      nc.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      nc.fornecedor.toLowerCase().includes(busca.toLowerCase())
    const matchStatus = filtroStatus === "todos" || nc.status === filtroStatus
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
                <h1 className="text-2xl font-bold text-foreground">Nao Conformidades</h1>
                <Badge variant="outline" className="text-xs">
                  SP-07
                </Badge>
              </div>
              <p className="text-muted-foreground mt-1">Registro e gestao de problemas no recebimento de materiais</p>
            </div>
            <Dialog open={dialogNovaNC} onOpenChange={setDialogNovaNC}>
              <DialogTrigger asChild>
                <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Registrar NC
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Registrar Nao Conformidade</DialogTitle>
                  <DialogDescription>Registre problemas identificados no recebimento de materiais</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ordem de Compra</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a OC" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oc-089">OC-2025-0089 - Aco CA-50</SelectItem>
                        <SelectItem value="oc-085">OC-2025-0085 - Concreto FCK 30</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de Nao Conformidade</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposNC.map((tipo) => (
                          <SelectItem key={tipo.value} value={tipo.value}>
                            {tipo.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descricao do Problema</label>
                    <Textarea placeholder="Descreva detalhadamente o problema identificado..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fotos (opcional)</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Camera className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Clique para adicionar fotos</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogNovaNC(false)}>
                    Cancelar
                  </Button>
                  <Button className="bg-destructive text-destructive-foreground">Registrar NC</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
              onClick={() => router.push("/obra/comercial/suprimentos-rastreio")}
            >
              <Truck className="w-3 h-3 mr-2" />
              SP-06 Rastreio
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-muted/50"
              onClick={() => router.push("/obra/comercial/suprimentos-nao-conformidades")}
            >
              <AlertTriangle className="w-3 h-3 mr-2" />
              SP-07 Nao Conformidades
            </Button>
          </div>
        </div>

        {/* Alerta */}
        {abertas > 0 && (
          <Card className="bg-destructive/5 border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div className="flex-1">
                  <p className="font-medium text-destructive">Atencao: Pagamentos Suspensos</p>
                  <p className="text-sm text-muted-foreground">
                    {abertas} nao conformidade(s) aberta(s) com impacto de {formatCurrency(impactoTotal)}. Pagamentos
                    suspensos ate resolucao.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{abertas}</p>
                  <p className="text-xs text-muted-foreground">Abertas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-500">{emAnalise}</p>
                  <p className="text-xs text-muted-foreground">Em Analise</p>
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
                  <p className="text-2xl font-bold text-emerald-500">{resolvidas}</p>
                  <p className="text-xs text-muted-foreground">Resolvidas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-destructive/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <Ban className="w-5 h-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-destructive">{formatCurrency(impactoTotal)}</p>
                  <p className="text-xs text-muted-foreground">Pagto Suspenso</p>
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
              placeholder="Buscar por NC, descricao ou fornecedor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="aberta">Abertas</SelectItem>
              <SelectItem value="em_analise">Em Analise</SelectItem>
              <SelectItem value="pendente_aprovacao">Pendente Aprovacao</SelectItem>
              <SelectItem value="resolvida">Resolvidas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de NCs */}
        <div className="space-y-3">
          {ncFiltradas.map((nc) => (
            <Card
              key={nc.id}
              className={`bg-card border-border hover:border-primary/30 transition-colors cursor-pointer ${
                nc.status === "aberta" ? "border-destructive/30" : ""
              }`}
              onClick={() => setNcSelecionada(nc)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm text-muted-foreground">{nc.id}</span>
                      {getStatusBadge(nc.status)}
                      {getTipoBadge(nc.tipo)}
                    </div>
                    <p className="font-medium text-foreground">{nc.descricao}</p>
                    <p className="text-sm text-muted-foreground">
                      {nc.fornecedor} | {nc.pedido}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">{nc.detalhe}</p>
                  </div>
                  <div className="text-right">
                    {nc.impactoFinanceiro > 0 && (
                      <>
                        <p className="font-semibold text-destructive">{formatCurrency(nc.impactoFinanceiro)}</p>
                        <p className="text-xs text-muted-foreground">Impacto Financeiro</p>
                      </>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Camera className="w-3 h-3" />
                      {nc.fotos} fotos
                    </div>
                  </div>
                </div>

                {/* Fluxo de Aprovacao */}
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Fluxo de Aprovacao:</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {nc.aprovacoes.producao ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-xs">Producao</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {nc.aprovacoes.suprimentos ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-xs">Suprimentos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {nc.aprovacoes.gerenteContrato ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className="text-xs">Gerente Contrato</span>
                    </div>
                  </div>
                </div>

                {/* Resolucao */}
                {nc.status === "resolvida" && nc.resolucao && (
                  <div className="mt-3 p-2 bg-emerald-500/5 rounded-lg border border-emerald-500/20">
                    <p className="text-xs text-emerald-600">
                      <CheckCircle2 className="w-3 h-3 inline mr-1" />
                      {nc.resolucao}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Painel Lateral */}
      {ncSelecionada && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-background/80" onClick={() => setNcSelecionada(null)} />
          <div className="relative w-full max-w-md bg-card border-l border-border shadow-lg overflow-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <div>
                <h3 className="font-semibold text-foreground">Detalhe da NC</h3>
                <p className="text-xs text-muted-foreground font-mono">{ncSelecionada.id}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setNcSelecionada(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                {getStatusBadge(ncSelecionada.status)}
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Descricao</p>
                <p className="font-medium text-foreground">{ncSelecionada.descricao}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Problema Identificado</p>
                <p className="text-foreground">{ncSelecionada.detalhe}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Fornecedor</p>
                  <p className="font-medium text-foreground">{ncSelecionada.fornecedor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pedido</p>
                  <p className="font-medium font-mono">{ncSelecionada.pedido}</p>
                </div>
              </div>

              {ncSelecionada.impactoFinanceiro > 0 && (
                <div className="p-3 bg-destructive/5 rounded-lg border border-destructive/20">
                  <p className="text-sm text-muted-foreground">Impacto Financeiro</p>
                  <p className="text-xl font-bold text-destructive">
                    {formatCurrency(ncSelecionada.impactoFinanceiro)}
                  </p>
                  <p className="text-xs text-destructive">Pagamento suspenso ate resolucao</p>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-foreground mb-3">Fluxo de Aprovacao</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Producao</span>
                    {ncSelecionada.aprovacoes.producao ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                        Aprovar
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Suprimentos</span>
                    {ncSelecionada.aprovacoes.suprimentos ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                        Aprovar
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/30 rounded">
                    <span className="text-sm">Gerente de Contrato</span>
                    {ncSelecionada.aprovacoes.gerenteContrato ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Button size="sm" variant="outline" className="h-6 text-xs bg-transparent">
                        Aprovar
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <Button className="w-full bg-transparent" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Adicionar Comentario
                </Button>
                <Button className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Marcar como Resolvida
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
