"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Plus, CheckCircle2, Wrench, Truck, Calendar, Fuel, Activity, XCircle } from "lucide-react"

// Dados mockados de Equipamentos
const equipamentosMock = [
  {
    id: "EQ-001",
    codigo: "ESC-001",
    descricao: "Escavadeira Hidraulica CAT 320",
    tipo: "Escavadeira",
    frente: "Terraplenagem Norte",
    status: "operando",
    horasOdometro: 8542,
    proximaManutencao: 9000,
    consumoDiario: 180,
    disponibilidade: 95,
  },
  {
    id: "EQ-002",
    codigo: "CAM-005",
    descricao: "Caminhao Basculante Volvo FMX",
    tipo: "Caminhao",
    frente: "Terraplenagem Norte",
    status: "operando",
    horasOdometro: 12350,
    proximaManutencao: 13000,
    consumoDiario: 120,
    disponibilidade: 92,
  },
  {
    id: "EQ-003",
    codigo: "ROL-002",
    descricao: "Rolo Compactador BOMAG BW 211",
    tipo: "Compactador",
    frente: "Terraplenagem Sul",
    status: "manutencao",
    horasOdometro: 5680,
    proximaManutencao: 6000,
    consumoDiario: 85,
    disponibilidade: 78,
  },
  {
    id: "EQ-004",
    codigo: "GRU-001",
    descricao: "Guindaste Liebherr LTM 1100",
    tipo: "Guindaste",
    frente: "Obras de Arte",
    status: "parado",
    horasOdometro: 3200,
    proximaManutencao: 3500,
    consumoDiario: 95,
    disponibilidade: 88,
  },
]

// Dados mockados de Manutencoes
const manutencoesMock = [
  {
    id: "MAN-001",
    equipamento: "ROL-002",
    descricaoEquip: "Rolo Compactador BOMAG BW 211",
    tipo: "corretiva",
    descricao: "Substituicao de mangueira hidraulica",
    dataInicio: "2026-01-04",
    previsaoFim: "2026-01-05",
    status: "em_andamento",
    custo: 4500,
  },
  {
    id: "MAN-002",
    equipamento: "ESC-001",
    descricaoEquip: "Escavadeira CAT 320",
    tipo: "preventiva",
    descricao: "Troca de oleo e filtros - 500h",
    dataInicio: "2026-01-10",
    previsaoFim: "2026-01-10",
    status: "programada",
    custo: 2800,
  },
]

// Dados mockados de Abastecimento
const abastecimentoMock = [
  {
    id: "ABAST-001",
    equipamento: "ESC-001",
    data: "2026-01-03",
    litros: 180,
    horimetro: 8542,
    operador: "Jose Silva",
  },
  {
    id: "ABAST-002",
    equipamento: "CAM-005",
    data: "2026-01-03",
    litros: 120,
    horimetro: 12350,
    operador: "Carlos Santos",
  },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function EquipamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("frota")

  const totalEquipamentos = equipamentosMock.length
  const equipOperando = equipamentosMock.filter((e) => e.status === "operando").length
  const equipManutencao = equipamentosMock.filter((e) => e.status === "manutencao").length
  const disponibilidadeMedia = Math.round(
    equipamentosMock.reduce((acc, e) => acc + e.disponibilidade, 0) / equipamentosMock.length,
  )

  return (
    <AppLayout>
      <Header title="Equipamentos" description="Gestao de Ativos, Manutencao e Abastecimento" />

      <div className="p-6 space-y-6">
        {/* Conceito */}
        <Card className="border-slate-500/20 bg-slate-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-500/10">
                <Truck className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <h3 className="font-semibold">Setor de Equipamentos</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Gerencia a <strong>frota de equipamentos</strong>, controle de
                  <strong> manutencoes preventivas e corretivas</strong>, e<strong> abastecimento</strong> com
                  rastreamento de consumo.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Total Frota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEquipamentos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Operando
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{equipOperando}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Em Manutencao
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{equipManutencao}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Disponibilidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{disponibilidadeMedia}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Fuel className="w-4 h-4" />
                Consumo/Dia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatNumber(equipamentosMock.reduce((acc, e) => acc + e.consumoDiario, 0))}L
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="frota">
              <Truck className="w-4 h-4 mr-2" />
              Frota
            </TabsTrigger>
            <TabsTrigger value="manutencao">
              <Wrench className="w-4 h-4 mr-2" />
              Manutencao
            </TabsTrigger>
            <TabsTrigger value="abastecimento">
              <Fuel className="w-4 h-4 mr-2" />
              Abastecimento
            </TabsTrigger>
          </TabsList>

          {/* Frota */}
          <TabsContent value="frota">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Gestao de Frota</CardTitle>
                    <CardDescription>Equipamentos mobilizados na obra</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      placeholder="Buscar equipamento..."
                      className="w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Equipamento
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Codigo</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Frente</TableHead>
                      <TableHead className="text-right">Horimetro</TableHead>
                      <TableHead className="text-center">Disponibilidade</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {equipamentosMock.map((eq) => (
                      <TableRow key={eq.id}>
                        <TableCell className="font-mono font-bold">{eq.codigo}</TableCell>
                        <TableCell>{eq.descricao}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{eq.tipo}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{eq.frente}</TableCell>
                        <TableCell className="text-right font-mono">{formatNumber(eq.horasOdometro)}h</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center gap-2 justify-center">
                            <Progress value={eq.disponibilidade} className="w-16 h-2" />
                            <span className="text-sm font-mono">{eq.disponibilidade}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {eq.status === "operando" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Operando
                            </Badge>
                          )}
                          {eq.status === "manutencao" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Wrench className="w-3 h-3 mr-1" />
                              Manutencao
                            </Badge>
                          )}
                          {eq.status === "parado" && (
                            <Badge variant="secondary">
                              <XCircle className="w-3 h-3 mr-1" />
                              Parado
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manutencao */}
          <TabsContent value="manutencao">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Controle de Manutencao</CardTitle>
                    <CardDescription>Manutencoes preventivas e corretivas</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Agendar Manutencao
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Inicio</TableHead>
                      <TableHead>Previsao</TableHead>
                      <TableHead className="text-right">Custo</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {manutencoesMock.map((man) => (
                      <TableRow key={man.id}>
                        <TableCell className="font-mono font-bold">{man.id}</TableCell>
                        <TableCell>
                          <div>
                            <span className="font-mono">{man.equipamento}</span>
                            <p className="text-xs text-muted-foreground">{man.descricaoEquip}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={man.tipo === "preventiva" ? "secondary" : "destructive"}>
                            {man.tipo === "preventiva" ? "Preventiva" : "Corretiva"}
                          </Badge>
                        </TableCell>
                        <TableCell>{man.descricao}</TableCell>
                        <TableCell>{new Date(man.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{new Date(man.previsaoFim).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(man.custo)}</TableCell>
                        <TableCell>
                          {man.status === "em_andamento" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Wrench className="w-3 h-3 mr-1" />
                              Em Andamento
                            </Badge>
                          )}
                          {man.status === "programada" && (
                            <Badge variant="secondary">
                              <Calendar className="w-3 h-3 mr-1" />
                              Programada
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Abastecimento */}
          <TabsContent value="abastecimento">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Controle de Abastecimento</CardTitle>
                    <CardDescription>Registro de abastecimentos da frota</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Abastecimento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Litros</TableHead>
                      <TableHead className="text-right">Horimetro</TableHead>
                      <TableHead>Operador</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {abastecimentoMock.map((ab) => (
                      <TableRow key={ab.id}>
                        <TableCell className="font-mono font-bold">{ab.id}</TableCell>
                        <TableCell className="font-mono">{ab.equipamento}</TableCell>
                        <TableCell>{new Date(ab.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-right font-mono">{ab.litros}L</TableCell>
                        <TableCell className="text-right font-mono">{formatNumber(ab.horimetro)}h</TableCell>
                        <TableCell>{ab.operador}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
