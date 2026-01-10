"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle2, TrendingUp as TrendingUpIcon, TrendingDown } from "lucide-react"
import { BarChart, Bar, ResponsiveContainer } from "recharts"

// ============================================================================
// COMPONENT - KPIs DE PROPOSTAS (PROFISSIONAL)
// ============================================================================

interface KPIPropostasProps {
  kpis: {
    total: number
    emProgresso: number
    consolidadas: number
    enviadas: number
    valorTotal: number
    valorEnviado: number
    valorElaboracao: number
    valorMonitoramento: number
  }
}

export function KPIsPropostas({ kpis }: KPIPropostasProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `R$ ${(value / 1000000000).toFixed(1)}Bi`
    if (value >= 1000000) return `R$ ${(value / 1000000).toFixed(0)}Mi`
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  // Mock data para sparklines (últimos 7 dias)
  const sparklineData = [
    { value: 3 }, { value: 4 }, { value: 3 }, { value: 5 }, { value: 4 }, { value: 5 }, { value: 5 }
  ]

  const progressoData = [
    { value: 2 }, { value: 2 }, { value: 3 }, { value: 3 }, { value: 2 }, { value: 3 }, { value: 3 }
  ]

  const consolidadasData = [
    { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }
  ]

  const enviadasData = [
    { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }
  ]

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* CARD 1: Total */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <FileText className="w-5 h-5 text-blue-600" />
            <Badge variant="outline" className="text-xs">7 dias</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-3xl font-bold">{kpis.total}</p>
            <p className="text-xs text-muted-foreground mt-1">Total de Propostas</p>
          </div>
          
          {/* Sparkline */}
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sparklineData}>
                <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tendência */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-emerald-600">
              <TrendingUpIcon className="w-3 h-3" />
              <span className="font-bold">↑ 25%</span>
            </div>
            <span className="text-muted-foreground">vs mês anterior</span>
          </div>

          <p className="text-[10px] text-muted-foreground">
            Última atualização: agora
          </p>
        </CardContent>
      </Card>

      {/* CARD 2: Em Progresso */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-amber-600" />
            <Badge variant="outline" className="text-xs">Ativas</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-3xl font-bold text-amber-600">{kpis.emProgresso}</p>
            <p className="text-xs text-muted-foreground mt-1">Em Progresso</p>
          </div>
          
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressoData}>
                <Bar dataKey="value" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-600">
              <TrendingUpIcon className="w-3 h-3" />
              <span className="font-bold">↑ 50%</span>
            </div>
            <span className="text-muted-foreground">vs semana passada</span>
          </div>

          <p className="text-[10px] text-muted-foreground">
            Última atualização: agora
          </p>
        </CardContent>
      </Card>

      {/* CARD 3: Consolidadas */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <Badge variant="outline" className="text-xs">Prontas</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-3xl font-bold text-emerald-600">{kpis.consolidadas}</p>
            <p className="text-xs text-muted-foreground mt-1">Consolidadas</p>
          </div>
          
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consolidadasData}>
                <Bar dataKey="value" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-emerald-600">
              <span className="font-bold">● Estável</span>
            </div>
            <span className="text-muted-foreground">sem variação</span>
          </div>

          <p className="text-[10px] text-muted-foreground">
            Última atualização: agora
          </p>
        </CardContent>
      </Card>

      {/* CARD 4: Enviadas */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <TrendingUpIcon className="w-5 h-5 text-purple-600" />
            <Badge variant="outline" className="text-xs">Cliente</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <p className="text-3xl font-bold text-purple-600">{kpis.enviadas}</p>
            <p className="text-xs text-muted-foreground mt-1">Enviadas</p>
          </div>
          
          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enviadasData}>
                <Bar dataKey="value" fill="#a855f7" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-purple-600">
              <span className="font-bold">● Estável</span>
            </div>
            <span className="text-muted-foreground">aguardando retorno</span>
          </div>

          <p className="text-[10px] text-muted-foreground">
            Última atualização: agora
          </p>
        </CardContent>
      </Card>

      {/* CARD 5: Pipeline - VELOCÍMETRO PROFISSIONAL */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <TrendingUpIcon className="w-5 h-5 text-blue-600" />
            <Badge variant="default" className="text-xs bg-blue-600">Pipeline</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Velocímetro aprimorado */}
          <div className="relative">
            <div className="relative w-full aspect-[2/1] flex items-end justify-center">
              <svg viewBox="0 0 100 50" className="w-full">
                {/* Background arc */}
                <path
                  d="M 10,50 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Segmentos coloridos */}
                <path
                  d="M 10,50 A 40,40 0 0,1 36.3,23.4"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M 36.3,23.4 A 40,40 0 0,1 63.7,23.4"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <path
                  d="M 63.7,23.4 A 40,40 0 0,1 90,50"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Ponteiro animado */}
                <line
                  x1="50"
                  y1="50"
                  x2="75"
                  y2="32"
                  stroke="#1e40af"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="group-hover:stroke-blue-600 transition-colors"
                />
                <circle cx="50" cy="50" r="4" fill="#1e40af" className="group-hover:fill-blue-600 transition-colors" />
              </svg>
            </div>
          </div>

          {/* Valor */}
          <div className="text-center -mt-2">
            <p className="text-2xl font-bold text-blue-600">{formatCurrency(kpis.valorTotal)}</p>
            <p className="text-xs text-muted-foreground">Pipeline Total</p>
          </div>

          {/* Mini breakdown sempre visível */}
          <div className="grid grid-cols-3 gap-1 text-[9px] pt-1">
            <div className="text-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mx-auto mb-0.5" />
              <p className="font-bold">{formatCurrency(kpis.valorEnviado)}</p>
            </div>
            <div className="text-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mx-auto mb-0.5" />
              <p className="font-bold">{formatCurrency(kpis.valorElaboracao)}</p>
            </div>
            <div className="text-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto mb-0.5" />
              <p className="font-bold">{formatCurrency(kpis.valorMonitoramento)}</p>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Distribuição por status
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
