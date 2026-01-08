"use client"

import type React from "react"

import { Suspense, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ArrowLeft,
  Save,
  Send,
  History,
  Lock,
  Check,
  Clock,
  AlertTriangle,
  FileText,
  Upload,
  Download,
  Eye,
  RefreshCw,
  User,
  Briefcase,
  Shield,
  ClipboardCheck,
  FileCheck,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

// Dados mockados do colaborador
const colaboradorMock = {
  id: "COL-001",
  nome: "João Silva",
  cpf: "123.456.789-00",
  dataNascimento: "1985-03-15",
  telefone: "(11) 98765-4321",
  email: "joao.silva@email.com",
  endereco: "Rua das Flores, 123 - São Paulo/SP",
  estadoCivil: "Casado",
  vinculo: "CLT",
  cargo: "Armador",
  classificacao: "Direto",
  obra: "BR-101-LOTE 2",
  obraNome: "Duplicação Rodovia BR-101",
  convencao: "SINTRACON-SP",
  salarioPraticado: 3200,
  salarioReferencia: 2900,
  jornada: "44h semanais",
  escala: "5x2",
  statusGlobal: "DOCUMENTACAO_PENDENTE",
  matricula: null, // Só gerada na efetivação
  bloqueado: false,
}

// Status do workflow
const workflowMock = {
  preCadastro: { status: "completo", tooltip: "Dados básicos preenchidos" },
  vinculoCondicoes: { status: "completo_alerta", tooltip: "Desvio salarial identificado - aguardando justificativa" },
  documentacao: { status: "em_andamento", tooltip: "2 documentos pendentes: ASO, NR-35" },
  sst: { status: "bloqueado", tooltip: "Aguardando conclusão da documentação" },
  aprovacao: { status: "bloqueado", tooltip: "Aguardando SST OK" },
  efetivacao: { status: "bloqueado", tooltip: "Aguardando todas as aprovações" },
}

// Documentos
const documentosMock = [
  { id: 1, tipo: "RG", obrigatorio: true, arquivo: "rg_joao.pdf", validade: null, status: "ok" },
  { id: 2, tipo: "CPF", obrigatorio: true, arquivo: "cpf_joao.pdf", validade: null, status: "ok" },
  { id: 3, tipo: "CTPS", obrigatorio: true, arquivo: "ctps_joao.pdf", validade: null, status: "ok" },
  {
    id: 4,
    tipo: "Comprovante de Residência",
    obrigatorio: true,
    arquivo: "comp_res.pdf",
    validade: "2025-06-01",
    status: "ok",
  },
  { id: 5, tipo: "ASO Admissional", obrigatorio: true, arquivo: null, validade: null, status: "pendente" },
  {
    id: 6,
    tipo: "Certidão de Nascimento (filhos)",
    obrigatorio: false,
    arquivo: null,
    validade: null,
    status: "pendente",
  },
]

// ASO
const asoMock = [{ id: 1, tipo: "Admissional", data: null, validade: null, status: "pendente" }]

// NRs/Treinamentos
const nrsMock = [
  {
    id: 1,
    nr: "NR-18",
    descricao: "Condições e Meio Ambiente de Trabalho na Indústria da Construção",
    validade: "2025-08-15",
    status: "ok",
  },
  { id: 2, nr: "NR-35", descricao: "Trabalho em Altura", validade: null, status: "pendente" },
  { id: 3, nr: "NR-06", descricao: "Equipamentos de Proteção Individual", validade: "2025-12-01", status: "ok" },
]

// Aprovações
const aprovacoesMock = [
  {
    id: 1,
    tipo: "Desvio Salarial",
    motivo: "Salário R$ 300 acima do orçado",
    solicitante: "RH Obra",
    aprovador: "Gerente de Contrato",
    status: "em_aprovacao",
    data: "2025-01-05",
  },
]

// Histórico
const historicoMock = [
  {
    id: 1,
    data: "2025-01-03 09:15",
    acao: "Cadastro criado",
    usuario: "Maria Santos",
    detalhes: "Pré-cadastro iniciado",
  },
  { id: 2, data: "2025-01-03 10:30", acao: "Documentos anexados", usuario: "Maria Santos", detalhes: "RG, CPF, CTPS" },
  {
    id: 3,
    data: "2025-01-04 14:00",
    acao: "Vínculo definido",
    usuario: "Maria Santos",
    detalhes: "CLT - Armador - Direto",
  },
  {
    id: 4,
    data: "2025-01-05 08:45",
    acao: "Desvio identificado",
    usuario: "Sistema",
    detalhes: "Salário praticado R$ 3.200 > Referência R$ 2.900",
  },
  {
    id: 5,
    data: "2025-01-05 09:00",
    acao: "Aprovação solicitada",
    usuario: "Maria Santos",
    detalhes: "Desvio salarial enviado para aprovação",
  },
]

// Benefícios da convenção
const beneficiosMock = [
  { nome: "Vale Transporte", valor: "6% desconto", origem: "CLT" },
  { nome: "Vale Alimentação", valor: "R$ 28,00/dia", origem: "SINTRACON-SP" },
  { nome: "Cesta Básica", valor: "R$ 180,00/mês", origem: "SINTRACON-SP" },
  { nome: "Seguro de Vida", valor: "Incluso", origem: "SINTRACON-SP" },
]

function WorkflowStep({
  numero,
  titulo,
  status,
  tooltip,
  icon: Icon,
}: {
  numero: number
  titulo: string
  status: "completo" | "completo_alerta" | "em_andamento" | "bloqueado"
  tooltip: string
  icon: React.ElementType
}) {
  const getStatusStyle = () => {
    switch (status) {
      case "completo":
        return "bg-green-500 text-white border-green-500"
      case "completo_alerta":
        return "bg-amber-500 text-white border-amber-500"
      case "em_andamento":
        return "bg-blue-500 text-white border-blue-500 animate-pulse"
      case "bloqueado":
        return "bg-muted text-muted-foreground border-muted"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "completo":
        return <Check className="h-4 w-4" />
      case "completo_alerta":
        return <AlertTriangle className="h-4 w-4" />
      case "em_andamento":
        return <Clock className="h-4 w-4" />
      case "bloqueado":
        return <Lock className="h-4 w-4" />
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center gap-2">
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusStyle()}`}>
              {getStatusIcon()}
            </div>
            <div className="text-center">
              <p className="text-xs font-medium">{titulo}</p>
              <p className="text-[10px] text-muted-foreground">
                {status === "completo" && "OK"}
                {status === "completo_alerta" && "OK (Alerta)"}
                {status === "em_andamento" && "Em andamento"}
                {status === "bloqueado" && "Bloqueado"}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

function ProntuarioContent() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("dados-basicos")
  const [colaborador, setColaborador] = useState(colaboradorMock)
  const [justificativaDesvio, setJustificativaDesvio] = useState("")

  const desvioSalarial = colaborador.salarioPraticado - colaborador.salarioReferencia
  const desvioPercentual = ((desvioSalarial / colaborador.salarioReferencia) * 100).toFixed(1)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-500">OK</Badge>
      case "pendente":
        return <Badge variant="destructive">Pendente</Badge>
      case "vencendo":
        return <Badge className="bg-amber-500">Vencendo</Badge>
      case "vencido":
        return <Badge variant="destructive">Vencido</Badge>
      case "em_aprovacao":
        return <Badge className="bg-blue-500">Em Aprovação</Badge>
      case "aprovado":
        return <Badge className="bg-green-500">Aprovado</Badge>
      case "rejeitado":
        return <Badge variant="destructive">Rejeitado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Botão Voltar */}
      <div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/obra/administrativo/rh">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Link>
        </Button>
      </div>

      {/* WORKFLOW DE EFETIVAÇÃO */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Workflow de Efetivação</CardTitle>
          <CardDescription>Acompanhe o progresso do cadastro e efetivação do colaborador</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <WorkflowStep
              numero={1}
              titulo="Pré-Cadastro"
              status={workflowMock.preCadastro.status as any}
              tooltip={workflowMock.preCadastro.tooltip}
              icon={User}
            />
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <WorkflowStep
              numero={2}
              titulo="Vínculo & Condições"
              status={workflowMock.vinculoCondicoes.status as any}
              tooltip={workflowMock.vinculoCondicoes.tooltip}
              icon={Briefcase}
            />
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <WorkflowStep
              numero={3}
              titulo="Documentação"
              status={workflowMock.documentacao.status as any}
              tooltip={workflowMock.documentacao.tooltip}
              icon={FileText}
            />
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <WorkflowStep
              numero={4}
              titulo="SST"
              status={workflowMock.sst.status as any}
              tooltip={workflowMock.sst.tooltip}
              icon={Shield}
            />
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <WorkflowStep
              numero={5}
              titulo="Aprovação"
              status={workflowMock.aprovacao.status as any}
              tooltip={workflowMock.aprovacao.tooltip}
              icon={ClipboardCheck}
            />
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <WorkflowStep
              numero={6}
              titulo="Efetivação"
              status={workflowMock.efetivacao.status as any}
              tooltip={workflowMock.efetivacao.tooltip}
              icon={FileCheck}
            />
          </div>
        </CardContent>
      </Card>

      {/* HEADER DO COLABORADOR */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{colaborador.nome}</h2>
                  <p className="text-sm text-muted-foreground">CPF: {colaborador.cpf}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-sm">
                  {colaborador.vinculo}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {colaborador.cargo}
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {colaborador.classificacao}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {colaborador.obraNome}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <Badge className="bg-amber-500 text-sm px-3 py-1">DOCUMENTAÇÃO PENDENTE</Badge>
                {desvioSalarial > 0 && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    DESVIO DE CUSTO (+{desvioPercentual}%)
                  </Badge>
                )}
                {colaborador.bloqueado && (
                  <Badge variant="destructive" className="text-sm px-3 py-1">
                    BLOQUEADO PARA EFETIVAÇÃO
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                Histórico
              </Button>
              <Button variant="outline" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Enviar para Validação
              </Button>
              <Button size="sm">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ABAS DO PRONTUÁRIO */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dados-basicos" className="text-xs">
            Dados Básicos
            {workflowMock.preCadastro.status === "completo" && <Check className="h-3 w-3 ml-1 text-green-500" />}
          </TabsTrigger>
          <TabsTrigger value="vinculo" className="text-xs">
            Vínculo & Condições
            {workflowMock.vinculoCondicoes.status === "completo_alerta" && (
              <AlertTriangle className="h-3 w-3 ml-1 text-amber-500" />
            )}
          </TabsTrigger>
          <TabsTrigger value="documentacao" className="text-xs">
            Documentação
            {workflowMock.documentacao.status === "em_andamento" && <Clock className="h-3 w-3 ml-1 text-blue-500" />}
          </TabsTrigger>
          <TabsTrigger value="sst" className="text-xs">
            SST
            {workflowMock.sst.status === "bloqueado" && <Lock className="h-3 w-3 ml-1 text-muted-foreground" />}
          </TabsTrigger>
          <TabsTrigger value="aprovacoes" className="text-xs">
            Aprovações
          </TabsTrigger>
          <TabsTrigger value="historico" className="text-xs">
            Histórico
          </TabsTrigger>
        </TabsList>

        {/* ABA 1 - DADOS BÁSICOS */}
        <TabsContent value="dados-basicos">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Dados Básicos</CardTitle>
                  <CardDescription>Cadastro inicial do colaborador</CardDescription>
                </div>
                <Badge className="bg-green-500">Completa</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={colaborador.nome}
                      onChange={(e) => setColaborador({ ...colaborador, nome: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input id="cpf" value={colaborador.cpf} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nascimento">Data de Nascimento</Label>
                    <Input
                      id="nascimento"
                      type="date"
                      value={colaborador.dataNascimento}
                      onChange={(e) => setColaborador({ ...colaborador, dataNascimento: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={colaborador.telefone}
                      onChange={(e) => setColaborador({ ...colaborador, telefone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={colaborador.email}
                      onChange={(e) => setColaborador({ ...colaborador, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estadoCivil">Estado Civil</Label>
                    <Select
                      value={colaborador.estadoCivil}
                      onValueChange={(v) => setColaborador({ ...colaborador, estadoCivil: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Solteiro">Solteiro(a)</SelectItem>
                        <SelectItem value="Casado">Casado(a)</SelectItem>
                        <SelectItem value="Divorciado">Divorciado(a)</SelectItem>
                        <SelectItem value="Viúvo">Viúvo(a)</SelectItem>
                        <SelectItem value="União Estável">União Estável</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="endereco">Endereço Completo</Label>
                  <Input
                    id="endereco"
                    value={colaborador.endereco}
                    onChange={(e) => setColaborador({ ...colaborador, endereco: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 2 - VÍNCULO & CONDIÇÕES */}
        <TabsContent value="vinculo">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vínculo & Condições</CardTitle>
                  <CardDescription>Definição das condições de contratação</CardDescription>
                </div>
                <Badge className="bg-amber-500">Alerta de Desvio</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Alerta de Desvio */}
              {desvioSalarial > 0 && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Desvio Salarial Identificado:</strong> O salário praticado (R${" "}
                    {colaborador.salarioPraticado.toLocaleString("pt-BR")}) está R${" "}
                    {desvioSalarial.toLocaleString("pt-BR")} ({desvioPercentual}%) acima do salário de referência orçado
                    (R$ {colaborador.salarioReferencia.toLocaleString("pt-BR")}). É necessário justificativa e
                    aprovação.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Tipo de Vínculo</Label>
                    <Select value={colaborador.vinculo}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CLT">CLT</SelectItem>
                        <SelectItem value="PJ">PJ</SelectItem>
                        <SelectItem value="Terceirizado">Terceirizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Cargo / Função</Label>
                    <Input value={colaborador.cargo} />
                  </div>
                  <div className="space-y-2">
                    <Label>Classificação</Label>
                    <Select value={colaborador.classificacao}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Direto">Direto</SelectItem>
                        <SelectItem value="Indireto">Indireto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Obra / Centro de Custo</Label>
                    <Input value={colaborador.obraNome} disabled />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Convenção Aplicada</Label>
                    <Input value={colaborador.convencao} disabled />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Salário Praticado</Label>
                      <div className="relative">
                        <Input
                          value={colaborador.salarioPraticado}
                          className={desvioSalarial > 0 ? "border-red-500 pr-16" : ""}
                        />
                        {desvioSalarial > 0 && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-red-500 font-medium">
                            +{desvioPercentual}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Salário Referência (Orçado)</Label>
                      <Input value={colaborador.salarioReferencia} disabled className="bg-muted" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Jornada</Label>
                      <Input value={colaborador.jornada} />
                    </div>
                    <div className="space-y-2">
                      <Label>Escala</Label>
                      <Input value={colaborador.escala} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Justificativa do Desvio */}
              {desvioSalarial > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <Label className="text-red-600">Justificativa do Desvio (Obrigatório)</Label>
                  <Textarea
                    placeholder="Informe o motivo do salário acima do orçado..."
                    value={justificativaDesvio}
                    onChange={(e) => setJustificativaDesvio(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Esta justificativa será enviada para aprovação do Gerente de Contrato.
                  </p>
                </div>
              )}

              {/* Benefícios da Convenção */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Benefícios Aplicáveis (herdados da convenção)</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Benefício</TableHead>
                      <TableHead>Valor/Condição</TableHead>
                      <TableHead>Origem</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {beneficiosMock.map((b, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{b.nome}</TableCell>
                        <TableCell>{b.valor}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{b.origem}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 3 - DOCUMENTAÇÃO */}
        <TabsContent value="documentacao">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Documentação</CardTitle>
                  <CardDescription>Controle documental obrigatório</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline">4 OK</Badge>
                  <Badge variant="destructive">2 Pendentes</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Documento</TableHead>
                    <TableHead className="text-center">Obrigatório</TableHead>
                    <TableHead>Arquivo</TableHead>
                    <TableHead>Validade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentosMock.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.tipo}</TableCell>
                      <TableCell className="text-center">
                        {doc.obrigatorio ? (
                          <Badge variant="secondary">Sim</Badge>
                        ) : (
                          <Badge variant="outline">Não</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {doc.arquivo ? (
                          <span className="text-sm text-blue-600">{doc.arquivo}</span>
                        ) : (
                          <span className="text-sm text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>{doc.validade ? new Date(doc.validade).toLocaleDateString("pt-BR") : "-"}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {doc.arquivo ? (
                            <>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-2" />
                              Anexar
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 4 - SST */}
        <TabsContent value="sst">
          <div className="space-y-6">
            {/* Alerta de Bloqueio */}
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Esta etapa está <strong>bloqueada</strong> até que a documentação esteja completa. Pendências: ASO
                Admissional.
              </AlertDescription>
            </Alert>

            {/* ASO */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Atestados de Saúde Ocupacional (ASO)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asoMock.map((aso) => (
                      <TableRow key={aso.id}>
                        <TableCell className="font-medium">{aso.tipo}</TableCell>
                        <TableCell>{aso.data ? new Date(aso.data).toLocaleDateString("pt-BR") : "-"}</TableCell>
                        <TableCell>{aso.validade ? new Date(aso.validade).toLocaleDateString("pt-BR") : "-"}</TableCell>
                        <TableCell>{getStatusBadge(aso.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" disabled>
                            <Upload className="h-4 w-4 mr-2" />
                            Anexar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* NRs / Treinamentos */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Treinamentos / NRs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>NR</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nrsMock.map((nr) => (
                      <TableRow key={nr.id}>
                        <TableCell className="font-medium">{nr.nr}</TableCell>
                        <TableCell className="max-w-[300px] truncate">{nr.descricao}</TableCell>
                        <TableCell>{nr.validade ? new Date(nr.validade).toLocaleDateString("pt-BR") : "-"}</TableCell>
                        <TableCell>{getStatusBadge(nr.status)}</TableCell>
                        <TableCell className="text-right">
                          {nr.status === "pendente" ? (
                            <Button variant="outline" size="sm" disabled>
                              <Upload className="h-4 w-4 mr-2" />
                              Anexar
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ABA 5 - APROVAÇÕES */}
        <TabsContent value="aprovacoes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Aprovações</CardTitle>
                  <CardDescription>Governança e fluxos de aprovação</CardDescription>
                </div>
                <Badge className="bg-blue-500">1 Em Aprovação</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo de Solicitação</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Aprovador</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {aprovacoesMock.map((apr) => (
                    <TableRow key={apr.id}>
                      <TableCell className="font-medium">{apr.tipo}</TableCell>
                      <TableCell>{apr.motivo}</TableCell>
                      <TableCell>{apr.solicitante}</TableCell>
                      <TableCell>{apr.aprovador}</TableCell>
                      <TableCell>{new Date(apr.data).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{getStatusBadge(apr.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ABA 6 - HISTÓRICO */}
        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico / Auditoria</CardTitle>
              <CardDescription>Rastreabilidade completa de todas as ações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 border-l-2 border-muted space-y-6">
                {historicoMock.map((item, index) => (
                  <div key={item.id} className="relative">
                    <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-primary" />
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.acao}</span>
                        <span className="text-xs text-muted-foreground">{item.data}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.detalhes}</p>
                      <p className="text-xs text-muted-foreground mt-1">Por: {item.usuario}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function ColaboradorPage() {
  return (
    <Suspense fallback={null}>
      <ProntuarioContent />
    </Suspense>
  )
}
