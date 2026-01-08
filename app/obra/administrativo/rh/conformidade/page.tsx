"use client"

import { useState, Suspense } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { RHNav } from "@/components/rh/rh-nav"
import { ShieldCheck, FileText, Stethoscope, GraduationCap, Download, CheckCircle2, Scale } from "lucide-react"

// ============================================
// DADOS MOCKADOS
// ============================================

const documentosMock = [
  { id: 1, colaborador: "Jose Silva Santos", documento: "RG", status: "Valido", vencimento: null },
  { id: 2, colaborador: "Jose Silva Santos", documento: "CNH", status: "Vencendo", vencimento: "2026-01-15" },
  { id: 3, colaborador: "Maria Aparecida Costa", documento: "CREA", status: "Valido", vencimento: "2027-06-20" },
  { id: 4, colaborador: "Roberto Alves Souza", documento: "RG", status: "Pendente", vencimento: null },
  { id: 5, colaborador: "Carlos Eduardo Lima", documento: "Contrato PJ", status: "Valido", vencimento: "2026-12-31" },
]

const asoMock = [
  {
    id: 1,
    colaborador: "Jose Silva Santos",
    tipo: "Periodico",
    data: "2025-07-15",
    validade: "2026-07-15",
    status: "Valido",
  },
  {
    id: 2,
    colaborador: "Maria Aparecida Costa",
    tipo: "Periodico",
    data: "2025-08-20",
    validade: "2026-08-20",
    status: "Valido",
  },
  { id: 3, colaborador: "Roberto Alves Souza", tipo: "Admissional", data: null, validade: null, status: "Pendente" },
  {
    id: 4,
    colaborador: "Paulo Mendes",
    tipo: "Periodico",
    data: "2025-01-10",
    validade: "2026-01-10",
    status: "Vencendo",
  },
]

const nrsMock = [
  {
    id: 1,
    colaborador: "Jose Silva Santos",
    nr: "NR-35",
    descricao: "Trabalho em Altura",
    validade: "2026-06-15",
    status: "Valido",
  },
  {
    id: 2,
    colaborador: "Jose Silva Santos",
    nr: "NR-18",
    descricao: "Seguranca na Construcao",
    validade: "2026-03-10",
    status: "Valido",
  },
  {
    id: 3,
    colaborador: "Paulo Mendes",
    nr: "NR-10",
    descricao: "Seguranca em Eletricidade",
    validade: "2026-02-01",
    status: "Vencendo",
  },
  {
    id: 4,
    colaborador: "Roberto Alves Souza",
    nr: "NR-35",
    descricao: "Trabalho em Altura",
    validade: null,
    status: "Pendente",
  },
]

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

function ConformidadeContent() {
  const [activeTab, setActiveTab] = useState("documentos")

  const emConformidade = 280
  const pendenciasDoc = 12
  const sstPendente = 8
  const riscoJuridico = 3

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Valido":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Valido</Badge>
      case "Vencendo":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Vencendo</Badge>
      case "Pendente":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Pendente</Badge>
      case "Vencido":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Vencido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <RHNav modulo="obra" />

      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Conformidade</h1>
              <p className="text-sm text-muted-foreground">Documentos, ASO, NRs e Treinamentos</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-green-500/10 border-green-500/30">
            <CardContent className="p-4 text-center">
              <CheckCircle2 className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{emConformidade}</p>
              <p className="text-xs text-green-400">Em Conformidade</p>
            </CardContent>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30">
            <CardContent className="p-4 text-center">
              <FileText className="h-5 w-5 mx-auto mb-1 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{pendenciasDoc}</p>
              <p className="text-xs text-yellow-400">Pend. Documentais</p>
            </CardContent>
          </Card>
          <Card className="bg-red-500/10 border-red-500/30">
            <CardContent className="p-4 text-center">
              <Stethoscope className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{sstPendente}</p>
              <p className="text-xs text-red-400">SST Pendente</p>
            </CardContent>
          </Card>
          <Card className="bg-orange-500/10 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <Scale className="h-5 w-5 mx-auto mb-1 text-orange-500" />
              <p className="text-2xl font-bold text-orange-500">{riscoJuridico}</p>
              <p className="text-xs text-orange-400">Risco Juridico</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Conteudo */}
        <Card>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b px-4">
                <TabsList className="h-12 bg-transparent">
                  <TabsTrigger value="documentos" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Documentos
                  </TabsTrigger>
                  <TabsTrigger value="aso" className="gap-2">
                    <Stethoscope className="h-4 w-4" />
                    ASO
                  </TabsTrigger>
                  <TabsTrigger value="nrs" className="gap-2">
                    <GraduationCap className="h-4 w-4" />
                    NRs / Treinamentos
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="documentos" className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Vencimento</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documentosMock.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.colaborador}</TableCell>
                        <TableCell>{doc.documento}</TableCell>
                        <TableCell>{doc.vencimento || "-"}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="aso" className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asoMock.map((aso) => (
                      <TableRow key={aso.id}>
                        <TableCell className="font-medium">{aso.colaborador}</TableCell>
                        <TableCell>{aso.tipo}</TableCell>
                        <TableCell>{aso.data || "-"}</TableCell>
                        <TableCell>{aso.validade || "-"}</TableCell>
                        <TableCell>{getStatusBadge(aso.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="nrs" className="p-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Colaborador</TableHead>
                      <TableHead>NR</TableHead>
                      <TableHead>Descricao</TableHead>
                      <TableHead>Validade</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {nrsMock.map((nr) => (
                      <TableRow key={nr.id}>
                        <TableCell className="font-medium">{nr.colaborador}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{nr.nr}</Badge>
                        </TableCell>
                        <TableCell>{nr.descricao}</TableCell>
                        <TableCell>{nr.validade || "-"}</TableCell>
                        <TableCell>{getStatusBadge(nr.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ConformidadePage() {
  return (
    <Suspense fallback={null}>
      <ConformidadeContent />
    </Suspense>
  )
}
