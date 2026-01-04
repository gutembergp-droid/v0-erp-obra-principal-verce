"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, DollarSign, Wallet, CreditCard, CheckCircle2, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"

// Dados mockados de Fundo Fixo
const fundoFixoMock = [
  {
    id: "FF-001",
    descricao: "Material de escritorio",
    valor: 450,
    data: "2026-01-02",
    categoria: "Material",
    status: "prestado",
    responsavel: "Ana Silva",
  },
  {
    id: "FF-002",
    descricao: "Combustivel - veiculo apoio",
    valor: 380,
    data: "2026-01-03",
    categoria: "Combustivel",
    status: "prestado",
    responsavel: "Carlos Lima",
  },
  {
    id: "FF-003",
    descricao: "Refeicoes equipe - reuniao externa",
    valor: 520,
    data: "2026-01-04",
    categoria: "Alimentacao",
    status: "pendente",
    responsavel: "Maria Costa",
  },
]

// Dados mockados de Pagamentos Locais
const pagamentosMock = [
  {
    id: "PAG-001",
    fornecedor: "Posto Shell km 105",
    descricao: "Abastecimento emergencial",
    valor: 1200,
    data: "2026-01-03",
    formaPagamento: "Cartao Corporativo",
    status: "pago",
    nf: "NF-12345",
  },
  {
    id: "PAG-002",
    fornecedor: "Restaurante Beira Rio",
    descricao: "Almoco equipe fiscalizacao",
    valor: 850,
    data: "2026-01-04",
    formaPagamento: "Fundo Fixo",
    status: "pago",
    nf: "NF-12346",
  },
  {
    id: "PAG-003",
    fornecedor: "Ferretaria Central",
    descricao: "Ferramentas manuais urgente",
    valor: 2400,
    data: "2026-01-04",
    formaPagamento: "Boleto",
    status: "pendente",
    nf: "NF-12347",
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export default function FinanceiroObraPage() {
  const [tab, setTab] = useState("fundofixo")

  const saldoFundoFixo = 5000
  const utilizadoFundoFixo = fundoFixoMock.reduce((acc, f) => acc + f.valor, 0)
  const totalPagamentos = pagamentosMock.reduce((acc, p) => acc + p.valor, 0)
  const pagamentosPendentes = pagamentosMock.filter((p) => p.status === "pendente").length

  return (
    <AppLayout>
      <Header title="Financeiro da Obra" description="Fundo Fixo e Pagamentos Locais" />

      <div className="p-6 space-y-6">
        {/* Conceito */}
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Setor Financeiro da Obra</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Gerencia o <strong>Fundo Fixo</strong> (pequenas despesas operacionais com prestacao de contas) e
                  <strong> Pagamentos Locais</strong> (fornecedores locais, emergencias).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metricas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Saldo Fundo Fixo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{formatCurrency(saldoFundoFixo)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4" />
                Utilizado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{formatCurrency(utilizadoFundoFixo)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4" />
                Disponivel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(saldoFundoFixo - utilizadoFundoFixo)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Pagamentos Mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalPagamentos)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pendentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{pagamentosPendentes}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="fundofixo">
              <Wallet className="w-4 h-4 mr-2" />
              Fundo Fixo
            </TabsTrigger>
            <TabsTrigger value="pagamentos">
              <CreditCard className="w-4 h-4 mr-2" />
              Pagamentos Locais
            </TabsTrigger>
          </TabsList>

          {/* Fundo Fixo */}
          <TabsContent value="fundofixo">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Fundo Fixo</CardTitle>
                    <CardDescription>Despesas operacionais com prestacao de contas</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Despesa
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Responsavel</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fundoFixoMock.map((ff) => (
                      <TableRow key={ff.id}>
                        <TableCell className="font-mono font-bold">{ff.id}</TableCell>
                        <TableCell>{ff.descricao}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ff.categoria}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(ff.valor)}</TableCell>
                        <TableCell>{new Date(ff.data).toLocaleDateString("pt-BR")}</TableCell>
                        <TableCell>{ff.responsavel}</TableCell>
                        <TableCell>
                          {ff.status === "prestado" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Prestado
                            </Badge>
                          )}
                          {ff.status === "pendente" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
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

          {/* Pagamentos */}
          <TabsContent value="pagamentos">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base">Pagamentos Locais</CardTitle>
                    <CardDescription>Fornecedores locais e despesas emergenciais</CardDescription>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Pagamento
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead>Forma Pgto</TableHead>
                      <TableHead>NF</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagamentosMock.map((pag) => (
                      <TableRow key={pag.id}>
                        <TableCell className="font-mono font-bold">{pag.id}</TableCell>
                        <TableCell>{pag.fornecedor}</TableCell>
                        <TableCell>{pag.descricao}</TableCell>
                        <TableCell className="text-right font-mono">{formatCurrency(pag.valor)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{pag.formaPagamento}</Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{pag.nf}</TableCell>
                        <TableCell>
                          {pag.status === "pago" && (
                            <Badge className="bg-green-500">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Pago
                            </Badge>
                          )}
                          {pag.status === "pendente" && (
                            <Badge variant="outline" className="text-amber-500">
                              <Clock className="w-3 h-3 mr-1" />
                              Pendente
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
        </Tabs>
      </div>
    </AppLayout>
  )
}
