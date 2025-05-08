// Adicionar comentários de seção no início do arquivo
// Serviço para enviar dados para webhook e receber respostas
import { CHAT_CONFIG } from "./config"
import { v4 as uuidv4 } from "uuid"
import type { Message } from "./chat-types"

/* ===================================
 * TIPOS DE DADOS
 * ===================================
 * Definição das interfaces para comunicação com webhook
 */
export interface WebhookData {
  name: string
  companyName: string
  segment: string
  companyDescription: string
  biggestChallenge: string
  timestamp: string
  conversationId: string // ID único para rastrear a conversa
  userId: string // ID único do usuário
  sessionId: string // ID único da sessão
}

export interface ConversationData {
  message: string
  timestamp: string
  conversationId: string
  userId: string
  sessionId: string
  messageHistory: {
    role: "user" | "assistant"
    content: string
    timestamp: string
  }[]
}

export type WebhookResponse = {
  success: boolean
  message: string
  conversationId?: string
}

/* ===================================
 * FUNÇÕES DE GERAÇÃO DE IDs
 * ===================================
 * Funções para criar identificadores únicos
 */
// Função para gerar um ID único para a conversa
export function generateConversationId(): string {
  return uuidv4()
}

// Função para gerar um ID único para o usuário
export function generateUserId(): string {
  // Verifica se já existe um userId no localStorage
  const existingUserId = localStorage.getItem("autonex_user_id")
  if (existingUserId) {
    return existingUserId
  }

  // Se não existir, cria um novo e salva
  const newUserId = uuidv4()
  try {
    localStorage.setItem("autonex_user_id", newUserId)
  } catch (error) {
    console.error("Erro ao salvar userId no localStorage:", error)
  }

  return newUserId
}

// Função para gerar um ID único para a sessão
export function generateSessionId(): string {
  return uuidv4()
}

// Função para gerar um ID único para mensagem
export function generateMessageId(): string {
  return uuidv4()
}

/* ===================================
 * FUNÇÕES DE COMUNICAÇÃO COM WEBHOOK
 * ===================================
 */
// Função para enviar dados iniciais para o webhook do N8N
export async function sendToWebhook(
  data: Omit<WebhookData, "conversationId" | "userId" | "sessionId">,
): Promise<WebhookResponse> {
  try {
    // Gera IDs únicos
    const conversationId = generateConversationId()
    const userId = generateUserId()
    const sessionId = generateSessionId()

    // Adiciona os IDs aos dados
    const dataWithIds = {
      ...data,
      conversationId,
      userId,
      sessionId,
    }

    const response = await fetch(CHAT_CONFIG.WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataWithIds),
    })

    if (!response.ok) {
      throw new Error(`Erro ao enviar dados: ${response.status}`)
    }

    await response.json()

    return {
      success: true,
      message: "Dados enviados com sucesso!",
      conversationId, // Retorna o ID da conversa para rastreamento
    }
  } catch (error) {
    console.error("Erro ao enviar dados para webhook:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao enviar dados",
    }
  }
}

// Função para enviar mensagem na conversa contínua
export async function sendConversationMessage(
  message: string,
  conversationId: string,
  userId: string,
  sessionId: string,
  messageHistory: Message[],
): Promise<WebhookResponse> {
  try {
    // Prepara o histórico de mensagens em formato adequado para o webhook
    const formattedHistory = messageHistory.map((msg) => ({
      role: msg.isUser ? "user" : ("assistant" as "user" | "assistant"),
      content: msg.text,
      timestamp: msg.timestamp.toISOString(),
    }))

    // Prepara os dados para enviar
    const data: ConversationData = {
      message,
      timestamp: new Date().toISOString(),
      conversationId,
      userId,
      sessionId,
      messageHistory: formattedHistory,
    }

    const response = await fetch(CHAT_CONFIG.CONVERSATION_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Erro ao enviar mensagem: ${response.status}`)
    }

    await response.json()

    return {
      success: true,
      message: "Mensagem enviada com sucesso!",
      conversationId,
    }
  } catch (error) {
    console.error("Erro ao enviar mensagem para webhook:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Erro desconhecido ao enviar mensagem",
    }
  }
}

// Função para verificar se há uma resposta disponível
export async function checkForResponse(conversationId: string): Promise<{ found: boolean; response?: string }> {
  try {
    const response = await fetch(`${CHAT_CONFIG.RESPONSE_WEBHOOK_URL}?conversationId=${conversationId}`)
    const data = await response.json()

    if (response.ok && data.found) {
      return {
        found: true,
        response: data.response,
      }
    }

    return {
      found: false,
    }
  } catch (error) {
    console.error("Erro ao verificar resposta:", error)
    return {
      found: false,
    }
  }
}
