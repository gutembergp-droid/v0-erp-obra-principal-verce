"use client"

import { ComercialSidebar } from "./_components/comercial-sidebar"
import { ComercialTopBar } from "./_components/comercial-top-bar"
import { KPIInteligente } from "./_components/kpi-inteligente"
import { CardProspeccaoV2 } from "./_components/card-prospeccao-v2"
import { CardPropostasV2 } from "./_components/card-propostas-v2"
import { CardConsolidadoV2 } from "./_components/card-consolidado-v2"
import { AlertasCriticos } from "./_components/alertas-criticos"
import { useComercial } from "@/contexts/comercial-context"

// ============================================================================
// COMPONENT - VISÃO GERAL INTELIGENTE
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
      {/* Sidebar */}
      <ComercialSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <ComercialTopBar
          titulo="Visão Geral Inteligente"
          badges={[
            { label: "Pipeline", value: `R$ ${(kpisPrimarios.pipelineTotal / 1000000).toFixed(0)}Mi`, variant: "outline" },
            { label: "Conversão", value: `${kpisPrimarios.taxaConversao}%`, variant: kpisPrimarios.taxaConversao < 20 ? "destructive" : "default" },
            { label: "Crítico", value: `${kpisPrimarios.totalAlertas}`, variant: kpisPrimarios.totalAlertas > 0 ? "destructive" : "default" },
          ]}
        />

        {/* Conteúdo Scrollável */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1800px] mx-auto space-y-4">
            {/* LINHA 1: 4 KPIs Inteligentes */}
            <div className="grid grid-cols-4 gap-3">
              <KPIInteligente tipo="pipeline" dados={dadosPipeline} />
              <KPIInteligente tipo="ganho" dados={dadosGanho} />
              <KPIInteligente tipo="conversao" dados={dadosConversao} />
              <KPIInteligente tipo="risco" dados={{}} />
            </div>

            {/* LINHA 2: 3 Cards Grandes com Inteligência */}
            <div className="grid grid-cols-3 gap-4">
              {/* Card 1: Prospecção */}
              <CardProspeccaoV2 dados={dadosProspeccao} />

              {/* Card 2: Propostas em Andamento */}
              <CardPropostasV2 dados={dadosPropostasAndamento} />

              {/* Card 3: Consolidado Gerencial */}
              <CardConsolidadoV2 dados={dadosConsolidado} />
            </div>

            {/* LINHA 3: Alertas Críticos */}
            <AlertasCriticos dados={alertasCriticos} />

            {/* Footer Informativo */}
            <div className="p-3 rounded border bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground">
                💡 <span className="font-medium">Visão Geral Inteligente</span> • Atualizado em tempo real • 
                Decisões baseadas em dados • Ações recomendadas por IA
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
