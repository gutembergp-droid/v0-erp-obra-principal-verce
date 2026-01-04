"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { PieChart, DollarSign, TrendingUp, AlertTriangle } from "lucide-react"

export default function ControladoriaPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <PieChart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Controladoria Central</h1>
              <p className="text-sm text-muted-foreground">Controle financeiro e compliance corporativo</p>
            </div>
            <InfoTooltip
              title="Controladoria Central"
              description="Gestao centralizada de orcamentos, custos, auditorias e compliance de todas as obras."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Orcamento Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">R$ 45M</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Executado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold">R$ 32M</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Variacao</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold">-2.3%</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alertas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Painel de Controle Financeiro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Modulo em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
