import { NextResponse } from "next/server"
import { responseCache } from "../receive/route"

// Este endpoint será chamado pelo n8n para enviar a resposta do GPT
export async function POST(request: Request) {
  console.log("🔍 Recebida requisição POST em /api/chat/webhook")

  try {
    const body = await request.json()
    console.log("📥 CORPO COMPLETO DA REQUISIÇÃO DO WEBHOOK:", JSON.stringify(body, null, 2))

    const { message, userId, sessionId, metadata } = body

    if (!message) {
      console.error("❌ Erro: Mensagem não fornecida")
      return NextResponse.json({ error: "Mensagem não fornecida" }, { status: 400 })
    }

    // Armazenar a resposta no cache para ser recuperada pelo endpoint check-response
    if (userId && sessionId) {
      const cacheKey = `${userId}:${sessionId}`
      responseCache.set(cacheKey, {
        message,
        userId,
        sessionId,
        timestamp: new Date().toISOString(),
        metadata,
        source: "n8n-webhook",
      })

      console.log("💾 Resposta armazenada no cache com chave:", cacheKey)
      console.log("📊 Tamanho atual do cache:", responseCache.size)
      console.log("📋 Conteúdo do cache:", JSON.stringify(Array.from(responseCache.entries()), null, 2))
    }

    // Criar um objeto de resposta para depuração
    const responseObject = {
      success: true,
      message,
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
      metadata,
      debug: {
        receivedAt: new Date().toISOString(),
        messageType: typeof message,
        messageLength: typeof message === "string" ? message.length : "não é string",
        metadataPresent: !!metadata,
      },
    }

    console.log("📤 RESPOSTA ENVIADA DE VOLTA:", JSON.stringify(responseObject, null, 2))
    return NextResponse.json(responseObject)
  } catch (error) {
    console.error("❌ Erro ao processar mensagem recebida:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  console.log("🔍 Recebida requisição GET em /api/chat/webhook")

  const url = new URL(request.url)
  const message = url.searchParams.get("message")
  const userId = url.searchParams.get("userId")
  const sessionId = url.searchParams.get("sessionId")

  console.log("📥 PARÂMETROS RECEBIDOS:", { message, userId, sessionId })

  if (!message) {
    console.error("❌ Erro: Mensagem não fornecida")
    return NextResponse.json({ error: "Mensagem não fornecida" }, { status: 400 })
  }

  // Armazenar a resposta no cache para ser recuperada pelo endpoint check-response
  if (userId && sessionId) {
    const cacheKey = `${userId}:${sessionId}`
    responseCache.set(cacheKey, {
      message,
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
      source: "n8n-webhook-get",
    })

    console.log("💾 Resposta armazenada no cache com chave:", cacheKey)
    console.log("📊 Tamanho atual do cache:", responseCache.size)
    console.log("📋 Conteúdo do cache:", JSON.stringify(Array.from(responseCache.entries()), null, 2))
  }

  // Criar um objeto de resposta para depuração
  const responseObject = {
    success: true,
    message,
    userId,
    sessionId,
    timestamp: new Date().toISOString(),
    debug: {
      receivedAt: new Date().toISOString(),
      messageType: typeof message,
      messageLength: message.length,
      queryParams: Object.fromEntries(url.searchParams.entries()),
    },
  }

  console.log("📤 RESPOSTA ENVIADA DE VOLTA:", JSON.stringify(responseObject, null, 2))
  return NextResponse.json(responseObject)
}
