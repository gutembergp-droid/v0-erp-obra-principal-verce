"use client"

import { useState } from "react"
import { ConsoleNavbar } from "../_components/console-navbar"
import {
  Search,
  Settings,
  Save,
  RotateCcw,
  Building2,
  DollarSign,
  Users,
  ShoppingCart,
  Bell,
  Shield,
  Clock,
  AlertTriangle,
  Database,
  Globe,
  FileText,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"

const categorias = [
  { id: "geral", nome: "Geral", icon: Settings, count: 8 },
  { id: "financeiro", nome: "Financeiro", icon: DollarSign, count: 12 },
  { id: "rh", nome: "Recursos Humanos", icon: Users, count: 10 },
  { id: "comercial", nome: "Comercial", icon: ShoppingCart, count: 6 },
  { id: "notificacoes", nome: "Notificacoes", icon: Bell, count: 8 },
  { id: "seguranca", nome: "Seguranca", icon: Shield, count: 14 },
]

export default function ParametrosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState("geral")
  const [busca, setBusca] = useState("")
  const [alteracoesPendentes, setAlteracoesPendentes] = useState(false)

  const atividadeRecente = [
    { acao: "Parametro alterado", detalhe: "Moeda padrao: BRL → USD", tempo: "2h", usuario: "Admin" },
    { acao: "Backup realizado", detalhe: "Configuracoes exportadas", tempo: "1d", usuario: "Sistema" },
    { acao: "Parametro alterado", detalhe: "MFA obrigatorio: Ativado", tempo: "3d", usuario: "Admin" },
    { acao: "Notificacao ativada", detalhe: "Alerta de limite orcamento", tempo: "5d", usuario: "Admin" },
  ]

  const handleChange = () => {
    setAlteracoesPendentes(true)
  }

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
          <Settings className="h-5 w-5 text-primary" />
          <div>
            <h1 className="font-semibold text-sm">Parametros do Sistema</h1>
            <p className="text-xs text-muted-foreground">Configuracoes gerais e preferencias</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar parametro..."
              className="pl-8 h-8 text-sm"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-1" />
            Restaurar Padrao
          </Button>
          <Button size="sm" disabled={!alteracoesPendentes}>
            <Save className="h-4 w-4 mr-1" />
            Salvar Alteracoes
          </Button>
        </div>
      </div>

      {/* Barra de alertas */}
      {alteracoesPendentes && (
        <div className="h-9 bg-amber-50 border-b border-amber-200 flex items-center px-4 text-sm">
          <AlertTriangle className="h-4 w-4 text-amber-600 mr-2" />
          <span className="text-amber-800">Voce tem alteracoes nao salvas</span>
          <Button variant="link" size="sm" className="text-amber-700 ml-2 h-auto p-0">
            Salvar agora
          </Button>
        </div>
      )}

      {/* Metricas */}
      <div className="grid grid-cols-6 gap-3 p-4 border-b bg-muted/30">
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">{categorias.reduce((acc, c) => acc + c.count, 0)}</div>
          <div className="text-xs text-muted-foreground">Total Parametros</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">{categorias.length}</div>
          <div className="text-xs text-muted-foreground">Categorias</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-blue-600">3</div>
          <div className="text-xs text-muted-foreground">Alterados Hoje</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-amber-600">{alteracoesPendentes ? 1 : 0}</div>
          <div className="text-xs text-muted-foreground">Pendente Salvar</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold">08/01/2026</div>
          <div className="text-xs text-muted-foreground">Ultimo Backup</div>
        </div>
        <div className="bg-card rounded-lg border p-3">
          <div className="text-2xl font-bold text-emerald-600">OK</div>
          <div className="text-xs text-muted-foreground">Status Sistema</div>
        </div>
      </div>

      {/* Conteudo principal */}
      <div className="flex-1 flex overflow-hidden">
        {/* Categorias */}
        <div className="w-56 border-r flex flex-col bg-card">
          <div className="p-3 border-b">
            <span className="text-xs font-medium text-muted-foreground uppercase">Categorias</span>
          </div>
          <div className="flex-1 overflow-auto p-2">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaAtiva(cat.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${
                  categoriaAtiva === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{cat.nome}</span>
                <Badge variant={categoriaAtiva === cat.id ? "secondary" : "outline"} className="text-xs">
                  {cat.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Parametros */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Tabs value={categoriaAtiva} onValueChange={setCategoriaAtiva} className="flex-1 flex flex-col">
            <TabsContent value="geral" className="flex-1 overflow-auto p-4 space-y-6 m-0">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Dados da Empresa
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nome da Empresa</Label>
                    <Input defaultValue="Construtora ABC Ltda" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>CNPJ</Label>
                    <Input defaultValue="12.345.678/0001-90" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Endereco</Label>
                    <Input defaultValue="Av. Paulista, 1000 - Sao Paulo/SP" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Telefone</Label>
                    <Input defaultValue="(11) 3000-0000" onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Regionais
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Fuso Horario</Label>
                    <Select defaultValue="america_sp" onValueChange={handleChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america_sp">America/Sao_Paulo (GMT-3)</SelectItem>
                        <SelectItem value="america_manaus">America/Manaus (GMT-4)</SelectItem>
                        <SelectItem value="america_rj">America/Rio_Janeiro (GMT-3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Formato de Data</Label>
                    <Select defaultValue="dd_mm_yyyy" onValueChange={handleChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd_mm_yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm_dd_yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy_mm_dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Moeda Padrao</Label>
                    <Select defaultValue="brl" onValueChange={handleChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="brl">BRL - Real Brasileiro</SelectItem>
                        <SelectItem value="usd">USD - Dolar Americano</SelectItem>
                        <SelectItem value="eur">EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Sistema
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Dias de Retencao de Logs</Label>
                    <Input type="number" defaultValue="365" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Backup Automatico</Label>
                    <Select defaultValue="diario" onValueChange={handleChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="diario">Diario</SelectItem>
                        <SelectItem value="semanal">Semanal</SelectItem>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="desativado">Desativado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="financeiro" className="flex-1 overflow-auto p-4 space-y-6 m-0">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Configuracoes Financeiras
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Casas Decimais (Valores)</Label>
                    <Select defaultValue="2" onValueChange={handleChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 casas</SelectItem>
                        <SelectItem value="3">3 casas</SelectItem>
                        <SelectItem value="4">4 casas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Separador de Milhar</Label>
                    <Select defaultValue="ponto" onValueChange={handleChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ponto">Ponto (.)</SelectItem>
                        <SelectItem value="virgula">Virgula (,)</SelectItem>
                        <SelectItem value="espaco">Espaco</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Aprovar despesas automaticamente ate R$ 500</div>
                    <div className="text-xs text-muted-foreground">
                      Despesas abaixo deste valor nao requerem aprovacao
                    </div>
                  </div>
                  <Switch onCheckedChange={handleChange} />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Exigir anexo em todas as despesas</div>
                    <div className="text-xs text-muted-foreground">Nota fiscal ou comprovante obrigatorio</div>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="rh" className="flex-1 overflow-auto p-4 space-y-6 m-0">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Configuracoes de RH
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Dias para Aviso Previo (Ferias)</Label>
                    <Input type="number" defaultValue="30" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Limite Banco de Horas (horas)</Label>
                    <Input type="number" defaultValue="40" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Notificar gestor sobre vencimento ASO</div>
                    <div className="text-xs text-muted-foreground">30 dias antes do vencimento</div>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Exigir aprovacao de horas extras</div>
                    <div className="text-xs text-muted-foreground">Gestor deve aprovar antes do fechamento</div>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comercial" className="flex-1 overflow-auto p-4 space-y-6 m-0">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Configuracoes Comerciais
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Margem Minima de Proposta (%)</Label>
                    <Input type="number" defaultValue="15" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Validade Padrao de Proposta (dias)</Label>
                    <Input type="number" defaultValue="30" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Exigir aprovacao para descontos acima de 10%</div>
                    <div className="text-xs text-muted-foreground">Gerente comercial deve aprovar</div>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notificacoes" className="flex-1 overflow-auto p-4 space-y-6 m-0">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Preferencias de Notificacao
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Notificacoes por Email</div>
                      <div className="text-xs text-muted-foreground">Receber alertas no email</div>
                    </div>
                    <Switch defaultChecked onCheckedChange={handleChange} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Notificacoes Push</div>
                      <div className="text-xs text-muted-foreground">Alertas no navegador</div>
                    </div>
                    <Switch defaultChecked onCheckedChange={handleChange} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Resumo Diario</div>
                      <div className="text-xs text-muted-foreground">Receber resumo as 8h</div>
                    </div>
                    <Switch onCheckedChange={handleChange} />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium text-sm">Alertas de Seguranca</div>
                      <div className="text-xs text-muted-foreground">Login suspeito, tentativas falhas</div>
                    </div>
                    <Switch defaultChecked onCheckedChange={handleChange} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seguranca" className="flex-1 overflow-auto p-4 space-y-6 m-0">
              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Configuracoes de Seguranca
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tempo de Sessao (minutos)</Label>
                    <Input type="number" defaultValue="60" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tentativas de Login</Label>
                    <Input type="number" defaultValue="5" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Expiracao de Senha (dias)</Label>
                    <Input type="number" defaultValue="90" onChange={handleChange} />
                  </div>
                  <div className="space-y-2">
                    <Label>Tamanho Minimo de Senha</Label>
                    <Input type="number" defaultValue="8" onChange={handleChange} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">MFA Obrigatorio</div>
                    <div className="text-xs text-muted-foreground">Autenticacao de dois fatores para todos</div>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Bloquear IPs Suspeitos</div>
                    <div className="text-xs text-muted-foreground">Bloquear apos 5 tentativas falhas</div>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Exigir Caractere Especial na Senha</div>
                    <div className="text-xs text-muted-foreground">Senha deve conter @#$%&*</div>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Atividade Recente */}
        <div className="w-72 border-l flex flex-col bg-card">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-sm">Alteracoes Recentes</span>
            </div>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              Ver mais
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-3 space-y-3">
            {atividadeRecente.map((item, idx) => (
              <div key={idx} className="text-sm">
                <div className="font-medium flex items-center gap-2">
                  {item.acao.includes("alterado") && <Settings className="h-3 w-3 text-blue-600" />}
                  {item.acao.includes("Backup") && <Database className="h-3 w-3 text-emerald-600" />}
                  {item.acao.includes("ativada") && <Bell className="h-3 w-3 text-amber-600" />}
                  {item.acao}
                </div>
                <div className="text-xs text-muted-foreground">{item.detalhe}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.usuario} - {item.tempo} atras
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards de Acesso Rapido */}
      <div className="border-t p-3 bg-muted/30">
        <div className="grid grid-cols-4 gap-3">
          <Button variant="outline" className="h-14 justify-start gap-3 bg-transparent">
            <Database className="h-5 w-5 text-blue-600" />
            <div className="text-left">
              <div className="text-sm font-medium">Backup Manual</div>
              <div className="text-xs text-muted-foreground">Exportar configuracoes</div>
            </div>
          </Button>
          <Button variant="outline" className="h-14 justify-start gap-3 bg-transparent">
            <RotateCcw className="h-5 w-5 text-amber-600" />
            <div className="text-left">
              <div className="text-sm font-medium">Restaurar Backup</div>
              <div className="text-xs text-muted-foreground">Importar configuracoes</div>
            </div>
          </Button>
          <Button variant="outline" className="h-14 justify-start gap-3 bg-transparent">
            <FileText className="h-5 w-5 text-emerald-600" />
            <div className="text-left">
              <div className="text-sm font-medium">Documentacao</div>
              <div className="text-xs text-muted-foreground">Guia de parametros</div>
            </div>
          </Button>
          <Button variant="outline" className="h-14 justify-start gap-3 bg-transparent">
            <Zap className="h-5 w-5 text-purple-600" />
            <div className="text-left">
              <div className="text-sm font-medium">Parametros Avancados</div>
              <div className="text-xs text-muted-foreground">Configuracoes tecnicas</div>
            </div>
          </Button>
        </div>
      </div>
        </div>
      </main>
    </div>
  )
}
