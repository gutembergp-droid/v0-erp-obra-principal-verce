"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const auditorias = [
  { id: 1, processo: "Compras acima de R$ 100k", status: "Conforme", data: "15/12/2025", risco: "Baixo" },
  { id: 2, processo: "Controle de Ponto", status: "Pendente", data: "10/12/2025", risco: "Medio" },
  { id: 3, processo: "Gestao de Contratos", status: "Conforme", data: "05/12/2025", risco: "Baixo" },
  { id: 4, processo: "Seguranca do Trabalho", status: "Nao Conforme", data: "01/12/2025", risco: "Alto" },
]

export default function CompliancePage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Compliance & Processos</h1>
            <InfoTooltip
              title="Auditoria de Compliance"
              description="Verificacao de conformidade com normas, politicas internas e requisitos legais."
            />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Auditoria
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Processos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{auditorias.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Conformes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <p className="text-3xl font-bold text-green-500">
                  {auditorias.filter((a) => a.status === "Conforme").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <p className="text-3xl font-bold text-amber-500">
                  {auditorias.filter((a) => a.status === "Pendente").length}
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Nao Conformes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <p className="text-3xl font-bold text-red-500">
                  {auditorias.filter((a) => a.status === "Nao Conforme").length}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Processos Auditados</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Processo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Data</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Risco</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {auditorias.map((audit) => (
                  <tr key={audit.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{audit.processo}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{audit.data}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          audit.risco === "Alto" ? "destructive" : audit.risco === "Medio" ? "secondary" : "outline"
                        }
                      >
                        {audit.risco}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          audit.status === "Conforme"
                            ? "default"
                            : audit.status === "Pendente"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {audit.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
