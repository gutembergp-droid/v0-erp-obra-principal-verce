"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MOCK_VERDE,
  MOCK_AMARELO,
  MOCK_VERMELHO,
  PrismRadar,
  Prism3D,
  PrismDonut,
  PrismNonagon,
} from "@/components/prism"
import type { PrismResult } from "@/lib/prism/types"
import { Shield, Radar, Box, CircleDot, Hexagon, Check } from "lucide-react"

type MockType = "verde" | "amarelo" | "vermelho"

const mocks: Record<MockType, PrismResult> = {
  verde: MOCK_VERDE,
  amarelo: MOCK_AMARELO,
  vermelho: MOCK_VERMELHO,
}

export default function PrismDemoPage() {
  const [mockType, setMockType] = useState<MockType>("amarelo")
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const result = mocks[mockType]

  const options = [
    {
      id: "radar",
      name: "Radar / Radial",
      icon: Radar,
      description: "Grafico radar com 9 eixos",
      component: <PrismRadar result={result} />,
    },
    {
      id: "3d",
      name: "Prisma 3D",
      icon: Box,
      description: "Prisma rotativo interativo",
      component: <Prism3D result={result} />,
    },
    {
      id: "donut",
      name: "Anel Segmentado",
      icon: CircleDot,
      description: "Donut com 9 segmentos",
      component: <PrismDonut result={result} />,
    },
    {
      id: "nonagon",
      name: "Nonagono",
      icon: Hexagon,
      description: "Figura de 9 lados coloridos",
      component: <PrismNonagon result={result} />,
    },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Analise Prismatica - Escolha a Visualizacao</h1>
            <p className="text-sm text-muted-foreground">Selecione o estilo grafico que preferir</p>
          </div>
        </div>

        {selectedOption && (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/30">
            <Check className="w-3 h-3 mr-1" />
            Selecionado: {options.find((o) => o.id === selectedOption)?.name}
          </Badge>
        )}
      </div>

      {/* Controles de Mock */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Cenario de Teste</CardTitle>
          <CardDescription>Alterne entre cenarios para ver o comportamento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={mockType === "verde" ? "default" : "outline"}
              size="sm"
              onClick={() => setMockType("verde")}
              className={mockType === "verde" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
            >
              Verde (9/9 OK)
            </Button>
            <Button
              variant={mockType === "amarelo" ? "default" : "outline"}
              size="sm"
              onClick={() => setMockType("amarelo")}
              className={mockType === "amarelo" ? "bg-amber-600 hover:bg-amber-700" : ""}
            >
              Amarelo (7/9 OK)
            </Button>
            <Button
              variant={mockType === "vermelho" ? "default" : "outline"}
              size="sm"
              onClick={() => setMockType("vermelho")}
              className={mockType === "vermelho" ? "bg-red-600 hover:bg-red-700" : ""}
            >
              Vermelho (4/9 OK)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid com 4 Opcoes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => {
          const Icon = option.icon
          const isSelected = selectedOption === option.id

          return (
            <Card
              key={option.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-base">{option.name}</CardTitle>
                  </div>
                  {isSelected && (
                    <Badge className="bg-primary">
                      <Check className="w-3 h-3 mr-1" />
                      Selecionado
                    </Badge>
                  )}
                </div>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center min-h-[320px] bg-muted/20 rounded-lg mx-4 mb-4">
                {option.component}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Botao de Confirmacao */}
      {selectedOption && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Opcao selecionada: {options.find((o) => o.id === selectedOption)?.name}</p>
                <p className="text-sm text-muted-foreground">Clique para confirmar sua escolha</p>
              </div>
              <Button size="lg" className="gap-2">
                <Check className="w-4 h-4" />
                Confirmar Escolha
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
