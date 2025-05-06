"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulando autenticação - em produção, isso seria uma chamada de API
    setTimeout(() => {
      if (email === "admin@autonex.com" && password === "admin123") {
        // Armazenar informações de autenticação
        localStorage.setItem("adminAuth", "true")
        localStorage.setItem(
          "adminUser",
          JSON.stringify({
            name: "Administrador",
            email: "admin@autonex.com",
            role: "admin",
          }),
        )

        // Redirecionar para o dashboard
        router.push("/admin/dashboard")
      } else {
        setError("Email ou senha inválidos")
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mx-auto flex items-center justify-center">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">AutoNex Admin</h1>
          <p className="mt-1 text-gray-500">Faça login para gerenciar seu blog</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Entre com suas credenciais para acessar o painel administrativo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Esqueceu a senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Não tem uma conta?{" "}
              <Link href="#" className="text-blue-600 hover:text-blue-800">
                Entre em contato
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Credenciais de demonstração:
            <br />
            Email: admin@autonex.com
            <br />
            Senha: admin123
          </p>
        </div>
      </div>
    </div>
  )
}
