"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"

const gates = [
  { nome: "Gate 1", descricao: "Liberação da Obra", status: "aprovado" },
  { nome: "Gate 2", descricao: "Fechamento de Produção", status: "aprovado" },
  { nome: "Gate 3", descricao: "Fechamento de Custos", status: "aprovado" },
  { nome: "Gate 4", descricao: "Fechamento Comercial", status: "pendente" },
  { nome: "Gate 5", descricao: "Qualidade OK", status: "trava", isTrava: true },
  { nome: "Gate 6", descricao: "SST OK", status: "trava", isTrava: true },
  { nome: "Gate 7", descricao: "Financeiro OK", status: "bloqueado" },
  { nome: "Gate 8", descricao: "Gerencial OK", status: "bloqueado" },
  { nome: "Gate 9", descricao: "Competência Concluída", status: "bloqueado" },
]

const statusConfig = {
  aprovado: {
    icon: CheckCircle2,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    label: "Aprovado",
  },
  pendente: {
    icon: Clock,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
    label: "Pendente",
  },
  trava: {
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
    label: "Trava",
  },
  bloqueado: {
    icon: XCircle,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    label: "Bloqueado",
  },
}

export function GatesStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Gates - Competência Jan/2026</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {gates.map((gate) => {
            const config = statusConfig[gate.status as keyof typeof statusConfig]
            const Icon = config.icon
            return (
              <div
                key={gate.nome}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className={`p-1.5 rounded-md ${config.bgColor}`}>
                  <Icon className={`w-3.5 h-3.5 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{gate.nome}</span>
                    {gate.isTrava && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                        TRAVA
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{gate.descricao}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
