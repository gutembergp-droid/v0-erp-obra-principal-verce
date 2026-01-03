"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  Landmark,
  FolderOpen,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Briefcase,
  Calculator,
  Package,
  ClipboardCheck,
  ShieldCheck,
  Leaf,
  Wallet,
  BarChart3,
  HardHat,
  Wrench,
  CalendarDays,
  Factory,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Estrutura conforme Memorial Descritivo Oficial
const corporativoNav = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clientes", href: "/corporativo/clientes", icon: Users },
  { name: "Contratos", href: "/corporativo/contratos", icon: FileText },
  { name: "Centros de Custo", href: "/corporativo/centros-custo", icon: Landmark },
  { name: "Planilhas Analíticas", href: "/corporativo/planilhas", icon: FolderOpen },
  { name: "Obras", href: "/corporativo/obras", icon: Building2 },
  { name: "Usuários", href: "/corporativo/usuarios", icon: Users },
  { name: "Configurações", href: "/corporativo/configuracoes", icon: Settings },
]

const obraNav = [
  { name: "Comercial", href: "/obra/comercial", icon: Briefcase },
  { name: "Engenharia", href: "/obra/engenharia", icon: Wrench },
  { name: "Planejamento", href: "/obra/planejamento", icon: CalendarDays },
  { name: "Produção", href: "/obra/producao", icon: Factory },
  { name: "Suprimentos", href: "/obra/suprimentos", icon: Package },
  { name: "Custos", href: "/obra/custos", icon: Calculator },
  { name: "Qualidade", href: "/obra/qualidade", icon: ClipboardCheck },
  { name: "SST", href: "/obra/sst", icon: ShieldCheck },
  { name: "Meio Ambiente", href: "/obra/meio-ambiente", icon: Leaf },
  { name: "Financeiro", href: "/obra/financeiro", icon: Wallet },
  { name: "Gerencial", href: "/obra/gerencial", icon: BarChart3 },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const [corporativoOpen, setCorporativoOpen] = useState(true)
  const [obraOpen, setObraOpen] = useState(true)

  const isActive = (href: string) => pathname === href

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
          <HardHat className="w-6 h-6 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-semibold text-sidebar-foreground">GENESIS</span>
            <span className="text-xs text-muted-foreground">ERP de Obras</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
        {/* Módulo Corporativo */}
        <Collapsible open={corporativoOpen && !collapsed} onOpenChange={setCorporativoOpen}>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
                "text-primary hover:bg-sidebar-accent",
                collapsed && "justify-center",
              )}
            >
              <Landmark className="w-4 h-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">Corporativo</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", corporativoOpen && "rotate-180")} />
                </>
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {corporativoNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center",
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Módulo Obra */}
        <Collapsible open={obraOpen && !collapsed} onOpenChange={setObraOpen}>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors",
                "text-chart-2 hover:bg-sidebar-accent",
                collapsed && "justify-center",
              )}
            >
              <Building2 className="w-4 h-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">Obra</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform", obraOpen && "rotate-180")} />
                </>
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {obraNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center",
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </nav>

      {/* Collapse Button */}
      <div className="px-2 py-2 border-t border-sidebar-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center text-muted-foreground hover:text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              <span>Recolher</span>
            </>
          )}
        </Button>
      </div>

      {/* User */}
      <div className="px-2 py-3 border-t border-sidebar-border">
        <div className={cn("flex items-center gap-3 px-3 py-2 rounded-lg", collapsed ? "justify-center" : "")}>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">{user?.nome?.charAt(0) || "U"}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-sidebar-foreground">{user?.nome || "Usuário"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.cargo || "Cargo"}</p>
            </div>
          )}
          {!collapsed && (
            <Button
              variant="ghost"
              size="icon"
              className="flex-shrink-0 text-muted-foreground hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  )
}
