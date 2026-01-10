"use client"

import { ComercialSidebar } from "./_components/comercial-sidebar"
import { ComercialTopBar } from "./_components/comercial-top-bar"
import { useComercial } from "@/contexts/comercial-context"

// ============================================================================
// COMPONENT - VISÃO GERAL DO COMERCIAL (VERSÃO SIMPLIFICADA PARA DEBUG)
// ============================================================================

export default function ComercialDashboard() {
  try {
    const context = useComercial()

    // Teste 1: Context carregou?
    if (!context) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-red-600">ERRO: Context não carregou</h1>
        </div>
      )
    }

    // Teste 2: Funções existem?
    const {
      getKPIsPrimarios,
      getDadosProspeccao,
      getDadosPropostasAndamento,
      getDadosConsolidado,
      getAlertasCriticos,
    } = context

    if (!getKPIsPrimarios) {
      return (
        <div className="p-8">
          <h1 className="text-2xl font-bold text-red-600">ERRO: getKPIsPrimarios não existe</h1>
        </div>
      )
    }

    // Teste 3: Calcular dados
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
              {/* DEBUG: Mostrar dados calculados */}
              <div className="p-4 bg-green-100 border border-green-300 rounded">
                <h2 className="font-bold text-green-900">✅ Dados Carregados com Sucesso!</h2>
                <pre className="text-xs mt-2">{JSON.stringify(kpisPrimarios, null, 2)}</pre>
              </div>

              {/* PLACEHOLDER para componentes */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-4 border rounded bg-white">
                  <p className="text-sm font-bold">Pipeline Total</p>
                  <p className="text-2xl">{`R$ ${(kpisPrimarios.pipelineTotal / 1000000).toFixed(0)}Mi`}</p>
                </div>
                <div className="p-4 border rounded bg-white">
                  <p className="text-sm font-bold">Valor Ganho</p>
                  <p className="text-2xl">{`R$ ${(kpisPrimarios.valorGanho / 1000000).toFixed(0)}Mi`}</p>
                </div>
                <div className="p-4 border rounded bg-white">
                  <p className="text-sm font-bold">Taxa Conversão</p>
                  <p className="text-2xl">{kpisPrimarios.taxaConversao}%</p>
                </div>
                <div className="p-4 border rounded bg-white">
                  <p className="text-sm font-bold">Alertas</p>
                  <p className="text-2xl">{kpisPrimarios.totalAlertas}</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-100 border border-yellow-300 rounded">
                <p className="text-sm font-bold text-yellow-900">
                  ⚠️ Componentes complexos desabilitados para debug
                </p>
                <p className="text-xs text-yellow-800 mt-1">
                  Se você está vendo isto, o problema é nos componentes individuais, não no Context.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600">ERRO CRÍTICO:</h1>
        <pre className="mt-4 p-4 bg-red-50 border border-red-300 rounded text-xs">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      </div>
    )
  }
}
