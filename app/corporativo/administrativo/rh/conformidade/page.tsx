"use client"

import { Suspense } from "react"
import { ConformidadeTab } from "@/components/rh/tabs/conformidade-tab"
import { RHNavbar } from "../_components/rh-navbar"
import { RHTabsNavbar } from "../_components/rh-tabs-navbar"

function ConformidadeContent() {
  return (
    <div className="flex flex-col h-screen bg-muted/30 overflow-hidden">
      {/* Topbar Secundário */}
      <div className="flex-shrink-0 z-40 mt-0">
        <RHNavbar />
      </div>

      {/* Topbar Terciário - Tabs FORA da moldura */}
      <div className="flex-shrink-0 z-30 mt-3">
        <RHTabsNavbar />
      </div>

      {/* Conteúdo com moldura - APENAS CONTEÚDO */}
      <main className="flex-1 bg-background overflow-hidden p-6">
        <div 
          className="h-full border-0 bg-background overflow-y-auto overflow-x-hidden scrollbar-hide p-6" 
          style={{ 
            borderRadius: '25px', 
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.13), 0 2px 8px rgba(0, 0, 0, 0.05)',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <ConformidadeTab />
        </div>
      </main>
    </div>
  )
}

export default function ConformidadeRHPage() {
  return (
    <Suspense fallback={<div className="p-6">Carregando...</div>}>
      <ConformidadeContent />
    </Suspense>
  )
}
