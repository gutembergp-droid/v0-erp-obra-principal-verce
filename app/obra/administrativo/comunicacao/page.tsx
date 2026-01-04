"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Megaphone, Mail, Bell, Users } from "lucide-react"

export default function ComunicacaoPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Megaphone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Comunicacao</h1>
              <p className="text-sm text-muted-foreground">Gestao de comunicados e informativos</p>
            </div>
            <InfoTooltip
              title="Setor de Comunicacao"
              description="Gerencia comunicados internos, murais digitais, avisos e campanhas de endomarketing."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Comunicados Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-primary" />
                <span className="text-2xl font-bold">8</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Emails Enviados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold">156</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Notificacoes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <span className="text-2xl font-bold">42</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Alcance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold">89%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Mural Digital</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Modulo em desenvolvimento...</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
