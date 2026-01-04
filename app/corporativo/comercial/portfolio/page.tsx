"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, MapPin, DollarSign, TrendingUp } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const obras = [
  { id: 1, nome: "BR-101 Lote 2", cliente: "DNIT", local: "SC/RS", valor: 450, avanco: 67, status: "Execucao" },
  {
    id: 2,
    nome: "Esgotamento Sanitario Metro",
    cliente: "SABESP",
    local: "SP",
    valor: 180,
    avanco: 45,
    status: "Execucao",
  },
  {
    id: 3,
    nome: "UHE Belo Monte - Comp",
    cliente: "Furnas",
    local: "PA",
    valor: 890,
    avanco: 92,
    status: "Finalizacao",
  },
  { id: 4, nome: "Restauracao SP-330", cliente: "CCR", local: "SP", valor: 95, avanco: 12, status: "Mobilizacao" },
]

export default function PortfolioObrasPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Portfolio de Obras</h1>
          <InfoTooltip
            title="Gestao do Portfolio"
            description="Visao consolidada de todas as obras da empresa, status, avanco fisico e financeiro."
          />
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Nova Obra
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Obras</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{obras.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total Carteira</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">
              R$ {obras.reduce((acc, o) => acc + o.valor, 0).toLocaleString()} Mi
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Execucao</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">{obras.filter((o) => o.status === "Execucao").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avanco Medio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">
              {Math.round(obras.reduce((acc, o) => acc + o.avanco, 0) / obras.length)}%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {obras.map((obra) => (
          <Card key={obra.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{obra.nome}</h3>
                  <p className="text-sm text-muted-foreground">{obra.cliente}</p>
                </div>
                <Badge
                  variant={
                    obra.status === "Execucao" ? "default" : obra.status === "Finalizacao" ? "secondary" : "outline"
                  }
                >
                  {obra.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{obra.local}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span>R$ {obra.valor} Mi</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  <span>{obra.avanco}%</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Avanco Fisico</span>
                  <span>{obra.avanco}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${obra.avanco}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
