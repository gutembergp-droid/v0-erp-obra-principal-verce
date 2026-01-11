"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Target,
  LineChart,
  CheckSquare,
  Users,
  Building2,
} from "lucide-react"

const estrategicoNavigation = [
  { name: "Visão Geral", href: "/corporativo/estrategico", icon: LayoutDashboard },
  { name: "Planejamento", href: "/corporativo/estrategico/planejamento", icon: Target },
  { name: "Analytics", href: "/corporativo/estrategico/analytics", icon: LineChart },
  { name: "Controladoria", href: "/corporativo/estrategico/controladoria", icon: CheckSquare },
  { name: "Catraca", href: "/corporativo/estrategico/catraca", icon: Users },
]

export function EstrategicoNavbar() {
  const pathname = usePathname()

  return (
    <div className="flex items-end relative pb-0 px-[10px] overflow-hidden bg-gradient-to-b from-muted/20 to-transparent border-b border-border/40">
      <div className="w-[calc(100%-32px)] ml-4 px-[10px] overflow-hidden">
        <nav className="flex items-end justify-start gap-1 pt-3 pb-0 overflow-hidden relative z-10" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {estrategicoNavigation.map((item) => {
            const Icon = item.icon
            
            let isActive = false
            if (item.href === "/corporativo/estrategico") {
              isActive = pathname === "/corporativo/estrategico"
            } else {
              isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            }
            
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
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/5 pointer-events-none"
                    style={{
                      clipPath: 'polygon(6px 0, calc(100% - 20px) 0, calc(100% - 12px) 8px, 100% 100%, 100% calc(100% + 2px), 0 calc(100% + 2px), 0 6px)'
                    }}
                  />
                )}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                  style={{
                    clipPath: 'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%, 0 8px)'
                  }}
                />
                {isActive && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-[4px] bg-background pointer-events-none z-40"
                    style={{
                      bottom: '-2px'
                    }}
                  />
                )}
              </Link>
            )
          })}
        </nav>
      </div>
      <style jsx>{`
        nav::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
