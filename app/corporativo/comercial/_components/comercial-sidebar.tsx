"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  Building2,
  FolderKanban,
  Briefcase,
  Target,
  PieChart,
  Briefcase as BriefcaseIcon,
} from "lucide-react"

// ============================================================================
// NAVEGAÇÃO DO COMERCIAL
// ============================================================================

const comercialNavigation = [
  { name: "Visão Geral", href: "/corporativo/comercial", icon: LayoutDashboard },
  { name: "Propostas", href: "/corporativo/comercial/propostas", icon: FileText },
  { name: "Clientes & CRM", href: "/corporativo/comercial/clientes", icon: Building2 },
  { name: "Contratos", href: "/corporativo/comercial/contratos", icon: FolderKanban },
  { name: "Portfolio de Obras", href: "/corporativo/comercial/portfolio", icon: Briefcase },
  { name: "Abertura de CC", href: "/corporativo/comercial/abertura-cc", icon: Target },
  { name: "Analytics", href: "/corporativo/comercial/analytics", icon: PieChart },
]

// ============================================================================
// INTERFACE
// ============================================================================

interface ComercialSidebarProps {
  usuario?: {
    nome: string
    cargo: string
    avatar: string
  }
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ComercialSidebar({ usuario }: ComercialSidebarProps) {
  const pathname = usePathname()

  const usuarioPadrao = usuario || {
    nome: "João Silva",
    cargo: "Gerente Comercial",
    avatar: "JS",
  }

  return (
    <aside className="w-56 bg-background border-r flex flex-col">
      {/* Header */}
      <div className="p-3 border-b">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
            <BriefcaseIcon className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Comercial</h1>
            <p className="text-[10px] text-muted-foreground">Corporativo</p>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <ScrollArea className="flex-1 py-1">
        <nav className="px-2 space-y-0.5">
          {comercialNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-2 py-1.5 rounded text-xs transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer com usuário */}
      <div className="p-2 border-t">
        <div className="flex items-center gap-2 px-2 py-1">
          <Avatar className="w-6 h-6">
            <AvatarFallback className="bg-primary/10 text-primary text-[10px]">
              {usuarioPadrao.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{usuarioPadrao.nome}</p>
            <p className="text-[10px] text-muted-foreground truncate">{usuarioPadrao.cargo}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
