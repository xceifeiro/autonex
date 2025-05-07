import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, userId, sessionId, businessInfo } = body

    if (!message) {
      return NextResponse.json({ error: "Mensagem não fornecida" }, { status: 400 })
    }

    // URL do webhook do n8n
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL || "https://seu-n8n-webhook.com/webhook"

    // Enviar a mensagem para o n8n
    const response = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        userId,
        sessionId,
        businessInfo,
        timestamp: new Date().toISOString(),
        source: "chat-widget",
      }),
    })

    if (!response.ok) {
      console.error("Erro ao enviar mensagem para o n8n:", await response.text())
      return NextResponse.json({ error: "Erro ao processar mensagem" }, { status: 500 })
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      response: data,
    })
  } catch (error) {
    console.error("Erro ao processar requisição:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
