"use client"

import { Building2, FileCheck, AlertTriangle, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    title: "Obras Ativas",
    value: "8",
    description: "3 em execução, 5 em planejamento",
    icon: Building2,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Baselines Homologadas",
    value: "12",
    description: "2 pendentes de aprovação",
    icon: FileCheck,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Gates Pendentes",
    value: "5",
    description: "Competência Janeiro/2026",
    icon: AlertTriangle,
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    title: "Margem Média",
    value: "18.5%",
    description: "+2.3% vs. mês anterior",
    icon: TrendingUp,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
