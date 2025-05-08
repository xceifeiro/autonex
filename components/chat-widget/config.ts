/* ===================================
 * CONFIGURAÇÃO DO CHAT WIDGET
 * ===================================
 * Centraliza todas as configurações para facilitar alterações futuras
 */

export const CHAT_CONFIG = {
  // === CONFIGURAÇÕES DE WEBHOOK ===

  // URL do webhook para envio dos dados iniciais (N8N)
  WEBHOOK_URL: "https://n8n-augustho-n8n.scyobq.easypanel.host/webhook/77eb0e75-b983-454a-9f05-842a6c74365b",

  // URL do webhook para conversa contínua (N8N)
  CONVERSATION_WEBHOOK_URL:
    "https://n8n-augustho-n8n.scyobq.easypanel.host/webhook-test/77eb0e75-b983-454a-9f05-842a6c74365b",

  // URL do webhook para receber respostas (nosso site)
  RESPONSE_WEBHOOK_URL: "/api/webhook-response",

  // === CONFIGURAÇÕES DE POLLING ===

  // Intervalo de verificação para novas respostas (em ms)
  POLLING_INTERVAL: 3000, // 3 segundos

  // Tempo máximo de espera por uma resposta (em ms)
  MAX_WAIT_TIME: 60000, // 1 minuto

  // === CONFIGURAÇÕES VISUAIS ===

  // Título do chat
  CHAT_TITLE: "AutoNex AI",

  // Cores principais
  PRIMARY_COLOR: "blue-600",
  HOVER_COLOR: "blue-700",

  // === MENSAGENS PADRÃO ===

  // Mensagem inicial
  WELCOME_MESSAGE: "Para que eu possa te demonstrar coloque as suas informações e da sua empresa",

  // Mensagem de sucesso após receber os dados
  SUCCESS_MESSAGE: (name: string, company: string) =>
    `Obrigado, ${name}! Recebemos suas informações e estamos processando uma resposta personalizada para você. Por favor, aguarde um momento...`,

  // Mensagem de erro
  ERROR_MESSAGE: "Desculpe, tivemos um problema ao processar suas informações. Por favor, tente novamente mais tarde.",

  // Mensagem de espera
  WAITING_MESSAGE:
    "Estamos analisando suas informações e preparando uma resposta personalizada. Isso pode levar alguns instantes...",

  // Mensagem de timeout
  TIMEOUT_MESSAGE:
    "Parece que nossa resposta está demorando mais do que o esperado. Entraremos em contato em breve com uma análise detalhada para sua empresa.",

  // Mensagem de boas-vindas para conversa contínua
  CONVERSATION_WELCOME: "Agora você pode continuar conversando comigo. Como posso ajudar?",
}
