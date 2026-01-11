"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  Package,
  Users,
  Truck,
  Wrench,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Download,
  Eye,
  FileSignature,
  Ruler,
  Calculator,
  Building2,
  TrendingUp,
  BarChart3,
  Layers,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados - Resumo da Proposta
const resumoProposta = {
  numeroContrato: "CT-2024/0892",
  cliente: "DNIT",
  objeto: "Duplicacao BR-101/SC - Trecho Florianopolis-Palhoca",
  valorVenda: 405000000,
  custoDireto: 285000000,
  custoIndireto: 42750000,
  bdi: 77250000,
  margemPrevista: 19.07,
  fcd: 1.42,
}

// Dados mockados - Cards de Representatividade
const representatividade = [
  { tipo: "Material", valor: 128250000, percentual: 45, icon: Package, cor: "bg-blue-500" },
  { tipo: "Mao de Obra", valor: 71250000, percentual: 25, icon: Users, cor: "bg-emerald-500" },
  { tipo: "Equipamento", valor: 42750000, percentual: 15, icon: Truck, cor: "bg-amber-500" },
  { tipo: "Terceiro", valor: 42750000, percentual: 15, icon: Wrench, cor: "bg-purple-500" },
]

// Dados mockados - Principais Servicos (Pareto)
const principaisServicos = [
  { codigo: "1.2", descricao: "Pavimentacao", valor: 85500000, percentual: 30, acumulado: 30 },
  { codigo: "1.1", descricao: "Terraplenagem", valor: 57000000, percentual: 20, acumulado: 50 },
  { codigo: "1.4", descricao: "Obras de Arte Especiais", valor: 42750000, percentual: 15, acumulado: 65 },
  { codigo: "1.3", descricao: "Drenagem", valor: 28500000, percentual: 10, acumulado: 75 },
  { codigo: "1.5", descricao: "Sinalizacao", valor: 22800000, percentual: 8, acumulado: 83 },
  { codigo: "1.6", descricao: "Obras Complementares", valor: 17100000, percentual: 6, acumulado: 89 },
  { codigo: "2.1", descricao: "Administracao Local", valor: 17100000, percentual: 6, acumulado: 95 },
  { codigo: "2.2", descricao: "Mobilizacao/Desmob", valor: 14250000, percentual: 5, acumulado: 100 },
]

// Dados mockados - Principais Recursos
const principaisRecursos = [
  { codigo: "MAT-004", descricao: "CBUQ - Faixa C", tipo: "Material", valor: 35000000, percentual: 12.3 },
  { codigo: "MAT-001", descricao: "Concreto Usinado FCK 30", tipo: "Material", valor: 28500000, percentual: 10.0 },
  { codigo: "MAT-002", descricao: "Aco CA-50", tipo: "Material", valor: 22800000, percentual: 8.0 },
  { codigo: "EQP-001", descricao: "Escavadeira Hidraulica", tipo: "Equipamento", valor: 14250000, percentual: 5.0 },
  { codigo: "MO-001", descricao: "Operador de Maquinas", tipo: "Mao de Obra", valor: 11400000, percentual: 4.0 },
  { codigo: "MAT-003", descricao: "Brita Graduada", tipo: "Material", valor: 8550000, percentual: 3.0 },
  { codigo: "EQP-002", descricao: "Caminhao Basculante", tipo: "Equipamento", valor: 7125000, percentual: 2.5 },
  { codigo: "MO-002", descricao: "Encarregado", tipo: "Mao de Obra", valor: 5700000, percentual: 2.0 },
]

// Dados mockados - Composicoes
const composicoes = [
  {
    codigo: "COMP-001",
    descricao: "Escavacao e Carga de Material",
    unidade: "m3",
    custoUnitario: 71.11,
    recursos: [
      {
        tipo: "Equipamento",
        descricao: "Escavadeira Hidraulica 320",
        unidade: "h",
        coeficiente: 0.025,
        custoUnit: 450,
        custoTotal: 11.25,
      },
      {
        tipo: "Equipamento",
        descricao: "Caminhao Basculante 14m3",
        unidade: "h",
        coeficiente: 0.08,
        custoUnit: 280,
        custoTotal: 22.4,
      },
      {
        tipo: "Mao de Obra",
        descricao: "Operador de Escavadeira",
        unidade: "h",
        coeficiente: 0.025,
        custoUnit: 85,
        custoTotal: 2.13,
      },
      { tipo: "Mao de Obra", descricao: "Motorista", unidade: "h", coeficiente: 0.08, custoUnit: 65, custoTotal: 5.2 },
      { tipo: "Mao de Obra", descricao: "Servente", unidade: "h", coeficiente: 0.05, custoUnit: 45, custoTotal: 2.25 },
      {
        tipo: "Material",
        descricao: "Combustivel (Diesel)",
        unidade: "l",
        coeficiente: 0.35,
        custoUnit: 6.5,
        custoTotal: 2.28,
      },
    ],
  },
  {
    codigo: "COMP-002",
    descricao: "Concreto Estrutural FCK 30 MPa",
    unidade: "m3",
    custoUnitario: 850.0,
    recursos: [
      {
        tipo: "Material",
        descricao: "Concreto Usinado FCK 30",
        unidade: "m3",
        coeficiente: 1.05,
        custoUnit: 650,
        custoTotal: 682.5,
      },
      {
        tipo: "Equipamento",
        descricao: "Bomba de Concreto",
        unidade: "h",
        coeficiente: 0.15,
        custoUnit: 350,
        custoTotal: 52.5,
      },
      { tipo: "Mao de Obra", descricao: "Pedreiro", unidade: "h", coeficiente: 1.2, custoUnit: 55, custoTotal: 66.0 },
      { tipo: "Mao de Obra", descricao: "Servente", unidade: "h", coeficiente: 2.0, custoUnit: 45, custoTotal: 90.0 },
    ],
  },
  {
    codigo: "COMP-003",
    descricao: "CBUQ - Binder (Camada Intermediaria)",
    unidade: "t",
    custoUnitario: 520.0,
    recursos: [
      {
        tipo: "Material",
        descricao: "CBUQ - Faixa C",
        unidade: "t",
        coeficiente: 1.02,
        custoUnit: 380,
        custoTotal: 387.6,
      },
      {
        tipo: "Equipamento",
        descricao: "Vibroacabadora",
        unidade: "h",
        coeficiente: 0.08,
        custoUnit: 650,
        custoTotal: 52.0,
      },
      {
        tipo: "Equipamento",
        descricao: "Rolo Compactador",
        unidade: "h",
        coeficiente: 0.12,
        custoUnit: 320,
        custoTotal: 38.4,
      },
      {
        tipo: "Mao de Obra",
        descricao: "Operador Vibroacabadora",
        unidade: "h",
        coeficiente: 0.08,
        custoUnit: 95,
        custoTotal: 7.6,
      },
      { tipo: "Mao de Obra", descricao: "Servente", unidade: "h", coeficiente: 0.25, custoUnit: 45, custoTotal: 11.25 },
    ],
  },
]

// Dados mockados - Lista de Recursos
const listaRecursos = {
  materiais: [
    {
      codigo: "MAT-001",
      descricao: "Concreto Usinado FCK 30",
      unidade: "m3",
      quantidade: 45000,
      valorUnit: 650,
      valorTotal: 29250000,
    },
    {
      codigo: "MAT-002",
      descricao: "Aco CA-50 Ø 10mm",
      unidade: "kg",
      quantidade: 2850000,
      valorUnit: 8.5,
      valorTotal: 24225000,
    },
    {
      codigo: "MAT-003",
      descricao: "Brita Graduada",
      unidade: "m3",
      quantidade: 85000,
      valorUnit: 95,
      valorTotal: 8075000,
    },
    {
      codigo: "MAT-004",
      descricao: "CBUQ - Faixa C",
      unidade: "t",
      quantidade: 92000,
      valorUnit: 380,
      valorTotal: 34960000,
    },
    {
      codigo: "MAT-005",
      descricao: "Emulsao RR-2C",
      unidade: "l",
      quantidade: 320000,
      valorUnit: 6.8,
      valorTotal: 2176000,
    },
  ],
  maoDeObra: [
    {
      codigo: "MO-001",
      descricao: "Operador de Escavadeira",
      unidade: "h",
      quantidade: 28500,
      valorUnit: 85,
      valorTotal: 2422500,
    },
    {
      codigo: "MO-002",
      descricao: "Encarregado de Terraplenagem",
      unidade: "h",
      quantidade: 14250,
      valorUnit: 125,
      valorTotal: 1781250,
    },
    {
      codigo: "MO-003",
      descricao: "Servente de Obras",
      unidade: "h",
      quantidade: 142500,
      valorUnit: 45,
      valorTotal: 6412500,
    },
    {
      codigo: "MO-004",
      descricao: "Armador de Ferragem",
      unidade: "h",
      quantidade: 57000,
      valorUnit: 75,
      valorTotal: 4275000,
    },
  ],
  equipamentos: [
    {
      codigo: "EQP-001",
      descricao: "Escavadeira Hidraulica 320",
      unidade: "h",
      quantidade: 14250,
      valorUnit: 450,
      valorTotal: 6412500,
    },
    {
      codigo: "EQP-002",
      descricao: "Caminhao Basculante 14m3",
      unidade: "h",
      quantidade: 42750,
      valorUnit: 280,
      valorTotal: 11970000,
    },
    {
      codigo: "EQP-003",
      descricao: "Rolo Compactador Liso",
      unidade: "h",
      quantidade: 8550,
      valorUnit: 320,
      valorTotal: 2736000,
    },
    {
      codigo: "EQP-004",
      descricao: "Vibroacabadora de Asfalto",
      unidade: "h",
      quantidade: 4275,
      valorUnit: 650,
      valorTotal: 2778750,
    },
  ],
  terceiros: [
    {
      codigo: "TER-001",
      descricao: "Transporte de Material",
      unidade: "m3xkm",
      quantidade: 2850000,
      valorUnit: 0.85,
      valorTotal: 2422500,
    },
    {
      codigo: "TER-002",
      descricao: "Laboratorio de Ensaios",
      unidade: "vb",
      quantidade: 1,
      valorUnit: 850000,
      valorTotal: 850000,
    },
    {
      codigo: "TER-003",
      descricao: "Topografia",
      unidade: "mes",
      quantidade: 24,
      valorUnit: 45000,
      valorTotal: 1080000,
    },
  ],
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

const formatNumber = (value: number) => {
  return new Intl.NumberFormat("pt-BR").format(value)
}

const getIconByType = (tipo: string) => {
  switch (tipo) {
    case "Material":
      return Package
    case "Mao de Obra":
      return Users
    case "Equipamento":
      return Truck
    case "Terceiro":
      return Wrench
    default:
      return Package
  }
}

export default function EstruturacaoPropostaPage() {
  const [composicaoExpandida, setComposicaoExpandida] = useState<string | null>("COMP-001")
  const [abaRecursos, setAbaRecursos] = useState("materiais")
  const router = useRouter()
  const pathname = usePathname()

  const navegacaoSetor = [
    { codigo: "EST-00", nome: "Visao Geral", rota: "/obra/comercial/estruturacao-geral", icon: FileText },
    { codigo: "EST-01", nome: "Contrato", rota: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
    { codigo: "EST-P", nome: "Proposta", rota: "/obra/comercial/estruturacao-proposta", icon: BarChart3 },
    { codigo: "EST-02", nome: "Medicao", rota: "/obra/comercial/estruturacao-medicao", icon: Ruler },
    { codigo: "EST-03", nome: "Custo", rota: "/obra/comercial/estruturacao-custo", icon: Calculator },
    { codigo: "EST-04", nome: "Suprimentos", rota: "/obra/comercial/estruturacao-suprimentos", icon: Package },
    { codigo: "EST-05", nome: "Indireto", rota: "/obra/comercial/estruturacao-indireto", icon: Building2 },
  ]

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex-none border-b border-border bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra/comercial/estruturacao-geral">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Analise da Proposta</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-P
                </Badge>
                <Badge className="bg-primary/10 text-primary text-[10px]">Proposta Ganha</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">Planilha analitica, composicoes e recursos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Eye className="h-4 w-4" />
              Visualizar Completa
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Exportar
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

          {/* Cards Superiores - Representatividade */}
          <div className="grid grid-cols-6 gap-4">
            {/* Card Venda */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground uppercase">Valor Venda</span>
              </div>
              <p className="text-xl font-bold text-primary">{formatCurrency(resumoProposta.valorVenda)}</p>
              <p className="text-[10px] text-muted-foreground mt-1">Contrato {resumoProposta.numeroContrato}</p>
            </div>

            {/* Card Custo */}
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Custo Total</span>
              </div>
              <p className="text-xl font-bold">
                {formatCurrency(resumoProposta.custoDireto + resumoProposta.custoIndireto)}
              </p>
              <p className="text-[10px] text-muted-foreground mt-1">Direto + Indireto</p>
            </div>

            {/* Cards de Representatividade */}
            {representatividade.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.tipo} className="border border-border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground uppercase">{item.tipo}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-xl font-bold">{item.percentual}%</p>
                    <span className="text-xs text-muted-foreground">{formatCurrency(item.valor)}</span>
                  </div>
                  <Progress value={item.percentual} className="h-1.5 mt-2" />
                </div>
              )
            })}
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-12 gap-6">
            {/* Pareto - Principais Servicos */}
            <div className="col-span-7">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                    Analise de Pareto - Principais Servicos
                  </h2>
                </div>
                <span className="text-xs text-muted-foreground">80% do custo em 5 servicos</span>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Codigo
                      </th>
                      <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Servico
                      </th>
                      <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Valor
                      </th>
                      <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        %
                      </th>
                      <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Acum.
                      </th>
                      <th className="py-2.5 px-3 w-32"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {principaisServicos.map((servico, index) => (
                      <tr
                        key={servico.codigo}
                        className={`border-b border-border/50 hover:bg-muted/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2.5 px-3 font-mono text-[11px]">{servico.codigo}</td>
                        <td className="py-2.5 px-3 font-medium">{servico.descricao}</td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                          {formatCurrency(servico.valor)}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums font-medium">
                          {servico.percentual}%
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${servico.acumulado <= 80 ? "bg-primary/10 text-primary" : "bg-muted"}`}
                          >
                            {servico.acumulado}%
                          </Badge>
                        </td>
                        <td className="py-2.5 px-3">
                          <Progress value={servico.percentual} className="h-1.5" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Principais Recursos */}
            <div className="col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Principais Recursos</h2>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Recurso
                      </th>
                      <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Tipo
                      </th>
                      <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        %
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {principaisRecursos.slice(0, 8).map((recurso, index) => {
                      const Icon = getIconByType(recurso.tipo)
                      return (
                        <tr
                          key={recurso.codigo}
                          className={`border-b border-border/50 hover:bg-muted/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className="py-2 px-3">
                            <div>
                              <p className="font-medium text-[11px]">{recurso.descricao}</p>
                              <p className="text-[10px] text-muted-foreground font-mono">{recurso.codigo}</p>
                            </div>
                          </td>
                          <td className="py-2 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Icon className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums font-medium">
                            {recurso.percentual}%
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Composicoes de Preco */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  Composicoes de Preco Unitario
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">{composicoes.length} composicoes carregadas</span>
            </div>
            <div className="border border-border rounded-lg overflow-hidden">
              {composicoes.map((composicao, index) => (
                <div key={composicao.codigo} className={`${index > 0 ? "border-t border-border" : ""}`}>
                  {/* Header da Composicao */}
                  <div
                    className="flex items-center justify-between px-4 py-3 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() =>
                      setComposicaoExpandida(composicaoExpandida === composicao.codigo ? null : composicao.codigo)
                    }
                  >
                    <div className="flex items-center gap-3">
                      {composicaoExpandida === composicao.codigo ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="font-mono text-xs text-muted-foreground">{composicao.codigo}</span>
                      <span className="font-medium text-sm">{composicao.descricao}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground">
                        Unidade: <span className="font-mono">{composicao.unidade}</span>
                      </span>
                      <Badge variant="outline" className="font-mono text-xs">
                        {formatCurrency(composicao.custoUnitario)}/{composicao.unidade}
                      </Badge>
                    </div>
                  </div>

                  {/* Recursos da Composicao */}
                  {composicaoExpandida === composicao.codigo && (
                    <div className="px-4 py-3 bg-background">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 px-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                              Tipo
                            </th>
                            <th className="text-left py-2 px-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                              Descricao
                            </th>
                            <th className="text-center py-2 px-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                              Unid.
                            </th>
                            <th className="text-right py-2 px-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                              Coef.
                            </th>
                            <th className="text-right py-2 px-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                              Custo Unit.
                            </th>
                            <th className="text-right py-2 px-2 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                              Custo Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {composicao.recursos.map((recurso, idx) => {
                            const Icon = getIconByType(recurso.tipo)
                            return (
                              <tr key={idx} className="border-b border-border/30 last:border-0">
                                <td className="py-2 px-2">
                                  <div className="flex items-center gap-1.5">
                                    <Icon className="h-3 w-3 text-muted-foreground" />
                                    <span className="text-muted-foreground">{recurso.tipo}</span>
                                  </div>
                                </td>
                                <td className="py-2 px-2">{recurso.descricao}</td>
                                <td className="py-2 px-2 text-center font-mono text-muted-foreground">
                                  {recurso.unidade}
                                </td>
                                <td className="py-2 px-2 text-right font-mono tabular-nums">
                                  {recurso.coeficiente.toFixed(3)}
                                </td>
                                <td className="py-2 px-2 text-right font-mono tabular-nums">
                                  {formatCurrency(recurso.custoUnit)}
                                </td>
                                <td className="py-2 px-2 text-right font-mono tabular-nums font-medium">
                                  {formatCurrency(recurso.custoTotal)}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                        <tfoot>
                          <tr className="bg-muted/20">
                            <td
                              colSpan={5}
                              className="py-2 px-2 text-right font-medium text-muted-foreground uppercase text-[10px]"
                            >
                              Total
                            </td>
                            <td className="py-2 px-2 text-right font-mono tabular-nums font-semibold">
                              {formatCurrency(composicao.custoUnitario)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Lista de Recursos por Tipo */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Recursos da Proposta</h2>
              </div>
            </div>

            <Tabs value={abaRecursos} onValueChange={setAbaRecursos} className="w-full">
              <TabsList className="mb-3">
                <TabsTrigger value="materiais" className="gap-1.5 text-xs">
                  <Package className="h-3.5 w-3.5" />
                  Materiais ({listaRecursos.materiais.length})
                </TabsTrigger>
                <TabsTrigger value="maoDeObra" className="gap-1.5 text-xs">
                  <Users className="h-3.5 w-3.5" />
                  Mao de Obra ({listaRecursos.maoDeObra.length})
                </TabsTrigger>
                <TabsTrigger value="equipamentos" className="gap-1.5 text-xs">
                  <Truck className="h-3.5 w-3.5" />
                  Equipamentos ({listaRecursos.equipamentos.length})
                </TabsTrigger>
                <TabsTrigger value="terceiros" className="gap-1.5 text-xs">
                  <Wrench className="h-3.5 w-3.5" />
                  Terceiros ({listaRecursos.terceiros.length})
                </TabsTrigger>
              </TabsList>

              {Object.entries(listaRecursos).map(([key, recursos]) => (
                <TabsContent key={key} value={key}>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-muted/50 border-b border-border">
                          <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                            Codigo
                          </th>
                          <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                            Descricao
                          </th>
                          <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                            Unidade
                          </th>
                          <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                            Quantidade
                          </th>
                          <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                            Valor Unit.
                          </th>
                          <th className="text-right py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                            Valor Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recursos.map((recurso: any, index: number) => (
                          <tr
                            key={recurso.codigo}
                            className={`border-b border-border/50 hover:bg-muted/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                          >
                            <td className="py-2.5 px-3 font-mono text-[11px]">{recurso.codigo}</td>
                            <td className="py-2.5 px-3 font-medium">{recurso.descricao}</td>
                            <td className="py-2.5 px-3 text-center font-mono text-muted-foreground">
                              {recurso.unidade}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                              {formatNumber(recurso.quantidade)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                              {formatCurrency(recurso.valorUnit)}
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono tabular-nums font-medium">
                              {formatCurrency(recurso.valorTotal)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-muted/50 border-t border-border">
                          <td
                            colSpan={5}
                            className="py-2.5 px-3 text-right font-medium text-muted-foreground uppercase text-[10px]"
                          >
                            Total
                          </td>
                          <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">
                            {formatCurrency(recursos.reduce((acc: number, r: any) => acc + r.valorTotal, 0))}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
