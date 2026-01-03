"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileCheck, Upload, AlertTriangle, CheckCircle2 } from "lucide-react"

const atividades = [
  {
    id: "1",
    tipo: "baseline",
    descricao: "Baseline v2 homologada",
    obra: "BR-101 - Trecho Sul",
    tempo: "2 min atrás",
    icon: FileCheck,
    color: "text-chart-4",
  },
  {
    id: "2",
    tipo: "upload",
    descricao: "Planilha analítica enviada",
    obra: "Ponte Rio Paraná",
    tempo: "15 min atrás",
    icon: Upload,
    color: "text-primary",
  },
  {
    id: "3",
    tipo: "alerta",
    descricao: "Gate 5 pendente há 3 dias",
    obra: "Barragem Santa Clara",
    tempo: "1 hora atrás",
    icon: AlertTriangle,
    color: "text-destructive",
  },
  {
    id: "4",
    tipo: "aprovacao",
    descricao: "Medição aprovada",
    obra: "Saneamento Norte",
    tempo: "2 horas atrás",
    icon: CheckCircle2,
    color: "text-chart-2",
  },
]

export function AtividadesRecentes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {atividades.map((atividade) => {
            const Icon = atividade.icon
            return (
              <div key={atividade.id} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Icon className={`w-4 h-4 ${atividade.color}`} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="text-sm font-medium">{atividade.descricao}</p>
                  <p className="text-xs text-muted-foreground">{atividade.obra}</p>
                  <p className="text-xs text-muted-foreground">{atividade.tempo}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
