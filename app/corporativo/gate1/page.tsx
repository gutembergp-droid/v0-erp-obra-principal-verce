"use client"

import type React from "react"

import { AppLayout } from "@/components/layout/app-layout"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ShieldCheck,
  Users,
  FileText,
  FolderKanban,
  Upload,
  ArrowRight,
} from "lucide-react"

// Dados mockados de obras aguardando Gate 1
const obrasGate1Mock = [
  {
    id: 1,
    nome: "SES Região Metropolitana - Fase 1",
    centroCusto: "CC-2024-002",
    cliente: "SABESP",
    validacoes: {
      clienteCadastrado: true,
      contratoCadastrado: true,
      centroCustoCriado: true,
      planilhaCarregada: true,
      baselineHomologada: false,
    },
    progresso: 80,
  },
  {
    id: 2,
    nome: "SP-330 Restauração Trecho Norte",
    centroCusto: "CC-2024-003",
    cliente: "CCR Rodovias",
    validacoes: {
      clienteCadastrado: true,
      contratoCadastrado: true,
      centroCustoCriado: true,
      planilhaCarregada: false,
      baselineHomologada: false,
    },
    progresso: 60,
  },
  {
    id: 3,
    nome: "BR-116 Duplicação Lote 5",
    centroCusto: "CC-2024-004",
    cliente: "DNIT",
    validacoes: {
      clienteCadastrado: true,
      contratoCadastrado: true,
      centroCustoCriado: false,
      planilhaCarregada: false,
      baselineHomologada: false,
    },
    progresso: 40,
  },
]

const obrasLiberadasMock = [
  {
    id: 1,
    nome: "BR-101 Duplicação Lote 3",
    centroCusto: "CC-2024-001",
    cliente: "DNIT",
    dataLiberacao: "2024-02-15",
  },
  {
    id: 2,
    nome: "UHE Belo Monte - Complementar A",
    centroCusto: "CC-2023-089",
    cliente: "Eletrobras Furnas",
    dataLiberacao: "2023-08-10",
  },
]

function ValidationItem({ label, icon: Icon, valid }: { label: string; icon: React.ElementType; valid: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm">{label}</span>
      </div>
      {valid ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <XCircle className="w-5 h-5 text-red-500" />}
    </div>
  )
}

export default function Gate1Page() {
  return (
    <AppLayout>
      <Header
        title="Gate 1 - Liberação de Obra"
        description="Validações obrigatórias para transição Corporativo → Obra"
      />

      <div className="p-6 space-y-6">
        {/* Explicação do Gate 1 */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">Gate 1 - Transição Corporativo para Obra</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  O Gate 1 controla a transição do Módulo Corporativo para o Módulo Obra. Após aprovação, a obra passa a
                  existir no Módulo Obra e não pode ser excluída.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant="outline">Cliente cadastrado</Badge>
                  <Badge variant="outline">Contrato cadastrado</Badge>
                  <Badge variant="outline">Centro de custo criado</Badge>
                  <Badge variant="outline">Planilha carregada</Badge>
                  <Badge variant="outline" className="border-primary text-primary">
                    Baseline homologada
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aguardando Gate 1</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">{obrasGate1Mock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Obras Liberadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{obrasLiberadasMock.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Prontas para Liberar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {obrasGate1Mock.filter((o) => o.progresso === 100).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Obras Aguardando Gate 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Obras Aguardando Liberação
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {obrasGate1Mock.map((obra) => (
              <Card key={obra.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base">{obra.nome}</CardTitle>
                      <CardDescription>
                        {obra.centroCusto} | {obra.cliente}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={obra.progresso === 100 ? "default" : "outline"}
                      className={obra.progresso === 100 ? "bg-green-500" : "text-amber-500 border-amber-500"}
                    >
                      {obra.progresso}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={obra.progresso} className="h-2" />

                  <div className="space-y-1">
                    <ValidationItem label="Cliente cadastrado" icon={Users} valid={obra.validacoes.clienteCadastrado} />
                    <ValidationItem
                      label="Contrato cadastrado"
                      icon={FileText}
                      valid={obra.validacoes.contratoCadastrado}
                    />
                    <ValidationItem
                      label="Centro de custo criado"
                      icon={FolderKanban}
                      valid={obra.validacoes.centroCustoCriado}
                    />
                    <ValidationItem
                      label="Planilha analítica carregada"
                      icon={Upload}
                      valid={obra.validacoes.planilhaCarregada}
                    />
                    <ValidationItem
                      label="Baseline proposta homologada"
                      icon={CheckCircle2}
                      valid={obra.validacoes.baselineHomologada}
                    />
                  </div>

                  <Button className="w-full" disabled={obra.progresso !== 100}>
                    <ShieldCheck className="w-4 h-4 mr-2" />
                    {obra.progresso === 100 ? "Aprovar Gate 1" : "Completar Validações"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Obras Liberadas */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            Obras com Gate 1 Aprovado
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {obrasLiberadasMock.map((obra) => (
              <Card key={obra.id} className="border-green-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{obra.nome}</CardTitle>
                      <CardDescription>{obra.cliente}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Liberada em {new Date(obra.dataLiberacao).toLocaleDateString("pt-BR")}
                    </div>
                    <Button variant="outline" size="sm">
                      Ir para Obra
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
