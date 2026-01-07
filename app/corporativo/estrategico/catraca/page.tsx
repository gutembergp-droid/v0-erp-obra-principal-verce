"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DoorOpen,
  Users,
  ShieldAlert,
  Plus,
  Eye,
  KeyRound,
  CalendarPlus,
  Trash2,
  History,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  Filter,
  Building2,
  UserCheck,
  UserX,
  Timer,
} from "lucide-react"

// Mock data - Acessos Ativos
const acessosAtivosMock = [
  {
    id: 1,
    usuario: "Carlos Silva",
    perfil: "Gerente de Obra",
    obra: "BR-101 Lote 5",
    motivo: "Responsavel tecnico",
    dataInicio: "01/01/2026",
    dataFim: "31/12/2026",
    status: "ativo",
    tipo: "permanente",
  },
  {
    id: 2,
    usuario: "Ana Souza",
    perfil: "Diretora Comercial",
    obra: "Todas",
    motivo: "Diretoria",
    dataInicio: "01/01/2025",
    dataFim: "31/12/2026",
    status: "ativo",
    tipo: "permanente",
  },
  {
    id: 3,
    usuario: "Pedro Santos",
    perfil: "Auditor Externo",
    obra: "BR-101 Lote 5",
    motivo: "Auditoria Q1/2026",
    dataInicio: "06/01/2026",
    dataFim: "10/01/2026",
    status: "ativo",
    tipo: "temporario",
  },
  {
    id: 4,
    usuario: "Maria Oliveira",
    perfil: "Consultora RH",
    obra: "BR-101 Lote 5",
    motivo: "Projeto implantacao",
    dataInicio: "02/01/2026",
    dataFim: "28/02/2026",
    status: "ativo",
    tipo: "temporario",
  },
  {
    id: 5,
    usuario: "Jose Pereira",
    perfil: "Engenheiro",
    obra: "BR-101 Lote 5",
    motivo: "Equipe tecnica",
    dataInicio: "01/06/2025",
    dataFim: "31/12/2026",
    status: "ativo",
    tipo: "permanente",
  },
  {
    id: 6,
    usuario: "Fernando Lima",
    perfil: "Visitante",
    obra: "BR-101 Lote 5",
    motivo: "Visita cliente",
    dataInicio: "07/01/2026",
    dataFim: "07/01/2026",
    status: "expirando",
    tipo: "temporario",
  },
]

// Mock data - Registros de Entrada/Saida
const registrosMock = [
  {
    id: 1,
    usuario: "Carlos Silva",
    obra: "BR-101 Lote 5",
    entrada: "07/01/2026 07:15",
    saida: "07/01/2026 18:30",
    duracao: "11h 15min",
    catraca: "Portaria Principal",
  },
  {
    id: 2,
    usuario: "Jose Pereira",
    obra: "BR-101 Lote 5",
    entrada: "07/01/2026 07:30",
    saida: "-",
    duracao: "Em obra",
    catraca: "Portaria Principal",
  },
  {
    id: 3,
    usuario: "Pedro Santos",
    obra: "BR-101 Lote 5",
    entrada: "07/01/2026 09:00",
    saida: "07/01/2026 12:00",
    duracao: "3h",
    catraca: "Portaria Administrativa",
  },
  {
    id: 4,
    usuario: "Ana Souza",
    obra: "BR-101 Lote 5",
    entrada: "07/01/2026 08:00",
    saida: "07/01/2026 17:00",
    duracao: "9h",
    catraca: "Portaria Principal",
  },
  {
    id: 5,
    usuario: "Maria Oliveira",
    obra: "BR-101 Lote 5",
    entrada: "07/01/2026 08:30",
    saida: "-",
    duracao: "Em obra",
    catraca: "Portaria Administrativa",
  },
]

// Mock data - Historico de Concessoes
const historicoConcessoesMock = [
  {
    id: 1,
    usuario: "Pedro Santos",
    acao: "Concedido",
    responsavel: "Carlos Silva",
    data: "05/01/2026 14:00",
    motivo: "Auditoria externa",
    validade: "5 dias",
  },
  {
    id: 2,
    usuario: "Maria Oliveira",
    acao: "Concedido",
    responsavel: "Ana Souza",
    data: "02/01/2026 09:00",
    motivo: "Consultoria RH",
    validade: "60 dias",
  },
  {
    id: 3,
    usuario: "Joao Costa",
    acao: "Revogado",
    responsavel: "Carlos Silva",
    data: "03/01/2026 17:00",
    motivo: "Fim do contrato",
    validade: "-",
  },
  {
    id: 4,
    usuario: "Fernando Lima",
    acao: "Concedido",
    responsavel: "Jose Pereira",
    data: "06/01/2026 16:00",
    motivo: "Visita cliente",
    validade: "1 dia",
  },
  {
    id: 5,
    usuario: "Lucas Mendes",
    acao: "Estendido",
    responsavel: "Ana Souza",
    data: "30/12/2025 10:00",
    motivo: "Prorrogacao projeto",
    validade: "+30 dias",
  },
]

// Mock data - Regras de Expiracao
const regrasMock = [
  {
    id: 1,
    tipo: "Visitante",
    validadeMaxima: "1 dia",
    renovacaoAutomatica: false,
    alertaAntecedencia: "2 horas",
    aprovador: "Gerente de Obra",
  },
  {
    id: 2,
    tipo: "Temporario",
    validadeMaxima: "90 dias",
    renovacaoAutomatica: false,
    alertaAntecedencia: "7 dias",
    aprovador: "Diretor",
  },
  {
    id: 3,
    tipo: "Consultor",
    validadeMaxima: "180 dias",
    renovacaoAutomatica: false,
    alertaAntecedencia: "14 dias",
    aprovador: "Diretor",
  },
  {
    id: 4,
    tipo: "Permanente",
    validadeMaxima: "365 dias",
    renovacaoAutomatica: true,
    alertaAntecedencia: "30 dias",
    aprovador: "RH",
  },
  {
    id: 5,
    tipo: "Diretoria",
    validadeMaxima: "Ilimitado",
    renovacaoAutomatica: true,
    alertaAntecedencia: "-",
    aprovador: "Automatico",
  },
]

function CatracaContent() {
  const [abaAtiva, setAbaAtiva] = useState("acessos")
  const [busca, setBusca] = useState("")

  const acessosAtivos = acessosAtivosMock.filter((a) => a.status === "ativo").length
  const acessosExpirando = acessosAtivosMock.filter((a) => a.status === "expirando").length
  const pessoasNaObra = registrosMock.filter((r) => r.saida === "-").length
  const entradasHoje = registrosMock.length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Ativo
          </Badge>
        )
      case "expirando":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Expirando
          </Badge>
        )
      case "expirado":
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Expirado
          </Badge>
        )
      case "revogado":
        return <Badge className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">Revogado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "permanente":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Permanente
          </Badge>
        )
      case "temporario":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Temporario
          </Badge>
        )
      default:
        return <Badge variant="outline">{tipo}</Badge>
    }
  }

  const getAcaoBadge = (acao: string) => {
    switch (acao) {
      case "Concedido":
        return <Badge className="bg-green-500/10 text-green-500">Concedido</Badge>
      case "Revogado":
        return <Badge className="bg-red-500/10 text-red-500">Revogado</Badge>
      case "Estendido":
        return <Badge className="bg-blue-500/10 text-blue-500">Estendido</Badge>
      default:
        return <Badge variant="secondary">{acao}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
            <DoorOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestao de Acessos (Catraca)</h1>
            <p className="text-sm text-muted-foreground">CO-EST-04 - Controle de acessos fisicos as obras</p>
          </div>
          <InfoTooltip
            title="Gestao de Acessos"
            description="Controle de catracas, biometria e permissoes de acesso fisico as obras. Gestao de acessos temporarios e permanentes."
          />
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Acessos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold">{acessosAtivos}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Acessos Expirando</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold">{acessosExpirando}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pessoas na Obra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold">{pessoasNaObra}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Entradas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <DoorOpen className="w-5 h-5 text-purple-500" />
              <span className="text-2xl font-bold">{entradasHoje}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="acessos" className="flex items-center gap-2">
            <KeyRound className="w-4 h-4" /> Acessos Concedidos
          </TabsTrigger>
          <TabsTrigger value="registros" className="flex items-center gap-2">
            <DoorOpen className="w-4 h-4" /> Registros E/S
          </TabsTrigger>
          <TabsTrigger value="historico" className="flex items-center gap-2">
            <History className="w-4 h-4" /> Historico
          </TabsTrigger>
          <TabsTrigger value="regras" className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4" /> Regras Expiracao
          </TabsTrigger>
        </TabsList>

        {/* Tab Acessos */}
        <TabsContent value="acessos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Acessos Concedidos</CardTitle>
                  <CardDescription>Usuarios com permissao de acesso as obras</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar usuario..."
                      className="pl-9 w-64"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" /> Conceder Acesso
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Obra</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Inicio</TableHead>
                    <TableHead>Fim</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {acessosAtivosMock
                    .filter((a) => a.usuario.toLowerCase().includes(busca.toLowerCase()))
                    .map((acesso) => (
                      <TableRow key={acesso.id}>
                        <TableCell className="font-medium">{acesso.usuario}</TableCell>
                        <TableCell>{acesso.perfil}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            {acesso.obra}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{acesso.motivo}</TableCell>
                        <TableCell>{acesso.dataInicio}</TableCell>
                        <TableCell>{acesso.dataFim}</TableCell>
                        <TableCell>{getTipoBadge(acesso.tipo)}</TableCell>
                        <TableCell>{getStatusBadge(acesso.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" title="Visualizar">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Estender Prazo">
                              <CalendarPlus className="w-4 h-4 text-blue-500" />
                            </Button>
                            <Button variant="ghost" size="icon" title="Revogar Acesso">
                              <UserX className="w-4 h-4 text-red-500" />
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

        {/* Tab Registros */}
        <TabsContent value="registros" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registros de Entrada/Saida</CardTitle>
                  <CardDescription>Movimentacao de pessoas nas catracas</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="hoje">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Periodo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hoje">Hoje</SelectItem>
                      <SelectItem value="ontem">Ontem</SelectItem>
                      <SelectItem value="semana">Ultima semana</SelectItem>
                      <SelectItem value="mes">Ultimo mes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Obra</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saida</TableHead>
                    <TableHead>Duracao</TableHead>
                    <TableHead>Catraca</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrosMock.map((registro) => (
                    <TableRow key={registro.id}>
                      <TableCell className="font-medium">{registro.usuario}</TableCell>
                      <TableCell>{registro.obra}</TableCell>
                      <TableCell>{registro.entrada}</TableCell>
                      <TableCell>
                        {registro.saida === "-" ? (
                          <Badge className="bg-green-500/10 text-green-500">Em obra</Badge>
                        ) : (
                          registro.saida
                        )}
                      </TableCell>
                      <TableCell>{registro.duracao}</TableCell>
                      <TableCell className="text-muted-foreground">{registro.catraca}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Historico */}
        <TabsContent value="historico" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Historico de Concessoes</CardTitle>
                  <CardDescription>Auditoria de acessos concedidos, revogados e estendidos</CardDescription>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Acao</TableHead>
                    <TableHead>Responsavel</TableHead>
                    <TableHead>Data/Hora</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Validade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicoConcessoesMock.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.usuario}</TableCell>
                      <TableCell>{getAcaoBadge(item.acao)}</TableCell>
                      <TableCell>{item.responsavel}</TableCell>
                      <TableCell>{item.data}</TableCell>
                      <TableCell className="text-muted-foreground">{item.motivo}</TableCell>
                      <TableCell>{item.validade}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Regras */}
        <TabsContent value="regras" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Regras de Expiracao</CardTitle>
                  <CardDescription>Configuracao de validade e renovacao automatica</CardDescription>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Nova Regra
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Acesso</TableHead>
                    <TableHead>Validade Maxima</TableHead>
                    <TableHead className="text-center">Renovacao Automatica</TableHead>
                    <TableHead>Alerta Antecedencia</TableHead>
                    <TableHead>Aprovador</TableHead>
                    <TableHead className="text-right">Acoes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regrasMock.map((regra) => (
                    <TableRow key={regra.id}>
                      <TableCell className="font-medium">{regra.tipo}</TableCell>
                      <TableCell>{regra.validadeMaxima}</TableCell>
                      <TableCell className="text-center">
                        {regra.renovacaoAutomatica ? (
                          <Badge className="bg-green-500/10 text-green-500">Sim</Badge>
                        ) : (
                          <Badge variant="secondary">Nao</Badge>
                        )}
                      </TableCell>
                      <TableCell>{regra.alertaAntecedencia}</TableCell>
                      <TableCell>{regra.aprovador}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="w-4 h-4 text-red-500" />
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
      </Tabs>
    </div>
  )
}

export default function CatracaPage() {
  return (
    <Suspense fallback={null}>
      <CatracaContent />
    </Suspense>
  )
}
