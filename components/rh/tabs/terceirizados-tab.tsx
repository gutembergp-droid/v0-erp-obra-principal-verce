"use client"

import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export function TerceirizadosTab() {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Gestão de Terceirizados</h3>
            <p className="text-muted-foreground">
              O conteúdo completo está disponível na página dedicada.
              Esta página possui controle avançado de empresas terceirizadas, pessoas alocadas, documentação e riscos.
            </p>
            <Link href="/corporativo/administrativo/rh/terceirizados">
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Acessar Página Completa
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
