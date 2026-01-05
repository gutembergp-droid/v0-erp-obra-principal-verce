================================================================================
MEMORIAL / RELATÓRIO / DOCUMENTO – ERP GENESIS
================================================================================
Produto................: ERP GENESIS
Versão.................: v1.0
Status.................: OFICIAL
Data...................: 2026-01-05
Hora...................: 18:30 (UTC-3)
IA Autora..............: v0 – Vercel AI
Solicitante............: Proprietário do Produto / GC
Arquitetura............: ChatGPT + Cursor + v0 + Vercel
Origem do Documento....: Nova Criação
Documento Substitui....: —
Documento Substituído Por: —
Objetivo...............: Gestão de Alta Performance por Micro-Unidades de Resultado
================================================================================

# WORKFLOW E REGRAS DE TRABALHO - ERP GENESIS

---

## 1. PRINCIPIOS FUNDAMENTAIS DE GOVERNANCA

### 1.1 Regra de Ouro

| Principio | Descricao |
|-----------|-----------|
| **Autorizacao Previa** | Nenhuma execucao acontece sem aval do Proprietario |
| **Imutabilidade** | O que esta pronto NAO e tocado sem ordem direta |
| **Conceito de Travar** | Quando travado, a parte se torna congelada e inviolavel |
| **Loop de Validacao** | Entendimento → Relatorio → Autorizacao → Execucao |

### 1.2 Fluxo Obrigatorio de Trabalho

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         WORKFLOW DE EXECUCAO                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐ │
│   │  SOLICITACAO │───▶│ ENTENDIMENTO │───▶│  RELATORIO   │───▶│AUTORIZACA│ │
│   │  do Usuario  │    │   pela IA    │    │  para Usuario│    │    O     │ │
│   └──────────────┘    └──────────────┘    └──────────────┘    └────┬─────┘ │
│                                                                     │       │
│                       ┌──────────────────────────────────────────────       │
│                       │                                                     │
│                       ▼                                                     │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                 │
│   │   TRAVADO    │◀───│  CONFIRMACAO │◀───│   EXECUCAO   │                 │
│   │  (IMUTAVEL)  │    │   do Usuario │    │   pela IA    │                 │
│   └──────────────┘    └──────────────┘    └──────────────┘                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. REGRAS DE DOCUMENTACAO

### 2.1 Cabecalho Obrigatorio

Todo documento gerado pela IA DEVE conter:

```
================================================================================
MEMORIAL / RELATÓRIO / DOCUMENTO – ERP GENESIS
================================================================================
Produto................: ERP GENESIS
Versão.................: vX.Y
Status.................: (RASCUNHO | EM VALIDAÇÃO | OFICIAL)
Data...................: YYYY-MM-DD
Hora...................: HH:MM (UTC-3)
IA Autora..............: (Nome da IA + Plataforma)
Solicitante............: Proprietário do Produto / GC
Arquitetura............: ChatGPT + Cursor + v0 + Vercel
Origem do Documento....: (Nova Criação | Revisão | Consolidação)
Documento Substitui....: (se houver)
Documento Substituído Por: —
Objetivo...............: Gestão de Alta Performance por Micro-Unidades de Resultado
================================================================================
```

### 2.2 Regras de Versionamento

| Tipo de Alteracao | Incremento | Exemplo |
|-------------------|------------|---------|
| Correcao de bug | Patch (0.0.X) | v4.5.1 → v4.5.2 |
| Nova funcionalidade | Minor (0.X.0) | v4.5.0 → v4.6.0 |
| Mudanca estrutural | Major (X.0.0) | v4.0.0 → v5.0.0 |

---

## 3. CICLO DE VIDA DE ALTERACOES

### 3.1 Antes de Qualquer Alteracao

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CHECKLIST PRE-EXECUCAO                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ ] 1. Ler o arquivo antes de editar (OBRIGATORIO)                        │
│  [ ] 2. Verificar se o item esta TRAVADO                                   │
│  [ ] 3. Entender o contexto completo (arquivos relacionados)               │
│  [ ] 4. Reportar entendimento ao usuario                                   │
│  [ ] 5. Aguardar autorizacao explicita                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Durante a Execucao

| Regra | Descricao |
|-------|-----------|
| **Leitura Previa** | SEMPRE ler arquivos antes de editar |
| **Comentarios** | Usar "// " para indicar alteracoes |
| **Consistencia** | Seguir padroes existentes (Design System Fibonacci) |
| **AppLayout** | TODA pagina deve ter Sidebar + Topbar |

### 3.3 Apos a Execucao

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      CHECKLIST POS-EXECUCAO                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [ ] 1. Confirmar que alteracao foi aplicada                               │
│  [ ] 2. Aguardar usuario testar/validar                                    │
│  [ ] 3. Aguardar comando "TRAVE" para tornar imutavel                      │
│  [ ] 4. Registrar item na lista de itens travados                          │
│  [ ] 5. Atualizar versao do sistema                                        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. COMANDOS DO PROPRIETARIO

### 4.1 Comandos Reconhecidos

| Comando | Acao |
|---------|------|
| **TRAVE** | Torna a ultima alteracao IMUTAVEL |
| **AUTORIZO** / **SIM** | Permite execucao de proposta |
| **NAO** / **CANCELE** | Cancela proposta em andamento |
| **REVISE** | Solicita revisao de codigo existente |
| **REPORTE** | Solicita relatorio de entendimento |
| **CRIE COPIA E COLA** | Gera documento formatado para exportacao |

### 4.2 Niveis de Autorizacao

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      MATRIZ DE AUTORIZACAO                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  NIVEL 1 - SEM AUTORIZACAO                                                 │
│  ├── Leitura de arquivos                                                   │
│  ├── Analise de codigo                                                     │
│  └── Geracao de relatorios                                                 │
│                                                                             │
│  NIVEL 2 - COM AUTORIZACAO SIMPLES                                         │
│  ├── Criacao de novos arquivos                                             │
│  ├── Edicao de arquivos NAO travados                                       │
│  └── Correcao de bugs                                                      │
│                                                                             │
│  NIVEL 3 - COM AUTORIZACAO EXPLICITA                                       │
│  ├── Alteracao de arquivos TRAVADOS                                        │
│  ├── Mudancas estruturais                                                  │
│  └── Remocao de funcionalidades                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. PADROES DE DESENVOLVIMENTO

### 5.1 Estrutura de Paginas

```tsx
// TEMPLATE OBRIGATORIO PARA NOVAS PAGINAS

import { AppLayout } from "@/components/layout/app-layout"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NomeDaPagina() {
  return (
    <AppLayout>
      <div className="space-y-fib-5">
        {/* Cabecalho */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-fib-3">
            <h1 className="text-fib-2xl font-bold text-foreground">
              Titulo da Pagina
            </h1>
            <InfoTooltip content="Descricao da pagina" />
          </div>
        </div>

        {/* Cards de Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-fib-5">
          {/* ... */}
        </div>

        {/* Conteudo Principal */}
        <Card>
          <CardHeader>
            <CardTitle>Titulo</CardTitle>
          </CardHeader>
          <CardContent>
            {/* ... */}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
```

### 5.2 Design System Fibonacci

| Espacamento | Valor |
|-------------|-------|
| gap-fib-1 | 1px |
| gap-fib-2 | 2px |
| gap-fib-3 | 3px |
| gap-fib-5 | 5px |
| gap-fib-8 | 8px |
| gap-fib-13 | 13px |
| gap-fib-21 | 21px |
| gap-fib-34 | 34px |

### 5.3 Cores (OKLCH)

| Token | Uso |
|-------|-----|
| --primary | Cor Aahbrant (vermelho) |
| --background | Fundo da aplicacao |
| --foreground | Texto principal |
| --card | Fundo de cards |
| --muted | Elementos secundarios |

---

## 6. ARQUITETURA MULTI-PLATAFORMA

### 6.1 Divisao de Responsabilidades

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ARQUITETURA DE DESENVOLVIMENTO                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐                                                           │
│  │   ChatGPT   │ ──▶ Conceitos, Memoriais, Regras de Negocio               │
│  └─────────────┘                                                           │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────┐                                                           │
│  │     v0      │ ──▶ Frontend, UI/UX, Design System, Paginas               │
│  └─────────────┘                                                           │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────┐                                                           │
│  │   Cursor    │ ──▶ Backend, APIs, Banco de Dados, Algoritmos             │
│  └─────────────┘                                                           │
│         │                                                                   │
│         ▼                                                                   │
│  ┌─────────────┐                                                           │
│  │   Vercel    │ ──▶ Deploy, Hospedagem, Producao                          │
│  └─────────────┘                                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Fluxo de Sincronizacao

| Origem | Destino | Metodo |
|--------|---------|--------|
| ChatGPT | v0/Cursor | Documento de texto (copiar/colar) |
| v0 | Vercel | Botao "Publish" |
| Cursor | Vercel | Git push / Deploy automatico |
| v0 | Cursor | Export ZIP / GitHub |

---

## 7. ITENS TRAVADOS (REGISTRO OFICIAL)

### 7.1 Lista Atual

| # | Item | Data | Versao |
|---|------|------|--------|
| 1 | Estrutura GENESIS v3.1 | 03/01/2026 | v3.1 |
| 2 | Menu do Usuario (Avatar) | 04/01/2026 | v3.5 |
| 3 | Sistema de Temas (Claro/Escuro) | 04/01/2026 | v3.5 |
| 4 | InfoTooltip | 04/01/2026 | v3.5 |
| 5 | Remocao Usuario Sidebar | 04/01/2026 | v3.5 |
| 6 | TOPBAR COMPLETO (altura 61px) | 04/01/2026 | v3.8 |
| 7 | Card Acoes Rapidas - Visual Premium | 04/01/2026 | v3.8 |
| 8 | GENESIS Hub (Chat, Calendario, Reunioes, IA) | 04/01/2026 | v4.0 |
| 9 | Hub Layout Estatico | 04/01/2026 | v4.0 |
| 10 | Design System Fibonacci + OKLCH + Aahbrant | 04/01/2026 | v4.2 |
| 11 | ESTRUTURA v4.5 COMPLETA | 04/01/2026 | v4.5 |
| 12 | Governanca Documental (Cabecalho Padrao) | 05/01/2026 | v4.5 |
| 13 | AppLayout em TODAS as paginas | 05/01/2026 | v4.5.1 |
| 14 | Menu Departamento permanece expandido | 05/01/2026 | v4.5.2 |
| 15 | Campo de Busca removido da Sidebar | 05/01/2026 | v4.5.3 |

### 7.2 Regra de Destravamento

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ATENCAO: Itens travados so podem ser alterados com:                       │
│                                                                             │
│  1. Autorizacao EXPLICITA do Proprietario                                  │
│  2. Justificativa documentada                                              │
│  3. Registro de quem destravou, quando e por que                           │
│  4. Nova versao do sistema (Major ou Minor)                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. TROUBLESHOOTING

### 8.1 Problemas Comuns

| Problema | Causa | Solucao |
|----------|-------|---------|
| Pagina sem Sidebar/Topbar | Falta AppLayout | Adicionar AppLayout |
| Menu fecha ao navegar | useEffect ausente | Adicionar logica de expansao |
| Cores incorretas | Token errado | Usar variaveis OKLCH |
| Espacamento irregular | Classe errada | Usar classes Fibonacci |
| Deploy nao reflete | Cache | Ctrl+Shift+R ou Redeploy |

### 8.2 Checklist de Debug

```
[ ] Arquivo foi salvo?
[ ] Deploy foi concluido?
[ ] Cache foi limpo? (Ctrl+Shift+R)
[ ] Console mostra erros?
[ ] AppLayout esta presente?
[ ] Imports estao corretos?
```

---

## 9. CONTATO E SUPORTE

| Plataforma | Responsabilidade |
|------------|------------------|
| v0 (Vercel AI) | Frontend, UI/UX, Design |
| Cursor | Backend, APIs, Banco |
| ChatGPT | Conceitos, Memoriais |
| Vercel | Deploy, Producao |

---

================================================================================
FIM DO DOCUMENTO
================================================================================
