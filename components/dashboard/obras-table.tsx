import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const obras = [
  {
    id: "OBR-001",
    nome: "Edifício Residencial Aurora",
    cliente: "Construtora ABC",
    status: "em_andamento",
    progresso: 65,
    valor: "R$ 2.500.000",
    prazo: "15/06/2026",
  },
  {
    id: "OBR-002",
    nome: "Reforma Comercial Centro",
    cliente: "Shopping Center Ltda",
    status: "em_andamento",
    progresso: 40,
    valor: "R$ 850.000",
    prazo: "20/03/2026",
  },
  {
    id: "OBR-003",
    nome: "Condomínio Park View",
    cliente: "Incorporadora XYZ",
    status: "planejamento",
    progresso: 10,
    valor: "R$ 4.200.000",
    prazo: "01/12/2026",
  },
  {
    id: "OBR-004",
    nome: "Galpão Industrial Norte",
    cliente: "Indústrias Silva",
    status: "concluida",
    progresso: 100,
    valor: "R$ 1.800.000",
    prazo: "10/01/2026",
  },
  {
    id: "OBR-005",
    nome: "Casa Alto Padrão Jardins",
    cliente: "Cliente Particular",
    status: "pausada",
    progresso: 30,
    valor: "R$ 1.200.000",
    prazo: "30/08/2026",
  },
]

const statusConfig = {
  em_andamento: { label: "Em Andamento", variant: "default" as const },
  planejamento: { label: "Planejamento", variant: "secondary" as const },
  concluida: { label: "Concluída", variant: "outline" as const },
  pausada: { label: "Pausada", variant: "destructive" as const },
}

export function ObrasTable() {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nome da Obra</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progresso</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Prazo</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {obras.map((obra) => (
            <TableRow key={obra.id}>
              <TableCell className="font-medium">{obra.id}</TableCell>
              <TableCell>{obra.nome}</TableCell>
              <TableCell className="text-muted-foreground">{obra.cliente}</TableCell>
              <TableCell>
                <Badge variant={statusConfig[obra.status].variant}>{statusConfig[obra.status].label}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${obra.progresso}%` }} />
                  </div>
                  <span className="text-sm text-muted-foreground">{obra.progresso}%</span>
                </div>
              </TableCell>
              <TableCell>{obra.valor}</TableCell>
              <TableCell className="text-muted-foreground">{obra.prazo}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
