"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, CheckCircle2, TrendingUp as TrendingUpIcon, TrendingDown } from "lucide-react"
import { BarChart, Bar, ResponsiveContainer } from "recharts"

// ============================================================================
// COMPONENT - KPIs DE PROPOSTAS (NÍVEL EXCELÊNCIA - DESIGNER SENIOR)
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

  // ============================================================================
  // DADOS MENSAIS (Últimos 6 meses) - TIMELINE
  // ============================================================================
  const mesesLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"]
  
  const timelineTotal = [
    { mes: "Jan", valor: 2 },
    { mes: "Fev", valor: 3 },
    { mes: "Mar", valor: 3 },
    { mes: "Abr", valor: 4 },
    { mes: "Mai", valor: 4 },
    { mes: "Jun", valor: 5 },
  ]

  const timelineProgresso = [
    { mes: "Jan", valor: 1 },
    { mes: "Fev", valor: 2 },
    { mes: "Mar", valor: 2 },
    { mes: "Abr", valor: 2 },
    { mes: "Mai", valor: 3 },
    { mes: "Jun", valor: 3 },
  ]

  const timelineConsolidadas = [
    { mes: "Jan", valor: 0 },
    { mes: "Fev", valor: 0 },
    { mes: "Mar", valor: 1 },
    { mes: "Abr", valor: 1 },
    { mes: "Mai", valor: 1 },
    { mes: "Jun", valor: 1 },
  ]

  const timelineEnviadas = [
    { mes: "Jan", valor: 1 },
    { mes: "Fev", valor: 1 },
    { mes: "Mar", valor: 0 },
    { mes: "Abr", valor: 1 },
    { mes: "Mai", valor: 0 },
    { mes: "Jun", valor: 1 },
  ]

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

  // ============================================================================
  // COMPONENTE DE TIMELINE MENSAL (Reutilizável)
  // ============================================================================
  const MonthlyTimeline = ({ data, color, label }: { data: typeof timelineTotal, color: string, label: string }) => {
    const maxValue = Math.max(...data.map(d => d.valor), 1)
    
    return (
      <div className="border-t border-border pt-3">
        <p className="text-[10px] font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
          Evolução Mensal (6 meses)
        </p>
        <div className="flex items-end justify-between gap-1.5 h-14">
          {data.map((item, idx) => {
            const heightPercent = (item.valor / maxValue) * 100
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group cursor-pointer relative">
                {/* Tooltip value on hover - ACIMA da barra */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-popover border-2 border-primary rounded-lg px-2.5 py-1.5 shadow-xl transition-all duration-200 pointer-events-none z-20 whitespace-nowrap">
                  <p className="text-sm font-black text-primary">{item.valor}</p>
                  <p className="text-[9px] text-muted-foreground">{label}</p>
                  {/* Seta apontando para baixo */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-popover border-r-2 border-b-2 border-primary rotate-45" />
                </div>
                
                {/* Barra */}
                <div className="w-full flex items-end justify-center" style={{ height: '36px' }}>
                  <div 
                    className={`w-full ${color} rounded-t transition-all group-hover:opacity-90 group-hover:brightness-110`}
                    style={{ height: `${heightPercent}%`, minHeight: item.valor > 0 ? '6px' : '0px' }}
                  />
                </div>
                
                {/* Label do mês */}
                <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.mes}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* ========================================================================
          CARD 1: TOTAL DE PROPOSTAS
      ======================================================================== */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <FileText className="w-5 h-5 text-blue-600" />
            <Badge variant="outline" className="text-[10px] px-2 py-0">6 meses</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* NÚMERO PRINCIPAL - DESTAQUE MÁXIMO */}
          <div className="text-center py-2">
            <p className="text-6xl font-black text-blue-600 leading-none tracking-tight">
              {kpis.total}
            </p>
            <p className="text-xs font-semibold text-muted-foreground mt-2 uppercase tracking-wide">
              Total de Propostas
            </p>
          </div>

          {/* TIMELINE MENSAL */}
          <MonthlyTimeline data={timelineTotal} color="bg-blue-500" label="propostas" />
          
          {/* Sparkline (7 dias) */}
          <div className="h-10 pt-2 border-t">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sparklineData}>
                <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tendência */}
          <div className="flex items-center justify-between text-xs border-t pt-2">
            <div className="flex items-center gap-1 text-emerald-600">
              <TrendingUpIcon className="w-3 h-3" />
              <span className="font-bold">↑ 25%</span>
            </div>
            <span className="text-muted-foreground">vs mês anterior</span>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Última atualização: agora
          </p>
        </CardContent>
      </Card>

      {/* ========================================================================
          CARD 2: EM PROGRESSO
      ======================================================================== */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Clock className="w-5 h-5 text-amber-600" />
            <Badge variant="outline" className="text-[10px] px-2 py-0">Ativas</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* NÚMERO PRINCIPAL */}
          <div className="text-center py-2">
            <p className="text-6xl font-black text-amber-600 leading-none tracking-tight">
              {kpis.emProgresso}
            </p>
            <p className="text-xs font-semibold text-muted-foreground mt-2 uppercase tracking-wide">
              Em Progresso
            </p>
          </div>

          {/* TIMELINE MENSAL */}
          <MonthlyTimeline data={timelineProgresso} color="bg-amber-500" label="em progresso" />
          
          <div className="h-10 pt-2 border-t">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressoData}>
                <Bar dataKey="value" fill="#f59e0b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs border-t pt-2">
            <div className="flex items-center gap-1 text-amber-600">
              <TrendingUpIcon className="w-3 h-3" />
              <span className="font-bold">↑ 50%</span>
            </div>
            <span className="text-muted-foreground">vs semana passada</span>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Última atualização: agora
          </p>
        </CardContent>
      </Card>

      {/* ========================================================================
          CARD 3: CONSOLIDADAS
      ======================================================================== */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <Badge variant="outline" className="text-[10px] px-2 py-0">Prontas</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* NÚMERO PRINCIPAL */}
          <div className="text-center py-2">
            <p className="text-6xl font-black text-emerald-600 leading-none tracking-tight">
              {kpis.consolidadas}
            </p>
            <p className="text-xs font-semibold text-muted-foreground mt-2 uppercase tracking-wide">
              Consolidadas
            </p>
          </div>

          {/* TIMELINE MENSAL */}
          <MonthlyTimeline data={timelineConsolidadas} color="bg-emerald-500" label="consolidadas" />
          
          <div className="h-10 pt-2 border-t">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consolidadasData}>
                <Bar dataKey="value" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs border-t pt-2">
            <div className="flex items-center gap-1 text-emerald-600">
              <span className="font-bold">● Estável</span>
            </div>
            <span className="text-muted-foreground">sem variação</span>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Última atualização: agora
          </p>
        </CardContent>
      </Card>

      {/* ========================================================================
          CARD 4: ENVIADAS
      ======================================================================== */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <TrendingUpIcon className="w-5 h-5 text-purple-600" />
            <Badge variant="outline" className="text-[10px] px-2 py-0">Cliente</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* NÚMERO PRINCIPAL */}
          <div className="text-center py-2">
            <p className="text-6xl font-black text-purple-600 leading-none tracking-tight">
              {kpis.enviadas}
            </p>
            <p className="text-xs font-semibold text-muted-foreground mt-2 uppercase tracking-wide">
              Enviadas
            </p>
          </div>

          {/* TIMELINE MENSAL */}
          <MonthlyTimeline data={timelineEnviadas} color="bg-purple-500" label="enviadas" />
          
          <div className="h-10 pt-2 border-t">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enviadasData}>
                <Bar dataKey="value" fill="#a855f7" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs border-t pt-2">
            <div className="flex items-center gap-1 text-purple-600">
              <span className="font-bold">● Estável</span>
            </div>
            <span className="text-muted-foreground">aguardando retorno</span>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Última atualização: agora
          </p>
        </CardContent>
      </Card>

      {/* ========================================================================
          CARD 5: PIPELINE - VELOCÍMETRO PROFISSIONAL
      ======================================================================== */}
      <Card className="border hover:shadow-lg transition-all hover:scale-[1.02] group relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] pointer-events-none" style={{ transition: "transform 0.8s ease-in-out" }} />
        
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <TrendingUpIcon className="w-5 h-5 text-blue-600" />
            <Badge variant="default" className="text-[10px] px-2 py-0 bg-blue-600">Pipeline</Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {/* Velocímetro aprimorado */}
          <div className="relative pt-2">
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

          {/* Valor - DESTAQUE */}
          <div className="text-center border-t pt-3">
            <p className="text-3xl font-black text-blue-600 leading-none">
              {formatCurrency(kpis.valorTotal)}
            </p>
            <p className="text-xs font-semibold text-muted-foreground mt-1 uppercase tracking-wide">
              Pipeline Total
            </p>
          </div>

          {/* Mini breakdown sempre visível - MELHORADO */}
          <div className="grid grid-cols-3 gap-2 text-[10px] pt-2 border-t">
            <div className="text-center space-y-1">
              <div className="w-3 h-3 rounded-full bg-amber-500 mx-auto" />
              <p className="font-bold text-xs">{formatCurrency(kpis.valorEnviado)}</p>
              <p className="text-muted-foreground">Enviado</p>
            </div>
            <div className="text-center space-y-1">
              <div className="w-3 h-3 rounded-full bg-blue-500 mx-auto" />
              <p className="font-bold text-xs">{formatCurrency(kpis.valorElaboracao)}</p>
              <p className="text-muted-foreground">Elaboração</p>
            </div>
            <div className="text-center space-y-1">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mx-auto" />
              <p className="font-bold text-xs">{formatCurrency(kpis.valorMonitoramento)}</p>
              <p className="text-muted-foreground">Monitoramento</p>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center pt-2 border-t">
            Distribuição por status • Atualizado agora
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
