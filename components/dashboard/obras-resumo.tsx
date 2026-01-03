"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

const obras = [
  {
    id: "1",
    nome: "BR-101 - Duplicação Trecho Sul",
    cliente: "DNIT",
    status: "em_execucao",
    progresso: 68,
    valor: "R$ 245.000.000",
    gate: "Gate 4 - Fechamento Comercial",
  },
  {
    id: "2",
    nome: "Ponte Rio Paraná",
    cliente: "DER-PR",
    status: "em_execucao",
    progresso: 42,
    valor: "R$ 89.500.000",
    gate: "Gate 3 - Fechamento de Custos",
  },
  {
    id: "3",
    nome: "Barragem Santa Clara",
    cliente: "CESP",
    status: "planejamento",
    progresso: 15,
    valor: "R$ 320.000.000",
    gate: "Gate 1 - Liberação da Obra",
  },
  {
    id: "4",
    nome: "Saneamento Básico - Região Norte",
    cliente: "SABESP",
    status: "em_execucao",
    progresso: 85,
    valor: "R$ 56.000.000",
    gate: "Gate 7 - Financeiro OK",
  },
]

const statusConfig = {
  em_execucao: { label: "Em Execução", variant: "default" as const },
  planejamento: { label: "Planejamento", variant: "secondary" as const },
  pausada: { label: "Pausada", variant: "outline" as const },
  concluida: { label: "Concluída", variant: "default" as const },
}

export function ObrasResumo() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">Obras em Andamento</CardTitle>
        <Button size="sm" asChild>
          <Link href="/corporativo/obras">
            <Plus className="w-4 h-4 mr-2" />
            Nova Obra
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {obras.map((obra) => {
            const status = statusConfig[obra.status as keyof typeof statusConfig]
            return (
              <div
                key={obra.id}
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{obra.nome}</h3>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{obra.cliente}</span>
                    <span className="text-primary font-medium">{obra.valor}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{obra.gate}</span>
                      <span className="font-medium">{obra.progresso}%</span>
                    </div>
                    <Progress value={obra.progresso} className="h-2" />
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`/obra/comercial?obra=${obra.id}`}>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
