"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Shield, AlertTriangle, CheckCircle2, Clock, HardHat, Leaf, FileText, Lock, Users } from "lucide-react"

// Dados mockados de Seguranca (SST)
const segurancaMock = [
  {
    id: "SEG-001",
    tipo: "DDS",
    titulo: "Trabalho em altura - Uso de EPI",
    data: "2026-01-03",
    participantes: 45,
    responsavel: "Tec. Ana Costa",
    status: "realizado",
  },
  {
    id: "SEG-002",
    tipo: "Inspecao",
    titulo: "Inspecao de andaimes - OAE Ponte",
    data: "2026-01-04",
    participantes: 0,
    responsavel: "Eng. Seguranca",
    status: "realizado",
  },
  {
    id: "SEG-003",
    tipo: "Treinamento",
    titulo: "NR-35 Trabalho em Altura",
    data: "2026-01-08",
    participantes: 25,
    responsavel: "Empresa Externa",
    status: "agendado",
  },
]

// Dados mockados de Incidentes
const incidentesMock = [
  {
    id: "INC-001",
    tipo: "Quase Acidente",
    descricao: "Queda de material de andaime - sem vitimas",
    local: "OAE-001",
    data: "2026-01-02",
    gravidade: "media",
    status: "investigado",
    acaoCorretiva: "Reforco de telas de protecao",
  },
]

// Dados mockados de Meio Ambiente
const meioAmbienteMock = [
  {
    id: "MA-001",
    tipo: "Licenca",
    descricao: "Licenca de Instalacao (LI)",
    orgao: "IBAMA",
    validade: "2027-06-30",
    status: "vigente",
  },
  {
    id: "MA-002",
    tipo: "Licenca",
    descricao: "Outorga de Uso de Agua",
    orgao: "ANA",
    validade: "2026-12-31",
    status: "vigente",
  },
  {
    id: "MA-003",
    tipo: "Monitoramento",
    descricao: "Qualidade da agua - Rio Paraiba",
    orgao: "Laboratorio",
    validade: "2026-01-15",
    status: "programado",
  },
]

export default function SSMAPage() {
  const [tab, setTab] = useState("seguranca")

  const diasSemAcidente = 125
  const ddsRealizados = segurancaMock.filter((s) => s.tipo === "DDS" && s.status === "realizado").length
  const licencasVigentes = meioAmbienteMock.filter((m) => m.status === "vigente").length

  return (
    <AppLayout>
      <Header
        title="SSMA - Seguranca, Saude e Meio Ambiente"
        description="Seguranca do Trabalho (SST) e Meio Ambiente - O Escudo do Lucro (Gate 6)"
      />

      <div className="p-6 space-y-6">
        {/* Conceito */}
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-red-500/10">
                <HardHat className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Setor de SSMA - GARANTIDOR</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Poder de Trava (Gate 6):</strong> Libera ou paralisa frentes de trabalho por questoes de
                  <strong> Seguranca (SST)</strong> ou<strong> Meio Ambiente</strong>. Garante conformidade com NRs e
                  licencas ambientais.
                </p>
              </div>
              <Badge className="bg-red-500">
                <Lock className="w-3 h-3 mr-1" />
                Gate 6
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Dias sem Acidente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{diasSemAcidente}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                DDS Realizados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{ddsRealizados}</div>
              <p className="text-xs text-muted-foreground">este mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Incidentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{incidentesMock.length}</div>
              <p className="text-xs text-muted-foreground">este mes</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Licencas Vigentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{licencasVigentes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Taxa de Frequencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">0.0</div>
              <p className="text-xs text-muted-foreground">TF acumulada</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="seguranca">
              <HardHat className="w-4 h-4 mr-2" />
              Seguranca (SST)
            </TabsTrigger>
            <TabsTrigger value="incidentes">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Incidentes
            </TabsTrigger>
            <TabsTrigger value="meioambiente">
              <Leaf className="w-4 h-4 mr-2" />
              Meio Ambiente
            </TabsTrigger>
          </TabsList>

          {/* Seguranca */}
          <TabsContent value="seguranca">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Acoes de Seguranca</CardTitle>
                    <CardDescription>DDS, inspecoes e treinamentos</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Acao
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Titulo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-center">Participantes</TableHead>
                      <TableHead>Responsavel</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {segurancaMock.map((seg) => (
                      <TableRow key={seg.id}>
                        <TableCell className="font-mono font-bold">{seg.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{seg.tipo}</Badge>
                        </TableCell>
                        <TableCell>{seg.titulo}</TableCell>
                        <TableCell>{new Date(seg.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-center font-mono">{seg.participantes || "-"}</TableCell>
                        <TableCell>{seg.responsavel}</TableCell>
                        <TableCell>
                          {seg.status === "realizado" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Realizado
                            </Badge>
                          )}
                          {seg.status === "agendado" && (
                            <Badge variant="outline" className="text-blue-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Agendado
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

          {/* Incidentes */}
          <TabsContent value="incidentes">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Registro de Incidentes</CardTitle>
                    <CardDescription>Acidentes, quase acidentes e desvios</CardDescription>
                  </div>
                  <Button variant="destructive">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Registrar Incidente
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {incidentesMock.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Descricao</TableHead>
                        <TableHead>Local</TableHead>
                        <TableHead>Gravidade</TableHead>
                        <TableHead>Acao Corretiva</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incidentesMock.map((inc) => (
                        <TableRow key={inc.id}>
                          <TableCell className="font-mono font-bold">{inc.id}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{inc.tipo}</Badge>
                          </TableCell>
                          <TableCell>{inc.descricao}</TableCell>
                          <TableCell>{inc.local}</TableCell>
                          <TableCell>
                            <Badge variant={inc.gravidade === "alta" ? "destructive" : "secondary"}>
                              {inc.gravidade}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{inc.acaoCorretiva}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Investigado
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-muted-foreground py-8">Nenhum incidente registrado</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Meio Ambiente */}
          <TabsContent value="meioambiente">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Gestao Ambiental</CardTitle>
                    <CardDescription>Licencas e monitoramento ambiental</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Licenca
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Orgao</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {meioAmbienteMock.map((ma) => (
                      <TableRow key={ma.id}>
                        <TableCell className="font-mono font-bold">{ma.id}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ma.tipo}</Badge>
                        </TableCell>
                        <TableCell>{ma.descricao}</TableCell>
                        <TableCell>{ma.orgao}</TableCell>
                        <TableCell>{new Date(ma.validade).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          {ma.status === "vigente" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Vigente
                            </Badge>
                          )}
                          {ma.status === "programado" && (
                            <Badge variant="outline" className="text-blue-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Programado
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
        </Tabs>
      </div>
    </AppLayout>
  )
}
