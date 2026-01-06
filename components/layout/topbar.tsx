"use client"

import { useState } from "react"
import Link from "next/link"
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
import { useLanguage } from "@/contexts/language-context"

const acoesRapidas = [
  { icon: Star, label: "Favoritos", href: "/favoritos" },
  { icon: ShoppingCart, label: "Suprimento", href: "/obra/comercial/suprimentos" },
  { icon: Calendar, label: "Calendario", href: "/hub?tab=calendar" },
  { icon: MessageSquare, label: "Chat", href: "/hub?tab=chat" },
  { icon: Home, label: "Home", href: "/intranet", isMain: true },
  { icon: FileText, label: "Docs", href: "/documentos" },
  { icon: GraduationCap, label: "Treinamento", href: "/treinamento" },
  { icon: Bot, label: "IA", href: "/hub?tab=ai" },
  { icon: Headphones, label: "Suporte", href: "/suporte" },
]

const statusOptions = [
  { label: "Disponivel", icon: Circle, color: "text-primary", bg: "bg-primary" },
  { label: "Ocupado", icon: MinusCircle, color: "text-destructive", bg: "bg-destructive" },
  { label: "Ausente", icon: Clock, color: "text-accent-foreground", bg: "bg-accent-foreground" },
  { label: "Nao Perturbe", icon: XCircle, color: "text-muted-foreground", bg: "bg-muted-foreground" },
]

const displayOptions = [
  {
    value: "light" as const,
    label: "Claro",
    description: "Fundo claro",
    icon: Sun,
  },
  {
    value: "dark" as const,
    label: "Escuro",
    description: "Fundo escuro",
    icon: Moon,
  },
]

type ColorTheme = "aahbrant" | "mono" | "acro" | "dourado"

const themeColorOptions: { value: ColorTheme; label: string; description: string; colors: string[] }[] = [
  {
    value: "aahbrant",
    label: "Aahbrant",
    description: "Vermelho institucional",
    colors: ["#8B2635", "#1F1614", "#F5F0EB"],
  },
  {
    value: "mono",
    label: "Monocromatico",
    description: "Cinzas frios",
    colors: ["#3A4555", "#1E2530", "#E8ECF0"],
  },
  {
    value: "acro",
    label: "Acromatico",
    description: "Preto e branco puro",
    colors: ["#000000", "#1A1A1A", "#FFFFFF"],
  },
  {
    value: "dourado",
    label: "Aahbrant Dourado",
    description: "Vermelho com dourado",
    colors: ["#8B2635", "#D4AF37", "#2A1F1A"],
  },
]

export function Topbar() {
  const pathname = usePathname()
  const [currentStatus, setCurrentStatus] = useState(statusOptions[0])
  const { theme, colorTheme, setTheme, setColorTheme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const getBreadcrumb = () => {
    const parts = pathname.split("/").filter(Boolean)
    if (parts.length === 0) return "Intranet"
    return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")).join(" / ")
  }

  return (
    <TooltipProvider delayDuration={200}>
      <header className="flex items-center justify-between h-[61px] px-3 bg-card border-b border-border">
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-foreground/70">{getBreadcrumb()}</span>
          <span className="text-border">/</span>
          <span className="text-foreground font-medium">Dashboard da Obra</span>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="inline-flex items-center bg-card/95 backdrop-blur-md border border-border/50 rounded-xl p-1 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1),0_4px_16px_-4px_rgba(0,0,0,0.05)]">
            {acoesRapidas.map((acao, index) => {
              const isHome = index === 4
              return (
                <Tooltip key={acao.label}>
                  <TooltipTrigger asChild>
                    <Link
                      href={acao.href}
                      className={cn(
                        "relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 cursor-pointer",
                        isHome
                          ? "bg-primary text-primary-foreground mx-0.5 shadow-[0_2px_8px_-2px_var(--primary)] hover:shadow-[0_4px_12px_-2px_var(--primary)] hover:brightness-110"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/60",
                      )}
                    >
                      <acao.icon
                        className={cn("w-4 h-4", isHome && "w-[15px] h-[15px]")}
                        strokeWidth={isHome ? 2.5 : 1.8}
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    sideOffset={6}
                    className="bg-foreground text-background px-2 py-0.5 text-[10px] font-medium rounded-md shadow-lg border-0"
                  >
                    {acao.label}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Cloud className="w-3.5 h-3.5" />
            <span className="font-medium text-[10px]">28°C</span>
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-0.5 h-7 px-0.5 bg-accent/40 border border-border/40 rounded-full cursor-pointer transition-all duration-200 hover:bg-accent/60"
                aria-label="Alternar tema"
              >
                <div
                  className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300",
                    theme === "light" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground/60",
                  )}
                >
                  <Sun className="w-3 h-3" />
                </div>

                <Monitor className="w-3 h-3 text-muted-foreground/50 mx-0.5" />

                <div
                  className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-full transition-all duration-300",
                    theme === "dark" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground/60",
                  )}
                >
                  <Moon className="w-3 h-3" />
                </div>
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sideOffset={6}
              className="bg-foreground text-background px-2 py-0.5 text-[10px] font-medium rounded-md shadow-lg border-0"
            >
              {theme === "light" ? "Mudar para Escuro" : "Mudar para Claro"}
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 relative transition-all duration-200 hover:bg-accent/60 cursor-pointer rounded-lg"
                  >
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-primary text-primary-foreground text-[9px] font-semibold rounded-full flex items-center justify-center">
                      3
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                sideOffset={6}
                className="bg-foreground text-background px-2 py-0.5 text-[10px] font-medium rounded-md shadow-lg border-0"
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-1.5 h-auto py-1 px-1.5 hover:bg-accent/60 rounded-lg transition-all duration-200 cursor-pointer"
              >
                <div className="relative">
                  <Avatar className="w-7 h-7 border border-border/50">
                    <AvatarImage src="/placeholder-user.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-[10px] font-semibold">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-card",
                      currentStatus.bg,
                    )}
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] font-semibold text-foreground leading-tight">Administrador</span>
                  <span className="text-[9px] text-muted-foreground leading-tight">{currentStatus.label}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-muted-foreground/70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
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

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="py-2.5 cursor-pointer">
                    <currentStatus.icon className={cn("w-4 h-4 mr-2", currentStatus.color)} />
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
                          <status.icon className={cn("w-4 h-4 mr-2", status.color)} />
                          <span>{status.label}</span>
                          {currentStatus.label === status.label && <Check className="w-4 h-4 ml-auto text-primary" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem className="py-2.5 cursor-pointer hover:bg-accent">
                  <User className="w-4 h-4 mr-2" />
                  <span>{t("menu.profile")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2.5 cursor-pointer hover:bg-accent">
                  <Settings className="w-4 h-4 mr-2" />
                  <span>{t("menu.settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-2.5 cursor-pointer hover:bg-accent">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>{t("menu.privacy")}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="py-2.5 cursor-pointer">
                    <Monitor className="w-4 h-4 mr-2" />
                    <span>{t("menu.display")}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-52">
                      {displayOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setTheme(option.value)}
                          className="py-3 cursor-pointer flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary">
                            <option.icon className="w-3.5 h-3.5 text-primary-foreground" />
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
                    <Palette className="w-4 h-4 mr-2" />
                    <span>{t("menu.theme")}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent className="w-56">
                      {themeColorOptions.map((option) => (
                        <DropdownMenuItem
                          key={option.value}
                          onClick={() => setColorTheme(option.value)}
                          className="py-3 cursor-pointer flex items-center gap-3"
                        >
                          <div className="flex -space-x-1">
                            {option.colors.map((color, i) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-background"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          </div>
                          {colorTheme === option.value && <Check className="w-4 h-4 ml-auto text-primary" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="py-2.5 cursor-pointer">
                    <Languages className="w-4 h-4 mr-2" />
                    <span>{t("menu.language")}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => setLanguage("pt-BR")}>
                        <span>{t("language.pt")}</span>
                        {language === "pt-BR" && <Check className="w-4 h-4 ml-auto text-primary" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => setLanguage("en")}>
                        <span>{t("language.en")}</span>
                        {language === "en" && <Check className="w-4 h-4 ml-auto text-primary" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer" onClick={() => setLanguage("es")}>
                        <span>{t("language.es")}</span>
                        {language === "es" && <Check className="w-4 h-4 ml-auto text-primary" />}
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="py-2.5 text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                <span>{t("menu.logout")}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </TooltipProvider>
  )
}
