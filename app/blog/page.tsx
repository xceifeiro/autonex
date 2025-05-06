"use client"

import { useState, useEffect } from "react"
import { Search, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import PostCard from "@/components/blog/post-card"

// Dados simulados para os posts do blog
const blogPosts = [
  {
    id: 1,
    slug: "como-automatizar-atendimento-ao-cliente",
    title: "Como Automatizar o Atendimento ao Cliente e Aumentar Vendas em 43%",
    excerpt:
      "Descubra como implementar um sistema de atendimento automatizado que funciona 24/7 e aumenta significativamente suas conversões.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-11-15",
    readTime: "8 min",
    author: {
      name: "Ricardo Oliveira",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "CEO & Fundador",
    },
    category: "Atendimento",
    tags: ["Atendimento ao Cliente", "Automação", "Chatbots", "Vendas", "IA"],
  },
  {
    id: 2,
    slug: "inteligencia-artificial-pequenas-empresas",
    title: "Inteligência Artificial para Pequenas Empresas: Guia Completo",
    excerpt:
      "Um guia prático sobre como pequenas empresas podem implementar IA em seus processos sem grandes investimentos.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-11-08",
    readTime: "12 min",
    author: {
      name: "Juliana Santos",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "CTO",
    },
    category: "Inteligência Artificial",
    tags: ["Inteligência Artificial", "Pequenas Empresas", "Automação", "Produtividade", "Tecnologia"],
  },
  {
    id: 3,
    slug: "automacao-marketing-digital",
    title: "Automação de Marketing Digital: 7 Estratégias que Funcionam",
    excerpt:
      "Estratégias comprovadas para automatizar seu marketing digital e obter resultados consistentes sem esforço manual.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-10-25",
    readTime: "10 min",
    author: {
      name: "Fernando Costa",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Diretor de Operações",
    },
    category: "Marketing",
    tags: ["Marketing Digital", "Automação", "E-mail Marketing", "Redes Sociais", "Leads"],
  },
  {
    id: 4,
    slug: "chatbots-whatsapp-negocios",
    title: "Chatbots no WhatsApp: Como Implementar em Seu Negócio",
    excerpt: "Um guia passo a passo para implementar chatbots no WhatsApp e transformar seu atendimento e vendas.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-10-18",
    readTime: "9 min",
    author: {
      name: "Camila Almeida",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Diretora de Sucesso do Cliente",
    },
    category: "WhatsApp",
    tags: ["WhatsApp", "Chatbots", "Atendimento", "Automação", "Vendas"],
  },
  {
    id: 5,
    slug: "transformacao-digital-empresas",
    title: "Transformação Digital: Por Onde Começar em 2024",
    excerpt: "Um roteiro prático para empresas que desejam iniciar ou acelerar sua jornada de transformação digital.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-10-10",
    readTime: "11 min",
    author: {
      name: "André Martins",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Especialista em Transformação Digital",
    },
    category: "Transformação Digital",
    tags: ["Transformação Digital", "Inovação", "Tecnologia", "Estratégia", "Processos"],
  },
  {
    id: 6,
    slug: "tendencias-tecnologia-2024",
    title: "10 Tendências de Tecnologia que Dominarão 2024",
    excerpt:
      "Conheça as principais tendências tecnológicas que moldarão o mercado e impactarão os negócios no próximo ano.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-09-28",
    readTime: "14 min",
    author: {
      name: "Mariana Silva",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Analista de Tendências",
    },
    category: "Tendências",
    tags: ["Tendências", "Tecnologia", "Inovação", "Futuro", "Mercado"],
  },
]

// Extrair todas as categorias únicas
const allCategories = Array.from(new Set(blogPosts.map((post) => post.category)))

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredPosts, setFilteredPosts] = useState(blogPosts)

  // Filtrar posts com base na pesquisa e categoria selecionada
  useEffect(() => {
    let result = blogPosts

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.excerpt.toLowerCase().includes(term) ||
          post.tags.some((tag) => tag.toLowerCase().includes(term)),
      )
    }

    if (selectedCategory) {
      result = result.filter((post) => post.category === selectedCategory)
    }

    setFilteredPosts(result)
  }, [searchTerm, selectedCategory])

  // Limpar filtros
  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
  }

  // Separar o post em destaque (o mais recente)
  const featuredPost = filteredPosts[0]
  const regularPosts = filteredPosts.slice(1)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 pb-20 pt-40 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[url('/blog-bg.svg?height=800&width=1600')] bg-cover bg-center" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Blog AutoNex</h1>
          <p className="text-xl text-white/80 mb-8">
            Insights, estratégias e novidades sobre automação, inteligência artificial e transformação digital
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="flex">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="pl-10 h-12 rounded-l-lg rounded-r-none border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-12 rounded-l-none rounded-r-lg bg-white border-0 border-l border-gray-200 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
                  >
                    <Filter className="h-5 w-5 mr-2" />
                    Filtrar
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => setSelectedCategory(null)}>Todas as categorias</DropdownMenuItem>
                  {allCategories.map((category) => (
                    <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>

      {/* Active Filters */}
      {(searchTerm || selectedCategory) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center flex-wrap gap-2">
            <span className="text-sm text-gray-500">Filtros ativos:</span>
            {searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Busca: {searchTerm}
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Categoria: {selectedCategory}
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500 hover:text-gray-700">
              Limpar filtros
            </Button>
          </div>
        </div>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Artigo em Destaque</h2>
          <PostCard post={featuredPost} featured={true} />
        </section>
      )}

      {/* Regular Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Artigos Recentes</h2>

        {regularPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum artigo encontrado</h3>
            <p className="text-gray-600 mb-4">Tente ajustar seus filtros ou termos de busca.</p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar filtros
            </Button>
          </div>
        )}
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Inscreva-se em nossa newsletter</h2>
          <p className="text-white/80 mb-8">
            Receba as últimas novidades, artigos e dicas sobre automação e inteligência artificial diretamente em seu
            e-mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              className="h-12 bg-white/10 border-0 text-white placeholder:text-white/60 focus-visible:ring-2 focus-visible:ring-white"
            />
            <Button className="h-12 bg-white text-blue-700 hover:bg-white/90">Inscrever-se</Button>
          </div>
          <p className="text-white/60 text-sm mt-4">
            Prometemos não enviar spam. Você pode cancelar a inscrição a qualquer momento.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="md:flex items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Pronto para transformar seu negócio?
              </h2>
              <p className="text-gray-600 mb-6">
                Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar resultados
                extraordinários com automação e inteligência artificial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Agendar Consultoria
                </Button>
                <Button variant="outline">Conhecer Soluções</Button>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="relative h-64 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Consultoria Gratuita</h3>
                    <p className="text-gray-700">Primeira sessão sem compromisso</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
