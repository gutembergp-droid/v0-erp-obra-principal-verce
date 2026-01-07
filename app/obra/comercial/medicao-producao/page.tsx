"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, ChevronRight, Save, Send, Lock, AlertTriangle, FileText, Info } from "lucide-react"

// ========================================
// DADOS MOCKADOS - EAP HIERARQUICA
// ========================================
const eapData = [
  {
    codigo: "1",
    descricao: "TERRAPLENAGEM",
    unidade: "-",
    qtdPrevista: null,
    qtdExecutada: null,
    percentual: 45.2,
    status: "em_execucao",
    nivel: 0,
    filhos: [
      {
        codigo: "1.1",
        descricao: "Escavação e Carga",
        unidade: "m³",
        qtdPrevista: 850000,
        qtdExecutada: 384250,
        percentual: 45.2,
        status: "em_execucao",
        nivel: 1,
      },
      {
        codigo: "1.2",
        descricao: "Transporte de Material",
        unidade: "m³.km",
        qtdPrevista: 4250000,
        qtdExecutada: 1912500,
        percentual: 45.0,
        status: "em_execucao",
        nivel: 1,
      },
      {
        codigo: "1.3",
        descricao: "Compactação de Aterro",
        unidade: "m³",
        qtdPrevista: 620000,
        qtdExecutada: 285200,
        percentual: 46.0,
        status: "em_execucao",
        nivel: 1,
      },
    ],
  },
  {
    codigo: "2",
    descricao: "PAVIMENTAÇÃO",
    unidade: "-",
    qtdPrevista: null,
    qtdExecutada: null,
    percentual: 22.8,
    status: "em_execucao",
    nivel: 0,
    filhos: [
      {
        codigo: "2.1",
        descricao: "Base Granular",
        unidade: "m³",
        qtdPrevista: 125000,
        qtdExecutada: 28500,
        percentual: 22.8,
        status: "em_execucao",
        nivel: 1,
      },
      {
        codigo: "2.2",
        descricao: "Imprimação",
        unidade: "m²",
        qtdPrevista: 480000,
        qtdExecutada: 112000,
        percentual: 23.3,
        status: "em_execucao",
        nivel: 1,
      },
      {
        codigo: "2.3",
        descricao: "CBUQ - Binder",
        unidade: "ton",
        qtdPrevista: 52000,
        qtdExecutada: 11440,
        percentual: 22.0,
        status: "em_execucao",
        nivel: 1,
      },
      {
        codigo: "2.4",
        descricao: "CBUQ - Capa",
        unidade: "ton",
        qtdPrevista: 33000,
        qtdExecutada: 0,
        percentual: 0,
        status: "nao_iniciado",
        nivel: 1,
      },
    ],
  },
  {
    codigo: "3",
    descricao: "DRENAGEM",
    unidade: "-",
    qtdPrevista: null,
    qtdExecutada: null,
    percentual: 38.5,
    status: "em_execucao",
    nivel: 0,
    filhos: [
      {
        codigo: "3.1",
        descricao: "Bueiros BSTC",
        unidade: "m",
        qtdPrevista: 2400,
        qtdExecutada: 924,
        percentual: 38.5,
        status: "em_execucao",
        nivel: 1,
      },
      {
        codigo: "3.2",
        descricao: "Sarjetas",
        unidade: "m",
        qtdPrevista: 18000,
        qtdExecutada: 7200,
        percentual: 40.0,
        status: "em_execucao",
        nivel: 1,
      },
      {
        codigo: "3.3",
        descricao: "Meio-fio",
        unidade: "m",
        qtdPrevista: 24000,
        qtdExecutada: 8640,
        percentual: 36.0,
        status: "em_execucao",
        nivel: 1,
      },
    ],
  },
  {
    codigo: "4",
    descricao: "OBRAS DE ARTE ESPECIAIS",
    unidade: "-",
    qtdPrevista: null,
    qtdExecutada: null,
    percentual: 15.0,
    status: "em_execucao",
    nivel: 0,
    filhos: [
      {
        codigo: "4.1",
        descricao: "Ponte Km 12 - Fundação",
        unidade: "un",
        qtdPrevista: 1,
        qtdExecutada: 0.6,
        percentual: 60.0,
        status: "em_execucao",
        nivel: 1,
      },
      {
        codigo: "4.2",
        descricao: "Ponte Km 12 - Estrutura",
        unidade: "un",
        qtdPrevista: 1,
        qtdExecutada: 0,
        percentual: 0,
        status: "nao_iniciado",
        nivel: 1,
      },
    ],
  },
]

// ========================================
// DADOS MOCKADOS - REGISTRO DE MEDICAO
// ========================================
const registroMedicao = [
  {
    codigo: "1.1",
    servico: "Escavação e Carga",
    qtdPeriodo: 45000,
    acumAnterior: 339250,
    acumAtual: 384250,
    observacoes: "",
  },
  {
    codigo: "1.2",
    servico: "Transporte de Material",
    qtdPeriodo: 225000,
    acumAnterior: 1687500,
    acumAtual: 1912500,
    observacoes: "",
  },
  {
    codigo: "1.3",
    servico: "Compactação de Aterro",
    qtdPeriodo: 32000,
    acumAnterior: 253200,
    acumAtual: 285200,
    observacoes: "",
  },
  { codigo: "2.1", servico: "Base Granular", qtdPeriodo: 8500, acumAnterior: 20000, acumAtual: 28500, observacoes: "" },
  { codigo: "2.2", servico: "Imprimação", qtdPeriodo: 32000, acumAnterior: 80000, acumAtual: 112000, observacoes: "" },
  { codigo: "2.3", servico: "CBUQ - Binder", qtdPeriodo: 3440, acumAnterior: 8000, acumAtual: 11440, observacoes: "" },
  { codigo: "3.1", servico: "Bueiros BSTC", qtdPeriodo: 124, acumAnterior: 800, acumAtual: 924, observacoes: "" },
  { codigo: "3.2", servico: "Sarjetas", qtdPeriodo: 1200, acumAnterior: 6000, acumAtual: 7200, observacoes: "" },
]

// ========================================
// DADOS MOCKADOS - COMPARATIVO
// ========================================
const comparativo = {
  servicosExecutados: 8,
  servicosRemuneraveis: 6,
  servicosNaoRemunerados: 2,
  valorExecutado: 4250000,
  valorRemuneravel: 3825000,
  valorNaoRemunerado: 425000,
  impactoPercentual: 10.0,
}

// ========================================
// DADOS MOCKADOS - DESVIOS
// ========================================
const desvios = [
  { servico: "Escavação e Carga", tipo: "Excesso", impacto: "R$ 180.000", situacao: "em_analise" },
  { servico: "Transporte de Material", tipo: "Não Remunerado", impacto: "R$ 245.000", situacao: "justificado" },
  { servico: "Base Granular", tipo: "Ajuste", impacto: "R$ 52.000", situacao: "pendente" },
  { servico: "CBUQ - Binder", tipo: "Não Remunerado", impacto: "R$ 128.000", situacao: "em_analise" },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(value)
}

export default function MedicaoProducaoPage() {
  const [competencia, setCompetencia] = useState("01/2026")
  const [statusMedicao, setStatusMedicao] = useState<"rascunho" | "revisao" | "fechada">("rascunho")
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["1", "2", "3", "4"])

  const toggleGroup = (codigo: string) => {
    setExpandedGroups((prev) => (prev.includes(codigo) ? prev.filter((c) => c !== codigo) : [...prev, codigo]))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "em_execucao":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Em Execução</Badge>
      case "nao_iniciado":
        return (
          <Badge variant="outline" className="text-muted-foreground">
            Não Iniciado
          </Badge>
        )
      case "concluido":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Concluído</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const getDesvioSituacao = (situacao: string) => {
    switch (situacao) {
      case "em_analise":
        return <Badge className="bg-accent text-accent-foreground">Em Análise</Badge>
      case "justificado":
        return <Badge className="bg-primary/20 text-primary">Justificado</Badge>
      case "pendente":
        return <Badge variant="destructive">Pendente</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* ========================================
            HEADER
        ======================================== */}
        <div className="border-b bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl font-semibold">Medição de Produção</h1>
                  <Badge className="bg-primary/10 text-primary border-primary/20">RM-02</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">Avanço físico baseado na EAP</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase">Competência</span>
                <Select value={competencia} onValueChange={setCompetencia}>
                  <SelectTrigger className="w-32 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01/2026">01/2026</SelectItem>
                    <SelectItem value="12/2025">12/2025</SelectItem>
                    <SelectItem value="11/2025">11/2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground uppercase">Status</span>
                {statusMedicao === "rascunho" && <Badge variant="outline">Rascunho</Badge>}
                {statusMedicao === "revisao" && <Badge className="bg-accent text-accent-foreground">Em Revisão</Badge>}
                {statusMedicao === "fechada" && <Badge className="bg-primary/20 text-primary">Fechada</Badge>}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================
            CONTEUDO PRINCIPAL
        ======================================== */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* ========================================
                BLOCO 1 - VISUALIZAÇÃO DA EAP
            ======================================== */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Visualização da EAP
                </h2>
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-10"></TableHead>
                      <TableHead className="w-24">CÓDIGO</TableHead>
                      <TableHead>SERVIÇO / ATIVIDADE</TableHead>
                      <TableHead className="text-center w-20">UN</TableHead>
                      <TableHead className="text-right w-28">QTD PREVISTA</TableHead>
                      <TableHead className="text-right w-28">QTD EXECUTADA</TableHead>
                      <TableHead className="text-right w-20">% EXEC</TableHead>
                      <TableHead className="text-center w-28">STATUS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eapData.map((grupo) => (
                      <>
                        {/* Linha do Grupo */}
                        <TableRow
                          key={grupo.codigo}
                          className="bg-muted/30 cursor-pointer hover:bg-muted/50"
                          onClick={() => toggleGroup(grupo.codigo)}
                        >
                          <TableCell className="py-2">
                            {expandedGroups.includes(grupo.codigo) ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </TableCell>
                          <TableCell className="font-mono font-semibold py-2">{grupo.codigo}</TableCell>
                          <TableCell className="font-semibold py-2">{grupo.descricao}</TableCell>
                          <TableCell className="text-center py-2">-</TableCell>
                          <TableCell className="text-right py-2">-</TableCell>
                          <TableCell className="text-right py-2">-</TableCell>
                          <TableCell className="text-right font-mono font-semibold py-2">
                            {grupo.percentual.toFixed(1)}%
                          </TableCell>
                          <TableCell className="text-center py-2">{getStatusBadge(grupo.status)}</TableCell>
                        </TableRow>
                        {/* Linhas dos Filhos */}
                        {expandedGroups.includes(grupo.codigo) &&
                          grupo.filhos?.map((filho) => (
                            <TableRow key={filho.codigo} className="hover:bg-muted/20">
                              <TableCell className="py-1.5"></TableCell>
                              <TableCell className="font-mono text-sm py-1.5 pl-6">{filho.codigo}</TableCell>
                              <TableCell className="text-sm py-1.5">{filho.descricao}</TableCell>
                              <TableCell className="text-center py-1.5">
                                <Badge variant="outline" className="text-xs">
                                  {filho.unidade}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm py-1.5 tabular-nums">
                                {filho.qtdPrevista ? formatNumber(filho.qtdPrevista) : "-"}
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm py-1.5 tabular-nums">
                                {filho.qtdExecutada ? formatNumber(filho.qtdExecutada) : "-"}
                              </TableCell>
                              <TableCell className="text-right font-mono text-sm py-1.5 tabular-nums">
                                {filho.percentual.toFixed(1)}%
                              </TableCell>
                              <TableCell className="text-center py-1.5">{getStatusBadge(filho.status)}</TableCell>
                            </TableRow>
                          ))}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* ========================================
                BLOCO 2 - REGISTRO DA MEDICAO DE PRODUCAO
            ======================================== */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Registro da Medição de Produção
                </h2>
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                A medição aqui NÃO valida remuneração. Ela apenas registra execução física.
              </p>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-24">CÓDIGO</TableHead>
                      <TableHead>SERVIÇO</TableHead>
                      <TableHead className="text-right w-28">QTD PERÍODO</TableHead>
                      <TableHead className="text-right w-28">ACUM. ANTERIOR</TableHead>
                      <TableHead className="text-right w-28">ACUM. ATUAL</TableHead>
                      <TableHead className="w-48">OBSERVAÇÕES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registroMedicao.map((item) => (
                      <TableRow key={item.codigo} className="hover:bg-muted/20">
                        <TableCell className="font-mono text-sm py-2">{item.codigo}</TableCell>
                        <TableCell className="text-sm py-2">{item.servico}</TableCell>
                        <TableCell className="text-right py-2">
                          <Input
                            type="text"
                            defaultValue={formatNumber(item.qtdPeriodo)}
                            className="h-7 text-right font-mono text-sm w-24 ml-auto"
                            disabled={statusMedicao === "fechada"}
                          />
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm py-2 text-muted-foreground tabular-nums">
                          {formatNumber(item.acumAnterior)}
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm py-2 font-semibold tabular-nums">
                          {formatNumber(item.acumAtual)}
                        </TableCell>
                        <TableCell className="py-2">
                          <Input
                            type="text"
                            placeholder="..."
                            className="h-7 text-sm"
                            disabled={statusMedicao === "fechada"}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* ========================================
                BLOCO 3 - COMPARATIVO EXECUÇÃO × REMUNERAÇÃO
            ======================================== */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Comparativo Execução × Remuneração
                </h2>
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-accent-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-accent-foreground">
                    Nem todo serviço executado será remunerado pelo cliente. A diferença impacta o desempenho e deve ser
                    analisada.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="border border-border rounded-lg p-4 bg-card">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Serviços Executados</p>
                  <p className="text-2xl font-semibold tabular-nums">{comparativo.servicosExecutados}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatCurrency(comparativo.valorExecutado)}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Serviços Remuneráveis</p>
                  <p className="text-2xl font-semibold tabular-nums text-primary">{comparativo.servicosRemuneraveis}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatCurrency(comparativo.valorRemuneravel)}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Não Remunerados</p>
                  <p className="text-2xl font-semibold tabular-nums text-accent-foreground">
                    {comparativo.servicosNaoRemunerados}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{formatCurrency(comparativo.valorNaoRemunerado)}</p>
                </div>
                <div className="border border-border rounded-lg p-4 bg-card">
                  <p className="text-xs text-muted-foreground uppercase mb-1">Impacto no Desempenho</p>
                  <p className="text-2xl font-semibold tabular-nums text-destructive">
                    -{comparativo.impactoPercentual}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">valor não recuperado</p>
                </div>
              </div>
            </div>

            {/* ========================================
                BLOCO 4 - ANÁLISE DE DESVIOS
            ======================================== */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Análise de Desvios
                </h2>
                <Info className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>SERVIÇO</TableHead>
                      <TableHead className="w-32">TIPO DE DESVIO</TableHead>
                      <TableHead className="text-right w-28">IMPACTO</TableHead>
                      <TableHead className="text-center w-28">SITUAÇÃO</TableHead>
                      <TableHead className="w-32"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {desvios.map((desvio, idx) => (
                      <TableRow key={idx} className="hover:bg-muted/20">
                        <TableCell className="text-sm py-2">{desvio.servico}</TableCell>
                        <TableCell className="py-2">
                          <Badge variant="outline" className="text-xs">
                            {desvio.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm py-2 text-red-500 tabular-nums">
                          {desvio.impacto}
                        </TableCell>
                        <TableCell className="text-center py-2">{getDesvioSituacao(desvio.situacao)}</TableCell>
                        <TableCell className="py-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                            <FileText className="w-3 h-3 mr-1" />
                            Analisar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* ========================================
                BLOCO FINAL - GOVERNANÇA DA MEDIÇÃO
            ======================================== */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="w-4 h-4" />
                  <span>Após fechada, a medição de produção não pode ser alterada.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" disabled={statusMedicao === "fechada"}>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Medição
                  </Button>
                  <Button
                    variant="outline"
                    disabled={statusMedicao === "fechada"}
                    onClick={() => setStatusMedicao("revisao")}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Enviar para Revisão
                  </Button>
                  <Button
                    className="bg-primary"
                    disabled={statusMedicao === "fechada"}
                    onClick={() => setStatusMedicao("fechada")}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Fechar Medição de Produção
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </AppLayout>
  )
}
