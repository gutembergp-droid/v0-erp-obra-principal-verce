"use client"

import { useState } from "react"
import { useCicloEstrategico } from "@/contexts/ciclo-estrategico-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Send,
  FileCheck,
  Lock,
  Rocket,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { toast } from "sonner"
import type { CicloEstrategico, StatusCiclo } from "@/lib/types/planejamento"

interface AcoesCicloCardProps {
  ciclo: CicloEstrategico
  onUpdate?: () => void
}

export function AcoesCicloCard({ ciclo, onUpdate }: AcoesCicloCardProps) {
  const {
    enviarParaRevisao,
    consolidarCiclo,
    homologarCiclo,
    desdobrarCiclo,
    voltarParaRascunho,
  } = useCicloEstrategico()

  const [dialogAberto, setDialogAberto] = useState(false)
  const [acaoSelecionada, setAcaoSelecionada] = useState<string | null>(null)

  const getStatusInfo = (status: StatusCiclo) => {
    const statusMap = {
      rascunho: { label: "Rascunho", color: "bg-gray-500", description: "Em elaboração inicial" },
      em_revisao: { label: "Em Revisão", color: "bg-blue-500", description: "Sendo revisado pela equipe" },
      consolidado: { label: "Consolidado", color: "bg-purple-500", description: "Pronto para homologação" },
      homologado: { label: "Homologado", color: "bg-green-600", description: "Oficialmente aprovado" },
      em_execucao: { label: "Em Execução", color: "bg-emerald-500", description: "Desdobrado e ativo" },
      encerrado: { label: "Encerrado", color: "bg-gray-700", description: "Ciclo finalizado" },
    }
    return statusMap[status] || statusMap.rascunho
  }

  const statusInfo = getStatusInfo(ciclo.status)

  const confirmarAcao = (acao: string, handler: () => boolean) => {
    setAcaoSelecionada(acao)
    setDialogAberto(true)
  }

  const executarAcao = () => {
    let sucesso = false
    let mensagem = ""

    switch (acaoSelecionada) {
      case "enviar_revisao":
        sucesso = enviarParaRevisao(ciclo.id)
        mensagem = "Ciclo enviado para revisão!"
        break
      case "consolidar":
        sucesso = consolidarCiclo(ciclo.id)
        mensagem = "Ciclo consolidado! Aguardando homologação."
        break
      case "homologar":
        sucesso = homologarCiclo(ciclo.id, {
          id: "usr-001",
          nome: "Usuário Atual",
          cargo: "Diretor",
        })
        mensagem = "Ciclo homologado! 🔒 Agora está oficialmente aprovado."
        break
      case "desdobrar":
        sucesso = desdobrarCiclo(ciclo.id)
        mensagem = "Ciclo desdobrado! 🚀 Estrutura departamental criada."
        break
      case "voltar_rascunho":
        sucesso = voltarParaRascunho(ciclo.id)
        mensagem = "Ciclo retornou para rascunho."
        break
    }

    if (sucesso) {
      toast.success("Ação executada!", { description: mensagem })
      onUpdate?.()
    } else {
      toast.error("Erro ao executar ação", {
        description: "Verifique o estado do ciclo e tente novamente",
      })
    }

    setDialogAberto(false)
    setAcaoSelecionada(null)
  }

  const getAcoesDisponiveis = () => {
    const acoes: Array<{
      id: string
      label: string
      icon: any
      variant: "default" | "outline" | "secondary"
      description: string
    }> = []

    if (ciclo.status === "rascunho") {
      acoes.push({
        id: "enviar_revisao",
        label: "Enviar para Revisão",
        icon: Send,
        variant: "default",
        description: "Enviar o planejamento para revisão da equipe",
      })
    }

    if (ciclo.status === "em_revisao") {
      acoes.push({
        id: "consolidar",
        label: "Consolidar",
        icon: FileCheck,
        variant: "default",
        description: "Marcar como consolidado e preparar para homologação",
      })
      acoes.push({
        id: "voltar_rascunho",
        label: "Voltar para Rascunho",
        icon: ArrowLeft,
        variant: "outline",
        description: "Retornar para modo de edição",
      })
    }

    if (ciclo.status === "consolidado") {
      acoes.push({
        id: "homologar",
        label: "Homologar Planejamento",
        icon: Lock,
        variant: "default",
        description: "Aprovar oficialmente e travar o planejamento",
      })
      acoes.push({
        id: "voltar_rascunho",
        label: "Voltar para Rascunho",
        icon: ArrowLeft,
        variant: "outline",
        description: "Retornar para modo de edição",
      })
    }

    if (ciclo.status === "homologado") {
      acoes.push({
        id: "desdobrar",
        label: "Desdobrar para Departamentos",
        icon: Rocket,
        variant: "default",
        description: "Criar estrutura departamental e iniciar execução",
      })
    }

    return acoes
  }

  const acoesDisponiveis = getAcoesDisponiveis()

  if (acoesDisponiveis.length === 0) {
    return null
  }

  const getDialogContent = () => {
    switch (acaoSelecionada) {
      case "enviar_revisao":
        return {
          title: "Enviar para Revisão?",
          description:
            "O planejamento será enviado para revisão da equipe. Você ainda poderá fazer ajustes se necessário.",
          icon: Send,
          color: "text-blue-600",
        }
      case "consolidar":
        return {
          title: "Consolidar Planejamento?",
          description:
            "O planejamento será marcado como consolidado e aguardará homologação. Não será mais editável após esta ação.",
          icon: FileCheck,
          color: "text-purple-600",
        }
      case "homologar":
        return {
          title: "Homologar Planejamento?",
          description:
            "⚠️ ATENÇÃO: O planejamento será TRAVADO e oficialmente aprovado. Esta ação não pode ser desfeita. Após homologação, o planejamento estará pronto para desdobramento.",
          icon: Lock,
          color: "text-green-600",
        }
      case "desdobrar":
        return {
          title: "Desdobrar para Departamentos?",
          description:
            "O planejamento será desdobrado para todos os departamentos e radiado para o calendário corporativo. A execução será iniciada.",
          icon: Rocket,
          color: "text-emerald-600",
        }
      case "voltar_rascunho":
        return {
          title: "Voltar para Rascunho?",
          description: "O planejamento voltará para modo de edição. Você poderá fazer alterações novamente.",
          icon: ArrowLeft,
          color: "text-gray-600",
        }
      default:
        return {
          title: "Confirmar Ação",
          description: "Deseja realmente executar esta ação?",
          icon: CheckCircle2,
          color: "text-gray-600",
        }
    }
  }

  const dialogContent = getDialogContent()
  const DialogIcon = dialogContent.icon

  return (
    <>
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                Ações do Ciclo
              </CardTitle>
              <CardDescription className="mt-1">Gerencie o estado do planejamento</CardDescription>
            </div>
            <Badge className={`${statusInfo.color} text-white`}>{statusInfo.label}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <AlertTriangle className="h-4 w-4" />
              <span>{statusInfo.description}</span>
            </div>

            {acoesDisponiveis.map((acao) => {
              const Icon = acao.icon
              return (
                <Button
                  key={acao.id}
                  variant={acao.variant}
                  className="w-full justify-start gap-2"
                  onClick={() => confirmarAcao(acao.id, () => true)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{acao.label}</span>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Confirmação */}
      <AlertDialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg bg-muted`}>
                <DialogIcon className={`h-6 w-6 ${dialogContent.color}`} />
              </div>
              <AlertDialogTitle>{dialogContent.title}</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-base">
              {dialogContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={executarAcao}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
