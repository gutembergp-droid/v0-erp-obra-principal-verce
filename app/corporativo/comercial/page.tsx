"use client"

import { SidebarInsights } from "./_components/sidebar-insights"
import { KPIInteligente } from "./_components/kpi-inteligente"
import { CardProspeccaoV2 } from "./_components/card-prospeccao-v2"
import { CardPropostasV2 } from "./_components/card-propostas-v2"
import { CardConsolidadoV2 } from "./_components/card-consolidado-v2"
import { ComercialNavbar } from "./_components/comercial-navbar"
import { useComercial } from "@/contexts/comercial-context"

// ============================================================================
// COMPONENT - VISÃO GERAL INTELIGENTE COM SIDEBAR
// ============================================================================

export default function ComercialDashboard() {
  const {
    getKPIsPrimarios,
    getDadosProspeccao,
    getDadosPropostasAndamento,
    getDadosConsolidado,
    getAlertasCriticos,
  } = useComercial()

  // Calcular todos os dados
  const kpisPrimarios = getKPIsPrimarios()
  const dadosProspeccao = getDadosProspeccao()
  const dadosPropostasAndamento = getDadosPropostasAndamento()
  const dadosConsolidado = getDadosConsolidado()
  const alertasCriticos = getAlertasCriticos()

  // Dados para KPIs Inteligentes
  const dadosPipeline = {
    valor: kpisPrimarios.pipelineTotal,
  }

  const dadosGanho = {
    valor: kpisPrimarios.valorGanho,
    quantidade: 12,
    pipelineAtual: kpisPrimarios.pipelineTotal,
  }

  const dadosConversao = {
    taxa: kpisPrimarios.taxaConversao,
  }

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* TOPBAR SECUNDÁRIO */}
      <div className="flex-shrink-0 z-50">
        <ComercialNavbar />
      </div>

      {/* Conteúdo Principal - SEM SCROLL (scroll fica na moldura) */}
      <div className="flex-1 flex overflow-hidden bg-background mt-3">
        {/* Área de Conteúdo Principal */}
        <main className="flex-1 overflow-hidden p-6">
          <div className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ borderRadius: '25px', boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.35), 0 2px 8px rgba(0, 0, 0, 0.05)', padding: '25px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="space-y-4">
              {/* LINHA 1: 4 KPIs Inteligentes */}
              <div className="grid grid-cols-4 gap-3">
                <KPIInteligente tipo="pipeline" dados={dadosPipeline} />
                <KPIInteligente tipo="ganho" dados={dadosGanho} />
                <KPIInteligente tipo="conversao" dados={dadosConversao} />
                <KPIInteligente tipo="risco" dados={{}} />
              </div>

              {/* LINHA 2: 3 Cards Grandes - Tela Cheia */}
              <div className="grid grid-cols-3 gap-3 flex-1">
                {/* Card 1: Prospecção */}
                <CardProspeccaoV2 dados={dadosProspeccao} />

                {/* Card 2: Propostas em Andamento */}
                <CardPropostasV2 dados={dadosPropostasAndamento} />

                {/* Card 3: Consolidado Gerencial */}
                <CardConsolidadoV2 dados={dadosConsolidado} />
              </div>

              {/* Footer Informativo */}
              <div className="p-2 rounded border bg-gradient-to-r from-primary/5 to-primary/10 text-center">
                <p className="text-[10px] text-muted-foreground">
                  💡 <span className="font-medium">Visão Geral Inteligente</span> • Atualizado em tempo real • 
                  Decisões baseadas em dados • <span className="font-semibold text-primary">ERP-GNESIS</span>
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Sidebar Direita: Insights e Recomendações */}
        <SidebarInsights />
      </div>

      {/* CSS Global para esconder scrollbars */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
