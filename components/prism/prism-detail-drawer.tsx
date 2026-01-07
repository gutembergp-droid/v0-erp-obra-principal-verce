"use client"

import { cn } from "@/lib/utils"
import { type PrismResult, type FaceResult, type PrismStatus, FACE_LABELS, DECISION_LABELS } from "@/lib/prism/types"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, CheckCircle2, AlertCircle, HelpCircle, Info } from "lucide-react"

interface PrismDetailDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  result: PrismResult
  title?: string
}

const statusConfig: Record<
  PrismStatus,
  {
    icon: typeof CheckCircle2
    bgClass: string
    textClass: string
    label: string
  }
> = {
  GREEN: {
    icon: CheckCircle2,
    bgClass: "bg-emerald-100 dark:bg-emerald-950/50",
    textClass: "text-emerald-700 dark:text-emerald-400",
    label: "Aprovado",
  },
  YELLOW: {
    icon: AlertTriangle,
    bgClass: "bg-amber-100 dark:bg-amber-950/50",
    textClass: "text-amber-700 dark:text-amber-400",
    label: "Atencao",
  },
  RED: {
    icon: AlertCircle,
    bgClass: "bg-red-100 dark:bg-red-950/50",
    textClass: "text-red-700 dark:text-red-400",
    label: "Critico",
  },
  NEUTRAL: {
    icon: HelpCircle,
    bgClass: "bg-muted/50",
    textClass: "text-muted-foreground",
    label: "Sem dados",
  },
}

function StatusBadge({ status }: { status: PrismStatus }) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
        config.bgClass,
        config.textClass,
      )}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

function FaceRow({ face }: { face: FaceResult }) {
  return (
    <tr className="border-b border-border/50 last:border-0">
      <td className="py-2 pr-2">
        <span className="text-sm font-medium">{FACE_LABELS[face.face]}</span>
      </td>
      <td className="py-2 px-2">
        <StatusBadge status={face.status} />
      </td>
      <td className="py-2 px-2 text-sm text-muted-foreground">{face.metricLabel || "-"}</td>
      <td className="py-2 px-2 text-sm text-muted-foreground hidden md:table-cell">
        {face.thresholdYellow !== undefined && face.thresholdRed !== undefined
          ? `${(face.thresholdYellow * 100).toFixed(0)}% / ${(face.thresholdRed * 100).toFixed(0)}%`
          : "-"}
      </td>
      <td className="py-2 pl-2 text-sm text-muted-foreground hidden lg:table-cell">{face.reasonDetail || "-"}</td>
    </tr>
  )
}

export function PrismDetailDrawer({
  open,
  onOpenChange,
  result,
  title = "Analise Prismatica",
}: PrismDetailDrawerProps) {
  const globalConfig = statusConfig[result.globalStatus]
  const GlobalIcon = globalConfig.icon

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl md:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <GlobalIcon className={cn("w-5 h-5", globalConfig.textClass)} />
            {title}
          </SheetTitle>
          <SheetDescription>O custo so e aceitavel se respeitar todos os tetos simultaneamente.</SheetDescription>
        </SheetHeader>

        {/* Header Global */}
        <div className={cn("p-3 rounded-lg mb-4 flex items-center justify-between", globalConfig.bgClass)}>
          <div className="flex items-center gap-3">
            <StatusBadge status={result.globalStatus} />
            <span className="text-sm font-medium">{DECISION_LABELS[result.decisionState]}</span>
          </div>
          <span className="text-sm text-muted-foreground">{result.pressureText}</span>
        </div>

        {/* Alert para status RED */}
        {result.globalStatus === "RED" && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Teto(s) Violado(s)</AlertTitle>
            <AlertDescription>
              Ha teto(s) violado(s). Nesta fase e apenas exibicao; nao altera fluxos existentes.
            </AlertDescription>
          </Alert>
        )}

        {/* Tabela de Faces */}
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Face</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">Metrica</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground hidden md:table-cell">
                  Limites
                </th>
                <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground hidden lg:table-cell">
                  Motivo
                </th>
              </tr>
            </thead>
            <tbody>
              {result.faces.map((face) => (
                <FaceRow key={face.face} face={face} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Legenda */}
        <div className="mt-4 p-3 rounded-lg bg-muted/30 border">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">Legenda das 9 Faces</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div>
              <strong>Orcamento:</strong> Comprometido vs Orcado
            </div>
            <div>
              <strong>Contrato:</strong> Comprometido vs Limite
            </div>
            <div>
              <strong>Executado:</strong> Executado vs Orcado
            </div>
            <div>
              <strong>EAC:</strong> Projecao Final vs Orcado
            </div>
            <div>
              <strong>Tecnico:</strong> Conformidade Tecnica
            </div>
            <div>
              <strong>Produtividade:</strong> Real vs Planejado
            </div>
            <div>
              <strong>Prazo:</strong> Impacto Caminho Critico
            </div>
            <div>
              <strong>Risco:</strong> Score de Risco
            </div>
            <div>
              <strong>Alcada:</strong> Nivel de Aprovacao
            </div>
          </div>
        </div>

        {/* Timestamp */}
        <p className="mt-4 text-xs text-muted-foreground text-right">
          Atualizado em: {new Date(result.updatedAt).toLocaleString("pt-BR")}
        </p>
      </SheetContent>
    </Sheet>
  )
}
