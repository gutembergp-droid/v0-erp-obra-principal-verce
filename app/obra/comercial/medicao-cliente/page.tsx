"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Users,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  AlertTriangle,
  ArrowRight,
  Send,
  X,
  History,
  FileText,
} from "lucide-react"

// Dados mockados de Medicao do Cliente
const medicaoClienteMock = [
  {
    id: 1,
    codigo: "1.1",
    descricao: "Escavacao de material de 1a categoria",
    unidade: "m3",
    precoUnitario: 12.5,
    quantidadeMP: 45000,
    quantidadeMC: 42000,
    valorMC: 525000,
    divergencia: -3000,
    status: "aprovado",
    historico: [
      { data: "03/01/2026", acao: "Aprovado", usuario: "Cliente" },
      { data: "02/01/2026", acao: "Ajustado", usuario: "Comercial" },
    ],
  },
  {
    id: 2,
    codigo: "1.2",
    descricao: "Escavacao de material de 2a categoria",
    unidade: "m3",
    precoUnitario: 28.0,
    quantidadeMP: 22000,
    quantidadeMC: 22000,
    valorMC: 616000,
    divergencia: 0,
    status: "aprovado",
    historico: [{ data: "03/01/2026", acao: "Aprovado", usuario: "Cliente" }],
  },
  {
    id: 3,
    codigo: "1.3",
    descricao: "Escavacao de material de 3a categoria",
    unidade: "m3",
    precoUnitario: 85.0,
    quantidadeMP: 8500,
    quantidadeMC: 8500,
    valorMC: 722500,
    divergencia: 0,
    status: "aprovado",
    historico: [{ data: "03/01/2026", acao: "Aprovado", usuario: "Cliente" }],
  },
  {
    id: 4,
    codigo: "2.3",
    descricao: "CBUQ",
    unidade: "ton",
    precoUnitario: 380.0,
    quantidadeMP: 3500,
    quantidadeMC: 3200,
    valorMC: 1216000,
    divergencia: -300,
    status: "pendente",
    historico: [{ data: "04/01/2026", acao: "Enviado", usuario: "Comercial" }],
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

function MedicaoClienteContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [competencia, setCompetencia] = useState("jan-2026")
  const [painelAberto, setPainelAberto] = useState(false)
  const [itemSelecionado, setItemSelecionado] = useState<(typeof medicaoClienteMock)[0] | null>(null)

  const valorTotalMC = medicaoClienteMock.reduce((acc, item) => acc + item.valorMC, 0)
  const itensAprovados = medicaoClienteMock.filter((i) => i.status === "aprovado").length
  const itensDivergentes = medicaoClienteMock.filter((i) => i.divergencia !== 0).length

  const abrirPainel = (item: (typeof medicaoClienteMock)[0]) => {
    setItemSelecionado(item)
    setPainelAberto(true)
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">Medicao do Cliente (MC)</h1>
            <Badge variant="outline" className="text-[10px] font-mono">
              RM-03
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-transparent">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Medicao do Cliente (MC)</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Representa o que sera <strong>FATURADO</strong> ao cliente. Pode divergir da MP (Medicao de Producao).
                Requer aprovacao antes do faturamento.
              </p>
            </div>
          </div>
        </div>

        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Competencia</span>
            <div className="mt-2">
              <Select value={competencia} onValueChange={setCompetencia}>
                <SelectTrigger className="bg-transparent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jan-2026">Janeiro/2026</SelectItem>
                  <SelectItem value="dez-2025">Dezembro/2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Valor Total MC</span>
            <div className="text-2xl font-bold text-primary mt-1">{formatCurrency(valorTotalMC)}</div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Itens Aprovados</span>
            <div className="text-2xl font-bold text-primary mt-1">{itensAprovados}</div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Com Divergencia</span>
            <div className="text-2xl font-bold text-accent-foreground mt-1">{itensDivergentes}</div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Status Gate 4</span>
            <Badge variant="outline" className="mt-2 text-accent-foreground">
              Pendente
            </Badge>
          </div>
        </div>

        {/* Tabela */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">Medicao para Faturamento</h2>
                <p className="text-xs text-muted-foreground">Quantidades e valores a faturar ao cliente</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar item..."
                  className="pl-9 w-48 bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Codigo</TableHead>
                <TableHead>Descricao</TableHead>
                <TableHead className="text-center">Un</TableHead>
                <TableHead className="text-right">P. Unit.</TableHead>
                <TableHead className="text-right">Qtd MP</TableHead>
                <TableHead className="text-right">Qtd MC</TableHead>
                <TableHead className="text-right">Divergencia</TableHead>
                <TableHead className="text-right">Valor MC</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicaoClienteMock.map((item) => (
                <TableRow key={item.id} className="cursor-pointer hover:bg-muted/50" onClick={() => abrirPainel(item)}>
                  <TableCell className="font-mono">{item.codigo}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{item.unidade}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(item.precoUnitario)}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    {formatNumber(item.quantidadeMP)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold">{formatNumber(item.quantidadeMC)}</TableCell>
                  <TableCell className="text-right">
                    {item.divergencia !== 0 ? (
                      <span className="text-accent-foreground font-mono flex items-center justify-end gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {formatNumber(item.divergencia)}
                      </span>
                    ) : (
                      <span className="text-primary">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-primary">
                    {formatCurrency(item.valorMC)}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.status === "aprovado" ? (
                      <Badge className="bg-primary/10 text-primary">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Aprovado
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-accent-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        Pendente
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Acoes */}
        <div className="flex justify-between">
          <Button variant="outline" className="bg-transparent">
            <ArrowRight className="w-4 h-4 mr-2" />
            Ver Comparativo MP x MC
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-transparent">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Aprovar Medicao
            </Button>
            <Button>
              <Send className="w-4 h-4 mr-2" />
              Enviar para Faturamento
            </Button>
          </div>
        </div>
      </div>

      {/* PAINEL LATERAL */}
      <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
        <SheetContent className="w-[400px] sm:w-[450px] p-0">
          <SheetHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">Detalhe do Item</SheetTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setPainelAberto(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-80px)]">
            {itemSelecionado && (
              <div className="p-4 space-y-4">
                {/* Info do Item */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="font-mono">
                      {itemSelecionado.codigo}
                    </Badge>
                    {itemSelecionado.status === "aprovado" ? (
                      <Badge className="bg-primary/10 text-primary text-[10px]">Aprovado</Badge>
                    ) : (
                      <Badge variant="outline" className="text-accent-foreground text-[10px]">
                        Pendente
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm font-medium">{itemSelecionado.descricao}</p>
                </div>

                {/* Valores */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <h3 className="text-sm font-semibold mb-3">Valores</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Preco Unitario</span>
                      <span className="font-mono">{formatCurrency(itemSelecionado.precoUnitario)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Qtd Producao (MP)</span>
                      <span className="font-mono">{formatNumber(itemSelecionado.quantidadeMP)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Qtd Cliente (MC)</span>
                      <span className="font-mono font-bold">{formatNumber(itemSelecionado.quantidadeMC)}</span>
                    </div>
                    {itemSelecionado.divergencia !== 0 && (
                      <div className="flex justify-between text-sm pt-2 border-t border-border">
                        <span className="text-accent-foreground flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Divergencia
                        </span>
                        <span className="font-mono text-accent-foreground">
                          {formatNumber(itemSelecionado.divergencia)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm pt-2 border-t border-border">
                      <span className="font-semibold">Valor Total MC</span>
                      <span className="font-mono font-bold text-primary">
                        {formatCurrency(itemSelecionado.valorMC)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Historico */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <History className="w-4 h-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold">Historico</h3>
                  </div>
                  <div className="space-y-2">
                    {itemSelecionado.historico.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between py-2 border-b border-border last:border-0"
                      >
                        <div>
                          <p className="text-xs font-medium">{item.acao}</p>
                          <p className="text-[10px] text-muted-foreground">{item.usuario}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{item.data}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Acoes */}
                <div className="space-y-2">
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Documentos
                  </Button>
                  {itemSelecionado.status === "pendente" && (
                    <Button className="w-full">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Aprovar Item
                    </Button>
                  )}
                </div>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function MedicaoClientePage() {
  return (
    <Suspense fallback={null}>
      <MedicaoClienteContent />
    </Suspense>
  )
}
