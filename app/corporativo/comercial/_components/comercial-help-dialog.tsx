"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { HelpCircle, CheckCircle2, XCircle, AlertTriangle, Lightbulb, BookOpen } from "lucide-react"

export function ComercialHelpDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
          <HelpCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Central de Ajuda - Módulo Comercial</DialogTitle>
          <DialogDescription>Guias, tutoriais e boas práticas para o módulo comercial</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="propostas">Propostas</TabsTrigger>
            <TabsTrigger value="clientes">Clientes</TabsTrigger>
            <TabsTrigger value="contratos">Contratos</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px] mt-4">
            {/* VISÃO GERAL */}
            <TabsContent value="geral" className="space-y-4">
              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">O que é o Módulo Comercial?</h3>
                    <p className="text-sm text-muted-foreground">
                      O módulo comercial é o coração da captação de negócios e gestão de relacionamento com clientes.
                      Ele permite gerenciar todo o ciclo de vendas, desde a prospecção inicial até a assinatura do
                      contrato.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Principais Funcionalidades</h3>
                    <ul className="text-sm text-muted-foreground space-y-1.5 list-disc list-inside">
                      <li>Gestão de propostas com funil de vendas (Kanban)</li>
                      <li>CRM completo para gestão de clientes e interações</li>
                      <li>Contratos com aditivos e documentos</li>
                      <li>Portfólio de obras em execução</li>
                      <li>Analytics e dashboards</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Fluxo Recomendado</h3>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Cadastre seus clientes no CRM</li>
                      <li>Crie propostas vinculadas aos clientes</li>
                      <li>Mova as propostas pelo funil conforme avançam</li>
                      <li>Quando aprovada, converta a proposta em contrato</li>
                      <li>Gerencie aditivos e documentos do contrato</li>
                    </ol>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* PROPOSTAS */}
            <TabsContent value="propostas" className="space-y-4">
              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Como criar uma proposta?</h3>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Clique no botão "Nova Proposta"</li>
                      <li>Preencha os campos obrigatórios (título, cliente, valor)</li>
                      <li>Defina a probabilidade de fechamento (0-100%)</li>
                      <li>Escolha o estágio inicial no funil</li>
                      <li>Adicione observações relevantes</li>
                    </ol>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Estágios do Funil</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="font-medium">Prospecção</p>
                        <p className="text-muted-foreground">Identificação inicial de oportunidades</p>
                      </div>
                      <div>
                        <p className="font-medium">Qualificação</p>
                        <p className="text-muted-foreground">Validação da viabilidade técnica e financeira</p>
                      </div>
                      <div>
                        <p className="font-medium">Proposta</p>
                        <p className="text-muted-foreground">Proposta formal enviada ao cliente</p>
                      </div>
                      <div>
                        <p className="font-medium">Negociação</p>
                        <p className="text-muted-foreground">Ajustes e discussões finais</p>
                      </div>
                      <div>
                        <p className="font-medium">Fechamento</p>
                        <p className="text-muted-foreground">Proposta aceita, aguardando assinatura</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-emerald-50 border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-emerald-900">Boas Práticas</h3>
                    <ul className="text-sm text-emerald-700 space-y-1 list-disc list-inside">
                      <li>Atualize a probabilidade conforme a proposta avança</li>
                      <li>Documente todas as interações no histórico</li>
                      <li>Defina prazos claros para cada estágio</li>
                      <li>Revise regularmente propostas paradas</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-red-50 border-red-200">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-red-900">Erros Comuns</h3>
                    <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                      <li>Não atualizar o estágio da proposta</li>
                      <li>Probabilidade não reflete a realidade</li>
                      <li>Falta de documentação das interações</li>
                      <li>Proposta sem responsável definido</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* CLIENTES */}
            <TabsContent value="clientes" className="space-y-4">
              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Como cadastrar um cliente?</h3>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Clique em "Novo Cliente"</li>
                      <li>Preencha nome, CNPJ e segmento</li>
                      <li>Adicione pelo menos um contato</li>
                      <li>Classifique o porte (Grande, Médio, Pequeno)</li>
                      <li>Defina o status (Ativo, Prospect, Inativo)</li>
                    </ol>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Gestão de Interações</h3>
                    <p className="text-sm text-muted-foreground">
                      Registre todas as interações com seus clientes para manter um histórico completo:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Reuniões e visitas técnicas</li>
                      <li>Ligações e e-mails importantes</li>
                      <li>Propostas enviadas</li>
                      <li>Follow-ups e acompanhamentos</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-emerald-50 border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-emerald-900">Dicas de CRM</h3>
                    <ul className="text-sm text-emerald-700 space-y-1 list-disc list-inside">
                      <li>Mantenha os dados de contato sempre atualizados</li>
                      <li>Use as tags para segmentar clientes</li>
                      <li>Favorite clientes estratégicos</li>
                      <li>Agende follow-ups regularmente</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* CONTRATOS */}
            <TabsContent value="contratos" className="space-y-4">
              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Como cadastrar um contrato?</h3>
                    <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                      <li>Clique em "Novo Contrato"</li>
                      <li>Vincule a um cliente existente</li>
                      <li>Preencha o objeto do contrato</li>
                      <li>Defina valores, prazos e garantias</li>
                      <li>Escolha o tipo e modalidade</li>
                      <li>Anexe documentos relevantes</li>
                    </ol>
                  </div>
                </div>
              </Card>

              <Card className="p-4 border">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Gestão de Aditivos</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Aditivos contratuais devem ser registrados com atenção:
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                      <li>Sempre justifique o aditivo</li>
                      <li>Registre a data de assinatura</li>
                      <li>Atualize o valor total do contrato</li>
                      <li>Anexe o termo aditivo assinado</li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-emerald-50 border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-emerald-900">Tipos de Aditivo</h3>
                    <div className="space-y-2 text-sm text-emerald-700">
                      <div>
                        <p className="font-medium">Prazo</p>
                        <p>Extensão do período de execução do contrato</p>
                      </div>
                      <div>
                        <p className="font-medium">Valor</p>
                        <p>Alteração do valor contratual (acréscimo ou supressão)</p>
                      </div>
                      <div>
                        <p className="font-medium">Escopo</p>
                        <p>Mudanças no objeto ou especificações do contrato</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-amber-900">Alertas Importantes</h3>
                    <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                      <li>Monitore a data de vigência do contrato</li>
                      <li>Controle o limite de aditivos permitido (25% do valor original)</li>
                      <li>Mantenha garantias contratuais atualizadas</li>
                      <li>Acompanhe reajustes periódicos</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
