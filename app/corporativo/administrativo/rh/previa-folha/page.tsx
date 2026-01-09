"use client"

import { useState, Suspense } from "react"
import { RHNav } from "@/components/rh/rh-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  DollarSign,
  Users,
  AlertTriangle,
  Download,
  CheckCircle2,
  ArrowRight,
  Building2,
  ChevronRight,
  Send,
} from "lucide-react"

// Fluxo corporativo: RH -> Gerente Administrativo -> Pagamento
const statusFluxoCorporativo = [
  { id: 1, nome: "Rascunho", descricao: "RH" },
  { id: 2, nome: "Consolidada", descricao: "RH" },
  { id: 3, nome: "Aprovada", descricao: "Gerente Adm" },
  { id: 4, nome: "Em Pagamento", descricao: "Financeiro" },
  { id: 5, nome: "Paga", descricao: "Encerrada" },
]

const statusAtual = { etapa: 2 }

const previaFolhaMock = [
  {
    id: 1,
    matricula: "CLT-C001",
    nome: "Fernanda Oliveira Silva",
    vinculo: "CLT",
    setor: "RH",
    salarioBase: 6500,
    beneficios: 1200,
    encargos: 2925,
    total: 10625,
    status: "ok",
  },
  {
    id: 2,
    matricula: "CLT-C002",
    nome: "Ricardo Mendes Santos",
    vinculo: "CLT",
    setor: "Administrativo",
    salarioBase: 15000,
    beneficios: 2500,
    encargos: 6750,
    total: 24250,
    status: "ok",
  },
  {
    id: 3,
    matricula: "CLT-C003",
    nome: "Mariana Costa Lima",
    vinculo: "CLT",
    setor: "Financeiro",
    salarioBase: 7500,
    beneficios: 1200,
    encargos: 3375,
    total: 12075,
    status: "alerta",
  },
  {
    id: 4,
    matricula: "CLT-C004",
    nome: "Paulo Roberto Alves",
    vinculo: "CLT",
    setor: "Diretoria",
    salarioBase: 30000,
    beneficios: 3500,
    encargos: 13500,
    total: 47000,
    status: "ok",
  },
]

function PreviaFolhaCorporativoContent() {
  const [showConsolidarDialog, setShowConsolidarDialog] = useState(false)

  const totalFolha = previaFolhaMock.reduce((acc, c) => acc + c.total, 0)
  const totalColaboradores = previaFolhaMock.length
  const totalAlertas = previaFolhaMock.filter((c) => c.status === "alerta").length

  return (
    <div className="flex-1 space-y-6 p-6">
      <RHNav modulo="corporativo" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Building2 className="h-4 w-4" />
            <span>Corporativo</span>
            <ChevronRight className="h-4 w-4" />
            <span>Administrativo</span>
            <ChevronRight className="h-4 w-4" />
            <span>RH</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Previa de Folha</span>
          </div>
          <h1 className="text-2xl font-bold">Previa de Folha - Corporativo</h1>
          <p className="text-muted-foreground">Consolidacao da folha do escritorio central</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => setShowConsolidarDialog(true)}>
            <Send className="h-4 w-4 mr-2" />
            Enviar para Aprovacao
          </Button>
        </div>
      </div>

      {/* Stepper de Status - Fluxo Corporativo */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            {statusFluxoCorporativo.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step.id < statusAtual.etapa
                        ? "bg-green-600 text-white"
                        : step.id === statusAtual.etapa
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < statusAtual.etapa ? <CheckCircle2 className="h-4 w-4" /> : step.id}
                  </div>
                  <span className="text-xs mt-1 text-center">{step.nome}</span>
                  <span className="text-xs text-muted-foreground">{step.descricao}</span>
                </div>
                {index < statusFluxoCorporativo.length - 1 && (
                  <ArrowRight className="h-4 w-4 mx-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Folha</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalFolha.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Colaboradores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalColaboradores}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{totalAlertas}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Consolidada
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matricula</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Vinculo</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead className="text-right">Salario Base</TableHead>
                <TableHead className="text-right">Beneficios</TableHead>
                <TableHead className="text-right">Encargos</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {previaFolhaMock.map((colaborador) => (
                <TableRow key={colaborador.id}>
                  <TableCell className="font-mono text-sm">{colaborador.matricula}</TableCell>
                  <TableCell className="font-medium">{colaborador.nome}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{colaborador.vinculo}</Badge>
                  </TableCell>
                  <TableCell>{colaborador.setor}</TableCell>
                  <TableCell className="text-right">R$ {colaborador.salarioBase.toLocaleString()}</TableCell>
                  <TableCell className="text-right">R$ {colaborador.beneficios.toLocaleString()}</TableCell>
                  <TableCell className="text-right">R$ {colaborador.encargos.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-bold">R$ {colaborador.total.toLocaleString()}</TableCell>
                  <TableCell>
                    {colaborador.status === "ok" ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        OK
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Alerta
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rodape - Fluxo Corporativo */}
      <Card className="bg-muted/50">
        <CardContent className="py-3">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Fluxo Corporativo:</span>
            <span>RH</span>
            <ArrowRight className="h-4 w-4" />
            <span>Gerente Administrativo</span>
            <ArrowRight className="h-4 w-4" />
            <span>Pagamento</span>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Consolidar */}
      <Dialog open={showConsolidarDialog} onOpenChange={setShowConsolidarDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar para Aprovacao</DialogTitle>
            <DialogDescription>A folha sera enviada para aprovacao do Gerente Administrativo</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Observacoes (opcional)</p>
              <Textarea placeholder="Adicione observacoes sobre esta folha..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConsolidarDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setShowConsolidarDialog(false)}>Enviar para Aprovacao</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function PreviaFolhaCorporativoPage() {
  return (
    <Suspense fallback={<div className="p-6">Carregando...</div>}>
      <PreviaFolhaCorporativoContent />
    </Suspense>
  )
}
