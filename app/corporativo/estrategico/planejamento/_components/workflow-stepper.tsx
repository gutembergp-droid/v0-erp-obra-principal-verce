"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { EtapaCiclo } from "@/lib/types/planejamento"

interface WorkflowStepperProps {
  etapaAtual: EtapaCiclo
  etapasConcluidas: EtapaCiclo[]
}

const ETAPAS = [
  { id: "pestel" as EtapaCiclo, nome: "PESTEL", descricao: "Análise Externa" },
  { id: "swot" as EtapaCiclo, nome: "SWOT", descricao: "Posicionamento" },
  { id: "gut" as EtapaCiclo, nome: "GUT", descricao: "Priorização" },
  { id: "bcg" as EtapaCiclo, nome: "BCG", descricao: "Portfólio" },
  { id: "okrs" as EtapaCiclo, nome: "OKRs", descricao: "Execução" },
  { id: "monitoramento" as EtapaCiclo, nome: "Monitor", descricao: "Acompanhamento" },
  { id: "encerramento" as EtapaCiclo, nome: "Encerrar", descricao: "Conclusão" },
]

export function WorkflowStepper({ etapaAtual, etapasConcluidas }: WorkflowStepperProps) {
  const getStatusEtapa = (etapaId: EtapaCiclo) => {
    if (etapasConcluidas.includes(etapaId)) return "concluida"
    if (etapaId === etapaAtual) return "ativa"
    return "pendente"
  }

  return (
    <div className="w-full py-3">
      <div className="flex items-center justify-between relative">
        {/* Linha de progresso */}
        <div className="absolute top-3 left-0 right-0 h-0.5 bg-border" style={{ zIndex: 0 }}>
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{
              width: `${(etapasConcluidas.length / (ETAPAS.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Etapas */}
        {ETAPAS.map((etapa, index) => {
          const status = getStatusEtapa(etapa.id)

          return (
            <div key={etapa.id} className="flex flex-col items-center relative" style={{ zIndex: 1 }}>
              {/* Círculo da etapa */}
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                  "transition-all duration-300",
                  status === "concluida" && "bg-primary text-primary-foreground",
                  status === "ativa" && "bg-primary text-primary-foreground ring-2 ring-primary/30",
                  status === "pendente" && "bg-background border border-muted text-muted-foreground"
                )}
              >
                {status === "concluida" ? <Check className="w-3 h-3" /> : <span className="text-xs font-semibold">{index + 1}</span>}
              </div>

              {/* Nome da etapa */}
              <div className="mt-1 text-center">
                <p
                  className={cn(
                    "text-xs font-medium transition-colors",
                    status === "ativa" && "text-primary",
                    status === "concluida" && "text-foreground",
                    status === "pendente" && "text-muted-foreground"
                  )}
                >
                  {etapa.nome}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
