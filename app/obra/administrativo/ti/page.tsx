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
import {
  Plus,
  Search,
  Monitor,
  Laptop,
  Printer,
  Wifi,
  Server,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react"

// Dados mockados de Ativos TI
const ativosTIMock = [
  {
    id: "TI-001",
    codigo: "NOT-001",
    descricao: "Notebook Dell Latitude 5520",
    tipo: "Notebook",
    responsavel: "Eng. Maria Costa",
    setor: "Engenharia",
    dataAquisicao: "2024-06-15",
    status: "ativo",
    garantia: "2026-06-15",
  },
  {
    id: "TI-002",
    codigo: "IMP-001",
    descricao: "Impressora HP LaserJet Pro",
    tipo: "Impressora",
    responsavel: "Administrativo",
    setor: "Administracao",
    dataAquisicao: "2024-03-10",
    status: "ativo",
    garantia: "2025-03-10",
  },
  {
    id: "TI-003",
    codigo: "MON-005",
    descricao: "Monitor LG 24 UltraWide",
    tipo: "Monitor",
    responsavel: "Eng. Carlos Lima",
    setor: "Planejamento",
    dataAquisicao: "2024-08-20",
    status: "manutencao",
    garantia: "2026-08-20",
  },
  {
    id: "TI-004",
    codigo: "ROT-001",
    descricao: "Roteador 4G Huawei",
    tipo: "Rede",
    responsavel: "TI",
    setor: "Infraestrutura",
    dataAquisicao: "2024-01-05",
    status: "ativo",
    garantia: "2025-01-05",
  },
]

function getTipoIcon(tipo: string) {
  switch (tipo) {
    case "Notebook":
      return <Laptop className="w-4 h-4" />
    case "Monitor":
      return <Monitor className="w-4 h-4" />
    case "Impressora":
      return <Printer className="w-4 h-4" />
    case "Rede":
      return <Wifi className="w-4 h-4" />
    default:
      return <Server className="w-4 h-4" />
  }
}

export default function TIPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const totalAtivos = ativosTIMock.length
  const ativosOperacionais = ativosTIMock.filter((a) => a.status === "ativo").length
  const ativosManutencao = ativosTIMock.filter((a) => a.status === "manutencao").length

  return (
    <AppLayout>
      <Header
        title="TI / Infraestrutura"
        description="Gestao de Ativos de Tecnologia da Informacao"
        rightContent={
          <InfoTooltip
            title="Setor de TI / Infraestrutura"
            description="Gerencia os ativos de TI da obra (notebooks, monitores, impressoras, equipamentos de rede), controle de garantias e suporte tecnico."
          />
        }
      />

      <div className="p-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Server className="w-4 h-4" />
                Total Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAtivos}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Operacionais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{ativosOperacionais}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Em Manutencao
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{ativosManutencao}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Garantia Vencendo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">1</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Ativos */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Ativos de TI</CardTitle>
                <CardDescription>Equipamentos de tecnologia da obra</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar ativo..."
                    className="pl-9 w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Ativo
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Codigo</TableHead>
                  <TableHead>Descricao</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Responsavel</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Garantia</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ativosTIMock.map((ativo) => (
                  <TableRow key={ativo.id}>
                    <TableCell className="font-mono font-bold">{ativo.codigo}</TableCell>
                    <TableCell>{ativo.descricao}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTipoIcon(ativo.tipo)}
                        <span>{ativo.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell>{ativo.responsavel}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{ativo.setor}</Badge>
                    </TableCell>
                    <TableCell>
                      <span
                        className={new Date(ativo.garantia) < new Date() ? "text-red-500" : "text-muted-foreground"}
                      >
                        {new Date(ativo.garantia).toLocaleDateString("pt-BR")}
                      </span>
                    </TableCell>
                    <TableCell>
                      {ativo.status === "ativo" && (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Ativo
                        </Badge>
                      )}
                      {ativo.status === "manutencao" && (
                        <Badge variant="outline" className="text-amber-500">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          Manutencao
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
