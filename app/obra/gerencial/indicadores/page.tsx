"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart3, TrendingUp, TrendingDown, Download, Filter, Calendar } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const indicadores = [
  {
    categoria: "Desempenho Fisico",
    items: [
      { nome: "SPI (Schedule Performance Index)", valor: 0.96, meta: 1.0, status: "atencao" },
      { nome: "Avanco Fisico Acumulado", valor: "67.4%", meta: "70%", status: "atencao" },
      { nome: "Produtividade Media", valor: "92%", meta: "95%", status: "atencao" },
    ],
  },
  {
    categoria: "Desempenho Financeiro",
    items: [
      { nome: "CPI (Cost Performance Index)", valor: 1.04, meta: 1.0, status: "ok" },
      { nome: "Margem Bruta", valor: "8.7%", meta: "9%", status: "atencao" },
      { nome: "EBITDA Obra", valor: "R$ 12.3M", meta: "R$ 11M", status: "ok" },
    ],
  },
  {
    categoria: "Qualidade e Seguranca",
    items: [
      { nome: "Taxa de Retrabalho", valor: "2.1%", meta: "3%", status: "ok" },
      { nome: "Acidentes com Afastamento", valor: "0", meta: "0", status: "ok" },
      { nome: "NC Abertas", valor: "3", meta: "5", status: "ok" },
    ],
  },
  {
    categoria: "Suprimentos",
    items: [
      { nome: "Meta 0.9 Atingida", valor: "78%", meta: "80%", status: "atencao" },
      { nome: "Lead Time Medio", valor: "12 dias", meta: "15 dias", status: "ok" },
      { nome: "Fornecedores Homologados", valor: "89%", meta: "85%", status: "ok" },
    ],
  },
]

export default function IndicadoresPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20">
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">Indicadores & KPIs</h1>
                <InfoTooltip
                  title="Indicadores & KPIs"
                  description="Painel de indicadores de desempenho do contrato. Monitore SPI, CPI, margem, qualidade e suprimentos em tempo real."
                />
              </div>
              <p className="text-sm text-muted-foreground">BR-101 LOTE 2 - Janeiro/2026</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Periodo
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrar
            </Button>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Conteudo */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="grid grid-cols-2 gap-6">
              {indicadores.map((categoria) => (
                <Card key={categoria.categoria} className="border-border/50">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">{categoria.categoria}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {categoria.items.map((item) => (
                        <div
                          key={item.nome}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/30"
                        >
                          <div>
                            <p className="text-sm font-medium">{item.nome}</p>
                            <p className="text-xs text-muted-foreground">Meta: {item.meta}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xl font-bold ${item.status === "ok" ? "text-green-500" : "text-yellow-500"}`}
                            >
                              {item.valor}
                            </span>
                            {item.status === "ok" ? (
                              <TrendingUp className="w-5 h-5 text-green-500" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-yellow-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </AppLayout>
  )
}
