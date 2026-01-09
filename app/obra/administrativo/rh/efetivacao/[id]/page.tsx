"use client"

import { Suspense, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { RHNav } from "@/components/rh/rh-nav"
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
  funcao: "Armador",
  setor: "Terraplenagem",
  dataAdmissao: "2024-01-15",
  salarioBase: 2500,
  statusWorkflow: "aguardando_aprovacao", // rascunho, docs_pendentes, sst_pendente, aguardando_aprovacao, efetivado, rejeitado
}

// Checklist de documentos
const documentosMock = [
  { id: 1, nome: "RG", status: "ok", obrigatorio: true },
  { id: 2, nome: "CPF", status: "ok", obrigatorio: true },
  { id: 3, nome: "Carteira de Trabalho", status: "ok", obrigatorio: true },
  { id: 4, nome: "Comprovante de Residência", status: "ok", obrigatorio: true },
  { id: 5, nome: "Certidão de Nascimento/Casamento", status: "ok", obrigatorio: true },
  { id: 6, nome: "Titulo de Eleitor", status: "ok", obrigatorio: true },
  { id: 7, nome: "Certificado de Reservista", status: "pendente", obrigatorio: false },
  { id: 8, nome: "Foto 3x4", status: "ok", obrigatorio: true },
]

// Checklist SST
const sstMock = [
  { id: 1, nome: "ASO Admissional", status: "ok", obrigatorio: true, validade: "2025-01-15" },
  { id: 2, nome: "Ficha de EPI", status: "ok", obrigatorio: true },
  { id: 3, nome: "Integração de Segurança", status: "ok", obrigatorio: true, data: "2024-01-10" },
  { id: 4, nome: "NR-35 (Trabalho em Altura)", status: "pendente", obrigatorio: true },
  { id: 5, nome: "NR-18 (Construção Civil)", status: "ok", obrigatorio: true, validade: "2025-06-20" },
]

// Histórico de aprovações
const historicoMock = [
  { data: "2024-01-08 14:30", usuario: "Maria (RH)", acao: "Cadastro criado", obs: "" },
  { data: "2024-01-09 09:15", usuario: "Maria (RH)", acao: "Documentos enviados para validação", obs: "" },
  { data: "2024-01-10 11:00", usuario: "Carlos (SST)", acao: "Integração realizada", obs: "Colaborador apto" },
  {
    data: "2024-01-12 16:45",
    usuario: "Sistema",
    acao: "Pendência identificada",
    obs: "NR-35 obrigatório para função",
  },
]

function EfetivacaoContent() {
  const params = useParams()
  const router = useRouter()
  const [colaborador] = useState(colaboradorMock)
  const [documentos] = useState(documentosMock)
  const [sst] = useState(sstMock)
  const [historico] = useState(historicoMock)

  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [motivoRejeicao, setMotivoRejeicao] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Calcular status
  const docsObrigatoriosOk = documentos.filter((d) => d.obrigatorio).every((d) => d.status === "ok")
  const sstObrigatoriosOk = sst.filter((s) => s.obrigatorio).every((s) => s.status === "ok")
  const podeEfetivar = docsObrigatoriosOk && sstObrigatoriosOk

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ok":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            OK
          </Badge>
        )
      case "pendente":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      case "rejeitado":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejeitado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getWorkflowBadge = (status: string) => {
    switch (status) {
      case "rascunho":
        return <Badge variant="outline">Rascunho</Badge>
      case "docs_pendentes":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Docs Pendentes</Badge>
      case "sst_pendente":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">SST Pendente</Badge>
      case "aguardando_aprovacao":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Aguardando Aprovação</Badge>
      case "efetivado":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Efetivado
          </Badge>
        )
      case "rejeitado":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejeitado
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleAprovar = async () => {
    setIsLoading(true)
    // Simular chamada API
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setShowApproveDialog(false)
    // Redirecionar ou atualizar estado
    alert("Colaborador efetivado com sucesso!")
  }

  const handleRejeitar = async () => {
    if (!motivoRejeicao.trim()) {
      alert("Motivo da rejeição é obrigatório")
      return
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setShowRejectDialog(false)
    setMotivoRejeicao("")
    alert("Efetivação rejeitada")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <RHNav modulo="obra" />

      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/obra/administrativo/rh">RH</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/obra/administrativo/rh/colaboradores">Colaboradores</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Efetivação</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <UserCheck className="h-6 w-6" />
              Efetivação de Colaborador
            </h1>
            <p className="text-muted-foreground">
              {colaborador.nome} - {colaborador.cpf}
            </p>
          </div>
        </div>
        {getWorkflowBadge(colaborador.statusWorkflow)}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <User className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Colaborador</p>
                <p className="font-medium">{colaborador.nome}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <Briefcase className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Função</p>
                <p className="font-medium">{colaborador.funcao}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Salário Base</p>
                <p className="font-medium">R$ {colaborador.salarioBase.toLocaleString("pt-BR")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Admissão</p>
                <p className="font-medium">{new Date(colaborador.dataAdmissao).toLocaleDateString("pt-BR")}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Checklist Documentos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentação
              {docsObrigatoriosOk ? (
                <Badge className="bg-green-500/20 text-green-400 ml-auto">Completo</Badge>
              ) : (
                <Badge className="bg-yellow-500/20 text-yellow-400 ml-auto">Pendente</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documentos.map((doc) => (
                <div
                  key={doc.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    doc.status === "ok" ? "bg-green-500/5 border-green-500/20" : "bg-yellow-500/5 border-yellow-500/20"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{doc.nome}</span>
                    {doc.obrigatorio && (
                      <Badge variant="outline" className="text-xs">
                        Obrigatório
                      </Badge>
                    )}
                  </div>
                  {getStatusBadge(doc.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Checklist SST */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              SST (Saúde e Segurança)
              {sstObrigatoriosOk ? (
                <Badge className="bg-green-500/20 text-green-400 ml-auto">Completo</Badge>
              ) : (
                <Badge className="bg-yellow-500/20 text-yellow-400 ml-auto">Pendente</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sst.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    item.status === "ok" ? "bg-green-500/5 border-green-500/20" : "bg-yellow-500/5 border-yellow-500/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-medium">{item.nome}</span>
                      {item.obrigatorio && (
                        <Badge variant="outline" className="text-xs">
                          Obrigatório
                        </Badge>
                      )}
                    </div>
                    {item.validade && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Validade: {new Date(item.validade).toLocaleDateString("pt-BR")}
                      </p>
                    )}
                  </div>
                  {getStatusBadge(item.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Histórico */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Histórico do Processo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historico.map((item, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="w-32 flex-shrink-0 text-sm text-muted-foreground">{item.data}</div>
                <div className="flex-1">
                  <p className="font-medium">{item.acao}</p>
                  <p className="text-sm text-muted-foreground">{item.usuario}</p>
                  {item.obs && <p className="text-sm text-muted-foreground mt-1 italic">{item.obs}</p>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ações */}
      {colaborador.statusWorkflow === "aguardando_aprovacao" && (
        <Card className="border-primary/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  Decisão de Efetivação
                </h3>
                <p className="text-muted-foreground mt-1">
                  {podeEfetivar
                    ? "Todos os requisitos foram atendidos. O colaborador pode ser efetivado."
                    : "Existem pendências que impedem a efetivação."}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setShowRejectDialog(true)}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Rejeitar
                </Button>
                <Button disabled={!podeEfetivar} onClick={() => setShowApproveDialog(true)}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Aprovar Efetivação
                </Button>
              </div>
            </div>

            {!podeEfetivar && (
              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="font-medium">Pendências identificadas:</span>
                </div>
                <ul className="mt-2 text-sm text-yellow-600 list-disc list-inside">
                  {!docsObrigatoriosOk && <li>Documentação incompleta</li>}
                  {!sstObrigatoriosOk && <li>SST incompleto (verificar NRs obrigatórias)</li>}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialog Aprovar */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Efetivação</DialogTitle>
            <DialogDescription>
              Você está prestes a efetivar o colaborador <strong>{colaborador.nome}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Função:</span>
                <span className="font-medium">{colaborador.funcao}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Setor:</span>
                <span className="font-medium">{colaborador.setor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Salário:</span>
                <span className="font-medium">R$ {colaborador.salarioBase.toLocaleString("pt-BR")}</span>
              </div>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-700">
                Ao confirmar, o colaborador será efetivado e poderá iniciar suas atividades na obra.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button onClick={handleAprovar} disabled={isLoading}>
              {isLoading ? (
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

      {/* Dialog Rejeitar */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar Efetivação</DialogTitle>
            <DialogDescription>
              Informe o motivo da rejeição da efetivação de <strong>{colaborador.nome}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <Label htmlFor="motivo">Motivo da Rejeição *</Label>
              <Textarea
                id="motivo"
                placeholder="Descreva o motivo da rejeição..."
                value={motivoRejeicao}
                onChange={(e) => setMotivoRejeicao(e.target.value)}
                className="mt-2"
                rows={4}
              />
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-700">
                Ao rejeitar, o processo voltará para correção e uma notificação será enviada ao responsável.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)} disabled={isLoading}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleRejeitar} disabled={isLoading || !motivoRejeicao.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Confirmar Rejeição
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
