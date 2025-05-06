"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, informe seu e-mail.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulação de envio
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      toast({
        title: "Sucesso!",
        description: "Você foi inscrito em nossa newsletter.",
      })
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
        <Input
          type="email"
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 bg-white/10 border-0 text-white placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white"
          disabled={isLoading}
        />
        <Button type="submit" className="h-12 bg-white text-blue-700 hover:bg-white/90" disabled={isLoading}>
          {isLoading ? "Inscrevendo..." : "Inscrever-se"}
        </Button>
      </div>
      <p className="text-white/60 text-sm mt-4">
        Prometemos não enviar spam. Você pode cancelar a inscrição a qualquer momento.
      </p>
    </form>
  )
}
