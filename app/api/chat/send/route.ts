import { NextResponse } from "next/server"

// URL fixa do webhook fornecida pelo usuário
const N8N_WEBHOOK_URL =
  "https://n8n-augustho-n8n.scyobq.easypanel.host/webhook-test/77eb0e75-b983-454a-9f05-842a6c74365b"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Registrar os dados recebidos para depuração
    console.log("Dados de chat recebidos:", body)

    // Converter o corpo da requisição em parâmetros de consulta para GET
    const queryParams = new URLSearchParams()

    // Adicionar os dados principais de forma plana
    if (body.message) queryParams.append("message", body.message)
    if (body.userId) queryParams.append("userId", body.userId)
    if (body.sessionId) queryParams.append("sessionId", body.sessionId)

    // Adicionar dados de negócio se existirem
    if (body.businessInfo) {
      Object.entries(body.businessInfo).forEach(([key, value]) => {
        queryParams.append(`business_${key}`, String(value))
      })
    }

    // Adicionar timestamp
    queryParams.append("timestamp", new Date().toISOString())
    queryParams.append("type", "chat_message")

    // Construir a URL completa com os parâmetros
    const fullUrl = `${N8N_WEBHOOK_URL}?${queryParams.toString()}`
    console.log("URL completa para N8N (chat):", fullUrl)

    // Tentar enviar para o N8N com timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 segundos de timeout

    try {
      // Usar método GET em vez de POST
      const response = await fetch(fullUrl, {
        method: "GET", // Mudado para GET
        headers: {
          Accept: "application/json",
          "User-Agent": "AutoNex-Chat/1.0",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("Resposta do N8N (chat) - Status:", response.status)

      // Tentar ler o corpo da resposta para diagnóstico
      let responseText = ""
      try {
        responseText = await response.text()
        console.log("Resposta do N8N (chat) - Corpo:", responseText)
      } catch (textError) {
        console.error("Erro ao ler corpo da resposta (chat):", textError)
      }

      if (!response.ok) {
        throw new Error(`Resposta não-OK do N8N (chat): ${response.status} ${response.statusText} - ${responseText}`)
      }

      // Gerar uma resposta simulada baseada na mensagem do usuário
      const simulatedResponse = generateSimulatedResponse(body.message, body.businessInfo)

      return NextResponse.json({
        success: true,
        message: "Mensagem enviada com sucesso",
        response: simulatedResponse,
      })
    } catch (fetchError) {
      console.error("Erro ao enviar mensagem para N8N:", fetchError)

      // Gerar uma resposta simulada baseada na mensagem do usuário
      const simulatedResponse = generateSimulatedResponse(body.message, body.businessInfo)

      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Mensagem processada em modo de simulação",
        response: simulatedResponse,
      })
    }
  } catch (error) {
    console.error("Erro ao processar requisição de chat:", error)

    return NextResponse.json({
      success: true,
      simulated: true,
      message: "Mensagem processada em modo de simulação (erro de processamento)",
      response: {
        text: "Desculpe, tive um problema ao processar sua mensagem. Como posso ajudar?",
        timestamp: new Date().toISOString(),
      },
    })
  }
}

// Função para gerar respostas simuladas baseadas na mensagem do usuário
function generateSimulatedResponse(message: string, businessInfo: any) {
  const lowerMessage = message.toLowerCase()
  let response = "Obrigado por sua mensagem! Como posso ajudar?"

  // Respostas baseadas em palavras-chave
  if (lowerMessage.includes("preço") || lowerMessage.includes("valor") || lowerMessage.includes("custo")) {
    response = `Temos diferentes planos para atender às necessidades do seu negócio. O plano básico começa em R$ 197/mês, com atendimento ilimitado. Posso te enviar mais detalhes sobre os planos?`
  } else if (lowerMessage.includes("como funciona") || lowerMessage.includes("como usar")) {
    response = `Nossa solução é simples de usar! Após a contratação, configuramos a IA para seu negócio em até 48h. A partir daí, ela já estará pronta para atender seus clientes automaticamente. Gostaria de ver uma demonstração mais detalhada?`
  } else if (
    lowerMessage.includes("integra") ||
    lowerMessage.includes("whatsapp") ||
    lowerMessage.includes("instagram")
  ) {
    response = `Sim, nossa solução integra com diversos canais, incluindo WhatsApp, Instagram, Facebook Messenger, Telegram e chat no site. Qual canal você utiliza principalmente?`
  } else if (lowerMessage.includes("tempo") || lowerMessage.includes("prazo") || lowerMessage.includes("quando")) {
    response = `A implementação é rápida! Após a contratação, em apenas 48 horas sua IA já estará funcionando. O treinamento inicial leva cerca de 1 semana para ser refinado com base no seu negócio.`
  } else if (lowerMessage.includes("obrigad")) {
    response = `Eu que agradeço! Estou aqui para ajudar. Tem mais alguma dúvida sobre como nossa solução pode transformar o atendimento do seu negócio?`
  } else if (
    lowerMessage.includes("oi") ||
    lowerMessage.includes("olá") ||
    lowerMessage.includes("bom dia") ||
    lowerMessage.includes("boa tarde") ||
    lowerMessage.includes("boa noite")
  ) {
    const empresa = businessInfo?.empresa ? ` da ${businessInfo.empresa}` : ""
    response = `Olá! Bem-vindo à demonstração${empresa}. Como posso ajudar você hoje?`
  }

  return {
    text: response,
    timestamp: new Date().toISOString(),
  }
}
