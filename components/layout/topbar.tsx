"use client"

import { useState } from "react"
import {
  Star,
  ShoppingCart,
  Calendar,
  MessageSquare,
  Home,
  FileText,
  GraduationCap,
  Bot,
  Headphones,
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
  Check,
  Monitor,
  Cloud,
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTheme } from "@/contexts/theme-context"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const acoesRapidas = [
  { icon: Star, label: "Favoritos", href: "#" },
  { icon: ShoppingCart, label: "Suprimento", href: "#" },
  { icon: Calendar, label: "Calendario", href: "#" },
  { icon: MessageSquare, label: "Chat", href: "#" },
  { icon: Home, label: "Home", href: "/intranet" },
  { icon: FileText, label: "Docs", href: "#" },
  { icon: GraduationCap, label: "Treinamento", href: "#" },
  { icon: Bot, label: "IA", href: "#" },
  { icon: Headphones, label: "Suporte", href: "#" },
]

const statusOptions = [
  { label: "Disponivel", icon: Circle, color: "text-green-500", bg: "bg-green-500" },
  { label: "Ocupado", icon: MinusCircle, color: "text-red-500", bg: "bg-red-500" },
  { label: "Ausente", icon: Clock, color: "text-amber-500", bg: "bg-amber-500" },
  { label: "Nao Perturbe", icon: XCircle, color: "text-gray-500", bg: "bg-gray-500" },
]

const themeOptions = [
  {
    value: "light" as const,
    label: "Claro",
    description: "Tema claro",
    icon: Sun,
    color: "bg-amber-400",
  },
  {
    value: "dark" as const,
    label: "Escuro",
    description: "Tema escuro",
    icon: Moon,
    color: "bg-slate-700",
  },
]

export function Topbar() {
  const pathname = usePathname()
  const [currentStatus, setCurrentStatus] = useState(statusOptions[0])
  const { theme, setTheme, toggleTheme } = useTheme()

  const getBreadcrumb = () => {
    const parts = pathname.split("/").filter(Boolean)
    if (parts.length === 0) return "Intranet"
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")).join(" / ")
  }

  return (
    <TooltipProvider delayDuration={200}>
      <header className="flex items-center justify-between h-[70px] px-4 bg-card border-b border-border">
        {/* Parte 1: Breadcrumb/Contexto */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-foreground/70">{getBreadcrumb()}</span>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium">Dashboard da Obra</span>
        </div>

        {/* Parte 2: Acoes Rapidas */}
        <div className="flex items-center gap-1 bg-secondary/50 border border-border/50 rounded-xl p-2 shadow-sm">
          {acoesRapidas.map((acao, index) => (
            <Tooltip key={acao.label}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-9 w-9 p-0 transition-all duration-200 cursor-pointer rounded-lg",
                    index === 4
                      ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:scale-105"
                      : "text-muted-foreground hover:bg-accent/80 hover:text-foreground hover:scale-105",
                  )}
                >
                  <acao.icon className="w-[18px] h-[18px]" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-popover text-popover-foreground border border-border px-3 py-1.5 text-xs font-medium rounded-md shadow-lg"
              >
                {acao.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Parte 3: Status e Avatar */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Cloud className="w-5 h-5" />
            <span className="font-medium">28°C</span>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 h-9 px-2 bg-secondary border border-border rounded-full cursor-pointer transition-all duration-200 hover:bg-accent"
                aria-label="Alternar tema"
              >
                {/* Sol - lado esquerdo */}
                <div
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300",
                    theme === "light" ? "bg-amber-400 text-white shadow-md" : "text-muted-foreground",
                  )}
                >
                  <Sun className="w-4 h-4" />
                </div>

                {/* Monitor no centro */}
                <Monitor className="w-5 h-5 text-muted-foreground mx-0.5" />

                {/* Lua - lado direito */}
                <div
                  className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300",
                    theme === "dark" ? "bg-slate-600 text-white shadow-md" : "text-muted-foreground",
                  )}
                >
                  <Moon className="w-4 h-4" />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className="bg-popover text-popover-foreground border border-border px-3 py-1.5 text-xs font-medium rounded-md shadow-lg"
            >
              {theme === "light" ? "Mudar para Escuro" : "Mudar para Claro"}
            </TooltipContent>
          </Tooltip>

          {/* Notificacoes */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 relative transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:scale-110 cursor-pointer"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center animate-pulse">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-popover text-popover-foreground border border-border px-3 py-1.5 text-xs font-medium rounded-md shadow-lg"
              >
                Notificacoes
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notificacoes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-accent">
                <span className="font-medium">Nova requisicao pendente</span>
                <span className="text-xs text-muted-foreground">Ha 5 minutos</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-accent">
                <span className="font-medium">Medicao aprovada</span>
                <span className="text-xs text-muted-foreground">Ha 1 hora</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3 cursor-pointer hover:bg-accent">
                <span className="font-medium">Novo comentario no RDO</span>
                <span className="text-xs text-muted-foreground">Ha 2 horas</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-primary font-medium cursor-pointer hover:bg-accent">
                Ver todas as notificacoes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Campo de busca */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-9 h-9 w-52 bg-secondary border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2.5 h-auto py-2 px-2.5 hover:bg-accent rounded-lg transition-all duration-200 cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="w-9 h-9 border-2 border-primary">
                    <AvatarImage src="/placeholder-user.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card",
                      currentStatus.bg,
                    )}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-foreground">Administrador</span>
                  <span className="text-xs text-muted-foreground">{currentStatus.label}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              {/* Cabecalho do perfil */}
              <div className="px-3 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border-2 border-primary">
                    <AvatarImage src="/placeholder-user.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">AD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">Administrador</p>
                    <p className="text-sm text-muted-foreground">admin@genesis.com</p>
                    <p className="text-xs text-primary font-medium">Gerente de Projeto</p>
                  </div>
                </div>
              </div>

              {/* Status */}
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="py-2.5 cursor-pointer">
                    {currentStatus.icon.className && (
                      <currentStatus.icon className={cn("w-4 h-4 mr-2", currentStatus.color)} />
                    )}
                    <span>Status: {currentStatus.label}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {statusOptions.map((status) => (
                        <DropdownMenuItem
                          key={status.label}
                          onClick={() => setCurrentStatus(status)}
                          className="py-2 cursor-pointer"
                        >
                          {status.icon.className && <status.icon className={cn("w-4 h-4 mr-2", status.color)} />}
                          <span>{status.label}</span>
                          {currentStatus.label === status.label && <Check className="w-4 h-4 ml-auto text-primary" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Opcoes do perfil */}
              <DropdownMenuGroup>
                <DropdownMenuItem className="py-2.5 cursor-pointer hover:bg-accent">
                  <User className="w-4 h-4 mr-2" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2.5 cursor-pointer hover:bg-accent">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Configuracoes</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2.5 cursor-pointer hover:bg-accent">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Privacidade e Seguranca</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="py-2.5 cursor-pointer">
                    <Palette className="w-4 h-4 mr-2" />
                    <span>Tema</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-52">
                      {themeOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className="py-3 cursor-pointer flex items-center gap-3"
                        >
                          <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", option.color)}>
                            {option.icon.className && <option.icon className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          </div>
                          {theme === option.value && <Check className="w-4 h-4 ml-auto text-primary" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="py-2.5 cursor-pointer">
                    <Languages className="w-4 h-4 mr-2" />
                    <span>Idioma</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem className="cursor-pointer">
                        <span>Portugues (Brasil)</span>
                        <Check className="w-4 h-4 ml-auto text-primary" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <span>Ingles</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <span>Espanhol</span>
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem className="py-2.5 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sair do Sistema</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  )
}
