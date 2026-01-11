"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ObraComercialNavbar } from "../../_components/obra-comercial-navbar"
import {
  Search,
  Package,
  CheckCircle2,
  AlertTriangle,
  X,
  Camera,
  FileText,
  Truck,
  ClipboardCheck,
  ThumbsUp,
  ThumbsDown,
  Upload,
} from "lucide-react"

// Dados mockados de Pedidos para Recebimento
const pedidosRecebimentoMock = [
  {
    id: "PED-2026-0045",
    fornecedor: "ArcelorMittal Brasil",
    material: "Aco CA-50 12,5mm",
    quantidade: 25000,
    unidade: "kg",
    dataPrevisao: "2026-01-10",
    status: "aguardando",
    origem: "EAP 1.2 - Fundacao",
    nf: null,
  },
  {
    id: "PED-2026-0044",
    fornecedor: "Votorantim Cimentos",
    material: "Cimento CP-V ARI",
    quantidade: 500,
    unidade: "sc",
    dataPrevisao: "2026-01-09",
    status: "em_conferencia",
    origem: "Almoxarifado",
    nf: "NF-45678",
  },
  {
    id: "PED-2026-0042",
    fornecedor: "Madeireira Tropical",
    material: "Forma Compensado Plastificado 18mm",
    quantidade: 200,
    unidade: "un",
    dataPrevisao: "2026-01-08",
    status: "recebido",
    origem: "EAP 1.3 - Estrutura",
    nf: "NF-45621",
  },
  {
    id: "PED-2026-0040",
    fornecedor: "Ferramentas Delta",
    material: 'Disco de Corte 7"',
    quantidade: 100,
    unidade: "un",
    dataPrevisao: "2026-01-07",
    status: "com_pendencia",
    origem: "Almoxarifado",
    nf: "NF-45589",
    pendencia: "Quantidade divergente - recebido 85 unidades",
  },
]

// Checklist de Conferencia
const checklistConferencia = [
  { id: 1, item: "Quantidade confere com NF", checked: false },
  { id: 2, item: "Material confere com especificacao", checked: false },
  { id: 3, item: "Embalagem integra", checked: false },
  { id: 4, item: "Sem danos visiveis", checked: false },
  { id: 5, item: "Certificados/laudos anexos", checked: false },
  { id: 6, item: "Prazo de validade OK", checked: false },
]

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value)
}

function RecebimentoContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [painelAberto, setPainelAberto] = useState(false)
  const [pedidoSelecionado, setPedidoSelecionado] = useState<(typeof pedidosRecebimentoMock)[0] | null>(null)
  const [checklist, setChecklist] = useState(checklistConferencia)
  const [observacoes, setObservacoes] = useState("")

  const pedidosFiltrados = pedidosRecebimentoMock.filter((p) => {
    if (filtroStatus !== "todos" && p.status !== filtroStatus) return false
    if (searchTerm && !p.material.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const abrirPainel = (pedido: (typeof pedidosRecebimentoMock)[0]) => {
    setPedidoSelecionado(pedido)
    setPainelAberto(true)
    setChecklist(checklistConferencia.map((c) => ({ ...c, checked: false })))
    setObservacoes("")
  }

  const toggleChecklist = (id: number) => {
    setChecklist((prev) => prev.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aguardando":
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-300 bg-blue-50">
            <Truck className="w-3 h-3 mr-1" />
            Aguardando
          </Badge>
        )
      case "em_conferencia":
        return (
          <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">
            <ClipboardCheck className="w-3 h-3 mr-1" />
            Em Conferencia
          </Badge>
        )
      case "recebido":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-300">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Recebido
          </Badge>
        )
      case "com_pendencia":
        return (
          <Badge variant="destructive">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Com Pendencia
          </Badge>
        )
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  return (
    <div className="overflow-auto h-full">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-foreground">Recebimento / Apropriacao</h1>
            <Badge variant="outline" className="text-[10px] font-mono">
              SUP-REC
            </Badge>
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Recebimento e Apropriacao de Materiais</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Conferencia de materiais recebidos na obra. Utilize o checklist para validar e registre qualquer
                nao-conformidade encontrada. Fotos podem ser anexadas para documentacao.
              </p>
            </div>
          </div>
        </div>

        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Aguardando Entrega</span>
            <div className="text-2xl font-bold text-blue-600 mt-1">
              {pedidosRecebimentoMock.filter((p) => p.status === "aguardando").length}
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Em Conferencia</span>
            <div className="text-2xl font-bold text-amber-600 mt-1">
              {pedidosRecebimentoMock.filter((p) => p.status === "em_conferencia").length}
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Recebidos Hoje</span>
            <div className="text-2xl font-bold text-green-600 mt-1">
              {pedidosRecebimentoMock.filter((p) => p.status === "recebido").length}
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <span className="text-xs text-muted-foreground">Com Pendencias</span>
            <div className="text-2xl font-bold text-red-600 mt-1">
              {pedidosRecebimentoMock.filter((p) => p.status === "com_pendencia").length}
            </div>
          </div>
        </div>

        {/* Filtros e Tabela */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold">Pedidos para Recebimento</h2>
                <p className="text-xs text-muted-foreground">Clique para iniciar conferencia</p>
              </div>
              <div className="flex items-center gap-3">
                <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                  <SelectTrigger className="w-40 bg-transparent">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="aguardando">Aguardando</SelectItem>
                    <SelectItem value="em_conferencia">Em Conferencia</SelectItem>
                    <SelectItem value="recebido">Recebido</SelectItem>
                    <SelectItem value="com_pendencia">Com Pendencia</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar material..."
                    className="pl-9 w-64 bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Fornecedor</TableHead>
                <TableHead>Material</TableHead>
                <TableHead className="text-right">Quantidade</TableHead>
                <TableHead>Origem</TableHead>
                <TableHead>Previsao</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pedidosFiltrados.map((pedido) => (
                <TableRow
                  key={pedido.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => abrirPainel(pedido)}
                >
                  <TableCell className="font-mono font-semibold">{pedido.id}</TableCell>
                  <TableCell>{pedido.fornecedor}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{pedido.material}</TableCell>
                  <TableCell className="text-right">
                    <span className="font-mono">{formatNumber(pedido.quantidade)}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {pedido.unidade}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {pedido.origem}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {new Date(pedido.dataPrevisao).toLocaleDateString("pt-BR")}
                  </TableCell>
                  <TableCell className="text-center">{getStatusBadge(pedido.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* PAINEL LATERAL - CONFERENCIA */}
      <Sheet open={painelAberto} onOpenChange={setPainelAberto}>
        <SheetContent className="w-[500px] sm:w-[550px] p-0">
          <SheetHeader className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">Conferencia de Recebimento</SheetTitle>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setPainelAberto(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-80px)]">
            {pedidoSelecionado && (
              <div className="p-4 space-y-4">
                {/* Info do Pedido */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="font-mono">
                      {pedidoSelecionado.id}
                    </Badge>
                    {getStatusBadge(pedidoSelecionado.status)}
                  </div>
                  <h3 className="font-semibold">{pedidoSelecionado.material}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pedidoSelecionado.fornecedor}</p>
                  <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Quantidade</p>
                      <p className="font-mono font-semibold">
                        {formatNumber(pedidoSelecionado.quantidade)} {pedidoSelecionado.unidade}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Origem</p>
                      <p className="text-sm">{pedidoSelecionado.origem}</p>
                    </div>
                  </div>
                  {pedidoSelecionado.nf && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">Nota Fiscal</p>
                      <p className="font-mono font-semibold">{pedidoSelecionado.nf}</p>
                    </div>
                  )}
                </div>

                {/* Checklist de Conferencia */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4" />
                    Checklist de Conferencia
                  </h4>
                  <div className="space-y-3">
                    {checklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <Checkbox
                          id={`check-${item.id}`}
                          checked={item.checked}
                          onCheckedChange={() => toggleChecklist(item.id)}
                        />
                        <label htmlFor={`check-${item.id}`} className="text-sm cursor-pointer">
                          {item.item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantidade Recebida */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <h4 className="text-sm font-semibold mb-3">Quantidade Recebida</h4>
                  <div className="flex items-center gap-3">
                    <Input
                      type="number"
                      placeholder="0"
                      className="w-32 font-mono"
                      defaultValue={pedidoSelecionado.quantidade}
                    />
                    <Badge variant="outline">{pedidoSelecionado.unidade}</Badge>
                    <span className="text-xs text-muted-foreground">
                      Esperado: {formatNumber(pedidoSelecionado.quantidade)}
                    </span>
                  </div>
                </div>

                {/* Observacoes */}
                <div className="p-4 rounded-lg border border-border bg-card">
                  <h4 className="text-sm font-semibold mb-3">Observacoes</h4>
                  <Textarea
                    placeholder="Registre qualquer observacao sobre o recebimento..."
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Upload de Fotos */}
                <div className="p-4 rounded-lg border border-dashed border-border bg-muted/30">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm font-medium">Anexar Fotos</p>
                    <p className="text-xs text-muted-foreground">Arraste ou clique para adicionar fotos do material</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      <Upload className="w-4 h-4 mr-2" />
                      Selecionar Arquivos
                    </Button>
                  </div>
                </div>

                {/* Pendencia (se houver) */}
                {pedidoSelecionado.pendencia && (
                  <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">Pendencia Registrada</p>
                        <p className="text-sm text-red-600 mt-1">{pedidoSelecionado.pendencia}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Acoes */}
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="bg-transparent">
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Registrar Pendencia
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Confirmar Recebimento
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Ordem de Compra
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function RecebimentoPage() {
  return (
    <Suspense fallback={null}>
      <RecebimentoContent />
    </Suspense>
  )
}
