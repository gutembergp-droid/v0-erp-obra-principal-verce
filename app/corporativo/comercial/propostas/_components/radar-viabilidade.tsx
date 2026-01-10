"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts"
import type { AnaliseViabilidade } from "@/lib/types/proposta"

// ============================================================================
// COMPONENT - RADAR DE VIABILIDADE (6 PILARES)
// ============================================================================

interface RadarViabilidadeProps {
  analise: AnaliseViabilidade
}

export function RadarViabilidade({ analise }: RadarViabilidadeProps) {
  // Preparar dados para o Recharts
  const data = [
    {
      pilar: "Técnica",
      score: analise.pilares.tecnica.score,
      fullMark: 10,
    },
    {
      pilar: "Operacional",
      score: analise.pilares.operacional.score,
      fullMark: 10,
    },
    {
      pilar: "Financeira",
      score: analise.pilares.financeira.score,
      fullMark: 10,
    },
    {
      pilar: "Econômica",
      score: analise.pilares.economica.score,
      fullMark: 10,
    },
    {
      pilar: "Jurídica",
      score: analise.pilares.juridica.score,
      fullMark: 10,
    },
    {
      pilar: "Risco",
      score: analise.pilares.risco.score,
      fullMark: 10,
    },
  ]

  // Calcular média
  const media = data.reduce((acc, curr) => acc + curr.score, 0) / data.length

  // Cor e label da conclusão
  const conclusaoConfig = {
    viavel: { cor: "bg-emerald-600", label: "VIÁVEL", textColor: "text-emerald-900" },
    viavel_com_ressalvas: { cor: "bg-amber-600", label: "VIÁVEL COM RESSALVAS", textColor: "text-amber-900" },
    inviavel: { cor: "bg-red-600", label: "INVIÁVEL", textColor: "text-red-900" },
  }

  const config = conclusaoConfig[analise.conclusao]

  return (
    <Card className="border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-bold">ANÁLISE DE VIABILIDADE (6 PILARES)</CardTitle>
          <Badge variant="default" className={`${config.cor} text-white`}>
            {config.label}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">
          Avaliação corporativa • Média: <span className="font-bold">{media.toFixed(1)}/10</span>
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Radar Chart */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis 
                dataKey="pilar" 
                tick={{ fill: "#6b7280", fontSize: 12, fontWeight: 600 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 10]} 
                tick={{ fill: "#9ca3af", fontSize: 10 }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Legenda de Scores */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(analise.pilares).map(([key, pilar]) => {
            const nomes: Record<string, string> = {
              tecnica: "Técnica",
              operacional: "Operacional",
              financeira: "Financeira",
              economica: "Econômica",
              juridica: "Jurídica",
              risco: "Risco",
            }

            const corScore = pilar.score >= 7 ? "text-emerald-600" : pilar.score >= 4 ? "text-amber-600" : "text-red-600"

            return (
              <div key={key} className="flex items-center justify-between p-2 rounded border bg-muted/30">
                <span className="text-xs font-medium">{nomes[key]}</span>
                <span className={`text-sm font-bold ${corScore}`}>{pilar.score.toFixed(1)}</span>
              </div>
            )
          })}
        </div>

        {/* Observações */}
        {analise.observacoes && (
          <div className={`p-3 rounded-lg border-2 ${config.cor.replace('bg-', 'border-')} ${config.cor.replace('600', '50')}`}>
            <p className={`text-xs font-medium ${config.textColor}`}>
              {analise.observacoes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
