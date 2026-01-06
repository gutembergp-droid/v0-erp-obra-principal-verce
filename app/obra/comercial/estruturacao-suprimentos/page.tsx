"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  Send,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  Link2,
  Package,
  Users,
  Truck,
  Shield,
  Wrench,
  XCircle,
} from "lucide-react"
import Link from "next/link"

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
    codigo: "EQP-005",
    descricao: "Usina de Asfalto 80t/h",
    tipo: "Equipamento",
    categoria: "Pesados",
    unidade: "h",
    status: "Pendente",
  },
  {
    codigo: "MO-001",
    descricao: "Equipe de Armadores",
    tipo: "Mão de Obra",
    categoria: "Empreitada",
    unidade: "kg",
    status: "Vinculado",
  },
  {
    codigo: "MO-002",
    descricao: "Equipe de Carpinteiros",
    tipo: "Mão de Obra",
    categoria: "Empreitada",
    unidade: "m²",
    status: "Vinculado",
  },
  {
    codigo: "MO-003",
    descricao: "Operadores de Equipamentos",
    tipo: "Mão de Obra",
    categoria: "Hora-homem",
    unidade: "hh",
    status: "Vinculado",
  },
  {
    codigo: "SRV-001",
    descricao: "Terraplenagem Terceirizada",
    tipo: "Serviço",
    categoria: "Terraplenagem",
    unidade: "m³",
    status: "Vinculado",
  },
  {
    codigo: "SRV-002",
    descricao: "Sondagem SPT",
    tipo: "Serviço",
    categoria: "Sondagem",
    unidade: "m",
    status: "Vinculado",
  },
  {
    codigo: "SRV-003",
    descricao: "Levantamento Topográfico",
    tipo: "Serviço",
    categoria: "Topografia",
    unidade: "ha",
    status: "Vinculado",
  },
  {
    codigo: "SEG-001",
    descricao: "EPI - Kit Completo",
    tipo: "Segurança",
    categoria: "EPI",
    unidade: "kit",
    status: "Vinculado",
  },
  {
    codigo: "SEG-002",
    descricao: "Sinalização de Obra",
    tipo: "Segurança",
    categoria: "EPC",
    unidade: "vb",
    status: "Pendente",
  },
]

// Dados mockados - Vínculo com EAP de Custo
const vinculosEAP = [
  { servico: "1.1.1 Escavação e Carga", recursos: ["EQP-001", "MO-003", "SRV-001"], qtdRecursos: 3 },
  { servico: "1.1.2 Transporte de Material", recursos: ["EQP-002", "MO-003"], qtdRecursos: 2 },
  { servico: "1.1.3 Compactação", recursos: ["EQP-003", "MO-003"], qtdRecursos: 2 },
  { servico: "1.2.1 Base Granular", recursos: ["MAT-003", "EQP-003", "MO-003"], qtdRecursos: 3 },
  { servico: "1.2.2 Imprimação", recursos: ["MAT-005", "EQP-004"], qtdRecursos: 2 },
  { servico: "1.2.3 CBUQ - Binder", recursos: ["MAT-004", "EQP-004", "EQP-005"], qtdRecursos: 3 },
  { servico: "1.2.4 CBUQ - Capa", recursos: ["MAT-004", "EQP-004"], qtdRecursos: 2 },
  { servico: "1.4.1 Ponte Km 12", recursos: ["MAT-001", "MAT-002", "MO-001", "MO-002"], qtdRecursos: 4 },
]

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
  { item: "Todos os recursos classificados por tipo", status: true },
  { item: "Todos os recursos possuem categoria definida", status: true },
  { item: "Todos os recursos vinculados a serviços da EAP", status: false },
  { item: "Parâmetros de contratação definidos por tipo", status: true },
  { item: "Critérios de medição estabelecidos", status: true },
  { item: "Critérios de aceite definidos", status: true },
  { item: "Indicadores de controle configurados", status: true },
  { item: "Unidades de medida padronizadas", status: true },
]

const getTipoIcon = (tipo: string) => {
  switch (tipo) {
    case "Material":
      return <Package className="h-3.5 w-3.5" />
    case "Equipamento":
      return <Truck className="h-3.5 w-3.5" />
    case "Mão de Obra":
      return <Users className="h-3.5 w-3.5" />
    case "Serviço":
      return <Wrench className="h-3.5 w-3.5" />
    case "Segurança":
      return <Shield className="h-3.5 w-3.5" />
    default:
      return <Package className="h-3.5 w-3.5" />
  }
}

const getTipoBadgeColor = (tipo: string) => {
  switch (tipo) {
    case "Material":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    case "Equipamento":
      return "bg-amber-500/10 text-amber-600 dark:text-amber-400"
    case "Mão de Obra":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400"
    case "Serviço":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
    case "Segurança":
      return "bg-red-500/10 text-red-600 dark:text-red-400"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function EstruturacaoSuprimentosPage() {
  const recursosPendentes = recursos.filter((r) => r.status === "Pendente").length
  const recursosVinculados = recursos.filter((r) => r.status === "Vinculado").length
  const validacoesOk = validacoes.filter((v) => v.status).length
  const prontoParaUso = validacoesOk === validacoes.length

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex-none border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/obra/comercial/estruturacao-geral">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Voltar
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-semibold">Estruturação de Suprimentos</h1>
                  <Badge variant="outline" className="font-mono text-xs">
                    EST-04
                  </Badge>
                  <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs">Em estruturação</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">Arquitetura de recursos da obra</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Send className="h-4 w-4" />
                Enviar para Revisão
              </Button>
              <Button size="sm" className="gap-2" disabled={!prontoParaUso}>
                <CheckCircle2 className="h-4 w-4" />
                Homologar
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Bloco 1 - Classificação de Recursos */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-2.5 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    1. Classificação de Recursos
                  </h2>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-muted-foreground">{recursos.length} recursos</span>
                    <span className="text-emerald-600">{recursosVinculados} vinculados</span>
                    {recursosPendentes > 0 && <span className="text-amber-600">{recursosPendentes} pendentes</span>}
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Código
                      </th>
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Descrição
                      </th>
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Tipo
                      </th>
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Categoria
                      </th>
                      <th className="text-center py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Unidade
                      </th>
                      <th className="text-center py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recursos.map((recurso, idx) => (
                      <tr
                        key={recurso.codigo}
                        className={`border-b border-border/50 hover:bg-muted/30 ${idx % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
                      >
                        <td className="py-2 px-4 font-mono text-xs">{recurso.codigo}</td>
                        <td className="py-2 px-4">{recurso.descricao}</td>
                        <td className="py-2 px-4">
                          <Badge variant="secondary" className={`gap-1 text-xs ${getTipoBadgeColor(recurso.tipo)}`}>
                            {getTipoIcon(recurso.tipo)}
                            {recurso.tipo}
                          </Badge>
                        </td>
                        <td className="py-2 px-4 text-muted-foreground">{recurso.categoria}</td>
                        <td className="py-2 px-4 text-center font-mono text-xs">{recurso.unidade}</td>
                        <td className="py-2 px-4 text-center">
                          {recurso.status === "Vinculado" ? (
                            <Badge
                              variant="secondary"
                              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs gap-1"
                            >
                              <Link2 className="h-3 w-3" />
                              Vinculado
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs"
                            >
                              Pendente
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bloco 2 - Vínculo com EAP de Custo */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-2.5 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    2. Vínculo com EAP de Custo (Serviços)
                  </h2>
                  <Link href="/obra/comercial/estruturacao-custo">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs h-7">
                      <FileText className="h-3.5 w-3.5" />
                      Ver EST-03
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-12 gap-4">
                  {/* Tabela de Vínculos */}
                  <div className="col-span-8">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-2 px-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                            Serviço (EAP)
                          </th>
                          <th className="text-left py-2 px-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                            Recursos Vinculados
                          </th>
                          <th className="text-center py-2 px-3 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                            Qtd
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {vinculosEAP.map((vinculo, idx) => (
                          <tr key={idx} className="border-b border-border/50 hover:bg-muted/30">
                            <td className="py-2 px-3 font-medium">{vinculo.servico}</td>
                            <td className="py-2 px-3">
                              <div className="flex flex-wrap gap-1">
                                {vinculo.recursos.map((r) => (
                                  <Badge key={r} variant="outline" className="text-xs font-mono">
                                    {r}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-2 px-3 text-center font-mono">{vinculo.qtdRecursos}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Resumo */}
                  <div className="col-span-4 space-y-3">
                    <div className="border border-border rounded-lg p-3 bg-muted/20">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Resumo de Rastreabilidade
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total de recursos</span>
                          <span className="font-mono font-medium">{recursos.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Vinculados a serviços</span>
                          <span className="font-mono font-medium text-emerald-600">{recursosVinculados}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Sem vínculo</span>
                          <span className="font-mono font-medium text-amber-600">{recursosPendentes}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-border">
                          <span className="text-muted-foreground">Cobertura</span>
                          <span className="font-mono font-medium">
                            {((recursosVinculados / recursos.length) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {recursosPendentes > 0 && (
                      <div className="border border-amber-500/30 rounded-lg p-3 bg-amber-500/5">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                          <div>
                            <p className="text-xs font-medium text-amber-600">Recursos sem vínculo</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {recursosPendentes} recurso(s) não vinculado(s) a serviços da EAP
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bloco 3 - Parâmetros de Suprimentos */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/30 px-4 py-2.5 border-b border-border">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  3. Parâmetros de Suprimentos
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Tipo de Recurso
                      </th>
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Contratação
                      </th>
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Medição
                      </th>
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Aceite
                      </th>
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Frequência
                      </th>
                      <th className="text-left py-2.5 px-4 font-medium text-xs uppercase tracking-wider text-muted-foreground">
                        Indicadores
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {parametros.map((param, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-border/50 hover:bg-muted/30 ${idx % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
                      >
                        <td className="py-2.5 px-4">
                          <Badge variant="secondary" className={`gap-1 text-xs ${getTipoBadgeColor(param.tipo)}`}>
                            {getTipoIcon(param.tipo)}
                            {param.tipo}
                          </Badge>
                        </td>
                        <td className="py-2.5 px-4">{param.contratacao}</td>
                        <td className="py-2.5 px-4">{param.medicao}</td>
                        <td className="py-2.5 px-4">{param.aceite}</td>
                        <td className="py-2.5 px-4">{param.frequencia}</td>
                        <td className="py-2.5 px-4 text-muted-foreground text-xs">{param.indicadores}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grid: Validações + Governança */}
            <div className="grid grid-cols-12 gap-4">
              {/* Bloco 4 - Validações */}
              <div className="col-span-8 border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2.5 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      4. Validações da Estrutura de Suprimentos
                    </h2>
                    <span className="text-xs text-muted-foreground">
                      {validacoesOk}/{validacoes.length} ok
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {validacoes.map((val, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-1.5">
                        {val.status ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm ${val.status ? "" : "text-muted-foreground"}`}>{val.item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Estrutura de suprimentos pronta para execução?</span>
                      {prontoParaUso ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">Sim</Badge>
                      ) : (
                        <Badge className="bg-red-500/10 text-red-600 dark:text-red-400">Não</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloco 5 - Governança */}
              <div className="col-span-4 border border-border rounded-lg overflow-hidden">
                <div className="bg-muted/30 px-4 py-2.5 border-b border-border">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    5. Governança
                  </h2>
                </div>
                <div className="p-4 space-y-4">
                  <div className="border border-amber-500/30 rounded-lg p-3 bg-amber-500/5">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        Após homologação, suprimentos apenas executa dentro da estrutura definida. Alterações requerem
                        revisão formal.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full gap-2 bg-transparent" size="sm">
                      <Send className="h-4 w-4" />
                      Enviar para Revisão
                    </Button>
                    <Button className="w-full gap-2" size="sm" disabled={!prontoParaUso}>
                      <CheckCircle2 className="h-4 w-4" />
                      Homologar Estrutura
                    </Button>
                  </div>

                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <strong>Última revisão:</strong> —<br />
                      <strong>Homologado em:</strong> —<br />
                      <strong>Responsável:</strong> —
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  )
}
