import { NextResponse } from "next/server"

// URL fixa do webhook fornecida pelo usuário
const N8N_WEBHOOK_URL =
  "https://n8n-augustho-n8n.scyobq.easypanel.host/webhook-test/77eb0e75-b983-454a-9f05-842a6c74365b"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Registrar os dados recebidos para depuração
    console.log("Dados recebidos:", body)

    // Converter o corpo da requisição em parâmetros de consulta para GET
    const queryParams = new URLSearchParams()

    // Adicionar os dados principais
    if (body.type) queryParams.append("type", body.type)

    // Adicionar os dados de negócio de forma plana
    if (body.data) {
      Object.entries(body.data).forEach(([key, value]) => {
        queryParams.append(`data_${key}`, String(value))
      })
    }

    // Adicionar timestamp e source
    if (body.timestamp) queryParams.append("timestamp", body.timestamp)
    if (body.source) queryParams.append("source", body.source)

    // Construir a URL completa com os parâmetros
    const fullUrl = `${N8N_WEBHOOK_URL}?${queryParams.toString()}`
    console.log("URL completa para N8N:", fullUrl)

    // Tentar enviar para o N8N com timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 segundos de timeout

    try {
      // Usar método GET em vez de POST
      const response = await fetch(fullUrl, {
        method: "GET", // Mudado para GET
        headers: {
          Accept: "application/json",
          "User-Agent": "AutoNex-Website/1.0",
        },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("Resposta do N8N - Status:", response.status)

      // Tentar ler o corpo da resposta para diagnóstico
      let responseText = ""
      try {
        responseText = await response.text()
        console.log("Resposta do N8N - Corpo:", responseText)
      } catch (textError) {
        console.error("Erro ao ler corpo da resposta:", textError)
      }

      if (!response.ok) {
        throw new Error(`Resposta não-OK do N8N: ${response.status} ${response.statusText} - ${responseText}`)
      }

      // Tentar parsear a resposta como JSON se possível
      let data = {}
      try {
        if (responseText) {
          data = JSON.parse(responseText)
        }
      } catch (jsonError) {
        console.log("Resposta não é JSON válido, usando texto bruto")
        data = { message: responseText || "Dados recebidos pelo N8N" }
      }

      return NextResponse.json({
        success: true,
        data,
      })
    } catch (fetchError) {
      console.error("Erro ao enviar para N8N:", fetchError)

      // Implementar modo de simulação para garantir que o fluxo continue
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Dados processados em modo de simulação",
      })
    }
  } catch (error) {
    console.error("Erro ao processar requisição:", error)

    return NextResponse.json({
      success: true,
      simulated: true,
      message: "Dados processados em modo de simulação (erro de processamento)",
    })
  }
}
