"use client"

import { Star, FileText, Calendar, MessageSquare, Home, GraduationCap, HelpCircle, Bot, Sun, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

// Parte 1: Breadcrumb/Contexto
// Parte 2: 6 Ações Rápidas
// Parte 3: Avatar/Status

const acoesRapidas = [
  { icon: Star, label: "Favoritos", href: "#" },
  { icon: FileText, label: "Requisicao", href: "#" },
  { icon: Calendar, label: "Calendario", href: "#" },
  { icon: MessageSquare, label: "Chat e Video", href: "#" },
  { icon: Home, label: "Home", href: "/intranet" },
  { icon: GraduationCap, label: "Treinamento", href: "#" },
  { icon: HelpCircle, label: "Suporte", href: "#" },
  { icon: Bot, label: "Assistente IA", href: "#" },
]

export function Topbar() {
  const pathname = usePathname()

  // Gerar breadcrumb baseado no pathname
  const getBreadcrumb = () => {
    const parts = pathname.split("/").filter(Boolean)
    if (parts.length === 0) return "Intranet"
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")).join(" / ")
  }

  return (
    <header className="flex items-center justify-between h-14 px-4 bg-white border-b border-gray-200">
      {/* Parte 1: Breadcrumb/Contexto */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500">{getBreadcrumb()}</span>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">Dashboard da Obra</span>
      </div>

      {/* Parte 2: Ações Rápidas */}
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {acoesRapidas.map((acao, index) => (
          <Button
            key={acao.label}
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              index === 4 && "bg-amber-700 text-white hover:bg-amber-800", // Home destacado
            )}
            title={acao.label}
          >
            <acao.icon className="w-4 h-4" />
          </Button>
        ))}
      </div>

      {/* Parte 3: Status e Avatar */}
      <div className="flex items-center gap-3">
        {/* Temperatura/Clima */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Sun className="w-4 h-4 text-amber-500" />
          <span>28°C</span>
        </div>

        {/* Tema */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Sun className="w-4 h-4" />
        </Button>

        {/* Notificações */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">U</span>
          </div>
          <span className="text-sm font-medium text-gray-700">Usuário</span>
        </div>
      </div>
    </header>
  )
}
