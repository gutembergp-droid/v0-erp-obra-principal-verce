"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  ArrowLeft,
  Target,
  Package,
  Users,
  Truck,
  Wrench,
  Shield,
  Calculator,
  Building2,
  Edit2,
  TrendingDown,
  Percent,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados - Metas CR/CD por Categoria
const metasCRCD = [
  {
    categoria: "Material",
    icon: Package,
    metaGlobal: 0.9,
    orcado: 128250000,
    meta: 115425000,
    economia: 12825000,
    itens: [
      { codigo: "MAT-001", descricao: "Concreto Usinado FCK 30", orcado: 29250000, meta: 26325000, crcd: 0.9 },
      { codigo: "MAT-002", descricao: "Aco CA-50", orcado: 24225000, meta: 21802500, crcd: 0.9 },
      { codigo: "MAT-003", descricao: "CBUQ - Faixa C", orcado: 34960000, meta: 31464000, crcd: 0.9 },
      { codigo: "MAT-004", descricao: "Brita Graduada", orcado: 8075000, meta: 7267500, crcd: 0.9 },
    ],
  },
  {
    categoria: "Mao de Obra",
    icon: Users,
    metaGlobal: 0.95,
    orcado: 71250000,
    meta: 67687500,
    economia: 3562500,
    itens: [
      { codigo: "MO-001", descricao: "Operador de Maquinas", orcado: 11400000, meta: 10830000, crcd: 0.95 },
      { codigo: "MO-002", descricao: "Encarregado", orcado: 5700000, meta: 5415000, crcd: 0.95 },
      { codigo: "MO-003", descricao: "Servente", orcado: 6412500, meta: 6091875, crcd: 0.95 },
    ],
  },
  {
    categoria: "Equipamento",
    icon: Truck,
    metaGlobal: 0.85,
    orcado: 42750000,
    meta: 36337500,
    economia: 6412500,
    itens: [
      { codigo: "EQP-001", descricao: "Escavadeira Hidraulica", orcado: 14250000, meta: 12112500, crcd: 0.85 },
      { codigo: "EQP-002", descricao: "Caminhao Basculante", orcado: 11970000, meta: 10174500, crcd: 0.85 },
      { codigo: "EQP-003", descricao: "Rolo Compactador", orcado: 2736000, meta: 2325600, crcd: 0.85 },
    ],
  },
  {
    categoria: "Terceiro",
    icon: Wrench,
    metaGlobal: 0.92,
    orcado: 42750000,
    meta: 39330000,
    economia: 3420000,
    itens: [
      { codigo: "TER-001", descricao: "Transporte de Material", orcado: 2422500, meta: 2228700, crcd: 0.92 },
      { codigo: "TER-002", descricao: "Laboratorio de Ensaios", orcado: 850000, meta: 782000, crcd: 0.92 },
      { codigo: "TER-003", descricao: "Topografia", orcado: 1080000, meta: 993600, crcd: 0.92 },
    ],
  },
]

// Resumo Geral
const resumoMetas = {
  custoOrcado: 285000000,
  custoMeta: 258780000,
  economiaTotal: 26220000,
  crcdMedio: 0.908,
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

export default function EstruturacaoMetasPage() {
  const [categoriaEditando, setCategoriaEditando] = useState<string | null>(null)
  const [dialogAberto, setDialogAberto] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navegacaoSetor = [
    { codigo: "EST-00", nome: "Visao Geral", rota: "/obra/comercial/estruturacao-geral", icon: FileText },
    { codigo: "EST-04", nome: "Suprimentos", rota: "/obra/comercial/estruturacao-suprimentos", icon: Package },
    { codigo: "EST-M", nome: "Metas CR/CD", rota: "/obra/comercial/estruturacao-metas", icon: Target },
    { codigo: "EST-03", nome: "Custo", rota: "/obra/comercial/estruturacao-custo", icon: Calculator },
    { codigo: "EST-05", nome: "Indireto", rota: "/obra/comercial/estruturacao-indireto", icon: Building2 },
  ]

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex-none border-b border-border bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra/comercial/estruturacao-suprimentos">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Metas CR/CD por Categoria</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-M
                </Badge>
                <Badge className="bg-primary/10 text-primary text-[10px]">Configurado</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">Definicao de metas globais e por insumo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="gap-2">
              <Shield className="h-4 w-4" />
              Homologar Metas
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

          {/* Cards Resumo */}
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Custo Orcado</span>
              </div>
              <p className="text-xl font-bold">{formatCurrency(resumoMetas.custoOrcado)}</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase">Custo Meta</span>
              </div>
              <p className="text-xl font-bold text-primary">{formatCurrency(resumoMetas.custoMeta)}</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-muted-foreground uppercase">Economia Prevista</span>
              </div>
              <p className="text-xl font-bold text-emerald-600">{formatCurrency(resumoMetas.economiaTotal)}</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">CR/CD Medio</span>
              </div>
              <p className="text-xl font-bold">{(resumoMetas.crcdMedio * 100).toFixed(1)}%</p>
            </div>
          </div>

          {/* Metas por Categoria */}
          <div className="space-y-4">
            {metasCRCD.map((categoria) => {
              const Icon = categoria.icon
              return (
                <div key={categoria.categoria} className="border border-border rounded-lg overflow-hidden">
                  {/* Header da Categoria */}
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h3 className="font-semibold">{categoria.categoria}</h3>
                        <p className="text-xs text-muted-foreground">
                          Orcado: {formatCurrency(categoria.orcado)} | Meta: {formatCurrency(categoria.meta)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Meta Global</p>
                        <Badge className="bg-primary/10 text-primary font-mono text-sm">
                          {(categoria.metaGlobal * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Economia</p>
                        <Badge className="bg-emerald-500/10 text-emerald-600 font-mono text-sm">
                          {formatCurrency(categoria.economia)}
                        </Badge>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1.5 bg-transparent">
                            <Edit2 className="h-3.5 w-3.5" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Meta CR/CD - {categoria.categoria}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Meta Global (%)</label>
                              <Input
                                type="number"
                                defaultValue={categoria.metaGlobal * 100}
                                step={1}
                                min={50}
                                max={100}
                              />
                              <p className="text-xs text-muted-foreground">
                                Define o teto de custo para todos os itens desta categoria
                              </p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-lg">
                              <p className="text-xs text-muted-foreground">
                                Esta meta sera o teto para o setor de Custo/Meta. Qualquer desvio sera sinalizado
                                automaticamente.
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline">Cancelar</Button>
                            <Button>Salvar Meta</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  {/* Itens da Categoria */}
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/20 border-b border-border">
                        <th className="text-left py-2 px-4 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                          Codigo
                        </th>
                        <th className="text-left py-2 px-4 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                          Descricao
                        </th>
                        <th className="text-right py-2 px-4 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                          Orcado
                        </th>
                        <th className="text-right py-2 px-4 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                          Meta
                        </th>
                        <th className="text-center py-2 px-4 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                          CR/CD
                        </th>
                        <th className="py-2 px-4 w-24"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoria.itens.map((item, index) => (
                        <tr
                          key={item.codigo}
                          className={`border-b border-border/50 hover:bg-muted/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
                        >
                          <td className="py-2.5 px-4 font-mono text-[11px]">{item.codigo}</td>
                          <td className="py-2.5 px-4">{item.descricao}</td>
                          <td className="py-2.5 px-4 text-right font-mono tabular-nums">
                            {formatCurrency(item.orcado)}
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono tabular-nums text-primary">
                            {formatCurrency(item.meta)}
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            <Badge variant="outline" className="font-mono text-[10px]">
                              {(item.crcd * 100).toFixed(0)}%
                            </Badge>
                          </td>
                          <td className="py-2.5 px-4">
                            <Progress value={item.crcd * 100} className="h-1.5" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            })}
          </div>

          {/* Aviso */}
          <div className="flex items-start gap-3 p-4 bg-muted/30 border border-border rounded-lg">
            <Target className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Metas integradas ao Custo/Meta</p>
              <p className="text-xs text-muted-foreground mt-1">
                As metas definidas aqui serao utilizadas como teto pelo setor de Custo/Meta. Qualquer aquisicao que
                ultrapasse a meta sera automaticamente sinalizada como desvio e exigira aprovacao do Gerente de
                Contrato.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
