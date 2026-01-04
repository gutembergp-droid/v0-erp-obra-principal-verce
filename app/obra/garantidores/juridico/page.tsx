"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Search,
  Scale,
  FileText,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  Calendar,
  DollarSign,
} from "lucide-react"

// Dados mockados de Contratos
const contratosMock = [
  {
    id: "CT-001",
    numero: "001/2024",
    objeto: "Duplicacao BR-101 - Lote 2",
    contratante: "DNIT",
    valor: 450000000,
    dataAssinatura: "2024-01-15",
    vigencia: "2027-12-31",
    status: "vigente",
    aditivos: 1,
  },
  {
    id: "CT-002",
    numero: "SUB-001/2024",
    objeto: "Terraplenagem - Subcontrato",
    contratante: "Terraplenagem Silva Ltda",
    valor: 25000000,
    dataAssinatura: "2024-02-20",
    vigencia: "2026-06-30",
    status: "vigente",
    aditivos: 0,
  },
  {
    id: "CT-003",
    numero: "SUB-002/2024",
    objeto: "Fornecimento de Concreto Usinado",
    contratante: "Concreteira Norte",
    valor: 12000000,
    dataAssinatura: "2024-03-15",
    vigencia: "2026-12-31",
    status: "vigente",
    aditivos: 0,
  },
]

// Dados mockados de Pleitos
const pleitosMock = [
  {
    id: "PLT-001",
    contrato: "CT-001",
    tipo: "Reequilibrio",
    descricao: "Reequilibrio economico-financeiro - Variacao de insumos",
    valor: 8500000,
    dataProtocolo: "2025-11-15",
    prazoResposta: "2026-01-15",
    status: "em_analise",
  },
  {
    id: "PLT-002",
    contrato: "CT-001",
    tipo: "Aditivo Prazo",
    descricao: "Prorrogacao de prazo - Chuvas atipicas",
    valor: 0,
    dataProtocolo: "2025-12-01",
    prazoResposta: "2026-02-01",
    status: "protocolado",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export default function JuridicoPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const totalContratos = contratosMock.length
  const contratosVigentes = contratosMock.filter((c) => c.status === "vigente").length
  const pleitosAtivos = pleitosMock.filter((p) => p.status !== "aprovado" && p.status !== "rejeitado").length
  const valorTotalContratos = contratosMock.reduce((acc, c) => acc + c.valor, 0)

  return (
    <AppLayout>
      <Header title="Juridico" description="Gestao Contratual, Aditivos e Pleitos" />

      <div className="p-6 space-y-6">
        {/* Conceito */}
        <Card className="border-slate-500/20 bg-slate-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-slate-500/10">
                <Scale className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <h3 className="font-semibold">Setor Juridico - GARANTIDOR</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Gerencia a <strong>gestao contratual</strong> (contratos principais e subcontratos),
                  <strong> aditivos</strong> e<strong> pleitos</strong> (reequilibrios, prorrogacoes). Garante
                  conformidade juridica de todas as operacoes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Total Contratos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalContratos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Vigentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{contratosVigentes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Volume Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(valorTotalContratos)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Pleitos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{pleitosAtivos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Vencendo 30d
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Contratos */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Gestao Contratual</CardTitle>
                <CardDescription>Contratos principais e subcontratos</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar contrato..."
                    className="pl-9 w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Contrato
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Numero</TableHead>
                  <TableHead>Objeto</TableHead>
                  <TableHead>Contratante</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Vigencia</TableHead>
                  <TableHead className="text-center">Aditivos</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contratosMock.map((ct) => (
                  <TableRow key={ct.id}>
                    <TableCell className="font-mono font-bold">{ct.numero}</TableCell>
                    <TableCell>{ct.objeto}</TableCell>
                    <TableCell>{ct.contratante}</TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(ct.valor)}</TableCell>
                    <TableCell>{new Date(ct.vigencia).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell className="text-center">
                      {ct.aditivos > 0 ? (
                        <Badge variant="secondary">{ct.aditivos}</Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Vigente
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Lista de Pleitos */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Pleitos</CardTitle>
                <CardDescription>Reequilibrios, prorrogacoes e reivindicacoes</CardDescription>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Novo Pleito
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
                  <TableHead className="text-right">Valor</TableHead>
                  <TableHead>Protocolo</TableHead>
                  <TableHead>Prazo Resposta</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pleitosMock.map((plt) => (
                  <TableRow key={plt.id}>
                    <TableCell className="font-mono font-bold">{plt.id}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{plt.tipo}</Badge>
                    </TableCell>
                    <TableCell>{plt.descricao}</TableCell>
                    <TableCell className="text-right font-mono">
                      {plt.valor > 0 ? formatCurrency(plt.valor) : "-"}
                    </TableCell>
                    <TableCell>{new Date(plt.dataProtocolo).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{new Date(plt.prazoResposta).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      {plt.status === "em_analise" && (
                        <Badge variant="outline" className="text-amber-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Em Analise
                        </Badge>
                      )}
                      {plt.status === "protocolado" && (
                        <Badge variant="outline" className="text-blue-500">
                          <FileText className="w-3 h-3 mr-1" />
                          Protocolado
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
