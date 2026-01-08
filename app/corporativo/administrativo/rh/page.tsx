"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import {
  Users,
  UserCheck,
  Briefcase,
  HardHat,
  UserX,
  AlertTriangle,
  Search,
  ExternalLink,
  Building2,
  Factory,
  ChevronRight,
  Bell,
  FileWarning,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import Link from "next/link"

// Mock data - Cards Executivos
const kpisExecutivos = {
  totalPessoas: 1000,
  clt: 700,
  pj: 100,
  terceirizados: 200,
  afastados: 28,
  alertasCriticos: 3,
}

// Mock data - Obras / Centros de Custo
const obrasCentroCustoMock = [
  {
    id: 1,
    nome: "BR-101 Duplicacao - Lote 2",
    tipo: "Obra",
    totalPessoas: 450,
    clt: 310,
    pj: 50,
    terceirizados: 90,
    percentualEfetivo: 45,
    status: "ok",
    alertas: 0,
    tendencia: "up",
  },
  {
    id: 2,
    nome: "Rodovia SC-401 - Trecho Norte",
    tipo: "Obra",
    totalPessoas: 300,
    clt: 210,
    pj: 20,
    terceirizados: 70,
    percentualEfetivo: 30,
    status: "atencao",
    alertas: 2,
    tendencia: "stable",
  },
  {
    id: 3,
    nome: "Ponte Rio-Niteroi - Manutencao",
    tipo: "Obra",
    totalPessoas: 200,
    clt: 130,
    pj: 30,
    terceirizados: 40,
    percentualEfetivo: 20,
    status: "critico",
    alertas: 5,
    tendencia: "down",
  },
  {
    id: 4,
    nome: "Sede Corporativa",
    tipo: "Corporativo",
    totalPessoas: 50,
    clt: 50,
    pj: 0,
    terceirizados: 0,
    percentualEfetivo: 5,
    status: "ok",
    alertas: 0,
    tendencia: "stable",
  },
]

// Mock data - Alertas
const alertasMock = [
  {
    id: 1,
    tipo: "critico",
    mensagem: "Ponte Rio-Niteroi com 2 sinistros em aberto",
    data: "07/01/2026",
    obra: "Ponte Rio-Niteroi",
  },
  {
    id: 2,
    tipo: "atencao",
    mensagem: "12 documentos de terceirizados vencidos",
    data: "06/01/2026",
    obra: "Varias obras",
  },
  {
    id: 3,
    tipo: "atencao",
    mensagem: "1 convencao coletiva proxima do vencimento",
    data: "05/01/2026",
    obra: "BR-101 Duplicacao",
  },
  {
    id: 4,
    tipo: "info",
    mensagem: "Rodovia SC-401 com 3 colaboradores em ferias esta semana",
    data: "07/01/2026",
    obra: "Rodovia SC-401",
  },
]

function RHCorporativoContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  const filteredObras = obrasCentroCustoMock.filter(
    (obra) =>
      obra.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      obra.tipo.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">OK</Badge>
      case "atencao":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Atencao</Badge>
      case "critico":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Critico</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const getAlertaBadge = (tipo: string) => {
    switch (tipo) {
      case "critico":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Critico</Badge>
      case "atencao":
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Atencao</Badge>
      case "info":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Info</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-400" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-400" />
      default:
        return <span className="text-muted-foreground">-</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">RH & Gestao de Talentos</h1>
          <p className="text-muted-foreground">Visao consolidada de pessoas da empresa</p>
        </div>
        <div className="flex items-center gap-2">
          <InfoTooltip content="Visao executiva do efetivo de todas as obras e centros de custo" />
        </div>
      </div>

      {/* Cards Executivos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card
          className={`cursor-pointer transition-all hover:border-primary/50 ${selectedCard === "total" ? "border-primary" : ""}`}
          onClick={() => setSelectedCard(selectedCard === "total" ? null : "total")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{kpisExecutivos.totalPessoas.toLocaleString()}</span>
              <p className="text-xs text-muted-foreground mt-1">Total de Pessoas</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary/50 ${selectedCard === "clt" ? "border-primary" : ""}`}
          onClick={() => setSelectedCard(selectedCard === "clt" ? null : "clt")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <UserCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-xs text-muted-foreground">CLT</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{kpisExecutivos.clt}</span>
              <p className="text-xs text-muted-foreground mt-1">
                {((kpisExecutivos.clt / kpisExecutivos.totalPessoas) * 100).toFixed(0)}% do efetivo
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary/50 ${selectedCard === "pj" ? "border-primary" : ""}`}
          onClick={() => setSelectedCard(selectedCard === "pj" ? null : "pj")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <Briefcase className="h-5 w-5 text-purple-400" />
              <span className="text-xs text-muted-foreground">PJ</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{kpisExecutivos.pj}</span>
              <p className="text-xs text-muted-foreground mt-1">
                {((kpisExecutivos.pj / kpisExecutivos.totalPessoas) * 100).toFixed(0)}% do efetivo
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary/50 ${selectedCard === "terceirizados" ? "border-primary" : ""}`}
          onClick={() => setSelectedCard(selectedCard === "terceirizados" ? null : "terceirizados")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <HardHat className="h-5 w-5 text-orange-400" />
              <span className="text-xs text-muted-foreground">Terceiros</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{kpisExecutivos.terceirizados}</span>
              <p className="text-xs text-muted-foreground mt-1">
                {((kpisExecutivos.terceirizados / kpisExecutivos.totalPessoas) * 100).toFixed(0)}% do efetivo
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary/50 ${selectedCard === "afastados" ? "border-primary" : ""}`}
          onClick={() => setSelectedCard(selectedCard === "afastados" ? null : "afastados")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <UserX className="h-5 w-5 text-amber-400" />
              <span className="text-xs text-muted-foreground">Afastados</span>
            </div>
            <div className="mt-2">
              <span className="text-2xl font-bold">{kpisExecutivos.afastados}</span>
              <p className="text-xs text-muted-foreground mt-1">
                {((kpisExecutivos.afastados / kpisExecutivos.totalPessoas) * 100).toFixed(1)}% do efetivo
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:border-primary/50 ${selectedCard === "alertas" ? "border-primary" : ""} ${kpisExecutivos.alertasCriticos > 0 ? "border-red-500/50" : ""}`}
          onClick={() => setSelectedCard(selectedCard === "alertas" ? null : "alertas")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <AlertTriangle
                className={`h-5 w-5 ${kpisExecutivos.alertasCriticos > 0 ? "text-red-400" : "text-muted-foreground"}`}
              />
              <span className="text-xs text-muted-foreground">Alertas</span>
            </div>
            <div className="mt-2">
              <span className={`text-2xl font-bold ${kpisExecutivos.alertasCriticos > 0 ? "text-red-400" : ""}`}>
                {kpisExecutivos.alertasCriticos}
              </span>
              <p className="text-xs text-muted-foreground mt-1">Alertas Criticos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Obras / Centros de Custo */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Obras e Centros de Custo
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Distribuicao do efetivo por unidade operacional</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar obra..."
                  className="pl-8 w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome da Obra / Centro de Custo</TableHead>
                  <TableHead className="text-center">Tipo</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">CLT</TableHead>
                  <TableHead className="text-right">PJ</TableHead>
                  <TableHead className="text-right">Terceiros</TableHead>
                  <TableHead className="text-center">% Efetivo</TableHead>
                  <TableHead className="text-center">Tendencia</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Acao</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredObras.map((obra) => (
                  <TableRow key={obra.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {obra.tipo === "Obra" ? (
                          <Factory className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        )}
                        {obra.nome}
                        {obra.alertas > 0 && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            {obra.alertas}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{obra.tipo}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">{obra.totalPessoas}</TableCell>
                    <TableCell className="text-right">{obra.clt}</TableCell>
                    <TableCell className="text-right">{obra.pj}</TableCell>
                    <TableCell className="text-right">{obra.terceirizados}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${obra.percentualEfetivo}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-8">{obra.percentualEfetivo}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{getTendenciaIcon(obra.tendencia)}</TableCell>
                    <TableCell className="text-center">{getStatusBadge(obra.status)}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href="/obra/administrativo/rh">
                          <span className="mr-1">Acessar RH</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Resumo da tabela */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{filteredObras.length} unidades listadas</span>
              <span>|</span>
              <span>{filteredObras.filter((o) => o.status === "critico").length} criticas</span>
              <span>|</span>
              <span>{filteredObras.filter((o) => o.status === "atencao").length} em atencao</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Painel de Alertas e Notificacoes */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Alertas e Notificacoes
            </CardTitle>
            <Badge variant="outline">{alertasMock.length} alertas</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertasMock.map((alerta) => (
              <div
                key={alerta.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  alerta.tipo === "critico"
                    ? "bg-red-500/5 border-red-500/20"
                    : alerta.tipo === "atencao"
                      ? "bg-amber-500/5 border-amber-500/20"
                      : "bg-blue-500/5 border-blue-500/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  {alerta.tipo === "critico" ? (
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                  ) : alerta.tipo === "atencao" ? (
                    <FileWarning className="h-5 w-5 text-amber-400" />
                  ) : (
                    <Calendar className="h-5 w-5 text-blue-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{alerta.mensagem}</p>
                    <p className="text-xs text-muted-foreground">
                      {alerta.obra} - {alerta.data}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getAlertaBadge(alerta.tipo)}
                  <Button variant="ghost" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RHCorporativoPage() {
  return (
    <Suspense fallback={null}>
      <RHCorporativoContent />
    </Suspense>
  )
}
