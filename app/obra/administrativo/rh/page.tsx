"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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

export default function RHPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("colaboradores")

  const totalColaboradores = colaboradoresMock.length
  const colaboradoresAtivos = colaboradoresMock.filter((c) => c.status === "ativo").length
  const colaboradoresFerias = colaboradoresMock.filter((c) => c.status === "ferias").length

  return (
    <AppLayout>
      <Header
        title="RH - Recursos Humanos"
        description="Gestao de Pessoal, Controle de Ponto e Afastamentos"
        rightContent={
          <InfoTooltip
            title="Setor de RH"
            description="Gerencia o cadastro de colaboradores, controle de ponto (entradas, saidas, horas extras) e afastamentos (ferias, licencas, atestados)."
          />
        }
      />

      <div className="p-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Colaboradores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalColaboradores}</div>
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
              <div className="text-2xl font-bold text-green-500">{colaboradoresAtivos}</div>
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
              <div className="text-2xl font-bold text-blue-500">{colaboradoresFerias}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Horas Extras Mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">245h</div>
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
                      <TableRow key={col.id}>
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
                          {col.status === "ativo" && (
                            <Badge className="bg-green-500">
                              <UserCheck className="w-3 h-3 mr-1" />
                              Ativo
                            </Badge>
                          )}
                          {col.status === "ferias" && (
                            <Badge variant="outline" className="text-blue-500">
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
                            <Badge className="bg-amber-500">{ponto.horasExtras}h</Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {ponto.status === "regular" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Regular
                            </Badge>
                          )}
                          {ponto.status === "atraso" && (
                            <Badge variant="outline" className="text-amber-500">
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
                          <Badge variant="outline" className="text-blue-500">
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
    </AppLayout>
  )
}
