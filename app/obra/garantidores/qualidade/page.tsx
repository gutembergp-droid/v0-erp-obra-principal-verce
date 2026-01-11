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
import { Progress } from "@/components/ui/progress"
import { ObraGarantidoresNavbar } from "../../_components/obra-garantidores-navbar"
import {
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ClipboardCheck,
  AlertTriangle,
  Shield,
  Lock,
  User,
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
    itens: [
      { item: "Verificacao de formas", resultado: "ok" },
      { item: "Posicionamento armadura", resultado: "ok" },
      { item: "Slump test", resultado: "ok" },
      { item: "Temperatura concreto", resultado: "ok" },
    ],
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
    itens: [
      { item: "Umidade otima", resultado: "ok" },
      { item: "Densidade in-situ", resultado: "ok" },
      { item: "Espessura camada", resultado: "ok" },
    ],
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
    itens: [
      { item: "Granulometria", resultado: "ok" },
      { item: "Espessura camada", resultado: "nc" },
      { item: "Compactacao", resultado: "nc" },
    ],
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
    acaoCorretiva: "Refazer camada com espessura correta",
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
    acaoCorretiva: "Implementar controle de lotes",
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
    checklist: ["Formas OK", "Armadura OK", "Escoramento OK", "Projeto conferido"],
  },
  {
    gate: "Gate 5",
    descricao: "Liberacao de Compactacao",
    itemEAP: "1.4 - Compactacao Aterro",
    dataVerificacao: "2026-01-04",
    status: "pendente",
    responsavel: "Eng. Qualidade",
    observacao: "Aguardando ensaio de densidade",
    checklist: ["Material OK", "Umidade OK", "Aguardando ensaio"],
  },
]

function QualidadeContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tab, setTab] = useState("fvs")
  const [selectedFVS, setSelectedFVS] = useState<(typeof fvsMock)[0] | null>(null)
  const [selectedNC, setSelectedNC] = useState<(typeof ncMock)[0] | null>(null)
  const [selectedGate, setSelectedGate] = useState<(typeof gatesMock)[0] | null>(null)

  const totalFVS = fvsMock.length
  const fvsConformes = fvsMock.filter((f) => f.resultado === "conforme").length
  const ncAbertas = ncMock.filter((n) => n.status !== "fechada").length
  const gatesPendentes = gatesMock.filter((g) => g.status === "pendente").length
  const taxaConformidade = ((fvsConformes / totalFVS) * 100).toFixed(0)

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ObraGarantidoresNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      <div className="pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Qualidade</h1>
          <InfoTooltip
            title="Setor de Qualidade - GARANTIDOR"
            description="Poder de Trava (Gate 5): Libera ou bloqueia servicos atraves de FVS (Ficha de Verificacao de Servico) e controla Nao Conformidades. Nenhum servico avanca sem aprovacao da Qualidade."
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          FVS, Nao Conformidades e Gates de Liberacao - O Escudo do Lucro (Gate 5)
        </p>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Metricas */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4" />
                FVS Realizadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalFVS}</div>
              <p className="text-xs text-muted-foreground">no periodo</p>
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
              <div className="text-2xl font-bold text-primary">{fvsConformes}</div>
              <p className="text-xs text-muted-foreground">{taxaConformidade}% conformidade</p>
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
              <div className="text-2xl font-bold text-destructive">{totalFVS - fvsConformes}</div>
              <p className="text-xs text-muted-foreground">FVS</p>
            </CardContent>
          </Card>
          <Card className={ncAbertas > 0 ? "border-chart-4/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                NCs Abertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${ncAbertas > 0 ? "text-chart-4" : "text-primary"}`}>{ncAbertas}</div>
              <p className="text-xs text-muted-foreground">pendentes</p>
            </CardContent>
          </Card>
          <Card className={gatesPendentes > 0 ? "border-chart-4/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Gates Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${gatesPendentes > 0 ? "text-chart-4" : "text-primary"}`}>
                {gatesPendentes}
              </div>
              <p className="text-xs text-muted-foreground">aguardando</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base">Taxa Qualidade</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{taxaConformidade}%</div>
              <Progress value={Number(taxaConformidade)} className="mt-1 h-2" />
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
                      <TableRow
                        key={fvs.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedFVS(fvs)}
                      >
                        <TableCell className="font-mono font-bold">{fvs.id}</TableCell>
                        <TableCell>{fvs.servico}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{fvs.local}</TableCell>
                        <TableCell>{new Date(fvs.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-center">
                          <span className="font-mono">{fvs.itensVerificados}</span>
                          {fvs.itensNaoConformes > 0 && (
                            <span className="text-destructive ml-1">({fvs.itensNaoConformes} NC)</span>
                          )}
                        </TableCell>
                        <TableCell>{fvs.responsavel}</TableCell>
                        <TableCell>
                          {fvs.resultado === "conforme" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Conforme
                            </Badge>
                          ) : (
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
                      <TableRow
                        key={nc.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedNC(nc)}
                      >
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
                          {nc.status === "aberta" ? (
                            <Badge variant="outline" className="text-destructive">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Aberta
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-4">
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
                      <TableRow
                        key={idx}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedGate(gate)}
                      >
                        <TableCell>
                          <Badge className="bg-primary/20 text-primary">{gate.gate}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{gate.descricao}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{gate.itemEAP}</TableCell>
                        <TableCell>{new Date(gate.dataVerificacao).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-sm">{gate.observacao}</TableCell>
                        <TableCell>
                          {gate.status === "liberado" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Liberado
                            </Badge>
                          ) : gate.status === "pendente" ? (
                            <Badge variant="outline" className="text-chart-4">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
                            </Badge>
                          ) : (
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

      {/* Painel lateral FVS */}
      <Sheet open={!!selectedFVS} onOpenChange={() => setSelectedFVS(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedFVS && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5" />
                  {selectedFVS.id}
                </SheetTitle>
                <SheetDescription>{selectedFVS.servico}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Local</p>
                    <p className="text-sm font-medium mt-1">{selectedFVS.local}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="text-sm font-medium mt-1">{new Date(selectedFVS.data).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Responsavel</p>
                    <p className="text-sm font-medium mt-1">{selectedFVS.responsavel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Resultado</p>
                    <div className="mt-1">
                      {selectedFVS.resultado === "conforme" ? (
                        <Badge className="bg-primary/20 text-primary">Conforme</Badge>
                      ) : (
                        <Badge variant="destructive">Nao Conforme</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Itens Verificados</p>
                  <div className="space-y-2">
                    {selectedFVS.itens.map((item, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-lg border ${item.resultado === "ok" ? "bg-primary/5 border-primary/30" : "bg-destructive/5 border-destructive/30"}`}
                      >
                        <span className="text-sm">{item.item}</span>
                        {item.resultado === "ok" ? (
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        ) : (
                          <XCircle className="w-4 h-4 text-destructive" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Painel lateral NC */}
      <Sheet open={!!selectedNC} onOpenChange={() => setSelectedNC(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedNC && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-chart-4" />
                  {selectedNC.id}
                </SheetTitle>
                <SheetDescription>{selectedNC.descricao}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Origem</p>
                    <Badge variant="outline" className="mt-1">
                      {selectedNC.origem}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo</p>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {selectedNC.tipo}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Severidade</p>
                    <Badge variant={selectedNC.severidade === "maior" ? "destructive" : "secondary"} className="mt-1">
                      {selectedNC.severidade}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prazo</p>
                    <p className="text-sm font-medium mt-1">
                      {new Date(selectedNC.prazoAcao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Acao Corretiva</p>
                  <p className="text-sm">{selectedNC.acaoCorretiva}</p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Responsavel: {selectedNC.responsavel}</span>
                </div>

                {selectedNC.status !== "fechada" && (
                  <Button className="w-full">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Fechar NC
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Painel lateral Gate */}
      <Sheet open={!!selectedGate} onOpenChange={() => setSelectedGate(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedGate && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  {selectedGate.gate} - {selectedGate.descricao}
                </SheetTitle>
                <SheetDescription>{selectedGate.itemEAP}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="text-sm font-medium mt-1">
                      {new Date(selectedGate.dataVerificacao).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">
                      {selectedGate.status === "liberado" ? (
                        <Badge className="bg-primary/20 text-primary">Liberado</Badge>
                      ) : selectedGate.status === "pendente" ? (
                        <Badge variant="outline" className="text-chart-4">
                          Pendente
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Bloqueado</Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Observacao</p>
                  <p className="text-sm">{selectedGate.observacao}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">Checklist</p>
                  <div className="space-y-2">
                    {selectedGate.checklist.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedGate.status === "pendente" && (
                  <div className="flex gap-2 pt-4 border-t">
                    <Button variant="outline" className="flex-1 text-destructive bg-transparent">
                      <Lock className="w-4 h-4 mr-2" />
                      Bloquear
                    </Button>
                    <Button className="flex-1">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Liberar
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
        </div>
      </main>
    </div>
  )
}

export default function QualidadePage() {
  return (
    <Suspense fallback={null}>
      <QualidadeContent />
    </Suspense>
  )
}
