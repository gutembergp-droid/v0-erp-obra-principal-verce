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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  Sun,
  Cloud,
  CloudRain,
  Users,
  Truck,
  HardHat,
  Calendar,
  Send,
} from "lucide-react"

// Dados mockados de RDO
const rdosMock = [
  {
    id: "RDO-2026-001",
    data: "2026-01-03",
    clima: "ensolarado",
    efetivo: 245,
    equipamentos: 32,
    horasTrabalhadas: 8,
    ocorrencias: 0,
    status: "aprovado",
    responsavel: "Eng. Carlos Lima",
  },
  {
    id: "RDO-2026-002",
    data: "2026-01-04",
    clima: "nublado",
    efetivo: 238,
    equipamentos: 30,
    horasTrabalhadas: 8,
    ocorrencias: 1,
    status: "aprovado",
    responsavel: "Eng. Carlos Lima",
  },
  {
    id: "RDO-2026-003",
    data: "2026-01-05",
    clima: "chuvoso",
    efetivo: 120,
    equipamentos: 15,
    horasTrabalhadas: 4,
    ocorrencias: 0,
    status: "pendente",
    responsavel: "Eng. Carlos Lima",
  },
]

// Dados mockados de Atividades do dia
const atividadesDiaMock = [
  {
    frente: "Terraplenagem Norte",
    atividade: "Escavacao de material 1a categoria",
    local: "km 108+500 a km 109+200",
    quantidade: 2500,
    unidade: "m3",
    equipe: "Equipe A",
    horario: "07:00 - 17:00",
  },
  {
    frente: "Terraplenagem Sul",
    atividade: "Compactacao de aterro",
    local: "km 95+000 a km 96+500",
    quantidade: 1800,
    unidade: "m3",
    equipe: "Equipe B",
    horario: "07:00 - 17:00",
  },
  {
    frente: "Obras de Arte",
    atividade: "Concretagem fundacao - Ponte Rio Paraiba",
    local: "OAE-001",
    quantidade: 45,
    unidade: "m3",
    equipe: "Equipe C",
    horario: "06:00 - 14:00",
  },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

function getClimaIcon(clima: string) {
  switch (clima) {
    case "ensolarado":
      return <Sun className="w-4 h-4 text-amber-500" />
    case "nublado":
      return <Cloud className="w-4 h-4 text-gray-500" />
    case "chuvoso":
      return <CloudRain className="w-4 h-4 text-blue-500" />
    default:
      return <Sun className="w-4 h-4" />
  }
}

export default function RDOPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [competencia, setCompetencia] = useState("jan-2026")

  const rdosAprovados = rdosMock.filter((r) => r.status === "aprovado").length
  const rdosPendentes = rdosMock.filter((r) => r.status === "pendente").length
  const mediaEfetivo = Math.round(rdosMock.reduce((acc, r) => acc + r.efetivo, 0) / rdosMock.length)

  return (
    <AppLayout>
      <Header
        title="RDO - Relatorio Diario de Obra"
        description="Registro diario de clima, efetivo, equipamentos e atividades executadas"
        rightContent={
          <InfoTooltip
            title="Setor de Campo / Execucao"
            description="O RDO (Relatorio Diario de Obra) registra todas as atividades executadas, condicoes climaticas, efetivo mobilizado, equipamentos em operacao e ocorrencias do dia."
          />
        }
      />

      <div className="p-6 space-y-6">
        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Competencia
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={competencia} onValueChange={setCompetencia}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">Janeiro/2026</SelectItem>
                  <SelectItem value="dez-2025">Dezembro/2025</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <FileText className="w-4 h-4" />
                RDOs Aprovados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{rdosAprovados}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                RDOs Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{rdosPendentes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Media Efetivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mediaEfetivo}</div>
              <p className="text-xs text-muted-foreground">colaboradores/dia</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Media Equipamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(rdosMock.reduce((acc, r) => acc + r.equipamentos, 0) / rdosMock.length)}
              </div>
              <p className="text-xs text-muted-foreground">equipamentos/dia</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de RDOs */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base">Relatorios Diarios</CardTitle>
                <CardDescription>Historico de RDOs do periodo</CardDescription>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  placeholder="Buscar..."
                  className="w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo RDO
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Clima</TableHead>
                  <TableHead className="text-right">Efetivo</TableHead>
                  <TableHead className="text-right">Equipamentos</TableHead>
                  <TableHead className="text-right">Horas</TableHead>
                  <TableHead>Responsavel</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rdosMock.map((rdo) => (
                  <TableRow key={rdo.id}>
                    <TableCell className="font-mono font-bold">{rdo.id}</TableCell>
                    <TableCell>{new Date(rdo.data).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getClimaIcon(rdo.clima)}
                        <span className="capitalize">{rdo.clima}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">{rdo.efetivo}</TableCell>
                    <TableCell className="text-right font-mono">{rdo.equipamentos}</TableCell>
                    <TableCell className="text-right font-mono">{rdo.horasTrabalhadas}h</TableCell>
                    <TableCell className="text-sm">{rdo.responsavel}</TableCell>
                    <TableCell>
                      {rdo.status === "aprovado" && (
                        <Badge className="bg-green-500">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Aprovado
                        </Badge>
                      )}
                      {rdo.status === "pendente" && (
                        <Badge variant="outline" className="text-amber-500">
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
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

        {/* Atividades do Dia */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-500" />
              <CardTitle className="text-base">Atividades Executadas Hoje</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Frente</TableHead>
                  <TableHead>Atividade</TableHead>
                  <TableHead>Local</TableHead>
                  <TableHead className="text-right">Quantidade</TableHead>
                  <TableHead>Equipe</TableHead>
                  <TableHead>Horario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {atividadesDiaMock.map((atv, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Badge variant="outline">{atv.frente}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{atv.atividade}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{atv.local}</TableCell>
                    <TableCell className="text-right font-mono">
                      {formatNumber(atv.quantidade)} {atv.unidade}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{atv.equipe}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{atv.horario}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Acoes */}
        <div className="flex justify-end gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Enviar para Aprovacao
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
