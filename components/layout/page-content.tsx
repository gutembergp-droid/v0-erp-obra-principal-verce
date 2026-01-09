import type React from "react"
import { cn } from "@/lib/utils"

interface PageContentProps {
  children: React.ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
  padding?: "none" | "sm" | "md" | "lg"
}

const maxWidthClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[1600px]",
  full: "max-w-full",
}

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
}

export function PageContent({ children, className, maxWidth = "2xl", padding = "md" }: PageContentProps) {
  return (
    <div className={cn("w-full mx-auto", maxWidthClasses[maxWidth], paddingClasses[padding], "space-y-6", className)}>
      {children}
    </div>
  )
}

// Grid padrao para KPIs (4 colunas em desktop)
export function KPIGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>{children}</div>
}

// Grid para 2 colunas
export function Grid2({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>{children}</div>
}

// Grid para 3 colunas
export function Grid3({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", className)}>{children}</div>
}

// Grid flexivel (auto-fit)
export function GridAuto({
  children,
  className,
  minWidth = "280px",
}: {
  children: React.ReactNode
  className?: string
  minWidth?: string
}) {
  return (
    <div
      className={cn("grid gap-4", className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}, 1fr))`,
      }}
    >
      {children}
    </div>
  )
}

// Container para tabelas com scroll horizontal
export function TableContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("w-full overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0", className)}>{children}</div>
}
