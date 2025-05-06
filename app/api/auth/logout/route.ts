import { NextResponse } from "next/server"
import { logout } from "@/lib/auth"

export async function POST() {
  try {
    await logout()
    return NextResponse.json({ message: "Logout realizado com sucesso" })
  } catch (error) {
    console.error("Erro no logout:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
