"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Plus,
  CheckCircle2,
  Wrench,
  Truck,
  Calendar,
  Fuel,
  Activity,
  XCircle,
  Clock,
  TrendingUp,
  MapPin,
} from "lucide-react"

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
    operador: "Jose Silva",
    custoHora: 450,
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
    operador: "Carlos Santos",
    custoHora: 280,
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
    operador: "-",
    custoHora: 320,
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
    operador: "-",
    custoHora: 850,
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
    pecas: ["Mangueira hidraulica", "Conexoes", "Oleo hidraulico"],
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
    pecas: ["Filtro de oleo", "Filtro de ar", "Oleo motor"],
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

function EquipamentosContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("frota")
  const [selectedEquip, setSelectedEquip] = useState<(typeof equipamentosMock)[0] | null>(null)
  const [selectedManut, setSelectedManut] = useState<(typeof manutencoesMock)[0] | null>(null)

  const totalEquipamentos = equipamentosMock.length
  const equipOperando = equipamentosMock.filter((e) => e.status === "operando").length
  const equipManutencao = equipamentosMock.filter((e) => e.status === "manutencao").length
  const equipParado = equipamentosMock.filter((e) => e.status === "parado").length
  const disponibilidadeMedia = Math.round(
    equipamentosMock.reduce((acc, e) => acc + e.disponibilidade, 0) / equipamentosMock.length,
  )
  const consumoTotal = equipamentosMock.reduce((acc, e) => acc + e.consumoDiario, 0)

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Equipamentos</h1>
          <InfoTooltip
            title="Setor de Equipamentos"
            description="Gerencia a frota de equipamentos, controle de manutencoes preventivas e corretivas, e abastecimento com rastreamento de consumo."
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">Gestao de Ativos, Manutencao e Abastecimento</p>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Metricas */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Total Frota
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEquipamentos}</div>
              <p className="text-xs text-muted-foreground">equipamentos</p>
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
              <div className="text-2xl font-bold text-primary">{equipOperando}</div>
              <p className="text-xs text-muted-foreground">
                {((equipOperando / totalEquipamentos) * 100).toFixed(0)}% da frota
              </p>
            </CardContent>
          </Card>
          <Card className={equipManutencao > 0 ? "border-chart-4/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wrench className="w-4 h-4" />
                Em Manutencao
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${equipManutencao > 0 ? "text-chart-4" : ""}`}>{equipManutencao}</div>
              <p className="text-xs text-muted-foreground">equipamentos</p>
            </CardContent>
          </Card>
          <Card className={equipParado > 0 ? "border-destructive/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Parados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${equipParado > 0 ? "text-destructive" : ""}`}>{equipParado}</div>
              <p className="text-xs text-muted-foreground">equipamentos</p>
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
              <div className={`text-2xl font-bold ${disponibilidadeMedia >= 85 ? "text-primary" : "text-chart-4"}`}>
                {disponibilidadeMedia}%
              </div>
              <Progress value={disponibilidadeMedia} className="mt-1 h-2" />
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
              <div className="text-2xl font-bold">{formatNumber(consumoTotal)}L</div>
              <p className="text-xs text-muted-foreground">diesel</p>
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
                      <TableRow
                        key={eq.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedEquip(eq)}
                      >
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
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Operando
                            </Badge>
                          )}
                          {eq.status === "manutencao" && (
                            <Badge variant="outline" className="text-chart-4">
                              <Wrench className="w-3 h-3 mr-1" />
                              Manutencao
                            </Badge>
                          )}
                          {eq.status === "parado" && (
                            <Badge variant="outline" className="text-destructive">
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
                      <TableRow
                        key={man.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedManut(man)}
                      >
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
                            <Badge variant="outline" className="text-chart-4">
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

      {/* Painel lateral para equipamento selecionado */}
      <Sheet open={!!selectedEquip} onOpenChange={() => setSelectedEquip(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedEquip && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  {selectedEquip.codigo}
                </SheetTitle>
                <SheetDescription>{selectedEquip.descricao}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedEquip.tipo}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">
                      {selectedEquip.status === "operando" && (
                        <Badge className="bg-primary/20 text-primary">Operando</Badge>
                      )}
                      {selectedEquip.status === "manutencao" && (
                        <Badge variant="outline" className="text-chart-4">
                          Manutencao
                        </Badge>
                      )}
                      {selectedEquip.status === "parado" && (
                        <Badge variant="outline" className="text-destructive">
                          Parado
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frente</p>
                    <p className="text-sm font-medium flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {selectedEquip.frente}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Operador</p>
                    <p className="text-sm font-medium mt-1">{selectedEquip.operador}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Disponibilidade</p>
                  <div className="flex items-center gap-3">
                    <Progress value={selectedEquip.disponibilidade} className="flex-1 h-3" />
                    <span className="font-mono font-bold">{selectedEquip.disponibilidade}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Horimetro</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{formatNumber(selectedEquip.horasOdometro)}h</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Prox. Manut.</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{formatNumber(selectedEquip.proximaManutencao)}h</p>
                      <p className="text-xs text-chart-4">
                        Faltam {formatNumber(selectedEquip.proximaManutencao - selectedEquip.horasOdometro)}h
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Consumo/Dia</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{selectedEquip.consumoDiario}L</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Custo/Hora</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{formatCurrency(selectedEquip.custoHora)}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Painel lateral para manutencao selecionada */}
      <Sheet open={!!selectedManut} onOpenChange={() => setSelectedManut(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedManut && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Wrench className="w-5 h-5" />
                  {selectedManut.id}
                </SheetTitle>
                <SheetDescription>{selectedManut.descricao}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Equipamento</p>
                    <p className="text-sm font-medium mt-1">{selectedManut.equipamento}</p>
                    <p className="text-xs text-muted-foreground">{selectedManut.descricaoEquip}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <Badge variant={selectedManut.tipo === "preventiva" ? "secondary" : "destructive"} className="mt-1">
                      {selectedManut.tipo === "preventiva" ? "Preventiva" : "Corretiva"}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Inicio</p>
                    <p className="text-sm font-medium mt-1">
                      {new Date(selectedManut.dataInicio).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Previsao Fim</p>
                    <p className="text-sm font-medium mt-1">
                      {new Date(selectedManut.previsaoFim).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Pecas Utilizadas</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedManut.pecas.map((peca, idx) => (
                      <Badge key={idx} variant="outline">
                        {peca}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Custo Estimado</span>
                      <span className="text-xl font-bold">{formatCurrency(selectedManut.custo)}</span>
                    </div>
                  </CardContent>
                </Card>

                {selectedManut.status === "em_andamento" && (
                  <Button className="w-full">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Finalizar Manutencao
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function EquipamentosPage() {
  return (
    <Suspense fallback={null}>
      <EquipamentosContent />
    </Suspense>
  )
}
