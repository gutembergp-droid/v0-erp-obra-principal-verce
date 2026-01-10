"use client"

import { ComercialSidebar } from "./_components/comercial-sidebar"
import { ComercialTopBar } from "./_components/comercial-top-bar"
import { SidebarInsights } from "./_components/sidebar-insights"
import { KPIInteligente } from "./_components/kpi-inteligente"
import { CardProspeccaoV2 } from "./_components/card-prospeccao-v2"
import { CardPropostasV2 } from "./_components/card-propostas-v2"
import { CardConsolidadoV2 } from "./_components/card-consolidado-v2"
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
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar Esquerda (Navegação) */}
      <ComercialSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar com Alertas Integrados */}
        <ComercialTopBar
          titulo="Visão Geral Inteligente"
          badges={[
            { label: "Pipeline", value: `R$ ${(kpisPrimarios.pipelineTotal / 1000000).toFixed(0)}Mi`, variant: "outline" },
            { label: "Conversão", value: `${kpisPrimarios.taxaConversao}%`, variant: kpisPrimarios.taxaConversao < 20 ? "destructive" : "default" },
          ]}
          alertasCriticos={alertasCriticos}
        />

        {/* Layout Principal: Conteúdo + Sidebar Insights */}
        <div className="flex-1 flex overflow-hidden">
          {/* Área de Conteúdo Principal (Tela Cheia) */}
          <main className="flex-1 overflow-auto p-5">
            <div className="h-full space-y-4">
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
          </main>

          {/* Sidebar Direita: Insights e Recomendações */}
          <SidebarInsights />
        </div>
      </div>
    </div>
  )
}
