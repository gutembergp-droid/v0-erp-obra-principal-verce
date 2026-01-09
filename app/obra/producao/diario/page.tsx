"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  ArrowLeft,
  Plus,
  CalendarIcon,
  Download,
  Cloud,
  Sun,
  CloudRain,
  Users,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Camera,
  Save,
  CloudSun,
  Thermometer,
  Droplets,
  Eye,
  Printer,
} from "lucide-react"
import Link from "next/link"

// Dados do Diario
const diarioData = {
  data: new Date(),
  clima: {
    manha: { condicao: "ensolarado", temperatura: 28, umidade: 65 },
    tarde: { condicao: "parcialmente_nublado", temperatura: 32, umidade: 55 },
    noite: { condicao: "limpo", temperatura: 24, umidade: 70 },
  },
  efetivo: {
    total: 145,
    proprios: 48,
    terceiros: 97,
    ausencias: 3,
    detalhes: [
      { funcao: "Pedreiro", proprios: 12, terceiros: 18 },
      { funcao: "Servente", proprios: 8, terceiros: 25 },
      { funcao: "Carpinteiro", proprios: 10, terceiros: 15 },
      { funcao: "Armador", proprios: 8, terceiros: 22 },
      { funcao: "Eletricista", proprios: 5, terceiros: 8 },
      { funcao: "Encanador", proprios: 3, terceiros: 5 },
      { funcao: "Operador", proprios: 2, terceiros: 4 },
    ],
  },
  equipamentos: [
    { nome: "Bomba de Concreto", qtd: 2, status: "operando", horasUso: 8 },
    { nome: "Grua Torre", qtd: 1, status: "operando", horasUso: 10 },
    { nome: "Retroescavadeira", qtd: 1, status: "manutencao", horasUso: 0 },
    { nome: "Betoneira", qtd: 3, status: "operando", horasUso: 8 },
    { nome: "Vibrador", qtd: 6, status: "operando", horasUso: 6 },
    { nome: "Andaime Fachadeiro", qtd: 1, status: "operando", horasUso: 10 },
  ],
  atividades: [
    {
      id: "1",
      servico: "Concretagem Pilares P11 a P20",
      local: "Bloco A - 3o Pavimento",
      eap: "03.01",
      qtdPrevista: 35,
      qtdExecutada: 33,
      unidade: "M3",
      status: "concluido",
      observacao: "Concluido sem intercorrencias. Concreto FCK 30 conforme especificado.",
    },
    {
      id: "2",
      servico: "Montagem de Formas Lajes",
      local: "Bloco A - 4o Pavimento",
      eap: "03.03",
      qtdPrevista: 200,
      qtdExecutada: 180,
      unidade: "M2",
      status: "em_andamento",
      observacao: "Aguardando chegada de mais compensados. Previsao de conclusao amanha.",
    },
    {
      id: "3",
      servico: "Instalacoes Eletricas - Infraestrutura",
      local: "Bloco B - Terreo",
      eap: "05.01",
      qtdPrevista: 150,
      qtdExecutada: 150,
      unidade: "ML",
      status: "concluido",
      observacao: "Infraestrutura de eletrodutos concluida. Iniciando passagem de cabos.",
    },
  ],
  ocorrencias: [
    {
      id: "1",
      tipo: "acidente",
      descricao: "Colaborador sofreu corte superficial na mao ao manusear forma metalica",
      local: "Bloco A - 3o Pavimento",
      horario: "10:30",
      gravidade: "leve",
      acaoTomada: "Primeiros socorros no ambulatorio da obra. Colaborador retornou ao trabalho.",
    },
    {
      id: "2",
      tipo: "atraso_material",
      descricao: "Atraso na entrega de compensados plastificados",
      local: "Almoxarifado",
      horario: "08:00",
      gravidade: "media",
      acaoTomada: "Contato com fornecedor. Nova previsao de entrega para amanha as 07:00.",
    },
  ],
  materiais: [
    { nome: "Concreto FCK 30", qtdRecebida: 35, unidade: "M3", nf: "12345", fornecedor: "Concreteira ABC" },
    { nome: "Aco CA-50 10mm", qtdRecebida: 2500, unidade: "KG", nf: "12346", fornecedor: "Gerdau" },
    { nome: "Aco CA-50 12.5mm", qtdRecebida: 1800, unidade: "KG", nf: "12347", fornecedor: "Gerdau" },
  ],
  fotos: [
    { id: "1", descricao: "Concretagem Pilares 3o Pav", horario: "14:30" },
    { id: "2", descricao: "Montagem Formas 4o Pav", horario: "16:00" },
    { id: "3", descricao: "Vista Geral Bloco A", horario: "17:00" },
  ],
}

export default function DiarioPage() {
  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date())
  const [activeTab, setActiveTab] = useState("resumo")

  const getClimaIcon = (condicao: string) => {
    switch (condicao) {
      case "ensolarado":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "parcialmente_nublado":
        return <CloudSun className="h-5 w-5 text-gray-500" />
      case "nublado":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "chuvoso":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  const getOcorrenciaBadge = (tipo: string) => {
    switch (tipo) {
      case "acidente":
        return <Badge variant="destructive">Acidente</Badge>
      case "atraso_material":
        return <Badge className="bg-amber-500">Atraso Material</Badge>
      case "chuva":
        return <Badge className="bg-blue-500">Chuva</Badge>
      default:
        return <Badge variant="secondary">{tipo}</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/obra/producao">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-amber-600" />
                  <h1 className="text-xl font-bold">Diario de Obra</h1>
                </div>
                <p className="text-sm text-muted-foreground">Obra: Torre Norte - Centro Empresarial</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {format(dataSelecionada, "dd/MM/yyyy", { locale: ptBR })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={dataSelecionada}
                    onSelect={(date) => date && setDataSelecionada(date)}
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Cards de Resumo */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {/* Clima */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Clima</p>
                  {getClimaIcon(diarioData.clima.tarde.condicao)}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    {diarioData.clima.tarde.temperatura}°C
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    {diarioData.clima.tarde.umidade}%
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Efetivo */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Efetivo Total</p>
                    <p className="text-2xl font-bold">{diarioData.efetivo.total}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-blue-600">{diarioData.efetivo.proprios} proprios</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-amber-600">{diarioData.efetivo.terceiros} terceiros</span>
                </div>
              </CardContent>
            </Card>

            {/* Equipamentos */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Equipamentos</p>
                    <p className="text-2xl font-bold">{diarioData.equipamentos.length}</p>
                  </div>
                  <Wrench className="h-8 w-8 text-orange-600" />
                </div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-green-600">
                    {diarioData.equipamentos.filter((e) => e.status === "operando").length} operando
                  </span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-red-600">
                    {diarioData.equipamentos.filter((e) => e.status === "manutencao").length} manutencao
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Atividades */}
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Atividades</p>
                    <p className="text-2xl font-bold">{diarioData.atividades.length}</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-green-600">
                    {diarioData.atividades.filter((a) => a.status === "concluido").length} concluidas
                  </span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-blue-600">
                    {diarioData.atividades.filter((a) => a.status === "em_andamento").length} andamento
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Ocorrencias */}
            <Card className={diarioData.ocorrencias.length > 0 ? "border-amber-200 bg-amber-50" : ""}>
              <CardContent className="pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Ocorrencias</p>
                    <p className="text-2xl font-bold">{diarioData.ocorrencias.length}</p>
                  </div>
                  <AlertTriangle
                    className={`h-8 w-8 ${diarioData.ocorrencias.length > 0 ? "text-amber-600" : "text-gray-400"}`}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {diarioData.ocorrencias.length > 0 ? "Requer atencao" : "Sem ocorrencias"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="resumo">Resumo</TabsTrigger>
              <TabsTrigger value="efetivo">Efetivo</TabsTrigger>
              <TabsTrigger value="equipamentos">Equipamentos</TabsTrigger>
              <TabsTrigger value="atividades">Atividades</TabsTrigger>
              <TabsTrigger value="ocorrencias">Ocorrencias</TabsTrigger>
              <TabsTrigger value="materiais">Materiais</TabsTrigger>
              <TabsTrigger value="fotos">Fotos</TabsTrigger>
            </TabsList>

            <TabsContent value="resumo" className="mt-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Clima Detalhado */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Cloud className="h-4 w-4" />
                      Condicoes Climaticas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Manha</p>
                        {getClimaIcon(diarioData.clima.manha.condicao)}
                        <p className="text-lg font-medium mt-2">{diarioData.clima.manha.temperatura}°C</p>
                        <p className="text-xs text-muted-foreground">{diarioData.clima.manha.umidade}% umidade</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Tarde</p>
                        {getClimaIcon(diarioData.clima.tarde.condicao)}
                        <p className="text-lg font-medium mt-2">{diarioData.clima.tarde.temperatura}°C</p>
                        <p className="text-xs text-muted-foreground">{diarioData.clima.tarde.umidade}% umidade</p>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-2">Noite</p>
                        {getClimaIcon(diarioData.clima.noite.condicao)}
                        <p className="text-lg font-medium mt-2">{diarioData.clima.noite.temperatura}°C</p>
                        <p className="text-xs text-muted-foreground">{diarioData.clima.noite.umidade}% umidade</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Atividades Resumo */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Atividades do Dia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {diarioData.atividades.map((atividade) => (
                        <div key={atividade.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <div>
                            <p className="font-medium text-sm">{atividade.servico}</p>
                            <p className="text-xs text-muted-foreground">{atividade.local}</p>
                          </div>
                          <Badge
                            variant={atividade.status === "concluido" ? "default" : "secondary"}
                            className={atividade.status === "concluido" ? "bg-green-600" : "bg-blue-600"}
                          >
                            {atividade.status === "concluido" ? "Concluido" : "Em Andamento"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Efetivo Resumo */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Efetivo por Funcao
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {diarioData.efetivo.detalhes.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span>{item.funcao}</span>
                          <div className="flex gap-4">
                            <span className="text-blue-600">{item.proprios} P</span>
                            <span className="text-amber-600">{item.terceiros} T</span>
                            <span className="font-medium">{item.proprios + item.terceiros}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Ocorrencias */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Ocorrencias
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {diarioData.ocorrencias.length > 0 ? (
                      <div className="space-y-3">
                        {diarioData.ocorrencias.map((ocorrencia) => (
                          <div key={ocorrencia.id} className="p-3 bg-muted/50 rounded">
                            <div className="flex items-center justify-between mb-2">
                              {getOcorrenciaBadge(ocorrencia.tipo)}
                              <span className="text-xs text-muted-foreground">{ocorrencia.horario}</span>
                            </div>
                            <p className="text-sm">{ocorrencia.descricao}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              <strong>Acao:</strong> {ocorrencia.acaoTomada}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">Nenhuma ocorrencia registrada</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="efetivo">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Efetivo Detalhado</CardTitle>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-3 bg-muted/50 font-medium text-sm">
                      <div>Funcao</div>
                      <div className="text-center">Proprios</div>
                      <div className="text-center">Terceiros</div>
                      <div className="text-center">Total</div>
                    </div>
                    {diarioData.efetivo.detalhes.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-4 gap-4 p-3 border-t text-sm">
                        <div className="font-medium">{item.funcao}</div>
                        <div className="text-center text-blue-600">{item.proprios}</div>
                        <div className="text-center text-amber-600">{item.terceiros}</div>
                        <div className="text-center font-bold">{item.proprios + item.terceiros}</div>
                      </div>
                    ))}
                    <div className="grid grid-cols-4 gap-4 p-3 border-t bg-muted/30 font-bold text-sm">
                      <div>TOTAL</div>
                      <div className="text-center text-blue-600">{diarioData.efetivo.proprios}</div>
                      <div className="text-center text-amber-600">{diarioData.efetivo.terceiros}</div>
                      <div className="text-center">{diarioData.efetivo.total}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipamentos">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Equipamentos em Uso</CardTitle>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-3 bg-muted/50 font-medium text-sm">
                      <div>Equipamento</div>
                      <div className="text-center">Quantidade</div>
                      <div className="text-center">Status</div>
                      <div className="text-center">Horas Uso</div>
                    </div>
                    {diarioData.equipamentos.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-4 gap-4 p-3 border-t text-sm items-center">
                        <div className="font-medium">{item.nome}</div>
                        <div className="text-center">{item.qtd}</div>
                        <div className="text-center">
                          <Badge
                            variant={item.status === "operando" ? "default" : "destructive"}
                            className={item.status === "operando" ? "bg-green-600" : ""}
                          >
                            {item.status === "operando" ? "Operando" : "Manutencao"}
                          </Badge>
                        </div>
                        <div className="text-center">{item.horasUso}h</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="atividades">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Atividades Executadas</CardTitle>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {diarioData.atividades.map((atividade) => (
                      <div key={atividade.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium">{atividade.servico}</h4>
                            <p className="text-sm text-muted-foreground">{atividade.local}</p>
                          </div>
                          <Badge
                            variant={atividade.status === "concluido" ? "default" : "secondary"}
                            className={atividade.status === "concluido" ? "bg-green-600" : "bg-blue-600"}
                          >
                            {atividade.status === "concluido" ? "Concluido" : "Em Andamento"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">EAP:</span> {atividade.eap}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Previsto:</span> {atividade.qtdPrevista}{" "}
                            {atividade.unidade}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Executado:</span> {atividade.qtdExecutada}{" "}
                            {atividade.unidade}
                          </div>
                          <div>
                            <span className="text-muted-foreground">%:</span>{" "}
                            {((atividade.qtdExecutada / atividade.qtdPrevista) * 100).toFixed(0)}%
                          </div>
                        </div>
                        {atividade.observacao && (
                          <p className="text-sm text-muted-foreground mt-2 italic">{atividade.observacao}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ocorrencias">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Ocorrencias</CardTitle>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar Ocorrencia
                  </Button>
                </CardHeader>
                <CardContent>
                  {diarioData.ocorrencias.length > 0 ? (
                    <div className="space-y-4">
                      {diarioData.ocorrencias.map((ocorrencia) => (
                        <div key={ocorrencia.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              {getOcorrenciaBadge(ocorrencia.tipo)}
                              <span className="text-sm text-muted-foreground">{ocorrencia.horario}</span>
                            </div>
                            <Badge
                              variant={ocorrencia.gravidade === "leve" ? "secondary" : "destructive"}
                              className={
                                ocorrencia.gravidade === "leve"
                                  ? ""
                                  : ocorrencia.gravidade === "media"
                                    ? "bg-amber-500"
                                    : ""
                              }
                            >
                              {ocorrencia.gravidade}
                            </Badge>
                          </div>
                          <p className="text-sm mb-2">{ocorrencia.descricao}</p>
                          <p className="text-sm text-muted-foreground">
                            <strong>Local:</strong> {ocorrencia.local}
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            <strong>Acao Tomada:</strong> {ocorrencia.acaoTomada}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">Nenhuma ocorrencia registrada</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materiais">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Materiais Recebidos</CardTitle>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <div className="grid grid-cols-5 gap-4 p-3 bg-muted/50 font-medium text-sm">
                      <div>Material</div>
                      <div className="text-right">Quantidade</div>
                      <div>Unidade</div>
                      <div>NF</div>
                      <div>Fornecedor</div>
                    </div>
                    {diarioData.materiais.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-5 gap-4 p-3 border-t text-sm">
                        <div className="font-medium">{item.nome}</div>
                        <div className="text-right">{item.qtdRecebida.toLocaleString("pt-BR")}</div>
                        <div>{item.unidade}</div>
                        <div className="text-muted-foreground">{item.nf}</div>
                        <div className="text-muted-foreground">{item.fornecedor}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fotos">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Registro Fotografico</CardTitle>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                    <Camera className="h-4 w-4 mr-2" />
                    Adicionar Foto
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    {diarioData.fotos.map((foto) => (
                      <div key={foto.id} className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-muted flex items-center justify-center">
                          <Camera className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div className="p-2">
                          <p className="text-sm font-medium truncate">{foto.descricao}</p>
                          <p className="text-xs text-muted-foreground">{foto.horario}</p>
                        </div>
                      </div>
                    ))}
                    {/* Placeholder para adicionar */}
                    <div className="border-2 border-dashed rounded-lg aspect-video flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                      <Plus className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Adicionar foto</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  )
}
