"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, X, Check, CheckCheck } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  status: "sending" | "sent" | "delivered" | "read"
}

interface WhatsappChatProps {
  webhookUrl?: string
  botName?: string
  botAvatar?: string
  initialMessage?: string
  isOpen?: boolean
  onClose?: () => void
}

export default function WhatsappChat({
  webhookUrl = "https://your-n8n-webhook-url.com",
  botName = "AutoNex Assistente",
  botAvatar = "/placeholder.svg?height=60&width=60",
  initialMessage = "👋 Olá! Sou o assistente virtual da AutoNex. Como posso ajudar você hoje?",
  isOpen = false,
  onClose,
}: WhatsappChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Inicializa o chat com a mensagem de boas-vindas
  useEffect(() => {
    if (initialMessage && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: initialMessage,
        sender: "bot",
        timestamp: new Date(),
        status: "read",
      }
      setMessages([welcomeMessage])
    }
  }, [initialMessage, messages.length])

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

      // Envia a mensagem para o webhook (descomente e ajuste conforme necessário)
      /*
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          timestamp: new Date().toISOString(),
          sessionId: "demo-session", // Você pode gerar um ID de sessão único
        }),
      });
      */

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
          text: getBotResponse(inputValue),
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

  // Função para gerar respostas simuladas do bot
  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase()

    if (
      lowerMessage.includes("olá") ||
      lowerMessage.includes("oi") ||
      lowerMessage.includes("bom dia") ||
      lowerMessage.includes("boa tarde") ||
      lowerMessage.includes("boa noite")
    ) {
      return "Olá! Como posso ajudar você hoje? 😊"
    }

    if (
      lowerMessage.includes("preço") ||
      lowerMessage.includes("valor") ||
      lowerMessage.includes("custo") ||
      lowerMessage.includes("plano")
    ) {
      return "Nossos planos de automação começam a partir de R$ 997/mês. Gostaria de receber uma proposta personalizada para o seu negócio?"
    }

    if (
      lowerMessage.includes("contato") ||
      lowerMessage.includes("falar") ||
      lowerMessage.includes("atendente") ||
      lowerMessage.includes("humano")
    ) {
      return "Claro! Posso transferir você para um de nossos consultores. Qual seria o melhor horário para entrarmos em contato?"
    }

    if (lowerMessage.includes("automação") || lowerMessage.includes("automatizar")) {
      return "A AutoNex oferece soluções de automação para vendas, atendimento e operações. Qual área do seu negócio você gostaria de automatizar primeiro?"
    }

    if (lowerMessage.includes("obrigado") || lowerMessage.includes("obrigada") || lowerMessage.includes("valeu")) {
      return "Por nada! Estou aqui para ajudar. Tem mais alguma dúvida que eu possa esclarecer?"
    }

    return "Entendi! Para oferecer a melhor solução para o seu negócio, precisamos entender melhor suas necessidades. Podemos agendar uma demonstração gratuita com um de nossos consultores?"
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
      <div className="flex items-center gap-3 bg-green-500 p-3 rounded-t-2xl">
        <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white">
          <Image
            src={botAvatar || "/placeholder.svg"}
            alt={botName}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border border-white"></div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-white">{botName}</h3>
          <p className="text-xs text-green-100">Online</p>
        </div>
        <button onClick={onClose} className="text-white hover:text-green-200">
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
          className="flex-1 rounded-full border border-gray-300 bg-white py-2 px-4 text-sm focus:border-green-500 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600"
          disabled={!inputValue.trim()}
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
