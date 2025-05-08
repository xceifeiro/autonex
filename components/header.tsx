"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Result } from "postcss"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isDemoPage = pathname === "/demonstracao"
  const isHomePage = pathname === "/"
  const isActiveHome = pathname === '/'
  const isActiveSolucoes = pathname === '/solucoes'
  const isActiveResultados = pathname === '/resultados'
  const isActiveSobre = pathname === '/sobre'
  const isActiveContato = pathname === '/contato'
  const isActiveFullDigital = pathname === '/full-digital'
  const isActiveBlog = pathname === '/blog'

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
        scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md"
            : isHomePage
              ? "bg-gray-900/80 backdrop-blur-md md:bg-transparent"
              : "bg-white/80 backdrop-blur-md shadow-md",
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 z-10">
          <img
            src={
              scrolled
                ? "/images/logo-azul-e-escura.png" // Imagem quando a página for rolada
                : isHomePage
                ? "/images/logo-branca.png" // Imagem para a página inicial
                : "/images/logo-azul-e-escura.png" // Imagem padrão (caso não caia em nenhum dos casos)
            }
            alt="Logo AutoNex"
            className="p-2 max-w-[200px] w-auto h-auto" // Tamanho da imagem
          />
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            href="/"
            className={cn( "text-sm font-medium transition-colors",
              isActiveHome ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" :
              scrolled ? "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent" : 
              isHomePage ? "text-white hover:text-blue-300" :
               "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent",
            )}
          >
            Home
          </Link>
          <Link
            href="/solucoes"
            className={cn(
              "text-sm font-medium transition-colors",
              isActiveSolucoes ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" :
              scrolled
                  ? "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                  : isHomePage
                    ? "text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent",
            )}
          >
            Soluções
          </Link>
          {/* Resultados Página COMENTADA 
          <Link
            href="/resultados"
            className={cn(
              "text-sm font-medium transition-colors",
            isActiveResultados ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" :
            scrolled
                  ? "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                  : isHomePage
                    ? "text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent",
                    
            )}
          >
            Resultados
          </Link>*/}
          <Link
            href="/blog"
            className={cn(
              "text-sm font-medium transition-colors",
              isActiveBlog ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" :
              scrolled
                  ? "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                  : isHomePage
                    ? "text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent",
            )}
          >
            Blog
          </Link>
          <Link
            href="/sobre"
            className={cn(
              "text-sm font-medium transition-colors",
              isActiveSobre ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" :
              scrolled
                  ? "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                  : isHomePage
                    ? "text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent",
            )}
          >
            Sobre
          </Link>
          <Link
            href="/contato"
            className={cn(
              "text-sm font-medium transition-colors",
              isActiveContato ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" :
              scrolled
                  ? "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                  : isHomePage
                    ? "text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent",
            )}
          >
            Contato
          </Link>
          <Link
            href="/full-digital"
            className={cn(
              "text-sm font-medium transition-colors",
              isActiveFullDigital ? "bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" :
              scrolled
                  ? "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                  : isHomePage
                    ? "text-white hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent"
                    : "text-gray-800 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:bg-clip-text hover:text-transparent",
            )}
          >
            Full Digital
          </Link>
        </nav>

        <div className="hidden md:flex">
          <Button
            onClick={() => {
              if (isDemoPage) {
                window.scrollTo({ top: 0, behavior: "smooth" })
              } else {
                window.location.href = "/solucoes"
              }
            }
            }
            className={cn(
              "text-white border-0",
              scrolled
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : isHomePage
                    ? "bg-white/20 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 border border-white/30 hover:border-transparent"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
            )}
          >
            Quero Automatizar Meu Negócio
          </Button>
        </div>
        
        {/* Mobile Menu Button */}

        <button className="md:hidden z-10" onClick={toggleMenu} aria-label="Menu">
          {isMenuOpen ? (
            <X className={cn(
              "h-6 w-6",
              scrolled ? "text-black" : isHomePage ? "text-white" : "text-gray-800",
            )} />
          ) : (
            <Menu
              className={cn(
                "h-6 w-6",
                scrolled ? "text-gray-800" : isHomePage ? "text-white" : "text-gray-800",
              )}
            />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bg-white z-0 rounded-b-xl shadow-lg max-h-[70vh] overflow-y-auto">
          <nav className="flex flex-col space-y-4 p-6">
            <Link 
            href="/" 
            className={cn("text-lg font-medium hover:text-blue-600 transition-colors", isActiveHome ? "text-blue-600" : "text-black",)} 
            onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="/solucoes"
              className={cn("text-lg font-medium hover:text-blue-600 transition-colors", isActiveSolucoes ? "text-blue-600" : "text-black",)}
              onClick={toggleMenu}
            >
              Soluções
            </Link>
            {/* Resultados Página COMENTADA
            <Link
              href="/resultados"
              className={cn("text-lg font-medium hover:text-blue-600 transition-colors", isActiveResultados ? "text-blue-600" : "text-black",)}
              onClick={toggleMenu}
            >
              Resultados
            </Link>
            */}
            <Link
              href="/blog"
              className={cn("text-lg font-medium hover:text-blue-600 transition-colors", isActiveBlog ? "text-blue-600" : "text-black",)}
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              href="/sobre"
              className={cn("text-lg font-medium hover:text-blue-600 transition-colors", isActiveSobre ? "text-blue-600" : "text-black",)}
              onClick={toggleMenu}
            >
              Sobre
            </Link>
            <Link
              href="/contato"
              className={cn("text-lg font-medium hover:text-blue-600 transition-colors", isActiveContato ? "text-blue-600" : "text-black",)}
              onClick={toggleMenu}
            >
              Contato
            </Link>
            <Link
              href="/full-digital"
              className={cn("text-lg font-medium hover:text-blue-600 transition-colors", isActiveFullDigital ? "text-blue-600" : "text-black",)}
              onClick={toggleMenu}
            >
              Full Digital
            </Link>
            <div className="pt-4 border-t border-gray-200 mt-2">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 w-full"
                onClick={() => {
                  if (isDemoPage) {
                    window.scrollTo({ top: 0, behavior: "smooth" })
                    toggleMenu()
                  } else {
                    window.location.href = "/solucoes"
                    toggleMenu()
                  }
                }
                }
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
