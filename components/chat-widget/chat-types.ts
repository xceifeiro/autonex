/* ===================================
 * TIPOS E ENUMERAÇÕES DO CHAT
 * ===================================
 * Definição dos tipos de dados utilizados no chat
 */

// Atualizar a enumeração ChatStep para incluir o passo do celular
export enum ChatStep {
  Welcome = 0,
  Name = 0, // Começa com o nome
  Phone = 1, // Novo passo para o celular/WhatsApp
  CompanyName = 2, // Ajustando os índices subsequentes
  Segment = 3,
  CompanyDescription = 4,
  BiggestChallenge = 5,
  WaitingResponse = 6, // Aguardando resposta do webhook
  Conversation = 7, // Conversa contínua após receber a primeira resposta
}

// Atualizar a interface UserData para incluir o campo de celular
export interface UserData {
  name: string
  phone: string // Novo campo para celular/WhatsApp
  companyName: string
  segment: string
  companyDescription: string
  biggestChallenge: string
}

// Tipo para os estados de envio de mensagens
export type SendStatus = "idle" | "sending" | "waiting" | "success" | "error" | "timeout"

// Interface para as mensagens do chat
export interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  status?: "sent" | "delivered" | "read"
}

// Interface para os dados da sessão do chat
export interface ChatSession {
  userId: string
  sessionId: string
  conversationId?: string
}
