"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileSearch, Plus, Calendar, User } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const auditoriasCampo = [
  { id: 1, obra: "BR-101 Lote 2", auditor: "Carlos Mendes", data: "20/12/2025", itens: 45, conformes: 42 },
  { id: 2, obra: "Esgotamento Metro", auditor: "Ana Paula", data: "18/12/2025", itens: 38, conformes: 35 },
  { id: 3, obra: "UHE Belo Monte", auditor: "Roberto Silva", data: "15/12/2025", itens: 52, conformes: 50 },
]

export default function AuditoriaCampoPage() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Auditoria de Campo</h1>
            <InfoTooltip
              title="Auditorias In Loco"
              description="Verificacoes presenciais nas obras, checklist de conformidade e registros fotograficos."
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Auditorias Realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{auditoriasCampo.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Itens Verificados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{auditoriasCampo.reduce((acc, a) => acc + a.itens, 0)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Taxa Conformidade</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">
                {Math.round(
                  (auditoriasCampo.reduce((acc, a) => acc + a.conformes, 0) /
                    auditoriasCampo.reduce((acc, a) => acc + a.itens, 0)) *
                    100,
                )}
                %
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Proxima Auditoria</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">22/12/2025</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historico de Auditorias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditoriasCampo.map((audit) => (
                <div
                  key={audit.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileSearch className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{audit.obra}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {audit.auditor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {audit.data}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {audit.conformes}/{audit.itens} conformes
                      </p>
                      <p className="font-medium text-green-500">{Math.round((audit.conformes / audit.itens) * 100)}%</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Relatorio
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
