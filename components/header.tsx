"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isDemoPage = pathname === "/demonstracao"
  const isHomePage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isDemoPage
          ? "bg-gradient-to-r from-blue-900 to-purple-900 shadow-md"
          : scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md"
            : isHomePage
              ? "bg-gray-900/80 backdrop-blur-md md:bg-transparent"
              : "bg-white/80 backdrop-blur-md shadow-md",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 z-10">
          <span
            className={cn(
              "text-2xl font-bold",
              isDemoPage
                ? "text-white"
                : scrolled
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  : isHomePage
                    ? "text-white"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
            )}
          >
            Auto<span className="font-extrabold">Nex</span>
          </span>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors",
              isDemoPage
                ? "text-white hover:text-blue-200"
                : scrolled
                  ? "text-gray-800 hover:text-blue-600"
                  : isHomePage
                    ? "text-white hover:text-blue-300"
                    : "text-gray-800 hover:text-blue-600",
            )}
          >
            Home
          </Link>
          <Link
            href="/solucoes"
            className={cn(
              "text-sm font-medium transition-colors",
              isDemoPage
                ? "text-white hover:text-blue-200"
                : scrolled
                  ? "text-gray-800 hover:text-blue-600"
                  : isHomePage
                    ? "text-white hover:text-blue-300"
                    : "text-gray-800 hover:text-blue-600",
            )}
          >
            Soluções
          </Link>
          <Link
            href="/resultados"
            className={cn(
              "text-sm font-medium transition-colors",
              isDemoPage
                ? "text-white hover:text-blue-200"
                : scrolled
                  ? "text-gray-800 hover:text-blue-600"
                  : isHomePage
                    ? "text-white hover:text-blue-300"
                    : "text-gray-800 hover:text-blue-600",
            )}
          >
            Resultados
          </Link>
          <Link
            href="/sobre"
            className={cn(
              "text-sm font-medium transition-colors",
              isDemoPage
                ? "text-white hover:text-blue-200"
                : scrolled
                  ? "text-gray-800 hover:text-blue-600"
                  : isHomePage
                    ? "text-white hover:text-blue-300"
                    : "text-gray-800 hover:text-blue-600",
            )}
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className={cn(
              "text-sm font-medium transition-colors",
              isDemoPage
                ? "text-white hover:text-blue-200"
                : scrolled
                  ? "text-gray-800 hover:text-blue-600"
                  : isHomePage
                    ? "text-white hover:text-blue-300"
                    : "text-gray-800 hover:text-blue-600",
            )}
          >
            Contato
          </Link>
        </nav>

        <div className="hidden md:flex">
          <Button
            className={cn(
              "text-white border-0",
              isDemoPage
                ? "bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30"
                : scrolled
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : isHomePage
                    ? "bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
            )}
          >
            Quero Automatizar Meu Negócio
          </Button>
        </div>

        <button className="md:hidden z-10" onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu
              className={cn(
                "h-6 w-6",
                isDemoPage ? "text-white" : scrolled ? "text-gray-800" : isHomePage ? "text-white" : "text-gray-800",
              )}
            />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-white z-0 rounded-b-xl shadow-lg max-h-[70vh] overflow-y-auto">
          <nav className="flex flex-col space-y-4 p-6">
            <Link href="/" className="text-lg font-medium hover:text-blue-600 transition-colors" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="/solucoes"
              className="text-lg font-medium hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              Soluções
            </Link>
            <Link
              href="/resultados"
              className="text-lg font-medium hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              Resultados
            </Link>
            <Link
              href="/sobre"
              className="text-lg font-medium hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className="text-lg font-medium hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              Contato
            </Link>
            <div className="pt-4 border-t border-gray-200 mt-2">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 w-full"
                onClick={toggleMenu}
              >
                Quero Automatizar Meu Negócio
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
