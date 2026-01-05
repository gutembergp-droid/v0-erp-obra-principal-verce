import { NextResponse } from "next/server"

export function canonicalJson(data: unknown, init?: ResponseInit) {
  return NextResponse.json(
    {
      data,
      meta: null,
    },
    init,
  )
}

