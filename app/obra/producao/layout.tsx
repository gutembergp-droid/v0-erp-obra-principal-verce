"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  HardHat,
  LayoutDashboard,
  GitBranch,
  Layers,
  ClipboardList,
  BookOpen,
  Gauge,
  FileCheck,
  Calendar,
  Users,
  Truck,
  ChevronLeft,
  ChevronRight,
  Settings,
  BarChart3,
} from "lucide-react"

const menuItems = [
  {
    title: "Visao Geral",
    href: "/obra/producao",
    icon: LayoutDashboard,
  },
  {
    title: "EAP Detalhada",
    href: "/obra/producao/eap",
    icon: GitBranch,
  },
  {
    title: "PDS/PBS",
    href: "/obra/producao/pds",
    icon: Layers,
  },
  {
    title: "Apropriacao",
    href: "/obra/producao/apropriacao",
    icon: ClipboardList,
  },
  {
    title: "Diario de Obra",
    href: "/obra/producao/diario",
    icon: BookOpen,
  },
  {
    title: "Afericao/Medicao",
    href: "/obra/producao/afericao",
    icon: Gauge,
  },
  {
    title: "Apontamentos",
    href: "/obra/producao/apontamentos",
    icon: FileCheck,
  },
  {
    title: "Campo/Execucao",
    href: "/obra/producao/campo",
    icon: HardHat,
  },
  {
    title: "RDO",
    href: "/obra/producao/rdo",
    icon: Calendar,
  },
  {
    title: "Equipes",
    href: "/obra/producao/equipes",
    icon: Users,
  },
  {
    title: "Equipamentos",
    href: "/obra/producao/equipamentos",
    icon: Truck,
  },
  {
    title: "Fechamento",
    href: "/obra/producao/fechamento",
    icon: BarChart3,
  },
  {
    title: "Parametros",
    href: "/obra/producao/parametros",
    icon: Settings,
  },
]

export default function ProducaoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside
        className={cn(
          "relative flex flex-col border-r bg-amber-950 text-white transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-amber-900 px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-amber-400" />
              <span className="font-semibold text-amber-100">Producao</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-amber-300 hover:bg-amber-900 hover:text-amber-100"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Menu */}
        <ScrollArea className="flex-1 py-2">
          <nav className="flex flex-col gap-1 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 text-amber-200 hover:bg-amber-900 hover:text-white",
                      isActive && "bg-amber-800 text-white",
                      collapsed && "justify-center px-2",
                    )}
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-amber-900 p-4">
            <div className="text-xs text-amber-400">Obra: Rod. BR-101/SC</div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  )
}
