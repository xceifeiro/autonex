"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send, X, Check, CheckCheck, Bug } from "lucide-react"
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
  const [userId, setUserId] = useState<string>("")
  const [sessionId, setSessionId] = useState<string>("")
  const [debugMode, setDebugMode] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Função de depuração para exibir informações detalhadas no console
  const debugLog = (label: string, data: any) => {
    if (!debugMode) return

    console.log(`🔍 DEBUG [${label}]:`, JSON.stringify(data, null, 2))

    if (label === "N8N_RESPONSE" && data?.response) {
      console.log(
        "%c📩 MENSAGEM COMPLETA DO N8N",
        "background: #4CAF50; color: white; padding: 4px; border-radius: 4px;",
      )
      console.log(
        "%c" + JSON.stringify(data.response, null, 2),
        "background: #E8F5E9; color: #2E7D32; padding: 8px; border-radius: 4px; font-family: monospace;",
      )
    }
  }

  // Inicializar IDs de usuário e sessão
  useEffect(() => {
    setUserId(generateUserId())
    setSessionId(generateSessionId())
  }, [])

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

  // Inicializa o chat com a mensagem de boas-vindas
  useEffect(() => {
    if (messages.length === 0 && userId && sessionId) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: getWelcomeMessage(businessInfo),
        sender: "bot",
        timestamp: new Date(),
        status: "read",
      }
      setMessages([welcomeMessage])
    }
  }, [messages.length, businessInfo, userId, sessionId])

  // Rola para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    console.log("Mensagens atualizadas:", messages)
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

  const toggleDebugMode = () => {
    setDebugMode(!debugMode)
    console.log(`Modo de depuração ${!debugMode ? "ativado" : "desativado"}`)
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || !userId || !sessionId) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

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
    debugLog("ENVIANDO_MENSAGEM", { mensagem: inputValue, userId, sessionId })

    try {
      console.log("Enviando mensagem para o n8n:", inputValue)

      // Enviar mensagem para o n8n através do nosso endpoint
      const result = await sendMessageToN8N(inputValue, userId, sessionId, businessInfo)

      debugLog("N8N_RESPONSE", result)

      // Atualiza o status da mensagem do usuário para "lida"
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" } : msg)))

      // Processa a resposta do n8n
      if (result.success && result.response) {
        console.log("Processando resposta bem-sucedida:", result.response)
        debugLog("PROCESSANDO_RESPOSTA", result.response)

        // Extrair a mensagem da resposta
        let responseText = ""
        let source = "desconhecido"

        if (typeof result.response === "string") {
          responseText = result.response
          debugLog("RESPOSTA_TIPO_STRING", responseText)
        } else if (result.response.message) {
          responseText = result.response.message
          source = result.response.source || "message"
          debugLog("RESPOSTA_COM_MESSAGE", responseText)
        } else if (result.response.response?.text) {
          responseText = result.response.response.text
          source = "response.text"
          debugLog("RESPOSTA_COM_RESPONSE_TEXT", responseText)
        } else if (result.response.text) {
          responseText = result.response.text
          source = "text"
          debugLog("RESPOSTA_COM_TEXT", responseText)
        } else if (result.response.content) {
          responseText = result.response.content
          source = "content"
          debugLog("RESPOSTA_COM_CONTENT", responseText)
        } else {
          responseText = "Entendi sua mensagem. Como posso ajudar?"
          source = "fallback"
          debugLog("RESPOSTA_FALLBACK", { motivo: "Formato desconhecido", resposta: result.response })
        }

        console.log("Texto da resposta extraído:", responseText)
        console.log("Fonte da resposta:", source)

        // Adiciona a resposta do bot
        const botResponse: Message = {
          id: Date.now().toString(),
          text: responseText,
          sender: "bot",
          timestamp: new Date(),
          status: "read",
          metadata: {
            ...result.response.metadata,
            source,
            debug: debugMode,
          },
        }

        setIsTyping(false)
        setMessages((prev) => [...prev, botResponse])
        debugLog("MENSAGEM_BOT_ADICIONADA", botResponse)
      } else {
        // Se houve um erro, mostramos uma mensagem de fallback
        const errorResponse: Message = {
          id: Date.now().toString(),
          text: "Desculpe, tive um problema ao processar sua mensagem. Poderia tentar novamente?",
          sender: "bot",
          timestamp: new Date(),
          status: "read",
          metadata: {
            error: true,
            source: "error-handler",
          },
        }

        setIsTyping(false)
        setMessages((prev) => [...prev, errorResponse])
        debugLog("ERRO_PROCESSAMENTO", { erro: "Resposta inválida", resultado: result })
      }
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error)
      debugLog("ERRO_ENVIO", { erro: String(error) })

      // Mensagem de erro em caso de falha
      const errorResponse: Message = {
        id: Date.now().toString(),
        text: "Desculpe, ocorreu um erro de conexão. Por favor, tente novamente mais tarde.",
        sender: "bot",
        timestamp: new Date(),
        status: "read",
        metadata: {
          error: true,
          source: "exception-handler",
        },
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, errorResponse])
    }
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
        <button
          onClick={toggleDebugMode}
          className="text-white hover:text-opacity-80 mr-2"
          title={debugMode ? "Desativar modo de depuração" : "Ativar modo de depuração"}
        >
          <Bug className="h-4 w-4" />
        </button>
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
            {debugMode && message.metadata && (
              <div className="mt-1 text-[10px] text-gray-500 border-t border-gray-200 pt-1">
                <span className="font-bold">Fonte:</span> {message.metadata.source || "N/A"}
              </div>
            )}
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
