================================================================================
MEMORIAL / RELATÓRIO / DOCUMENTO – ERP GENESIS
================================================================================
Produto................: ERP GENESIS
Versão.................: v1.0
Status.................: OFICIAL
Data...................: 2026-01-05
Hora...................: 17:30 (UTC-3)
IA Autora..............: v0 – Vercel AI
Solicitante............: Proprietário do Produto / GC
Arquitetura............: ChatGPT + Cursor + v0 + Vercel
Origem do Documento....: Nova Criação
Documento Substitui....: —
Documento Substituído Por: —
Objetivo...............: Gestão de Alta Performance por Micro-Unidades de Resultado
================================================================================

# MEMORIAL DE IDENTIDADE VISUAL E PADRÕES DE VISUALIZAÇÃO
## ERP GENESIS - Guia de Estilo para Novos Módulos

---

## 1. IDENTIDADE VISUAL AAHBRANT

### 1.1 Cor Primária

| Propriedade | Valor |
|-------------|-------|
| Nome | Vermelho Aahbrant |
| HEX | #96110D |
| OKLCH (Claro) | oklch(0.4 0.165 27) |
| OKLCH (Escuro) | oklch(0.55 0.18 27) |
| Uso | Botões principais, links ativos, destaques, ícones de ação |

### 1.2 Paleta de Cores Semânticas

```css
/* TEMA CLARO */
--background: oklch(0.98 0.004 75);      /* Fundo geral */
--foreground: oklch(0.18 0.02 30);       /* Texto principal */
--card: oklch(1 0 0);                     /* Fundo de cards */
--card-foreground: oklch(0.18 0.02 30);  /* Texto em cards */
--muted: oklch(0.94 0.006 75);           /* Elementos secundários */
--muted-foreground: oklch(0.48 0.015 30);/* Texto secundário */
--border: oklch(0.91 0.008 75);          /* Bordas */
--accent: oklch(0.96 0.012 27);          /* Destaque hover */

/* TEMA ESCURO */
--background: oklch(0.15 0.012 35);
--foreground: oklch(0.94 0.006 75);
--card: oklch(0.19 0.012 35);
--card-foreground: oklch(0.94 0.006 75);
--muted: oklch(0.26 0.01 35);
--muted-foreground: oklch(0.72 0.012 75);
--border: oklch(0.36 0.014 35);
--accent: oklch(0.28 0.014 35);
```

### 1.3 Cores de Status

| Status | Token | Uso |
|--------|-------|-----|
| Sucesso | `--success: oklch(0.55 0.14 145)` | Aprovações, metas atingidas |
| Alerta | `--warning: oklch(0.72 0.14 85)` | Atenção, pendências |
| Informação | `--info: oklch(0.58 0.12 235)` | Dicas, informações |
| Erro/Crítico | `--destructive: oklch(0.48 0.2 27)` | Erros, alertas críticos |

### 1.4 Cores de Gráficos

```css
--chart-1: oklch(0.4 0.165 27);   /* Primary - Vermelho Aahbrant */
--chart-2: oklch(0.58 0.12 195);  /* Ciano */
--chart-3: oklch(0.55 0.14 145);  /* Verde */
--chart-4: oklch(0.62 0.12 85);   /* Amarelo */
--chart-5: oklch(0.52 0.1 280);   /* Roxo */
```

---

## 2. SISTEMA FIBONACCI

### 2.1 Espaçamentos (Spacing)

| Token | Valor | Uso Recomendado |
|-------|-------|-----------------|
| `--space-1` | 1px | Bordas finas |
| `--space-2` | 2px | Micro ajustes |
| `--space-3` | 3px | Gap mínimo |
| `--space-5` | 5px | Padding interno pequeno |
| `--space-8` | 8px | Gap padrão entre elementos |
| `--space-13` | 13px | Padding de cards |
| `--space-21` | 21px | Margin entre seções |
| `--space-34` | 34px | Espaçamento de blocos |
| `--space-55` | 55px | Margin de seções maiores |
| `--space-89` | 89px | Espaçamento hero/destaque |

### 2.2 Tipografia

| Token | Valor | Uso |
|-------|-------|-----|
| `--text-xs` | 11px | Labels mínimos, badges |
| `--text-sm` | 13px | Textos secundários, captions |
| `--text-base` | 14px | Corpo de texto padrão |
| `--text-md` | 16px | Texto com destaque |
| `--text-lg` | 18px | Subtítulos |
| `--text-xl` | 21px | Títulos de seção |
| `--text-2xl` | 26px | Títulos de página |
| `--text-3xl` | 34px | Headlines |
| `--text-4xl` | 42px | Display |
| `--text-5xl` | 55px | Hero |

### 2.3 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-fib-3` | 3px | Inputs, badges pequenos |
| `--radius-fib-5` | 5px | Buttons pequenos |
| `--radius-fib-8` | 8px | Cards, buttons padrão |
| `--radius-fib-13` | 13px | Cards destacados |
| `--radius-fib-21` | 21px | Modais, containers grandes |

### 2.4 Sombras

```css
/* Sombra mínima - elementos sutis */
--shadow-genesis-xs: 0 1px 2px oklch(0 0 0 / 0.04);

/* Sombra pequena - cards, dropdowns */
--shadow-genesis-sm: 0 1px 3px oklch(0 0 0 / 0.06), 
                     0 1px 2px oklch(0 0 0 / 0.04);

/* Sombra média - cards hover, modais pequenos */
--shadow-genesis-md: 0 4px 6px -1px oklch(0 0 0 / 0.07), 
                     0 2px 4px -1px oklch(0 0 0 / 0.04);

/* Sombra grande - modais, popovers */
--shadow-genesis-lg: 0 10px 15px -3px oklch(0 0 0 / 0.08), 
                     0 4px 6px -2px oklch(0 0 0 / 0.04);

/* Sombra extra grande - elementos flutuantes */
--shadow-genesis-xl: 0 20px 25px -5px oklch(0 0 0 / 0.08), 
                     0 10px 10px -5px oklch(0 0 0 / 0.03);
```

---

## 3. TIPOGRAFIA

### 3.1 Fontes

| Família | Uso | Token |
|---------|-----|-------|
| Montserrat | Corpo de texto, UI | `--font-sans` |
| Bebas Neue | Títulos display, headlines | `--font-display` |

### 3.2 Pesos

| Peso | Uso |
|------|-----|
| 400 (Regular) | Corpo de texto |
| 500 (Medium) | Labels, botões |
| 600 (Semibold) | Subtítulos, destaque |
| 700 (Bold) | Títulos, números importantes |

---

## 4. COMPONENTES PADRONIZADOS

### 4.1 AppLayout (Obrigatório)

Toda página DEVE usar o componente `AppLayout`:

```tsx
import { AppLayout } from "@/components/layout/app-layout"

export default function MinhaPage() {
  return (
    <AppLayout>
      {/* Conteúdo da página */}
    </AppLayout>
  )
}
```

### 4.2 Estrutura de Página Padrão

```tsx
<AppLayout>
  <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
    {/* HEADER - flex-shrink-0 */}
    <div className="flex items-center justify-between mb-6 flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Ícone da página */}
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
          <IconeDaPagina className="w-6 h-6 text-primary" />
        </div>
        {/* Título e InfoTooltip */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-foreground">Título da Página</h1>
            <InfoTooltip
              title="Título"
              description="Descrição explicativa da funcionalidade"
            />
          </div>
          <p className="text-sm text-muted-foreground">Subtítulo descritivo</p>
        </div>
      </div>
      {/* Botões de ação */}
      <div className="flex gap-2">
        <Button variant="outline">Ação Secundária</Button>
        <Button>Ação Principal</Button>
      </div>
    </div>

    {/* CARDS DE MÉTRICAS (se aplicável) */}
    <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
      {/* Cards de KPI */}
    </div>

    {/* CONTEÚDO PRINCIPAL - flex-1 min-h-0 */}
    <div className="flex-1 min-h-0">
      {/* Área com scroll interno se necessário */}
    </div>
  </div>
</AppLayout>
```

### 4.3 InfoTooltip (Obrigatório em todas as páginas)

```tsx
import { InfoTooltip } from "@/components/ui/info-tooltip"

<InfoTooltip
  title="Nome da Funcionalidade"
  description="Explicação clara e concisa do que esta tela/funcionalidade faz."
/>
```

### 4.4 Cards de Métricas/KPIs

```tsx
<Card className="border-border/50">
  <CardContent className="p-4">
    {/* Label + Status */}
    <div className="flex items-center justify-between mb-2">
      <p className="text-xs text-muted-foreground">Nome da Métrica</p>
      <CheckCircle className="w-4 h-4 text-green-500" />
    </div>
    
    {/* Valor Principal */}
    <div className="flex items-end gap-2 mb-2">
      <span className="text-2xl font-bold">67.4%</span>
      <span className="text-sm text-muted-foreground mb-0.5">/ 70%</span>
    </div>
    
    {/* Variação */}
    <div className="flex items-center gap-1">
      <ArrowUp className="w-3 h-3 text-green-500" />
      <span className="text-xs text-green-500">+2.1%</span>
    </div>
    
    {/* Barra de progresso */}
    <Progress value={67.4} className="h-1.5 mt-2" />
  </CardContent>
</Card>
```

### 4.5 Ícone de Cabeçalho de Página

```tsx
{/* Container do ícone - PADRÃO OBRIGATÓRIO */}
<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
  <NomeDoIcone className="w-6 h-6 text-primary" />
</div>
```

### 4.6 Cards com ScrollArea

```tsx
<Card className="flex-1 flex flex-col border-border/50 min-h-0">
  <CardHeader className="py-3 flex-shrink-0">
    <CardTitle className="text-base flex items-center gap-2">
      <Icone className="w-4 h-4" />
      Título do Card
    </CardTitle>
  </CardHeader>
  <CardContent className="flex-1 min-h-0">
    <ScrollArea className="h-full">
      {/* Conteúdo com scroll */}
    </ScrollArea>
  </CardContent>
</Card>
```

### 4.7 Badges de Status

```tsx
{/* Ativo/Sucesso */}
<Badge variant="default" className="bg-green-500/20 text-green-500 border-0">
  Ativo
</Badge>

{/* Pendente/Alerta */}
<Badge variant="secondary" className="bg-yellow-500/20 text-yellow-500 border-0">
  Pendente
</Badge>

{/* Erro/Crítico */}
<Badge variant="destructive">
  Crítico
</Badge>

{/* Informativo */}
<Badge variant="outline">
  Info
</Badge>
```

### 4.8 Botões

```tsx
{/* Botão Principal */}
<Button>
  <Icone className="w-4 h-4 mr-2" />
  Ação Principal
</Button>

{/* Botão Secundário */}
<Button variant="outline">
  <Icone className="w-4 h-4 mr-2" />
  Ação Secundária
</Button>

{/* Botão Ghost (ações sutis) */}
<Button variant="ghost" size="sm">
  <Icone className="w-4 h-4" />
</Button>

{/* Botão Destrutivo */}
<Button variant="destructive">
  Excluir
</Button>
```

---

## 5. LAYOUT - REGRAS OBRIGATÓRIAS

### 5.1 Altura da Página

```tsx
{/* Container principal - SEMPRE usar esta estrutura */}
<div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
```

### 5.2 Áreas Fixas vs Scrolláveis

| Área | Classe | Comportamento |
|------|--------|---------------|
| Header | `flex-shrink-0` | Nunca encolhe |
| KPIs/Métricas | `flex-shrink-0` | Nunca encolhe |
| Conteúdo Principal | `flex-1 min-h-0` | Ocupa espaço restante |
| Áreas com Scroll | `ScrollArea className="h-full"` | Scroll interno |

### 5.3 Grid Layouts

```tsx
{/* Grid de 4 colunas para KPIs */}
<div className="grid grid-cols-4 gap-4">

{/* Grid de 3 colunas para conteúdo */}
<div className="grid grid-cols-3 gap-6">

{/* Grid responsivo */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

---

## 6. SIDEBAR - ESTRUTURA DE NAVEGAÇÃO

### 6.1 Hierarquia

```
MÓDULO (label)
└── DEPARTAMENTO (Collapsible)
    └── SETOR (Link)
```

### 6.2 Padrão de Itens

```tsx
{
  name: "Nome do Departamento",
  icon: IconeLucide,
  submenu: [
    { 
      name: "Nome do Setor", 
      href: "/modulo/departamento/setor", 
      icon: IconeLucide 
    },
  ],
}
```

### 6.3 Cores da Sidebar

| Elemento | Token |
|----------|-------|
| Fundo | `bg-sidebar` |
| Texto | `text-sidebar-foreground` |
| Texto secundário | `text-sidebar-foreground/60` |
| Item ativo | `text-primary bg-sidebar-accent` |
| Hover | `hover:bg-sidebar-accent` |
| Borda | `border-sidebar-border` |

---

## 7. TOPBAR - ELEMENTOS

### 7.1 Dimensões

| Propriedade | Valor |
|-------------|-------|
| Altura | 61px |
| Padding Horizontal | 12px (px-3) |

### 7.2 Estrutura

```
[ Breadcrumb ] -------- [ Ações Rápidas (centro) ] -------- [ Busca | Temp | Tema | Notif | Avatar ]
```

### 7.3 Card de Ações Rápidas

| Propriedade | Valor |
|-------------|-------|
| Tamanho do botão | 32px (w-8 h-8) |
| Tamanho do ícone | 16px (w-4 h-4) |
| Border radius | rounded-xl |
| Botão Home | bg-primary com sombra colorida |

---

## 8. LOADING STATES

### 8.1 Arquivo loading.tsx (Obrigatório)

Toda rota DEVE ter um arquivo `loading.tsx`:

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col h-full p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-24 rounded-lg" />
      </div>
      <Skeleton className="flex-1 rounded-lg" />
    </div>
  )
}
```

---

## 9. CHECKLIST PARA NOVOS MÓDULOS

### 9.1 Arquivos Obrigatórios

- [ ] `page.tsx` - Página principal
- [ ] `loading.tsx` - Estado de carregamento

### 9.2 Elementos Obrigatórios na Página

- [ ] Importar `AppLayout`
- [ ] Container com `h-[calc(100vh-80px)] overflow-hidden`
- [ ] Header com ícone + título + `InfoTooltip`
- [ ] Botões de ação no header
- [ ] Cards de métricas (se aplicável)
- [ ] `flex-shrink-0` em elementos fixos
- [ ] `flex-1 min-h-0` no conteúdo principal
- [ ] `ScrollArea` para conteúdo scrollável

### 9.3 Cores - Usar SEMPRE Tokens

- [ ] `text-foreground` (nunca `text-black/white`)
- [ ] `bg-background` (nunca `bg-white/black`)
- [ ] `bg-card` para cards
- [ ] `text-muted-foreground` para textos secundários
- [ ] `border-border` para bordas
- [ ] `text-primary` para destaques
- [ ] `bg-primary` para botões principais

### 9.4 Sidebar

- [ ] Adicionar departamento em `sidebar.tsx`
- [ ] Seguir padrão de hierarquia
- [ ] Usar ícones do Lucide

---

## 10. CÓDIGO DE REFERÊNCIA COMPLETO

### 10.1 Página Padrão Completa

```tsx
"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { LucideParkingCircle as IconePrincipal, FileText, CheckCircle, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react"

const metricas = [
  { id: "1", nome: "Métrica 1", valor: 85, meta: 90, status: "ok", variacao: +2.5 },
  { id: "2", nome: "Métrica 2", valor: 72, meta: 80, status: "atencao", variacao: -3.2 },
]

export default function NovaPagina() {
  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
              <IconePrincipal className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground">
                  Título da Página
                </h1>
                <InfoTooltip
                  title="Título da Página"
                  description="Descrição explicativa da funcionalidade desta tela."
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Subtítulo com contexto adicional
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button>
              Ação Principal
            </Button>
          </div>
        </div>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-4 gap-4 mb-6 flex-shrink-0">
          {metricas.map((m) => (
            <Card key={m.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground">{m.nome}</p>
                  {m.status === "ok" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-2xl font-bold">{m.valor}%</span>
                  <span className="text-sm text-muted-foreground mb-0.5">
                    / {m.meta}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {m.variacao >= 0 ? (
                    <ArrowUp className="w-3 h-3 text-green-500" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-red-500" />
                  )}
                  <span className={`text-xs ${m.variacao >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {m.variacao > 0 ? "+" : ""}{m.variacao}%
                  </span>
                </div>
                <Progress value={(m.valor / m.meta) * 100} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex-1 min-h-0">
          <Card className="h-full flex flex-col border-border/50">
            <CardHeader className="py-3 flex-shrink-0">
              <CardTitle className="text-base">Conteúdo Principal</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                {/* Conteúdo scrollável */}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
```

---

================================================================================
FIM DO DOCUMENTO
================================================================================
