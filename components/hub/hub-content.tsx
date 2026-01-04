"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Calendar, Video, Bot } from "lucide-react"
import { ChatModule } from "@/components/hub/chat-module"
import { CalendarModule } from "@/components/hub/calendar-module"
import { MeetingModule } from "@/components/hub/meeting-module"
import { AIAssistantModule } from "@/components/hub/ai-assistant-module"

export function HubContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")
  const [activeTab, setActiveTab] = useState("chat")

  useEffect(() => {
    if (tabParam && ["chat", "calendar", "meetings", "ai"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [tabParam])

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">GENESIS Hub</h1>
            <p className="text-muted-foreground text-sm">Central de Comunicacao e Produtividade</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              12 online
            </div>
          </div>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="bg-card border border-border/50 p-1 rounded-xl w-fit">
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 gap-2"
            >
              <Calendar className="w-4 h-4" />
              Calendario
            </TabsTrigger>
            <TabsTrigger
              value="meetings"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 gap-2"
            >
              <Video className="w-4 h-4" />
              Reunioes
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg px-4 py-2 gap-2"
            >
              <Bot className="w-4 h-4" />
              Assistente IA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 mt-4">
            <ChatModule />
          </TabsContent>

          <TabsContent value="calendar" className="flex-1 mt-4">
            <CalendarModule />
          </TabsContent>

          <TabsContent value="meetings" className="flex-1 mt-4">
            <MeetingModule />
          </TabsContent>

          <TabsContent value="ai" className="flex-1 mt-4">
            <AIAssistantModule />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
