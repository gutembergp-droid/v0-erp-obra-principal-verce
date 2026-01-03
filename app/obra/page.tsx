import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Factory,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react"

// Dashboard do Módulo Obra - "EXECUTAR, MEDIR, COMPARAR, CORRIGIR"
export default function ObraDashboard() {
  return (
    <AppLayout>
      <Header title="Módulo Obra" description="Execução e Controle - Executar, Medir, Comparar, Corrigir" />

      <div className="p-6 space-y-6">
        {/* Seletor de Obra */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Factory className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-foreground">Obra Ativa</h2>
                  <p className="text-sm text-muted-foreground">Selecione a obra para visualizar e gerenciar</p>
                </div>
              </div>
              <Select defaultValue="obra1">
                <SelectTrigger className="w-full md:w-[350px]">
                  <SelectValue placeholder="Selecione uma obra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="obra1">BR-101 Duplicação Lote 3 (CC-2024-001)</SelectItem>
                  <SelectItem value="obra2">UHE Belo Monte - Complementar A (CC-2023-089)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Métricas da Obra */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avanço Físico</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.5%</div>
              <Progress value={42.5} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">Previsto: 45% | Desvio: -2.5%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avanço Financeiro</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">R$ 191M</div>
              <Progress value={42.4} className="mt-2 h-2" />
              <p className="text-xs text-muted-foreground mt-1">42.4% do valor contratado</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Competência Atual</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Jan/2026</div>
              <p className="text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                12 dias para fechamento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Gates Pendentes</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">4/9</div>
              <p className="text-xs text-muted-foreground mt-1">5 gates concluídos este mês</p>
            </CardContent>
          </Card>
        </div>

        {/* Status dos 9 Gates */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Status dos Gates - Competência Jan/2026</CardTitle>
            <CardDescription>Sem Gate 5 (Qualidade) e Gate 6 (SST) aprovados, Gate 9 não libera</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
              {[
                { num: 1, nome: "Liberação", status: "done" },
                { num: 2, nome: "Produção", status: "done" },
                { num: 3, nome: "Custos", status: "done" },
                { num: 4, nome: "Comercial", status: "done" },
                { num: 5, nome: "Qualidade", status: "pending", trava: true },
                { num: 6, nome: "SST", status: "done", trava: true },
                { num: 7, nome: "Financeiro", status: "pending" },
                { num: 8, nome: "Gerencial", status: "pending" },
                { num: 9, nome: "Competência", status: "blocked" },
              ].map((gate) => (
                <div
                  key={gate.num}
                  className={`flex flex-col items-center p-3 rounded-lg border ${
                    gate.status === "done"
                      ? "bg-green-500/10 border-green-500/30"
                      : gate.status === "pending"
                        ? "bg-amber-500/10 border-amber-500/30"
                        : "bg-muted border-border"
                  }`}
                >
                  <div
                    className={`text-lg font-bold ${
                      gate.status === "done"
                        ? "text-green-500"
                        : gate.status === "pending"
                          ? "text-amber-500"
                          : "text-muted-foreground"
                    }`}
                  >
                    G{gate.num}
                  </div>
                  <div className="text-xs text-center text-muted-foreground mt-1">{gate.nome}</div>
                  {gate.trava && (
                    <Badge variant="outline" className="mt-1 text-xs px-1">
                      TRAVA
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Departamentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <DollarSign className="w-5 h-5 text-blue-500" />
                  </div>
                  <CardTitle className="text-base">Comercial</CardTitle>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Medição Produção (MP)</span>
                  <Badge variant="outline" className="text-green-500">
                    Fechada
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Medição Cliente (MC)</span>
                  <Badge variant="outline" className="text-amber-500">
                    Pendente
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Factory className="w-5 h-5 text-green-500" />
                  </div>
                  <CardTitle className="text-base">Produção</CardTitle>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Apontamentos Diários</span>
                  <span className="font-medium">28/31</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Produtividade Média</span>
                  <Badge className="bg-green-500">98%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors cursor-pointer border-red-500/30">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-red-500/10">
                    <ClipboardCheck className="w-5 h-5 text-red-500" />
                  </div>
                  <CardTitle className="text-base">Qualidade</CardTitle>
                </div>
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">NCs Abertas</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gate 5</span>
                  <Badge variant="outline" className="text-red-500 border-red-500">
                    BLOQUEADO
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-orange-500/10">
                    <Shield className="w-5 h-5 text-orange-500" />
                  </div>
                  <CardTitle className="text-base">SST</CardTitle>
                </div>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Incidentes</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Gate 6</span>
                  <Badge className="bg-green-500">APROVADO</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <DollarSign className="w-5 h-5 text-purple-500" />
                  </div>
                  <CardTitle className="text-base">Custos</CardTitle>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Apropriações</span>
                  <Badge variant="outline" className="text-green-500">
                    100%
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CR/CO</span>
                  <span className="font-medium text-green-500">0.94</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:border-primary/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <Calendar className="w-5 h-5 text-cyan-500" />
                  </div>
                  <CardTitle className="text-base">Planejamento</CardTitle>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">IDP (Índice Desempenho)</span>
                  <span className="font-medium">0.95</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Lookahead</span>
                  <Badge variant="outline">Atualizado</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}
