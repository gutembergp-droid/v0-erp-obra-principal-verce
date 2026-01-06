"use client"

import { useState, Suspense } from "react"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import {
  Plus,
  Search,
  Users,
  Clock,
  Calendar,
  UserCheck,
  UserX,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Phone,
  Mail,
} from "lucide-react"

// Dados mockados de Colaboradores
const colaboradoresMock = [
  {
    id: "COL-001",
    nome: "Jose Silva Santos",
    funcao: "Operador de Escavadeira",
    setor: "Producao",
    admissao: "2024-02-15",
    status: "ativo",
    turno: "Diurno",
    ctps: "123456",
    telefone: "(21) 99999-1111",
    email: "jose.silva@obra.com",
    salario: 4500,
  },
  {
    id: "COL-002",
    nome: "Maria Aparecida Costa",
    funcao: "Engenheira Civil",
    setor: "Engenharia",
    admissao: "2024-01-10",
    status: "ativo",
    turno: "Comercial",
    ctps: "234567",
    telefone: "(21) 99999-2222",
    email: "maria.costa@obra.com",
    salario: 12000,
  },
  {
    id: "COL-003",
    nome: "Carlos Eduardo Lima",
    funcao: "Encarregado de Terraplenagem",
    setor: "Producao",
    admissao: "2024-03-01",
    status: "ferias",
    turno: "Diurno",
    ctps: "345678",
    telefone: "(21) 99999-3333",
    email: "carlos.lima@obra.com",
    salario: 6500,
  },
  {
    id: "COL-004",
    nome: "Ana Paula Ferreira",
    funcao: "Tecnica de Seguranca",
    setor: "SSMA",
    admissao: "2024-04-20",
    status: "ativo",
    turno: "Diurno",
    ctps: "456789",
    telefone: "(21) 99999-4444",
    email: "ana.ferreira@obra.com",
    salario: 5200,
  },
]

// Dados mockados de Ponto
const pontoMock = [
  {
    colaborador: "Jose Silva Santos",
    data: "2026-01-03",
    entrada: "07:00",
    intervaloInicio: "12:00",
    intervaloFim: "13:00",
    saida: "17:00",
    horasTrabalhadas: 9,
    horasExtras: 1,
    status: "regular",
  },
  {
    colaborador: "Maria Aparecida Costa",
    data: "2026-01-03",
    entrada: "08:00",
    intervaloInicio: "12:00",
    intervaloFim: "13:00",
    saida: "18:00",
    horasTrabalhadas: 9,
    horasExtras: 1,
    status: "regular",
  },
  {
    colaborador: "Ana Paula Ferreira",
    data: "2026-01-03",
    entrada: "07:15",
    intervaloInicio: "12:00",
    intervaloFim: "13:00",
    saida: "17:00",
    horasTrabalhadas: 8.75,
    horasExtras: 0,
    status: "atraso",
  },
]

// Dados mockados de Ferias/Afastamentos
const afastamentosMock = [
  {
    colaborador: "Carlos Eduardo Lima",
    tipo: "ferias",
    dataInicio: "2026-01-02",
    dataFim: "2026-01-31",
    dias: 30,
    status: "em_gozo",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  }).format(value)
}

function RHContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("colaboradores")
  const [selectedColab, setSelectedColab] = useState<(typeof colaboradoresMock)[0] | null>(null)

  const totalColaboradores = colaboradoresMock.length
  const colaboradoresAtivos = colaboradoresMock.filter((c) => c.status === "ativo").length
  const colaboradoresFerias = colaboradoresMock.filter((c) => c.status === "ferias").length
  const horasExtrasMes = pontoMock.reduce((acc, p) => acc + p.horasExtras, 0)

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">RH - Recursos Humanos</h1>
          <InfoTooltip
            title="Setor de RH"
            description="Gerencia o cadastro de colaboradores, controle de ponto (entradas, saidas, horas extras) e afastamentos (ferias, licencas, atestados)."
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">Gestao de Pessoal, Controle de Ponto e Afastamentos</p>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Metricas */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalColaboradores}</div>
              <p className="text-xs text-muted-foreground">colaboradores</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{colaboradoresAtivos}</div>
              <p className="text-xs text-muted-foreground">
                {((colaboradoresAtivos / totalColaboradores) * 100).toFixed(0)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Em Ferias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">{colaboradoresFerias}</div>
              <p className="text-xs text-muted-foreground">colaboradores</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horas Extras
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">{horasExtrasMes}h</div>
              <p className="text-xs text-muted-foreground">no mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <UserX className="w-4 h-4" />
                Afastados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">atestados</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Atrasos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">
                {pontoMock.filter((p) => p.status === "atraso").length}
              </div>
              <p className="text-xs text-muted-foreground">hoje</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colaboradores">
              <Users className="w-4 h-4 mr-2" />
              Colaboradores
            </TabsTrigger>
            <TabsTrigger value="ponto">
              <Clock className="w-4 h-4 mr-2" />
              Controle de Ponto
            </TabsTrigger>
            <TabsTrigger value="afastamentos">
              <Calendar className="w-4 h-4 mr-2" />
              Afastamentos
            </TabsTrigger>
          </TabsList>

          {/* Colaboradores */}
          <TabsContent value="colaboradores">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Gestao de Pessoal</CardTitle>
                    <CardDescription>Colaboradores mobilizados na obra</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar colaborador..."
                        className="pl-9 w-48"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Colaborador
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Funcao</TableHead>
                      <TableHead>Setor</TableHead>
                      <TableHead>Turno</TableHead>
                      <TableHead>Admissao</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {colaboradoresMock.map((col) => (
                      <TableRow
                        key={col.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedColab(col)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                {col.nome
                                  .split(" ")
                                  .map((n) => n[0])
                                  .slice(0, 2)
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{col.nome}</p>
                              <p className="text-xs text-muted-foreground font-mono">{col.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{col.funcao}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{col.setor}</Badge>
                        </TableCell>
                        <TableCell>{col.turno}</TableCell>
                        <TableCell>{new Date(col.admissao).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          {col.status === "ativo" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <UserCheck className="w-3 h-3 mr-1" />
                              Ativo
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              Ferias
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

          {/* Controle de Ponto */}
          <TabsContent value="ponto">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Controle de Ponto</CardTitle>
                    <CardDescription>Registros de entrada e saida do dia</CardDescription>
                  </div>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar Espelho
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead className="text-center">Entrada</TableHead>
                      <TableHead className="text-center">Intervalo</TableHead>
                      <TableHead className="text-center">Saida</TableHead>
                      <TableHead className="text-center">Trabalhadas</TableHead>
                      <TableHead className="text-center">Extras</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pontoMock.map((ponto, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{ponto.colaborador}</TableCell>
                        <TableCell className="text-center font-mono">{ponto.entrada}</TableCell>
                        <TableCell className="text-center font-mono">
                          {ponto.intervaloInicio} - {ponto.intervaloFim}
                        </TableCell>
                        <TableCell className="text-center font-mono">{ponto.saida}</TableCell>
                        <TableCell className="text-center font-mono">{ponto.horasTrabalhadas}h</TableCell>
                        <TableCell className="text-center">
                          {ponto.horasExtras > 0 ? (
                            <Badge className="bg-chart-4/20 text-chart-4">{ponto.horasExtras}h</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {ponto.status === "regular" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Regular
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-4">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Atraso
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

          {/* Afastamentos */}
          <TabsContent value="afastamentos">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Afastamentos</CardTitle>
                    <CardDescription>Ferias, licencas e atestados</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar Afastamento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Inicio</TableHead>
                      <TableHead>Fim</TableHead>
                      <TableHead className="text-center">Dias</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {afastamentosMock.map((af, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{af.colaborador}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {af.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(af.dataInicio).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{new Date(af.dataFim).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-center font-mono">{af.dias}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-chart-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            Em Gozo
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Painel lateral para colaborador selecionado */}
      <Sheet open={!!selectedColab} onOpenChange={() => setSelectedColab(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedColab && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedColab.nome
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{selectedColab.nome}</span>
                    <p className="text-sm font-normal text-muted-foreground">{selectedColab.id}</p>
                  </div>
                </SheetTitle>
                <SheetDescription>{selectedColab.funcao}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Setor</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedColab.setor}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">
                      {selectedColab.status === "ativo" ? (
                        <Badge className="bg-primary/20 text-primary">Ativo</Badge>
                      ) : (
                        <Badge variant="outline" className="text-chart-1">
                          Ferias
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Turno</p>
                    <p className="text-sm font-medium mt-1">{selectedColab.turno}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Admissao</p>
                    <p className="text-sm font-medium mt-1">
                      {new Date(selectedColab.admissao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedColab.telefone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedColab.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">CTPS: {selectedColab.ctps}</span>
                  </div>
                </div>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Salario Base</span>
                      <span className="text-xl font-bold">{formatCurrency(selectedColab.salario)}</span>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Documentos
                  </Button>
                  <Button className="flex-1">Editar Cadastro</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function RHPage() {
  return (
    <Suspense fallback={null}>
      <RHContent />
    </Suspense>
  )
}
