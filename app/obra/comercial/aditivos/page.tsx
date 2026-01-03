"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, TrendingDown, Scale, Clock } from "lucide-react"

const aditivos = [
  {
    id: "ADT-001",
    descricao: "Ampliacao de escopo - Drenagem adicional",
    tipo: "Acrescimo",
    valor: 450000,
    status: "Aprovado",
    data: "10/01/2025",
  },
  {
    id: "ADT-002",
    descricao: "Reducao de pavimentacao trecho norte",
    tipo: "Supressao",
    valor: -180000,
    status: "Aprovado",
    data: "15/01/2025",
  },
  {
    id: "ADT-003",
    descricao: "Inclusao de obras de arte especiais",
    tipo: "Acrescimo",
    valor: 890000,
    status: "Em Analise",
    data: "20/01/2025",
  },
  {
    id: "ADT-004",
    descricao: "Ajuste de terraplanagem",
    tipo: "Acrescimo",
    valor: 125000,
    status: "Pendente",
    data: "25/01/2025",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Math.abs(value))
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Aprovado":
      return <Badge className="bg-green-100 text-green-800">Aprovado</Badge>
    case "Em Analise":
      return <Badge className="bg-yellow-100 text-yellow-800">Em Analise</Badge>
    case "Pendente":
      return <Badge className="bg-gray-100 text-gray-800">Pendente</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export default function AditivosPage() {
  const totalAcrescimos = aditivos
    .filter((a) => a.tipo === "Acrescimo" && a.status === "Aprovado")
    .reduce((sum, a) => sum + a.valor, 0)

  const totalSupressoes = aditivos
    .filter((a) => a.tipo === "Supressao" && a.status === "Aprovado")
    .reduce((sum, a) => sum + Math.abs(a.valor), 0)

  const saldoLiquido = totalAcrescimos - totalSupressoes

  const emAnalise = aditivos.filter((a) => a.status === "Em Analise").length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gestao de Aditivos</h1>
          <p className="text-muted-foreground">Controle de alteracoes contratuais</p>
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
              <span className="text-2xl font-bold text-green-600">{formatCurrency(totalAcrescimos)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Supressoes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-2xl font-bold text-red-600">{formatCurrency(totalSupressoes)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Liquido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-blue-600" />
              <span className="text-2xl font-bold text-blue-600">{formatCurrency(saldoLiquido)}</span>
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
          <CardTitle>Lista de Aditivos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Descricao</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
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
                    <Badge variant={aditivo.tipo === "Acrescimo" ? "default" : "secondary"}>{aditivo.tipo}</Badge>
                  </TableCell>
                  <TableCell className={aditivo.valor >= 0 ? "text-green-600" : "text-red-600"}>
                    {aditivo.valor >= 0 ? "+" : "-"} {formatCurrency(aditivo.valor)}
                  </TableCell>
                  <TableCell>{getStatusBadge(aditivo.status)}</TableCell>
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
