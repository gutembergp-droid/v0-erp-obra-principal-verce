"use client"

import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  Send,
  CheckCircle2,
  AlertTriangle,
  Link2,
  Package,
  Users,
  Truck,
  Shield,
  Wrench,
  XCircle,
  FileSignature,
  Ruler,
  Calculator,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados - Classificação de Recursos
const recursos = [
  {
    codigo: "MAT-001",
    descricao: "Concreto Usinado FCK 30",
    tipo: "Material",
    categoria: "Concreto",
    unidade: "m³",
    status: "Vinculado",
  },
  {
    codigo: "MAT-002",
    descricao: "Aço CA-50 Ø 10mm",
    tipo: "Material",
    categoria: "Aço",
    unidade: "kg",
    status: "Vinculado",
  },
  {
    codigo: "MAT-003",
    descricao: "Brita 1",
    tipo: "Material",
    categoria: "Agregados",
    unidade: "m³",
    status: "Vinculado",
  },
  {
    codigo: "MAT-004",
    descricao: "CBUQ - Faixa C",
    tipo: "Material",
    categoria: "Asfalto",
    unidade: "t",
    status: "Vinculado",
  },
  {
    codigo: "MAT-005",
    descricao: "Emulsão RR-2C",
    tipo: "Material",
    categoria: "Asfalto",
    unidade: "l",
    status: "Vinculado",
  },
  {
    codigo: "MAT-006",
    descricao: "Forma Metálica",
    tipo: "Material",
    categoria: "Carpintaria",
    unidade: "m²",
    status: "Pendente",
  },
  {
    codigo: "EQP-001",
    descricao: "Escavadeira Hidráulica 320",
    tipo: "Equipamento",
    categoria: "Pesados",
    unidade: "h",
    status: "Vinculado",
  },
  {
    codigo: "EQP-002",
    descricao: "Caminhão Basculante 14m³",
    tipo: "Equipamento",
    categoria: "Transporte",
    unidade: "h",
    status: "Vinculado",
  },
  {
    codigo: "EQP-003",
    descricao: "Rolo Compactador Liso",
    tipo: "Equipamento",
    categoria: "Pesados",
    unidade: "h",
    status: "Vinculado",
  },
  {
    codigo: "EQP-004",
    descricao: "Vibroacabadora de Asfalto",
    tipo: "Equipamento",
    categoria: "Pesados",
    unidade: "h",
    status: "Vinculado",
  },
  {
    codigo: "MO-001",
    descricao: "Operador de Escavadeira",
    tipo: "Mão de Obra",
    categoria: "Operação",
    unidade: "h",
    status: "Vinculado",
  },
  {
    codigo: "MO-002",
    descricao: "Encarregado de Terraplenagem",
    tipo: "Mão de Obra",
    categoria: "Supervisão",
    unidade: "h",
    status: "Vinculado",
  },
  {
    codigo: "MO-003",
    descricao: "Servente de Obras",
    tipo: "Mão de Obra",
    categoria: "Apoio",
    unidade: "h",
    status: "Vinculado",
  },
  {
    codigo: "MO-004",
    descricao: "Armador de Ferragem",
    tipo: "Mão de Obra",
    categoria: "Especializado",
    unidade: "h",
    status: "Pendente",
  },
]

// Dados mockados - Fornecedores Homologados
const fornecedoresHomologados = [
  { nome: "Concreteira XYZ", categoria: "Concreto", status: "Homologado", validade: "2026-06-30" },
  { nome: "Gerdau Aços", categoria: "Aço", status: "Homologado", validade: "2026-12-31" },
  { nome: "Pedreira ABC", categoria: "Agregados", status: "Homologado", validade: "2026-08-15" },
  { nome: "Usina Asfalto SC", categoria: "Asfalto", status: "Homologado", validade: "2026-09-30" },
  { nome: "Locadora Pesados", categoria: "Equipamentos", status: "Homologado", validade: "2026-07-31" },
  { nome: "Empreiteira Regional", categoria: "Mão de Obra", status: "Em Análise", validade: "-" },
]

// Dados mockados - Vínculo com EAP de Custo
const vinculacaoEAP = {
  itensVinculados: 11,
  itensSemVinculo: 3,
  totalItens: 14,
}

// Dados mockados - Parâmetros de Suprimentos
const parametros = [
  {
    tipo: "Material",
    contratacao: "Compra Direta",
    medicao: "Nota Fiscal",
    aceite: "Conferência física",
    frequencia: "Por demanda",
    indicadores: "Prazo entrega, Qualidade",
  },
  {
    tipo: "Equipamento",
    contratacao: "Locação",
    medicao: "Horímetro",
    aceite: "Relatório diário",
    frequencia: "Mensal",
    indicadores: "Disponibilidade, Custo/hora",
  },
  {
    tipo: "Mão de Obra",
    contratacao: "Contrato",
    medicao: "Produção",
    aceite: "Medição física",
    frequencia: "Quinzenal",
    indicadores: "Produtividade, Qualidade",
  },
  {
    tipo: "Serviço",
    contratacao: "Contrato",
    medicao: "Boletim",
    aceite: "Laudo técnico",
    frequencia: "Por etapa",
    indicadores: "Prazo, Conformidade",
  },
  {
    tipo: "Segurança",
    contratacao: "Compra Direta",
    medicao: "Nota Fiscal",
    aceite: "Conferência",
    frequencia: "Por demanda",
    indicadores: "Estoque mínimo",
  },
]

// Validações
const validacoes = [
  { item: "Todos os recursos classificados", status: true },
  { item: "Recursos vinculados à EAP de Custo", status: false },
  { item: "Fornecedores homologados por categoria", status: false },
  { item: "Unidades de medida padronizadas", status: true },
  { item: "Códigos únicos atribuídos", status: true },
]

const getIconByType = (tipo: string) => {
  switch (tipo) {
    case "Material":
      return Package
    case "Equipamento":
      return Truck
    case "Mão de Obra":
      return Users
    default:
      return Wrench
  }
}

const EstruturacaoSuprimentosContent = () => {
  const router = useRouter()
  const pathname = usePathname()

  const navegacaoSetor = [
    { codigo: "EST-00", nome: "Visao Geral", rota: "/obra/comercial/estruturacao-geral", icon: FileText },
    { codigo: "EST-01", nome: "Contrato", rota: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
    { codigo: "EST-02", nome: "Medicao", rota: "/obra/comercial/estruturacao-medicao", icon: Ruler },
    { codigo: "EST-03", nome: "Custo", rota: "/obra/comercial/estruturacao-custo", icon: Calculator },
    { codigo: "EST-04", nome: "Suprimentos", rota: "/obra/comercial/estruturacao-suprimentos", icon: Package },
    { codigo: "EST-05", nome: "Indireto", rota: "/obra/comercial/estruturacao-indireto", icon: Building2 },
  ]

  const materiais = recursos.filter((r) => r.tipo === "Material")
  const equipamentos = recursos.filter((r) => r.tipo === "Equipamento")
  const maoDeObra = recursos.filter((r) => r.tipo === "Mão de Obra")
  const vinculados = recursos.filter((r) => r.status === "Vinculado").length
  const pendentes = recursos.filter((r) => r.status === "Pendente").length

  const prontoParaUso = validacoes.every((v) => v.status)

  return (
    <div className="h-full flex flex-col bg-background overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra/comercial/estruturacao-geral">
              <Button variant="ghost" size="sm" className="gap-1">
                <Package className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Estruturação de Suprimentos</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-04
                </Badge>
                <Badge className="bg-accent-foreground/10 text-accent-foreground text-[10px]">Em Estruturação</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Recursos, fornecedores e vínculos com EAP</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs bg-transparent">
              <Send className="h-3.5 w-3.5" />
              Enviar para Revisão
            </Button>
            <Button size="sm" className="gap-1.5 text-xs" disabled={!prontoParaUso}>
              <Shield className="h-3.5 w-3.5" />
              Homologar Estrutura
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

          {/* Resumo */}
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Materiais</span>
              </div>
              <p className="text-2xl font-bold">{materiais.length}</p>
              <p className="text-xs text-muted-foreground">itens cadastrados</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Equipamentos</span>
              </div>
              <p className="text-2xl font-bold">{equipamentos.length}</p>
              <p className="text-xs text-muted-foreground">itens cadastrados</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Mão de Obra</span>
              </div>
              <p className="text-2xl font-bold">{maoDeObra.length}</p>
              <p className="text-xs text-muted-foreground">funções cadastradas</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Link2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Vinculação</span>
              </div>
              <p className="text-2xl font-bold">
                {vinculados}/{recursos.length}
              </p>
              <p className="text-xs text-muted-foreground">vinculados à EAP</p>
            </div>
          </div>

          {/* BLOCO 1 - Recursos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                1. Classificação de Recursos (COMPOR 90)
              </h2>
              <span className="text-xs text-muted-foreground">
                {vinculados} vinculados | {pendentes} pendentes
              </span>
            </div>
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Código
                    </th>
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Descrição
                    </th>
                    <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Tipo
                    </th>
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Categoria
                    </th>
                    <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Unidade
                    </th>
                    <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recursos.map((recurso, index) => {
                    const Icon = getIconByType(recurso.tipo)
                    return (
                      <tr
                        key={recurso.codigo}
                        className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2.5 px-3 font-mono text-[11px]">{recurso.codigo}</td>
                        <td className="py-2.5 px-3 text-foreground">{recurso.descricao}</td>
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{recurso.tipo}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">{recurso.categoria}</td>
                        <td className="py-2.5 px-3 text-center font-mono text-muted-foreground">{recurso.unidade}</td>
                        <td className="py-2.5 px-3 text-center">
                          {recurso.status === "Vinculado" ? (
                            <Badge className="bg-primary/10 text-primary text-[10px]">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Vinculado
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-500/10 text-amber-600 text-[10px]">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Grid 2 colunas */}
          <div className="grid grid-cols-12 gap-6">
            {/* BLOCO 2 - Fornecedores */}
            <div className="col-span-7">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  2. Fornecedores Homologados
                </h2>
                <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                  + Adicionar Fornecedor
                </Button>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Fornecedor
                      </th>
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Categoria
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Status
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Validade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fornecedoresHomologados.map((fornecedor, index) => (
                      <tr
                        key={fornecedor.nome}
                        className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2 px-3 font-medium">{fornecedor.nome}</td>
                        <td className="py-2 px-3 text-muted-foreground">{fornecedor.categoria}</td>
                        <td className="py-2 px-3 text-center">
                          {fornecedor.status === "Homologado" ? (
                            <Badge className="bg-primary/10 text-primary text-[10px]">Homologado</Badge>
                          ) : (
                            <Badge className="bg-amber-500/10 text-amber-600 text-[10px]">Em Análise</Badge>
                          )}
                        </td>
                        <td className="py-2 px-3 text-center font-mono text-muted-foreground">{fornecedor.validade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* BLOCO 3 - Validações */}
            <div className="col-span-5">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">3. Validações</h2>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    {validacoes.map((val, index) => (
                      <tr
                        key={val.item}
                        className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2.5 px-3 w-6">
                          {val.status ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">{val.item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Indicador de prontidão */}
              <div
                className={`mt-3 p-3 rounded border ${prontoParaUso ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Estrutura pronta para uso?</span>
                  <Badge
                    variant={prontoParaUso ? "default" : "secondary"}
                    className={`text-[10px] ${prontoParaUso ? "bg-emerald-500" : "bg-amber-500"}`}
                  >
                    {prontoParaUso ? "SIM" : "NÃO"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso de governança */}
          <div className="flex items-start gap-3 p-4 bg-muted/30 border border-border rounded-md">
            <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Governança de Suprimentos</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Após homologação, a estrutura de suprimentos será a base para pedidos de compra e contratos. Qualquer
                compra de item fora da estrutura gerará ALERTA CRÍTICO e exigirá aprovação do Gerente de Contrato.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default function EstruturacaoSuprimentosPage() {
  return (
    <div>
      <Suspense fallback={null}>
        <EstruturacaoSuprimentosContent />
      </Suspense>
    </div>
  )
}
