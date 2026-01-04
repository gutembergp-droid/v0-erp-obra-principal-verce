"use client"

import { useState } from "react"
import {
  Star,
  FileText,
  Calendar,
  MessageSquare,
  Home,
  GraduationCap,
  HelpCircle,
  Bot,
  Sun,
  Moon,
  Bell,
  Settings,
  User,
  LogOut,
  Shield,
  Palette,
  Languages,
  ChevronDown,
  Circle,
  Clock,
  MinusCircle,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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

const statusOptions = [
  { label: "Disponivel", icon: Circle, color: "text-green-500", bg: "bg-green-500" },
  { label: "Ocupado", icon: MinusCircle, color: "text-red-500", bg: "bg-red-500" },
  { label: "Ausente", icon: Clock, color: "text-amber-500", bg: "bg-amber-500" },
  { label: "Nao Perturbe", icon: XCircle, color: "text-gray-500", bg: "bg-gray-500" },
]

export function Topbar() {
  const pathname = usePathname()
  const [currentStatus, setCurrentStatus] = useState(statusOptions[0])
  const [isDarkMode, setIsDarkMode] = useState(false)

  const getBreadcrumb = () => {
    const parts = pathname.split("/").filter(Boolean)
    if (parts.length === 0) return "Intranet"
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")).join(" / ")
  }

  return (
    <header className="flex items-center justify-between h-14 px-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:text-white">
      {/* Parte 1: Breadcrumb/Contexto */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-500 dark:text-gray-400">{getBreadcrumb()}</span>
        <span className="text-gray-300 dark:text-gray-500">/</span>
        <span className="text-gray-900 dark:text-white font-medium">Dashboard da Obra</span>
      </div>

      {/* Parte 2: Ações Rápidas */}
      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 rounded-lg p-1">
        {acoesRapidas.map((acao, index) => (
          <Button
            key={acao.label}
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              index === 4 && "bg-amber-700 text-white hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700",
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
        <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
          <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>28°C</span>
        </div>

        {/* Tema */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </Button>

        {/* Notificações */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Nova requisição pendente</span>
              <span className="text-xs text-muted-foreground">Há 5 minutos</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Medição aprovada</span>
              <span className="text-xs text-muted-foreground">Há 1 hora</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <span className="font-medium">Novo comentário no RDO</span>
              <span className="text-xs text-muted-foreground">Há 2 horas</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center justify-center text-amber-700 font-medium">
              Ver todas as notificações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-auto py-1.5 px-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg"
            >
              <div className="relative">
                <Avatar className="w-8 h-8 border-2 border-amber-600 dark:border-amber-500">
                  <AvatarImage src="/placeholder-user.png" />
                  <AvatarFallback className="bg-amber-600 dark:bg-amber-500 text-white dark:text-gray-900 text-sm font-medium">
                    AD
                  </AvatarFallback>
                </Avatar>
                {/* Indicador de status */}
                <span
                  className={cn(
                    "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white",
                    currentStatus.bg,
                  )}
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-gray-700 dark:text-white">Administrador</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{currentStatus.label}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {/* Cabeçalho do perfil */}
            <div className="px-3 py-4 border-b dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-amber-600 dark:border-amber-500">
                  <AvatarImage src="/placeholder-user.png" />
                  <AvatarFallback className="bg-amber-600 dark:bg-amber-500 text-white dark:text-gray-900 font-medium">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Administrador</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">admin@genesis.com</p>
                  <p className="text-xs text-amber-700 dark:text-amber-500 font-medium">Gerente de Projeto</p>
                </div>
              </div>
            </div>

            {/* Status */}
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="py-2.5">
                  <currentStatus.icon className={cn("w-4 h-4 mr-2", currentStatus.color)} />
                  <span>Status: {currentStatus.label}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {statusOptions.map((status) => (
                      <DropdownMenuItem key={status.label} onClick={() => setCurrentStatus(status)} className="py-2">
                        <status.icon className={cn("w-4 h-4 mr-2", status.color)} />
                        <span>{status.label}</span>
                        {currentStatus.label === status.label && (
                          <span className="ml-auto text-amber-700 dark:text-amber-500">●</span>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Opções do perfil */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="py-2.5">
                <User className="w-4 h-4 mr-2" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5">
                <Settings className="w-4 h-4 mr-2" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5">
                <Shield className="w-4 h-4 mr-2" />
                <span>Privacidade e Segurança</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Preferências */}
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="py-2.5">
                  <Palette className="w-4 h-4 mr-2" />
                  <span>Aparência</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setIsDarkMode(false)}>
                      <Sun className="w-4 h-4 mr-2" />
                      <span>Modo Claro</span>
                      {!isDarkMode && <span className="ml-auto text-amber-700 dark:text-amber-500">●</span>}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsDarkMode(true)}>
                      <Moon className="w-4 h-4 mr-2" />
                      <span>Modo Escuro</span>
                      {isDarkMode && <span className="ml-auto text-amber-700 dark:text-amber-500">●</span>}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="py-2.5">
                  <Languages className="w-4 h-4 mr-2" />
                  <span>Idioma</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <span>Português (Brasil)</span>
                      <span className="ml-auto text-amber-700 dark:text-amber-500">●</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Inglês</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Espanhol</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem className="py-2.5 text-red-600 dark:text-red-500 focus:text-red-600 dark:focus:text-red-500 focus:bg-red-50 dark:focus:bg-gray-700">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sair do Sistema</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
