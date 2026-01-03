import { redirect } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ObrasTable } from "@/components/dashboard/obras-table"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, DollarSign, Package, Users, Plus } from "lucide-react"

export default function Home() {
  redirect("/intranet")

  return (
    <AppLayout>
      <Header title="Dashboard" description="Visão geral do sistema de gestão de obras" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Obras Ativas"
            value="12"
            description="3 em andamento, 2 pausadas"
            icon={Building2}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Receita Mensal"
            value="R$ 485.000"
            description="Faturamento de janeiro"
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Itens em Estoque"
            value="1.248"
            description="48 itens com estoque baixo"
            icon={Package}
            trend={{ value: 3, isPositive: false }}
          />
          <StatsCard
            title="Funcionários"
            value="87"
            description="12 em campo hoje"
            icon={Users}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Obras Table */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Obras Recentes</CardTitle>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Obra
                </Button>
              </CardHeader>
              <CardContent>
                <ObrasTable />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
