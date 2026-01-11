"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { ObraProducaoNavbar } from "../../_components/obra-producao-navbar"
import {
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Sun,
  Cloud,
  CloudRain,
  Users,
  Truck,
  HardHat,
  Calendar,
  Send,
  AlertTriangle,
} from "lucide-react"

// Dados mockados de RDO
const rdosMock = [
  {
    id: "RDO-2026-001",
    data: "2026-01-03",
    clima: "ensolarado",
    efetivo: 245,
    equipamentos: 32,
    horasTrabalhadas: 8,
    ocorrencias: 0,
    status: "aprovado",
    responsavel: "Eng. Carlos Lima",
    atividades: [
      { frente: "Terraplenagem Norte", descricao: "Escavacao material 1a cat", qtd: 2500, und: "m3" },
      { frente: "Terraplenagem Sul", descricao: "Compactacao aterro", qtd: 1800, und: "m3" },
    ],
  },
  {
    id: "RDO-2026-002",
    data: "2026-01-04",
    clima: "nublado",
    efetivo: 238,
    equipamentos: 30,
    horasTrabalhadas: 8,
    ocorrencias: 1,
    status: "aprovado",
    responsavel: "Eng. Carlos Lima",
    atividades: [
      { frente: "Obras de Arte", descricao: "Concretagem fundacao", qtd: 45, und: "m3" },
      { frente: "Terraplenagem Norte", descricao: "Escavacao material 1a cat", qtd: 2200, und: "m3" },
    ],
  },
  {
    id: "RDO-2026-003",
    data: "2026-01-05",
    clima: "chuvoso",
    efetivo: 120,
    equipamentos: 15,
    horasTrabalhadas: 4,
    ocorrencias: 0,
    status: "pendente",
    responsavel: "Eng. Carlos Lima",
    atividades: [{ frente: "Obras de Arte", descricao: "Armacao fundacao", qtd: 2.5, und: "ton" }],
  },
]

// Dados mockados de Atividades do dia
const atividadesDiaMock = [
  {
    frente: "Terraplenagem Norte",
    atividade: "Escavacao de material 1a categoria",
    local: "km 108+500 a km 109+200",
    quantidade: 2500,
    unidade: "m3",
    equipe: "Equipe A",
    horario: "07:00 - 17:00",
  },
  {
    frente: "Terraplenagem Sul",
    atividade: "Compactacao de aterro",
    local: "km 95+000 a km 96+500",
    quantidade: 1800,
    unidade: "m3",
    equipe: "Equipe B",
    horario: "07:00 - 17:00",
  },
  {
    frente: "Obras de Arte",
    atividade: "Concretagem fundacao - Ponte Rio Paraiba",
    local: "OAE-001",
    quantidade: 45,
    unidade: "m3",
    equipe: "Equipe C",
    horario: "06:00 - 14:00",
  },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

function getClimaIcon(clima: string) {
  switch (clima) {
    case "ensolarado":
      return <Sun className="w-4 h-4 text-chart-4" />
    case "nublado":
      return <Cloud className="w-4 h-4 text-muted-foreground" />
    case "chuvoso":
      return <CloudRain className="w-4 h-4 text-chart-1" />
    default:
      return <Sun className="w-4 h-4" />
  }
}

function RDOContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [competencia, setCompetencia] = useState("jan-2026")
  const [selectedRDO, setSelectedRDO] = useState<(typeof rdosMock)[0] | null>(null)

  const rdosAprovados = rdosMock.filter((r) => r.status === "aprovado").length
  const rdosPendentes = rdosMock.filter((r) => r.status === "pendente").length
  const mediaEfetivo = Math.round(rdosMock.reduce((acc, r) => acc + r.efetivo, 0) / rdosMock.length)
  const mediaEquipamentos = Math.round(rdosMock.reduce((acc, r) => acc + r.equipamentos, 0) / rdosMock.length)
  const totalOcorrencias = rdosMock.reduce((acc, r) => acc + r.ocorrencias, 0)

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraProducaoNavbar />
      </div>

      <main className="flex-1 bg-background overflow-hidden p-6">
        <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Competencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={competencia} onValueChange={setCompetencia}>
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
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Aprovados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{rdosAprovados}</div>
              <p className="text-xs text-muted-foreground">RDOs</p>
            </CardContent>
          </Card>
          <Card className={rdosPendentes > 0 ? "border-chart-4/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${rdosPendentes > 0 ? "text-chart-4" : ""}`}>{rdosPendentes}</div>
              <p className="text-xs text-muted-foreground">RDOs</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Media Efetivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mediaEfetivo}</div>
              <p className="text-xs text-muted-foreground">colaboradores/dia</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Media Equip.
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mediaEquipamentos}</div>
              <p className="text-xs text-muted-foreground">equipamentos/dia</p>
            </CardContent>
          </Card>
          <Card className={totalOcorrencias > 0 ? "border-destructive/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Ocorrencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalOcorrencias > 0 ? "text-destructive" : "text-primary"}`}>
                {totalOcorrencias}
              </div>
              <p className="text-xs text-muted-foreground">no periodo</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de RDOs */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Relatorios Diarios</CardTitle>
                <CardDescription>Historico de RDOs do periodo</CardDescription>
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
                  Novo RDO
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Clima</TableHead>
                  <TableHead className="text-right">Efetivo</TableHead>
                  <TableHead className="text-right">Equipamentos</TableHead>
                  <TableHead className="text-right">Horas</TableHead>
                  <TableHead className="text-center">Ocorrencias</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rdosMock.map((rdo) => (
                  <TableRow
                    key={rdo.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedRDO(rdo)}
                  >
                    <TableCell className="font-mono font-bold">{rdo.id}</TableCell>
                    <TableCell>{new Date(rdo.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getClimaIcon(rdo.clima)}
                        <span className="capitalize">{rdo.clima}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">{rdo.efetivo}</TableCell>
                    <TableCell className="text-right font-mono">{rdo.equipamentos}</TableCell>
                    <TableCell className="text-right font-mono">{rdo.horasTrabalhadas}h</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={rdo.ocorrencias > 0 ? "destructive" : "secondary"}>{rdo.ocorrencias}</Badge>
                    </TableCell>
                    <TableCell>
                      {rdo.status === "aprovado" ? (
                        <Badge className="bg-primary/20 text-primary">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Aprovado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-chart-4">
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Atividades do Dia */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HardHat className="w-5 h-5 text-chart-4" />
              <CardTitle className="text-base">Atividades Executadas Hoje</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Frente</TableHead>
                  <TableHead>Atividade</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Horario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atividadesDiaMock.map((atv, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Badge variant="outline">{atv.frente}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{atv.atividade}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{atv.local}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatNumber(atv.quantidade)} {atv.unidade}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{atv.equipe}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{atv.horario}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Acoes */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Enviar para Aprovacao
          </Button>
        </div>
      </div>

      {/* Painel lateral para RDO selecionado */}
      <Sheet open={!!selectedRDO} onOpenChange={() => setSelectedRDO(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedRDO && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {selectedRDO.id}
                </SheetTitle>
                <SheetDescription>
                  {new Date(selectedRDO.data).toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Clima</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getClimaIcon(selectedRDO.clima)}
                      <span className="capitalize">{selectedRDO.clima}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">
                      {selectedRDO.status === "aprovado" ? (
                        <Badge className="bg-primary/20 text-primary">Aprovado</Badge>
                      ) : (
                        <Badge variant="outline" className="text-chart-4">
                          Pendente
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Responsavel</p>
                    <p className="text-sm font-medium mt-1">{selectedRDO.responsavel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Horas Trabalhadas</p>
                    <p className="text-sm font-medium mt-1">{selectedRDO.horasTrabalhadas}h</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Efetivo</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{selectedRDO.efetivo}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Equip.</span>
                      </div>
                      <p className="text-xl font-bold mt-1">{selectedRDO.equipamentos}</p>
                    </CardContent>
                  </Card>
                  <Card className={selectedRDO.ocorrencias > 0 ? "border-destructive/50" : ""}>
                    <CardContent className="pt-4">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Ocor.</span>
                      </div>
                      <p
                        className={`text-xl font-bold mt-1 ${selectedRDO.ocorrencias > 0 ? "text-destructive" : "text-primary"}`}
                      >
                        {selectedRDO.ocorrencias}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <HardHat className="w-4 h-4" />
                    Atividades Executadas
                  </h4>
                  <div className="space-y-2">
                    {selectedRDO.atividades.map((atv, idx) => (
                      <div key={idx} className="p-3 rounded-lg border bg-muted/30">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {atv.frente}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium">{atv.descricao}</p>
                        <p className="text-sm text-primary font-mono mt-1">
                          {formatNumber(atv.qtd)} {atv.und}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedRDO.status === "pendente" && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Editar
                    </Button>
                    <Button className="flex-1">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function RDOPage() {
  return (
    <Suspense fallback={null}>
      <RDOContent />
    </Suspense>
  )
}
