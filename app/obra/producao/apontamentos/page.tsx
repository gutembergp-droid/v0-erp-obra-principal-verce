"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Plus, CheckCircle2, Clock, TrendingUp, TrendingDown, Target, Users, Truck, Timer } from "lucide-react"
import { ObraProducaoNavbar } from "../../_components/obra-producao-navbar"

// Dados mockados de Apontamentos
const apontamentosMock = [
  {
    id: "APT-001",
    data: "2026-01-03",
    itemEAP: "1.1 - Escavacao 1a categoria",
    frente: "Terraplenagem Norte",
    quantidadeApontada: 2500,
    unidade: "m3",
    horasHomem: 80,
    horasMaquina: 24,
    produtividadeReal: 31.25,
    produtividadeMeta: 30,
    indice: 104,
    status: "validado",
  },
  {
    id: "APT-002",
    data: "2026-01-03",
    itemEAP: "1.4 - Compactacao",
    frente: "Terraplenagem Sul",
    quantidadeApontada: 1800,
    unidade: "m3",
    horasHomem: 48,
    horasMaquina: 16,
    produtividadeReal: 37.5,
    produtividadeMeta: 40,
    indice: 94,
    status: "validado",
  },
  {
    id: "APT-003",
    data: "2026-01-03",
    itemEAP: "3.1 - Fundacoes",
    frente: "Obras de Arte",
    quantidadeApontada: 45,
    unidade: "m3",
    horasHomem: 120,
    horasMaquina: 8,
    produtividadeReal: 0.375,
    produtividadeMeta: 0.35,
    indice: 107,
    status: "pendente",
  },
]

// Dados mockados de Produtividade por Frente
const produtividadeFrenteMock = [
  {
    frente: "Terraplenagem Norte",
    metaMensal: 75000,
    realizadoMensal: 68500,
    percentual: 91,
    tendencia: "positiva",
  },
  {
    frente: "Terraplenagem Sul",
    metaMensal: 45000,
    realizadoMensal: 42000,
    percentual: 93,
    tendencia: "positiva",
  },
  {
    frente: "Obras de Arte",
    metaMensal: 180,
    realizadoMensal: 135,
    percentual: 75,
    tendencia: "atencao",
  },
  {
    frente: "Pavimentacao",
    metaMensal: 8500,
    realizadoMensal: 6800,
    percentual: 80,
    tendencia: "atencao",
  },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

export default function ApontamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const totalApontamentos = apontamentosMock.length
  const apontamentosValidados = apontamentosMock.filter((a) => a.status === "validado").length
  const indiceGeral = Math.round(apontamentosMock.reduce((acc, a) => acc + a.indice, 0) / apontamentosMock.length)

  return (
    <>
      <Header
        title="Apontamentos de Producao"
        description="Registro e analise de produtividade por item da EAP"
        rightContent={
          <InfoTooltip
            title="Setor de Produtividade"
            description="Registra apontamentos de producao vinculados aos itens da EAP, permitindo analise de produtividade real vs meta e identificacao de desvios."
          />
        }
      />

      <div className="p-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Indice Geral
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${indiceGeral >= 100 ? "text-green-500" : "text-amber-500"}`}>
                {indiceGeral}%
              </div>
              <p className="text-xs text-muted-foreground">{indiceGeral >= 100 ? "Acima da meta" : "Abaixo da meta"}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Validados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{apontamentosValidados}</div>
              <p className="text-xs text-muted-foreground">de {totalApontamentos} apontamentos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Horas Homem
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(apontamentosMock.reduce((acc, a) => acc + a.horasHomem, 0))}
              </div>
              <p className="text-xs text-muted-foreground">hoje</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Horas Maquina
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(apontamentosMock.reduce((acc, a) => acc + a.horasMaquina, 0))}
              </div>
              <p className="text-xs text-muted-foreground">hoje</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Timer className="w-4 h-4" />
                Frentes Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{produtividadeFrenteMock.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Apontamentos do Dia */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Apontamentos do Dia</CardTitle>
                <CardDescription>Producao registrada por item da EAP</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Buscar..."
                  className="w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Apontamento
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Item EAP</TableHead>
                  <TableHead>Frente</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead className="text-right">HH</TableHead>
                  <TableHead className="text-right">HM</TableHead>
                  <TableHead className="text-center">Prod. Real</TableHead>
                  <TableHead className="text-center">Indice</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apontamentosMock.map((apt) => (
                  <TableRow key={apt.id}>
                    <TableCell className="font-mono font-bold">{apt.id}</TableCell>
                    <TableCell className="text-sm">{apt.itemEAP}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{apt.frente}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {formatNumber(apt.quantidadeApontada)} {apt.unidade}
                    </TableCell>
                    <TableCell className="text-right font-mono">{apt.horasHomem}</TableCell>
                    <TableCell className="text-right font-mono">{apt.horasMaquina}</TableCell>
                    <TableCell className="text-center font-mono">{apt.produtividadeReal.toFixed(2)}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={apt.indice >= 100 ? "default" : "secondary"}
                        className={apt.indice >= 100 ? "bg-green-500" : "text-amber-500"}
                      >
                        {apt.indice >= 100 ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {apt.indice}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {apt.status === "validado" && (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Validado
                        </Badge>
                      )}
                      {apt.status === "pendente" && (
                        <Badge variant="outline" className="text-amber-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Produtividade por Frente */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Produtividade por Frente de Trabalho</CardTitle>
            <CardDescription>Avanco mensal vs meta planejada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {produtividadeFrenteMock.map((frente, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{frente.frente}</span>
                      {frente.tendencia === "positiva" ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-amber-500" />
                      )}
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold">{formatNumber(frente.realizadoMensal)}</span>
                      <span className="text-muted-foreground"> / {formatNumber(frente.metaMensal)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Progress
                      value={frente.percentual}
                      className={`flex-1 h-3 ${frente.percentual >= 90 ? "[&>div]:bg-green-500" : "[&>div]:bg-amber-500"}`}
                    />
                    <Badge variant={frente.percentual >= 90 ? "default" : "secondary"} className="w-16 justify-center">
                      {frente.percentual}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
