"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Eye, FileText } from "lucide-react"
import { ComercialNavbar } from "../_components/comercial-navbar"
import { KPIsPropostas } from "./_components/kpis-propostas"

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
  const [propostas, setPropostas] = useState(propostasMock)

  // Carregar propostas do LocalStorage
  useEffect(() => {
    const propostasLocalStorage = JSON.parse(localStorage.getItem("propostas") || "[]")
    if (propostasLocalStorage.length > 0) {
      // Combinar propostas do LocalStorage com as mock
      setPropostas([...propostasLocalStorage, ...propostasMock])
    }
  }, [])

  // Filtrar propostas
  const propostasFiltradas = propostas.filter(p => 
    p.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    p.obra.toLowerCase().includes(busca.toLowerCase()) ||
    p.id.toLowerCase().includes(busca.toLowerCase())
  )

  // Calcular KPIs
  const kpis = {
    total: propostas.length,
    emProgresso: propostas.filter(p => p.status === "em_cadastro" || p.status === "em_revisao" || p.status === "em_analise").length,
    consolidadas: propostas.filter(p => p.status === "consolidada").length,
    enviadas: propostas.filter(p => p.status === "enviada").length,
    valorTotal: propostas.reduce((acc, p) => acc + p.valorInicial, 0),
    // Breakdown por status
    valorEnviado: propostas.filter(p => p.status === "enviada").reduce((acc, p) => acc + p.valorInicial, 0),
    valorElaboracao: propostas.filter(p => p.status === "em_cadastro" || p.status === "em_revisao").reduce((acc, p) => acc + p.valorInicial, 0),
    valorMonitoramento: propostas.filter(p => p.status === "em_analise" || p.status === "consolidada").reduce((acc, p) => acc + p.valorInicial, 0),
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
    router.push(`/corporativo/comercial/propostas/${id}/elaboracao`)
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* TOPBAR SECUNDÁRIO */}
      <div className="flex-shrink-0 z-50">
        <ComercialNavbar />
      </div>

      {/* Conteúdo Principal - SEM SCROLL (scroll fica na moldura) */}
      <main className="flex-1 overflow-hidden bg-background mt-3 p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', padding: '25px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
            {/* KPIs PROFISSIONAIS */}
            <KPIsPropostas kpis={kpis} />

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
                    <Button className="gap-2" onClick={() => router.push("/corporativo/comercial/propostas/nova")}>
                      <Plus className="w-4 h-4" />
                      Nova Proposta
                    </Button>
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
        </div>
      </main>

      {/* CSS Global para esconder scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
