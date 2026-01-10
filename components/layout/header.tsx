"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  title: string
  subtitle?: string
  description?: string
}

export function Header({ title, subtitle, description }: HeaderProps) {
  // Use subtitle se fornecido, senão description (retrocompatibilidade)
  const secondaryText = subtitle || description

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-background">
      <div className="min-h-[40px] flex flex-col justify-center">
        <h1 className="text-lg font-semibold text-foreground leading-tight">{title}</h1>
        {secondaryText && (
          <p className="text-xs text-muted-foreground leading-tight mt-0.5">{secondaryText}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Buscar..." className="w-64 pl-9 bg-muted/50" />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>
      </div>
    </header>
  )
}
