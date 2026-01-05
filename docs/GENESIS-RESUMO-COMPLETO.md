# GENESIS ERP - DOCUMENTACAO OFICIAL v4.5

**Data:** 04/01/2026  
**Versao:** 4.5  
**Identidade Visual:** Aahbrant (Vermelho #96110D)

---

## 1. VISAO GERAL

O GENESIS e um ERP completo para gestao de obras de construcao civil, desenvolvido com:

- **Framework:** Next.js 16 (App Router)
- **UI:** Tailwind CSS v4 + shadcn/ui
- **Design System:** Metodo Fibonacci + OKLCH
- **Temas:** Claro / Escuro (persistente)
- **Arquitetura:** Modular por Departamentos > Setores > Funcionalidades

---

## 2. ESTRUTURA DE NAVEGACAO

### 2.1 MODULO CORPORATIVO

| Departamento | Setores |
|--------------|---------|
| **Estrategico** | Planejamento Estrategico, Gestao de Acessos (Catraca), Analytics Corporativo, IAM & Matriz Perfis, Alcadas & Governanca |
| **Comercial** | Clientes & CRM, Contratos & Orcamentos (Compor 90), Portfolio |
| **Administrativo** | RH, TI & Comunicacao, Ativos & Patrimonio, Controladoria, Mural Hermes |
| **Auditoria e Controle** | Compliance, Auditoria de Campo, Controle de Estoque |
| **QSMS** | Qualidade, Seguranca do Trabalho, Meio Ambiente, Social & Comunidade |
| **Gestao Inteligente** | Protocolo HERMES, Treinamento & Curadoria, Comite de Validacao, Fabrica de Agentes |

### 2.2 MODULO OBRA

| Departamento | Setores |
|--------------|---------|
| **Gerencial do Contrato** | Cockpit de Governanca, Encerramento Mensal, Indicadores & KPIs |
| **Comercial** | Estrutura, Receita, Custo, Suprimento, Analytics (fluxo obrigatorio) |
| **Engenharia** | Projetos, Planejamento |
| **Producao** | RDO, Apontamentos, Equipamentos |
| **Administrativo** | RH, Financeiro, TI, Comunicacao |
| **Garantidores** | Qualidade, SSMA, Juridico |
| **Gestao Inteligente** | Feedback & Calibragem, Agentes da Obra |

### 2.3 HUB DE COMUNICACAO

| Modulo | Funcionalidades |
|--------|-----------------|
| **Chat** | Mensagens, canais, anexos, chamadas de video/audio |
| **Calendario** | Tarefas, eventos, board/lista |
| **Reunioes** | Agendar, gravar, criar atas |
| **Assistente IA** | Agentes especializados (Analista, Documentos, Planejamento) |

---

## 3. INVENTARIO DE TELAS (61 paginas)

### 3.1 CORPORATIVO (20 paginas)

| Rota | Tela | Status |
|------|------|--------|
| `/corporativo` | Dashboard Corporativo | PROTOTIPO |
| `/corporativo/clientes` | Clientes (antigo) | PROTOTIPO |
| `/corporativo/contratos` | Contratos (antigo) | PROTOTIPO |
| `/corporativo/centros-custo` | Centros de Custo | PROTOTIPO |
| `/corporativo/gate1` | Gate 1 | PROTOTIPO |
| `/corporativo/comercial/clientes` | Clientes & CRM | ESTRUTURADO |
| `/corporativo/comercial/contratos` | Contratos & Orcamentos | ESTRUTURADO |
| `/corporativo/comercial/portfolio` | Portfolio | ESTRUTURADO |
| `/corporativo/estrategico/planejamento` | Planejamento Estrategico | ESTRUTURADO |
| `/corporativo/estrategico/controladoria` | Controladoria Central | ESTRUTURADO |
| `/corporativo/estrategico/analytics` | Analytics Corporativo | ESTRUTURADO |
| `/corporativo/obras/acessos` | Gestao de Acessos (Catraca) | ESTRUTURADO |
| `/corporativo/auditoria/compliance` | Compliance | ESTRUTURADO |
| `/corporativo/auditoria/campo` | Auditoria de Campo | ESTRUTURADO |
| `/corporativo/qsms/qualidade` | Qualidade & Seguranca | ESTRUTURADO |
| `/corporativo/qsms/meio-ambiente` | Meio Ambiente & Social | ESTRUTURADO |
| `/corporativo/inteligencia/hermes` | Protocolo HERMES | ESTRUTURADO |
| `/corporativo/inteligencia/treinamento` | Treinamento & Curadoria IA | ESTRUTURADO |
| `/corporativo/inteligencia/comite` | Comite de Validacao | ESTRUTURADO |
| `/corporativo/inteligencia/fabrica` | Fabrica de Agentes | ESTRUTURADO |

### 3.2 OBRA (37 paginas)

| Rota | Tela | Status |
|------|------|--------|
| `/obra` | Dashboard Obra | PROTOTIPO |
| `/obra/comercial` | Dashboard Comercial | PROTOTIPO |
| `/obra/comercial/estruturacao` | Estruturacao | ESTRUTURADO |
| `/obra/comercial/estrutura` | Estrutura (v4.5) | ESTRUTURADO |
| `/obra/comercial/receita` | Receita | ESTRUTURADO |
| `/obra/comercial/custo` | Custo | ESTRUTURADO |
| `/obra/comercial/suprimentos` | Suprimentos | ESTRUTURADO |
| `/obra/comercial/suprimento` | Suprimento (v4.5) | ESTRUTURADO |
| `/obra/comercial/engenharia-valor` | Engenharia de Valor | ESTRUTURADO |
| `/obra/comercial/analytics` | Analytics Comercial | ESTRUTURADO |
| `/obra/comercial/eap` | EAP | PROTOTIPO |
| `/obra/comercial/baseline` | Baseline | PROTOTIPO |
| `/obra/comercial/aditivos` | Aditivos | PROTOTIPO |
| `/obra/comercial/medicao-producao` | Medicao Producao | PROTOTIPO |
| `/obra/comercial/medicao-cliente` | Medicao Cliente | PROTOTIPO |
| `/obra/comercial/faturamento` | Faturamento | PROTOTIPO |
| `/obra/comercial/comparativo` | Comparativo | PROTOTIPO |
| `/obra/engenharia` | Dashboard Engenharia | PROTOTIPO |
| `/obra/engenharia/projetos` | Projetos | ESTRUTURADO |
| `/obra/engenharia/planejamento` | Planejamento | ESTRUTURADO |
| `/obra/producao` | Dashboard Producao | PROTOTIPO |
| `/obra/producao/rdo` | RDO | ESTRUTURADO |
| `/obra/producao/apontamentos` | Apontamentos | ESTRUTURADO |
| `/obra/producao/equipamentos` | Equipamentos | ESTRUTURADO |
| `/obra/administrativo` | Dashboard Administrativo | PROTOTIPO |
| `/obra/administrativo/rh` | RH | ESTRUTURADO |
| `/obra/administrativo/financeiro` | Financeiro | PROTOTIPO |
| `/obra/administrativo/ti` | TI | ESTRUTURADO |
| `/obra/administrativo/comunicacao` | Comunicacao | ESTRUTURADO |
| `/obra/garantidores` | Dashboard Garantidores | PROTOTIPO |
| `/obra/garantidores/qualidade` | Qualidade | ESTRUTURADO |
| `/obra/garantidores/ssma` | SSMA | ESTRUTURADO |
| `/obra/garantidores/juridico` | Juridico | ESTRUTURADO |
| `/obra/gerencial/cockpit` | Cockpit de Governanca | ESTRUTURADO |
| `/obra/gerencial/encerramento` | Encerramento Mensal | ESTRUTURADO |
| `/obra/gerencial/indicadores` | Indicadores & KPIs | ESTRUTURADO |
| `/obra/inteligencia/feedback` | Feedback & Calibragem | ESTRUTURADO |
| `/obra/inteligencia/agentes` | Agentes da Obra | ESTRUTURADO |

### 3.3 HUB & INTRANET (4 paginas)

| Rota | Tela | Status |
|------|------|--------|
| `/` | Home / Login | PROTOTIPO |
| `/hub` | GENESIS Hub | ESTRUTURADO |
| `/intranet` | Intranet | PROTOTIPO |

---

## 4. FLUXOS DE USUARIO

| Fluxo | Descricao | Status |
|-------|-----------|--------|
| **Navegacao Global** | Sidebar + Topbar + Area de Trabalho | FUNCIONAL |
| **Selecao de Obra** | Context global que persiste obra selecionada | FUNCIONAL |
| **Troca de Tema** | Claro/Escuro com persistencia localStorage | FUNCIONAL |
| **Acoes Rapidas** | 9 icones no topbar com navegacao | FUNCIONAL |
| **Fluxo Comercial Obra** | Estrutura → Receita → Custo → Suprimento → Analytics | REPRESENTADO |
| **GENESIS Hub** | Chat + Calendario + Reunioes + IA (4 abas) | ESTRUTURADO |
| **Protocolo HERMES** | Dashboard de Agentes IA | ESTRUTURADO |
| **Encerramento Mensal** | Fluxo de 8 etapas para fechamento | REPRESENTADO |

---

## 5. COMPONENTES PRINCIPAIS

### 5.1 LAYOUT (TRAVADOS)

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| Sidebar | `components/layout/sidebar.tsx` | Navegacao lateral |
| Topbar | `components/layout/topbar.tsx` | Barra superior (61px) |
| AppLayout | `components/layout/app-layout.tsx` | Estrutura base |

### 5.2 HUB

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| HubContent | `components/hub/hub-content.tsx` | Container do Hub |
| ChatModule | `components/hub/chat-module.tsx` | Modulo de Chat |
| CalendarModule | `components/hub/calendar-module.tsx` | Modulo de Calendario |
| MeetingModule | `components/hub/meeting-module.tsx` | Modulo de Reunioes |
| AIAssistantModule | `components/hub/ai-assistant-module.tsx` | Modulo de IA |

### 5.3 UI CUSTOMIZADOS

| Componente | Arquivo | Funcao |
|------------|---------|--------|
| InfoTooltip | `components/ui/info-tooltip.tsx` | Tooltip informativo |
| StatsCard | `components/dashboard/stats-card.tsx` | Card de metricas |
| ObrasTable | `components/dashboard/obras-table.tsx` | Tabela de obras |
| RecentActivity | `components/dashboard/recent-activity.tsx` | Atividades recentes |

---

## 6. DESIGN SYSTEM FIBONACCI

### 6.1 ESPACAMENTOS

```
--space-1: 1px    --space-13: 13px   --space-55: 55px
--space-2: 2px    --space-21: 21px   --space-89: 89px
--space-3: 3px    --space-34: 34px
--space-5: 5px
--space-8: 8px
```

### 6.2 BORDER-RADIUS

```
--radius-fib-1: 2px    --radius-fib-4: 8px
--radius-fib-2: 3px    --radius-fib-5: 13px
--radius-fib-3: 5px    --radius-fib-6: 21px
```

### 6.3 TIPOGRAFIA (Escala Aurea)

```
--text-xs: 10px     --text-2xl: 23px
--text-sm: 12px     --text-3xl: 28px
--text-base: 14px   --text-4xl: 34px
--text-lg: 16px     --text-5xl: 42px
--text-xl: 19px
```

### 6.4 SOMBRAS

```
--shadow-genesis-sm: Multi-camada sutil
--shadow-genesis-md: Multi-camada media
--shadow-genesis-lg: Multi-camada profunda
```

### 6.5 CORES PRINCIPAIS (OKLCH)

```
Primary (Aahbrant): oklch(0.40 0.15 25) - #96110D
Background Light: oklch(0.985 0 0)
Background Dark: oklch(0.145 0 0)
Foreground Light: oklch(0.145 0 0)
Foreground Dark: oklch(0.985 0 0)
```

---

## 7. PROTOCOLO HERMES - AGENTES IA

| Agente | Funcao | Cor |
|--------|--------|-----|
| **HERMES** | Orquestrador Central | Dourado |
| **ATENA** | Estrategia & Estrutura | Azul |
| **PLUTO** | Comercial & Financeiro | Verde |
| **TEMIS** | Compliance & Acessos | Roxo |
| **HEFESTO** | Producao & Campo | Laranja |

---

## 8. ITENS TRAVADOS (IMUTAVEIS)

| Item | Data |
|------|------|
| Estrutura GENESIS v3.1 | 03/01/2026 |
| Menu do Usuario (Avatar) | 04/01/2026 |
| Sistema de Temas (Claro/Escuro) | 04/01/2026 |
| InfoTooltip | 04/01/2026 |
| Remocao Usuario Sidebar | 04/01/2026 |
| TOPBAR COMPLETO (altura 61px) | 04/01/2026 |
| Card Acoes Rapidas - Visual Premium | 04/01/2026 |
| GENESIS Hub (Chat, Calendario, Reunioes, IA) | 04/01/2026 |
| Hub Layout Estatico | 04/01/2026 |
| Design System Fibonacci + OKLCH + Aahbrant | 04/01/2026 |
| ESTRUTURA v4.5 COMPLETA | 04/01/2026 |

---

## 9. PARTES CONCEITUAIS (A IMPLEMENTAR)

| Area | Prioridade |
|------|------------|
| Autenticacao Real (Supabase/Auth) | ALTA |
| Persistencia de Dados (Banco) | ALTA |
| APIs de Integracao (CRUD) | ALTA |
| Chat Real (WebSocket) | MEDIA |
| Video Chamada (WebRTC) | MEDIA |
| Agentes IA Funcionais (AI SDK) | MEDIA |
| Notificacoes Push | MEDIA |
| Relatorios/Exports (PDF, Excel) | BAIXA |
| Auditoria de Acoes | BAIXA |

---

## 10. METRICAS DO PROJETO

| Metrica | Valor |
|---------|-------|
| Total de Telas | 61 |
| Telas Estruturadas | 42 (69%) |
| Telas Prototipo | 19 (31%) |
| Componentes Customizados | 15 |
| Itens Travados | 11 |
| Fluxos Funcionais | 8 |
| Departamentos Corporativo | 6 |
| Departamentos Obra | 7 |
| Agentes IA | 5 |

---

## 11. PROXIMOS PASSOS RECOMENDADOS

1. **Implementar Autenticacao** - Supabase Auth ou sistema customizado
2. **Configurar Banco de Dados** - Supabase/Neon para persistencia
3. **Criar APIs CRUD** - Endpoints para entidades principais
4. **Integrar AI SDK** - Tornar agentes HERMES funcionais
5. **Implementar WebSocket** - Chat em tempo real
6. **Testes E2E** - Validar fluxos criticos

---

**Documento gerado automaticamente pelo GENESIS v4.5**
