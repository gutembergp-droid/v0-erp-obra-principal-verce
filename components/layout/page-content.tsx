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
  sm: "px-2 py-3 sm:px-4 sm:py-4",
  md: "px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6",
  lg: "px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8",
}

export function PageContent({ children, className, maxWidth = "2xl", padding = "md" }: PageContentProps) {
  return (
    <div
      className={cn(
        "w-full mx-auto",
        "px-[var(--container-padding-x)]",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        "space-y-4 sm:space-y-5 md:space-y-6",
        "min-w-0", // Previne overflow horizontal
        className
      )}
    >
      {children}
    </div>
  )
}

// Grid padrao para KPIs (4 colunas em desktop, responsivo)
export function KPIGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "xl:grid-cols-4",
        "gap-3 sm:gap-4 md:gap-5",
        "auto-rows-fr",
        className
      )}
    >
      {children}
    </div>
  )
}

// Grid para 2 colunas
export function Grid2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid",
        "grid-cols-1",
        "md:grid-cols-2",
        "gap-3 sm:gap-4 md:gap-5",
        "auto-rows-fr",
        className
      )}
    >
      {children}
    </div>
  )
}

// Grid para 3 colunas
export function Grid3({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid",
        "grid-cols-1",
        "sm:grid-cols-2",
        "lg:grid-cols-3",
        "gap-3 sm:gap-4 md:gap-5",
        "auto-rows-fr",
        className
      )}
    >
      {children}
    </div>
  )
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
  return (
    <div
      className={cn(
        "w-full",
        "overflow-x-auto",
        "-mx-2 sm:-mx-3 md:-mx-4",
        "px-2 sm:px-3 md:px-4",
        "lg:mx-0 lg:px-0",
        "scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent",
        className
      )}
    >
      {children}
    </div>
  )
}
