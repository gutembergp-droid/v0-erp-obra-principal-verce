"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, ShieldCheck, Fingerprint, BarChart3, FileSpreadsheet, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  hasSubmenu?: boolean
  submenu?: { name: string; href: string }[]
}

const getNavItems = (baseUrl: string): NavItem[] => [
  { name: "Visão Geral", href: `${baseUrl}`, icon: LayoutDashboard },
  { name: "Pessoas", href: `${baseUrl}/pessoas`, icon: Users },
  { name: "Conformidade", href: `${baseUrl}/conformidade`, icon: ShieldCheck },
  { name: "Ponto", href: `${baseUrl}/ponto`, icon: Fingerprint },
  {
    name: "Consolidação",
    href: `${baseUrl}/consolidacao`,
    icon: FileSpreadsheet,
    hasSubmenu: true,
    submenu: [
      { name: "Prévia de Folha", href: `${baseUrl}/consolidacao` },
      { name: "Recebimento Folha", href: `${baseUrl}/consolidacao/recebimento` },
      { name: "Provisão Folha", href: `${baseUrl}/consolidacao/provisao` },
    ],
  },
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
    if (href === pathname) return true
    if (href === baseUrl) {
      return pathname === baseUrl
    }
    if (pathname.startsWith(href + "/")) return true
    return false
  }

  const isSubmenuActive = (item: NavItem) => {
    if (!item.submenu) return false
    return item.submenu.some((sub) => pathname === sub.href || pathname.startsWith(sub.href + "/"))
  }

  const currentItem = navItems.find((item) => {
    if (item.hasSubmenu) {
      return isSubmenuActive(item)
    }
    return isActive(item.href)
  })

  const currentSubmenuItem = currentItem?.submenu?.find(
    (sub) => pathname === sub.href || pathname.startsWith(sub.href + "/"),
  )

  const moduloLabel = modulo === "obra" ? "RH Obra" : "RH Corporativo"

  return (
    <div className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50 h-[72px] min-h-[72px] max-h-[72px]">
      <div className="h-full flex flex-col justify-center">
        {/* Breadcrumb */}
        <div className="px-4 h-[24px] flex items-center">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{moduloLabel}</span>
            {currentItem && (
              <>
                <span>/</span>
                <span className={cn(currentSubmenuItem ? "text-muted-foreground" : "text-foreground font-medium")}>
                  {currentItem.name}
                </span>
                {currentSubmenuItem && (
                  <>
                    <span>/</span>
                    <span className="text-foreground font-medium">{currentSubmenuItem.name}</span>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Menu horizontal */}
        <div className="flex items-center gap-1 px-4 h-[48px] overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {navItems.map((item) => {
            const active = item.hasSubmenu ? isSubmenuActive(item) : isActive(item.href)

            if (item.hasSubmenu && item.submenu) {
              return (
                <DropdownMenu key={item.href}>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all h-[36px]",
                        active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted",
                      )}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.name}</span>
                      <ChevronDown className="w-3 h-3 flex-shrink-0" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.submenu.map((sub) => (
                      <DropdownMenuItem key={sub.href} asChild>
                        <Link
                          href={sub.href}
                          className={cn("w-full cursor-pointer", pathname === sub.href && "bg-muted font-medium")}
                        >
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            // Item normal sem submenu
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all h-[36px]",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
