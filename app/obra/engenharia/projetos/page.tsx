"use client"

import { useState, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
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
  Calendar,
  User,
  FileCheck,
  XCircle,
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
    historico: [
      { revisao: "R01", data: "2025-11-15", autor: "Eng. Carlos Lima", status: "substituida" },
      { revisao: "R02", data: "2025-12-20", autor: "Eng. Carlos Lima", status: "substituida" },
      { revisao: "R03", data: "2026-01-10", autor: "Eng. Carlos Lima", status: "vigente" },
    ],
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
    historico: [
      { revisao: "R01", data: "2025-10-05", autor: "Eng. Ana Paula", status: "substituida" },
      { revisao: "R02", data: "2026-01-08", autor: "Eng. Ana Paula", status: "em_revisao" },
    ],
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
    historico: [{ revisao: "R01", data: "2026-01-12", autor: "Eng. Roberto Santos", status: "pendente" }],
  },
  {
    id: "DOC-004",
    codigo: "PR-PAV-001",
    titulo: "Projeto de Pavimentacao - Trecho km 100-120",
    disciplina: "Pavimentacao",
    revisao: "R01",
    status: "aprovado",
    dataUpload: "2025-12-15",
    autor: "Eng. Marcos Silva",
    tamanho: "28.7 MB",
    historico: [{ revisao: "R01", data: "2025-12-15", autor: "Eng. Marcos Silva", status: "vigente" }],
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
    impacto: "Medio",
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
    impacto: "Baixo",
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

function ProjetosContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("ged")
  const [selectedDoc, setSelectedDoc] = useState<(typeof documentosMock)[0] | null>(null)
  const [selectedConflito, setSelectedConflito] = useState<(typeof compatibilizacaoMock)[0] | null>(null)

  const docsAprovados = documentosMock.filter((d) => d.status === "aprovado").length
  const docsPendentes = documentosMock.filter((d) => d.status === "pendente_aprovacao").length
  const docsEmRevisao = documentosMock.filter((d) => d.status === "em_revisao").length
  const conflitosAtivos = compatibilizacaoMock.filter((c) => c.status === "pendente").length
  const totalRevisoes = revisoesMock.length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return (
          <Badge className="bg-primary/20 text-primary border-primary/30">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Aprovado
          </Badge>
        )
      case "em_revisao":
        return (
          <Badge variant="outline" className="text-chart-1 border-chart-1/30">
            <GitBranch className="w-3 h-3 mr-1" />
            Em Revisao
          </Badge>
        )
      case "pendente_aprovacao":
        return (
          <Badge variant="outline" className="text-chart-4 border-chart-4/30">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
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

      <div className="p-6 space-y-6 flex-1">
        {/* Metricas */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentosMock.length}</div>
              <p className="text-xs text-muted-foreground">documentos</p>
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
              <div className="text-2xl font-bold text-primary">{docsAprovados}</div>
              <p className="text-xs text-muted-foreground">
                {((docsAprovados / documentosMock.length) * 100).toFixed(0)}%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <GitBranch className="w-4 h-4" />
                Em Revisao
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">{docsEmRevisao}</div>
              <p className="text-xs text-muted-foreground">em andamento</p>
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
              <div className="text-2xl font-bold text-chart-4">{docsPendentes}</div>
              <p className="text-xs text-muted-foreground">aguardando</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <History className="w-4 h-4" />
                Revisoes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevisoes}</div>
              <p className="text-xs text-muted-foreground">no periodo</p>
            </CardContent>
          </Card>
          <Card className={conflitosAtivos > 0 ? "border-destructive/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Conflitos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${conflitosAtivos > 0 ? "text-destructive" : "text-primary"}`}>
                {conflitosAtivos}
              </div>
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
                      <TableRow
                        key={doc.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedDoc(doc)}
                      >
                        <TableCell className="font-mono font-bold">{doc.codigo}</TableCell>
                        <TableCell>{doc.titulo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{doc.disciplina}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{doc.revisao}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{doc.tamanho}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
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
                      <TableHead>Impacto</TableHead>
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
                          <Badge
                            variant="outline"
                            className={
                              rev.impacto === "Alto"
                                ? "text-destructive"
                                : rev.impacto === "Medio"
                                  ? "text-chart-4"
                                  : "text-primary"
                            }
                          >
                            {rev.impacto}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {rev.status === "aprovada" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Aprovada
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-4">
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
                      <Card key={doc.id} className="border-chart-4/30">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{doc.codigo}</Badge>
                                <Badge variant="secondary">{doc.revisao}</Badge>
                                <Badge variant="outline">{doc.disciplina}</Badge>
                              </div>
                              <h4 className="font-semibold mt-2">{doc.titulo}</h4>
                              <p className="text-sm text-muted-foreground">
                                Por {doc.autor} em {new Date(doc.dataUpload).toLocaleDateString("pt-BR")}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                className="text-destructive border-destructive/30 bg-transparent"
                              >
                                <X className="w-4 h-4 mr-2" />
                                Reprovar
                              </Button>
                              <Button className="bg-primary hover:bg-primary/90">
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
                      <TableRow
                        key={comp.id}
                        className={`cursor-pointer hover:bg-muted/50 ${comp.status === "pendente" ? "bg-destructive/5" : ""}`}
                        onClick={() => setSelectedConflito(comp)}
                      >
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
                            variant={comp.severidade === "alta" ? "destructive" : "outline"}
                            className={comp.severidade === "media" ? "text-chart-4" : ""}
                          >
                            {comp.severidade}
                          </Badge>
                        </TableCell>
                        <TableCell>{comp.responsavel}</TableCell>
                        <TableCell>
                          {comp.status === "resolvido" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Resolvido
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-destructive">
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

      <Sheet open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedDoc && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {selectedDoc.codigo}
                </SheetTitle>
                <SheetDescription>{selectedDoc.titulo}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {/* Info do documento */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Disciplina</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedDoc.disciplina}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Revisao Atual</p>
                    <Badge className="mt-1">{selectedDoc.revisao}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Autor</p>
                    <p className="text-sm font-medium flex items-center gap-1 mt-1">
                      <User className="w-3 h-3" />
                      {selectedDoc.autor}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data Upload</p>
                    <p className="text-sm font-medium flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(selectedDoc.dataUpload).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tamanho</p>
                    <p className="text-sm font-medium mt-1">{selectedDoc.tamanho}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">{getStatusBadge(selectedDoc.status)}</div>
                  </div>
                </div>

                {/* Historico de revisoes */}
                <div>
                  <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Historico de Revisoes
                  </h4>
                  <div className="space-y-2">
                    {selectedDoc.historico.map((h, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg border ${h.status === "vigente" ? "bg-primary/5 border-primary/30" : "bg-muted/30"}`}
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant={h.status === "vigente" ? "default" : "outline"}>{h.revisao}</Badge>
                          <div>
                            <p className="text-sm font-medium">{h.autor}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(h.data).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        {h.status === "vigente" ? (
                          <Badge className="bg-primary/20 text-primary">
                            <FileCheck className="w-3 h-3 mr-1" />
                            Vigente
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="w-3 h-3 mr-1" />
                            Substituida
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acoes */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Visualizar
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Painel lateral para conflito selecionado */}
      <Sheet open={!!selectedConflito} onOpenChange={() => setSelectedConflito(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedConflito && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-chart-4" />
                  {selectedConflito.id}
                </SheetTitle>
                <SheetDescription>Conflito de Compatibilizacao</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Disciplinas Envolvidas</p>
                  <div className="flex gap-2">
                    {selectedConflito.disciplinas.map((d, i) => (
                      <Badge key={i} variant="outline">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Descricao do Conflito</p>
                  <p className="text-sm">{selectedConflito.descricao}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Severidade</p>
                    <Badge
                      variant={selectedConflito.severidade === "alta" ? "destructive" : "outline"}
                      className={`mt-1 ${selectedConflito.severidade === "media" ? "text-chart-4" : ""}`}
                    >
                      {selectedConflito.severidade}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">
                      {selectedConflito.status === "resolvido" ? (
                        <Badge className="bg-primary/20 text-primary">Resolvido</Badge>
                      ) : (
                        <Badge variant="outline" className="text-destructive">
                          Pendente
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Responsavel</p>
                    <p className="text-sm font-medium mt-1">{selectedConflito.responsavel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Identificado em</p>
                    <p className="text-sm font-medium mt-1">
                      {new Date(selectedConflito.dataIdentificacao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
                {selectedConflito.status === "pendente" && (
                  <Button className="w-full">
                    <Check className="w-4 h-4 mr-2" />
                    Marcar como Resolvido
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

export default function ProjetosPage() {
  return (
    <Suspense fallback={null}>
      <ProjetosContent />
    </Suspense>
  )
}
