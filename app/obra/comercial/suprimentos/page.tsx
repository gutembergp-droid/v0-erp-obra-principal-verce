"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  Search,
  Plus,
  FileText,
  CheckCircle2,
  Clock,
  ShoppingCart,
  Package,
  TrendingDown,
  Eye,
  DollarSign,
  Truck,
  ClipboardList,
} from "lucide-react"

// Dados mockados de Requisicoes
const requisicoesMock = [
  {
    id: "REQ-001",
    itemEAP: "1.1 - Escavacao 1a categoria",
    descricao: "Diesel S10 para escavadeiras",
    quantidade: 15000,
    unidade: "litros",
    valorEstimado: 97500,
    solicitante: "Joao Silva",
    data: "2026-01-02",
    status: "aprovada",
    prioridade: "alta",
  },
  {
    id: "REQ-002",
    itemEAP: "2.3 - CBUQ",
    descricao: "Massa asfaltica CBUQ Faixa C",
    quantidade: 500,
    unidade: "ton",
    valorEstimado: 190000,
    solicitante: "Maria Santos",
    data: "2026-01-03",
    status: "pendente",
    prioridade: "urgente",
  },
  {
    id: "REQ-003",
    itemEAP: "3.1 - Ponte Fundacoes",
    descricao: "Aco CA-50 nervurado",
    quantidade: 120,
    unidade: "ton",
    valorEstimado: 720000,
    solicitante: "Pedro Costa",
    data: "2026-01-03",
    status: "cotacao",
    prioridade: "media",
  },
]

// Dados mockados de Ordens de Compra
const ordensCompraMock = [
  {
    id: "OC-001",
    requisicao: "REQ-001",
    fornecedor: "Petrobras Distribuidora",
    descricao: "Diesel S10",
    quantidade: 15000,
    unidade: "litros",
    valorUnitario: 6.2,
    valorTotal: 93000,
    prazoEntrega: "2026-01-10",
    status: "entregue",
  },
  {
    id: "OC-002",
    requisicao: "REQ-003",
    fornecedor: "Gerdau Acos",
    descricao: "Aco CA-50 nervurado",
    quantidade: 120,
    unidade: "ton",
    valorUnitario: 5800,
    valorTotal: 696000,
    prazoEntrega: "2026-01-20",
    status: "em_transito",
  },
]

// Dados mockados de Medicao de Terceiros
const medicaoTerceirosMock = [
  {
    id: "MT-001",
    contrato: "CT-TERRAP-001",
    fornecedor: "Terraplenagem Silva Ltda",
    servico: "Escavacao e transporte de material",
    competencia: "Janeiro/2026",
    valorMedido: 450000,
    valorRetido: 22500,
    valorLiquido: 427500,
    status: "aprovada",
  },
  {
    id: "MT-002",
    contrato: "CT-CONC-002",
    fornecedor: "Concreteira Norte",
    servico: "Fornecimento de concreto usinado",
    competencia: "Janeiro/2026",
    valorMedido: 280000,
    valorRetido: 14000,
    valorLiquido: 266000,
    status: "pendente",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export default function SuprimentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("requisicoes")

  const totalRequisicoes = requisicoesMock.length
  const requisicoesPendentes = requisicoesMock.filter((r) => r.status === "pendente").length
  const valorTotalOC = ordensCompraMock.reduce((acc, oc) => acc + oc.valorTotal, 0)
  const valorMedicaoTerceiros = medicaoTerceirosMock.reduce((acc, m) => acc + m.valorMedido, 0)

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraComercialNavbar />
      </div>

      <main className="flex-1 bg-background overflow-hidden p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Suprimentos</h1>
              <InfoTooltip
                title="Setor de Suprimentos"
            description="Gerencia todo o ciclo de aquisicoes: Requisicao (pedido interno vinculado a EAP), Compra (cotacao e ordem de compra) e Medicao de Terceiros (pagamento de subcontratados)."
            icon={<ShoppingCart className="w-4 h-4" />}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Requisicao, Compra e Medicao de Terceiros - Fluxo completo de aquisicoes
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Requisicoes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRequisicoes}</div>
              <p className="text-xs text-amber-500">{requisicoesPendentes} pendentes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Package className="w-4 h-4" />
                Ordens de Compra
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ordensCompraMock.length}</div>
              <p className="text-xs text-muted-foreground">ativas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Volume Compras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(valorTotalOC)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Medicao Terceiros
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{formatCurrency(valorMedicaoTerceiros)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Economia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">3.2%</div>
              <p className="text-xs text-muted-foreground">vs baseline</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requisicoes">
              <ClipboardList className="w-4 h-4 mr-2" />
              Requisicoes
            </TabsTrigger>
            <TabsTrigger value="compras">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Ordens de Compra
            </TabsTrigger>
            <TabsTrigger value="terceiros">
              <Truck className="w-4 h-4 mr-2" />
              Medicao Terceiros
            </TabsTrigger>
          </TabsList>

          {/* Requisicoes */}
          <TabsContent value="requisicoes">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Requisicoes de Compra</CardTitle>
                    <CardDescription>Pedidos internos vinculados a itens da EAP</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar..."
                        className="pl-9 w-48"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Nova Requisicao
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Item EAP</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">Valor Est.</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requisicoesMock.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-mono font-bold">{req.id}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{req.itemEAP}</TableCell>
                        <TableCell>{req.descricao}</TableCell>
                        <TableCell className="text-right font-mono">
                          {formatNumber(req.quantidade)} {req.unidade}
                        </TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(req.valorEstimado)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              req.prioridade === "urgente"
                                ? "destructive"
                                : req.prioridade === "alta"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {req.prioridade}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {req.status === "aprovada" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Aprovada
                            </Badge>
                          )}
                          {req.status === "pendente" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                          {req.status === "cotacao" && (
                            <Badge variant="outline" className="text-blue-500">
                              <FileText className="w-3 h-3 mr-1" />
                              Em Cotacao
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Ordens de Compra */}
          <TabsContent value="compras">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Ordens de Compra</CardTitle>
                    <CardDescription>Compras aprovadas e em andamento</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Ordem
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>OC</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead className="text-right">Qtd</TableHead>
                      <TableHead className="text-right">Valor Unit.</TableHead>
                      <TableHead className="text-right">Valor Total</TableHead>
                      <TableHead>Entrega</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ordensCompraMock.map((oc) => (
                      <TableRow key={oc.id}>
                        <TableCell className="font-mono font-bold">{oc.id}</TableCell>
                        <TableCell>{oc.fornecedor}</TableCell>
                        <TableCell>{oc.descricao}</TableCell>
                        <TableCell className="text-right font-mono">
                          {formatNumber(oc.quantidade)} {oc.unidade}
                        </TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(oc.valorUnitario)}</TableCell>
                        <TableCell className="text-right font-mono font-bold text-green-600">
                          {formatCurrency(oc.valorTotal)}
                        </TableCell>
                        <TableCell>{new Date(oc.prazoEntrega).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          {oc.status === "entregue" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Entregue
                            </Badge>
                          )}
                          {oc.status === "em_transito" && (
                            <Badge variant="outline" className="text-blue-500">
                              <Truck className="w-3 h-3 mr-1" />
                              Em Transito
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Medicao Terceiros */}
          <TabsContent value="terceiros">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Medicao de Terceiros</CardTitle>
                    <CardDescription>Medicao de servicos de subcontratados</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Medicao
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Contrato</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Servico</TableHead>
                      <TableHead className="text-right">Valor Medido</TableHead>
                      <TableHead className="text-right">Retencao</TableHead>
                      <TableHead className="text-right">Valor Liquido</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medicaoTerceirosMock.map((med) => (
                      <TableRow key={med.id}>
                        <TableCell className="font-mono font-bold">{med.id}</TableCell>
                        <TableCell className="font-mono text-sm">{med.contrato}</TableCell>
                        <TableCell>{med.fornecedor}</TableCell>
                        <TableCell>{med.servico}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(med.valorMedido)}</TableCell>
                        <TableCell className="text-right font-mono text-red-500">
                          -{formatCurrency(med.valorRetido)}
                        </TableCell>
                        <TableCell className="text-right font-mono font-bold text-green-600">
                          {formatCurrency(med.valorLiquido)}
                        </TableCell>
                        <TableCell>
                          {med.status === "aprovada" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Aprovada
                            </Badge>
                          )}
                          {med.status === "pendente" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
