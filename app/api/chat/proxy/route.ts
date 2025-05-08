import { NextResponse } from "next/server"

// Este endpoint atua como um proxy para o n8n, evitando problemas de CORS
export async function GET(request: Request) {
  console.log("🔄 Iniciando proxy para n8n")

  const url = new URL(request.url)
  const message = url.searchParams.get("message")
  const userId = url.searchParams.get("userId")
  const sessionId = url.searchParams.get("sessionId")

  // URL do webhook do n8n
  const N8N_WEBHOOK_URL =
    "https://n8n-augustho-n8n.scyobq.easypanel.host/webhook-test/77eb0e75-b983-454a-9f05-842a6c74365b"

  if (!message) {
    console.error("❌ Erro: Mensagem não fornecida")
    return NextResponse.json({ error: "Mensagem não fornecida" }, { status: 400 })
  }

  console.log("📤 Enviando para n8n:", { message, userId, sessionId })

  try {
    // Construir a URL para o n8n
    const n8nUrl = new URL(N8N_WEBHOOK_URL)
    n8nUrl.searchParams.append("message", message)

    if (userId) n8nUrl.searchParams.append("userId", userId)
    if (sessionId) n8nUrl.searchParams.append("sessionId", sessionId)

    // Adicionar outros parâmetros da URL original
    for (const [key, value] of url.searchParams.entries()) {
      if (!["message", "userId", "sessionId"].includes(key)) {
        n8nUrl.searchParams.append(key, value)
      }
    }

    console.log("🔗 URL do n8n:", n8nUrl.toString())

    // Fazer a requisição para o n8n
    const response = await fetch(n8nUrl.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Erro na requisição para n8n: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("📥 Resposta do n8n:", JSON.stringify(data, null, 2))

    // Armazenar a resposta no cache para ser recuperada posteriormente
    if (userId && sessionId && data.message === "Workflow was started") {
      // Registrar que o workflow foi iniciado
      console.log("⏳ Workflow iniciado, aguardando callback do n8n")
    }

    return NextResponse.json({
      success: true,
      response: data,
      proxyTimestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("❌ Erro no proxy:", error)
    return NextResponse.json(
      {
        error: "Erro ao comunicar com n8n",
        details: String(error),
      },
      { status: 500 },
    )
  }
}
