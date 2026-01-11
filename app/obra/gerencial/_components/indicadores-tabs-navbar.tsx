"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileCheck,
  DollarSign,
  AlertTriangle,
  Package,
  TrendingUp,
  Calculator,
  Network,
} from "lucide-react"

const indicadoresTabsNavigation = [
  { name: "Geral", href: "/obra/gerencial/indicadores", icon: LayoutDashboard },
  { name: "Contratual", href: "/obra/gerencial/indicadores/analise-contratual", icon: FileCheck },
  { name: "Financeira", href: "/obra/gerencial/indicadores/analise-financeira", icon: DollarSign },
  { name: "Risco", href: "/obra/gerencial/indicadores/analise-risco", icon: AlertTriangle },
  { name: "Suprimentos", href: "/obra/gerencial/indicadores/analise-suprimentos", icon: Package },
  { name: "Econômico", href: "/obra/gerencial/indicadores/resultado-economico", icon: Calculator },
  { name: "Performance", href: "/obra/gerencial/indicadores/performance", icon: TrendingUp },
  { name: "Cenários", href: "/obra/gerencial/indicadores/cenarios", icon: Network },
]

export function IndicadoresTabsNavbar() {
  const pathname = usePathname()

  return (
    <div className="flex items-end relative pb-0 px-[10px] overflow-hidden border-b border-border/40 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="w-[calc(100%-32px)] ml-4 px-[10px] overflow-hidden">
        <nav className="flex items-end justify-start gap-1 pt-3 pb-0 overflow-hidden relative z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {indicadoresTabsNavigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/obra/gerencial/indicadores" && pathname?.startsWith(item.href))

            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  clipPath: isActive
                    ? 'polygon(6px 0, calc(100% - 20px) 0, calc(100% - 12px) 8px, 100% 100%, 100% calc(100% + 2px), 0 calc(100% + 2px), 0 6px)'
                    : 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%, 0 8px)',
                  boxShadow: isActive
                    ? '0 -3px 12px rgba(0, 0, 0, 0.12), -3px 0 10px rgba(0, 0, 0, 0.15), 4px 0 12px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(0, 0, 0, 0.18)'
                    : 'none'
                }}
                className={cn(
                  "group relative flex items-center gap-2 px-5 py-3 text-sm font-bold whitespace-nowrap",
                  "transition-all duration-300 ease-out border-0 outline-none",
                  isActive
                    ? "bg-background text-primary z-30 pb-3 scale-105"
                    : "bg-muted/20 text-muted-foreground/50 hover:bg-muted/40 hover:text-muted-foreground hover:shadow-[0_6px_20px_rgba(0,0,0,0.25),0_3px_10px_rgba(0,0,0,0.15),0_1px_4px_rgba(0,0,0,0.1)] hover:scale-[1.03] hover:-translate-y-[2px]"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 pointer-events-none transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                  )}
                  style={{
                    clipPath: isActive
                      ? 'polygon(6px 0, calc(100% - 20px) 0, calc(100% - 12px) 8px, 100% 100%, 100% calc(100% + 2px), 0 calc(100% + 2px), 0 6px)'
                      : 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%, 0 8px)',
                    border: isActive ? '3px solid hsl(var(--primary))' : '1px solid rgba(0, 0, 0, 0.1)',
                    borderBottom: 'none'
                  }}
                />
                <Icon
                  className={cn(
                    "w-4 h-4 transition-all duration-200 relative z-10",
                    isActive
                      ? "text-primary scale-110"
                      : "text-muted-foreground group-hover:text-primary group-hover:scale-105"
                  )}
                />
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <>
                    <div
                      className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 pointer-events-none"
                      style={{
                        clipPath: 'polygon(6px 0, calc(100% - 20px) 0, calc(100% - 12px) 8px, 100% 100%, 100% calc(100% + 2px), 0 calc(100% + 2px), 0 6px)'
                      }}
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[4px] bg-background pointer-events-none z-40"
                      style={{ bottom: '-2px' }}
                    />
                  </>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
