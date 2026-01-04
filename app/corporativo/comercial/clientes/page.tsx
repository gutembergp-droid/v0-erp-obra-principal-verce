"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Building2, MoreHorizontal } from "lucide-react"
import { InfoTooltip } from "@/components/ui/info-tooltip"

const clientes = [
  { id: 1, nome: "DNIT", tipo: "Publico", contatos: 5, contratos: 3, status: "Ativo" },
  { id: 2, nome: "SABESP", tipo: "Publico", contatos: 8, contratos: 2, status: "Ativo" },
  { id: 3, nome: "Eletrobras Furnas", tipo: "Misto", contatos: 12, contratos: 4, status: "Ativo" },
  { id: 4, nome: "CCR Rodovias", tipo: "Privado", contatos: 6, contratos: 1, status: "Prospeccao" },
]

export default function ClientesCRMPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Clientes & CRM</h1>
          <InfoTooltip
            title="Gestao de Clientes"
            description="Cadastro de clientes, historico de relacionamento, contatos e oportunidades de negocio."
          />
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{clientes.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Clientes Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">{clientes.filter((c) => c.status === "Ativo").length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Prospeccao</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-500">
              {clientes.filter((c) => c.status === "Prospeccao").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Contratos Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{clientes.reduce((acc, c) => acc + c.contratos, 0)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Clientes</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar cliente..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tipo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contatos</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Contratos</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{cliente.nome}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{cliente.tipo}</td>
                  <td className="py-3 px-4 text-sm">{cliente.contatos}</td>
                  <td className="py-3 px-4 text-sm">{cliente.contratos}</td>
                  <td className="py-3 px-4">
                    <Badge variant={cliente.status === "Ativo" ? "default" : "secondary"}>{cliente.status}</Badge>
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
  )
}
