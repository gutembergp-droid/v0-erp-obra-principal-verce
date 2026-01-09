"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, AlertTriangle, CheckCircle2, HardHat } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

export default function QualidadeSegurancaPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Qualidade & Seguranca</h1>
            <InfoTooltip
              title="QSMS - Qualidade e Seguranca"
              description="Gestao integrada de qualidade e seguranca do trabalho em todas as obras."
            />
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Registro
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">FVS Aprovadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <p className="text-3xl font-bold text-green-500">156</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Nao Conformidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <p className="text-3xl font-bold text-amber-500">12</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Dias Sem Acidentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <HardHat className="w-5 h-5 text-primary" />
                <p className="text-3xl font-bold">127</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Treinamentos Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">45</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Qualidade</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>FVS Pendentes Aprovacao</span>
                <Badge>8</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>NC Abertas</span>
                <Badge variant="destructive">5</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Ensaios Programados</span>
                <Badge variant="secondary">12</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Seguranca do Trabalho</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>DDS Realizados (Mes)</span>
                <Badge variant="default">89</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Incidentes Reportados</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>EPIs Vencendo</span>
                <Badge variant="destructive">15</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
