import type React from "react"

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Layout proprio do Console - sem a sidebar padrao do ERP
  return <>{children}</>
}
