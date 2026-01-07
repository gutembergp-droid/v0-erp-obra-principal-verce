"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileStack, Upload, FileText, CheckCircle2, ArrowRight } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

export default function EstruturaPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Estrutura</h1>
          <InfoTooltip
            title="Onde Tudo Nasce"
            description="Upload do Compor 90, definicao da Meta 0.9, estruturacao inicial do orcamento e EAP da obra."
          />
          <Badge variant="outline" className="gap-1">
            <ArrowRight className="w-3 h-3" />
            Proximo: Receita
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Import Compor 90
          </Button>
          <Button className="gap-2">
            <FileStack className="w-4 h-4" />
            Nova EAP
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compor 90</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <p className="text-lg font-bold text-green-500">Importado</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Meta 0.9</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">R$ 405 Mi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Itens EAP</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">1.247</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Baseline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <p className="text-lg font-bold text-green-500">Aprovado</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compor90" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compor90">Compor 90</TabsTrigger>
          <TabsTrigger value="meta">Meta 0.9</TabsTrigger>
          <TabsTrigger value="eap">EAP</TabsTrigger>
          <TabsTrigger value="baseline">Baseline</TabsTrigger>
        </TabsList>

        <TabsContent value="compor90">
          <Card>
            <CardHeader>
              <CardTitle>Planilha Compor 90 - Importada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg p-8 text-center">
                <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Compor 90 - BR-101 Lote 2</h3>
                <p className="text-sm text-muted-foreground mb-4">Importado em 15/01/2024 - 1.247 itens</p>
                <div className="flex justify-center gap-2">
                  <Button variant="outline">Visualizar</Button>
                  <Button variant="outline">Reimportar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meta">
          <Card>
            <CardHeader>
              <CardTitle>Definicao da Meta 0.9</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configuracao da meta orcamentaria inicial da obra.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eap">
          <Card>
            <CardHeader>
              <CardTitle>Estrutura Analitica do Projeto</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Visualizacao e edicao da EAP da obra.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="baseline">
          <Card>
            <CardHeader>
              <CardTitle>Baseline Aprovado</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Linha de base orcamentaria aprovada.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
