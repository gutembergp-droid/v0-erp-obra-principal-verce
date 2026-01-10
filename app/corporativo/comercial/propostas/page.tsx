"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Eye, FileText, TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react"
import { ComercialSidebar } from "../_components/comercial-sidebar"
import { ComercialTopBar } from "../_components/comercial-top-bar"

// ============================================================================
// MOCK DATA
// ============================================================================

const propostasMock = [
  {
    id: "PROP-2026-001",
    cliente: "Construtora ABC",
    obra: "Ponte Rio Grande",
    status: "em_analise",
    valorInicial: 450000000,
    valorFinal: 450000000,
    dataInicio: "2026-01-05",
    responsavel: "João Silva",
  },
  {
    id: "PROP-2026-002",
    cliente: "Infraco Ltda",
    obra: "Rodovia BR-116 Lote 3",
    status: "em_revisao",
    valorInicial: 890000000,
    valorFinal: 920000000,
    dataInicio: "2026-01-08",
    responsavel: "Maria Santos",
  },
  {
    id: "PROP-2026-003",
    cliente: "Governo do Estado",
    obra: "Hospital Regional Sul",
    status: "consolidada",
    valorInicial: 280000000,
    valorFinal: 275000000,
    dataInicio: "2026-01-03",
    responsavel: "Pedro Alves",
  },
  {
    id: "PROP-2025-124",
    cliente: "Prefeitura Municipal",
    obra: "Escola Técnica Zona Norte",
    status: "enviada",
    valorInicial: 35000000,
    valorFinal: 35000000,
    dataInicio: "2025-12-20",
    responsavel: "Ana Costa",
  },
  {
    id: "PROP-2026-004",
    cliente: "SABESP",
    obra: "Estação de Tratamento ETE-7",
    status: "em_cadastro",
    valorInicial: 180000000,
    valorFinal: 0,
    dataInicio: "2026-01-10",
    responsavel: "Carlos Lima",
  },
]

type StatusProposta = "em_cadastro" | "em_revisao" | "em_analise" | "consolidada" | "enviada" | "reprovada"

// ============================================================================
// COMPONENT - VISÃO GERAL DE PROPOSTAS
// ============================================================================

export default function PropostasPage() {
  const router = useRouter()
  const [busca, setBusca] = useState("")
  const [cadastroOpen, setCadastroOpen] = useState(false)

  // Filtrar propostas
  const propostasFiltradas = propostasMock.filter(p => 
    p.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    p.obra.toLowerCase().includes(busca.toLowerCase()) ||
    p.id.toLowerCase().includes(busca.toLowerCase())
  )

  // Calcular KPIs
  const kpis = {
    total: propostasMock.length,
    emProgresso: propostasMock.filter(p => p.status === "em_cadastro" || p.status === "em_revisao" || p.status === "em_analise").length,
    consolidadas: propostasMock.filter(p => p.status === "consolidada").length,
    enviadas: propostasMock.filter(p => p.status === "enviada").length,
    valorTotal: propostasMock.reduce((acc, p) => acc + p.valorInicial, 0),
    // Breakdown por status
    valorEnviado: propostasMock.filter(p => p.status === "enviada").reduce((acc, p) => acc + p.valorInicial, 0),
    valorElaboracao: propostasMock.filter(p => p.status === "em_cadastro" || p.status === "em_revisao").reduce((acc, p) => acc + p.valorInicial, 0),
    valorMonitoramento: propostasMock.filter(p => p.status === "em_analise" || p.status === "consolidada").reduce((acc, p) => acc + p.valorInicial, 0),
  }

  // Config de status
  const statusConfig: Record<StatusProposta, { label: string; cor: string; bg: string }> = {
    em_cadastro: { label: "Em Cadastro", cor: "text-gray-700", bg: "bg-gray-100" },
    em_revisao: { label: "Em Revisão", cor: "text-blue-700", bg: "bg-blue-100" },
    em_analise: { label: "Em Análise", cor: "text-purple-700", bg: "bg-purple-100" },
    consolidada: { label: "Consolidada", cor: "text-emerald-700", bg: "bg-emerald-100" },
    enviada: { label: "Enviada", cor: "text-amber-700", bg: "bg-amber-100" },
    reprovada: { label: "Reprovada", cor: "text-red-700", bg: "bg-red-100" },
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const verProposta = (id: string) => {
    router.push(`/corporativo/comercial/propostas/${id}`)
  }

  return (
    <div className="flex h-screen bg-muted/30">
      <ComercialSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <ComercialTopBar titulo="Propostas - Visão Geral" />

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1800px] mx-auto space-y-6">
            {/* KPIs - CARDS NO TOPO */}
            <div className="grid grid-cols-5 gap-4">
              {/* Total de Propostas */}
              <Card className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <Badge variant="outline" className="text-xs">Total</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{kpis.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">Propostas Ativas</p>
                </CardContent>
              </Card>

              {/* Em Progresso */}
              <Card className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Clock className="w-5 h-5 text-amber-600" />
                    <Badge variant="outline" className="text-xs">Andamento</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-amber-600">{kpis.emProgresso}</p>
                  <p className="text-xs text-muted-foreground mt-1">Em Progresso</p>
                </CardContent>
              </Card>

              {/* Consolidadas */}
              <Card className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <Badge variant="outline" className="text-xs">Prontas</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-emerald-600">{kpis.consolidadas}</p>
                  <p className="text-xs text-muted-foreground mt-1">Consolidadas</p>
                </CardContent>
              </Card>

              {/* Enviadas */}
              <Card className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <Badge variant="outline" className="text-xs">Enviadas</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-purple-600">{kpis.enviadas}</p>
                  <p className="text-xs text-muted-foreground mt-1">Ao Cliente</p>
                </CardContent>
              </Card>

              {/* Pipeline - Velocímetro */}
              <Card className="border hover:shadow-md transition-shadow group cursor-pointer relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <Badge variant="outline" className="text-xs">Pipeline</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Velocímetro Visual */}
                  <div className="relative mb-4">
                    {/* Semi-círculo (gauge) */}
                    <div className="relative w-full aspect-[2/1] flex items-end justify-center">
                      <svg viewBox="0 0 100 50" className="w-full">
                        {/* Background arc */}
                        <path
                          d="M 10,50 A 40,40 0 0,1 90,50"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                        {/* Colored segments */}
                        {/* Amarelo (Enviado) - 0-33% */}
                        <path
                          d="M 10,50 A 40,40 0 0,1 36.3,23.4"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                        {/* Azul (Elaboração) - 33-66% */}
                        <path
                          d="M 36.3,23.4 A 40,40 0 0,1 63.7,23.4"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                        {/* Verde (Monitoramento) - 66-100% */}
                        <path
                          d="M 63.7,23.4 A 40,40 0 0,1 90,50"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeLinecap="round"
                          opacity="0.6"
                        />
                        {/* Needle (ponteiro) - apontando para ~80% */}
                        <line
                          x1="50"
                          y1="50"
                          x2="78"
                          y2="30"
                          stroke="#1e40af"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="50" r="3" fill="#1e40af" />
                      </svg>
                    </div>
                  </div>

                  {/* Valor */}
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(kpis.valorTotal)}</p>
                    <p className="text-xs text-muted-foreground mt-1">Pipeline Total</p>
                  </div>

                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg p-4 transition-opacity flex flex-col justify-center space-y-2">
                    <p className="text-xs font-bold text-center mb-2">Breakdown:</p>
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-amber-500" />
                          <span>Enviado</span>
                        </div>
                        <span className="font-bold">{formatCurrency(kpis.valorEnviado)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-blue-500" />
                          <span>Elaboração</span>
                        </div>
                        <span className="font-bold">{formatCurrency(kpis.valorElaboracao)}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>Monitoramento</span>
                        </div>
                        <span className="font-bold">{formatCurrency(kpis.valorMonitoramento)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* TABELA DE PROPOSTAS */}
            <Card className="border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold">Todas as Propostas</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Gerenciamento completo de propostas
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Busca */}
                    <div className="relative w-64">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Buscar por cliente, obra..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="pl-8 h-9 text-xs"
                      />
                    </div>

                    {/* Botão Nova Proposta */}
                    <Dialog open={cadastroOpen} onOpenChange={setCadastroOpen}>
                      <DialogTrigger asChild>
                        <Button className="gap-2">
                          <Plus className="w-4 h-4" />
                          Nova Proposta
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold">Cadastrar Nova Proposta</DialogTitle>
                          <p className="text-sm text-muted-foreground">
                            Preencha os dados e faça upload da documentação
                          </p>
                        </DialogHeader>
                        
                        {/* FORMULÁRIO DE CADASTRO */}
                        <div className="space-y-6 py-4">
                          {/* Seção 1: Dados Básicos */}
                          <div className="space-y-4">
                            <h3 className="font-semibold text-sm border-b pb-2">Dados Básicos</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Cliente *</label>
                                <Input placeholder="Selecione ou cadastre" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Nome da Obra *</label>
                                <Input placeholder="Ex: Ponte Rio Grande" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Tipo de Obra *</label>
                                <Input placeholder="Infraestrutura, Edificação..." />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Localização *</label>
                                <Input placeholder="Cidade, Estado" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Valor Estimado</label>
                                <Input placeholder="R$ 0,00" type="number" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Prazo</label>
                                <Input type="date" />
                              </div>
                            </div>
                          </div>

                          {/* Seção 2: Upload de Documentos */}
                          <div className="space-y-4">
                            <h3 className="font-semibold text-sm border-b pb-2">Documentação</h3>
                            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                              <FileText className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                              <p className="text-sm font-medium">Arraste arquivos ou clique para fazer upload</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Editais, projetos, memoriais, planilhas...
                              </p>
                            </div>
                          </div>

                          {/* Seção 3: Responsáveis */}
                          <div className="space-y-4">
                            <h3 className="font-semibold text-sm border-b pb-2">Atribuição</h3>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Responsável Comercial *</label>
                                <Input placeholder="Selecione" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-medium">Departamentos Envolvidos *</label>
                                <Input placeholder="Técnico, Custos, Jurídico..." />
                              </div>
                            </div>
                          </div>

                          {/* Botões */}
                          <div className="flex items-center justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={() => setCadastroOpen(false)}>
                              Cancelar
                            </Button>
                            <Button 
                              onClick={() => {
                                // Aqui vai a lógica de salvar
                                setCadastroOpen(false)
                                // TODO: Notificar departamentos
                              }}
                            >
                              Salvar e Notificar Departamentos
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-32">ID</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead>Obra</TableHead>
                      <TableHead className="text-right">Valor Inicial</TableHead>
                      <TableHead className="text-right">Valor Final</TableHead>
                      <TableHead>Responsável</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {propostasFiltradas.map((proposta) => {
                      const config = statusConfig[proposta.status as StatusProposta]
                      return (
                        <TableRow key={proposta.id} className="hover:bg-muted/50">
                          <TableCell className="font-mono text-xs font-medium">
                            {proposta.id}
                          </TableCell>
                          <TableCell className="font-medium">{proposta.cliente}</TableCell>
                          <TableCell className="text-sm">{proposta.obra}</TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrency(proposta.valorInicial)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {proposta.valorFinal > 0 ? formatCurrency(proposta.valorFinal) : "-"}
                          </TableCell>
                          <TableCell className="text-sm">{proposta.responsavel}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline" className={`text-xs ${config.bg} ${config.cor} border-0`}>
                              {config.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="gap-1.5"
                              onClick={() => verProposta(proposta.id)}
                            >
                              <Eye className="w-3 h-3" />
                              Ver Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>

                {propostasFiltradas.length === 0 && (
                  <div className="p-12 text-center">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm text-muted-foreground">
                      Nenhuma proposta encontrada
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
