"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, FileText, PlusCircle, LogOut, Menu, X, User } from "lucide-react"

type AdminHeaderProps = {
  user: {
    name: string
    email: string
  }
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-bold text-xl bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
              AutoNex Admin
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/admin/dashboard"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/posts"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Posts
          </Link>
          <Link
            href="/admin/posts/new"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Novo Post
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-gray-500">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/posts">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Posts</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/posts/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Novo Post</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black/90 backdrop-blur-md">
          <div className="container py-4 px-4 space-y-3">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/posts"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="h-5 w-5" />
              <span>Posts</span>
            </Link>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <PlusCircle className="h-5 w-5" />
              <span>Novo Post</span>
            </Link>
            <div className="pt-2 border-t border-gray-800">
              <Button
                variant="ghost"
                className="flex w-full items-center justify-start gap-2 p-2 text-red-500 hover:bg-gray-800 hover:text-red-500"
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
              >
                <LogOut className="h-5 w-5" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
