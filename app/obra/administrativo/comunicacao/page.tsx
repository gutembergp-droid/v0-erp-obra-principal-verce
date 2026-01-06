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
import { Megaphone, Mail, Bell, Users, Plus, Search, Eye, CheckCircle2, Clock, Pin } from "lucide-react"

// Dados mockados de Comunicados
const comunicadosMock = [
  {
    id: "COM-001",
    titulo: "Parada Programada - Dia 10/01",
    categoria: "operacional",
    prioridade: "alta",
    dataPublicacao: "2026-01-03",
    autor: "RH",
    visualizacoes: 189,
    alcance: 95,
    fixado: true,
    conteudo:
      "Informamos que no dia 10/01 haverá parada programada para manutenção geral dos equipamentos. Todas as frentes de trabalho estarão suspensas.",
  },
  {
    id: "COM-002",
    titulo: "Novo Procedimento de Segurança",
    categoria: "ssma",
    prioridade: "alta",
    dataPublicacao: "2026-01-02",
    autor: "SSMA",
    visualizacoes: 156,
    alcance: 78,
    fixado: false,
    conteudo:
      "A partir de hoje, todos os colaboradores devem utilizar o novo modelo de EPI para trabalho em altura. O treinamento será realizado na próxima semana.",
  },
  {
    id: "COM-003",
    titulo: "Aniversariantes do Mês",
    categoria: "geral",
    prioridade: "baixa",
    dataPublicacao: "2026-01-01",
    autor: "RH",
    visualizacoes: 124,
    alcance: 62,
    fixado: false,
    conteudo:
      "Parabenizamos os aniversariantes de Janeiro: José Silva (05/01), Maria Costa (12/01), Carlos Lima (28/01).",
  },
]

// Dados mockados de Notificacoes
const notificacoesMock = [
  {
    id: "NOT-001",
    tipo: "alerta",
    titulo: "Medição pendente de aprovação",
    destino: "Comercial",
    data: "2026-01-03",
    status: "nao_lida",
  },
  {
    id: "NOT-002",
    tipo: "info",
    titulo: "RDO aprovado com sucesso",
    destino: "Produção",
    data: "2026-01-03",
    status: "lida",
  },
  {
    id: "NOT-003",
    tipo: "urgente",
    titulo: "Prazo de NC vence hoje",
    destino: "Qualidade",
    data: "2026-01-03",
    status: "nao_lida",
  },
]

function ComunicacaoContent() {
  const [tab, setTab] = useState("comunicados")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCom, setSelectedCom] = useState<(typeof comunicadosMock)[0] | null>(null)

  const comunicadosAtivos = comunicadosMock.length
  const notificacoesNaoLidas = notificacoesMock.filter((n) => n.status === "nao_lida").length
  const alcanceMedio = Math.round(comunicadosMock.reduce((acc, c) => acc + c.alcance, 0) / comunicadosMock.length)

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Comunicação</h1>
          <InfoTooltip
            title="Setor de Comunicação"
            description="Gerencia comunicados internos, murais digitais, avisos e campanhas de endomarketing."
          />
        </div>
        <p className="text-sm text-muted-foreground mt-1">Gestão de comunicados e informativos</p>
      </div>

      <div className="p-6 space-y-6 flex-1">
        {/* Metricas */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Megaphone className="w-4 h-4" />
                Comunicados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comunicadosAtivos}</div>
              <p className="text-xs text-muted-foreground">ativos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Emails
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-1">156</div>
              <p className="text-xs text-muted-foreground">enviados no mês</p>
            </CardContent>
          </Card>
          <Card className={notificacoesNaoLidas > 0 ? "border-chart-4/50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notificações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${notificacoesNaoLidas > 0 ? "text-chart-4" : ""}`}>
                {notificacoesNaoLidas}
              </div>
              <p className="text-xs text-muted-foreground">não lidas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Visualizações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{comunicadosMock.reduce((acc, c) => acc + c.visualizacoes, 0)}</div>
              <p className="text-xs text-muted-foreground">total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Alcance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{alcanceMedio}%</div>
              <p className="text-xs text-muted-foreground">médio</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comunicados">
              <Megaphone className="w-4 h-4 mr-2" />
              Comunicados
            </TabsTrigger>
            <TabsTrigger value="notificacoes">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </TabsTrigger>
          </TabsList>

          {/* Comunicados */}
          <TabsContent value="comunicados">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Mural Digital</CardTitle>
                    <CardDescription>Comunicados e avisos internos</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar..."
                        className="pl-9 w-48"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Comunicado
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead></TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead className="text-right">Visualizações</TableHead>
                      <TableHead className="text-center">Alcance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comunicadosMock.map((com) => (
                      <TableRow
                        key={com.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedCom(com)}
                      >
                        <TableCell className="w-8">{com.fixado && <Pin className="w-4 h-4 text-chart-4" />}</TableCell>
                        <TableCell className="font-medium">{com.titulo}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {com.categoria}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={com.prioridade === "alta" ? "destructive" : "secondary"}
                            className={com.prioridade === "alta" ? "" : ""}
                          >
                            {com.prioridade}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(com.dataPublicacao).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell className="text-right font-mono">{com.visualizacoes}</TableCell>
                        <TableCell className="text-center">
                          <Badge className="bg-primary/20 text-primary">{com.alcance}%</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificacoes */}
          <TabsContent value="notificacoes">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Central de Notificações</CardTitle>
                <CardDescription>Alertas e avisos do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Destino</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificacoesMock.map((not) => (
                      <TableRow key={not.id} className={not.status === "nao_lida" ? "bg-muted/30" : ""}>
                        <TableCell>
                          <Badge
                            variant={
                              not.tipo === "urgente" ? "destructive" : not.tipo === "alerta" ? "outline" : "secondary"
                            }
                            className={not.tipo === "alerta" ? "text-chart-4" : ""}
                          >
                            {not.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{not.titulo}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{not.destino}</Badge>
                        </TableCell>
                        <TableCell>{new Date(not.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>
                          {not.status === "lida" ? (
                            <Badge className="bg-primary/20 text-primary">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Lida
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-chart-4">
                              <Clock className="w-3 h-3 mr-1" />
                              Não lida
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

      {/* Painel lateral para comunicado selecionado */}
      <Sheet open={!!selectedCom} onOpenChange={() => setSelectedCom(null)}>
        <SheetContent className="w-[400px] sm:w-[500px] overflow-auto">
          {selectedCom && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5" />
                  {selectedCom.titulo}
                </SheetTitle>
                <SheetDescription>
                  Publicado em {new Date(selectedCom.dataPublicacao).toLocaleDateString("pt-BR")}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Categoria</p>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {selectedCom.categoria}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prioridade</p>
                    <Badge variant={selectedCom.prioridade === "alta" ? "destructive" : "secondary"} className="mt-1">
                      {selectedCom.prioridade}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Autor</p>
                    <p className="text-sm font-medium mt-1">{selectedCom.autor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alcance</p>
                    <p className="text-sm font-medium mt-1 text-primary">{selectedCom.alcance}%</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">Conteúdo</p>
                  <p className="text-sm">{selectedCom.conteudo}</p>
                </div>

                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Visualizações</span>
                      <span className="text-xl font-bold">{selectedCom.visualizacoes}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function ComunicacaoPage() {
  return (
    <Suspense fallback={null}>
      <ComunicacaoContent />
    </Suspense>
  )
}
