"use client"

import { useState, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  FileText,
  DollarSign,
  AlertTriangle,
  Package,
  Calculator,
  Gauge,
  Lightbulb,
  Plus,
  Play,
  Copy,
} from "lucide-react"

const cenarios = [
  {
    id: 1,
    nome: "Baseline Atual",
    status: "ativo",
    tipo: "baseline",
    dataBase: "Jan/2025",
    resultado: { receita: 245, custo: 224, margem: 8.6 },
  },
  {
    id: 2,
    nome: "Otimista (+10% prod)",
    status: "simulacao",
    tipo: "what-if",
    dataBase: "Jan/2025",
    resultado: { receita: 245, custo: 218, margem: 11.0 },
  },
  {
    id: 3,
    nome: "Pessimista (+20% custo)",
    status: "simulacao",
    tipo: "what-if",
    dataBase: "Jan/2025",
    resultado: { receita: 245, custo: 269, margem: -9.8 },
  },
  {
    id: 4,
    nome: "Aditivo Aprovado",
    status: "simulacao",
    tipo: "forecast",
    dataBase: "Jan/2025",
    resultado: { receita: 263, custo: 240, margem: 8.7 },
  },
]

const premissas = [
  { nome: "Produtividade MO", baseline: 92, otimista: 102, pessimista: 85, unidade: "%" },
  { nome: "Custo Material", baseline: 100, otimista: 95, pessimista: 120, unidade: "% ref" },
  { nome: "Prazo Final", baseline: 18, otimista: 16, pessimista: 22, unidade: "meses" },
  { nome: "Efetivo Medio", baseline: 340, otimista: 320, pessimista: 380, unidade: "colab" },
  { nome: "Inflacao Acum", baseline: 4.5, otimista: 3.5, pessimista: 6.0, unidade: "%" },
]

const projecoes = [
  { mes: "Fev/25", receita: 172, custo: 158, margem: 8.1 },
  { mes: "Mar/25", receita: 188, custo: 172, margem: 8.5 },
  { mes: "Abr/25", receita: 205, custo: 187, margem: 8.8 },
  { mes: "Mai/25", receita: 222, custo: 203, margem: 8.6 },
  { mes: "Jun/25", receita: 245, custo: 224, margem: 8.6 },
]

function CenariosContent() {
  const router = useRouter()
  const [selectedCenario, setSelectedCenario] = useState(cenarios[0])
  const navegarPara = (rota: string) => router.push(rota)

  return (
    <div className="flex-1 overflow-auto h-full">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Cenarios & Projecoes</h1>
            <Badge variant="secondary">Simulacoes</Badge>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/indicadores")}>
              <BarChart3 className="h-4 w-4 mr-1" />
              Geral
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/analise-contratual")}
            >
              <FileText className="h-4 w-4 mr-1" />
              Contratual
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/analise-financeira")}
            >
              <DollarSign className="h-4 w-4 mr-1" />
              Financeira
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/analise-risco")}
            >
              <AlertTriangle className="h-4 w-4 mr-1" />
              Risco
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/analise-suprimentos")}
            >
              <Package className="h-4 w-4 mr-1" />
              Suprimentos
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navegarPara("/obra/gerencial/indicadores/resultado-economico")}
            >
              <Calculator className="h-4 w-4 mr-1" />
              Economico
            </Button>
            <Button variant="outline" size="sm" onClick={() => navegarPara("/obra/gerencial/indicadores/performance")}>
              <Gauge className="h-4 w-4 mr-1" />
              Performance
            </Button>
            <Button variant="default" size="sm">
              <Lightbulb className="h-4 w-4 mr-1" />
              Cenarios
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Cenarios Ativos</p>
              <p className="text-2xl font-bold text-foreground">{cenarios.length}</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Melhor Margem</p>
              <p className="text-2xl font-bold text-emerald-500">11.0%</p>
              <p className="text-[10px] text-muted-foreground">Otimista</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Pior Margem</p>
              <p className="text-2xl font-bold text-red-500">-9.8%</p>
              <p className="text-[10px] text-muted-foreground">Pessimista</p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground">Baseline</p>
              <p className="text-2xl font-bold text-foreground">8.6%</p>
              <p className="text-[10px] text-muted-foreground">Margem atual</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lista de cenarios */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-foreground">Cenarios</h2>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" />
                Novo
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <div className="divide-y divide-border">
                    {cenarios.map((cenario) => (
                      <div
                        key={cenario.id}
                        className={`p-3 cursor-pointer transition-colors ${selectedCenario.id === cenario.id ? "bg-primary/5 border-l-2 border-l-primary" : "hover:bg-muted/50"}`}
                        onClick={() => setSelectedCenario(cenario)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{cenario.nome}</span>
                          <Badge variant={cenario.status === "ativo" ? "default" : "secondary"} className="text-[10px]">
                            {cenario.tipo}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Receita: R$ {cenario.resultado.receita}M</span>
                          <span className={cenario.resultado.margem >= 0 ? "text-emerald-500" : "text-red-500"}>
                            Margem: {cenario.resultado.margem}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Detalhes do cenario */}
          <div className="lg:col-span-8 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  <span>{selectedCenario.nome}</span>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-foreground">R$ {selectedCenario.resultado.receita}M</p>
                    <p className="text-xs text-muted-foreground">Receita Final</p>
                  </div>
                  <div className="p-4 bg-muted/30 rounded-lg text-center">
                    <p className="text-2xl font-bold text-amber-500">R$ {selectedCenario.resultado.custo}M</p>
                    <p className="text-xs text-muted-foreground">Custo Final</p>
                  </div>
                  <div
                    className={`p-4 rounded-lg text-center ${selectedCenario.resultado.margem >= 0 ? "bg-emerald-500/10" : "bg-red-500/10"}`}
                  >
                    <p
                      className={`text-2xl font-bold ${selectedCenario.resultado.margem >= 0 ? "text-emerald-500" : "text-red-500"}`}
                    >
                      {selectedCenario.resultado.margem}%
                    </p>
                    <p className="text-xs text-muted-foreground">Margem</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premissas */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Premissas Comparativas</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {premissas.map((p, idx) => (
                    <div key={idx} className="p-3 grid grid-cols-4 gap-4 items-center">
                      <span className="text-xs text-muted-foreground">{p.nome}</span>
                      <div className="text-center">
                        <span className="text-xs font-medium text-foreground">
                          {p.baseline} {p.unidade}
                        </span>
                        <p className="text-[10px] text-muted-foreground">Baseline</p>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-medium text-emerald-500">
                          {p.otimista} {p.unidade}
                        </span>
                        <p className="text-[10px] text-muted-foreground">Otimista</p>
                      </div>
                      <div className="text-center">
                        <span className="text-xs font-medium text-red-500">
                          {p.pessimista} {p.unidade}
                        </span>
                        <p className="text-[10px] text-muted-foreground">Pessimista</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Projecao mensal */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Projecao Mensal (Baseline)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {projecoes.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground w-16">{p.mes}</span>
                      <div className="flex-1 flex gap-1 h-6">
                        <div className="bg-primary rounded-sm" style={{ width: `${(p.receita / 250) * 100}%` }} />
                        <div className="bg-amber-500 rounded-sm" style={{ width: `${(p.custo / 250) * 100}%` }} />
                      </div>
                      <span
                        className={`text-xs font-medium w-12 text-right ${p.margem >= 0 ? "text-emerald-500" : "text-red-500"}`}
                      >
                        {p.margem}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm bg-primary" />
                    <span className="text-[10px] text-muted-foreground">Receita</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm bg-amber-500" />
                    <span className="text-[10px] text-muted-foreground">Custo</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CenariosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      }
    >
      <CenariosContent />
    </Suspense>
  )
}
