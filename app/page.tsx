import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { ObrasResumo } from "@/components/dashboard/obras-resumo"
import { GatesStatus } from "@/components/dashboard/gates-status"
import { AtividadesRecentes } from "@/components/dashboard/atividades-recentes"

export default function DashboardPage() {
  return (
    <AppLayout>
      <Header title="Dashboard" description="Visão geral do ERP GENESIS - O Corporativo governa. A Obra executa." />

      <div className="p-6 space-y-6">
        {/* Estatísticas Principais */}
        <DashboardStats />

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Obras */}
          <div className="lg:col-span-2">
            <ObrasResumo />
          </div>

          {/* Gates Status */}
          <div className="lg:col-span-1 space-y-6">
            <GatesStatus />
            <AtividadesRecentes />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
