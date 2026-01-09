"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import {
  FileText,
  ArrowLeft,
  Calendar,
  Clock,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Shield,
  FileSignature,
  Ruler,
  Calculator,
  Package,
  Building2,
  Plus,
  Edit2,
  CalendarDays,
  Timer,
  FileCheck,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados - Calendario de Medicao
const calendarioMedicao = {
  cicloAtual: "Mensal",
  diaCorte: 25,
  diasParaFechamento: 5,
  diasParaEnvioNF: 3,
  alertaAntecedencia: 3,
}

// Dados mockados - Datas do Ciclo
const cicloDatas = [
  { mes: "Janeiro/2026", diaCorte: "25/01/2026", fechamento: "30/01/2026", envioNF: "02/02/2026", status: "concluido" },
  {
    mes: "Fevereiro/2026",
    diaCorte: "25/02/2026",
    fechamento: "28/02/2026",
    envioNF: "03/03/2026",
    status: "concluido",
  },
  {
    mes: "Marco/2026",
    diaCorte: "25/03/2026",
    fechamento: "30/03/2026",
    envioNF: "02/04/2026",
    status: "em_andamento",
  },
  { mes: "Abril/2026", diaCorte: "25/04/2026", fechamento: "30/04/2026", envioNF: "03/05/2026", status: "pendente" },
  { mes: "Maio/2026", diaCorte: "25/05/2026", fechamento: "30/05/2026", envioNF: "02/06/2026", status: "pendente" },
  { mes: "Junho/2026", diaCorte: "25/06/2026", fechamento: "30/06/2026", envioNF: "03/07/2026", status: "pendente" },
]

// Dados mockados - Work Follow
const workFollow = [
  { setor: "Producao", responsavel: "Joao Silva", tipoAlerta: "Fechamento de Medicao", antecedencia: 3, ativo: true },
  { setor: "Comercial", responsavel: "Maria Santos", tipoAlerta: "Envio de NF", antecedencia: 2, ativo: true },
  { setor: "Financeiro", responsavel: "Carlos Lima", tipoAlerta: "Faturamento", antecedencia: 1, ativo: true },
  {
    setor: "Gerente Contrato",
    responsavel: "Ana Costa",
    tipoAlerta: "Aprovacao Medicao",
    antecedencia: 2,
    ativo: true,
  },
  { setor: "Suprimentos", responsavel: "Pedro Alves", tipoAlerta: "Medicao Terceiros", antecedencia: 5, ativo: true },
]

// Dados mockados - Alertas Pendentes
const alertasPendentes = [
  { tipo: "atencao", mensagem: "Medicao de Marco/2026 vence em 3 dias", setor: "Producao", data: "22/03/2026" },
  { tipo: "info", mensagem: "Fechamento de Fevereiro concluido com sucesso", setor: "Comercial", data: "28/02/2026" },
]

export default function EstruturacaoCalendarioPage() {
  const [dialogAberto, setDialogAberto] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navegacaoSetor = [
    { codigo: "EST-00", nome: "Visao Geral", rota: "/obra/comercial/estruturacao-geral", icon: FileText },
    { codigo: "EST-01", nome: "Contrato", rota: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
    { codigo: "EST-02", nome: "Medicao", rota: "/obra/comercial/estruturacao-medicao", icon: Ruler },
    { codigo: "EST-C", nome: "Calendario", rota: "/obra/comercial/estruturacao-calendario", icon: CalendarDays },
    { codigo: "EST-03", nome: "Custo", rota: "/obra/comercial/estruturacao-custo", icon: Calculator },
    { codigo: "EST-04", nome: "Suprimentos", rota: "/obra/comercial/estruturacao-suprimentos", icon: Package },
    { codigo: "EST-05", nome: "Indireto", rota: "/obra/comercial/estruturacao-indireto", icon: Building2 },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "concluido":
        return (
          <Badge className="bg-primary/10 text-primary text-[10px]">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Concluido
          </Badge>
        )
      case "em_andamento":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 text-[10px]">
            <Clock className="h-3 w-3 mr-1" />
            Em Andamento
          </Badge>
        )
      case "pendente":
        return (
          <Badge variant="outline" className="text-[10px]">
            Pendente
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="text-[10px]">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex-none border-b border-border bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra/comercial/estruturacao-medicao">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Calendario de Medicao</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-C
                </Badge>
                <Badge className="bg-primary/10 text-primary text-[10px]">Configurado</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">Datas, ciclos e alertas de medicao</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Edit2 className="h-4 w-4" />
                  Editar Parametros
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Parametros do Calendario</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Ciclo de Medicao</Label>
                      <Select defaultValue="mensal">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mensal">Mensal</SelectItem>
                          <SelectItem value="quinzenal">Quinzenal</SelectItem>
                          <SelectItem value="semanal">Semanal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Dia de Corte</Label>
                      <Input type="number" defaultValue={25} min={1} max={31} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Dias para Fechamento</Label>
                      <Input type="number" defaultValue={5} min={1} max={15} />
                    </div>
                    <div className="space-y-2">
                      <Label>Dias para Envio NF</Label>
                      <Input type="number" defaultValue={3} min={1} max={10} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Alerta com Antecedencia (dias)</Label>
                    <Input type="number" defaultValue={3} min={1} max={10} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogAberto(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setDialogAberto(false)}>Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button size="sm" className="gap-2">
              <Shield className="h-4 w-4" />
              Homologar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Navegacao */}
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            {navegacaoSetor.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.rota
              return (
                <Button
                  key={item.codigo}
                  variant="outline"
                  size="sm"
                  className={`h-8 gap-1.5 text-xs ${isActive ? "bg-muted/50 border-primary/30" : "bg-transparent"}`}
                  onClick={() => router.push(item.rota)}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.nome}
                </Button>
              )
            })}
          </div>

          {/* Cards de Parametros */}
          <div className="grid grid-cols-5 gap-4">
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase">Ciclo</span>
              </div>
              <p className="text-xl font-bold">{calendarioMedicao.cicloAtual}</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Dia Corte</span>
              </div>
              <p className="text-xl font-bold">Dia {calendarioMedicao.diaCorte}</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Fechamento</span>
              </div>
              <p className="text-xl font-bold">+{calendarioMedicao.diasParaFechamento} dias</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Envio NF</span>
              </div>
              <p className="text-xl font-bold">+{calendarioMedicao.diasParaEnvioNF} dias</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Alerta</span>
              </div>
              <p className="text-xl font-bold">-{calendarioMedicao.alertaAntecedencia} dias</p>
            </div>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-12 gap-6">
            {/* Calendario de Ciclos */}
            <div className="col-span-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Ciclos de Medicao</h2>
                </div>
                <span className="text-xs text-muted-foreground">Proximos 6 meses</span>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Periodo
                      </th>
                      <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Dia Corte
                      </th>
                      <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Fechamento
                      </th>
                      <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Envio NF
                      </th>
                      <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cicloDatas.map((ciclo, index) => (
                      <tr
                        key={ciclo.mes}
                        className={`border-b border-border/50 hover:bg-muted/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2.5 px-3 font-medium">{ciclo.mes}</td>
                        <td className="py-2.5 px-3 text-center font-mono">{ciclo.diaCorte}</td>
                        <td className="py-2.5 px-3 text-center font-mono">{ciclo.fechamento}</td>
                        <td className="py-2.5 px-3 text-center font-mono">{ciclo.envioNF}</td>
                        <td className="py-2.5 px-3 text-center">{getStatusBadge(ciclo.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Alertas e Work Follow */}
            <div className="col-span-4 space-y-4">
              {/* Alertas Pendentes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Alertas</h2>
                </div>
                <div className="space-y-2">
                  {alertasPendentes.map((alerta, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        alerta.tipo === "atencao"
                          ? "bg-amber-500/10 border-amber-500/20"
                          : "bg-primary/10 border-primary/20"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {alerta.tipo === "atencao" ? (
                          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-xs font-medium">{alerta.mensagem}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {alerta.setor} - {alerta.data}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Follow */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Work Follow</h2>
                  </div>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent gap-1">
                    <Plus className="h-3 w-3" />
                    Adicionar
                  </Button>
                </div>
                <div className="border border-border rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                          Setor
                        </th>
                        <th className="text-center py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                          Dias
                        </th>
                        <th className="text-center py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                          Ativo
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {workFollow.map((item, index) => (
                        <tr
                          key={item.setor}
                          className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className="py-2 px-3">
                            <div>
                              <p className="font-medium">{item.setor}</p>
                              <p className="text-[10px] text-muted-foreground">{item.tipoAlerta}</p>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center font-mono">-{item.antecedencia}</td>
                          <td className="py-2 px-3 text-center">
                            {item.ativo ? (
                              <CheckCircle2 className="h-4 w-4 text-primary mx-auto" />
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-3 p-4 bg-muted/30 border border-border rounded-lg">
            <Bell className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Calendario integrado ao Genesis</p>
              <p className="text-xs text-muted-foreground mt-1">
                Os alertas configurados serao enviados automaticamente para os responsaveis conforme as datas definidas.
                O Gerente de Contrato recebera notificacao quando metas nao forem cumpridas ou houver risco de impacto.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
