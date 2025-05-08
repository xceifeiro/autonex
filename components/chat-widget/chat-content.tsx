"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Sparkles, Info } from "lucide-react"
import { ChatStep, type UserData, type SendStatus, type Message, type ChatSession } from "./chat-types"
import {
  sendToWebhook,
  checkForResponse,
  type WebhookData,
  generateUserId,
  generateSessionId,
  generateMessageId,
  sendConversationMessage,
} from "./webhook-service"
import { CHAT_CONFIG } from "./config"
import { Avatar } from "@/components/ui/avatar"
import { ChatMessage } from "./chat-message"

/* ===================================
 * CONFIGURAÇÃO DE ARMAZENAMENTO LOCAL
 * ===================================
 * Chaves para persistência de dados entre sessões
 */
const STORAGE_KEYS = {
  MESSAGES: "autonex_chat_messages",
  USER_DATA: "autonex_user_data",
  CURRENT_STEP: "autonex_chat_step",
  CONVERSATION_ID: "autonex_conversation_id",
  SESSION: "autonex_chat_session",
}

// Mensagem de marketing que será exibida após 50 mensagens
const MARKETING_MESSAGE =
  "Muito bom! Parece que você está gostando de interagir com nossa IA de demonstração. " +
  "Que tal agora implementar uma solução personalizada para o seu negócio? " +
  "Entre em contato conosco para descobrir como podemos automatizar processos e " +
  "impulsionar resultados com IA no seu negócio. 🚀"

interface ChatContentProps {
  onClose: () => void
}

// Adicionar comentários para o componente principal
export function ChatContent({ onClose }: ChatContentProps) {
  /* ===================================
   * INICIALIZAÇÃO DE ESTADOS
   * ===================================
   * Configuração dos valores padrão e estados iniciais
   */
  // Estado inicial com valores padrão
  const defaultMessages: Message[] = [
    {
      id: generateMessageId(),
      text: CHAT_CONFIG.WELCOME_MESSAGE,
      isUser: false,
      timestamp: new Date(Date.now() - 60000),
    },
    {
      id: generateMessageId(),
      text: "Qual é o seu nome?",
      isUser: false,
      timestamp: new Date(),
    },
  ]

  // Atualizar o defaultUserData para incluir o campo de celular vazio
  const defaultUserData: UserData = {
    name: "",
    phone: "", // Novo campo para celular/WhatsApp
    companyName: "",
    segment: "",
    companyDescription: "",
    biggestChallenge: "",
  }

  // Adicionar comentários para os estados do componente
  /* ===================================
   * ESTADOS DO COMPONENTE
   * ===================================
   */
  // Estado de montagem do componente
  const [isMounted, setIsMounted] = useState(false)

  // Estado do fluxo de conversa
  const [currentStep, setCurrentStep] = useState<ChatStep>(ChatStep.Welcome)

  // Dados do usuário coletados durante a conversa
  const [userData, setUserData] = useState<UserData>(defaultUserData)

  // Input atual do usuário
  const [currentInput, setCurrentInput] = useState("")

  // Histórico de mensagens
  const [messages, setMessages] = useState<Message[]>(defaultMessages)

  // Estado de envio de mensagens
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle")

  // Mensagem de erro, se houver
  const [errorMessage, setErrorMessage] = useState<string>("")

  // ID da conversa para rastreamento no webhook
  const [conversationId, setConversationId] = useState<string | null>(null)

  // Informações da sessão do usuário
  const [session, setSession] = useState<ChatSession>({
    userId: generateUserId(),
    sessionId: generateSessionId(),
  })

  // Timer para verificação de respostas
  const [pollingTimer, setPollingTimer] = useState<NodeJS.Timeout | null>(null)

  // Tempo de início da espera por resposta
  const [waitStartTime, setWaitStartTime] = useState<number | null>(null)

  // Posição do cursor no campo de texto
  const [cursorPosition, setCursorPosition] = useState<number | null>(null)

  // Estado de digitação do bot
  const [isTyping, setIsTyping] = useState(false)

  // Estado de cooldown após mensagem de marketing
  const [inCooldown, setInCooldown] = useState(false)

  // Contador de cooldown
  const [cooldownCounter, setCooldownCounter] = useState(5)

  // Flag para controlar se a mensagem de marketing já foi exibida
  const [marketingMessageShown, setMarketingMessageShown] = useState(false)

  // Referências para elementos DOM
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  // Adicionar comentários para as funções de localStorage
  /* ===================================
   * FUNÇÕES DE PERSISTÊNCIA DE DADOS
   * ===================================
   */
  // Função para carregar dados do localStorage
  const loadFromLocalStorage = () => {
    if (typeof window === "undefined") return

    try {
      // Carregar mensagens
      const savedMessages = localStorage.getItem(STORAGE_KEYS.MESSAGES)
      if (savedMessages) {
        const parsedMessages = JSON.parse(savedMessages)
        // Converter strings de data para objetos Date
        const messagesWithDates = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
        setMessages(messagesWithDates)
      }

      // Carregar dados do usuário
      const savedUserData = localStorage.getItem(STORAGE_KEYS.USER_DATA)
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData))
      }

      // Carregar passo atual
      const savedStep = localStorage.getItem(STORAGE_KEYS.CURRENT_STEP)
      if (savedStep) {
        setCurrentStep(Number.parseInt(savedStep, 10))
      }

      // Carregar ID da conversa
      const savedConversationId = localStorage.getItem(STORAGE_KEYS.CONVERSATION_ID)
      if (savedConversationId) {
        setConversationId(savedConversationId)
      }

      // Carregar sessão
      const savedSession = localStorage.getItem(STORAGE_KEYS.SESSION)
      if (savedSession) {
        setSession(JSON.parse(savedSession))
      }

      // Verificar se a mensagem de marketing já foi exibida
      const marketingShown = localStorage.getItem("autonex_marketing_shown")
      if (marketingShown === "true") {
        setMarketingMessageShown(true)
      }
    } catch (error) {
      console.error("Erro ao carregar dados do localStorage:", error)
    }
  }

  // Função para salvar dados no localStorage
  const saveToLocalStorage = () => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
      localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData))
      localStorage.setItem(STORAGE_KEYS.CURRENT_STEP, currentStep.toString())
      if (conversationId) {
        localStorage.setItem(STORAGE_KEYS.CONVERSATION_ID, conversationId)
      }
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session))

      // Salvar estado da mensagem de marketing
      localStorage.setItem("autonex_marketing_shown", marketingMessageShown.toString())
    } catch (error) {
      console.error("Erro ao salvar dados no localStorage:", error)
    }
  }

  // Adicionar comentários para as funções de gerenciamento do chat
  /* ===================================
   * GERENCIAMENTO DO CHAT
   * ===================================
   */
  // Função para limpar o chat e reiniciar a conversa
  const clearChat = () => {
    setMessages(defaultMessages)
    setUserData(defaultUserData)
    setCurrentStep(ChatStep.Welcome)
    setConversationId(null)
    setMarketingMessageShown(false)
    setSession({
      userId: session.userId, // Mantém o mesmo userId
      sessionId: generateSessionId(), // Gera um novo sessionId
    })

    // Limpar localStorage
    localStorage.removeItem(STORAGE_KEYS.MESSAGES)
    localStorage.removeItem(STORAGE_KEYS.USER_DATA)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STEP)
    localStorage.removeItem(STORAGE_KEYS.CONVERSATION_ID)
    localStorage.removeItem("autonex_marketing_shown")
    localStorage.setItem(
      STORAGE_KEYS.SESSION,
      JSON.stringify({
        userId: session.userId,
        sessionId: generateSessionId(),
      }),
    )
  }

  // Função para fechar o chat salvando o estado
  const handleClose = () => {
    saveToLocalStorage()
    onClose()
  }

  // Função para rolar para o final das mensagens
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  /* ===================================
   * VERIFICAÇÃO DE LIMITE DE MENSAGENS
   * ===================================
   */
  // Função para verificar se atingiu o limite de mensagens e exibir mensagem de marketing
  const checkMessageLimit = () => {
    // Só verifica se estiver na etapa de conversa e se a mensagem ainda não foi exibida
    if (currentStep === ChatStep.Conversation && !marketingMessageShown && messages.length >= 50) {
      // Adiciona a mensagem de marketing
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          text: MARKETING_MESSAGE,
          isUser: false,
          timestamp: new Date(),
        },
      ])

      // Ativa o cooldown
      setInCooldown(true)
      setCooldownCounter(5)

      // Marca que a mensagem já foi exibida
      setMarketingMessageShown(true)

      // Inicia o contador regressivo
      const cooldownInterval = setInterval(() => {
        setCooldownCounter((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownInterval)
            setInCooldown(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
  }

  // Adicionar comentários para os useEffects
  /* ===================================
   * EFEITOS DE CICLO DE VIDA
   * ===================================
   */
  // Efeito para carregar dados do localStorage na montagem do componente
  useEffect(() => {
    setIsMounted(true)
    loadFromLocalStorage()
  }, [])

  // Efeito para salvar dados no localStorage quando estados relevantes mudam
  useEffect(() => {
    if (isMounted) {
      saveToLocalStorage()
    }
  }, [messages, userData, currentStep, conversationId, session, isMounted, marketingMessageShown])

  // Efeito para rolar para o final e focar no input quando as mensagens mudam
  useEffect(() => {
    scrollToBottom()
    if (inputRef.current && !inCooldown) {
      inputRef.current.focus()
    }
  }, [messages, currentStep, isTyping, inCooldown])

  // Efeito para verificar o limite de mensagens quando o array de mensagens muda
  useEffect(() => {
    if (isMounted) {
      checkMessageLimit()
    }
  }, [messages.length, currentStep, marketingMessageShown, isMounted])

  // Limpa o timer de polling quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (pollingTimer) {
        clearInterval(pollingTimer)
      }
    }
  }, [pollingTimer])

  // Adicionar comentários para a verificação de timeout
  /* ===================================
   * VERIFICAÇÃO DE TIMEOUT
   * ===================================
   * Verifica se o tempo de espera excedeu o limite
   */
  useEffect(() => {
    if (currentStep === ChatStep.WaitingResponse && waitStartTime) {
      const checkTimeout = setTimeout(() => {
        const now = Date.now()
        if (now - waitStartTime > CHAT_CONFIG.MAX_WAIT_TIME) {
          // Tempo de espera excedido
          if (pollingTimer) {
            clearInterval(pollingTimer)
            setPollingTimer(null)
          }

          setIsTyping(false)
          setSendStatus("timeout")
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              text: CHAT_CONFIG.TIMEOUT_MESSAGE,
              isUser: false,
              timestamp: new Date(),
            },
          ])
          setCurrentStep(ChatStep.Conversation) // Muda para o modo de conversa mesmo em caso de timeout
          setSendStatus("idle") // Adicione esta linha para redefinir o status
        }
      }, CHAT_CONFIG.MAX_WAIT_TIME + 1000) // Verifica um pouco depois do tempo máximo

      return () => clearTimeout(checkTimeout)
    }
  }, [currentStep, waitStartTime, pollingTimer])

  // Atualiza o estado de digitação com base no status de envio
  useEffect(() => {
    setIsTyping(sendStatus === "waiting")
  }, [sendStatus])

  // Adicionar comentários para as funções de comunicação com webhook
  /* ===================================
   * COMUNICAÇÃO COM WEBHOOK
   * ===================================
   */
  // Função para iniciar o polling para verificar respostas
  const startPollingForResponse = (id: string) => {
    // Define o tempo de início da espera
    setWaitStartTime(Date.now())
    setIsTyping(true)

    // Inicia o polling
    const timer = setInterval(async () => {
      const result = await checkForResponse(id)

      if (result.found && result.response) {
        // Resposta encontrada
        clearInterval(timer)
        setPollingTimer(null)
        setIsTyping(false)

        // Adiciona a resposta ao chat
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            text: result.response!,
            isUser: false,
            timestamp: new Date(),
          },
        ])

        setSendStatus("success")

        // Muda para o modo de conversa contínua após receber a primeira resposta
        setCurrentStep(ChatStep.Conversation)
        setSendStatus("idle") // Adicione esta linha para redefinir o status
      }
    }, CHAT_CONFIG.POLLING_INTERVAL)

    setPollingTimer(timer)
  }

  // Função para enviar dados iniciais para o webhook
  const handleSubmitToWebhook = async () => {
    if (currentStep !== ChatStep.BiggestChallenge) return

    // Prepara os dados para enviar
    const webhookData: Omit<WebhookData, "conversationId" | "userId" | "sessionId"> = {
      ...userData,
      biggestChallenge: currentInput,
      timestamp: new Date().toISOString(),
    }

    // Atualiza o estado para mostrar que está enviando
    setSendStatus("sending")

    try {
      // Envia os dados para o webhook usando a URL do arquivo de configuração
      const result = await sendToWebhook(webhookData)

      if (result.success && result.conversationId) {
        // Armazena o ID da conversa para verificar a resposta depois
        setConversationId(result.conversationId)

        // Muda para o estado de aguardando resposta
        setSendStatus("waiting")
        setCurrentStep(ChatStep.WaitingResponse)

        // Substitui o bloco de mensagens pelo setIsTyping(true)
        setIsTyping(true)

        // Inicia o polling para verificar respostas
        startPollingForResponse(result.conversationId)
      } else {
        setSendStatus("error")
        setErrorMessage(result.message)
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            text: `${CHAT_CONFIG.ERROR_MESSAGE} (Erro: ${result.message})`,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        // Mesmo em caso de erro, vamos para o modo de conversa
        setCurrentStep(ChatStep.Conversation)
        setSendStatus("idle") // Adicione esta linha para redefinir o status
      }
    } catch (error) {
      setSendStatus("error")
      const message = error instanceof Error ? error.message : "Erro desconhecido"
      setErrorMessage(message)
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          text: `${CHAT_CONFIG.ERROR_MESSAGE} (Erro: ${message})`,
          isUser: false,
          timestamp: new Date(),
        },
      ])
      // Mesmo em caso de erro, vamos para o modo de conversa
      setCurrentStep(ChatStep.Conversation)
      setSendStatus("idle") // Adicione esta linha para redefinir o status
    }
  }

  // Função para enviar mensagem no modo de conversa contínua
  const handleSendConversationMessage = async () => {
    if (!currentInput.trim() || !conversationId || sendStatus !== "idle" || inCooldown) return

    // Adiciona a mensagem do usuário ao chat
    const newMessage: Message = {
      id: generateMessageId(),
      text: currentInput,
      isUser: true,
      timestamp: new Date(),
      status: "sent",
    }

    setMessages((prev) => [...prev, newMessage])
    setCurrentInput("")

    // Simula a entrega da mensagem após 1 segundo
    setTimeout(() => {
      setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "delivered" } : msg)))

      // Simula a leitura da mensagem após mais 1 segundo
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === newMessage.id ? { ...msg, status: "read" } : msg)))
      }, 1000)
    }, 1000)

    // Atualiza o estado para mostrar que está enviando
    setSendStatus("sending")
    // Ativa o indicador de digitação sem adicionar uma mensagem
    setIsTyping(true)

    try {
      // Envia a mensagem para o webhook
      const result = await sendConversationMessage(
        currentInput,
        conversationId,
        session.userId,
        session.sessionId,
        messages,
      )

      if (result.success) {
        // Muda para o estado de aguardando resposta
        setSendStatus("waiting")

        // Inicia o polling para verificar respostas
        startPollingForResponse(conversationId)
      } else {
        setIsTyping(false)
        setSendStatus("error")
        setErrorMessage(result.message)
        setMessages((prev) => [
          ...prev,
          {
            id: generateMessageId(),
            text: `${CHAT_CONFIG.ERROR_MESSAGE} (Erro: ${result.message})`,
            isUser: false,
            timestamp: new Date(),
          },
        ])
        setSendStatus("idle")
      }
    } catch (error) {
      setIsTyping(false)
      setSendStatus("error")
      const message = error instanceof Error ? error.message : "Erro desconhecido"
      setErrorMessage(message)
      setMessages((prev) => [
        ...prev,
        {
          id: generateMessageId(),
          text: `${CHAT_CONFIG.ERROR_MESSAGE} (Erro: ${message})`,
          isUser: false,
          timestamp: new Date(),
        },
      ])
      setSendStatus("idle")
    }
  }

  // Adicionar comentários para as funções de manipulação de eventos
  /* ===================================
   * MANIPULAÇÃO DE EVENTOS DO USUÁRIO
   * ===================================
   */
  // Função principal para lidar com o envio de mensagens
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Não permite envio durante o cooldown
    if (inCooldown) return

    if (!currentInput.trim()) return

    // Se estiver no modo de conversa contínua
    if (currentStep === ChatStep.Conversation) {
      handleSendConversationMessage()
      return
    }

    // Adiciona a resposta do usuário
    setMessages([
      ...messages,
      {
        id: generateMessageId(),
        text: currentInput,
        isUser: true,
        timestamp: new Date(),
        status: "sent",
      },
    ])

    // Simula a entrega da mensagem após 1 segundo
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg, idx) => (idx === prev.length - 1 && msg.isUser ? { ...msg, status: "delivered" } : msg)),
      )

      // Simula a leitura da mensagem após mais 1 segundo
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg, idx) => (idx === prev.length - 1 && msg.isUser ? { ...msg, status: "read" } : msg)),
        )
      }, 1000)
    }, 1000)

    // Atualiza o switch case no handleSubmit para incluir o passo do celular
    switch (currentStep) {
      case ChatStep.Name:
        setUserData({ ...userData, name: currentInput })
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              text: "Qual é o seu número de celular/WhatsApp? (com DDD)",
              isUser: false,
              timestamp: new Date(),
            },
          ])
        }, 1000)
        setCurrentStep(ChatStep.Phone)
        break
      case ChatStep.Phone:
        setUserData({ ...userData, phone: currentInput })
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              text: "Qual é o nome da sua empresa?",
              isUser: false,
              timestamp: new Date(),
            },
          ])
        }, 1000)
        setCurrentStep(ChatStep.CompanyName)
        break
      case ChatStep.CompanyName:
        setUserData({ ...userData, companyName: currentInput })
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              text: "Qual é o segmento da sua empresa?",
              isUser: false,
              timestamp: new Date(),
            },
          ])
        }, 1000)
        setCurrentStep(ChatStep.Segment)
        break
      case ChatStep.Segment:
        setUserData({ ...userData, segment: currentInput })
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              text: "Agora descreva com o máximo de detalhes a sua empresa:",
              isUser: false,
              timestamp: new Date(),
            },
          ])
        }, 1000)
        setCurrentStep(ChatStep.CompanyDescription)
        break
      case ChatStep.CompanyDescription:
        setUserData({ ...userData, companyDescription: currentInput })
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: generateMessageId(),
              text: "Me fale qual sua maior dificuldade dentro da sua empresa:",
              isUser: false,
              timestamp: new Date(),
            },
          ])
        }, 1000)
        setCurrentStep(ChatStep.BiggestChallenge)
        break
      case ChatStep.BiggestChallenge:
        setUserData({ ...userData, biggestChallenge: currentInput })
        // Envia os dados para o webhook
        await handleSubmitToWebhook()
        break
      default:
        break
    }

    setCurrentInput("")
  }

  // Função para lidar com teclas pressionadas (Enter para enviar)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && currentStep !== ChatStep.CompanyDescription && !inCooldown) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Adicionar comentários para os helpers de UI
  /* ===================================
   * HELPERS DE UI
   * ===================================
   */
  // Determina se o campo de entrada deve estar desativado
  const isInputDisabled = sendStatus === "sending" || sendStatus === "waiting" || inCooldown

  // Determina o placeholder do campo de entrada
  const getInputPlaceholder = () => {
    if (inCooldown) {
      return `Aguarde ${cooldownCounter}s para continuar...`
    }

    if (currentStep === ChatStep.Conversation) {
      return "Digite uma mensagem..."
    }

    if (sendStatus === "sending") {
      return "Enviando..."
    }

    if (sendStatus === "waiting") {
      return "Aguardando resposta..."
    }

    return "Digite uma mensagem..."
  }

  // Adicionar comentários para o efeito de redefinição de status
  /* ===================================
   * REDEFINIÇÃO DE STATUS
   * ===================================
   */
  useEffect(() => {
    if (
      currentStep === ChatStep.Conversation &&
      sendStatus !== "idle" &&
      sendStatus !== "sending" &&
      sendStatus !== "waiting"
    ) {
      setSendStatus("idle")
    }
  }, [currentStep, sendStatus])

  // Adicionar comentários para a estrutura de renderização
  /* ===================================
   * RENDERIZAÇÃO DO COMPONENTE
   * ===================================
   */
  return (
    <div className="flex flex-col h-full bg-transparent rounded-xl shadow-lg"
      style={{backgroundImage: `url("/bg-chat.svg")`}}>
      {/* === CABEÇALHO DO CHAT === */}
      <div
        className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 flex items-center rounded-t-xl relative overflow-hidden"
        style={{
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Efeito de brilho */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[10px] bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent_65%)]"></div>
        </div>

        <div className="flex items-center flex-1 z-10">
          <Avatar className="h-10 w-10 mr-3 border-2 p-1 border-green-700 bg-white shadow-lg overflow-hidden">
            <img
              src="/images/favicon.svg" // Substitua pelo caminho da sua imagem
              alt="Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </Avatar>
          <div>
            <h2 className="text-white font-semibold">AutoNex AI</h2>
            <p className="text-blue-100 text-xs flex items-center">
              {sendStatus === "waiting" ? (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-cyan-400 mr-1.5 animate-pulse"></span>
                  digitando...
                </>
              ) : inCooldown ? (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-amber-300 mr-1.5"></span>
                  aguarde {cooldownCounter}s...
                </>
              ) : (
                <>
                  <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1.5"></span>
                  online
                </>
              )}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="text-white hover:bg-white/10 h-8 w-8 rounded-full z-10 transition-all duration-200"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Fechar</span>
        </Button>
      </div>

      {/* === BANNER DE DEMONSTRAÇÃO === */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-1 px-3 border-b-2 border-blue-500">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
          <div className="text-sm text-blue-800">
            <p className="text-blue-600 text-xs mt-1">
              Este é um exemplo de como a automação com IA poderia funcionar no seu negócio.
            </p>
          </div>
        </div>
      </div>

      {/* === ÁREA DE MENSAGENS === */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-100/10 custom-scrollbar">
        {/* Renderiza as mensagens */}
        {messages.map((message, index) => (
          <div key={message.id} className="chat-message-wrapper">
            {/* Importa o componente ChatMessage de ./chat-message.tsx */}
            <ChatMessage
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
              status={message.status}
            />
          </div>
        ))}

        {/* Indicador de digitação */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/90 backdrop-blur-sm text-gray-800 rounded-lg rounded-bl-none border border-blue-100 px-3 py-2 shadow-sm">
              <div className="flex space-x-1.5 items-center">
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
                  style={{ animationDelay: "0ms" }}
                ></span>
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
                  style={{ animationDelay: "300ms" }}
                ></span>
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
                  style={{ animationDelay: "600ms" }}
                ></span>
              </div>
            </div>
          </div>
        )}

        {/* Elemento para rolar para o final */}
        <div ref={messagesEndRef} />
      </div>

      {/* === ÁREA DE ENTRADA === */}
      <div className="p-3 backdrop-blur-sm rounded-b-xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          {/* Campo de entrada */}
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isInputDisabled}
            placeholder={getInputPlaceholder()}
            className="flex-1 px-4 py-2 border border-blue-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 shadow-sm"
          />

          {/* Botão de enviar */}
          <Button
            type="submit"
            disabled={isInputDisabled || !currentInput.trim()}
            className={`rounded-full w-10 h-10 flex items-center justify-center shadow-md ${
              !currentInput.trim() || isInputDisabled
                ? "bg-blue-500 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
            <span className="sr-only">Enviar</span>
          </Button>
        </form>
      </div>
    </div>
  )
}
