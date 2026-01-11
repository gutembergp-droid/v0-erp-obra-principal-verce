"use client"
import { ConsoleNavbar } from "../_components/console-navbar"
import {
  ChevronRight,
  Gauge,
  Settings,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  HardDrive,
  Cpu,
  Users,
  Zap,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const limites = [
  {
    id: "ia",
    nome: "Requisicoes IA",
    icon: Cpu,
    usado: 4690,
    limite: 25000,
    unidade: "requisicoes",
    custo: 447.0,
    custoLimite: 1000.0,
    periodo: "mes",
  },
  {
    id: "armazenamento",
    nome: "Armazenamento",
    icon: HardDrive,
    usado: 45.2,
    limite: 100,
    unidade: "GB",
    custo: 22.6,
    custoLimite: 50.0,
    periodo: "mes",
  },
  {
    id: "apis",
    nome: "Chamadas API",
    icon: Zap,
    usado: 125000,
    limite: 500000,
    unidade: "chamadas",
    custo: 62.5,
    custoLimite: 250.0,
    periodo: "mes",
  },
  {
    id: "usuarios",
    nome: "Usuarios Ativos",
    icon: Users,
    usado: 68,
    limite: 100,
    unidade: "usuarios",
    custo: 680.0,
    custoLimite: 1000.0,
    periodo: "mes",
  },
  {
    id: "sessoes",
    nome: "Sessoes Simultaneas",
    icon: Users,
    usado: 23,
    limite: 50,
    unidade: "sessoes",
    custo: 0,
    custoLimite: 0,
    periodo: "tempo real",
  },
]

export default function LimitesPage() {
  const custoTotalMes = limites.reduce((acc, l) => acc + l.custo, 0)
  const custoLimiteMes = limites.reduce((acc, l) => acc + l.custoLimite, 0)

  const atividadeRecente = [
    { acao: "Alerta de limite", detalhe: "IA atingiu 80% do limite", tempo: "1h", tipo: "alerta" },
    { acao: "Limite aumentado", detalhe: "Armazenamento: 50GB → 100GB", tempo: "3d", tipo: "config" },
    { acao: "Custo projetado", detalhe: "Previsao: R$ 1.350 para janeiro", tempo: "5d", tipo: "info" },
  ]

  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      <div className="flex-shrink-0 z-40 mt-0">
        <ConsoleNavbar />
      </div>
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
      {/* Header */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-card mb-4">
        <div className="flex items-center gap-3">
          <Gauge className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-semibold text-sm">Limites & Custos</h1>
            <p className="text-xs text-muted-foreground">Controle de consumo e orcamento</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <TrendingUp className="h-4 w-4 mr-1" />
            Relatorio
          </Button>
          <Button size="sm">
            <Settings className="h-4 w-4 mr-1" />
            Configurar Limites
          </Button>
        </div>
      </div>

      {/* Barra de alertas */}
      <div className="h-9 bg-amber-50 border-b border-amber-200 flex items-center px-4 text-sm">
        <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
        <span className="text-amber-800">Requisicoes IA esta em 80% do limite mensal</span>
        <Button variant="link" size="sm" className="text-amber-700 ml-2 h-auto p-0">
          Aumentar limite
        </Button>
      </div>

      {/* Metricas */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-primary">R$ {custoTotalMes.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Custo Atual (Mes)</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">R$ {custoLimiteMes.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Orcamento Mensal</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">
            {((custoTotalMes / custoLimiteMes) * 100).toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground">Consumido</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">R$ {(custoLimiteMes - custoTotalMes).toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">Saldo Disponivel</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-amber-600">22</div>
          <div className="text-xs text-muted-foreground">Dias Restantes</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">R$ 1.350</div>
          <div className="text-xs text-muted-foreground">Projecao Mes</div>
        </div>
      </div>

      {/* Conteudo principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Cards de Limites */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 gap-4">
            {limites.map((limite) => {
              const percentual = (limite.usado / limite.limite) * 100
              const status = percentual >= 90 ? "critico" : percentual >= 70 ? "alerta" : "ok"

              return (
                <Card key={limite.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <limite.icon className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-base">{limite.nome}</CardTitle>
                      </div>
                      <Badge
                        className={
                          status === "critico" ? "bg-red-600" : status === "alerta" ? "bg-amber-600" : "bg-emerald-600"
                        }
                      >
                        {percentual.toFixed(0)}%
                      </Badge>
                    </div>
                    <CardDescription>Periodo: {limite.periodo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress
                        value={percentual}
                        className={`h-2 ${status === "critico" ? "[&>div]:bg-red-600" : status === "alerta" ? "[&>div]:bg-amber-600" : ""}`}
                      />
                      <div className="flex justify-between text-sm">
                        <span>
                          {limite.usado.toLocaleString()} {limite.unidade}
                        </span>
                        <span className="text-muted-foreground">de {limite.limite.toLocaleString()}</span>
                      </div>
                      {limite.custo > 0 && (
                        <div className="flex justify-between text-sm pt-2 border-t">
                          <span className="text-muted-foreground">Custo atual</span>
                          <span className="font-medium">R$ {limite.custo.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Sidebar Atividade */}
        <div className="w-72 border-l bg-card flex flex-col">
          <div className="p-3 border-b">
            <span className="text-sm font-medium">Historico</span>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-3">
            {atividadeRecente.map((item, index) => (
              <div key={index} className="text-sm">
                <div className="flex items-center gap-2">
                  {item.tipo === "alerta" && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                  {item.tipo === "config" && <Settings className="h-3 w-3 text-blue-500" />}
                  {item.tipo === "info" && <TrendingUp className="h-3 w-3 text-muted-foreground" />}
                  <span className="font-medium">{item.acao}</span>
                </div>
                <div className="text-xs text-muted-foreground ml-5">{item.detalhe}</div>
                <div className="text-xs text-muted-foreground ml-5">{item.tempo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards de acao rapida */}
      <div className="border-t p-3 bg-card">
        <div className="grid grid-cols-4 gap-3">
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Configurar Limites</div>
              <div className="text-xs text-muted-foreground">Ajustar thresholds</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <DollarSign className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Orcamento</div>
              <div className="text-xs text-muted-foreground">Definir teto mensal</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Relatorio Detalhado</div>
              <div className="text-xs text-muted-foreground">Consumo por periodo</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
          <button className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted text-left">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="font-medium text-sm">Historico</div>
              <div className="text-xs text-muted-foreground">Meses anteriores</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
          </button>
        </div>
      </div>
        </div>
      </main>
    </div>
  )
}
