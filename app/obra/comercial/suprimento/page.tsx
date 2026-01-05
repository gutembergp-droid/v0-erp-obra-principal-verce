"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Truck, ArrowRight, ArrowLeft } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const compras = [
  { id: "RC-001", item: "Aco CA-50", qtd: "500 ton", valor: 2500000, status: "Cotacao", prazo: "15/01/2026" },
  { id: "RC-002", item: "Cimento CP-IV", qtd: "2.000 ton", valor: 800000, status: "Aprovada", prazo: "10/01/2026" },
  { id: "RC-003", item: "Brita 1 e 2", qtd: "5.000 m3", valor: 350000, status: "Em Transito", prazo: "08/01/2026" },
]

export default function SuprimentoPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="gap-1">
              <ArrowLeft className="w-3 h-3" />
              Anterior: Custo
            </Badge>
            <h1 className="text-2xl font-bold text-foreground">Suprimento</h1>
            <InfoTooltip
              title="Onde se Executa"
              description="Compras de campo, cotacoes, ordens de compra, negociacoes e logistica de materiais."
            />
            <Badge variant="outline" className="gap-1">
              <ArrowRight className="w-3 h-3" />
              Proximo: Analytics
            </Badge>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Nova Requisicao
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Requisicoes Abertas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Cotacao</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Em Transito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-500" />
                <p className="text-3xl font-bold text-blue-500">8</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Volume Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">R$ 4.2 Mi</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="compras" className="space-y-4">
          <TabsList>
            <TabsTrigger value="compras">Compras de Campo</TabsTrigger>
            <TabsTrigger value="cotacoes">Cotacoes</TabsTrigger>
            <TabsTrigger value="negociacoes">Negociacoes</TabsTrigger>
            <TabsTrigger value="entregas">Entregas</TabsTrigger>
          </TabsList>

          <TabsContent value="compras">
            <Card>
              <CardHeader>
                <CardTitle>Requisicoes de Compra</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Codigo</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Item</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quantidade</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valor Est.</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Prazo</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compras.map((compra) => (
                      <tr key={compra.id} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-sm">{compra.id}</td>
                        <td className="py-3 px-4 font-medium">{compra.item}</td>
                        <td className="py-3 px-4 text-sm">{compra.qtd}</td>
                        <td className="py-3 px-4 text-sm text-primary">R$ {(compra.valor / 1000000).toFixed(2)} Mi</td>
                        <td className="py-3 px-4 text-sm">{compra.prazo}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              compra.status === "Aprovada"
                                ? "default"
                                : compra.status === "Em Transito"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {compra.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cotacoes">
            <Card>
              <CardHeader>
                <CardTitle>Cotacoes em Andamento</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Processos de cotacao e comparativo de precos.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="negociacoes">
            <Card>
              <CardHeader>
                <CardTitle>Negociacoes com Fornecedores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Historico de negociacoes e contratos de fornecimento.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entregas">
            <Card>
              <CardHeader>
                <CardTitle>Controle de Entregas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Rastreamento de pedidos e recebimento de materiais.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
