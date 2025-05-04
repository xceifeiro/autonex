import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              AutoNex
            </h3>
            <p className="text-gray-400 mb-4">
              Simplificamos o crescimento do seu negócio com automação inteligente e acessível.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/solucoes" className="text-gray-400 hover:text-white transition-colors">
                  Soluções
                </Link>
              </li>
              <li>
                <Link href="/resultados" className="text-gray-400 hover:text-white transition-colors">
                  Resultados
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Soluções</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solucoes#vendas" className="text-gray-400 hover:text-white transition-colors">
                  Automação de Vendas
                </Link>
              </li>
              <li>
                <Link href="/solucoes#atendimento" className="text-gray-400 hover:text-white transition-colors">
                  Atendimento Automatizado
                </Link>
              </li>
              <li>
                <Link href="/solucoes#operacoes" className="text-gray-400 hover:text-white transition-colors">
                  Operações Inteligentes
                </Link>
              </li>
              <li>
                <Link href="/solucoes#sites" className="text-gray-400 hover:text-white transition-colors">
                  Sites e Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/solucoes#marketing" className="text-gray-400 hover:text-white transition-colors">
                  Automação de Marketing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-gray-400">+55 62 99320-4235</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-gray-400">contato@autonextech.com.br</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-gray-400">Rua Inglaterra, n° 108, Santa Isabel, Anápolis/GO</span>
              </li>
            </ul>
            <Button className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              Agendar uma Consultoria Gratuita
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} AutoNex. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
