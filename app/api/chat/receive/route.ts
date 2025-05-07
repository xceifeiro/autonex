import { NextResponse } from "next/server"

// Este endpoint será chamado pelo n8n para enviar respostas de volta ao chat
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, userId, sessionId, metadata } = body

    if (!message) {
      return NextResponse.json({ error: "Mensagem não fornecida" }, { status: 400 })
    }

    // Aqui você pode processar a mensagem recebida do n8n
    // Por exemplo, armazenar em um banco de dados, enviar notificações, etc.

    // Para este exemplo, apenas retornamos a mensagem recebida
    return NextResponse.json({
      success: true,
      message,
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
      metadata,
    })
  } catch (error) {
    console.error("Erro ao processar mensagem recebida:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
