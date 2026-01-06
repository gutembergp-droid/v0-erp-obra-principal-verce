"use client"

import { useState } from "react"

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
  KeyRound,
  Network,
  Activity,
  LayoutList,
  FileSignature,
  ClipboardList,
  Calculator,
} from "lucide-react"
import { useCallback, useReducer } from "react"

const corporativoNavigation = [
  {
    name: "Estrategico",
    icon: Target,
    submenu: [
      { name: "Planejamento Estrategico", href: "/corporativo/estrategico/planejamento", icon: Target },
      { name: "IAM & Matriz de Perfis", href: "/corporativo/estrategico/iam", icon: KeyRound },
      { name: "Alcadas & Governanca", href: "/corporativo/estrategico/alcadas", icon: Network },
      { name: "Gestao de Acessos (Catraca)", href: "/corporativo/estrategico/acessos", icon: DoorOpen },
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

const obraNavigation = [
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
      { name: "Estruturacao Geral", href: "/obra/comercial/estruturacao-geral", icon: LayoutList },
      { name: "EST-01 Contrato", href: "/obra/comercial/estruturacao-contrato", icon: FileSignature },
      { name: "EST-02 Medicao", href: "/obra/comercial/estruturacao-medicao", icon: ClipboardList },
      { name: "EST-03 Custo", href: "/obra/comercial/estruturacao-custo", icon: Calculator },
      { name: "Estrutura (EAP)", href: "/obra/comercial/estrutura", icon: FileStack },
      { name: "Receita & Medicao", href: "/obra/comercial/receita", icon: TrendingUp },
      { name: "Custo & Meta 0.9", href: "/obra/comercial/custo", icon: DollarSign },
      { name: "Suprimento & Compor 90", href: "/obra/comercial/suprimento", icon: ShoppingCart },
      { name: "Analytics Comercial", href: "/obra/comercial/analytics", icon: BarChart3 },
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
      { name: "Comunicacao", href: "/obra/administrativo/comunicacao", icon: Megaphone },
    ],
  },
  {
    name: "Garantidores",
    icon: Shield,
    submenu: [
      { name: "Qualidade", href: "/obra/garantidores/qualidade", icon: ClipboardCheck },
      { name: "SSMA", href: "/obra/garantidores/ssma", icon: Shield },
      { name: "Meio Ambiente", href: "/obra/garantidores/meio-ambiente", icon: Leaf },
      { name: "Juridico", href: "/obra/garantidores/juridico", icon: Scale },
    ],
  },
  {
    name: "Gestao Inteligente",
    icon: Brain,
    submenu: [
      { name: "Feedback & Calibragem", href: "/obra/inteligencia/feedback", icon: Cog },
      { name: "Agentes da Obra", href: "/obra/inteligencia/agentes", icon: Bot },
    ],
  },
]

const obrasDisponiveis = [
  { id: "br-101-lote-2", nome: "BR-101-LOTE 2", descricao: "Duplicacao Rodovia BR-101 - Lote 2", status: "Ativo" },
  { id: "br-116-lote-1", nome: "BR-116-LOTE 1", descricao: "Manutencao BR-116", status: "Ativo" },
]

const initialExpandedState: Record<string, boolean> = {
  // Corporativo
  Estrategico: false,
  "Comercial-corp": false,
  "Administrativo-corp": false,
  "Auditoria e Controle": false,
  QSMS: false,
  "Gestao Inteligente-corp": false,
  // Obra
  "Gerencial do Contrato": false,
  "Comercial-obra": false,
  Engenharia: false,
  Producao: false,
  "Administrativo-obra": false,
  Garantidores: false,
  "Gestao Inteligente-obra": false,
}

type MenuAction = { type: "TOGGLE"; name: string }

function menuReducer(state: Record<string, boolean>, action: MenuAction): Record<string, boolean> {
  switch (action.type) {
    case "TOGGLE":
      return { ...state, [action.name]: !state[action.name] }
    default:
      return state
  }
}

export function Sidebar() {
  const pathname = usePathname()
  const [obraAtual] = useState(obrasDisponiveis[0])

  const [expandedMenus, dispatch] = useReducer(menuReducer, initialExpandedState)

  const handleToggle = useCallback((menuKey: string) => {
    dispatch({ type: "TOGGLE", name: menuKey })
  }, [])

  const isActive = (href: string) => pathname === href

  const getMenuKey = useCallback((name: string, module: "corp" | "obra") => {
    if (name === "Comercial" || name === "Administrativo" || name === "Gestao Inteligente") {
      return `${name}-${module}`
    }
    return name
  }, [])

  return (
    <aside className="flex flex-col h-screen w-64 bg-sidebar border-r border-sidebar-border">
      {/* Logo e Seletor de Obra */}
      <div className="border-b border-sidebar-border flex-shrink-0">
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
      </div>

      {/* Navigation - overflow-y-auto para scroll quando necessario */}
      <nav className="flex-1 overflow-y-auto py-2">
        {/* Modulo Corporativo */}
        <div className="px-3 mb-1">
          <span className="text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
            Modulo Corporativo
          </span>
        </div>

        {corporativoNavigation.map((section) => {
          const menuKey = getMenuKey(section.name, "corp")
          const isOpen = expandedMenus[menuKey]

          return (
            <div key={menuKey}>
              <button
                type="button"
                onClick={() => handleToggle(menuKey)}
                className="flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <div className="flex items-center gap-2">
                  <section.icon className="w-4 h-4 text-sidebar-foreground/70" />
                  <span>{section.name}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-sidebar-foreground/50 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                {section.submenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 pl-9 text-sm transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
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
          const isOpen = expandedMenus[menuKey]

          return (
            <div key={menuKey}>
              <button
                type="button"
                onClick={() => handleToggle(menuKey)}
                className="flex items-center justify-between w-full px-3 py-1.5 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <div className="flex items-center gap-2">
                  <dept.icon className="w-4 h-4 text-sidebar-foreground/70" />
                  <span>{dept.name}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-sidebar-foreground/50 transition-transform duration-200",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                {dept.submenu.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 pl-9 text-sm transition-colors",
                      isActive(item.href)
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
