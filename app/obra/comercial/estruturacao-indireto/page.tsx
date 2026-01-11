"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  FileText,
  Send,
  CheckCircle2,
  Building2,
  Users,
  Shield,
  Briefcase,
  Wrench,
  Lock,
  FileSignature,
  Ruler,
  Calculator,
  Package,
  XCircle,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

// Dados mockados - Categorias de Indireto
const categoriasIndireto = [
  {
    codigo: "IND-001",
    categoria: "Administração da Obra",
    descricao: "Gestão administrativa e diretoria local",
    tipo: "Administrativo",
    status: "Ativo",
  },
  {
    codigo: "IND-002",
    categoria: "Engenharia e Planejamento",
    descricao: "Equipe técnica de engenharia e planejamento",
    tipo: "Gestão",
    status: "Ativo",
  },
  {
    codigo: "IND-003",
    categoria: "Segurança do Trabalho",
    descricao: "SESMT, EPIs, treinamentos obrigatórios",
    tipo: "Apoio",
    status: "Ativo",
  },
  {
    codigo: "IND-004",
    categoria: "Alojamento e Canteiro",
    descricao: "Manutenção de alojamentos e instalações",
    tipo: "Apoio",
    status: "Ativo",
  },
  {
    codigo: "IND-005",
    categoria: "TI e Comunicação",
    descricao: "Infraestrutura de TI, internet, telefonia",
    tipo: "Apoio",
    status: "Ativo",
  },
  {
    codigo: "IND-006",
    categoria: "Veículos Administrativos",
    descricao: "Frota administrativa, combustível, manutenção",
    tipo: "Administrativo",
    status: "Ativo",
  },
  {
    codigo: "IND-007",
    categoria: "Custos Gerais",
    descricao: "Despesas diversas não classificadas",
    tipo: "Outros",
    status: "Ativo",
  },
  {
    codigo: "IND-008",
    categoria: "Meio Ambiente",
    descricao: "Licenças, monitoramento, compensações",
    tipo: "Gestão",
    status: "Ativo",
  },
  {
    codigo: "IND-009",
    categoria: "Qualidade",
    descricao: "Laboratório, ensaios, certificações",
    tipo: "Gestão",
    status: "Pendente",
  },
  {
    codigo: "IND-010",
    categoria: "Jurídico e Compliance",
    descricao: "Assessoria jurídica, compliance, auditorias",
    tipo: "Administrativo",
    status: "Pendente",
  },
]

// Orçamento por categoria
const orcamentoIndireto = [
  { categoria: "IND-001", orcadoMensal: 180000, prazo: 18, total: 3240000 },
  { categoria: "IND-002", orcadoMensal: 120000, prazo: 18, total: 2160000 },
  { categoria: "IND-003", orcadoMensal: 45000, prazo: 18, total: 810000 },
  { categoria: "IND-004", orcadoMensal: 35000, prazo: 18, total: 630000 },
  { categoria: "IND-005", orcadoMensal: 15000, prazo: 18, total: 270000 },
  { categoria: "IND-006", orcadoMensal: 25000, prazo: 18, total: 450000 },
  { categoria: "IND-007", orcadoMensal: 20000, prazo: 18, total: 360000 },
  { categoria: "IND-008", orcadoMensal: 30000, prazo: 18, total: 540000 },
  { categoria: "IND-009", orcadoMensal: 18000, prazo: 18, total: 324000 },
  { categoria: "IND-010", orcadoMensal: 12000, prazo: 18, total: 216000 },
]

// Validações
const validacoes = [
  { item: "Todas as categorias definidas", status: true },
  { item: "Orçamento mensal atribuído", status: true },
  { item: "Prazo de execução definido", status: true },
  { item: "Responsáveis designados", status: false },
  { item: "Centros de custo criados", status: true },
]

function EstruturacaoIndiretoContent() {
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
  }

  const totalOrcado = orcamentoIndireto.reduce((acc, item) => acc + item.total, 0)
  const totalMensal = orcamentoIndireto.reduce((acc, item) => acc + item.orcadoMensal, 0)
  const categoriasAtivas = categoriasIndireto.filter((c) => c.status === "Ativo").length
  const categoriasPendentes = categoriasIndireto.filter((c) => c.status === "Pendente").length
  const prontoParaUso = validacoes.every((v) => v.status)

  const getIconByTipo = (tipo: string) => {
    switch (tipo) {
      case "Administrativo":
        return Briefcase
      case "Gestão":
        return Users
      case "Apoio":
        return Wrench
      default:
        return Building2
    }
  }

  return (
    <div className="h-full flex flex-col bg-background overflow-auto">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra/comercial/estruturacao-geral">
              <Button variant="ghost" size="sm" className="gap-1">
                <Building2 className="h-4 w-4" />
                Voltar
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Estruturação do Indireto</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  EST-05
                </Badge>
                <Badge className="bg-destructive/10 text-destructive text-[10px]">Não Iniciado</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Custos indiretos, DAG e órgãos de gestão da obra</p>
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
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Categorias</span>
              </div>
              <p className="text-2xl font-bold">{categoriasIndireto.length}</p>
              <p className="text-xs text-muted-foreground">
                {categoriasAtivas} ativas, {categoriasPendentes} pendentes
              </p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Orçado Mensal</span>
              </div>
              <p className="text-2xl font-bold tabular-nums">{formatCurrency(totalMensal)}</p>
              <p className="text-xs text-muted-foreground">custo mensal previsto</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Orçado Total</span>
              </div>
              <p className="text-2xl font-bold tabular-nums">{formatCurrency(totalOrcado)}</p>
              <p className="text-xs text-muted-foreground">18 meses de execução</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">% sobre Direto</span>
              </div>
              <p className="text-2xl font-bold">15%</p>
              <p className="text-xs text-muted-foreground">BDI de indireto</p>
            </div>
          </div>

          {/* BLOCO 1 - Categorias */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                1. Categorias de Custo Indireto
              </h2>
              <span className="text-xs text-muted-foreground">{categoriasIndireto.length} categorias definidas</span>
            </div>
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Código
                    </th>
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Categoria
                    </th>
                    <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Descrição
                    </th>
                    <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Tipo
                    </th>
                    <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categoriasIndireto.map((cat, index) => {
                    const Icon = getIconByTipo(cat.tipo)
                    return (
                      <tr
                        key={cat.codigo}
                        className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2.5 px-3 font-mono text-[11px]">{cat.codigo}</td>
                        <td className="py-2.5 px-3 font-medium text-foreground">{cat.categoria}</td>
                        <td className="py-2.5 px-3 text-muted-foreground">{cat.descricao}</td>
                        <td className="py-2.5 px-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{cat.tipo}</span>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {cat.status === "Ativo" ? (
                            <Badge className="bg-primary/10 text-primary text-[10px]">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Ativo
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
            {/* BLOCO 2 - Orçamento */}
            <div className="col-span-7">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                  2. Orçamento por Categoria
                </h2>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Categoria
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Orçado/Mês
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Prazo
                      </th>
                      <th className="text-right py-2 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orcamentoIndireto.map((orc, index) => {
                      const cat = categoriasIndireto.find((c) => c.codigo === orc.categoria)
                      return (
                        <tr
                          key={orc.categoria}
                          className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className="py-2 px-3 text-foreground">{cat?.categoria}</td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums">
                            {formatCurrency(orc.orcadoMensal)}
                          </td>
                          <td className="py-2 px-3 text-center text-muted-foreground">{orc.prazo} meses</td>
                          <td className="py-2 px-3 text-right font-mono tabular-nums font-medium">
                            {formatCurrency(orc.total)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50 border-t border-border">
                      <td className="py-2.5 px-3 font-semibold uppercase">Total Geral</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold">
                        {formatCurrency(totalMensal)}
                      </td>
                      <td className="py-2.5 px-3 text-center text-muted-foreground">18 meses</td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums font-bold">
                        {formatCurrency(totalOrcado)}
                      </td>
                    </tr>
                  </tfoot>
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
            <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground">Fechamento Mensal</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                Os custos indiretos são apropriados mensalmente durante o fechamento gerencial. Não geram avanço físico,
                mas impactam diretamente a margem e o resultado econômico da obra. A estrutura homologada define os
                limites orçamentários por categoria.
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default EstruturacaoIndiretoContent
