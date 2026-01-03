"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Lock, Eye, FileText, TrendingDown, TrendingUp, Scale } from "lucide-react"

// Comparativo MP x MC - SIGILOSO
const comparativoMock = [
  {
    id: 1,
    codigo: "1.1",
    descricao: "Escavação de material de 1ª categoria",
    unidade: "m³",
    precoUnitario: 12.5,
    quantidadeMP: 45000,
    quantidadeMC: 42000,
    valorMP: 562500,
    valorMC: 525000,
    diferencaQtd: -3000,
    diferencaValor: -37500,
    justificativa: "Ajuste por glosa do cliente - área de difícil acesso",
  },
  {
    id: 2,
    codigo: "1.2",
    descricao: "Escavação de material de 2ª categoria",
    unidade: "m³",
    precoUnitario: 28.0,
    quantidadeMP: 22000,
    quantidadeMC: 22000,
    valorMP: 616000,
    valorMC: 616000,
    diferencaQtd: 0,
    diferencaValor: 0,
    justificativa: null,
  },
  {
    id: 3,
    codigo: "2.3",
    descricao: "CBUQ",
    unidade: "ton",
    precoUnitario: 380.0,
    quantidadeMP: 3500,
    quantidadeMC: 3200,
    valorMP: 1330000,
    valorMC: 1216000,
    diferencaQtd: -300,
    diferencaValor: -114000,
    justificativa: "Medição pendente de aprovação do fiscal",
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

export default function ComparativoPage() {
  const totalDiferencaValor = comparativoMock.reduce((acc, item) => acc + item.diferencaValor, 0)
  const itensDivergentes = comparativoMock.filter((i) => i.diferencaQtd !== 0).length

  return (
    <AppLayout>
      <Header
        title="Comparativo MP x MC"
        description="Análise de divergências entre Produção e Cliente - ACESSO RESTRITO"
      />

      <div className="p-6 space-y-6">
        {/* Alerta de Sigilo */}
        <Alert className="border-red-500/50 bg-red-500/10">
          <Lock className="w-4 h-4 text-red-500" />
          <AlertDescription className="text-red-600">
            <strong>DOCUMENTO SIGILOSO</strong> - Acesso restrito. Este comparativo contém informações estratégicas de
            gestão de risco comercial. Não compartilhar externamente.
          </AlertDescription>
        </Alert>

        {/* Info */}
        <Card className="border-amber-500/20 bg-amber-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-amber-500/10">
                <Scale className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold">Comparativo MP x MC</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Identifica divergências entre o que foi <strong>EXECUTADO</strong> (MP) e o que será{" "}
                  <strong>FATURADO</strong> (MC). Requer justificativas para cada divergência. Base para gestão de risco
                  comercial.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Competência</CardTitle>
            </CardHeader>
            <CardContent>
              <Select defaultValue="jan-2026">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">Janeiro/2026</SelectItem>
                  <SelectItem value="dez-2025">Dezembro/2025</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Itens Divergentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{itensDivergentes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Diferença Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalDiferencaValor < 0 ? "text-red-500" : "text-green-500"}`}>
                {formatCurrency(totalDiferencaValor)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Risco Comercial</CardTitle>
            </CardHeader>
            <CardContent>
              {totalDiferencaValor < -100000 ? (
                <Badge variant="destructive">Alto</Badge>
              ) : totalDiferencaValor < 0 ? (
                <Badge className="bg-amber-500">Médio</Badge>
              ) : (
                <Badge className="bg-green-500">Baixo</Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tabela */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Análise de Divergências</CardTitle>
                <CardDescription>Detalhamento das diferenças entre MP e MC</CardDescription>
              </div>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Código</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="text-right">Valor MP</TableHead>
                  <TableHead className="text-right">Valor MC</TableHead>
                  <TableHead className="text-right">Diferença</TableHead>
                  <TableHead>Justificativa</TableHead>
                  <TableHead className="text-center">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparativoMock.map((item) => (
                  <TableRow key={item.id} className={item.diferencaQtd !== 0 ? "bg-amber-500/5" : ""}>
                    <TableCell className="font-mono">{item.codigo}</TableCell>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(item.valorMP)}</TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(item.valorMC)}</TableCell>
                    <TableCell className="text-right">
                      {item.diferencaValor !== 0 ? (
                        <div className="flex items-center justify-end gap-1">
                          {item.diferencaValor < 0 ? (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          )}
                          <span className={item.diferencaValor < 0 ? "text-red-500" : "text-green-500"}>
                            {formatCurrency(item.diferencaValor)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      {item.justificativa ? (
                        <span className="text-sm text-muted-foreground">{item.justificativa}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.diferencaQtd !== 0 && (
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Resumo */}
        <Card className="border-red-500/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <CardTitle className="text-base">Resumo de Risco Comercial</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Produção não faturada (MP {">"} MC)</p>
                  <p className="text-xs text-muted-foreground">
                    Trabalho executado que não será cobrado do cliente nesta competência
                  </p>
                </div>
                <span className="text-lg font-bold text-red-500">{formatCurrency(Math.abs(totalDiferencaValor))}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <p className="text-sm font-medium">Ação Recomendada</p>
                  <p className="text-xs text-muted-foreground">Incluir em medições futuras ou registrar como glosa</p>
                </div>
                <Button size="sm">Registrar Glosa</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
