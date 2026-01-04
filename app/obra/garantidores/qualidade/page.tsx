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
import {
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ClipboardCheck,
  AlertTriangle,
  FileCheck,
  Shield,
  Lock,
} from "lucide-react"

// Dados mockados de FVS
const fvsMock = [
  {
    id: "FVS-001",
    servico: "Concretagem fundacao estaca E-15",
    local: "OAE-001 - Ponte Rio Paraiba",
    data: "2026-01-03",
    responsavel: "Eng. Roberto Lima",
    resultado: "conforme",
    itensVerificados: 12,
    itensNaoConformes: 0,
  },
  {
    id: "FVS-002",
    servico: "Compactacao aterro km 95+500",
    local: "Terraplenagem Sul",
    data: "2026-01-03",
    responsavel: "Tec. Ana Costa",
    resultado: "conforme",
    itensVerificados: 8,
    itensNaoConformes: 0,
  },
  {
    id: "FVS-003",
    servico: "Lancamento sub-base granular",
    local: "Pavimentacao km 102",
    data: "2026-01-04",
    responsavel: "Tec. Carlos Silva",
    resultado: "nao_conforme",
    itensVerificados: 10,
    itensNaoConformes: 2,
  },
]

// Dados mockados de Nao Conformidades
const ncMock = [
  {
    id: "NC-001",
    origem: "FVS-003",
    descricao: "Espessura da sub-base abaixo do especificado",
    tipo: "execucao",
    severidade: "maior",
    dataAbertura: "2026-01-04",
    prazoAcao: "2026-01-10",
    status: "em_tratamento",
    responsavel: "Eng. Pedro Santos",
  },
  {
    id: "NC-002",
    origem: "Auditoria",
    descricao: "Falta de rastreabilidade de agregados",
    tipo: "processo",
    severidade: "menor",
    dataAbertura: "2026-01-02",
    prazoAcao: "2026-01-15",
    status: "aberta",
    responsavel: "Eng. Maria Costa",
  },
]

// Dados mockados de Gates de Qualidade
const gatesMock = [
  {
    gate: "Gate 5",
    descricao: "Liberacao de Concretagem",
    itemEAP: "3.1 - Fundacoes Ponte",
    dataVerificacao: "2026-01-03",
    status: "liberado",
    responsavel: "Eng. Qualidade",
    observacao: "Armadura e formas verificadas",
  },
  {
    gate: "Gate 5",
    descricao: "Liberacao de Compactacao",
    itemEAP: "1.4 - Compactacao Aterro",
    dataVerificacao: "2026-01-04",
    status: "pendente",
    responsavel: "Eng. Qualidade",
    observacao: "Aguardando ensaio de densidade",
  },
]

export default function QualidadePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("fvs")

  const totalFVS = fvsMock.length
  const fvsConformes = fvsMock.filter((f) => f.resultado === "conforme").length
  const ncAbertas = ncMock.filter((n) => n.status !== "fechada").length

  return (
    <AppLayout>
      <Header
        title="Qualidade"
        description="FVS, Nao Conformidades e Gates de Liberacao - O Escudo do Lucro (Gate 5)"
      />

      <div className="p-6 space-y-6">
        {/* Conceito */}
        <Card className="border-emerald-500/20 bg-emerald-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <Shield className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Setor de Qualidade - GARANTIDOR</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Poder de Trava (Gate 5):</strong> Libera ou bloqueia servicos atraves de
                  <strong> FVS (Ficha de Verificacao de Servico)</strong> e controla
                  <strong> Nao Conformidades</strong>. Nenhum servico avanca sem aprovacao da Qualidade.
                </p>
              </div>
              <Badge className="bg-emerald-500">
                <Lock className="w-3 h-3 mr-1" />
                Gate 5
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4" />
                FVS Realizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFVS}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Conformes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{fvsConformes}</div>
              <p className="text-xs text-muted-foreground">
                {((fvsConformes / totalFVS) * 100).toFixed(0)}% conformidade
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Nao Conformes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{totalFVS - fvsConformes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                NCs Abertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{ncAbertas}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileCheck className="w-4 h-4" />
                Gates Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {gatesMock.filter((g) => g.status === "pendente").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="fvs">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              FVS
            </TabsTrigger>
            <TabsTrigger value="nc">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Nao Conformidades
            </TabsTrigger>
            <TabsTrigger value="gates">
              <Shield className="w-4 h-4 mr-2" />
              Gates de Liberacao
            </TabsTrigger>
          </TabsList>

          {/* FVS */}
          <TabsContent value="fvs">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Fichas de Verificacao de Servico</CardTitle>
                    <CardDescription>Controle de qualidade na execucao</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar FVS..."
                        className="pl-9 w-48"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Nova FVS
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Servico</TableHead>
                      <TableHead>Local</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-center">Itens</TableHead>
                      <TableHead>Responsavel</TableHead>
                      <TableHead>Resultado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fvsMock.map((fvs) => (
                      <TableRow key={fvs.id}>
                        <TableCell className="font-mono font-bold">{fvs.id}</TableCell>
                        <TableCell>{fvs.servico}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{fvs.local}</TableCell>
                        <TableCell>{new Date(fvs.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-center">
                          <span className="font-mono">{fvs.itensVerificados}</span>
                          {fvs.itensNaoConformes > 0 && (
                            <span className="text-red-500 ml-1">({fvs.itensNaoConformes} NC)</span>
                          )}
                        </TableCell>
                        <TableCell>{fvs.responsavel}</TableCell>
                        <TableCell>
                          {fvs.resultado === "conforme" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Conforme
                            </Badge>
                          )}
                          {fvs.resultado === "nao_conforme" && (
                            <Badge variant="destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              Nao Conforme
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

          {/* Nao Conformidades */}
          <TabsContent value="nc">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Nao Conformidades</CardTitle>
                    <CardDescription>Registro e tratamento de desvios</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Registrar NC
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Severidade</TableHead>
                      <TableHead>Prazo</TableHead>
                      <TableHead>Responsavel</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ncMock.map((nc) => (
                      <TableRow key={nc.id}>
                        <TableCell className="font-mono font-bold">{nc.id}</TableCell>
                        <TableCell>{nc.descricao}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {nc.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={nc.severidade === "maior" ? "destructive" : "secondary"}>
                            {nc.severidade}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(nc.prazoAcao).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{nc.responsavel}</TableCell>
                        <TableCell>
                          {nc.status === "aberta" && (
                            <Badge variant="outline" className="text-red-500">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Aberta
                            </Badge>
                          )}
                          {nc.status === "em_tratamento" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Em Tratamento
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

          {/* Gates */}
          <TabsContent value="gates">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Gates de Liberacao (Gate 5)</CardTitle>
                <CardDescription>Pontos de controle que liberam ou bloqueiam servicos</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gate</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Item EAP</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Observacao</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gatesMock.map((gate, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          <Badge className="bg-emerald-500">{gate.gate}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{gate.descricao}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{gate.itemEAP}</TableCell>
                        <TableCell>{new Date(gate.dataVerificacao).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-sm">{gate.observacao}</TableCell>
                        <TableCell>
                          {gate.status === "liberado" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Liberado
                            </Badge>
                          )}
                          {gate.status === "pendente" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                          {gate.status === "bloqueado" && (
                            <Badge variant="destructive">
                              <Lock className="w-3 h-3 mr-1" />
                              Bloqueado
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
