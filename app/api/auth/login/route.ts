import { type NextRequest, NextResponse } from "next/server"
import { login } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email e senha são obrigatórios" }, { status: 400 })
    }

    const user = await login(email, password)

    if (!user) {
      return NextResponse.json({ message: "Credenciais inválidas" }, { status: 401 })
    }

    return NextResponse.json({
      message: "Login realizado com sucesso",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Erro no login:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
