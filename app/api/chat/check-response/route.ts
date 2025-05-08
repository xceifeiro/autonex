import { NextResponse } from "next/server"
import { responseCache } from "../receive/route"

export async function GET(request: Request) {
  console.log("🔍 Recebida requisição GET em /api/chat/check-response")

  const url = new URL(request.url)
  const userId = url.searchParams.get("userId")
  const sessionId = url.searchParams.get("sessionId")
  const timestamp = url.searchParams.get("timestamp") || Date.now().toString()

  console.log("🔎 Verificando resposta para:", { userId, sessionId, timestamp })
  console.log("📊 Tamanho atual do cache:", responseCache.size)
  console.log("📋 Chaves no cache:", JSON.stringify(Array.from(responseCache.keys()), null, 2))

  if (!userId || !sessionId) {
    console.error("❌ Erro: userId e sessionId são obrigatórios")
    return NextResponse.json({ error: "userId e sessionId são obrigatórios" }, { status: 400 })
  }

  // Criar a chave de cache
  const cacheKey = `${userId}:${sessionId}`

  // Verificar se existe uma resposta no cache
  if (responseCache.has(cacheKey)) {
    const cachedResponse = responseCache.get(cacheKey)
    console.log("✅ Resposta encontrada no cache:", JSON.stringify(cachedResponse, null, 2))

    // Remover do cache após recuperar (opcional)
    // responseCache.delete(cacheKey);

    return NextResponse.json({
      success: true,
      ...cachedResponse,
      retrievedAt: new Date().toISOString(),
    })
  }

  console.log("⚠️ Nenhuma resposta encontrada no cache para a chave:", cacheKey)

  // Se não encontrou no cache, verificar se há uma resposta simulada
  return NextResponse.json({
    success: false,
    message: "Nenhuma resposta encontrada no cache. Usando resposta simulada.",
    simulatedMessage:
      "Olá! Sou o assistente virtual da AutoNex. Estamos especializados em soluções automotivas de alta qualidade. Como posso ajudar você hoje?",
    userId,
    sessionId,
    timestamp: new Date().toISOString(),
    source: "simulated-fallback",
  })
}

export async function POST(request: Request) {
  console.log("🔍 Recebida requisição POST em /api/chat/check-response")

  try {
    const body = await request.json()
    console.log("📥 Corpo da requisição:", JSON.stringify(body, null, 2))

    const { message, userId, sessionId } = body

    if (!message || !userId || !sessionId) {
      console.error("❌ Erro: Dados incompletos")
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 })
    }

    // Criar uma chave única para esta conversa
    const cacheKey = `${userId}:${sessionId}`

    // Armazenar a resposta no cache
    responseCache.set(cacheKey, {
      ...body,
      cachedAt: new Date().toISOString(),
      source: "direct-post",
    })

    console.log("💾 Resposta armazenada no cache com chave:", cacheKey)
    console.log("📊 Tamanho atual do cache:", responseCache.size)
    console.log("📋 Conteúdo do cache:", JSON.stringify(Array.from(responseCache.entries()), null, 2))

    return NextResponse.json({
      success: true,
      message: "Resposta armazenada com sucesso",
      cacheKey,
    })
  } catch (error) {
    console.error("❌ Erro ao armazenar resposta:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
