"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Upload, FileText, MoreHorizontal } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"
import { useState } from "react"

const contratos = [
  { id: "CT-2024/001", cliente: "DNIT", objeto: "Duplicacao BR-101 - Lote 3", valor: 450000000, status: "Ativo" },
  { id: "CT-2024/002", cliente: "SABESP", objeto: "Sistema Esgotamento Sanitario", valor: 180000000, status: "Ativo" },
  {
    id: "CT-2023/089",
    cliente: "Eletrobras Furnas",
    objeto: "UHE Belo Monte - Complementares",
    valor: 890000000,
    status: "Ativo",
  },
]

export default function ContratosOrcamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Contratos & Orcamentos</h1>
            <InfoTooltip
              title="Compor 90"
              description="Gestao de contratos, upload de planilhas Compor 90, orcamentos e propostas comerciais."
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Import Compor 90
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Novo Contrato
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Contratos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{contratos.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">
                R$ {(contratos.reduce((acc, c) => acc + c.valor, 0) / 1000000).toFixed(0)} Mi
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Compor 90 Importados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">3</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pendentes Orcamento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">2</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Lista de Contratos</CardTitle>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contrato..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Numero</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Objeto</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {contratos
                  .filter(
                    (c) =>
                      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      c.cliente.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((contrato) => (
                    <tr key={contrato.id} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="font-mono text-sm">{contrato.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{contrato.cliente}</td>
                      <td className="py-3 px-4 text-sm max-w-xs truncate">{contrato.objeto}</td>
                      <td className="py-3 px-4 text-sm font-medium text-primary">
                        R$ {(contrato.valor / 1000000).toFixed(0)} Mi
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="default">{contrato.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
