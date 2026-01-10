"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TreePine, Plus, Droplets, Wind, Recycle, HeartHandshake } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

export default function MeioAmbienteSocialPage() {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Meio Ambiente & Social</h1>
            <InfoTooltip
              title="QSMS - Meio Ambiente e Social"
              description="Gestao ambiental, licenciamento, responsabilidade social e sustentabilidade."
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
              <CardTitle className="text-sm font-medium text-muted-foreground">Licencas Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TreePine className="w-5 h-5 text-green-500" />
                <p className="text-3xl font-bold text-green-500">12</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Residuos Reciclados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Recycle className="w-5 h-5 text-primary" />
                <p className="text-3xl font-bold">85%</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Acoes Sociais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-pink-500" />
                <p className="text-3xl font-bold">8</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Monitoramentos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Meio Ambiente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Monitoramento Hidrico</span>
                </div>
                <Badge variant="default">Conforme</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-gray-500" />
                  <span>Qualidade do Ar</span>
                </div>
                <Badge variant="default">Conforme</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Recycle className="w-4 h-4 text-green-500" />
                  <span>PGRS Atualizado</span>
                </div>
                <Badge variant="secondary">Pendente</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Responsabilidade Social</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Contratacao Local</span>
                <Badge variant="default">78%</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Capacitacao Comunidade</span>
                <Badge variant="default">45 pessoas</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span>Projetos Sociais Ativos</span>
                <Badge variant="secondary">3</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
