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
  desafios: string
  canais: string
}

// Função para enviar mensagem para o n8n
export async function sendMessageToN8N(
  message: string,
  userId: string,
  sessionId: string,
  businessInfo: BusinessInfo,
): Promise<{ success: boolean; response?: any; error?: string }> {
  try {
    const response = await fetch("/api/chat/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        userId,
        sessionId,
        businessInfo,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Erro ao enviar mensagem:", errorText)
      return { success: false, error: errorText }
    }

    const data = await response.json()
    return { success: true, response: data }
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error)
    return { success: false, error: String(error) }
  }
}

// Função para gerar ID de sessão único
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Função para gerar ID de usuário único
export function generateUserId(): string {
  // Verificar se já existe um ID de usuário no localStorage
  const existingUserId = localStorage.getItem("chat_user_id")
  if (existingUserId) {
    return existingUserId
  }

  // Criar novo ID de usuário
  const newUserId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  localStorage.setItem("chat_user_id", newUserId)
  return newUserId
}

// Função para formatar a mensagem de boas-vindas com base nas informações do negócio
export function getWelcomeMessage(businessInfo: BusinessInfo): string {
  const segmentoName =
    businessInfo.segmento === "ecommerce"
      ? "e-commerce"
      : businessInfo.segmento === "servicos"
        ? "prestação de serviços"
        : businessInfo.segmento === "saude"
          ? "saúde"
          : businessInfo.segmento === "educacao"
            ? "educação"
            : businessInfo.segmento === "alimentacao"
              ? "alimentação"
              : businessInfo.segmento === "varejo"
                ? "varejo"
                : "seu segmento"

  return `👋 Olá ${businessInfo.nome}! Bem-vindo(a) ao atendimento automático da ${businessInfo.empresa}. Como posso ajudar você hoje com sua empresa de ${segmentoName}? Você pode perguntar sobre nossos produtos, serviços, horários de atendimento ou qualquer outra informação.`
}
