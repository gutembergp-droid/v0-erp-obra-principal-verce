"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  TrendingUp,
  DollarSign,
  Hexagon,
} from "lucide-react"

const cockpitTabs = [
  { id: "geral", label: "Geral", icon: LayoutDashboard, href: "/obra/gerencial/cockpit" },
  { id: "contrato", label: "Contrato", icon: FileText, href: "/obra/gerencial/cockpit/visao-contrato" },
  { id: "performance", label: "Performance", icon: TrendingUp, href: "/obra/gerencial/cockpit/visao-performance" },
  { id: "financeiro", label: "Financeiro", icon: DollarSign, href: "/obra/gerencial/cockpit/visao-financeiro" },
  { id: "prisma", label: "Prisma", icon: Hexagon, href: "/obra/gerencial/cockpit/prism-demo" },
]

export function CockpitTabsNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) => {
    if (href === "/obra/gerencial/cockpit") {
      return pathname === href
    }
    return pathname?.startsWith(href)
  }

  return (
    <div className="flex items-end relative pb-0 border-b border-border/40 bg-gradient-to-b from-muted/20 to-transparent px-[10px] overflow-hidden border-0">
      <div className="w-[calc(100%-32px)] ml-4 px-[10px] overflow-hidden border-0">
        <nav 
          className="flex items-center gap-0 overflow-x-hidden border-0" 
          style={{ border: 'none', boxShadow: 'none' }}
        >
          {cockpitTabs.map((tab) => {
            const Icon = tab.icon
            const active = isActive(tab.href)
            
            return (
              <button
                key={tab.id}
                onClick={() => router.push(tab.href)}
                className={cn(
                  "group relative px-4 py-3 text-sm font-bold whitespace-nowrap transition-all duration-200 ease-in-out flex items-center gap-2",
                  active
                    ? "bg-background text-primary font-bold z-30 pb-3 scale-105 py-3 border-0 outline-none"
                    : "bg-muted/20 text-muted-foreground/50 font-bold hover:bg-background hover:text-foreground hover:shadow-[0_6px_20px_rgba(0,0,0,0.25),0_3px_10px_rgba(0,0,0,0.15),0_1px_4px_rgba(0,0,0,0.1)] hover:scale-[1.03] hover:-translate-y-[2px] border-0 outline-none"
                )}
                style={{
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
                  boxShadow: active
                    ? "0 8px 24px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.1)"
                    : undefined,
                }}
              >
                {/* Borda visual */}
                <div 
                  className="absolute inset-0 pointer-events-none rounded-t-[8px]"
                  style={{
                    border: active ? '3px solid hsl(var(--primary))' : '1px solid rgba(0, 0, 0, 0.1)',
                    borderBottom: 'none',
                    opacity: active ? '1' : '0',
                    clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)",
                  }}
                />

                {/* Camuflagem da linha horizontal */}
                {active && (
                  <div 
                    className="absolute left-0 right-0 h-[4px] bg-background"
                    style={{ bottom: '-2px' }}
                  />
                )}

                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
