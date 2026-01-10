"use client"

import type React from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden w-full">
        <Topbar />
        <main className="flex-1 min-h-0 min-w-0 p-2 sm:p-3 md:p-4 bg-background flex flex-col overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
