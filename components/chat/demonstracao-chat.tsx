"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, X, Check, CheckCheck } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  type Message,
  type BusinessInfo,
  sendMessageToN8N,
  generateSessionId,
  generateUserId,
  getWelcomeMessage,
} from "@/lib/chat-utils"

interface DemonstracaoChatProps {
  isOpen?: boolean
  onClose?: () => void
  businessInfo: BusinessInfo
}

export default function DemonstracaoChat({ isOpen = false, onClose, businessInfo }: DemonstracaoChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Determina o avatar e nome do bot com base no canal selecionado
  const getBotAvatar = () => {
    switch (businessInfo.canais) {
      case "whatsapp":
        return "/placeholder.svg?height=60&width=60&text=WA"
      case "instagram":
        return "/placeholder.svg?height=60&width=60&text=IG"
      case "facebook":
        return "/placeholder.svg?height=60&width=60&text=FB"
      case "telegram":
        return "/placeholder.svg?height=60&width=60&text=TG"
      default:
        return "/placeholder.svg?height=60&width=60&text=AI"
    }
  }

  const getBotName = () => {
    const canalName =
      businessInfo.canais === "whatsapp"
        ? "WhatsApp"
        : businessInfo.canais === "instagram"
          ? "Instagram"
          : businessInfo.canais === "facebook"
            ? "Facebook"
            : businessInfo.canais === "telegram"
              ? "Telegram"
              : businessInfo.canais === "site"
                ? "Chat"
                : "E-mail"

    return `${businessInfo.empresa} (${canalName})`
  }

  // Gera a mensagem de boas-vindas personalizada com base nas informações do negócio
  const getWelcomeMessage = () => {
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

  // Inicializa o chat com a mensagem de boas-vindas
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: getWelcomeMessage(),
        sender: "bot",
        timestamp: new Date(),
        status: "read",
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length, businessInfo])

  // Rola para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Foca no input quando o chat é aberto
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      sendMessage()
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simula o envio para o webhook
    try {
      // Atualiza o status da mensagem para "enviado"
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "sent" } : msg)))
      }, 500)

      // Atualiza o status da mensagem para "entregue"
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "delivered" } : msg)))
      }, 1000)

      // Simula o bot digitando
      setIsTyping(true)

      // Simula uma resposta do bot após um tempo
      setTimeout(() => {
        setIsTyping(false)

        // Atualiza o status da mensagem do usuário para "lida"
        setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" } : msg)))

        // Adiciona a resposta do bot
        const botResponse: Message = {
          id: Date.now().toString(),
          text: getBotResponse(inputValue, businessInfo),
          sender: "bot",
          timestamp: new Date(),
          status: "read",
        }

        setMessages((prev) => [...prev, botResponse])
      }, 2000)
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
    }
  }

  // Função para gerar respostas simuladas do bot com base nas informações do negócio
  const getBotResponse = (message: string, info: BusinessInfo): string => {
    const lowerMessage = message.toLowerCase()
    const empresa = info.empresa
    const segmento = info.segmento

    // Respostas personalizadas com base no segmento
    if (segmento === "ecommerce") {
      if (lowerMessage.includes("entrega") || lowerMessage.includes("prazo") || lowerMessage.includes("frete")) {
        return `Na ${empresa}, realizamos entregas para todo o Brasil. O prazo médio é de 3 a 7 dias úteis, dependendo da sua localização. Posso verificar o prazo exato para seu CEP. Poderia me informar?`
      }

      if (lowerMessage.includes("devolução") || lowerMessage.includes("troca") || lowerMessage.includes("garantia")) {
        return `A ${empresa} oferece 30 dias para trocas e devoluções. Para iniciar o processo, basta enviar o código do seu pedido e o motivo da devolução. Posso ajudar com isso agora?`
      }

      if (lowerMessage.includes("produto") || lowerMessage.includes("estoque") || lowerMessage.includes("disponível")) {
        return `Temos diversos produtos disponíveis em nosso catálogo. Você está procurando algo específico? Posso verificar a disponibilidade e enviar o link direto para você.`
      }
    }

    if (segmento === "saude") {
      if (lowerMessage.includes("consulta") || lowerMessage.includes("horário") || lowerMessage.includes("agenda")) {
        return `Na ${empresa}, temos horários disponíveis para consultas de segunda a sexta, das 8h às 18h, e aos sábados das 8h às 12h. Gostaria de agendar uma consulta? Posso verificar as próximas datas disponíveis.`
      }

      if (lowerMessage.includes("convênio") || lowerMessage.includes("plano") || lowerMessage.includes("particular")) {
        return `A ${empresa} atende os principais convênios médicos, como Unimed, Bradesco Saúde, Amil e SulAmérica, além de consultas particulares. Qual é o seu convênio? Posso verificar se atendemos.`
      }
    }

    if (segmento === "alimentacao") {
      if (lowerMessage.includes("cardápio") || lowerMessage.includes("menu") || lowerMessage.includes("prato")) {
        return `O cardápio da ${empresa} é atualizado semanalmente. Nossos destaques desta semana são: Prato Executivo (R$39,90), Salada Premium (R$32,90) e nossa Sobremesa Especial (R$18,90). Gostaria de ver o cardápio completo?`
      }

      if (lowerMessage.includes("reserva") || lowerMessage.includes("mesa")) {
        return `Para fazer uma reserva na ${empresa}, precisamos saber a data, horário e número de pessoas. Quando você gostaria de nos visitar?`
      }

      if (lowerMessage.includes("delivery") || lowerMessage.includes("entrega") || lowerMessage.includes("pedido")) {
        return `A ${empresa} realiza entregas todos os dias, das 11h às 22h. O tempo médio de entrega é de 30 a 45 minutos, dependendo da sua localização. Gostaria de fazer um pedido agora?`
      }
    }

    // Respostas genéricas para qualquer segmento
    if (
      lowerMessage.includes("olá") ||
      lowerMessage.includes("oi") ||
      lowerMessage.includes("bom dia") ||
      lowerMessage.includes("boa tarde") ||
      lowerMessage.includes("boa noite")
    ) {
      return `Olá! Como posso ajudar você hoje com a ${empresa}? 😊`
    }

    if (
      lowerMessage.includes("preço") ||
      lowerMessage.includes("valor") ||
      lowerMessage.includes("custo") ||
      lowerMessage.includes("plano")
    ) {
      return `Na ${empresa}, temos diversas opções de preços e planos para atender às suas necessidades. Posso te enviar nossa tabela de preços atualizada. Você tem interesse em algum produto ou serviço específico?`
    }

    if (
      lowerMessage.includes("contato") ||
      lowerMessage.includes("falar") ||
      lowerMessage.includes("atendente") ||
      lowerMessage.includes("humano")
    ) {
      return `Claro! Posso transferir você para um de nossos consultores da ${empresa}. Qual seria o melhor horário para entrarmos em contato? Ou prefere que eu agende uma ligação agora?`
    }

    if (lowerMessage.includes("horário") || lowerMessage.includes("funcionamento") || lowerMessage.includes("aberto")) {
      return `A ${empresa} funciona de segunda a sexta, das 9h às 18h, e aos sábados das 9h às 13h. Posso ajudar com mais alguma informação?`
    }

    if (lowerMessage.includes("endereço") || lowerMessage.includes("localização") || lowerMessage.includes("onde")) {
      return `A ${empresa} está localizada na Av. Principal, 1500, Centro. Temos estacionamento próprio e estamos próximos à estação de metrô Central. Posso enviar o link da localização no Google Maps se desejar.`
    }

    if (lowerMessage.includes("obrigado") || lowerMessage.includes("obrigada") || lowerMessage.includes("valeu")) {
      return `Por nada! Foi um prazer ajudar. A ${empresa} agradece seu contato. Tem mais alguma dúvida que eu possa esclarecer?`
    }

    // Resposta padrão
    return `Entendi sua pergunta sobre "${inputValue}". Na ${empresa}, buscamos sempre oferecer as melhores soluções para nossos clientes. Posso fornecer mais detalhes sobre isso ou ajudar com alguma outra informação específica?`
  }

  // Renderiza o status da mensagem
  const renderMessageStatus = (status: Message["status"]) => {
    switch (status) {
      case "sending":
        return null
      case "sent":
        return <Check className="h-3 w-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="h-3 w-3 text-gray-400" />
      case "read":
        return <CheckCheck className="h-3 w-3 text-blue-500" />
      default:
        return null
    }
  }

  // Determina a cor do cabeçalho com base no canal selecionado
  const getHeaderColor = () => {
    switch (businessInfo.canais) {
      case "whatsapp":
        return "bg-green-500"
      case "instagram":
        return "bg-gradient-to-r from-purple-500 to-pink-500"
      case "facebook":
        return "bg-blue-600"
      case "telegram":
        return "bg-blue-500"
      case "site":
        return "bg-gradient-to-r from-blue-600 to-purple-600"
      default:
        return "bg-gray-700"
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl shadow-2xl transition-all duration-300",
        "w-[350px] max-w-[calc(100vw-2rem)] bg-white",
        "transform origin-bottom-right",
      )}
      style={{ height: "500px", maxHeight: "calc(100vh - 120px)" }}
    >
      {/* Cabeçalho do chat */}
      <div className={`flex items-center gap-3 ${getHeaderColor()} p-3 rounded-t-2xl`}>
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
          <Image
            src={getBotAvatar() || "/placeholder.svg"}
            alt={getBotName()}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border border-white"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-white">{getBotName()}</h3>
          <p className="text-xs text-white text-opacity-80">Online</p>
        </div>
        <button onClick={onClose} className="text-white hover:text-opacity-80">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Área de mensagens */}
      <div
        className="flex-1 overflow-y-auto p-4 bg-[#e5ddd5] bg-opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bbb' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E")`,
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "mb-3 max-w-[80%] rounded-lg p-3",
              message.sender === "user" ? "ml-auto bg-[#dcf8c6] rounded-tr-none" : "mr-auto bg-white rounded-tl-none",
            )}
          >
            <p className="text-sm">{message.text}</p>
            <div className="mt-1 flex items-center justify-end gap-1">
              <span className="text-[10px] text-gray-500">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              {message.sender === "user" && renderMessageStatus(message.status)}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="mr-auto max-w-[80%] rounded-lg rounded-tl-none bg-white p-3">
            <div className="flex gap-1">
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }}></div>
              <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Área de entrada de mensagem */}
      <div className="flex items-center gap-2 border-t p-3 bg-[#f0f0f0]">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Digite uma mensagem"
          className="flex-1 rounded-full border border-gray-300 bg-white py-2 px-4 text-sm focus:border-blue-500 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-white ${
            businessInfo.canais === "whatsapp"
              ? "bg-green-500 hover:bg-green-600"
              : businessInfo.canais === "instagram"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={!inputValue.trim()}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
