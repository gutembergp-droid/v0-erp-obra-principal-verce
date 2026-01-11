"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Send,
  Shield,
  ChevronRight,
  ChevronDown,
  Link2,
  AlertCircle,
  Calculator,
  FileSignature,
  Ruler,
  Package,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados da EAP de Custo
const eapCustoData = [
  {
    id: 1,
    codigo: "1",
    descricao: "CUSTO DIRETO",
    nivel: 1,
    tipo: "Direto",
    categoria: "-",
    custoOrcado: 28500000,
    unidade: "-",
    quantidade: null,
    valorUnitario: null,
    status: "Configurado",
    children: [
      {
        id: 2,
        codigo: "1.1",
        descricao: "Terraplenagem",
        nivel: 2,
        tipo: "Direto",
        categoria: "-",
        custoOrcado: 8500000,
        unidade: "-",
        quantidade: null,
        valorUnitario: null,
        status: "Configurado",
        children: [
          {
            id: 3,
            codigo: "1.1.1",
            descricao: "Escavação e Carga",
            nivel: 3,
            tipo: "Direto",
            categoria: "Serviço",
            custoOrcado: 3200000,
            unidade: "m³",
            quantidade: 45000,
            valorUnitario: 71.11,
            status: "Configurado",
          },
          {
            id: 4,
            codigo: "1.1.2",
            descricao: "Transporte de Material",
            nivel: 3,
            tipo: "Direto",
            categoria: "Serviço",
            custoOrcado: 2800000,
            unidade: "m³xkm",
            quantidade: 280000,
            valorUnitario: 10.0,
            status: "Configurado",
          },
          {
            id: 5,
            codigo: "1.1.3",
            descricao: "Compactação",
            nivel: 3,
            tipo: "Direto",
            categoria: "Serviço",
            custoOrcado: 2500000,
            unidade: "m³",
            quantidade: 50000,
            valorUnitario: 50.0,
            status: "Configurado",
          },
        ],
      },
      {
        id: 6,
        codigo: "1.2",
        descricao: "Pavimentação",
        nivel: 2,
        tipo: "Direto",
        categoria: "-",
        custoOrcado: 12000000,
        unidade: "-",
        quantidade: null,
        valorUnitario: null,
        status: "Configurado",
        children: [
          {
            id: 7,
            codigo: "1.2.1",
            descricao: "Base Granular",
            nivel: 3,
            tipo: "Direto",
            categoria: "Material",
            custoOrcado: 4500000,
            unidade: "m³",
            quantidade: 22500,
            valorUnitario: 200.0,
            status: "Configurado",
          },
          {
            id: 8,
            codigo: "1.2.2",
            descricao: "Imprimação",
            nivel: 3,
            tipo: "Direto",
            categoria: "Serviço",
            custoOrcado: 1500000,
            unidade: "m²",
            quantidade: 75000,
            valorUnitario: 20.0,
            status: "Configurado",
          },
          {
            id: 9,
            codigo: "1.2.3",
            descricao: "CBUQ - Binder",
            nivel: 3,
            tipo: "Direto",
            categoria: "Material",
            custoOrcado: 3500000,
            unidade: "t",
            quantidade: 7000,
            valorUnitario: 500.0,
            status: "Configurado",
          },
          {
            id: 10,
            codigo: "1.2.4",
            descricao: "CBUQ - Capa",
            nivel: 3,
            tipo: "Direto",
            categoria: "Material",
            custoOrcado: 2500000,
            unidade: "t",
            quantidade: 5000,
            valorUnitario: 500.0,
            status: "Pendente",
          },
        ],
      },
      {
        id: 11,
        codigo: "1.3",
        descricao: "Drenagem",
        nivel: 2,
        tipo: "Direto",
        categoria: "-",
        custoOrcado: 5000000,
        unidade: "-",
        quantidade: null,
        valorUnitario: null,
        status: "Configurado",
        children: [
          {
            id: 12,
            codigo: "1.3.1",
            descricao: "Bueiros BSTC",
            nivel: 3,
            tipo: "Direto",
            categoria: "Material",
            custoOrcado: 2000000,
            unidade: "m",
            quantidade: 400,
            valorUnitario: 5000.0,
            status: "Configurado",
          },
          {
            id: 13,
            codigo: "1.3.2",
            descricao: "Sarjetas",
            nivel: 3,
            tipo: "Direto",
            categoria: "Serviço",
            custoOrcado: 1500000,
            unidade: "m",
            quantidade: 3000,
            valorUnitario: 500.0,
            status: "Configurado",
          },
          {
            id: 14,
            codigo: "1.3.3",
            descricao: "Meio-fio",
            nivel: 3,
            tipo: "Direto",
            categoria: "Material",
            custoOrcado: 1500000,
            unidade: "m",
            quantidade: 6000,
            valorUnitario: 250.0,
            status: "Pendente",
          },
        ],
      },
      {
        id: 15,
        codigo: "1.4",
        descricao: "Obras de Arte Especiais",
        nivel: 2,
        tipo: "Direto",
        categoria: "-",
        custoOrcado: 3000000,
        unidade: "-",
        quantidade: null,
        valorUnitario: null,
        status: "Configurado",
        children: [
          {
            id: 16,
            codigo: "1.4.1",
            descricao: "Ponte Km 12",
            nivel: 3,
            tipo: "Direto",
            categoria: "Serviço",
            custoOrcado: 3000000,
            unidade: "vb",
            quantidade: 1,
            valorUnitario: 3000000.0,
            status: "Configurado",
          },
        ],
      },
    ],
  },
  {
    id: 17,
    codigo: "2",
    descricao: "CUSTO INDIRETO (IDENTIFICADO)",
    nivel: 1,
    tipo: "Indireto",
    categoria: "-",
    custoOrcado: 4275000,
    unidade: "-",
    quantidade: null,
    valorUnitario: null,
    status: "Identificado",
    children: [
      {
        id: 18,
        codigo: "2.1",
        descricao: "Administração Local",
        nivel: 2,
        tipo: "Indireto",
        categoria: "Pessoal",
        custoOrcado: 2500000,
        unidade: "mês",
        quantidade: 18,
        valorUnitario: 138888.89,
        status: "Identificado",
      },
      {
        id: 19,
        codigo: "2.2",
        descricao: "Mobilização/Desmobilização",
        nivel: 2,
        tipo: "Indireto",
        categoria: "Serviço",
        custoOrcado: 800000,
        unidade: "vb",
        quantidade: 1,
        valorUnitario: 800000.0,
        status: "Identificado",
      },
      {
        id: 20,
        codigo: "2.3",
        descricao: "Canteiro de Obras",
        nivel: 2,
        tipo: "Indireto",
        categoria: "Infraestrutura",
        custoOrcado: 975000,
        unidade: "vb",
        quantidade: 1,
        valorUnitario: 975000.0,
        status: "Identificado",
      },
    ],
  },
]

// Dados de vínculo
const vinculoData = {
  vinculadosMedicao: 11,
  semVinculoMedicao: 3,
  vinculadosContrato: 14,
  semVinculoContrato: 0,
  itensSemVinculo: ["1.2.4 - CBUQ - Capa", "1.3.3 - Meio-fio", "2.3 - Canteiro de Obras"],
}

// Métricas
const metricasData = [
  {
    indicador: "F/CD (Fator sobre Custo Direto)",
    previsto: "1.15",
    tolerancia: "± 5%",
    regra: "Custo Total / Custo Direto",
  },
  { indicador: "BDI Aplicado", previsto: "25%", tolerancia: "± 2%", regra: "Indireto / Direto" },
  { indicador: "Custo por km", previsto: "R$ 2.184.000/km", tolerancia: "± 10%", regra: "Custo Total / Extensão" },
  { indicador: "Índice de Material", previsto: "45%", tolerancia: "± 5%", regra: "Material / Custo Direto" },
  { indicador: "Índice de Mão de Obra", previsto: "35%", tolerancia: "± 5%", regra: "MO / Custo Direto" },
]

// Validações
const validacoesData = [
  { item: "Estrutura hierárquica consistente", status: true },
  { item: "Todos os itens classificados por tipo", status: true },
  { item: "Todos os itens classificados por categoria", status: true },
  { item: "Custos diretos definidos", status: true },
  { item: "Custos indiretos identificados", status: true },
  { item: "Métricas de controle configuradas", status: true },
  { item: "Vinculação com medição completa", status: false },
  { item: "Vinculação com contrato completa", status: true },
]

const statusConfig = {
  "Não iniciado": { color: "bg-muted text-muted-foreground", icon: Clock },
  "Em estruturação": { color: "bg-amber-500/10 text-amber-600", icon: Clock },
  Revisado: { color: "bg-blue-500/10 text-blue-600", icon: FileText },
  Homologado: { color: "bg-emerald-500/10 text-emerald-600", icon: CheckCircle2 },
}

const currentStatus = "Em estruturação"
const StatusIcon = statusConfig[currentStatus as keyof typeof statusConfig].icon

function EstruturacaoCustoContent() {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set([1, 2, 6, 11, 15, 17]))
  const router = useRouter()
  const pathname = usePathname()

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const formatNumber = (value: number | null) => {
    if (value === null) return "-"
    return new Intl.NumberFormat("pt-BR").format(value)
  }

  const renderEAPRow = (item: any, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedRows.has(item.id)
    const isLevel1 = item.nivel === 1
    const isLevel2 = item.nivel === 2

    return (
      <>
        <tr
          key={item.id}
          className={`
            border-b border-border/50 hover:bg-muted/30 transition-colors
            ${isLevel1 ? "bg-muted/50 font-semibold" : ""}
            ${isLevel2 ? "bg-muted/20" : ""}
          `}
        >
          <td className="py-2 px-3 text-xs font-mono whitespace-nowrap">
            <div className="flex items-center gap-1" style={{ paddingLeft: `${level * 16}px` }}>
              {hasChildren ? (
                <button onClick={() => toggleRow(item.id)} className="p-0.5 hover:bg-muted rounded">
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </button>
              ) : (
                <span className="w-4" />
              )}
              {item.codigo}
            </div>
          </td>
          <td className={`py-2 px-3 text-xs ${isLevel1 ? "font-semibold" : ""}`}>{item.descricao}</td>
          <td className="py-2 px-3 text-xs text-center">{item.nivel}</td>
          <td className="py-2 px-3 text-xs text-center">
            <span
              className={`
              px-1.5 py-0.5 rounded text-[10px] font-medium
              ${item.tipo === "Direto" ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"}
            `}
            >
              {item.tipo}
            </span>
          </td>
          <td className="py-2 px-3 text-xs text-center text-muted-foreground">{item.categoria}</td>
          <td className="py-2 px-3 text-xs text-right font-mono tabular-nums font-medium">
            {formatCurrency(item.custoOrcado)}
          </td>
          <td className="py-2 px-3 text-xs text-center text-muted-foreground">{item.unidade}</td>
          <td className="py-2 px-3 text-xs text-right font-mono tabular-nums text-muted-foreground">
            {formatNumber(item.quantidade)}
          </td>
          <td className="py-2 px-3 text-xs text-right font-mono tabular-nums text-muted-foreground">
            {item.valorUnitario ? formatCurrency(item.valorUnitario) : "-"}
          </td>
          <td className="py-2 px-3 text-xs text-center">
            <span
              className={`
              px-1.5 py-0.5 rounded text-[10px] font-medium
              ${item.status === "Configurado" ? "bg-emerald-500/10 text-emerald-600" : ""}
              ${item.status === "Identificado" ? "bg-blue-500/10 text-blue-600" : ""}
              ${item.status === "Pendente" ? "bg-amber-500/10 text-amber-600" : ""}
            `}
            >
              {item.status}
            </span>
          </td>
        </tr>
        {hasChildren && isExpanded && item.children.map((child: any) => renderEAPRow(child, level + 1))}
      </>
    )
  }

  const custoTotal = 28500000 + 4275000
  const validacoesOk = validacoesData.filter((v) => v.status).length
  const validacoesTotal = validacoesData.length
  const prontoParaUso = validacoesOk === validacoesTotal

  const navegacaoSetor = [
    { codigo: "EST-00", nome: "Visao Geral", rota: "/obra/comercial/estruturacao-geral", icon: FileText },
    { codigo: "EST-01", nome: "Contrato", rota: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
    { codigo: "EST-02", nome: "Medicao", rota: "/obra/comercial/estruturacao-medicao", icon: Ruler },
    { codigo: "EST-03", nome: "Custo", rota: "/obra/comercial/estruturacao-custo", icon: Calculator },
    { codigo: "EST-04", nome: "Suprimentos", rota: "/obra/comercial/estruturacao-suprimentos", icon: Package },
    { codigo: "EST-05", nome: "Indireto", rota: "/obra/comercial/estruturacao-indireto", icon: Building2 },
  ]

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex-none border-b border-border bg-card/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra/comercial/estruturacao-geral">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold">Estruturação do Custo</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-03
                </Badge>
                <Badge className={statusConfig[currentStatus as keyof typeof statusConfig].color}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {currentStatus}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">EAP de Custo e métricas econômicas</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Enviar para Revisão
            </Button>
            <Button size="sm" className="h-8 text-xs" disabled={!prontoParaUso}>
              <Shield className="h-3.5 w-3.5 mr-1.5" />
              Homologar EAP
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
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

          {/* BLOCO 1 - EAP DE CUSTO */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  1. EAP de Custo
                </h2>
                <span className="text-[10px] text-muted-foreground">
                  (14 itens de custo direto + 3 itens indiretos)
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Custo Total Orçado: <span className="font-semibold text-foreground">{formatCurrency(custoTotal)}</span>
              </div>
            </div>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/70 border-b border-border">
                      <th className="py-2 px-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-32">
                        Código
                      </th>
                      <th className="py-2 px-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Descrição
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-16">
                        Nível
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-20">
                        Tipo
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24">
                        Categoria
                      </th>
                      <th className="py-2 px-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-32">
                        Custo Orçado
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-20">
                        Unidade
                      </th>
                      <th className="py-2 px-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24">
                        Quantidade
                      </th>
                      <th className="py-2 px-3 text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-28">
                        Valor Unit.
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>{eapCustoData.map((item) => renderEAPRow(item))}</tbody>
                  <tfoot>
                    <tr className="bg-muted/50 border-t-2 border-border font-semibold">
                      <td colSpan={5} className="py-2.5 px-3 text-xs uppercase">
                        Total Geral
                      </td>
                      <td className="py-2.5 px-3 text-xs text-right font-mono tabular-nums">
                        {formatCurrency(custoTotal)}
                      </td>
                      <td colSpan={4}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* BLOCO 2 - VÍNCULO COM MEDIÇÃO E CONTRATO */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                2. Vínculo com Medição e Contrato
              </h2>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/70 border-b border-border">
                      <th className="py-2 px-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Rastreabilidade
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24">
                        Vinculados
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24">
                        Sem Vínculo
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-20">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3 text-xs flex items-center gap-2">
                        <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                        Itens vinculados à Medição
                      </td>
                      <td className="py-2 px-3 text-xs text-center font-mono tabular-nums">
                        {vinculoData.vinculadosMedicao}
                      </td>
                      <td className="py-2 px-3 text-xs text-center font-mono tabular-nums text-amber-600">
                        {vinculoData.semVinculoMedicao}
                      </td>
                      <td className="py-2 px-3 text-center">
                        {vinculoData.semVinculoMedicao > 0 ? (
                          <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto" />
                        ) : (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                        )}
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-3 text-xs flex items-center gap-2">
                        <Link2 className="h-3.5 w-3.5 text-muted-foreground" />
                        Itens vinculados ao Contrato
                      </td>
                      <td className="py-2 px-3 text-xs text-center font-mono tabular-nums">
                        {vinculoData.vinculadosContrato}
                      </td>
                      <td className="py-2 px-3 text-xs text-center font-mono tabular-nums">
                        {vinculoData.semVinculoContrato}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {vinculoData.itensSemVinculo.length > 0 && (
                <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-amber-600">Itens sem vínculo com Medição:</p>
                      <ul className="mt-1 text-xs text-muted-foreground space-y-0.5">
                        {vinculoData.itensSemVinculo.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* BLOCO 3 - MÉTRICAS E PARÂMETROS */}
            <div className="col-span-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                3. Métricas e Parâmetros de Custo
              </h2>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/70 border-b border-border">
                      <th className="py-2 px-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Indicador
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24">
                        Previsto
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-20">
                        Tolerância
                      </th>
                      <th className="py-2 px-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Regra de Apuração
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {metricasData.map((metrica, idx) => (
                      <tr key={idx} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-2 px-3 text-xs flex items-center gap-2">
                          <Calculator className="h-3.5 w-3.5 text-muted-foreground" />
                          {metrica.indicador}
                        </td>
                        <td className="py-2 px-3 text-xs text-center font-mono tabular-nums font-medium">
                          {metrica.previsto}
                        </td>
                        <td className="py-2 px-3 text-xs text-center text-muted-foreground">{metrica.tolerancia}</td>
                        <td className="py-2 px-3 text-xs text-muted-foreground">{metrica.regra}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* BLOCO 4 - VALIDAÇÕES */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                4. Validações da EAP de Custo
              </h2>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/70 border-b border-border">
                      <th className="py-2 px-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Verificação
                      </th>
                      <th className="py-2 px-3 text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground w-24">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {validacoesData.map((validacao, idx) => (
                      <tr key={idx} className="border-b border-border/50">
                        <td className="py-2 px-3 text-xs">{validacao.item}</td>
                        <td className="py-2 px-3 text-center">
                          {validacao.status ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="col-span-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                EAP Pronta para Uso?
              </h2>
              <div
                className={`
                  border rounded-lg p-4 text-center
                  ${prontoParaUso ? "border-emerald-500/30 bg-emerald-500/5" : "border-amber-500/30 bg-amber-500/5"}
                `}
              >
                {prontoParaUso ? (
                  <>
                    <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-emerald-600">SIM</p>
                    <p className="text-xs text-muted-foreground mt-1">Todas as validações atendidas</p>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-amber-600">NÃO</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {validacoesTotal - validacoesOk} validação(ões) pendente(s)
                    </p>
                  </>
                )}
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-[10px] text-muted-foreground">
                    {validacoesOk} de {validacoesTotal} verificações OK
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GOVERNANÇA */}
          <div className="bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center gap-2 text-amber-600">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-xs font-medium">Aviso de Governança</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Após homologação, a EAP de Custo torna-se a referência oficial para controle econômico. A Produção terá
              acesso apenas para execução — qualquer alteração estrutural ocorre via processo de governança (SME /
              Change Request).
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default function EstruturacaoCustoPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <EstruturacaoCustoContent />
      </Suspense>
    </div>
  )
}
