"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronRight,
  ChevronDown,
  Search,
  Plus,
  FileSpreadsheet,
  Eye,
  Calculator,
  DollarSign,
  Layers,
} from "lucide-react"

// Dados mockados da EAP - Estrutura Analítica do Projeto
const eapMock = [
  {
    id: "1",
    codigo: "1.0",
    descricao: "TERRAPLENAGEM",
    unidade: "-",
    quantidade: null,
    precoUnitario: null,
    valorTotal: 45000000,
    children: [
      {
        id: "1.1",
        codigo: "1.1",
        descricao: "Escavação de material de 1ª categoria",
        unidade: "m³",
        quantidade: 850000,
        precoUnitario: 12.5,
        valorTotal: 10625000,
        fatorConversao: "1 m³ = 1.2 ton",
      },
      {
        id: "1.2",
        codigo: "1.2",
        descricao: "Escavação de material de 2ª categoria",
        unidade: "m³",
        quantidade: 320000,
        precoUnitario: 28.0,
        valorTotal: 8960000,
        fatorConversao: "1 m³ = 1.8 ton",
      },
      {
        id: "1.3",
        codigo: "1.3",
        descricao: "Escavação de material de 3ª categoria",
        unidade: "m³",
        quantidade: 180000,
        precoUnitario: 85.0,
        valorTotal: 15300000,
        fatorConversao: "1 m³ = 2.5 ton",
      },
      {
        id: "1.4",
        codigo: "1.4",
        descricao: "Compactação de aterro",
        unidade: "m³",
        quantidade: 420000,
        precoUnitario: 24.0,
        valorTotal: 10080000,
        fatorConversao: null,
      },
    ],
  },
  {
    id: "2",
    codigo: "2.0",
    descricao: "PAVIMENTAÇÃO",
    unidade: "-",
    quantidade: null,
    precoUnitario: null,
    valorTotal: 180000000,
    children: [
      {
        id: "2.1",
        codigo: "2.1",
        descricao: "Sub-base granular",
        unidade: "m³",
        quantidade: 125000,
        precoUnitario: 95.0,
        valorTotal: 11875000,
        fatorConversao: null,
      },
      {
        id: "2.2",
        codigo: "2.2",
        descricao: "Base de brita graduada",
        unidade: "m³",
        quantidade: 98000,
        precoUnitario: 145.0,
        valorTotal: 14210000,
        fatorConversao: null,
      },
      {
        id: "2.3",
        codigo: "2.3",
        descricao: "Concreto betuminoso usinado a quente (CBUQ)",
        unidade: "ton",
        quantidade: 85000,
        precoUnitario: 380.0,
        valorTotal: 32300000,
        fatorConversao: null,
      },
    ],
  },
  {
    id: "3",
    codigo: "3.0",
    descricao: "OBRAS DE ARTE ESPECIAIS",
    unidade: "-",
    quantidade: null,
    precoUnitario: null,
    valorTotal: 225000000,
    children: [
      {
        id: "3.1",
        codigo: "3.1",
        descricao: "Ponte sobre Rio Paraíba - Fundações",
        unidade: "un",
        quantidade: 24,
        precoUnitario: 2500000,
        valorTotal: 60000000,
        fatorConversao: "24 estacas de 1.5m",
      },
      {
        id: "3.2",
        codigo: "3.2",
        descricao: "Ponte sobre Rio Paraíba - Superestrutura",
        unidade: "m²",
        quantidade: 4800,
        precoUnitario: 12500,
        valorTotal: 60000000,
        fatorConversao: null,
      },
      {
        id: "3.3",
        codigo: "3.3",
        descricao: "Viaduto km 145 - Estrutura completa",
        unidade: "m²",
        quantidade: 3200,
        precoUnitario: 18000,
        valorTotal: 57600000,
        fatorConversao: null,
      },
    ],
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export default function EAPPage() {
  const [expandedItems, setExpandedItems] = useState<string[]>(["1", "2", "3"])
  const [searchTerm, setSearchTerm] = useState("")
  const [visao, setVisao] = useState<"comercial" | "operacional">("comercial")

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  const valorTotalEAP = eapMock.reduce((acc, item) => acc + item.valorTotal, 0)

  return (
    <>
      <Header
        title="EAP - Estrutura Analítica do Projeto"
        description="A EAP é criada no Módulo Obra pelo Comercial, com visão dual: Comercial e Operacional"
      />

      <div className="p-6 space-y-6">
        {/* Info Card */}
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Layers className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Visão Dual da EAP</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Comercial:</strong> m³, ton, m², valores financeiros, receita e margem |{" "}
                  <strong>Operacional:</strong> bloco, estaca, viga, trecho, quantidades físicas
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ligação via <strong>Fator de Conversão</strong>. Valores financeiros devem ser equivalentes.
                </p>
              </div>
              <Badge className="bg-green-500">Baseline v1 Homologada</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total EAP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(valorTotalEAP)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Itens de Nível 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eapMock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total de Itens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {eapMock.reduce((acc, item) => acc + (item.children?.length || 0) + 1, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Baseline Ativa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">v1</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela EAP */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold">Estrutura Analítica</CardTitle>
                <CardDescription>Hierarquia de itens com quantidades e valores</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Tabs value={visao} onValueChange={(v) => setVisao(v as "comercial" | "operacional")}>
                  <TabsList>
                    <TabsTrigger value="comercial">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Comercial
                    </TabsTrigger>
                    <TabsTrigger value="operacional">
                      <Calculator className="w-4 h-4 mr-1" />
                      Operacional
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar item..."
                    className="pl-9 w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Item
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-center">Unidade</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  {visao === "comercial" && <TableHead className="text-right">Preço Unit.</TableHead>}
                  {visao === "comercial" && <TableHead className="text-right">Valor Total</TableHead>}
                  {visao === "operacional" && <TableHead>Fator de Conversão</TableHead>}
                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eapMock.map((item) => (
                  <>
                    <TableRow key={item.id} className="bg-muted/50 font-medium">
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleExpand(item.id)}>
                          {expandedItems.includes(item.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {item.codigo} - {item.descricao}
                      </TableCell>
                      <TableCell className="text-center">-</TableCell>
                      <TableCell className="text-right">-</TableCell>
                      {visao === "comercial" && <TableCell className="text-right">-</TableCell>}
                      {visao === "comercial" && (
                        <TableCell className="text-right font-bold text-green-600">
                          {formatCurrency(item.valorTotal)}
                        </TableCell>
                      )}
                      {visao === "operacional" && <TableCell>-</TableCell>}
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedItems.includes(item.id) &&
                      item.children?.map((child) => (
                        <TableRow key={child.id}>
                          <TableCell></TableCell>
                          <TableCell className="pl-8">
                            <span className="text-muted-foreground mr-2">{child.codigo}</span>
                            {child.descricao}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline">{child.unidade}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-mono">
                            {child.quantidade ? formatNumber(child.quantidade) : "-"}
                          </TableCell>
                          {visao === "comercial" && (
                            <TableCell className="text-right font-mono">
                              {child.precoUnitario ? formatCurrency(child.precoUnitario) : "-"}
                            </TableCell>
                          )}
                          {visao === "comercial" && (
                            <TableCell className="text-right font-mono">{formatCurrency(child.valorTotal)}</TableCell>
                          )}
                          {visao === "operacional" && (
                            <TableCell>
                              {child.fatorConversao ? (
                                <Badge variant="secondary">{child.fatorConversao}</Badge>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          )}
                          <TableCell>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
