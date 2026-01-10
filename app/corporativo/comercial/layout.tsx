import type React from "react"
import { ComercialProvider } from "@/contexts/comercial-context"

export default function ComercialCorporativoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ComercialProvider>
      {children}
    </ComercialProvider>
  )
}
