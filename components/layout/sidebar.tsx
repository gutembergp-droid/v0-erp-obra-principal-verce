"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Building2,
  Users,
  FileText,
  FolderKanban,
  CheckCircle2,
  Briefcase,
  HardHat,
  ChevronDown,
  Ruler,
  Calendar,
  Factory,
  Package,
  DollarSign,
  ClipboardCheck,
  Shield,
  Leaf,
  Wallet,
  Search,
  FileStack,
  TrendingUp,
  Wrench,
  UserCog,
  Scale,
  FolderOpen,
  Building,
} from "lucide-react"
import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"

const corporativoNavigation = [
  {
    name: "Corporativo",
    icon: Building2,
    submenu: [
      { name: "Clientes", href: "/corporativo/clientes", icon: Users },
      { name: "Contratos", href: "/corporativo/contratos", icon: FileText },
      { name: "Portfolio de Obras", href: "/corporativo/portfolio", icon: FolderKanban },
      { name: "Homologacoes", href: "/corporativo/homologacoes", icon: CheckCircle2 },
    ],
  },
  {
    name: "Gestao de Obras",
    icon: Building,
    submenu: [{ name: "Todas as Obras", href: "/corporativo/obras", icon: FolderOpen }],
  },
]

const obraNavigation = [
  {
    name: "Comercial",
    icon: Briefcase,
    submenu: [
      { name: "Estruturacao", href: "/obra/comercial/estruturacao", icon: FileStack },
      { name: "Receita", href: "/obra/comercial/receita", icon: TrendingUp },
      { name: "Suprimentos", href: "/obra/comercial/suprimentos", icon: Package },
      { name: "Engenharia de Valor", href: "/obra/comercial/engenharia-valor", icon: DollarSign },
    ],
  },
  {
    name: "Engenharia",
    icon: Ruler,
    submenu: [
      { name: "Projetos", href: "/obra/engenharia/projetos", icon: FileText },
      { name: "Planejamento & Controle", href: "/obra/engenharia/planejamento", icon: Calendar },
    ],
  },
  {
    name: "Producao",
    icon: Factory,
    submenu: [
      { name: "Campo / Execucao", href: "/obra/producao/campo", icon: HardHat },
      { name: "Produtividade", href: "/obra/producao/produtividade", icon: TrendingUp },
      { name: "Equipamentos", href: "/obra/producao/equipamentos", icon: Wrench },
    ],
  },
  {
    name: "Administrativo",
    icon: Wallet,
    submenu: [
      { name: "RH / Pessoal", href: "/obra/administrativo/rh", icon: UserCog },
      { name: "Financeiro Obra", href: "/obra/administrativo/financeiro", icon: DollarSign },
      { name: "Patrimonio", href: "/obra/administrativo/patrimonio", icon: Package },
      { name: "Documentos", href: "/obra/administrativo/documentos", icon: FileText },
    ],
  },
  {
    name: "Garantidores",
    icon: Shield,
    badge: "Trava",
    submenu: [
      { name: "Qualidade", href: "/obra/garantidores/qualidade", icon: ClipboardCheck },
      { name: "SSMA", href: "/obra/garantidores/ssma", icon: Shield },
      { name: "Meio Ambiente", href: "/obra/garantidores/meio-ambiente", icon: Leaf },
      { name: "Juridico", href: "/obra/garantidores/juridico", icon: Scale },
    ],
  },
]

const obrasDisponiveis = [
  { id: "br-101-lote-2", nome: "BR-101-LOTE 2", descricao: "Duplicacao Rodovia BR-101 - Lote 2", status: "Ativo" },
  { id: "br-116-lote-1", nome: "BR-116-LOTE 1", descricao: "Manutencao BR-116", status: "Ativo" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [obraAtual, setObraAtual] = useState(obrasDisponiveis[0])
  const [searchQuery, setSearchQuery] = useState("")

  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    Corporativo: true,
    "Gestao de Obras": true,
    Comercial: true,
    Engenharia: true,
    Producao: false,
    Administrativo: false,
    Garantidores: false,
  })

  const toggleMenu = (name: string) => {
    setExpandedMenus((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const isActive = (href: string) => pathname === href
  const isInSection = (basePath: string) => pathname.startsWith(basePath)

  return (
    <aside className="flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border">
      {/* Logo e Seletor de Obra */}
      <div className="border-b border-sidebar-border">
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary">
            <HardHat className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-sidebar-foreground">GENESIS</span>
        </div>

        {/* Seletor de Obra */}
        <div className="px-3 pb-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-sidebar-accent rounded-lg border border-sidebar-border">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary">{obraAtual.nome}</span>
                <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded">Ativo</span>
              </div>
              <p className="text-xs text-sidebar-foreground/60 truncate">{obraAtual.descricao}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-sidebar-foreground/50 flex-shrink-0" />
          </div>
        </div>

        {/* Campo de Busca */}
        <div className="px-3 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sidebar-foreground/50" />
            <Input
              placeholder="Buscar no menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-8 text-sm bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* Modulo Corporativo */}
        <div className="px-3 mb-1">
          <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Modulo Corporativo
          </span>
        </div>

        {corporativoNavigation.map((section) => (
          <Collapsible
            key={section.name}
            open={expandedMenus[section.name]}
            onOpenChange={() => toggleMenu(section.name)}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent">
              <div className="flex items-center gap-2">
                <section.icon className="w-4 h-4 text-sidebar-foreground/70" />
                <span>{section.name}</span>
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-sidebar-foreground/50 transition-transform",
                  expandedMenus[section.name] && "rotate-180",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              {section.submenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 pl-9 text-sm transition-colors",
                    isActive(item.href)
                      ? "text-primary bg-sidebar-accent font-medium"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}

        {/* Departamentos da Obra */}
        <div className="px-3 mt-4 mb-1">
          <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Departamentos da Obra
          </span>
        </div>

        {obraNavigation.map((dept) => (
          <Collapsible key={dept.name} open={expandedMenus[dept.name]} onOpenChange={() => toggleMenu(dept.name)}>
            <CollapsibleTrigger
              className={cn(
                "flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium hover:bg-sidebar-accent",
                isInSection(`/obra/${dept.name.toLowerCase()}`) ? "text-primary" : "text-sidebar-foreground",
              )}
            >
              <div className="flex items-center gap-2">
                <dept.icon className="w-4 h-4 text-sidebar-foreground/70" />
                <span>{dept.name}</span>
                {dept.badge && (
                  <span className="text-xs px-1.5 py-0.5 bg-primary/20 text-primary rounded">{dept.badge}</span>
                )}
              </div>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-sidebar-foreground/50 transition-transform",
                  expandedMenus[dept.name] && "rotate-180",
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              {dept.submenu.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 pl-9 text-sm transition-colors",
                    isActive(item.href)
                      ? "text-primary bg-sidebar-accent font-medium"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </nav>

      {/* Usuario */}
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">Usuario</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
