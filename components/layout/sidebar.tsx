"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Users,
  FileText,
  FolderKanban,
  Briefcase,
  HardHat,
  ChevronDown,
  ChevronRight,
  Ruler,
  Calendar,
  Factory,
  Package,
  DollarSign,
  ClipboardCheck,
  Shield,
  Leaf,
  Wallet,
  FileStack,
  TrendingUp,
  Wrench,
  UserCog,
  Scale,
  Target,
  DoorOpen,
  PieChart,
  BarChart3,
  Megaphone,
  Monitor,
  Boxes,
  ShieldCheck,
  FileSearch,
  TreePine,
  Receipt,
  ShoppingCart,
  Brain,
  Bot,
  Sparkles,
  GraduationCap,
  Users2,
  Cog,
  Gauge,
  CalendarCheck,
  Activity,
  LayoutList,
  FileSignature,
  ClipboardList,
  Calculator,
  PackageSearch,
  Building2,
  Settings,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

interface SubMenuItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface MenuItem {
  name: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  children?: SubMenuItem[]
}

interface Section {
  name: string
  icon: React.ComponentType<{ className?: string }>
  submenu: MenuItem[]
}

const corporativoNavigation: Section[] = [
  {
    name: "Estrategico",
    icon: Target,
    submenu: [
      { name: "Planejamento Estrategico", href: "/corporativo/estrategico/planejamento", icon: Target },
      { name: "Gestao de Acessos (Catraca)", href: "/corporativo/estrategico/catraca", icon: DoorOpen },
      { name: "Analytics Corporativo", href: "/corporativo/estrategico/analytics", icon: BarChart3 },
    ],
  },
  {
    name: "Comercial",
    icon: Briefcase,
    submenu: [
      { name: "Clientes & CRM", href: "/corporativo/comercial/clientes", icon: Users },
      { name: "Contratos & Orcamentos", href: "/corporativo/comercial/contratos", icon: Receipt },
      { name: "Portfolio de Obras", href: "/corporativo/comercial/portfolio", icon: FolderKanban },
    ],
  },
  {
    name: "Administrativo",
    icon: Wallet,
    submenu: [
      { name: "RH & Gestao Talentos", href: "/corporativo/administrativo/rh", icon: UserCog },
      { name: "TI & Comunicacao", href: "/corporativo/administrativo/ti", icon: Monitor },
      { name: "Mural Hermes", href: "/corporativo/administrativo/mural", icon: Megaphone },
      { name: "Ativos & Patrimonio", href: "/corporativo/administrativo/ativos", icon: Boxes },
      { name: "Controladoria & FP&A", href: "/corporativo/administrativo/controladoria", icon: PieChart },
    ],
  },
  {
    name: "Auditoria e Controle",
    icon: ShieldCheck,
    submenu: [
      { name: "Compliance & Processos", href: "/corporativo/auditoria/compliance", icon: ClipboardCheck },
      { name: "Auditoria de Campo", href: "/corporativo/auditoria/campo", icon: FileSearch },
      { name: "Controle de Estoque", href: "/corporativo/auditoria/estoque", icon: Package },
    ],
  },
  {
    name: "QSMS",
    icon: Shield,
    submenu: [
      { name: "Qualidade", href: "/corporativo/qsms/qualidade", icon: ShieldCheck },
      { name: "Seguranca do Trabalho", href: "/corporativo/qsms/seguranca", icon: Shield },
      { name: "Meio Ambiente", href: "/corporativo/qsms/meio-ambiente", icon: TreePine },
      { name: "Social & Comunidade", href: "/corporativo/qsms/social", icon: Users2 },
    ],
  },
  {
    name: "Gestao Inteligente",
    icon: Brain,
    submenu: [
      { name: "Protocolo HERMES", href: "/corporativo/inteligencia/hermes", icon: Sparkles },
      { name: "Treinamento & Curadoria IAs", href: "/corporativo/inteligencia/treinamento", icon: GraduationCap },
      { name: "Comite de Validacao", href: "/corporativo/inteligencia/comite", icon: Users2 },
      { name: "Fabrica de Agentes", href: "/corporativo/inteligencia/fabrica", icon: Bot },
    ],
  },
]

const obraNavigation: Section[] = [
  {
    name: "Gerencial do Contrato",
    icon: Gauge,
    submenu: [
      { name: "Cockpit de Governanca", href: "/obra/gerencial/cockpit", icon: Activity },
      { name: "Agenda Gerencial", href: "/obra/gerencial/agenda", icon: CalendarCheck },
      { name: "Encerramento Mensal", href: "/obra/gerencial/encerramento", icon: FileText },
      { name: "Indicadores & KPIs", href: "/obra/gerencial/indicadores", icon: BarChart3 },
    ],
  },
  {
    name: "Comercial",
    icon: Briefcase,
    submenu: [
      { name: "EST-00 Estruturacao Geral", href: "/obra/comercial/estruturacao-geral", icon: LayoutList },
      { name: "EST-01 Contrato", href: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
      { name: "EST-02 Medicao", href: "/obra/comercial/estruturacao-medicao", icon: ClipboardList },
      { name: "EST-03 Custo", href: "/obra/comercial/estruturacao-custo", icon: Calculator },
      { name: "EST-04 Suprimentos", href: "/obra/comercial/estruturacao-suprimentos", icon: PackageSearch },
      { name: "EST-05 Indireto", href: "/obra/comercial/estruturacao-indireto", icon: Building2 },
      {
        name: "Receita & Medicao",
        icon: Receipt,
        children: [
          { name: "RM-01 Visao Geral", href: "/obra/comercial/receita-medicao", icon: Receipt },
          { name: "RM-02 Medicao Producao", href: "/obra/comercial/medicao-producao", icon: Factory },
          { name: "RM-03 Medicao Cliente", href: "/obra/comercial/medicao-cliente", icon: Users },
          { name: "RM-04 Faturamento", href: "/obra/comercial/faturamento", icon: DollarSign },
          { name: "RM-05 Change Control", href: "/obra/comercial/change-control", icon: FileStack },
        ],
      },
      {
        name: "Custo & Meta",
        icon: TrendingUp,
        children: [
          { name: "CM-01 Visao Geral", href: "/obra/comercial/custo-meta", icon: TrendingUp },
          { name: "CM-02 Detalhe por Servico", href: "/obra/comercial/custo-detalhe", icon: FileText },
          { name: "CM-03 Metas Economicas", href: "/obra/comercial/metas-economicas", icon: Target },
          { name: "CM-04 Analise Desvios", href: "/obra/comercial/analise-desvios", icon: AlertTriangle },
          { name: "CM-05 Analise MO", href: "/obra/comercial/custo/analise-mo", icon: Users },
          { name: "CM-06 Rateios MO", href: "/obra/comercial/custo/rateios", icon: PieChart },
          { name: "CM-07 Aprovacao Gerencial", href: "/obra/comercial/custo/aprovacao-gerencial", icon: CheckCircle },
        ],
      },
      {
        name: "Suprimentos",
        icon: ShoppingCart,
        children: [
          { name: "SP-01 Visao Geral", href: "/obra/comercial/suprimentos-visao", icon: ShoppingCart },
          { name: "SP-02 Pedidos", href: "/obra/comercial/suprimentos-pedidos", icon: Package },
          { name: "SP-03 Fornecedores", href: "/obra/comercial/suprimentos-fornecedores", icon: Users },
          { name: "SP-04 Contratos", href: "/obra/comercial/suprimentos-contratos", icon: FileSignature },
        ],
      },
      {
        name: "Analytics",
        icon: BarChart3,
        children: [{ name: "AC-01 Analytics Comercial", href: "/obra/comercial/analytics-comercial", icon: BarChart3 }],
      },
      { name: "Estrutura (EAP)", href: "/obra/comercial/estrutura", icon: FileStack },
    ],
  },
  {
    name: "Engenharia",
    icon: Ruler,
    submenu: [
      { name: "EN-01 Projetos", href: "/obra/engenharia/projetos", icon: FileText },
      { name: "EN-02 Planejamento", href: "/obra/engenharia/planejamento", icon: Calendar },
      { name: "EN-03 Documentos", href: "/obra/engenharia/documentos", icon: FileStack },
      { name: "EN-04 Revisoes", href: "/obra/engenharia/revisoes", icon: FileSearch },
    ],
  },
  {
    name: "Producao",
    icon: Factory,
    submenu: [
      { name: "PR-01 Campo", href: "/obra/producao/campo", icon: HardHat },
      { name: "PR-02 Produtividade", href: "/obra/producao/produtividade", icon: TrendingUp },
      { name: "PR-03 Equipamentos", href: "/obra/producao/equipamentos", icon: Wrench },
      { name: "PR-04 RDO", href: "/obra/producao/rdo", icon: ClipboardList },
      { name: "PR-05 Apontamentos", href: "/obra/producao/apontamentos", icon: ClipboardCheck },
    ],
  },
  {
    name: "Administrativo",
    icon: Wallet,
    submenu: [
      { name: "AD-01 RH", href: "/obra/administrativo/rh", icon: UserCog },
      { name: "AD-02 Financeiro", href: "/obra/administrativo/financeiro", icon: DollarSign },
      { name: "AD-03 Patrimonio", href: "/obra/administrativo/patrimonio", icon: Package },
      { name: "AD-04 Comunicacao", href: "/obra/administrativo/comunicacao", icon: Megaphone },
      { name: "AD-05 Configuracoes", href: "/obra/administrativo/configuracoes", icon: Settings },
    ],
  },
  {
    name: "Garantidores",
    icon: Shield,
    submenu: [
      { name: "GA-01 Qualidade", href: "/obra/garantidores/qualidade", icon: ClipboardCheck },
      { name: "GA-02 SSMA", href: "/obra/garantidores/ssma", icon: Shield },
      { name: "GA-03 Meio Ambiente", href: "/obra/garantidores/meio-ambiente", icon: Leaf },
      { name: "GA-04 Juridico", href: "/obra/garantidores/juridico", icon: Scale },
    ],
  },
  {
    name: "Gestao Inteligente",
    icon: Brain,
    submenu: [
      { name: "GI-01 Feedback", href: "/obra/inteligencia/feedback", icon: Cog },
      { name: "GI-02 Agentes", href: "/obra/inteligencia/agentes", icon: Bot },
    ],
  },
]

const obrasDisponiveis = [
  { id: "br-101-lote-2", nome: "BR-101-LOTE 2", descricao: "Duplicacao Rodovia BR-101 - Lote 2", status: "Ativo" },
  { id: "br-116-lote-1", nome: "BR-116-LOTE 1", descricao: "Manutencao BR-116", status: "Ativo" },
]

const STORAGE_KEY = "genesis-sidebar-menus"

function getStoredMenus(): string[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // Ignora erro de parse
  }
  return []
}

function saveMenus(menus: string[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(menus))
  } catch {
    // Ignora erro de storage
  }
}

export function Sidebar() {
  const pathname = usePathname()
  const [obraAtual] = useState(obrasDisponiveis[0])

  const [mounted, setMounted] = useState(false)

  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  useEffect(() => {
    const stored = getStoredMenus()
    setExpandedMenus(stored)
    setMounted(true)
  }, [])

  const handleToggle = useCallback((menuKey: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setExpandedMenus((prev) => {
      let next: string[]
      if (prev.includes(menuKey)) {
        next = prev.filter((k) => k !== menuKey)
      } else {
        next = [...prev, menuKey]
      }
      saveMenus(next)
      return next
    })
  }, [])

  const isMenuOpen = useCallback(
    (menuKey: string) => {
      return expandedMenus.includes(menuKey)
    },
    [expandedMenus],
  )

  // Verifica se uma rota está ativa (exata ou começa com o href)
  const isActive = useCallback((href: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(`${href}/`)
  }, [pathname])

  // Verifica se algum filho de um item está ativo
  const hasActiveChild = useCallback((item: MenuItem): boolean => {
    if (!item.children || item.children.length === 0) {
      if (item.href) {
        return isActive(item.href)
      }
      return false
    }
    return item.children.some((child) => isActive(child.href))
  }, [isActive])

  // Verifica se alguma página de uma seção está ativa
  const hasActiveSection = useCallback((section: Section): boolean => {
    return section.submenu.some((item) => {
      if (item.href) {
        return isActive(item.href)
      }
      if (item.children) {
        return item.children.some((child) => isActive(child.href))
      }
      return false
    })
  }, [isActive])

  const isConsoleActive = pathname.startsWith("/corporativo/console")

  const getMenuKey = useCallback((name: string, module: "corp" | "obra") => {
    if (name === "Comercial" || name === "Administrativo" || name === "Gestao Inteligente") {
      return `${name}-${module}`
    }
    return name
  }, [])

  const getSectorKey = useCallback((deptName: string, sectorName: string, module: "corp" | "obra") => {
    return `${module}-${deptName}-${sectorName}`
  }, [])

  if (!mounted) {
    return (
      <aside className="flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border">
        <div className="border-b border-sidebar-border flex-shrink-0">
          <div className="flex items-center gap-2 px-4 py-3">
            <div className="flex items-center justify-center w-8 h-8 rounded bg-primary">
              <HardHat className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground">GENESIS</span>
          </div>
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-sidebar-accent rounded-lg border border-sidebar-border">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">{obrasDisponiveis[0].nome}</span>
                  <span className="text-xs px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded">Ativo</span>
                </div>
                <p className="text-xs text-sidebar-foreground/60 truncate">{obrasDisponiveis[0].descricao}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-sidebar-foreground/50 flex-shrink-0" />
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          <div className="px-3 mb-1">
            <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
              Carregando...
            </span>
          </div>
        </nav>
      </aside>
    )
  }

  const renderMenuItem = (item: MenuItem, deptName: string, module: "corp" | "obra") => {
    if (item.children && item.children.length > 0) {
      const sectorKey = getSectorKey(deptName, item.name, module)
      const isSectorOpen = isMenuOpen(sectorKey)
      const hasActive = hasActiveChild(item)

      return (
        <div key={item.name}>
          <button
            type="button"
            onClick={(e) => handleToggle(sectorKey, e)}
            className={cn(
              "flex items-center justify-between w-full px-3 py-1.5 pl-9 text-sm transition-colors",
              hasActive
                ? "bg-sidebar-active text-sidebar-active-foreground font-medium border-l-2 border-sidebar-active-border"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent",
            )}
          >
            <div className="flex items-center gap-2">
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </div>
            <ChevronRight
              className={cn(
                "w-3 h-3 transition-transform duration-200",
                hasActive ? "text-sidebar-active-foreground" : "text-sidebar-foreground/50",
                isSectorOpen && "rotate-90",
              )}
            />
          </button>

          {isSectorOpen && (
            <div className="pb-1">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 pl-14 text-xs transition-colors",
                    isActive(child.href)
                      ? "bg-sidebar-active text-sidebar-active-foreground font-medium border-l-2 border-sidebar-active-border"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                >
                  <child.icon className="w-3 h-3" />
                  <span>{child.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )
    }

    const itemActive = isActive(item.href!)

    return (
      <Link
        key={item.href}
        href={item.href!}
        className={cn(
          "flex items-center gap-2 px-3 py-1.5 pl-9 text-sm transition-colors",
          itemActive
            ? "bg-sidebar-active text-sidebar-active-foreground font-medium border-l-2 border-sidebar-active-border"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        )}
      >
        <item.icon className="w-4 h-4" />
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <aside className="flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border">
      {/* Logo e Seletor de Obra */}
      <div className="border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary">
            <HardHat className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-sidebar-foreground">GENESIS</span>
        </div>

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
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* Modulo Corporativo */}
        <div className="px-3 mb-1">
          <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Modulo Corporativo
          </span>
        </div>

        {corporativoNavigation.map((section) => {
          const menuKey = getMenuKey(section.name, "corp")
          const isOpen = isMenuOpen(menuKey)
          const sectionActive = hasActiveSection(section)

          return (
            <div key={menuKey}>
              <button
                type="button"
                onClick={(e) => handleToggle(menuKey, e)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium transition-colors",
                  sectionActive
                    ? "bg-sidebar-active text-sidebar-active-foreground border-l-2 border-sidebar-active-border"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <div className="flex items-center gap-2">
                  <section.icon className={cn("w-4 h-4", sectionActive ? "text-sidebar-active-foreground" : "text-sidebar-foreground/70")} />
                  <span>{section.name}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    sectionActive ? "text-sidebar-active-foreground" : "text-sidebar-foreground/50",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {isOpen && (
                <div className="pb-1">{section.submenu.map((item) => renderMenuItem(item, section.name, "corp"))}</div>
              )}
            </div>
          )
        })}

        {/* Departamentos da Obra */}
        <div className="px-3 mt-4 mb-1">
          <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Departamentos da Obra
          </span>
        </div>

        {obraNavigation.map((dept) => {
          const menuKey = getMenuKey(dept.name, "obra")
          const isOpen = isMenuOpen(menuKey)
          const deptActive = hasActiveSection(dept)

          return (
            <div key={menuKey}>
              <button
                type="button"
                onClick={(e) => handleToggle(menuKey, e)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium transition-colors",
                  deptActive
                    ? "bg-sidebar-active text-sidebar-active-foreground border-l-2 border-sidebar-active-border"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <div className="flex items-center gap-2">
                  <dept.icon className={cn("w-4 h-4", deptActive ? "text-sidebar-active-foreground" : "text-sidebar-foreground/70")} />
                  <span>{dept.name}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    deptActive ? "text-sidebar-active-foreground" : "text-sidebar-foreground/50",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              {isOpen && (
                <div className="pb-1">{dept.submenu.map((item) => renderMenuItem(item, dept.name, "obra"))}</div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Console Administrativo */}
      <div className="border-t border-sidebar-border p-3 flex-shrink-0">
        <Link
          href="/corporativo/console"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
            isConsoleActive
              ? "bg-primary text-primary-foreground"
              : "bg-sidebar-accent hover:bg-sidebar-accent/80 text-sidebar-foreground",
          )}
        >
          <Settings className="w-5 h-5" />
          <div className="flex-1">
            <span className="text-sm font-medium">Console</span>
            <p className="text-xs opacity-70">Administracao do Sistema</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}
