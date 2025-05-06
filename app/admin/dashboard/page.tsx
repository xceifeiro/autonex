"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, FileText, Users, Eye, Plus, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Verificar autenticação no lado do cliente
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true"
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  // Dados simulados para o dashboard
  const stats = [
    {
      title: "Total de Posts",
      value: "24",
      icon: FileText,
      description: "7 posts publicados este mês",
    },
    {
      title: "Visualizações",
      value: "12.5k",
      icon: Eye,
      description: "Aumento de 32% em relação ao mês anterior",
    },
    {
      title: "Usuários",
      value: "3,240",
      icon: Users,
      description: "120 novos usuários esta semana",
    },
    {
      title: "Engajamento",
      value: "24%",
      icon: BarChart,
      description: "Taxa de conversão média",
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Gerencie seu blog e monitore o desempenho</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" /> Novo Post
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Posts Recentes</CardTitle>
            <CardDescription>Últimos posts publicados no blog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                  <div>
                    <h3 className="font-medium">Como aumentar suas vendas com marketing digital</h3>
                    <p className="text-sm text-gray-500">Publicado em 12/05/2023</p>
                  </div>
                  <Link href={`/admin/posts/${i}/edit`}>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Atalhos para tarefas comuns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/admin/posts/new">
                <Button className="w-full justify-start" variant="outline">
                  <Plus className="mr-2 h-4 w-4" /> Criar novo post
                </Button>
              </Link>
              <Link href="/admin/posts">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" /> Gerenciar posts
                </Button>
              </Link>
              <Link href="/blog" target="_blank">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="mr-2 h-4 w-4" /> Visualizar blog
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
