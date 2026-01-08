"use client"

import { Suspense, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  Briefcase,
  DollarSign,
  Clock,
  FileText,
  Shield,
  UserCheck,
  BadgeCheck,
  ExternalLink,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Dados mockados do colaborador
const colaboradorMock = {
  id: "COL-001",
  nome: "João Silva",
  cpf: "123.456.789-00",
  vinculo: "CLT",
  obra: "Obra Alpha",
  centroCusto: "CC-001",
  cargo: "Armador",
  funcao: "Armador de Ferragens",
  salario: 3200.0,
  convencao: "SINDUSCON-SP 2024",
  jornada: "44h semanais",
  escala: "5x2 (Seg-Sex)",
  tipoEfetivo: "Direto",
  statusAtual: "APROVADO",
  dataAdmissao: "2024-01-15",
  setor: "Producao",
  // Checklist de conformidade
  checklist: {
    cadastroBasico: { ok: true, descricao: "Cadastro básico completo" },
    documentacao: { ok: true, descricao: "Documentação obrigatória OK" },
    sst: { ok: true, descricao: "SST (ASO / NRs) OK" },
    aprovacoes: { ok: true, descricao: "Aprovações concluídas" },
    bloqueios: { ok: true, descricao: "Sem bloqueios ativos" },
  },
}

// Colaborador com pendencia para teste
const colaboradorComPendencia = {
  ...colaboradorMock,
  id: "COL-002",
  nome: "Maria Santos",
  statusAtual: "PENDENTE",
  checklist: {
    cadastroBasico: { ok: true, descricao: "Cadastro básico completo" },
    documentacao: {
      ok: false,
      descricao: "Documentação obrigatória OK",
      motivo: "Falta certidão de nascimento",
      link: "/obra/administrativo/rh/colaborador/COL-002?tab=documentacao",
    },
    sst: { ok: true, descricao: "SST (ASO / NRs) OK" },
    aprovacoes: { ok: true, descricao: "Aprovações concluídas" },
    bloqueios: { ok: true, descricao: "Sem bloqueios ativos" },
  },
}

function EfetivacaoContent() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Simular colaborador com ou sem pendencia
  const colaborador = id === "COL-002" ? colaboradorComPendencia : colaboradorMock

  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [observacao, setObservacao] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [efetivado, setEfetivado] = useState(false)
  const [matriculaGerada, setMatriculaGerada] = useState("")
  const [dataEfetivacao, setDataEfetivacao] = useState("")

  // Verificar se todos os itens do checklist estao OK
  const checklistItems = Object.entries(colaborador.checklist)
  const todosOk = checklistItems.every(([_, item]) => item.ok)
  const aptoParaEfetivacao = todosOk && colaborador.statusAtual === "APROVADO"

  const handleEfetivar = () => {
    setShowConfirmDialog(true)
  }

  const confirmarEfetivacao = async () => {
    setIsProcessing(true)

    // Simular processamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Gerar matricula
    const matricula = `MAT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`
    const dataHora = new Date().toLocaleString("pt-BR")

    setMatriculaGerada(matricula)
    setDataEfetivacao(dataHora)
    setEfetivado(true)
    setIsProcessing(false)
    setShowConfirmDialog(false)
  }

  // Tela pos-efetivacao
  if (efetivado) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/obra/administrativo/rh">RH</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/obra/administrativo/rh/colaboradores">Pessoas</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Efetivação</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold mt-2">Efetivação do Colaborador</h1>
        </div>

        {/* Card de sucesso */}
        <Card className="border-green-500 bg-green-500/10">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-500">Colaborador Efetivado com Sucesso!</h2>
                <p className="text-muted-foreground mt-2">
                  {colaborador.nome} foi efetivado e está liberado para operação.
                </p>
              </div>

              {/* Dados da efetivacao */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4 p-4 bg-background rounded-lg border">
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Matrícula Gerada</p>
                  <p className="font-mono font-bold text-lg">{matriculaGerada}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Data/Hora</p>
                  <p className="font-medium">{dataEfetivacao}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Responsável</p>
                  <p className="font-medium">Usuário Atual</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Obra</p>
                  <p className="font-medium">{colaborador.obra}</p>
                </div>
              </div>

              {/* Liberacoes */}
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Liberado para Ponto
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                  <Briefcase className="h-3 w-3 mr-1" />
                  Liberado para Operação
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Liberado para Folha
                </Badge>
              </div>

              {/* Botoes pos-efetivacao */}
              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => router.push(`/obra/administrativo/rh/colaborador/${id}`)}>
                  <User className="h-4 w-4 mr-2" />
                  Abrir Prontuário
                </Button>
                <Button onClick={() => router.push("/obra/administrativo/rh/colaboradores")}>
                  Ir para Lista de Colaboradores
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Auditoria */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Registro de Auditoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Ação</p>
                <p className="font-medium">EFETIVAÇÃO</p>
              </div>
              <div>
                <p className="text-muted-foreground">Usuário</p>
                <p className="font-medium">admin@genesis.com</p>
              </div>
              <div>
                <p className="text-muted-foreground">Data/Hora</p>
                <p className="font-medium">{dataEfetivacao}</p>
              </div>
              <div>
                <p className="text-muted-foreground">IP</p>
                <p className="font-medium">192.168.1.100</p>
              </div>
              <div>
                <p className="text-muted-foreground">Obra</p>
                <p className="font-medium">{colaborador.obra}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Convenção</p>
                <p className="font-medium">{colaborador.convencao}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Salário Efetivado</p>
                <p className="font-medium">
                  R$ {colaborador.salario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Matrícula</p>
                <p className="font-mono font-medium">{matriculaGerada}</p>
              </div>
            </div>
            {observacao && (
              <div className="mt-4 pt-4 border-t">
                <p className="text-muted-foreground text-sm">Observação</p>
                <p className="font-medium">{observacao}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  // Tela principal de efetivacao
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/obra/administrativo/rh">RH</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/obra/administrativo/rh/colaboradores">Pessoas</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Efetivação</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-2xl font-bold mt-2">Efetivação do Colaborador</h1>
        </div>

        {/* Badge de status */}
        {aptoParaEfetivacao ? (
          <Badge className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-sm">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            APTO PARA EFETIVAÇÃO
          </Badge>
        ) : (
          <Badge variant="destructive" className="px-4 py-2 text-sm">
            <XCircle className="h-4 w-4 mr-2" />
            BLOQUEADO PARA EFETIVAÇÃO
          </Badge>
        )}
      </div>

      {/* Botao voltar */}
      <Button variant="ghost" size="sm" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resumo do Colaborador */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Resumo do Colaborador (Conferência)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Nome Completo</p>
                  <p className="font-medium">{colaborador.nome}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">CPF</p>
                  <p className="font-medium font-mono">{colaborador.cpf}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Vínculo</p>
                  <Badge variant="outline">{colaborador.vinculo}</Badge>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Obra / Centro de Custo</p>
                  <p className="font-medium">{colaborador.obra}</p>
                  <p className="text-xs text-muted-foreground">{colaborador.centroCusto}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cargo / Função</p>
                  <p className="font-medium">{colaborador.cargo}</p>
                  <p className="text-xs text-muted-foreground">{colaborador.funcao}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Salário Praticado</p>
                  <p className="font-medium text-green-500">
                    R$ {colaborador.salario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Convenção Aplicada</p>
                  <p className="font-medium">{colaborador.convencao}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Jornada / Escala</p>
                  <p className="font-medium">{colaborador.jornada}</p>
                  <p className="text-xs text-muted-foreground">{colaborador.escala}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tipo de Efetivo</p>
                  <Badge variant="secondary">{colaborador.tipoEfetivo}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checklist de Conformidade */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5" />
                Checklist de Conformidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklistItems.map(([key, item]: [string, any]) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      item.ok ? "bg-green-500/5 border-green-500/20" : "bg-red-500/10 border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.ok ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className={`font-medium ${!item.ok && "text-red-500"}`}>{item.descricao}</p>
                        {!item.ok && item.motivo && <p className="text-sm text-red-400">{item.motivo}</p>}
                      </div>
                    </div>
                    {!item.ok && item.link && (
                      <Button variant="outline" size="sm" onClick={() => router.push(item.link)}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ir para Pendência
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral - Acoes */}
        <div className="space-y-6">
          {/* Card de Acao */}
          <Card className={aptoParaEfetivacao ? "border-green-500/50" : "border-red-500/50"}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Ações de Efetivação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aptoParaEfetivacao ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Este colaborador passou por todas as etapas do workflow e está apto para efetivação.
                  </p>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-amber-500">Atenção</p>
                        <p className="text-muted-foreground">
                          A efetivação é <strong>irreversível</strong>. Após efetivado, o colaborador entrará no
                          headcount, ponto e folha.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-500 hover:bg-green-600" size="lg" onClick={handleEfetivar}>
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    EFETIVAR COLABORADOR
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-sm text-red-400">Este colaborador possui pendências que impedem a efetivação.</p>
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-red-500">Bloqueado</p>
                        <p className="text-muted-foreground">
                          Resolva todas as pendências antes de prosseguir com a efetivação.
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="destructive" size="lg" disabled>
                    <XCircle className="h-5 w-5 mr-2" />
                    EFETIVAÇÃO BLOQUEADA
                  </Button>
                </>
              )}

              <Button variant="outline" className="w-full bg-transparent" onClick={() => router.back()}>
                Cancelar / Voltar
              </Button>
            </CardContent>
          </Card>

          {/* Informacoes importantes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Após Efetivação
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2 text-muted-foreground">
              <p>O colaborador será:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Incluído no headcount da obra</li>
                <li>Liberado para registro de ponto</li>
                <li>Habilitado para eventos de folha</li>
                <li>Vinculado à convenção coletiva</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Confirmacao */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Efetivação</DialogTitle>
            <DialogDescription>
              Esta ação irá gerar matrícula e liberar o colaborador para operação e folha.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="p-3 bg-muted rounded-lg">
              <p className="font-medium">{colaborador.nome}</p>
              <p className="text-sm text-muted-foreground">
                {colaborador.cpf} • {colaborador.cargo}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacao">Observação (opcional)</Label>
              <Textarea
                id="observacao"
                placeholder="Adicione uma observação sobre esta efetivação..."
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} disabled={isProcessing}>
              Cancelar
            </Button>
            <Button className="bg-green-500 hover:bg-green-600" onClick={confirmarEfetivacao} disabled={isProcessing}>
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Confirmar Efetivação
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function EfetivacaoPage() {
  return (
    <Suspense fallback={null}>
      <EfetivacaoContent />
    </Suspense>
  )
}
