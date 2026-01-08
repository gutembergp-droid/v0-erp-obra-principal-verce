"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { RHNav } from "@/components/rh/rh-nav"
import {
  Building2,
  Users,
  FileWarning,
  AlertTriangle,
  Search,
  Eye,
  ArrowLeft,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Building,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  Scale,
} from "lucide-react"
import Link from "next/link"

// Dados mockados - Empresas Terceirizadas
const empresasMock = [
  {
    id: "EMP-001",
    empresa: "Alpha Serviços Ltda",
    cnpj: "12.345.678/0001-90",
    obras: ["BR-101 Lote 2", "Ponte Rio Negro"],
    pessoasAlocadas: 40,
    situacaoDocumental: "parcial",
    percentualDocs: 85,
    convencao: "SINTRACON-SP",
    riscoTrabalhista: "medio",
    status: "ativo",
    contato: "(11) 99999-1234",
    email: "contato@alphaservicos.com.br",
    endereco: "Rua das Industrias, 500 - Sao Paulo/SP",
    dataContrato: "2024-01-15",
    valorContrato: 2500000,
  },
  {
    id: "EMP-002",
    empresa: "Beta Montagens Industriais",
    cnpj: "23.456.789/0001-01",
    obras: ["Viaduto Central"],
    pessoasAlocadas: 70,
    situacaoDocumental: "irregular",
    percentualDocs: 62,
    convencao: "SINDUSCON-RJ",
    riscoTrabalhista: "alto",
    status: "ativo",
    contato: "(21) 98888-5678",
    email: "rh@betamontagens.com.br",
    endereco: "Av. Brasil, 1200 - Rio de Janeiro/RJ",
    dataContrato: "2023-08-01",
    valorContrato: 4800000,
  },
  {
    id: "EMP-003",
    empresa: "Gamma Engenharia e Construcoes",
    cnpj: "34.567.890/0001-12",
    obras: ["Ponte Rio Negro"],
    pessoasAlocadas: 90,
    situacaoDocumental: "regular",
    percentualDocs: 98,
    convencao: "SINTRACON-SP",
    riscoTrabalhista: "baixo",
    status: "ativo",
    contato: "(11) 97777-9012",
    email: "juridico@gammaeng.com.br",
    endereco: "Rua Engenheiro Reboucas, 300 - Sao Paulo/SP",
    dataContrato: "2024-03-10",
    valorContrato: 6200000,
  },
  {
    id: "EMP-004",
    empresa: "Delta Terraplenagem",
    cnpj: "45.678.901/0001-23",
    obras: ["BR-101 Lote 2"],
    pessoasAlocadas: 25,
    situacaoDocumental: "parcial",
    percentualDocs: 78,
    convencao: "SINTRACON-SP",
    riscoTrabalhista: "medio",
    status: "ativo",
    contato: "(11) 96666-3456",
    email: "contato@deltaterra.com.br",
    endereco: "Rod. Anhanguera, km 45 - Jundiai/SP",
    dataContrato: "2024-02-20",
    valorContrato: 1800000,
  },
  {
    id: "EMP-005",
    empresa: "Epsilon Estruturas Metalicas",
    cnpj: "56.789.012/0001-34",
    obras: ["Viaduto Central", "Ponte Rio Negro"],
    pessoasAlocadas: 55,
    situacaoDocumental: "regular",
    percentualDocs: 95,
    convencao: "SINDUSCON-RJ",
    riscoTrabalhista: "baixo",
    status: "ativo",
    contato: "(21) 95555-7890",
    email: "adm@epsilonestruturas.com.br",
    endereco: "Av. das Americas, 4500 - Rio de Janeiro/RJ",
    dataContrato: "2024-01-05",
    valorContrato: 3500000,
  },
]

// Dados mockados - Pessoas alocadas por empresa
const pessoasPorEmpresa: Record<
  string,
  Array<{
    id: string
    nome: string
    funcao: string
    obra: string
    admissao: string
    situacaoDoc: string
    aso: string
    nrs: string
  }>
> = {
  "EMP-001": [
    {
      id: "P-001",
      nome: "Carlos Silva",
      funcao: "Pedreiro",
      obra: "BR-101 Lote 2",
      admissao: "2024-01-20",
      situacaoDoc: "regular",
      aso: "vigente",
      nrs: "OK",
    },
    {
      id: "P-002",
      nome: "Jose Santos",
      funcao: "Servente",
      obra: "BR-101 Lote 2",
      admissao: "2024-02-15",
      situacaoDoc: "pendente",
      aso: "vencido",
      nrs: "OK",
    },
    {
      id: "P-003",
      nome: "Antonio Oliveira",
      funcao: "Armador",
      obra: "Ponte Rio Negro",
      admissao: "2024-01-25",
      situacaoDoc: "regular",
      aso: "vigente",
      nrs: "OK",
    },
    {
      id: "P-004",
      nome: "Marcos Souza",
      funcao: "Carpinteiro",
      obra: "Ponte Rio Negro",
      admissao: "2024-03-01",
      situacaoDoc: "regular",
      aso: "vigente",
      nrs: "Pendente",
    },
  ],
  "EMP-002": [
    {
      id: "P-005",
      nome: "Paulo Ferreira",
      funcao: "Montador",
      obra: "Viaduto Central",
      admissao: "2023-08-15",
      situacaoDoc: "irregular",
      aso: "vencido",
      nrs: "Pendente",
    },
    {
      id: "P-006",
      nome: "Roberto Lima",
      funcao: "Soldador",
      obra: "Viaduto Central",
      admissao: "2023-09-01",
      situacaoDoc: "pendente",
      aso: "vigente",
      nrs: "OK",
    },
    {
      id: "P-007",
      nome: "Fernando Costa",
      funcao: "Operador",
      obra: "Viaduto Central",
      admissao: "2023-10-10",
      situacaoDoc: "irregular",
      aso: "vencido",
      nrs: "Pendente",
    },
  ],
  "EMP-003": [
    {
      id: "P-008",
      nome: "Ricardo Alves",
      funcao: "Engenheiro",
      obra: "Ponte Rio Negro",
      admissao: "2024-03-15",
      situacaoDoc: "regular",
      aso: "vigente",
      nrs: "OK",
    },
    {
      id: "P-009",
      nome: "Eduardo Martins",
      funcao: "Mestre de Obras",
      obra: "Ponte Rio Negro",
      admissao: "2024-03-15",
      situacaoDoc: "regular",
      aso: "vigente",
      nrs: "OK",
    },
    {
      id: "P-010",
      nome: "Sergio Rocha",
      funcao: "Encarregado",
      obra: "Ponte Rio Negro",
      admissao: "2024-03-20",
      situacaoDoc: "regular",
      aso: "vigente",
      nrs: "OK",
    },
  ],
}

// Dados mockados - Documentos exigidos
const documentosEmpresa: Record<
  string,
  Array<{
    documento: string
    obrigatorio: boolean
    status: string
    validade: string
  }>
> = {
  "EMP-001": [
    { documento: "Certidao Negativa FGTS", obrigatorio: true, status: "entregue", validade: "2025-06-15" },
    { documento: "Certidao Negativa INSS", obrigatorio: true, status: "entregue", validade: "2025-05-20" },
    { documento: "CNDT - Certidao Trabalhista", obrigatorio: true, status: "pendente", validade: "-" },
    { documento: "Contrato Social Atualizado", obrigatorio: true, status: "entregue", validade: "-" },
    { documento: "Apolice Seguro de Vida", obrigatorio: true, status: "entregue", validade: "2025-12-31" },
    { documento: "Comprovante Recolhimento Sindical", obrigatorio: false, status: "entregue", validade: "2025-01-31" },
  ],
  "EMP-002": [
    { documento: "Certidao Negativa FGTS", obrigatorio: true, status: "vencido", validade: "2024-11-15" },
    { documento: "Certidao Negativa INSS", obrigatorio: true, status: "vencido", validade: "2024-10-20" },
    { documento: "CNDT - Certidao Trabalhista", obrigatorio: true, status: "pendente", validade: "-" },
    { documento: "Contrato Social Atualizado", obrigatorio: true, status: "entregue", validade: "-" },
    { documento: "Apolice Seguro de Vida", obrigatorio: true, status: "entregue", validade: "2025-06-30" },
    { documento: "Comprovante Recolhimento Sindical", obrigatorio: false, status: "pendente", validade: "-" },
  ],
  "EMP-003": [
    { documento: "Certidao Negativa FGTS", obrigatorio: true, status: "entregue", validade: "2025-08-10" },
    { documento: "Certidao Negativa INSS", obrigatorio: true, status: "entregue", validade: "2025-07-15" },
    { documento: "CNDT - Certidao Trabalhista", obrigatorio: true, status: "entregue", validade: "2025-09-01" },
    { documento: "Contrato Social Atualizado", obrigatorio: true, status: "entregue", validade: "-" },
    { documento: "Apolice Seguro de Vida", obrigatorio: true, status: "entregue", validade: "2025-12-31" },
    { documento: "Comprovante Recolhimento Sindical", obrigatorio: false, status: "entregue", validade: "2025-01-31" },
  ],
}

// Dados mockados - Ocorrencias
const ocorrenciasEmpresa: Record<
  string,
  Array<{
    id: string
    data: string
    tipo: string
    descricao: string
    status: string
    impacto: string
  }>
> = {
  "EMP-001": [
    {
      id: "OC-001",
      data: "2024-11-15",
      tipo: "Notificacao",
      descricao: "Atraso entrega CNDT",
      status: "aberto",
      impacto: "baixo",
    },
  ],
  "EMP-002": [
    {
      id: "OC-002",
      data: "2024-10-20",
      tipo: "Acidente",
      descricao: "Acidente com afastamento - colaborador Paulo Ferreira",
      status: "em_tratamento",
      impacto: "alto",
    },
    {
      id: "OC-003",
      data: "2024-11-05",
      tipo: "Fiscalizacao",
      descricao: "Auto de infracao MTE - documentacao irregular",
      status: "aberto",
      impacto: "alto",
    },
    {
      id: "OC-004",
      data: "2024-12-01",
      tipo: "Trabalhista",
      descricao: "Reclamacao trabalhista - ex-funcionario",
      status: "aberto",
      impacto: "medio",
    },
  ],
  "EMP-003": [],
}

function TerceirizadosContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmpresa, setSelectedEmpresa] = useState<(typeof empresasMock)[0] | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [abaDetalhe, setAbaDetalhe] = useState("dados")

  // Calculos para cards
  const totalEmpresas = empresasMock.filter((e) => e.status === "ativo").length
  const totalPessoas = empresasMock.reduce((sum, e) => sum + e.pessoasAlocadas, 0)
  const pessoasDocPendente = 18 // Mockado
  const riscoAlto = empresasMock.filter((e) => e.riscoTrabalhista === "alto").length

  const empresasFiltradas = empresasMock.filter(
    (e) => e.empresa.toLowerCase().includes(searchTerm.toLowerCase()) || e.cnpj.includes(searchTerm),
  )

  const getSituacaoDocBadge = (situacao: string) => {
    switch (situacao) {
      case "regular":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Regular</Badge>
      case "parcial":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Parcial</Badge>
      case "irregular":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Irregular</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const getRiscoBadge = (risco: string) => {
    switch (risco) {
      case "baixo":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Baixo</Badge>
      case "medio":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Medio</Badge>
      case "alto":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Alto</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const getDocStatusIcon = (status: string) => {
    switch (status) {
      case "entregue":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "pendente":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "vencido":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const handleVerDetalhes = (empresa: (typeof empresasMock)[0]) => {
    setSelectedEmpresa(empresa)
    setAbaDetalhe("dados")
    setDrawerOpen(true)
  }

  const pessoasEmpresa = selectedEmpresa ? pessoasPorEmpresa[selectedEmpresa.id] || [] : []
  const documentosEmpresaSelecionada = selectedEmpresa ? documentosEmpresa[selectedEmpresa.id] || [] : []
  const ocorrenciasEmpresaSelecionada = selectedEmpresa ? ocorrenciasEmpresa[selectedEmpresa.id] || [] : []

  // Calculo passivo potencial
  const calcularPassivoPotencial = (empresaId: string) => {
    const ocorrencias = ocorrenciasEmpresa[empresaId] || []
    const ocorrenciasAlto = ocorrencias.filter((o) => o.impacto === "alto").length
    const ocorrenciasMedio = ocorrencias.filter((o) => o.impacto === "medio").length
    return ocorrenciasAlto * 150000 + ocorrenciasMedio * 50000
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/corporativo/administrativo/rh">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Gestao de Terceirizados</h1>
          <p className="text-sm text-muted-foreground">Controle de empresas terceirizadas e conformidade documental</p>
        </div>
      </div>

      {/* RHNav */}
      <RHNav />

      {/* Cards Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <Building2 className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Empresas Terceirizadas Ativas</p>
                <p className="text-2xl font-bold">{totalEmpresas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Users className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pessoas Terceirizadas Ativas</p>
                <p className="text-2xl font-bold">{totalPessoas}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-500/20">
                <FileWarning className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pessoas com Doc. Pendente</p>
                <p className="text-2xl font-bold">{pessoasDocPendente}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Riscos de Passivo Identificados</p>
                <p className="text-2xl font-bold">{riscoAlto}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela Principal */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Empresas Terceirizadas</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empresa ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Empresa Prestadora</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Obra(s) Atendida(s)</TableHead>
                <TableHead className="text-center">Pessoas Alocadas</TableHead>
                <TableHead className="text-center">Situacao Documental</TableHead>
                <TableHead>Convencao Aplicada</TableHead>
                <TableHead className="text-center">Risco Trabalhista</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Acao</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empresasFiltradas.map((empresa) => (
                <TableRow key={empresa.id}>
                  <TableCell className="font-medium">{empresa.empresa}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">{empresa.cnpj}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {empresa.obras.map((obra, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {obra}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-semibold">{empresa.pessoasAlocadas}</TableCell>
                  <TableCell className="text-center">{getSituacaoDocBadge(empresa.situacaoDocumental)}</TableCell>
                  <TableCell className="text-sm">{empresa.convencao}</TableCell>
                  <TableCell className="text-center">{getRiscoBadge(empresa.riscoTrabalhista)}</TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ativo</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="sm" onClick={() => handleVerDetalhes(empresa)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Drawer de Detalhes */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {selectedEmpresa && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  {selectedEmpresa.empresa}
                </SheetTitle>
                <p className="text-sm text-muted-foreground font-mono">{selectedEmpresa.cnpj}</p>
              </SheetHeader>

              <Tabs value={abaDetalhe} onValueChange={setAbaDetalhe} className="mt-6">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="dados">Dados</TabsTrigger>
                  <TabsTrigger value="pessoas">Pessoas</TabsTrigger>
                  <TabsTrigger value="documentos">Documentos</TabsTrigger>
                  <TabsTrigger value="ocorrencias">Ocorrencias</TabsTrigger>
                </TabsList>

                {/* Aba Dados */}
                <TabsContent value="dados" className="space-y-4 mt-4">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedEmpresa.empresa}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedEmpresa.endereco}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedEmpresa.contato}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{selectedEmpresa.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          Contrato desde: {new Date(selectedEmpresa.dataContrato).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Scale className="h-4 w-4" />
                        Convencao Coletiva
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="font-medium">{selectedEmpresa.convencao}</p>
                      <p className="text-xs text-muted-foreground mt-1">Vigencia: 2024/2025</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Indicadores de Risco
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Risco Trabalhista</span>
                        {getRiscoBadge(selectedEmpresa.riscoTrabalhista)}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Situacao Documental</span>
                        {getSituacaoDocBadge(selectedEmpresa.situacaoDocumental)}
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm">Conformidade Docs</span>
                          <span className="text-sm font-medium">{selectedEmpresa.percentualDocs}%</span>
                        </div>
                        <Progress value={selectedEmpresa.percentualDocs} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm font-medium">Passivo Potencial Estimado</span>
                        <span className="text-lg font-bold text-red-400">
                          {calcularPassivoPotencial(selectedEmpresa.id).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Aba Pessoas */}
                <TabsContent value="pessoas" className="mt-4">
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">
                          Pessoas Alocadas ({pessoasEmpresa.length} de {selectedEmpresa.pessoasAlocadas})
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Funcao</TableHead>
                            <TableHead>Obra</TableHead>
                            <TableHead className="text-center">ASO</TableHead>
                            <TableHead className="text-center">NRs</TableHead>
                            <TableHead className="text-center">Situacao</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pessoasEmpresa.map((pessoa) => (
                            <TableRow key={pessoa.id}>
                              <TableCell className="font-medium">{pessoa.nome}</TableCell>
                              <TableCell>{pessoa.funcao}</TableCell>
                              <TableCell className="text-sm">{pessoa.obra}</TableCell>
                              <TableCell className="text-center">
                                {pessoa.aso === "vigente" ? (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    Vigente
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                    Vencido
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-center">
                                {pessoa.nrs === "OK" ? (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    OK
                                  </Badge>
                                ) : (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                    Pendente
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-center">
                                {pessoa.situacaoDoc === "regular" ? (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                    Regular
                                  </Badge>
                                ) : pessoa.situacaoDoc === "pendente" ? (
                                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                    Pendente
                                  </Badge>
                                ) : (
                                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                    Irregular
                                  </Badge>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Aba Documentos */}
                <TabsContent value="documentos" className="mt-4">
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Documentos Exigidos x Entregues
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Documento</TableHead>
                            <TableHead className="text-center">Obrigatorio</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Validade</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {documentosEmpresaSelecionada.map((doc, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{doc.documento}</TableCell>
                              <TableCell className="text-center">
                                {doc.obrigatorio ? (
                                  <Badge variant="outline" className="text-xs">
                                    Sim
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="text-xs text-muted-foreground">
                                    Nao
                                  </Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-1">
                                  {getDocStatusIcon(doc.status)}
                                  <span className="text-xs capitalize">{doc.status}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-center text-sm">
                                {doc.validade === "-" ? "-" : new Date(doc.validade).toLocaleDateString("pt-BR")}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Aba Ocorrencias */}
                <TabsContent value="ocorrencias" className="mt-4">
                  <Card className="bg-muted/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Ocorrencias / Sinistros / Notificacoes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {ocorrenciasEmpresaSelecionada.length === 0 ? (
                        <div className="p-6 text-center text-muted-foreground">
                          <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
                          <p>Nenhuma ocorrencia registrada</p>
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Data</TableHead>
                              <TableHead>Tipo</TableHead>
                              <TableHead>Descricao</TableHead>
                              <TableHead className="text-center">Impacto</TableHead>
                              <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {ocorrenciasEmpresaSelecionada.map((oc) => (
                              <TableRow key={oc.id}>
                                <TableCell className="text-sm">
                                  {new Date(oc.data).toLocaleDateString("pt-BR")}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {oc.tipo}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-sm">{oc.descricao}</TableCell>
                                <TableCell className="text-center">
                                  {oc.impacto === "alto" ? (
                                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Alto</Badge>
                                  ) : oc.impacto === "medio" ? (
                                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                      Medio
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                      Baixo
                                    </Badge>
                                  )}
                                </TableCell>
                                <TableCell className="text-center">
                                  {oc.status === "aberto" ? (
                                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                      Aberto
                                    </Badge>
                                  ) : oc.status === "em_tratamento" ? (
                                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                                      Em Tratamento
                                    </Badge>
                                  ) : (
                                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                                      Resolvido
                                    </Badge>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>

                  {ocorrenciasEmpresaSelecionada.length > 0 && (
                    <Card className="bg-red-500/10 border-red-500/30 mt-4">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                            <span className="font-medium">Passivo Potencial Estimado</span>
                          </div>
                          <span className="text-xl font-bold text-red-400">
                            {calcularPassivoPotencial(selectedEmpresa.id).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Calculado com base nas ocorrencias em aberto e seu nivel de impacto
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default function TerceirizadosPage() {
  return (
    <Suspense fallback={null}>
      <TerceirizadosContent />
    </Suspense>
  )
}
