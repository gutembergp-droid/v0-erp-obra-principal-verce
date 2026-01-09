import type React from "react"

export default function ComercialCorporativoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout proprio do Comercial Corporativo - sem a sidebar padrao do ERP
  return <>{children}</>
}
