"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  LayoutDashboard,
  FileText,
  BarChart3,
  GitCompare,
  TrendingUp,
  Lightbulb,
  Settings,
  Copy,
  RotateCcw,
  Eye,
  Code,
  Save,
  FolderOpen,
  Trash2,
  Download,
  Plus,
  Check,
  X,
  FileCode,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

interface TemplateConfig {
  // Topbars
  topbarSecundarioAltura: number
  topbarTerciarioAltura: number
  topbarPaddingX: number
  topbarGap: number
  topbarFontSize: number
  topbarIconSize: number
  
  // Sidebar
  sidebarLargura: number
  sidebarPosicao: 'esquerda' | 'direita' | 'ambos' | 'nenhum'
  
  // Moldura
  molduraPadding: number
  molduraRadius: number
  moldurarSombraIntensidade: number
  
  // Conteúdo
  conteudoSpacing: number
  conteudoFontSize: number
}

interface SavedTemplate {
  id: string
  nome: string
  descricao: string
  config: TemplateConfig
  dataCriacao: string
  dataAtualizacao: string
}

const defaultConfig: TemplateConfig = {
  topbarSecundarioAltura: 52,
  topbarTerciarioAltura: 44,
  topbarPaddingX: 24,
  topbarGap: 4,
  topbarFontSize: 14,
  topbarIconSize: 16,
  
  sidebarLargura: 320,
  sidebarPosicao: 'direita',
  
  molduraPadding: 25,
  molduraRadius: 35,
  moldurarSombraIntensidade: 35,
  
  conteudoSpacing: 24,
  conteudoFontSize: 14,
}

// ============================================================================
// STORAGE HELPERS
// ============================================================================

const STORAGE_KEY = 'erp-genesis-templates'

const loadTemplatesFromStorage = (): SavedTemplate[] => {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Erro ao carregar templates:', error)
    return []
  }
}

const saveTemplatesToStorage = (templates: SavedTemplate[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
  } catch (error) {
    console.error('Erro ao salvar templates:', error)
    toast.error('Erro ao salvar no navegador')
  }
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

export default function LayoutsTemplatesPage() {
  const [config, setConfig] = useState<TemplateConfig>(defaultConfig)
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([])
  const [currentTemplateId, setCurrentTemplateId] = useState<string | null>(null)
  const [activeNavItem, setActiveNavItem] = useState("visao-geral")
  const [activeTab, setActiveTab] = useState("tab-1")
  const [showCode, setShowCode] = useState(false)
  
  // Diálogos
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showTemplatesDialog, setShowTemplatesDialog] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<string | null>(null)
  
  // Form de salvamento
  const [newTemplateName, setNewTemplateName] = useState('')
  const [newTemplateDesc, setNewTemplateDesc] = useState('')

  // Carregar templates ao montar
  useEffect(() => {
    const stored = loadTemplatesFromStorage()
    
    // Se não houver templates, criar templates padrão
    if (stored.length === 0) {
      const templatesPadrao: SavedTemplate[] = [
        {
          id: 'template-proposta-comercial',
          nome: 'Template Proposta Comercial',
          descricao: 'Layout padrão para telas de elaboração e análise de propostas comerciais',
          config: {
            topbarSecundarioAltura: 52,
            topbarTerciarioAltura: 44,
            topbarPaddingX: 10,
            topbarGap: 4,
            topbarFontSize: 14,
            topbarIconSize: 16,
            sidebarLargura: 320,
            sidebarPosicao: 'direita',
            molduraPadding: 25,
            molduraRadius: 25,
            moldurarSombraIntensidade: 35,
            conteudoSpacing: 24,
            conteudoFontSize: 14,
          },
          dataCriacao: new Date().toISOString(),
          dataAtualizacao: new Date().toISOString(),
        },
        {
          id: 'template-dashboard-compacto',
          nome: 'Template Dashboard Compacto',
          descricao: 'Layout para dashboards com navegação secundária e sem sidebar',
          config: {
            topbarSecundarioAltura: 48,
            topbarTerciarioAltura: 40,
            topbarPaddingX: 20,
            topbarGap: 3,
            topbarFontSize: 13,
            topbarIconSize: 14,
            sidebarLargura: 0,
            sidebarPosicao: 'nenhum',
            molduraPadding: 20,
            molduraRadius: 6,
            moldurarSombraIntensidade: 10,
            conteudoSpacing: 16,
            conteudoFontSize: 13,
          },
          dataCriacao: new Date().toISOString(),
          dataAtualizacao: new Date().toISOString(),
        },
        {
          id: 'template-full-width',
          nome: 'Template Full Width',
          descricao: 'Layout expansivo para telas com muito conteúdo, sem sidebars',
          config: {
            topbarSecundarioAltura: 56,
            topbarTerciarioAltura: 48,
            topbarPaddingX: 32,
            topbarGap: 6,
            topbarFontSize: 15,
            topbarIconSize: 18,
            sidebarLargura: 0,
            sidebarPosicao: 'nenhum',
            molduraPadding: 32,
            molduraRadius: 10,
            moldurarSombraIntensidade: 15,
            conteudoSpacing: 32,
            conteudoFontSize: 15,
          },
          dataCriacao: new Date().toISOString(),
          dataAtualizacao: new Date().toISOString(),
        },
      ]
      
      setSavedTemplates(templatesPadrao)
      saveTemplatesToStorage(templatesPadrao)
      
      // Carregar automaticamente o template de proposta comercial
      setConfig(templatesPadrao[0].config)
      setCurrentTemplateId(templatesPadrao[0].id)
      toast.success('Templates padrão carregados! Editando: Template Proposta Comercial', {
        duration: 4000,
      })
    } else {
      setSavedTemplates(stored)
    }
  }, [])

  const updateConfig = (key: keyof TemplateConfig, value: number | string) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const resetConfig = () => {
    setConfig(defaultConfig)
    setCurrentTemplateId(null)
    toast.success("Editor limpo! Configuração resetada para valores padrão")
  }

  const saveTemplate = () => {
    if (!newTemplateName.trim()) {
      toast.error('Digite um nome para o template')
      return
    }

    const newTemplate: SavedTemplate = {
      id: Date.now().toString(),
      nome: newTemplateName.trim(),
      descricao: newTemplateDesc.trim(),
      config: { ...config },
      dataCriacao: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
    }

    const updated = [...savedTemplates, newTemplate]
    setSavedTemplates(updated)
    saveTemplatesToStorage(updated)

    setNewTemplateName('')
    setNewTemplateDesc('')
    setShowSaveDialog(false)
    setCurrentTemplateId(newTemplate.id)
    toast.success(`Template "${newTemplate.nome}" salvo com sucesso!`)
  }

  const updateCurrentTemplate = () => {
    if (!currentTemplateId) return
    
    const updated = savedTemplates.map(t => 
      t.id === currentTemplateId 
        ? { ...t, config: { ...config }, dataAtualizacao: new Date().toISOString() }
        : t
    )
    
    setSavedTemplates(updated)
    saveTemplatesToStorage(updated)
    
    const templateName = savedTemplates.find(t => t.id === currentTemplateId)?.nome
    toast.success(`Template "${templateName}" atualizado!`)
  }

  const loadTemplate = (template: SavedTemplate) => {
    setConfig(template.config)
    setCurrentTemplateId(template.id)
    setShowTemplatesDialog(false)
    toast.success(`Template "${template.nome}" carregado!`)
  }

  const deleteTemplate = (id: string) => {
    const template = savedTemplates.find(t => t.id === id)
    const updated = savedTemplates.filter(t => t.id !== id)
    setSavedTemplates(updated)
    saveTemplatesToStorage(updated)
    setTemplateToDelete(null)
    toast.success(`Template "${template?.nome}" deletado`)
  }

  const exportTemplate = (template: SavedTemplate) => {
    const exportData = JSON.stringify(template, null, 2)
    const blob = new Blob([exportData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `template-${template.nome.toLowerCase().replace(/\s+/g, '-')}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Template exportado!')
  }

  const copyTailwindClasses = () => {
    const classes = `
/* TEMPLATE: ${newTemplateName || 'Sem nome'} */
/* Gerado em: ${new Date().toLocaleString('pt-BR')} */

/* TOPBAR SECUNDÁRIO */
height: ${config.topbarSecundarioAltura}px
padding-x: ${config.topbarPaddingX}px
gap: ${config.topbarGap}px
font-size: ${config.topbarFontSize}px
icon-size: ${config.topbarIconSize}px

/* TOPBAR TERCIÁRIO */
height: ${config.topbarTerciarioAltura}px
top: ${config.topbarSecundarioAltura}px

/* SIDEBAR */
width: ${config.sidebarLargura}px
position: ${config.sidebarPosicao}

/* MOLDURA */
padding: ${config.molduraPadding}px
border-radius: ${config.molduraRadius}px
shadow-intensity: ${config.moldurarSombraIntensidade}%
    `.trim()
    
    navigator.clipboard.writeText(classes)
    toast.success("Valores copiados!")
  }

  const navItems = [
    { id: "visao-geral", label: "Visão Geral", icon: LayoutDashboard },
    { id: "opcao-2", label: "Opção 2", icon: FileText },
    { id: "opcao-3", label: "Opção 3", icon: BarChart3 },
    { id: "opcao-4", label: "Opção 4", icon: GitCompare },
  ]

  const tabs = [
    { id: "tab-1", label: "Tab 1", icon: LayoutDashboard },
    { id: "tab-2", label: "Tab 2", icon: GitCompare },
    { id: "tab-3", label: "Tab 3", icon: BarChart3 },
    { id: "tab-4", label: "Tab 4", icon: TrendingUp },
    { id: "tab-5", label: "Tab 5", icon: Lightbulb },
  ]

  return (
    <TooltipProvider>
    <div className="flex h-screen bg-background">
      {/* PAINEL DE CONTROLES - SIDEBAR ESQUERDA */}
      <aside className="w-80 border-r bg-muted/30 flex flex-col">
        <div className="p-4 border-b bg-background">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Editor de Templates</h2>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={resetConfig} className="h-7 w-7">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Novo template do zero</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {currentTemplateId && savedTemplates.find(t => t.id === currentTemplateId) ? (
            <div className="flex items-center gap-2 mt-2 p-2 rounded-md bg-primary/10 border border-primary/20">
              <FileCode className="h-3 w-3 text-primary flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-primary truncate">
                  Editando: {savedTemplates.find(t => t.id === currentTemplateId)?.nome}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground mt-1">
              Ajuste as dimensões e salve versões
            </p>
          )}
        </div>

        {/* AÇÕES RÁPIDAS */}
        <div className="p-4 border-b bg-background space-y-2">
          {currentTemplateId ? (
            <Button 
              onClick={updateCurrentTemplate} 
              className="w-full h-9 text-sm gap-2"
            >
              <Check className="h-4 w-4" />
              Salvar Alterações
            </Button>
          ) : null}
          
          <Button 
            onClick={() => setShowSaveDialog(true)} 
            className="w-full h-9 text-sm gap-2"
            variant={currentTemplateId ? "outline" : "default"}
          >
            <Plus className="h-4 w-4" />
            {currentTemplateId ? "Salvar Como Novo" : "Salvar Novo Template"}
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={() => setShowTemplatesDialog(true)} 
              variant="outline"
              className="h-8 text-xs gap-1"
            >
              <FolderOpen className="h-3 w-3" />
              Carregar ({savedTemplates.length})
            </Button>
            <Button 
              onClick={() => setShowCode(!showCode)} 
              variant="outline"
              className="h-8 text-xs gap-1"
            >
              <Code className="h-3 w-3" />
              {showCode ? "Preview" : "Código"}
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* TOPBARS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <h3 className="font-medium text-sm">Topbars</h3>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs">Altura Secundário (px)</Label>
                <Input
                  type="number"
                  value={config.topbarSecundarioAltura}
                  onChange={(e) => updateConfig('topbarSecundarioAltura', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Altura Terciário (px)</Label>
                <Input
                  type="number"
                  value={config.topbarTerciarioAltura}
                  onChange={(e) => updateConfig('topbarTerciarioAltura', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Padding Horizontal (px)</Label>
                <Input
                  type="number"
                  value={config.topbarPaddingX}
                  onChange={(e) => updateConfig('topbarPaddingX', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Gap entre itens (px)</Label>
                <Input
                  type="number"
                  value={config.topbarGap}
                  onChange={(e) => updateConfig('topbarGap', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label className="text-xs">Fonte (px)</Label>
                  <Input
                    type="number"
                    value={config.topbarFontSize}
                    onChange={(e) => updateConfig('topbarFontSize', Number(e.target.value))}
                    className="h-8 text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">Ícone (px)</Label>
                  <Input
                    type="number"
                    value={config.topbarIconSize}
                    onChange={(e) => updateConfig('topbarIconSize', Number(e.target.value))}
                    className="h-8 text-xs"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* SIDEBAR */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <h3 className="font-medium text-sm">Sidebar</h3>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Largura (px)</Label>
                <Input
                  type="number"
                  value={config.sidebarLargura}
                  onChange={(e) => updateConfig('sidebarLargura', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Posição</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['esquerda', 'direita', 'ambos', 'nenhum'] as const).map((pos) => (
                    <Button
                      key={pos}
                      variant={config.sidebarPosicao === pos ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateConfig('sidebarPosicao', pos)}
                      className="h-7 text-xs"
                    >
                      {pos.charAt(0).toUpperCase() + pos.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* MOLDURA */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <h3 className="font-medium text-sm">Moldura de Conteúdo</h3>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Padding (px)</Label>
                <Input
                  type="number"
                  value={config.molduraPadding}
                  onChange={(e) => updateConfig('molduraPadding', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Border Radius (px)</Label>
                <Input
                  type="number"
                  value={config.molduraRadius}
                  onChange={(e) => updateConfig('molduraRadius', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Intensidade Sombra (%)</Label>
                <Input
                  type="number"
                  value={config.moldurarSombraIntensidade}
                  onChange={(e) => updateConfig('moldurarSombraIntensidade', Number(e.target.value))}
                  className="h-8 text-xs"
                  min="0"
                  max="100"
                />
              </div>
            </div>

            <Separator />

            {/* CONTEÚDO */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-1 w-1 rounded-full bg-primary" />
                <h3 className="font-medium text-sm">Conteúdo</h3>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Spacing entre cards (px)</Label>
                <Input
                  type="number"
                  value={config.conteudoSpacing}
                  onChange={(e) => updateConfig('conteudoSpacing', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Font Size (px)</Label>
                <Input
                  type="number"
                  value={config.conteudoFontSize}
                  onChange={(e) => updateConfig('conteudoFontSize', Number(e.target.value))}
                  className="h-8 text-xs"
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="p-4 border-t bg-background">
          <Button 
            onClick={copyTailwindClasses} 
            className="w-full h-8 text-xs gap-2"
            variant="outline"
          >
            <Copy className="h-3 w-3" />
            Copiar Valores CSS
          </Button>
        </div>
      </aside>

      {/* ÁREA DE PREVIEW */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {showCode ? (
          // VISUALIZAÇÃO DE CÓDIGO
          <div className="flex-1 overflow-auto p-6 bg-muted/30">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Código CSS / Tailwind
                </CardTitle>
                <CardDescription>
                  Valores atuais da configuração
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-muted rounded-lg text-xs font-mono overflow-auto">
{`/* ============================================
   CONFIGURAÇÃO ATUAL DO TEMPLATE
   ============================================ */

/* TOPBAR SECUNDÁRIO */
.topbar-secundario {
  height: ${config.topbarSecundarioAltura}px;
  padding-left: ${config.topbarPaddingX}px;
  padding-right: ${config.topbarPaddingX}px;
  gap: ${config.topbarGap}px;
  font-size: ${config.topbarFontSize}px;
}

.topbar-secundario-icon {
  width: ${config.topbarIconSize}px;
  height: ${config.topbarIconSize}px;
}

/* TOPBAR TERCIÁRIO */
.topbar-terciario {
  height: ${config.topbarTerciarioAltura}px;
  top: ${config.topbarSecundarioAltura}px;
  padding-left: ${config.topbarPaddingX}px;
  padding-right: ${config.topbarPaddingX}px;
  gap: ${config.topbarGap}px;
  font-size: ${config.topbarFontSize}px;
}

/* SIDEBAR */
.sidebar {
  width: ${config.sidebarLargura}px;
  position: ${config.sidebarPosicao};
}

/* MOLDURA DE CONTEÚDO */
.moldura-conteudo {
  padding: ${config.molduraPadding}px;
  border-radius: ${config.molduraRadius}px;
  box-shadow: inset 0 0 10px rgba(0,0,0,${config.moldurarSombraIntensidade / 100}),
              0 2px 8px rgba(0,0,0,0.05);
}

/* CONTEÚDO */
.conteudo {
  gap: ${config.conteudoSpacing}px;
  font-size: ${config.conteudoFontSize}px;
}

/* ============================================
   TAILWIND CLASSES EQUIVALENTES
   ============================================ */

Topbar Secundário:
  h-[${config.topbarSecundarioAltura}px]
  px-[${config.topbarPaddingX}px]
  gap-[${config.topbarGap}px]
  text-[${config.topbarFontSize}px]

Topbar Terciário:
  h-[${config.topbarTerciarioAltura}px]
  top-[${config.topbarSecundarioAltura}px]
  px-[${config.topbarPaddingX}px]
  gap-[${config.topbarGap}px]

Sidebar:
  w-[${config.sidebarLargura}px]

Moldura:
  p-[${config.molduraPadding}px]
  rounded-[${config.molduraRadius}px]
  shadow-[inset_0_0_10px_rgba(0,0,0,${config.moldurarSombraIntensidade / 100})]

Conteúdo:
  space-y-[${config.conteudoSpacing}px]
  text-[${config.conteudoFontSize}px]
`}
                </pre>
              </CardContent>
            </Card>
          </div>
        ) : (
          // PREVIEW VISUAL
          <div className="flex-1 flex flex-col bg-background overflow-hidden">
            {/* TOPBAR SECUNDÁRIO */}
            <div 
              className="sticky z-50 bg-background ml-4"
              style={{ 
                height: `${config.topbarSecundarioAltura}px`,
                width: 'calc(100% - 32px)',
              }}
            >
              <div className="bg-background h-full">
                <nav 
                  className="flex items-end h-full"
                  style={{ 
                    paddingLeft: `${config.topbarPaddingX}px`,
                    paddingRight: `${config.topbarPaddingX}px`,
                    gap: `${config.topbarGap}px`,
                  }}
                >
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeNavItem === item.id

                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveNavItem(item.id)}
                        className={cn(
                          "flex items-center font-medium transition-all duration-200 relative",
                          "hover:text-primary",
                          isActive ? [
                            "text-primary bg-background",
                            "border-t-2 border-l-2 border-r-2 border-primary/40",
                            "rounded-tl-lg rounded-tr-[2px]",
                            "translate-y-[2px]",
                            "z-20",
                          ] : [
                            "text-muted-foreground",
                            "hover:bg-muted/50",
                            "rounded-t-md",
                          ]
                        )}
                        style={{
                          gap: `${config.topbarGap * 2}px`,
                          paddingLeft: `${config.topbarPaddingX / 4}px`,
                          paddingRight: `${config.topbarPaddingX / 4}px`,
                          paddingTop: `${config.topbarSecundarioAltura / 6}px`,
                          paddingBottom: `${config.topbarSecundarioAltura / 6}px`,
                          fontSize: `${config.topbarFontSize}px`,
                          clipPath: isActive ? "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)" : undefined,
                          boxShadow: isActive ? "2px 0 4px -1px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" : undefined,
                        }}
                      >
                        <Icon style={{ width: `${config.topbarIconSize}px`, height: `${config.topbarIconSize}px` }} />
                        <span>{item.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* TOPBAR TERCIÁRIO */}
            <div 
              className="sticky z-40 bg-background ml-4"
              style={{ 
                height: `${config.topbarTerciarioAltura}px`,
                top: `${config.topbarSecundarioAltura}px`,
                width: 'calc(100% - 32px)',
              }}
            >
              <div className="bg-background h-full">
                <nav 
                  className="flex items-end h-full"
                  style={{ 
                    paddingLeft: `${config.topbarPaddingX}px`,
                    paddingRight: `${config.topbarPaddingX}px`,
                    gap: `${config.topbarGap}px`,
                  }}
                >
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id

                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "flex items-center font-medium transition-all duration-200 relative",
                          "hover:text-primary",
                          isActive ? [
                            "text-primary bg-background",
                            "border-t-2 border-l-2 border-r-2 border-primary/40",
                            "rounded-tl-lg rounded-tr-[2px]",
                            "translate-y-[2px]",
                            "z-20",
                          ] : [
                            "text-muted-foreground",
                            "hover:bg-muted/50",
                            "rounded-t-md",
                          ]
                        )}
                        style={{
                          gap: `${config.topbarGap * 2}px`,
                          paddingLeft: `${config.topbarPaddingX / 5}px`,
                          paddingRight: `${config.topbarPaddingX / 5}px`,
                          paddingTop: `${config.topbarTerciarioAltura / 6}px`,
                          paddingBottom: `${config.topbarTerciarioAltura / 6}px`,
                          fontSize: `${config.topbarFontSize}px`,
                          clipPath: isActive ? "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%)" : undefined,
                          boxShadow: isActive ? "2px 0 4px -1px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)" : undefined,
                        }}
                      >
                        <Icon style={{ width: `${config.topbarIconSize}px`, height: `${config.topbarIconSize}px` }} />
                        <span>{tab.label}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </div>

            {/* CONTEÚDO COM MOLDURA */}
            <div className="flex-1 flex overflow-hidden" style={{ gap: `${config.topbarGap * 4}px`, padding: '16px' }}>
              {/* Sidebar Esquerda (se configurada) */}
              {(config.sidebarPosicao === 'esquerda' || config.sidebarPosicao === 'ambos') && (
                <div style={{ width: `${config.sidebarLargura}px` }} className="flex-shrink-0">
                  <Card className="h-full shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Sidebar Esquerda</CardTitle>
                      <CardDescription className="text-xs">
                        Largura: {config.sidebarLargura}px
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2" style={{ fontSize: `${config.conteudoFontSize}px` }}>
                        <div className="p-3 rounded-lg bg-muted/50">Conteúdo 1</div>
                        <div className="p-3 rounded-lg bg-muted/50">Conteúdo 2</div>
                        <div className="p-3 rounded-lg bg-muted/50">Conteúdo 3</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Área Principal */}
              <div className="flex-1 overflow-auto">
                <Card 
                  className="h-full border-0 bg-background overflow-auto"
                  style={{
                    borderRadius: `${config.molduraRadius}px`,
                    boxShadow: `inset 0 0 10px rgba(0,0,0,${config.moldurarSombraIntensidade / 100}), 0 2px 8px rgba(0,0,0,0.05)`,
                  }}
                >
                  <CardContent style={{ padding: `${config.molduraPadding}px` }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: `${config.conteudoSpacing}px`,
                      fontSize: `${config.conteudoFontSize}px`
                    }}>
                      <div>
                        <h1 className="text-3xl font-bold mb-2">Preview do Template</h1>
                        <p className="text-muted-foreground">
                          Esta é a visualização em tempo real. Ajuste os controles e salve quando estiver pronto.
                        </p>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Card de Exemplo 1</CardTitle>
                          <CardDescription>
                            Descrição do card
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>Conteúdo do card ajustável.</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Card de Exemplo 2</CardTitle>
                          <CardDescription>
                            Outro card para visualizar spacing
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-center">
                              <div className="text-2xl font-bold text-blue-600">123</div>
                              <div className="text-xs text-muted-foreground">Métrica 1</div>
                            </div>
                            <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 text-center">
                              <div className="text-2xl font-bold text-green-600">456</div>
                              <div className="text-xs text-muted-foreground">Métrica 2</div>
                            </div>
                            <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 text-center">
                              <div className="text-2xl font-bold text-purple-600">789</div>
                              <div className="text-xs text-muted-foreground">Métrica 3</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Card de Exemplo 3</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Mais conteúdo para testar o scroll e espaçamento entre elementos.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Direita (se configurada) */}
              {(config.sidebarPosicao === 'direita' || config.sidebarPosicao === 'ambos') && (
                <div style={{ width: `${config.sidebarLargura}px` }} className="flex-shrink-0">
                  <Card className="h-full shadow-md">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Sidebar Direita</CardTitle>
                      <CardDescription className="text-xs">
                        Largura: {config.sidebarLargura}px
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2" style={{ fontSize: `${config.conteudoFontSize}px` }}>
                        <div className="p-3 rounded-lg bg-muted/50">Conteúdo 1</div>
                        <div className="p-3 rounded-lg bg-muted/50">Conteúdo 2</div>
                        <div className="p-3 rounded-lg bg-muted/50">Conteúdo 3</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DIALOG: SALVAR TEMPLATE */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Salvar Novo Template</DialogTitle>
            <DialogDescription>
              Defina um nome e descrição para este template
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Nome do Template</Label>
              <Input
                placeholder="Ex: Template Padrão Propostas"
                value={newTemplateName}
                onChange={(e) => setNewTemplateName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveTemplate()}
              />
            </div>
            <div className="space-y-2">
              <Label>Descrição (opcional)</Label>
              <Input
                placeholder="Ex: Layout para telas de elaboração de propostas"
                value={newTemplateDesc}
                onChange={(e) => setNewTemplateDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={saveTemplate}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG: GERENCIAR TEMPLATES */}
      <Dialog open={showTemplatesDialog} onOpenChange={setShowTemplatesDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Templates Salvos</DialogTitle>
            <DialogDescription>
              {savedTemplates.length} template(s) disponível(is)
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-3 pr-4">
              {savedTemplates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileCode className="h-12 w-12 mx-auto mb-3 opacity-20" />
                  <p className="text-sm">Nenhum template salvo ainda</p>
                  <p className="text-xs mt-1">Ajuste as configurações e salve seu primeiro template</p>
                </div>
              ) : (
                savedTemplates.map((template) => (
                  <Card key={template.id} className="hover:bg-muted/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{template.nome}</h4>
                            <Badge variant="outline" className="text-xs">
                              v{template.id.slice(-4)}
                            </Badge>
                          </div>
                          {template.descricao && (
                            <p className="text-sm text-muted-foreground mb-2">{template.descricao}</p>
                          )}
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Criado: {new Date(template.dataCriacao).toLocaleDateString('pt-BR')}</span>
                            <span>•</span>
                            <span>Topbar: {template.config.topbarSecundarioAltura}px/{template.config.topbarTerciarioAltura}px</span>
                            <span>•</span>
                            <span>Sidebar: {template.config.sidebarPosicao}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => loadTemplate(template)}
                            className="h-8"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Carregar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => exportTemplate(template)}
                            className="h-8"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setTemplateToDelete(template.id)}
                            className="h-8 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* ALERT DIALOG: CONFIRMAR EXCLUSÃO */}
      <AlertDialog open={!!templateToDelete} onOpenChange={() => setTemplateToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Template?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O template será permanentemente removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => templateToDelete && deleteTemplate(templateToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </TooltipProvider>
  )
}
