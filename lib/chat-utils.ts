// Tipos para mensagens e informações de negócio
export interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  status: "sending" | "sent" | "delivered" | "read"
  metadata?: Record<string, any>
}

export interface BusinessInfo {
  nome: string
  empresa: string
  segmento: string
  canais: string
}

export async function sendMessageToN8N(
  message: string,
  userId: string,
  sessionId: string,
  businessInfo: BusinessInfo,
): Promise<{ success: boolean; response: any }> {
  console.log("🚀 Iniciando envio para n8n:", { message, userId, sessionId })

  try {
    // Usar o endpoint de proxy em vez de chamar o n8n diretamente
    const proxyUrl = new URL("/api/chat/proxy", window.location.origin)
    proxyUrl.searchParams.append("message", message)
    proxyUrl.searchParams.append("userId", userId)
    proxyUrl.searchParams.append("sessionId", sessionId)

    // Adicionar informações do negócio como parâmetros
    Object.entries(businessInfo).forEach(([key, value]) => {
      if (value) {
        proxyUrl.searchParams.append(`business_${key}`, String(value))
      }
    })

    console.log("📤 Enviando requisição para o proxy:", proxyUrl.toString())

    // Fazer a requisição para o proxy
    const response = await fetch(proxyUrl.toString())

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("📥 Resposta do proxy:", JSON.stringify(data, null, 2))

    // Verificar se a resposta contém a mensagem "Workflow was started"
    if (data.response && data.response.message === "Workflow was started") {
      console.log("⏳ Workflow iniciado, aguardando resposta real...")

      // Aguardar um pouco para dar tempo ao n8n processar
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Tentar obter a resposta real do GPT
      try {
        // Fazer uma requisição para o endpoint que verifica se há uma resposta do GPT
        const checkUrl = `/api/chat/check-response?userId=${userId}&sessionId=${sessionId}&timestamp=${Date.now()}`
        console.log("🔍 Verificando resposta em:", checkUrl)

        const checkResponse = await fetch(checkUrl)

        if (!checkResponse.ok) {
          console.warn("⚠️ Erro ao verificar resposta:", checkResponse.status, checkResponse.statusText)
          // Continuar com a resposta inicial
        } else {
          const checkData = await checkResponse.json()
          console.log("🔎 Resposta da verificação:", JSON.stringify(checkData, null, 2))

          if (checkData.success && checkData.message && checkData.message !== "Workflow was started") {
            console.log("✅ Resposta real encontrada:", checkData.message)
            return {
              success: true,
              response: checkData,
            }
          }
        }
      } catch (checkError) {
        console.error("❌ Erro ao verificar resposta:", checkError)
      }

      // Se não conseguir obter a resposta real, usar uma resposta simulada
      console.log("⚠️ Usando resposta simulada porque apenas recebemos 'Workflow was started'")

      // Usar uma resposta simulada mais específica
      return {
        success: true,
        response: {
          message:
            "Olá! Sou o assistente virtual da AutoNex. Estamos especializados em soluções automotivas de alta qualidade. Como posso ajudar você hoje?",
          userId,
          sessionId,
          timestamp: new Date().toISOString(),
          source: "simulated",
        },
      }
    }

    return {
      success: true,
      response: data.response,
    }
  } catch (error) {
    console.error("❌ Erro ao enviar mensagem para n8n:", error)

    // Em caso de erro, retornar uma resposta simulada
    return {
      success: false,
      response: {
        message: "Ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        error: String(error),
      },
    }
  }
}

// Função para gerar ID de sessão único
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Função para gerar ID de usuário único
export function generateUserId(): string {
  // Verificar se já existe um ID de usuário no localStorage
  if (typeof window !== "undefined") {
    const existingUserId = localStorage.getItem("chat_user_id")
    if (existingUserId) {
      return existingUserId
    }

    // Criar novo ID de usuário
    const newUserId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    localStorage.setItem("chat_user_id", newUserId)
    return newUserId
  }

  // Fallback para SSR
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Função para formatar a mensagem de boas-vindas com base nas informações do negócio
export function getWelcomeMessage(businessInfo: BusinessInfo): string {
  return `👋 Olá! Sou o assistente virtual da ${businessInfo.empresa}. Como posso ajudar você hoje?`
}
