"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Users,
  Plus,
  Edit2,
  Trash2,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Mail,
  Phone,
  Building2,
  UserCog,
  Crown,
  Briefcase,
  HardHat,
  Calculator,
  Package,
  Wallet,
  FileSignature,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Dados mockados - Responsaveis da Obra
const responsaveis = [
  {
    id: 1,
    nome: "Carlos Eduardo Santos",
    cargo: "Gerente de Contrato",
    setor: "Diretoria",
    email: "carlos.santos@empresa.com.br",
    telefone: "(48) 99999-1111",
    foto: null,
    nivel: "estrategico",
    ativo: true,
  },
  {
    id: 2,
    nome: "Maria Fernanda Silva",
    cargo: "Coordenadora Comercial",
    setor: "Comercial",
    email: "maria.silva@empresa.com.br",
    telefone: "(48) 99999-2222",
    foto: null,
    nivel: "tatico",
    ativo: true,
  },
  {
    id: 3,
    nome: "Joao Pedro Lima",
    cargo: "Engenheiro de Producao",
    setor: "Producao",
    email: "joao.lima@empresa.com.br",
    telefone: "(48) 99999-3333",
    foto: null,
    nivel: "tatico",
    ativo: true,
  },
  {
    id: 4,
    nome: "Ana Carolina Costa",
    cargo: "Controller de Custos",
    setor: "Custo/Meta",
    email: "ana.costa@empresa.com.br",
    telefone: "(48) 99999-4444",
    foto: null,
    nivel: "tatico",
    ativo: true,
  },
  {
    id: 5,
    nome: "Pedro Henrique Alves",
    cargo: "Coordenador de Suprimentos",
    setor: "Suprimentos",
    email: "pedro.alves@empresa.com.br",
    telefone: "(48) 99999-5555",
    foto: null,
    nivel: "tatico",
    ativo: true,
  },
  {
    id: 6,
    nome: "Fernanda Oliveira",
    cargo: "Analista Financeiro",
    setor: "Financeiro",
    email: "fernanda.oliveira@empresa.com.br",
    telefone: "(48) 99999-6666",
    foto: null,
    nivel: "operacional",
    ativo: true,
  },
  {
    id: 7,
    nome: "Ricardo Mendes",
    cargo: "Engenheiro de Planejamento",
    setor: "Planejamento",
    email: "ricardo.mendes@empresa.com.br",
    telefone: "(48) 99999-7777",
    foto: null,
    nivel: "tatico",
    ativo: true,
  },
]

// Setores disponiveis
const setoresDisponiveis = [
  { id: "diretoria", nome: "Diretoria", icon: Crown },
  { id: "comercial", nome: "Comercial", icon: FileSignature },
  { id: "producao", nome: "Producao", icon: HardHat },
  { id: "custo", nome: "Custo/Meta", icon: Calculator },
  { id: "suprimentos", nome: "Suprimentos", icon: Package },
  { id: "financeiro", nome: "Financeiro", icon: Wallet },
  { id: "planejamento", nome: "Planejamento", icon: Briefcase },
]

// Validacoes
const validacoesResponsaveis = [
  { item: "Gerente de Contrato definido", status: true },
  { item: "Coordenador Comercial definido", status: true },
  { item: "Responsavel Producao definido", status: true },
  { item: "Controller de Custos definido", status: true },
  { item: "Coordenador Suprimentos definido", status: true },
  { item: "Analista Financeiro definido", status: true },
]

const getIconBySetor = (setor: string) => {
  const setorConfig = setoresDisponiveis.find((s) => s.nome.toLowerCase() === setor.toLowerCase())
  return setorConfig?.icon || Users
}

const getNivelBadge = (nivel: string) => {
  switch (nivel) {
    case "estrategico":
      return (
        <Badge className="bg-purple-500/10 text-purple-600 text-[10px]">
          <Crown className="h-3 w-3 mr-1" />
          Estrategico
        </Badge>
      )
    case "tatico":
      return (
        <Badge className="bg-blue-500/10 text-blue-600 text-[10px]">
          <UserCog className="h-3 w-3 mr-1" />
          Tatico
        </Badge>
      )
    case "operacional":
      return (
        <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">
          <Users className="h-3 w-3 mr-1" />
          Operacional
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="text-[10px]">
          {nivel}
        </Badge>
      )
  }
}

export default function CadastroResponsaveisPage() {
  const [dialogAberto, setDialogAberto] = useState(false)
  const [responsavelSelecionado, setResponsavelSelecionado] = useState<(typeof responsaveis)[0] | null>(null)
  const router = useRouter()

  const prontoParaContinuar = validacoesResponsaveis.every((v) => v.status)

  const abrirEdicao = (responsavel: (typeof responsaveis)[0]) => {
    setResponsavelSelecionado(responsavel)
    setDialogAberto(true)
  }

  return (
    <div className="flex flex-col h-full overflow-auto">
      {/* Header */}
      <div className="flex-none border-b border-border bg-card/30 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/obra">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">Cadastro de Responsaveis</h1>
                <Badge variant="outline" className="text-[10px] font-mono">
                  SETUP-01
                </Badge>
                {prontoParaContinuar ? (
                  <Badge className="bg-primary/10 text-primary text-[10px]">Completo</Badge>
                ) : (
                  <Badge className="bg-amber-500/10 text-amber-600 text-[10px]">Pendente</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">Primeira etapa: Definir responsaveis da obra</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                  onClick={() => setResponsavelSelecionado(null)}
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Responsavel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>{responsavelSelecionado ? "Editar Responsavel" : "Novo Responsavel"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Nome Completo</Label>
                    <Input defaultValue={responsavelSelecionado?.nome || ""} placeholder="Digite o nome completo" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Cargo</Label>
                      <Input defaultValue={responsavelSelecionado?.cargo || ""} placeholder="Cargo" />
                    </div>
                    <div className="space-y-2">
                      <Label>Setor</Label>
                      <Select defaultValue={responsavelSelecionado?.setor.toLowerCase() || ""}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {setoresDisponiveis.map((setor) => (
                            <SelectItem key={setor.id} value={setor.id}>
                              {setor.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      defaultValue={responsavelSelecionado?.email || ""}
                      placeholder="email@empresa.com.br"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input defaultValue={responsavelSelecionado?.telefone || ""} placeholder="(00) 00000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Nivel Hierarquico</Label>
                    <Select defaultValue={responsavelSelecionado?.nivel || ""}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estrategico">Estrategico</SelectItem>
                        <SelectItem value="tatico">Tatico</SelectItem>
                        <SelectItem value="operacional">Operacional</SelectItem>
                      </SelectContent>
                    </Select>
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
            <Button size="sm" className="gap-2" disabled={!prontoParaContinuar}>
              <Shield className="h-4 w-4" />
              Confirmar e Continuar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Cards Resumo */}
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-4 w-4 text-purple-600" />
                <span className="text-xs text-muted-foreground uppercase">Estrategico</span>
              </div>
              <p className="text-2xl font-bold">{responsaveis.filter((r) => r.nivel === "estrategico").length}</p>
              <p className="text-xs text-muted-foreground">responsaveis</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <UserCog className="h-4 w-4 text-blue-600" />
                <span className="text-xs text-muted-foreground uppercase">Tatico</span>
              </div>
              <p className="text-2xl font-bold">{responsaveis.filter((r) => r.nivel === "tatico").length}</p>
              <p className="text-xs text-muted-foreground">responsaveis</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-emerald-600" />
                <span className="text-xs text-muted-foreground uppercase">Operacional</span>
              </div>
              <p className="text-2xl font-bold">{responsaveis.filter((r) => r.nivel === "operacional").length}</p>
              <p className="text-xs text-muted-foreground">responsaveis</p>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase">Setores</span>
              </div>
              <p className="text-2xl font-bold">{new Set(responsaveis.map((r) => r.setor)).size}</p>
              <p className="text-xs text-muted-foreground">cobertos</p>
            </div>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-12 gap-6">
            {/* Lista de Responsaveis */}
            <div className="col-span-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Equipe da Obra</h2>
                </div>
                <span className="text-xs text-muted-foreground">{responsaveis.length} responsaveis cadastrados</span>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Responsavel
                      </th>
                      <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Setor
                      </th>
                      <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Nivel
                      </th>
                      <th className="text-left py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Contato
                      </th>
                      <th className="text-center py-2.5 px-3 font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                        Acoes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {responsaveis.map((resp, index) => {
                      const SetorIcon = getIconBySetor(resp.setor)
                      return (
                        <tr
                          key={resp.id}
                          className={`border-b border-border/50 hover:bg-muted/30 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={resp.foto || undefined} />
                                <AvatarFallback className="text-[10px]">
                                  {resp.nome
                                    .split(" ")
                                    .map((n) => n[0])
                                    .slice(0, 2)
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{resp.nome}</p>
                                <p className="text-[10px] text-muted-foreground">{resp.cargo}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-1.5">
                              <SetorIcon className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{resp.setor}</span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">{getNivelBadge(resp.nivel)}</td>
                          <td className="py-3 px-3">
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span className="text-[10px]">{resp.email}</span>
                              </div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Phone className="h-3 w-3" />
                                <span className="text-[10px]">{resp.telefone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0"
                                onClick={() => abrirEdicao(resp)}
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Validacoes */}
            <div className="col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Validacoes</h2>
              </div>
              <div className="border border-border rounded-lg overflow-hidden">
                <table className="w-full text-xs">
                  <tbody>
                    {validacoesResponsaveis.map((val, index) => (
                      <tr
                        key={val.item}
                        className={`border-b border-border/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                      >
                        <td className="py-2.5 px-3 w-6">
                          {val.status ? (
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-muted-foreground">{val.item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Indicador */}
              <div
                className={`mt-3 p-3 rounded-lg border ${prontoParaContinuar ? "bg-primary/10 border-primary/20" : "bg-amber-500/10 border-amber-500/20"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Pronto para continuar?</span>
                  <Badge className={`text-[10px] ${prontoParaContinuar ? "bg-primary" : "bg-amber-500"}`}>
                    {prontoParaContinuar ? "SIM" : "NAO"}
                  </Badge>
                </div>
              </div>

              {/* Aviso */}
              <div className="mt-4 p-3 bg-muted/30 border border-border rounded-lg">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium">Primeira Etapa Obrigatoria</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      O cadastro de responsaveis e a primeira etapa apos a abertura do Centro de Custo. Defina todos os
                      responsaveis antes de iniciar a estruturacao.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
