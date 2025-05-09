// Em components/chat-widget/chat-widget.tsx

"use client"

import { useEffect, useState } from "react"
import { MessageCircle, X, RotateCcw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ChatContent } from "./chat-content"
import { cn } from "@/lib/utils"
import { useChat } from "@/components/chat-widget/context"

export function ChatWidget() {
  // Use o contexto para controlar o estado do chat
  const { isChatOpen, toggleChat } = useChat()

  // Estado para garantir que o componente só seja renderizado no cliente
  const [isMounted, setIsMounted] = useState(false)

  /* ===================================
   * VERIFICAÇÃO DE CHAT SALVO
   * ===================================
   */
  // Verificar se há uma conversa salva no localStorage
  const hasSavedChat = () => {
    if (typeof window === "undefined") return false
    return localStorage.getItem("autonex_chat_messages") !== null
  }

  /* ===================================
   * FUNÇÃO PARA LIMPAR O CHAT
   * ===================================
   */
  const clearChat = () => {
    if (typeof window === "undefined") return

    // Limpar todos os dados do chat no localStorage
    localStorage.removeItem("autonex_chat_messages")
    localStorage.removeItem("autonex_user_data")
    localStorage.removeItem("autonex_chat_step")
    localStorage.removeItem("autonex_conversation_id")

    // Manter apenas o userId
    const userId = localStorage.getItem("autonex_user_id")
    const sessionData = localStorage.getItem("autonex_chat_session")

    if (sessionData) {
      try {
        const session = JSON.parse(sessionData)
        localStorage.setItem(
          "autonex_chat_session",
          JSON.stringify({
            userId: session.userId,
            sessionId: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
          }),
        )
      } catch (error) {
        console.error("Erro ao processar sessão:", error)
      }
    }

    // Forçar recarregamento do componente
    window.location.reload()
  }

  /* ===================================
   * EFEITO DE MONTAGEM DO COMPONENTE
   * ===================================
   */
  // Garantir que o componente só seja renderizado no cliente
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end">
      {/* === CONTAINER DO CHAT === */}
      <div
        className={cn(
          "bg-slate-100 rounded-t-xl rounded-b-xl shadow-xl transition-all duration-500 ease-out transform mb-2 mr-4 overflow-hidden",
          isChatOpen
            ? "opacity-100 translate-y-0 h-[500px] max-h-[80vh] w-[350px] sm:w-[380px]"
            : "opacity-0 translate-y-[20px] h-0 w-[350px] sm:w-[380px]" // Mantém a largura consistente
        )}
        style={{
          boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
          willChange: "transform, opacity, height", // Otimiza a animação
        }}
      >
        {/* Renderiza o conteúdo sempre, mas esconde quando fechado */}
        <div className={`h-full ${isChatOpen ? 'block' : 'hidden'}`}>
          <ChatContent onClose={() => toggleChat()} />

          {/* === BOTÃO PARA LIMPAR O CHAT === */}
          {hasSavedChat() && (
            <Button
              onClick={clearChat}
              variant="ghost"
              size="sm"
              className="absolute top-3 right-12 z-20 text-white/70 hover:text-white hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              <span className="text-xs">Reiniciar</span>
            </Button>
          )}
        </div>
      </div>

      {/* === BOTÃO FLUTUANTE DO CHAT === */}
      <Button
        onClick={toggleChat}
        className={cn(
          "rounded-full shadow-lg transition-all duration-300 flex items-center justify-center mr-6 mb-6",
          isChatOpen
            ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-4 py-2"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-4 py-2",
        )}
        style={{
          boxShadow: isChatOpen ? "0 10px 15px -3px rgba(239, 68, 68, 0.3)" : "0 10px 15px -3px rgba(59, 130, 246, 0.3)",
        }}
        aria-label={isChatOpen ? "Fechar demonstração" : "Veja demonstração"}
      >
        {isChatOpen ? (
          <>
            <X className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-medium">Fechar</span>
          </>
        ) : (
          <>
            <MessageCircle className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-medium">Veja demonstração</span>
          </>
        )}
      </Button>
    </div>
  )
}