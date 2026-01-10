"use client"

import { ComercialSidebar } from "./_components/comercial-sidebar"
import { ComercialTopBar } from "./_components/comercial-top-bar"
import { KPIInteligente } from "./_components/kpi-inteligente"
import { CardProspeccaoV2 } from "./_components/card-prospeccao-v2"
import { CardPropostasV2 } from "./_components/card-propostas-v2"
import { CardConsolidadoV2 } from "./_components/card-consolidado-v2"
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
        {/* Top Bar com Alertas Integrados */}
        <ComercialTopBar
          titulo="Visão Geral Inteligente"
          badges={[
            { label: "Pipeline", value: `R$ ${(kpisPrimarios.pipelineTotal / 1000000).toFixed(0)}Mi`, variant: "outline" },
            { label: "Conversão", value: `${kpisPrimarios.taxaConversao}%`, variant: kpisPrimarios.taxaConversao < 20 ? "destructive" : "default" },
          ]}
          alertasCriticos={alertasCriticos}
        />

        {/* Conteúdo Scrollável */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-[1800px] mx-auto space-y-6">
            {/* LINHA 1: 4 KPIs Inteligentes - Proporção Otimizada */}
            <div className="grid grid-cols-4 gap-4">
              <KPIInteligente tipo="pipeline" dados={dadosPipeline} />
              <KPIInteligente tipo="ganho" dados={dadosGanho} />
              <KPIInteligente tipo="conversao" dados={dadosConversao} />
              <KPIInteligente tipo="risco" dados={{}} />
            </div>

            {/* LINHA 2: 3 Cards Grandes - Altura Equalizada */}
            <div className="grid grid-cols-3 gap-4">
              {/* Card 1: Prospecção */}
              <div className="flex">
                <CardProspeccaoV2 dados={dadosProspeccao} />
              </div>

              {/* Card 2: Propostas em Andamento */}
              <div className="flex">
                <CardPropostasV2 dados={dadosPropostasAndamento} />
              </div>

              {/* Card 3: Consolidado Gerencial */}
              <div className="flex">
                <CardConsolidadoV2 dados={dadosConsolidado} />
              </div>
            </div>

            {/* LINHA 3: Insights e Recomendações (Novo Espaço Aproveitado) */}
            <div className="grid grid-cols-2 gap-4">
              {/* Próximas Ações Recomendadas */}
              <div className="p-4 rounded-lg border bg-card space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <h3 className="font-semibold text-sm">PRÓXIMAS AÇÕES RECOMENDADAS</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded bg-blue-50 border border-blue-200">
                    <span className="text-xs font-bold text-blue-600 mt-0.5">1.</span>
                    <p className="text-xs text-blue-900">
                      <span className="font-semibold">Follow-up UHE Belo Monte</span> - R$ 890Mi vence amanhã • Contato: Roberto Fernandes
                    </p>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded bg-amber-50 border border-amber-200">
                    <span className="text-xs font-bold text-amber-600 mt-0.5">2.</span>
                    <p className="text-xs text-amber-900">
                      <span className="font-semibold">Destravar Orçamento</span> - R$ 280Mi parado há 20 dias • Responsável: Pedro Alves
                    </p>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded bg-purple-50 border border-purple-200">
                    <span className="text-xs font-bold text-purple-600 mt-0.5">3.</span>
                    <p className="text-xs text-purple-900">
                      <span className="font-semibold">Acelerar Prospecção</span> - Captar 8 novos clientes este mês para manter pipeline
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance vs Meta */}
              <div className="p-4 rounded-lg border bg-card space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h3 className="font-semibold text-sm">PERFORMANCE vs META ANUAL</h3>
                </div>
                <div className="space-y-3">
                  {/* Meta Receita */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Receita Anual</span>
                      <span className="font-bold">100% da meta</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: "100%" }} />
                    </div>
                    <p className="text-[10px] text-emerald-600 font-medium">
                      ✓ R$ 800Mi (Meta: R$ 800Mi) - Projetado para superar
                    </p>
                  </div>

                  {/* Meta Conversão */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Taxa de Conversão</span>
                      <span className="font-bold text-red-600">0% vs 20% meta</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: "0%" }} />
                    </div>
                    <p className="text-[10px] text-red-600 font-medium">
                      ⚠ Urgente: Destravar funil para não comprometer Q1
                    </p>
                  </div>

                  {/* Meta Prospecção */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Prospecção Mensal</span>
                      <span className="font-bold text-amber-600">60% da meta</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: "60%" }} />
                    </div>
                    <p className="text-[10px] text-amber-600 font-medium">
                      ⚠ Atenção: Captar 8 clientes para manter ritmo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Informativo */}
            <div className="p-3 rounded-lg border bg-gradient-to-r from-primary/5 to-primary/10 text-center">
              <p className="text-xs text-muted-foreground">
                💡 <span className="font-medium">Visão Geral Inteligente</span> • Atualizado em tempo real • 
                Decisões baseadas em dados • Ações recomendadas por IA • <span className="font-semibold text-primary">ERP-GNESIS</span>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
