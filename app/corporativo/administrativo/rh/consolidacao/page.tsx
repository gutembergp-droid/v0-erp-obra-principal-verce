"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { RHNav } from "@/components/rh/rh-nav"
import { FileText, Download, CheckCircle2, Eye, ChevronRight, Send, DollarSign, Users, Clock } from "lucide-react"

// ============================================
// DADOS MOCKADOS - CONSOLIDACAO CORPORATIVO
// ============================================

const consolidacaoMock = {
  periodo: "Janeiro/2026",
  totalColaboradores: 15,
  totalBruto: 185000.0,
  totalEncargos: 74000.0,
  totalBeneficios: 24425.0,
  totalLiquido: 283425.0,
  status: "em_aprovacao",
}

const colaboradoresFolha = [
  {
    id: 1,
    matricula: "CLT-C001",
    nome: "Ana Paula Ribeiro",
    cargo: "Analista de RH",
    salarioBase: 5500.0,
    he: 0,
    descontos: 550.0,
    liquido: 4950.0,
    status: "ok",
  },
  {
    id: 2,
    matricula: "CLT-C002",
    nome: "Ricardo Mendes",
    cargo: "Gerente Financeiro",
    salarioBase: 15000.0,
    he: 1260.0,
    descontos: 1500.0,
    liquido: 14760.0,
    status: "ok",
  },
  {
    id: 3,
    matricula: "CLT-C003",
    nome: "Fernanda Costa",
    cargo: "Assistente Administrativo",
    salarioBase: 3200.0,
    he: 0,
    descontos: 320.0,
    liquido: 2880.0,
    status: "pendente",
  },
  {
    id: 4,
    matricula: "CLT-C004",
    nome: "Patricia Almeida",
    cargo: "Diretora Administrativa",
    salarioBase: 30000.0,
    he: 4800.0,
    descontos: 3000.0,
    liquido: 31800.0,
    status: "ok",
  },
]

function ConsolidacaoContent() {
  const [selectedColaborador, setSelectedColaborador] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-100 text-green-800">OK</Badge>
      case "pendente":
        return <Badge className="bg-amber-100 text-amber-800">Pendente</Badge>
      case "bloqueado":
        return <Badge variant="destructive">Bloqueado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header com Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Previa de Folha - {consolidacaoMock.periodo}</CardTitle>
              <CardDescription>Consolidacao mensal do escritorio central</CardDescription>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Em Aprovacao</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Colaboradores</p>
                <p className="text-2xl font-bold">{consolidacaoMock.totalColaboradores}</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bruto</p>
                <p className="text-2xl font-bold">R$ {consolidacaoMock.totalBruto.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Encargos + Beneficios</p>
                <p className="text-2xl font-bold">
                  R$ {(consolidacaoMock.totalEncargos + consolidacaoMock.totalBeneficios).toLocaleString()}
                </p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total a Pagar</p>
                <p className="text-2xl font-bold text-primary">R$ {consolidacaoMock.totalLiquido.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acoes */}
      <div className="flex gap-2 justify-end">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
        <Button>
          <Send className="h-4 w-4 mr-2" />
          Enviar para Aprovacao
        </Button>
      </div>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Colaborador</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matricula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead className="text-right">Salario Base</TableHead>
                <TableHead className="text-right">HE</TableHead>
                <TableHead className="text-right">Descontos</TableHead>
                <TableHead className="text-right">Liquido</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Acoes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {colaboradoresFolha.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.matricula}</TableCell>
                  <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.cargo}</TableCell>
                  <TableCell className="text-right">R$ {item.salarioBase.toLocaleString()}</TableCell>
                  <TableCell className="text-right">R$ {item.he.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-red-600">-R$ {item.descontos.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">R$ {item.liquido.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedColaborador(item)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="flex justify-between w-full">
            <span className="font-medium">Total</span>
            <span className="font-bold">
              R$ {colaboradoresFolha.reduce((acc, c) => acc + c.liquido, 0).toLocaleString()}
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Fluxo de Aprovacao */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Fluxo de Aprovacao - Corporativo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm">RH</span>
            </div>
            <div className="flex-1 h-1 bg-green-200 mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm">Gerente Adm</span>
            </div>
            <div className="flex-1 h-1 bg-muted mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm text-muted-foreground">Pagamento</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sheet Detalhe */}
      <Sheet open={!!selectedColaborador} onOpenChange={() => setSelectedColaborador(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Detalhe do Colaborador</SheetTitle>
            <SheetDescription>{selectedColaborador?.nome}</SheetDescription>
          </SheetHeader>
          {selectedColaborador && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Matricula</p>
                  <p className="font-medium">{selectedColaborador.matricula}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cargo</p>
                  <p className="font-medium">{selectedColaborador.cargo}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salario Base</p>
                  <p className="font-medium">R$ {selectedColaborador.salarioBase.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horas Extras</p>
                  <p className="font-medium">R$ {selectedColaborador.he.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Descontos</p>
                  <p className="font-medium text-red-600">-R$ {selectedColaborador.descontos.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Liquido</p>
                  <p className="font-bold">R$ {selectedColaborador.liquido.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function ConsolidacaoCorporativoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <RHNav modulo="corporativo" />
      <main className="flex-1 container py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/corporativo" className="hover:text-foreground">
              Corporativo
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/corporativo/administrativo" className="hover:text-foreground">
              Administrativo
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/corporativo/administrativo/rh" className="hover:text-foreground">
              RH
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Consolidacao</span>
          </div>
          <h1 className="text-2xl font-bold">Consolidacao - Corporativo</h1>
          <p className="text-muted-foreground">Previa de folha do escritorio central</p>
        </div>
        <Suspense fallback={<div>Carregando...</div>}>
          <ConsolidacaoContent />
        </Suspense>
      </main>
    </div>
  )
}
