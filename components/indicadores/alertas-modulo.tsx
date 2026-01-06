"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, AlertCircle, Info, ChevronRight } from "lucide-react"

interface Alerta {
  tipo: "critico" | "atencao" | "info"
  codigo: string
  msg: string
  acao: string
}

interface AlertasModuloProps {
  alertas: Alerta[]
  onAlertaClick?: (alerta: Alerta) => void
}

export function AlertasModulo({ alertas, onAlertaClick }: AlertasModuloProps) {
  const getAlertaConfig = (tipo: string) => {
    switch (tipo) {
      case "critico":
        return { icone: AlertTriangle, cor: "text-red-600", bg: "bg-red-500/10", border: "border-red-500/30" }
      case "atencao":
        return { icone: AlertCircle, cor: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/30" }
      default:
        return { icone: Info, cor: "text-blue-600", bg: "bg-blue-500/10", border: "border-blue-500/30" }
    }
  }

  const criticos = alertas.filter((a) => a.tipo === "critico").length
  const atencao = alertas.filter((a) => a.tipo === "atencao").length

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">Alertas do Módulo</CardTitle>
              <p className="text-xs text-muted-foreground">Ações requeridas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {criticos > 0 && (
              <Badge variant="destructive" className="text-xs">
                {criticos} crítico{criticos > 1 ? "s" : ""}
              </Badge>
            )}
            {atencao > 0 && (
              <Badge variant="outline" className="text-xs text-amber-600 border-amber-500">
                {atencao} atenção
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {alertas.map((alerta, i) => {
            const config = getAlertaConfig(alerta.tipo)
            const Icone = config.icone
            return (
              <div
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg border ${config.bg} ${config.border} cursor-pointer hover:shadow-sm transition-all`}
                onClick={() => onAlertaClick?.(alerta)}
              >
                <div className="flex items-center gap-3">
                  <Icone className={`h-4 w-4 ${config.cor}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs font-mono">
                        {alerta.codigo}
                      </Badge>
                      <span className="text-sm">{alerta.msg}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{alerta.acao}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
