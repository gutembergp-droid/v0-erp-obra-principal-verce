"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  Search,
  Plus,
  FileText,
  CheckCircle2,
  Clock,
  Eye,
  Download,
  Upload,
  FolderOpen,
  GitBranch,
  AlertTriangle,
  Layers,
  History,
  Check,
  X,
} from "lucide-react"

// Dados mockados de GED
const documentosMock = [
  {
    id: "DOC-001",
    codigo: "PR-EST-001",
    titulo: "Projeto Estrutural - Ponte Rio Paraiba",
    disciplina: "Estrutural",
    revisao: "R03",
    status: "aprovado",
    dataUpload: "2026-01-10",
    autor: "Eng. Carlos Lima",
    tamanho: "45.2 MB",
  },
  {
    id: "DOC-002",
    codigo: "PR-GEO-001",
    titulo: "Projeto Geometrico - Trecho km 100-120",
    disciplina: "Geometrico",
    revisao: "R02",
    status: "em_revisao",
    dataUpload: "2026-01-08",
    autor: "Eng. Ana Paula",
    tamanho: "32.1 MB",
  },
  {
    id: "DOC-003",
    codigo: "PR-DRN-001",
    titulo: "Projeto de Drenagem - Trecho km 100-120",
    disciplina: "Drenagem",
    revisao: "R01",
    status: "pendente_aprovacao",
    dataUpload: "2026-01-12",
    autor: "Eng. Roberto Santos",
    tamanho: "18.5 MB",
  },
]

// Dados mockados de Revisoes
const revisoesMock = [
  {
    id: "REV-001",
    documento: "PR-EST-001",
    revisaoAnterior: "R02",
    revisaoNova: "R03",
    descricao: "Ajuste de armaduras nas fundacoes conforme NBR 6118",
    solicitante: "DNIT",
    data: "2026-01-10",
    status: "aprovada",
  },
  {
    id: "REV-002",
    documento: "PR-GEO-001",
    revisaoAnterior: "R01",
    revisaoNova: "R02",
    descricao: "Correcao de curvas de transicao no km 115",
    solicitante: "Interno",
    data: "2026-01-08",
    status: "em_analise",
  },
]

// Dados mockados de Compatibilizacao
const compatibilizacaoMock = [
  {
    id: "COMP-001",
    disciplinas: ["Estrutural", "Drenagem"],
    descricao: "Interferencia entre fundacao da ponte e galeria pluvial",
    severidade: "alta",
    status: "resolvido",
    responsavel: "Eng. Carlos Lima",
    dataIdentificacao: "2026-01-05",
    dataResolucao: "2026-01-08",
  },
  {
    id: "COMP-002",
    disciplinas: ["Geometrico", "Pavimentacao"],
    descricao: "Discrepancia de cotas no km 118.500",
    severidade: "media",
    status: "pendente",
    responsavel: "Eng. Ana Paula",
    dataIdentificacao: "2026-01-11",
    dataResolucao: null,
  },
]

export default function ProjetosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("ged")

  const docsAprovados = documentosMock.filter((d) => d.status === "aprovado").length
  const docsPendentes = documentosMock.filter((d) => d.status !== "aprovado").length
  const conflitosAtivos = compatibilizacaoMock.filter((c) => c.status === "pendente").length

  return (
    <AppLayout>
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Projetos</h1>
          <InfoTooltip
            title="Setor de Projetos"
            description="Gerencia a Gestao Eletronica de Documentos (GED), Controle de Revisoes com versionamento, Fluxo de Aprovacao tecnica e Compatibilizacao entre disciplinas."
            icon={<FolderOpen className="w-4 h-4" />}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          GED, Controle de Revisoes, Fluxo de Aprovacao e Compatibilizacao
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Total Documentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentosMock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Aprovados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{docsAprovados}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{docsPendentes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Revisoes Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revisoesMock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Conflitos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{conflitosAtivos}</div>
              <p className="text-xs text-muted-foreground">pendentes</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ged">
              <FolderOpen className="w-4 h-4 mr-2" />
              GED
            </TabsTrigger>
            <TabsTrigger value="revisoes">
              <History className="w-4 h-4 mr-2" />
              Revisoes
            </TabsTrigger>
            <TabsTrigger value="aprovacao">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Aprovacao
            </TabsTrigger>
            <TabsTrigger value="compatibilizacao">
              <Layers className="w-4 h-4 mr-2" />
              Compatibilizacao
            </TabsTrigger>
          </TabsList>

          {/* GED */}
          <TabsContent value="ged">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Gestao Eletronica de Documentos</CardTitle>
                    <CardDescription>Repositorio centralizado de projetos</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar documento..."
                        className="pl-9 w-48"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Codigo</TableHead>
                      <TableHead>Titulo</TableHead>
                      <TableHead>Disciplina</TableHead>
                      <TableHead>Revisao</TableHead>
                      <TableHead>Tamanho</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentosMock.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-mono font-bold">{doc.codigo}</TableCell>
                        <TableCell>{doc.titulo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.disciplina}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{doc.revisao}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{doc.tamanho}</TableCell>
                        <TableCell>
                          {doc.status === "aprovado" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Aprovado
                            </Badge>
                          )}
                          {doc.status === "em_revisao" && (
                            <Badge variant="outline" className="text-blue-500">
                              <GitBranch className="w-3 h-3 mr-1" />
                              Em Revisao
                            </Badge>
                          )}
                          {doc.status === "pendente_aprovacao" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revisoes */}
          <TabsContent value="revisoes">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Controle de Revisoes</CardTitle>
                    <CardDescription>Historico de alteracoes com versionamento</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Revisao
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>De / Para</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Solicitante</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {revisoesMock.map((rev) => (
                      <TableRow key={rev.id}>
                        <TableCell className="font-mono font-bold">{rev.id}</TableCell>
                        <TableCell className="font-mono">{rev.documento}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{rev.revisaoAnterior}</Badge>
                            <span>→</span>
                            <Badge>{rev.revisaoNova}</Badge>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <span className="line-clamp-1">{rev.descricao}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{rev.solicitante}</Badge>
                        </TableCell>
                        <TableCell>
                          {rev.status === "aprovada" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Aprovada
                            </Badge>
                          )}
                          {rev.status === "em_analise" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Em Analise
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

          {/* Aprovacao */}
          <TabsContent value="aprovacao">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fluxo de Aprovacao</CardTitle>
                <CardDescription>Documentos aguardando aprovacao tecnica</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documentosMock
                    .filter((d) => d.status === "pendente_aprovacao")
                    .map((doc) => (
                      <Card key={doc.id} className="border-amber-500/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{doc.codigo}</Badge>
                                <Badge variant="secondary">{doc.revisao}</Badge>
                              </div>
                              <h4 className="font-semibold mt-2">{doc.titulo}</h4>
                              <p className="text-sm text-muted-foreground">
                                Por {doc.autor} em {new Date(doc.dataUpload).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" className="text-red-500 border-red-500 bg-transparent">
                                <X className="w-4 h-4 mr-2" />
                                Reprovar
                              </Button>
                              <Button className="bg-green-500 hover:bg-green-600">
                                <Check className="w-4 h-4 mr-2" />
                                Aprovar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  {documentosMock.filter((d) => d.status === "pendente_aprovacao").length === 0 && (
                    <p className="text-center text-muted-foreground py-8">Nenhum documento pendente de aprovacao</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compatibilizacao */}
          <TabsContent value="compatibilizacao">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Compatibilizacao de Projetos</CardTitle>
                    <CardDescription>Identificacao e resolucao de conflitos entre disciplinas</CardDescription>
                  </div>
                  <Button>
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Reportar Conflito
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Disciplinas</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Severidade</TableHead>
                      <TableHead>Responsavel</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {compatibilizacaoMock.map((comp) => (
                      <TableRow key={comp.id}>
                        <TableCell className="font-mono font-bold">{comp.id}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {comp.disciplinas.map((d, i) => (
                              <Badge key={i} variant="outline">
                                {d}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{comp.descricao}</TableCell>
                        <TableCell>
                          <Badge
                            variant={comp.severidade === "alta" ? "destructive" : "secondary"}
                            className={comp.severidade === "alta" ? "" : "text-amber-500"}
                          >
                            {comp.severidade}
                          </Badge>
                        </TableCell>
                        <TableCell>{comp.responsavel}</TableCell>
                        <TableCell>
                          {comp.status === "resolvido" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Resolvido
                            </Badge>
                          )}
                          {comp.status === "pendente" && (
                            <Badge variant="outline" className="text-red-500">
                              <AlertTriangle className="w-3 h-3 mr-1" />
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
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
