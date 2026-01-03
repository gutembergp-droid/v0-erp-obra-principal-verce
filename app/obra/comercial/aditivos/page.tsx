"use client"

import { Suspense } from "react"
import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter, FileText, TrendingUp, TrendingDown, Clock } from "lucide-react"

const aditivos = [
  {
    id: "ADT-001",
    descricao: "Acrescimo de servicos de drenagem",
    tipo: "Acrescimo",
    valor: 450000,
    status: "Aprovado",
    data: "15/01/2025",
    impactoPrazo: "+30 dias",
  },
  {
    id: "ADT-002",
    descricao: "Supressao de pavimentacao trecho B",
    tipo: "Supressao",
    valor: -180000,
    status: "Em Analise",
    data: "20/01/2025",
    impactoPrazo: "-15 dias",
  },
  {
    id: "ADT-003",
    descricao: "Reequilibrio economico-financeiro",
    tipo: "Reequilibrio",
    valor: 320000,
    status: "Pendente",
    data: "25/01/2025",
    impactoPrazo: "0 dias",
  },
  {
    id: "ADT-004",
    descricao: "Alteracao de projeto estrutural",
    tipo: "Acrescimo",
    valor: 275000,
    status: "Aprovado",
    data: "28/01/2025",
    impactoPrazo: "+45 dias",
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "Aprovado":
      return "bg-green-100 text-green-800"
    case "Em Analise":
      return "bg-yellow-100 text-yellow-800"
    case "Pendente":
      return "bg-gray-100 text-gray-800"
    case "Rejeitado":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getTipoColor(tipo: string) {
  switch (tipo) {
    case "Acrescimo":
      return "bg-blue-100 text-blue-800"
    case "Supressao":
      return "bg-orange-100 text-orange-800"
    case "Reequilibrio":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function AditivosContent() {
  const [searchTerm, setSearchTerm] = useState("")

  const totalAcrescimos = aditivos.filter((a) => a.valor > 0).reduce((acc, a) => acc + a.valor, 0)
  const totalSupressoes = aditivos.filter((a) => a.valor < 0).reduce((acc, a) => acc + Math.abs(a.valor), 0)
  const saldoLiquido = totalAcrescimos - totalSupressoes
  const emAnalise = aditivos.filter((a) => a.status === "Em Analise").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestao de Aditivos</h1>
          <p className="text-muted-foreground">Controle de alteracoes de escopo, preco e prazo</p>
        </div>
        <Button className="bg-primary">
          <Plus className="h-4 w-4 mr-2" />
          Novo Aditivo
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Acrescimos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-2xl font-bold text-green-600">R$ {totalAcrescimos.toLocaleString("pt-BR")}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Supressoes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-orange-600" />
              <span className="text-2xl font-bold text-orange-600">R$ {totalSupressoes.toLocaleString("pt-BR")}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Liquido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">R$ {saldoLiquido.toLocaleString("pt-BR")}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Analise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-600">{emAnalise}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Aditivos</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar aditivo..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="todos">
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="aprovado">Aprovado</SelectItem>
                  <SelectItem value="analise">Em Analise</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Descricao</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Impacto Prazo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {aditivos.map((aditivo) => (
                <TableRow key={aditivo.id}>
                  <TableCell className="font-medium">{aditivo.id}</TableCell>
                  <TableCell>{aditivo.descricao}</TableCell>
                  <TableCell>
                    <Badge className={getTipoColor(aditivo.tipo)}>{aditivo.tipo}</Badge>
                  </TableCell>
                  <TableCell className={aditivo.valor >= 0 ? "text-green-600" : "text-orange-600"}>
                    {aditivo.valor >= 0 ? "+" : "-"} R$ {Math.abs(aditivo.valor).toLocaleString("pt-BR")}
                  </TableCell>
                  <TableCell>{aditivo.impactoPrazo}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(aditivo.status)}>{aditivo.status}</Badge>
                  </TableCell>
                  <TableCell>{aditivo.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AditivosPage() {
  return (
    <AppLayout>
      <Suspense fallback={null}>
        <AditivosContent />
      </Suspense>
    </AppLayout>
  )
}
