"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { DoorOpen, Users, Clock, ShieldCheck } from "lucide-react"

export default function GestaoAcessosPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <DoorOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gestao de Acessos</h1>
              <p className="text-sm text-muted-foreground">Controle de catracas e acessos as obras</p>
            </div>
            <InfoTooltip
              title="Gestao de Acessos"
              description="Controle centralizado de catracas, biometria, crachas e permissoes de acesso a todas as obras."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Acessos Hoje</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DoorOpen className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">287</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Colaboradores Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold">156</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hora Pico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold">07:30</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bloqueios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold">2</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monitoramento de Catracas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Modulo em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
