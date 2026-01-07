"use client"

import { Header } from "@/components/layout/header"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useTheme, colorThemeNames, colorThemeDescriptions } from "@/contexts/theme-context"
import { Sun, Moon, Check, Settings, Palette, Monitor } from "lucide-react"

type ColorTheme = "aahbrant" | "mono" | "acro" | "dourado"

const colorThemePreviews: Record<ColorTheme, { primary: string; sidebar: string; accent: string }> = {
  aahbrant: { primary: "#8B2635", sidebar: "#1F1614", accent: "#F5F0EB" },
  mono: { primary: "#3A4A5C", sidebar: "#0A1015", accent: "#E8ECF0" },
  acro: { primary: "#000000", sidebar: "#000000", accent: "#FFFFFF" },
  dourado: { primary: "#8B2635", sidebar: "#2A1F1A", accent: "#D4AF37" },
}

export default function ConfiguracoesPage() {
  const { theme, colorTheme, setTheme, setColorTheme } = useTheme()

  return (
    <>
      <Header
        title="Configuracoes"
        description="Personalizacao e preferencias do sistema"
        rightContent={
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="gap-1">
              <Settings className="w-3 h-3" />
              ADM
            </Badge>
            <InfoTooltip
              title="Configuracoes do Sistema"
              description="Personalize a aparencia e comportamento do GENESIS de acordo com suas preferencias."
            />
          </div>
        }
      />

      <div className="p-6 space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Monitor className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Display</h2>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">(Claro / Escuro)</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Alterne entre modo claro e escuro. Esta opcao funciona com qualquer tema escolhido.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {/* Modo Claro */}
            <button
              onClick={() => setTheme("light")}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                theme === "light" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Sun className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium">Claro</p>
                  <p className="text-xs text-muted-foreground">Ideal para ambientes iluminados</p>
                </div>
              </div>
              {/* Preview */}
              <div className="h-16 rounded bg-secondary border border-border flex overflow-hidden">
                <div className="w-8 bg-foreground/90" />
                <div className="flex-1 p-2">
                  <div className="h-2 w-12 bg-muted-foreground/30 rounded mb-1" />
                  <div className="h-2 w-20 bg-muted rounded" />
                </div>
              </div>
              {theme === "light" && (
                <div className="absolute top-3 right-3">
                  <Check className="w-5 h-5 text-primary" />
                </div>
              )}
            </button>

            {/* Modo Escuro */}
            <button
              onClick={() => setTheme("dark")}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                theme === "dark" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Moon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="font-medium">Escuro</p>
                  <p className="text-xs text-muted-foreground">Reduz fadiga visual</p>
                </div>
              </div>
              {/* Preview */}
              <div className="h-16 rounded bg-foreground/90 border border-foreground/20 flex overflow-hidden">
                <div className="w-8 bg-foreground/95" />
                <div className="flex-1 p-2">
                  <div className="h-2 w-12 bg-background/30 rounded mb-1" />
                  <div className="h-2 w-20 bg-background/20 rounded" />
                </div>
              </div>
              {theme === "dark" && (
                <div className="absolute top-3 right-3">
                  <Check className="w-5 h-5 text-primary" />
                </div>
              )}
            </button>
          </div>
        </section>

        {/* Divisor */}
        <div className="border-t" />

        <section>
          <div className="flex items-center gap-2 mb-2">
            <Palette className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Tema</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Escolha o tema de cores do sistema. Todos os temas funcionam tanto no display claro quanto no escuro.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(colorThemeNames) as ColorTheme[]).map((key) => {
              const preview = colorThemePreviews[key]
              const isSelected = colorTheme === key

              return (
                <button
                  key={key}
                  onClick={() => setColorTheme(key)}
                  className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                    isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    {/* Preview de cores */}
                    <div className="flex -space-x-1">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-background"
                        style={{ backgroundColor: preview.primary }}
                      />
                      <div
                        className="w-6 h-6 rounded-full border-2 border-background"
                        style={{ backgroundColor: preview.sidebar }}
                      />
                      <div
                        className="w-6 h-6 rounded-full border-2 border-background"
                        style={{ backgroundColor: preview.accent }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{colorThemeNames[key]}</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">{colorThemeDescriptions[key]}</p>

                  {/* Preview visual */}
                  <div className="mt-3 h-12 rounded overflow-hidden flex border border-border">
                    <div className="w-6" style={{ backgroundColor: preview.sidebar }} />
                    <div
                      className="flex-1 p-1.5"
                      style={{
                        backgroundColor: key === "mono" ? "#E8ECF0" : key === "acro" ? "#FFFFFF" : "#FAF8F5",
                      }}
                    >
                      <div className="h-1.5 w-8 rounded mb-1" style={{ backgroundColor: preview.primary }} />
                      <div
                        className="h-1.5 w-12 rounded"
                        style={{
                          backgroundColor: preview.accent,
                          opacity: key === "mono" || key === "acro" ? 0.3 : 1,
                        }}
                      />
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </section>

        {/* Divisor */}
        <div className="border-t" />

        <section className="bg-muted/50 rounded-lg p-4">
          <h3 className="font-medium mb-3">Combinacao Atual</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tema:</span>
              <Badge variant="outline">{colorThemeNames[colorTheme as ColorTheme]}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Display:</span>
              <Badge variant="outline">{theme === "light" ? "Claro" : "Escuro"}</Badge>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">As preferencias sao salvas automaticamente no navegador.</p>
        </section>

        {/* Botao Resetar */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => {
              setTheme("light")
              setColorTheme("aahbrant")
            }}
          >
            Restaurar Padrao
          </Button>
        </div>
      </div>
    </>
  )
}
