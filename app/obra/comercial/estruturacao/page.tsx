"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EstruturacaoPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/obra/comercial/estruturacao-geral")
  }, [router])

  return null
}
