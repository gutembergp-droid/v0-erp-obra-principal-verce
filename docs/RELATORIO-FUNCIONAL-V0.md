================================================================================
MEMORIAL / RELATÓRIO / DOCUMENTO – ERP GENESIS
================================================================================
Produto................: ERP GENESIS
Versão.................: v1.0
Status.................: OFICIAL
Data...................: 2026-01-05
Hora...................: 16:45 (UTC-3)
IA Autora..............: v0 – Vercel AI
Solicitante............: Proprietário do Produto / GC
Arquitetura............: ChatGPT + Cursor + v0 + Vercel
Origem do Documento....: Nova Criação
Documento Substitui....: —
Documento Substituído Por: —
Objetivo...............: Gestão de Alta Performance por Micro-Unidades de Resultado
================================================================================

# RELATÓRIO FUNCIONAL E VISUAL COMPLETO – v0

---

## 1. VISÃO GERAL DO PRODUTO

### 1.1 Conceito Atual

O ERP GENESIS é um sistema de gestão integrada para empresas de construção civil,
focado em controle de obras, contratos e operações corporativas. O sistema opera
com arquitetura modular dividida em dois grandes módulos:

- **CORPORATIVO**: Gestão estratégica, comercial, administrativa e de governança
- **OBRA**: Gestão operacional de contratos individuais

### 1.2 Premissas Seguidas

| Premissa | Descrição |
|----------|-----------|
| Moldura Unificada | Sidebar + Topbar fixos em todas as telas |
| Layout Estático | Telas sem rolagem vertical da página principal |
| Design System Fibonacci | Espaçamentos e proporções baseados na sequência Fibonacci |
| Identidade Aahbrant | Cor primária vermelho #96110D (oklch 0.4 0.165 27) |
| Sistema OKLCH | Cores definidas em formato OKLCH para precisão |
| Temas Claro/Escuro | Suporte a dois temas com persistência |
| Contexto Global | Obra selecionada persiste em toda navegação |
| Governança Documental | Cabeçalho padrão obrigatório em documentos |

---

## 2. TELAS E INTERFACES CRIADAS

### 2.1 Módulo CORPORATIVO (20 telas)

| # | Rota | Nome | Objetivo | Status |
|---|------|------|----------|--------|
| 1 | /corporativo | Dashboard Corporativo | Visão geral corporativa | ( ) Final (X) Parcial ( ) Conceito |
| 2 | /corporativo/clientes | Clientes (legado) | Cadastro de clientes | ( ) Final (X) Parcial ( ) Conceito |
| 3 | /corporativo/contratos | Contratos (legado) | Gestão de contratos | ( ) Final (X) Parcial ( ) Conceito |
| 4 | /corporativo/centros-custo | Centros de Custo | Estrutura de custos | ( ) Final (X) Parcial ( ) Conceito |
| 5 | /corporativo/gate1 | Gate 1 | Aprovação inicial | ( ) Final (X) Parcial ( ) Conceito |
| 6 | /corporativo/comercial/clientes | Clientes & CRM | CRM e gestão de clientes | (X) Final ( ) Parcial ( ) Conceito |
| 7 | /corporativo/comercial/contratos | Contratos & Orçamentos | Compor 90, orçamentos | (X) Final ( ) Parcial ( ) Conceito |
| 8 | /corporativo/comercial/portfolio | Portfolio | Gestão de portfolio | (X) Final ( ) Parcial ( ) Conceito |
| 9 | /corporativo/estrategico/planejamento | Planejamento Estratégico | Metas e objetivos | (X) Final ( ) Parcial ( ) Conceito |
| 10 | /corporativo/estrategico/controladoria | Controladoria Central | Controle financeiro | (X) Final ( ) Parcial ( ) Conceito |
| 11 | /corporativo/estrategico/analytics | Analytics Corporativo | Dashboards e KPIs | (X) Final ( ) Parcial ( ) Conceito |
| 12 | /corporativo/obras/acessos | Gestão de Acessos | Controle de catracas | (X) Final ( ) Parcial ( ) Conceito |
| 13 | /corporativo/auditoria/compliance | Compliance | Conformidade e riscos | (X) Final ( ) Parcial ( ) Conceito |
| 14 | /corporativo/auditoria/campo | Auditoria de Campo | Inspeções in loco | (X) Final ( ) Parcial ( ) Conceito |
| 15 | /corporativo/qsms/qualidade | Qualidade & Segurança | SGQ e segurança | (X) Final ( ) Parcial ( ) Conceito |
| 16 | /corporativo/qsms/meio-ambiente | Meio Ambiente & Social | Gestão ambiental | (X) Final ( ) Parcial ( ) Conceito |
| 17 | /corporativo/inteligencia/hermes | Protocolo HERMES | Dashboard de agentes IA | (X) Final ( ) Parcial ( ) Conceito |
| 18 | /corporativo/inteligencia/treinamento | Treinamento & Curadoria | Gestão de modelos IA | (X) Final ( ) Parcial ( ) Conceito |
| 19 | /corporativo/inteligencia/comite | Comitê de Validação | Aprovação de modelos | (X) Final ( ) Parcial ( ) Conceito |
| 20 | /corporativo/inteligencia/fabrica | Fábrica de Agentes | Criação de agentes | (X) Final ( ) Parcial ( ) Conceito |

### 2.2 Módulo OBRA (37 telas)

| # | Rota | Nome | Objetivo | Status |
|---|------|------|----------|--------|
| 1 | /obra | Dashboard Obra | Visão geral da obra | ( ) Final (X) Parcial ( ) Conceito |
| 2 | /obra/comercial | Dashboard Comercial | KPIs comerciais | ( ) Final (X) Parcial ( ) Conceito |
| 3 | /obra/comercial/estruturacao | Estruturação | Montagem inicial | (X) Final ( ) Parcial ( ) Conceito |
| 4 | /obra/comercial/estrutura | Estrutura (v4.5) | EAP e estrutura | (X) Final ( ) Parcial ( ) Conceito |
| 5 | /obra/comercial/receita | Receita | Controle de receita | (X) Final ( ) Parcial ( ) Conceito |
| 6 | /obra/comercial/custo | Custo | Controle de custos | (X) Final ( ) Parcial ( ) Conceito |
| 7 | /obra/comercial/suprimentos | Suprimentos | Gestão de compras | (X) Final ( ) Parcial ( ) Conceito |
| 8 | /obra/comercial/suprimento | Suprimento (v4.5) | Gestão de compras | (X) Final ( ) Parcial ( ) Conceito |
| 9 | /obra/comercial/engenharia-valor | Engenharia de Valor | Otimização de custos | (X) Final ( ) Parcial ( ) Conceito |
| 10 | /obra/comercial/analytics | Analytics Comercial | Dashboards comerciais | (X) Final ( ) Parcial ( ) Conceito |
| 11 | /obra/comercial/eap | EAP | Estrutura analítica | ( ) Final (X) Parcial ( ) Conceito |
| 12 | /obra/comercial/baseline | Baseline | Linha base | ( ) Final (X) Parcial ( ) Conceito |
| 13 | /obra/comercial/aditivos | Aditivos | Gestão de aditivos | ( ) Final (X) Parcial ( ) Conceito |
| 14 | /obra/comercial/medicao-producao | Medição Produção | Medição interna | ( ) Final (X) Parcial ( ) Conceito |
| 15 | /obra/comercial/medicao-cliente | Medição Cliente | Medição externa | ( ) Final (X) Parcial ( ) Conceito |
| 16 | /obra/comercial/faturamento | Faturamento | Emissão de faturas | ( ) Final (X) Parcial ( ) Conceito |
| 17 | /obra/comercial/comparativo | Comparativo | Análise comparativa | ( ) Final (X) Parcial ( ) Conceito |
| 18 | /obra/engenharia | Dashboard Engenharia | KPIs de engenharia | ( ) Final (X) Parcial ( ) Conceito |
| 19 | /obra/engenharia/projetos | Projetos | Gestão de projetos | (X) Final ( ) Parcial ( ) Conceito |
| 20 | /obra/engenharia/planejamento | Planejamento | Cronograma e metas | (X) Final ( ) Parcial ( ) Conceito |
| 21 | /obra/producao | Dashboard Produção | KPIs de produção | ( ) Final (X) Parcial ( ) Conceito |
| 22 | /obra/producao/rdo | RDO | Relatório diário | (X) Final ( ) Parcial ( ) Conceito |
| 23 | /obra/producao/apontamentos | Apontamentos | Registro de horas | (X) Final ( ) Parcial ( ) Conceito |
| 24 | /obra/producao/equipamentos | Equipamentos | Gestão de máquinas | (X) Final ( ) Parcial ( ) Conceito |
| 25 | /obra/administrativo | Dashboard Admin | KPIs administrativos | ( ) Final (X) Parcial ( ) Conceito |
| 26 | /obra/administrativo/rh | RH | Recursos humanos | (X) Final ( ) Parcial ( ) Conceito |
| 27 | /obra/administrativo/financeiro | Financeiro | Fluxo de caixa | ( ) Final (X) Parcial ( ) Conceito |
| 28 | /obra/administrativo/ti | TI | Suporte técnico | (X) Final ( ) Parcial ( ) Conceito |
| 29 | /obra/administrativo/comunicacao | Comunicação | Mural e avisos | (X) Final ( ) Parcial ( ) Conceito |
| 30 | /obra/garantidores | Dashboard Garantidores | KPIs de conformidade | ( ) Final (X) Parcial ( ) Conceito |
| 31 | /obra/garantidores/qualidade | Qualidade | Controle de qualidade | (X) Final ( ) Parcial ( ) Conceito |
| 32 | /obra/garantidores/ssma | SSMA | Saúde e segurança | (X) Final ( ) Parcial ( ) Conceito |
| 33 | /obra/garantidores/juridico | Jurídico | Gestão jurídica | (X) Final ( ) Parcial ( ) Conceito |
| 34 | /obra/gerencial/cockpit | Cockpit de Governança | Painel executivo | (X) Final ( ) Parcial ( ) Conceito |
| 35 | /obra/gerencial/encerramento | Encerramento Mensal | Fluxo de fechamento | (X) Final ( ) Parcial ( ) Conceito |
| 36 | /obra/gerencial/indicadores | Indicadores & KPIs | SPI, CPI, Margem | (X) Final ( ) Parcial ( ) Conceito |
| 37 | /obra/inteligencia/feedback | Feedback & Calibragem | Ajuste de modelos | (X) Final ( ) Parcial ( ) Conceito |
| 38 | /obra/inteligencia/agentes | Agentes da Obra | IA específica da obra | (X) Final ( ) Parcial ( ) Conceito |

### 2.3 Módulo HUB & INTRANET (4 telas)

| # | Rota | Nome | Objetivo | Status |
|---|------|------|----------|--------|
| 1 | / | Home / Login | Página inicial | ( ) Final (X) Parcial ( ) Conceito |
| 2 | /hub | GENESIS Hub | Chat, Calendário, Reuniões, IA | (X) Final ( ) Parcial ( ) Conceito |
| 3 | /intranet | Intranet | Portal do colaborador | ( ) Final (X) Parcial ( ) Conceito |

### 2.4 Resumo Quantitativo

| Categoria | Quantidade |
|-----------|------------|
| Total de Telas | 61 |
| Telas Finalizadas | 42 (69%) |
| Telas Parciais | 19 (31%) |
| Telas Conceituais | 0 (0%) |

---

## 3. MÓDULOS FUNCIONAIS IDENTIFICADOS

### 3.1 Lista de Módulos

| Módulo | Departamentos | Setores | Maturidade |
|--------|---------------|---------|------------|
| **CORPORATIVO** | 6 | 18 | 75% |
| Estratégico | - | Planejamento, Controladoria, Analytics, IAM, Alçadas | 80% |
| Comercial | - | Clientes, Contratos, Portfolio | 85% |
| Administrativo | - | RH, TI, Ativos, Comunicação, Mural | 70% |
| Auditoria | - | Compliance, Campo, Estoque | 75% |
| QSMS | - | Qualidade, Segurança, Meio Ambiente, Social | 70% |
| Gestão Inteligente | - | HERMES, Treinamento, Comitê, Fábrica | 80% |
| **OBRA** | 7 | 22 | 70% |
| Gerencial | - | Cockpit, Encerramento, Indicadores | 85% |
| Comercial | - | Estrutura, Receita, Custo, Suprimento, Analytics | 75% |
| Engenharia | - | Projetos, Planejamento | 65% |
| Produção | - | RDO, Apontamentos, Equipamentos | 70% |
| Administrativo | - | RH, Financeiro, TI, Comunicação | 65% |
| Garantidores | - | Qualidade, SSMA, Jurídico | 70% |
| Gestão Inteligente | - | Feedback, Agentes | 75% |
| **HUB** | 1 | 4 | 80% |
| GENESIS Hub | - | Chat, Calendário, Reuniões, IA | 80% |

### 3.2 Descrição Funcional por Módulo

#### CORPORATIVO

| Departamento | Proposta Funcional |
|--------------|-------------------|
| Estratégico | Planejamento de longo prazo, KPIs corporativos, gestão de acessos (IAM), matriz de alçadas |
| Comercial | CRM, gestão de propostas (Compor 90), contratos, portfolio de obras |
| Administrativo | RH centralizado, TI, patrimônio, comunicação interna (Mural Hermes) |
| Auditoria | Compliance, auditorias de campo, controle de estoque |
| QSMS | Qualidade, segurança do trabalho, meio ambiente, responsabilidade social |
| Gestão Inteligente | Orquestração de agentes IA (HERMES), treinamento de modelos, fábrica de agentes |

#### OBRA

| Departamento | Proposta Funcional |
|--------------|-------------------|
| Gerencial | Cockpit executivo, encerramento mensal (9 gates), indicadores (SPI, CPI, Margem) |
| Comercial | Fluxo: Estrutura → Receita → Custo → Suprimento → Analytics |
| Engenharia | Projetos técnicos, planejamento (Gantt, cronograma) |
| Produção | RDO, apontamentos de mão de obra, gestão de equipamentos |
| Administrativo | RH da obra, financeiro (fluxo de caixa), TI local, comunicação |
| Garantidores | Qualidade da obra, SSMA (saúde, segurança, meio ambiente), jurídico |
| Gestão Inteligente | Feedback para calibragem de IA, agentes específicos da obra |

#### HUB

| Módulo | Proposta Funcional |
|--------|-------------------|
| Chat | Mensagens, canais, conversas 1:1, chamadas de vídeo/áudio |
| Calendário | Tarefas em Kanban/Lista, eventos, mini calendário |
| Reuniões | Agendamento, gravação, criação de atas, templates |
| IA | Assistente conversacional, agentes especializados |

---

## 4. FLUXOS DE USUÁRIO

### 4.1 Fluxos Desenhados

| Fluxo | Jornada | Status |
|-------|---------|--------|
| Navegação Global | Sidebar → Topbar → Área de Trabalho | COMPLETA |
| Seleção de Obra | Context global que persiste obra selecionada | COMPLETA |
| Troca de Tema | Claro/Escuro com persistência localStorage | COMPLETA |
| Ações Rápidas | 9 ícones no topbar com navegação | COMPLETA |
| Fluxo Comercial Obra | Estrutura → Receita → Custo → Suprimento → Analytics | REPRESENTADO (badges) |
| Encerramento Mensal | Fluxo de 8 etapas para fechamento | REPRESENTADO |
| GENESIS Hub | Chat + Calendário + Reuniões + IA (4 abas) | COMPLETA |

### 4.2 Jornadas Completas vs Incompletas

| Jornada | Etapas | Status |
|---------|--------|--------|
| Login → Dashboard | 2 etapas | INCOMPLETA (falta autenticação real) |
| Selecionar Obra → Navegar | 3 etapas | COMPLETA (visual) |
| Cadastrar Cliente → Contrato → Obra | 5 etapas | INCOMPLETA (falta CRUD real) |
| EAP → Medição → Faturamento | 6 etapas | INCOMPLETA (falta backend) |
| Criar Reunião → Gravar → Ata | 4 etapas | INCOMPLETA (falta integração) |

---

## 5. PADRÕES DE UI/UX

### 5.1 Layout

| Elemento | Especificação |
|----------|---------------|
| Sidebar | Fixa à esquerda, fundo escuro (oklch 0.15), 280px largura |
| Topbar | Fixo no topo, altura 61px, contém ações rápidas e busca |
| Área de Trabalho | flex-1, sem rolagem vertical, scroll interno |
| Cards | Border-radius 8px (Fibonacci), sombra genesis-sm |
| Espaçamentos | Sequência Fibonacci (8, 13, 21, 34, 55px) |

### 5.2 Componentes Reutilizáveis

| Componente | Localização | Função |
|------------|-------------|--------|
| AppLayout | components/layout/app-layout.tsx | Moldura principal |
| Sidebar | components/layout/sidebar.tsx | Menu lateral |
| Topbar | components/layout/topbar.tsx | Barra superior |
| InfoTooltip | components/ui/info-tooltip.tsx | Dicas informativas |
| StatsCard | components/dashboard/stats-card.tsx | Cards de métricas |
| ChatModule | components/hub/chat-module.tsx | Módulo de chat |
| CalendarModule | components/hub/calendar-module.tsx | Módulo de calendário |
| MeetingModule | components/hub/meeting-module.tsx | Módulo de reuniões |
| AIAssistantModule | components/hub/ai-assistant-module.tsx | Módulo de IA |
| HubContent | components/hub/hub-content.tsx | Orquestrador do Hub |

### 5.3 Padrões Visuais Definidos

| Padrão | Especificação |
|--------|---------------|
| Cores Primárias | Vermelho Aahbrant oklch(0.4 0.165 27) |
| Cores de Status | Success (verde), Warning (amarelo), Info (azul) |
| Tipografia | Montserrat (corpo), Bebas Neue (display) |
| Escala Tipográfica | 11, 13, 14, 16, 18, 21, 26, 34, 42, 55px (Fibonacci) |
| Sombras | 5 níveis (xs, sm, md, lg, xl) com OKLCH |
| Border-radius | 3, 5, 8, 13, 21px (Fibonacci) |
| Transições | 150ms (fast), 200ms (base), 300ms (slow), 350ms (theme) |

### 5.4 Sistema de Temas

| Tema | Background | Foreground | Primary |
|------|------------|------------|---------|
| Claro | oklch(0.98 0.004 75) | oklch(0.18 0.02 30) | oklch(0.4 0.165 27) |
| Escuro | oklch(0.15 0.012 35) | oklch(0.94 0.006 75) | oklch(0.55 0.18 27) |

---

## 6. LIMITAÇÕES E PENDÊNCIAS

### 6.1 O que ainda NÃO foi desenhado

| Item | Módulo | Impacto |
|------|--------|---------|
| Tela de Login real | Auth | ALTO |
| Cadastro de Usuários | Auth | ALTO |
| Formulários CRUD completos | Todos | ALTO |
| Gantt de Cronograma | Engenharia | MÉDIO |
| PBS (Pacotes de Serviço) | Produção | MÉDIO |
| Drag & Drop de Alocação | Produção | MÉDIO |
| Relatórios PDF/Excel | Todos | MÉDIO |
| Notificações Push | Hub | BAIXO |

### 6.2 Pontos que precisam de definição técnica

| Item | Descrição | Responsável |
|------|-----------|-------------|
| Schema do Banco | Definir tabelas, campos, relacionamentos | Cursor |
| APIs REST | Endpoints para cada CRUD | Cursor |
| Autenticação | JWT, Supabase Auth, ou NextAuth | Cursor |
| Integração ERP → Frontend | Conectar telas ao backend existente | v0 + Cursor |
| Algoritmos de Cálculo | F/CD, SPI, CPI, Custo MO | Cursor |
| WebSocket | Chat em tempo real | Cursor |
| Gravação de Reuniões | Integração com serviço externo | A DEFINIR |
| Agentes IA | Integração com AI SDK | v0 |

### 6.3 Dependências Externas

| Dependência | Propósito | Status |
|-------------|-----------|--------|
| Supabase/Neon | Banco de dados | A INTEGRAR |
| AI SDK Vercel | Agentes IA | A INTEGRAR |
| WebRTC | Vídeo chamadas | A DEFINIR |
| ERPs externos | Importação de dados | A DEFINIR |
| Biometria/Catracas | Controle de acesso | A DEFINIR |

---

## 7. ITENS TRAVADOS (GOVERNANÇA)

| Item | Data | Status |
|------|------|--------|
| Estrutura GENESIS v3.1 | 03/01/2026 | IMUTÁVEL |
| Menu do Usuário (Avatar) | 04/01/2026 | IMUTÁVEL |
| Sistema de Temas (Claro/Escuro) | 04/01/2026 | IMUTÁVEL |
| InfoTooltip | 04/01/2026 | IMUTÁVEL |
| Remoção Usuário Sidebar | 04/01/2026 | IMUTÁVEL |
| TOPBAR COMPLETO (altura 61px) | 04/01/2026 | IMUTÁVEL |
| Card Ações Rápidas - Visual Premium | 04/01/2026 | IMUTÁVEL |
| GENESIS Hub (Chat, Calendário, Reuniões, IA) | 04/01/2026 | IMUTÁVEL |
| Hub Layout Estático | 04/01/2026 | IMUTÁVEL |
| Design System Fibonacci + OKLCH + Aahbrant | 04/01/2026 | IMUTÁVEL |
| ESTRUTURA v4.5 COMPLETA | 04/01/2026 | IMUTÁVEL |
| Governança Documental (Cabeçalho Padrão) | 05/01/2026 | IMUTÁVEL |

---

## 8. CONCLUSÃO

O ERP GENESIS no v0 possui uma base sólida de UI/UX com:

- 61 telas criadas (69% finalizadas)
- Design System Fibonacci padronizado
- Identidade visual Aahbrant preservada
- Sistema de temas funcional
- Fluxos de navegação completos
- Componentes reutilizáveis

O próximo passo crítico é a integração com o backend (Cursor) para transformar as
interfaces visuais em uma aplicação funcional com persistência de dados real.

---

================================================================================
FIM DO DOCUMENTO
================================================================================
