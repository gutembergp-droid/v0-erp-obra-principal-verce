"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Briefcase, Gift, Award, ShieldCheck, Fingerprint, BarChart3 } from "lucide-react"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const getNavItems = (baseUrl: string): NavItem[] => [
  { name: "Visão Geral", href: `${baseUrl}`, icon: LayoutDashboard },
  { name: "Pessoas", href: `${baseUrl}/pessoas`, icon: Users },
  { name: "Cargos & Salários", href: `${baseUrl}/cargos-salarios`, icon: Briefcase },
  { name: "Benefícios", href: `${baseUrl}/beneficios`, icon: Gift },
  { name: "Prêmios & Bonificações", href: `${baseUrl}/premios`, icon: Award },
  { name: "Conformidade", href: `${baseUrl}/conformidade`, icon: ShieldCheck },
  { name: "Ponto", href: `${baseUrl}/ponto`, icon: Fingerprint },
  { name: "People Analytics", href: `${baseUrl}/analytics`, icon: BarChart3 },
]

interface RHNavProps {
  modulo: "obra" | "corporativo"
}

export function RHNav({ modulo }: RHNavProps) {
  const pathname = usePathname()
  const baseUrl = modulo === "obra" ? "/obra/administrativo/rh" : "/corporativo/administrativo/rh"
  const navItems = getNavItems(baseUrl)

  const isActive = (href: string) => {
    // Exatamente a rota
    if (href === pathname) return true

    // Visao Geral so fica ativa se for exatamente a rota base
    if (href === baseUrl) {
      return pathname === baseUrl
    }

    // Sub-rotas (ex: /pessoas/prontuario)
    if (pathname.startsWith(href + "/")) return true

    return false
  }

  // Breadcrumb
  const currentItem = navItems.find((item) => isActive(item.href))
  const moduloLabel = modulo === "obra" ? "RH Obra" : "RH Corporativo"

  return (
    <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      {/* Breadcrumb */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{moduloLabel}</span>
          {currentItem && (
            <>
              <span>/</span>
              <span className="text-foreground font-medium">{currentItem.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Menu horizontal */}
      <div className="flex items-center gap-1 px-4 py-2 overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
