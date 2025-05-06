"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Verificar se estamos na página de login
  const isLoginPage = pathname === "/admin/login"

  // Detectar se é dispositivo móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      // Em dispositivos móveis, a sidebar começa fechada
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Verificar autenticação no lado do cliente
  useEffect(() => {
    if (!isLoginPage) {
      const isAuthenticated = localStorage.getItem("adminAuth") === "true"
      if (!isAuthenticated) {
        router.push("/admin/login")
      } else {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [router, isLoginPage])

  // Se estiver na página de login, renderize apenas o conteúdo sem o layout administrativo
  if (isLoginPage) {
    return <>{children}</>
  }

  // Função para fazer logout
  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminUser")
    document.cookie = "adminAuth=; path=/; max-age=0"
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Função para alternar a barra lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="admin-layout flex flex-col min-h-screen bg-gray-100">
      {/* Overlay para dispositivos móveis quando o sidebar está aberto */}
      {isMobile && isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md flex items-center justify-center text-white font-bold">
                A
              </div>
              <span className="font-bold text-xl">AutoNex</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-gray-700 lg:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link href="/admin/dashboard">
              <div
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  pathname === "/admin/dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Dashboard</span>
              </div>
            </Link>

            <div className="space-y-1">
              <div className="flex items-center space-x-2 p-2 text-gray-700">
                <FileText className="h-5 w-5" />
                <span>Blog</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </div>
              <div className="pl-9 space-y-1">
                <Link href="/admin/posts">
                  <div
                    className={`p-2 rounded-md ${
                      pathname === "/admin/posts" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Todos os Posts
                  </div>
                </Link>
                <Link href="/admin/posts/new">
                  <div
                    className={`p-2 rounded-md ${
                      pathname === "/admin/posts/new" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Novo Post
                  </div>
                </Link>
              </div>
            </div>

            <Link href="/admin/settings">
              <div
                className={`flex items-center space-x-2 p-2 rounded-md ${
                  pathname === "/admin/settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span>Configurações</span>
              </div>
            </Link>
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label={isSidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
          >
            <Menu className="h-6 w-6" />
          </button>
{/* Div de usuário lateral
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Administrador</div>
              <div className="text-xs text-gray-500">admin@autonex.com</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
          </div>*/}
        </header>

        {/* Conteúdo da página */}
        <main className="flex-1 bg-gray-100 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
