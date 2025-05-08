"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  Clock,
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  MessageCircle,
  ThumbsUp,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Importando os dados simulados do blog
import { blogPosts } from "@/lib/blog-data"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("artigo")
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // Simular carregamento do post
    setIsLoading(true)

    // Encontrar o post pelo slug
    const foundPost = blogPosts.find((p) => p.slug === slug)

    if (foundPost) {
      setPost(foundPost)

      // Encontrar posts relacionados
      const related = foundPost.relatedPosts.map((id) => blogPosts.find((p) => p.id === id)).filter(Boolean)

      setRelatedPosts(related)
    }

    setIsLoading(false)
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
        <p className="text-gray-600 mb-6">O artigo que você está procurando não existe ou foi removido.</p>
        <Link href="/blog">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para o Blog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[url('/blog-bg.svg?height=800&width=1600')] bg-cover bg-center" />
        </div>
        <div className="relative max-w-4xl mx-auto pt-4 text-center">
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para o Blog
          </Link>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{post.title}</h1>
          <div className="flex items-center justify-center text-white/80">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{post.date}</span>
            {/* Tempo de Leitura}
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
            */}
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-64 md:h-96">
            <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="artigo" className="p-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="artigo"
                onClick={() => setActiveTab("artigo")}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Artigo
              </TabsTrigger>
              <TabsTrigger
                value="comentarios"
                onClick={() => setActiveTab("comentarios")}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Comentários
              </TabsTrigger>
            </TabsList>

            <TabsContent value="artigo" className="pt-6">
              {/* Author Info */}
              <div className="flex items-center mb-8">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Tags */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-500 mb-2">TAGS</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="bg-gray-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center ${liked ? "text-blue-600" : "text-gray-600"}`}
                      onClick={() => setLiked(!liked)}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {liked ? "Curtido" : "Curtir"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center text-gray-600 ml-2"
                      onClick={() => setActiveTab("comentarios")}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Comentar
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Compartilhar:</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-700">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comentarios" className="pt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Deixe seu comentário</h3>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Escreva seu comentário aqui..."
                />
                <div className="mt-4 flex justify-end">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Enviar comentário
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Comentários (0)</h3>
                  <div className="text-center py-8 text-gray-500">Seja o primeiro a comentar neste artigo!</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Artigos Relacionados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={relatedPost.coverImage || "/placeholder.svg"}
                  alt={relatedPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{relatedPost.category}</Badge>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                <div className="flex items-center mb-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={relatedPost.author.avatar || "/placeholder.svg"}
                      alt={relatedPost.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-700">{relatedPost.author.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">{relatedPost.date}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{relatedPost.readTime}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/blog/${relatedPost.slug}`} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      Ler artigo
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button variant="outline" className="bg-white">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Ver todos os artigos
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para transformar seu negócio?</h2>
          <p className="text-white/80 mb-8">
            Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar resultados extraordinários
            com automação e inteligência artificial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-700 hover:bg-white/90">Agendar Consultoria</Button>
            <Button variant="outline" className="text-white border-white hover:bg-white/10">
              Conhecer Soluções
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
