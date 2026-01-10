"use client"

import { ComercialSidebar } from "./_components/comercial-sidebar"
import { ComercialTopBar } from "./_components/comercial-top-bar"
import { KPIsPrimarios } from "./_components/kpis-primarios"
import { CardProspeccao } from "./_components/card-prospeccao"
import { CardPropostasAndamento } from "./_components/card-propostas-andamento"
import { CardConsolidado } from "./_components/card-consolidado"
import { AlertasCriticos } from "./_components/alertas-criticos"
import { useComercial } from "@/contexts/comercial-context"

// ============================================================================
// COMPONENT - VISÃO GERAL DO COMERCIAL
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

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <ComercialSidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <ComercialTopBar
          titulo="Visão Geral"
          badges={[
            { label: "Pipeline", value: `R$ ${(kpisPrimarios.pipelineTotal / 1000000).toFixed(0)}Mi` },
            { label: "Taxa Conv.", value: `${kpisPrimarios.taxaConversao}%`, variant: "default" },
          ]}
        />

        {/* Conteúdo Scrollável */}
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-[1800px] mx-auto space-y-4">
            {/* LINHA 1: KPIs Primários */}
            <KPIsPrimarios
              pipelineTotal={kpisPrimarios.pipelineTotal}
              valorGanho={kpisPrimarios.valorGanho}
              taxaConversao={kpisPrimarios.taxaConversao}
              totalAlertas={kpisPrimarios.totalAlertas}
            />

            {/* LINHA 2: 3 Cards Grandes */}
            <div className="grid grid-cols-3 gap-4">
              {/* Card 1: Prospecção (Esquerda) */}
              <CardProspeccao dados={dadosProspeccao} />

              {/* Card 2: Propostas em Andamento (Centro) */}
              <CardPropostasAndamento dados={dadosPropostasAndamento} />

              {/* Card 3: Consolidado Gerencial (Direita) */}
              <CardConsolidado dados={dadosConsolidado} />
            </div>

            {/* LINHA 3: Alertas Críticos */}
            <AlertasCriticos dados={alertasCriticos} />
          </div>
        </main>
      </div>
    </div>
  )
}
