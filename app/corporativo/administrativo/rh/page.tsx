"use client"

import { useState, Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { RHNav } from "@/components/rh/rh-nav"
import {
  LayoutDashboard,
  Users,
  Clock,
  DollarSign,
  HardHat,
  ShieldAlert,
  BarChart3,
  FileText,
  FileCheck,
  Gavel,
} from "lucide-react"

// Importar os componentes de cada tab (vamos criar componentes separados)
import { VisaoGeralTab } from "@/components/rh/tabs/visao-geral-tab"
import { PessoasTab } from "@/components/rh/tabs/pessoas-tab"
import { PontoTab } from "@/components/rh/tabs/ponto-tab"
import { PagamentoTab } from "@/components/rh/tabs/pagamento-tab"
import { TerceirizadosTab } from "@/components/rh/tabs/terceirizados-tab"
import { ConformidadeTab } from "@/components/rh/tabs/conformidade-tab"
import { AnalyticsTab } from "@/components/rh/tabs/analytics-tab"
import { PreviaFolhaTab } from "@/components/rh/tabs/previa-folha-tab"
import { ConsolidacaoTab } from "@/components/rh/tabs/consolidacao-tab"
import { ConvencoesTab } from "@/components/rh/tabs/convencoes-tab"

function RHCorporativoContent() {
  const [activeTab, setActiveTab] = useState("visao-geral")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navegação RH fixa no topo */}
      <RHNav modulo="corporativo" />

      {/* Container principal com tabs fixas */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          {/* Tabs fixas horizontais */}
          <div className="border-b bg-background sticky top-0 z-10">
            <ScrollArea className="w-full">
              <TabsList className="inline-flex h-12 w-full items-center justify-start rounded-none border-b-0 bg-transparent p-0">
                <TabsTrigger
                  value="visao-geral"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Visão Geral
                </TabsTrigger>
                <TabsTrigger
                  value="pessoas"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Pessoas
                </TabsTrigger>
                <TabsTrigger
                  value="ponto"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Ponto
                </TabsTrigger>
                <TabsTrigger
                  value="pagamento"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Pagamento
                </TabsTrigger>
                <TabsTrigger
                  value="terceirizados"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <HardHat className="mr-2 h-4 w-4" />
                  Terceirizados
                </TabsTrigger>
                <TabsTrigger
                  value="conformidade"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Conformidade
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </TabsTrigger>
                <TabsTrigger
                  value="previa-folha"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Prévia de Folha
                </TabsTrigger>
                <TabsTrigger
                  value="consolidacao"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Consolidação
                </TabsTrigger>
                <TabsTrigger
                  value="convencoes"
                  className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-3 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <Gavel className="mr-2 h-4 w-4" />
                  Convenções
                </TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          {/* Conteúdo das tabs */}
          <div className="flex-1 container py-6">
            <TabsContent value="visao-geral" className="mt-0">
              <VisaoGeralTab />
            </TabsContent>
            <TabsContent value="pessoas" className="mt-0">
              <PessoasTab />
            </TabsContent>
            <TabsContent value="ponto" className="mt-0">
              <PontoTab />
            </TabsContent>
            <TabsContent value="pagamento" className="mt-0">
              <PagamentoTab />
            </TabsContent>
            <TabsContent value="terceirizados" className="mt-0">
              <TerceirizadosTab />
            </TabsContent>
            <TabsContent value="conformidade" className="mt-0">
              <ConformidadeTab />
            </TabsContent>
            <TabsContent value="analytics" className="mt-0">
              <AnalyticsTab />
            </TabsContent>
            <TabsContent value="previa-folha" className="mt-0">
              <PreviaFolhaTab />
            </TabsContent>
            <TabsContent value="consolidacao" className="mt-0">
              <ConsolidacaoTab />
            </TabsContent>
            <TabsContent value="convencoes" className="mt-0">
              <ConvencoesTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

export default function RHCorporativoPage() {
  return (
    <Suspense fallback={<div className="p-6">Carregando...</div>}>
      <RHCorporativoContent />
    </Suspense>
  )
}
