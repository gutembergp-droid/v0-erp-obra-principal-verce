"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Circle, RotateCcw } from "lucide-react"

interface EtapaCiclo {
  etapa: string
  status: "concluido" | "em_andamento" | "pendente"
  data: string
}

interface CicloGovernancaProps {
  etapas: EtapaCiclo[]
}

export function CicloGovernanca({ etapas }: CicloGovernancaProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "concluido":
        return <CheckCircle className="h-4 w-4 text-emerald-600" />
      case "em_andamento":
        return <Clock className="h-4 w-4 text-amber-600" />
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getStatusBg = (status: string) => {
    switch (status) {
      case "concluido":
        return "bg-emerald-500"
      case "em_andamento":
        return "bg-amber-500"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <RotateCcw className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold">Ciclo de Governança</CardTitle>
            <p className="text-xs text-muted-foreground">Processo de controle contínuo</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          {etapas.map((etapa, i) => (
            <div key={i} className="flex flex-col items-center gap-2 flex-1">
              {/* Conexão */}
              {i > 0 && (
                <div
                  className={`absolute h-0.5 w-full -left-1/2 top-4 ${
                    etapa.status === "concluido" ? "bg-emerald-500" : "bg-muted"
                  }`}
                />
              )}
              {/* Ícone */}
              <div
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${getStatusBg(
                  etapa.status,
                )}/20 border-2 ${
                  etapa.status === "concluido"
                    ? "border-emerald-500"
                    : etapa.status === "em_andamento"
                      ? "border-amber-500"
                      : "border-muted"
                }`}
              >
                {getStatusIcon(etapa.status)}
              </div>
              {/* Label */}
              <div className="text-center">
                <p className="text-[10px] font-medium leading-tight">{etapa.etapa}</p>
                <p className="text-[9px] text-muted-foreground">{etapa.data}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
