import { NextResponse } from "next/server"

// Este endpoint será chamado pelo n8n para enviar mensagens para o cliente
// Normalmente, isso seria implementado com WebSockets para comunicação em tempo real
// Para este exemplo, estamos usando um endpoint HTTP que seria chamado pelo n8n

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, userId, sessionId, metadata } = body

    if (!message) {
      return NextResponse.json({ error: "Mensagem não fornecida" }, { status: 400 })
    }

    // Em uma implementação real, você enviaria esta mensagem para o cliente
    // usando WebSockets ou outra tecnologia de comunicação em tempo real

    // Para este exemplo, apenas retornamos sucesso
    return NextResponse.json({
      success: true,
      message,
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
      metadata,
    })
  } catch (error) {
    console.error("Erro ao processar webhook:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
