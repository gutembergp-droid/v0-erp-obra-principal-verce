"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingDown, ArrowRight, ArrowLeft } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { ObraComercialNavbar } from "../_components/obra-comercial-navbar"

export default function CustoPage() {
  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraComercialNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6 space-y-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1">
            <ArrowLeft className="w-3 h-3" />
            Anterior: Receita
          </Badge>
          <h1 className="text-2xl font-bold text-foreground">Custo</h1>
          <InfoTooltip
            title="Onde se Controla"
            description="Engenharia de Valor, analise de desvios, otimizacao de custos e controle orcamentario."
          />
          <Badge variant="outline" className="gap-1">
            <ArrowRight className="w-3 h-3" />
            Proximo: Suprimento
          </Badge>
        </div>
        <Button className="gap-2">
          <DollarSign className="w-4 h-4" />
          Nova Analise
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Orcamento Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">R$ 405 Mi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Custo Realizado</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">R$ 267 Mi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Desvio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-green-500" />
              <p className="text-2xl font-bold text-green-500">-2.3%</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Economia Eng. Valor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">R$ 12.5 Mi</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="engvalor" className="space-y-4">
        <TabsList>
          <TabsTrigger value="engvalor">Engenharia de Valor</TabsTrigger>
          <TabsTrigger value="desvios">Analise de Desvios</TabsTrigger>
          <TabsTrigger value="otimizacao">Otimizacao</TabsTrigger>
        </TabsList>

        <TabsContent value="engvalor">
          <Card>
            <CardHeader>
              <CardTitle>Propostas de Engenharia de Valor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Substituicao de Material Drenagem</h4>
                    <p className="text-sm text-muted-foreground">Troca de tubos de concreto por PEAD</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-500">R$ 2.8 Mi</p>
                    <Badge variant="default">Aprovada</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Otimizacao Movimento de Terra</h4>
                    <p className="text-sm text-muted-foreground">Reducao de DMT com jazida mais proxima</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-500">R$ 4.2 Mi</p>
                    <Badge variant="default">Aprovada</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Revisao de Fundacoes OAE</h4>
                    <p className="text-sm text-muted-foreground">Estacas mais curtas apos sondagem adicional</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-amber-500">R$ 5.5 Mi</p>
                    <Badge variant="secondary">Em Analise</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="desvios">
          <Card>
            <CardHeader>
              <CardTitle>Analise de Desvios Orcamentarios</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Comparativo orcado x realizado por centro de custo.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="otimizacao">
          <Card>
            <CardHeader>
              <CardTitle>Planos de Otimizacao</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Acoes de reducao de custos e melhoria de produtividade.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
        </div>
      </main>
    </div>
  )
}
