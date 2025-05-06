"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Dados de exemplo para posts
const MOCK_POSTS = [
  {
    id: 1,
    title: "Como a IA está transformando o marketing digital",
    slug: "ia-transformando-marketing-digital",
    excerpt:
      "Descubra como a inteligência artificial está revolucionando as estratégias de marketing digital e como você pode aproveitar essa tecnologia.",
    content:
      "# Como a IA está transformando o marketing digital\n\nA inteligência artificial está mudando rapidamente a forma como as empresas abordam o marketing digital. Desde chatbots até análise preditiva, as ferramentas de IA estão permitindo campanhas mais personalizadas e eficientes.\n\n## Principais aplicações da IA no marketing\n\n1. **Personalização de conteúdo** - A IA pode analisar o comportamento do usuário e recomendar conteúdo relevante.\n2. **Chatbots inteligentes** - Atendimento ao cliente 24/7 com respostas cada vez mais naturais.\n3. **Otimização de campanhas** - Ajuste automático de campanhas com base em performance.\n\n## Como implementar IA no seu negócio\n\nComece com soluções simples e escaláveis. Existem diversas ferramentas no mercado que não exigem conhecimento técnico profundo para implementação.",
    status: "published",
    category: "marketing",
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "2023-05-15",
    views: 1245,
    featured: true,
  },
  {
    id: 2,
    title: "5 estratégias para aumentar suas conversões",
    slug: "estrategias-aumentar-conversoes",
    excerpt:
      "Aprenda cinco estratégias comprovadas para aumentar a taxa de conversão do seu site e impulsionar seus resultados de vendas.",
    content:
      "# 5 estratégias para aumentar suas conversões\n\nAumentar a taxa de conversão é um dos objetivos principais de qualquer estratégia de marketing digital. Neste artigo, vamos explorar cinco estratégias eficazes para melhorar suas conversões.\n\n## 1. Otimize suas páginas de destino\n\nPáginas de destino bem projetadas são essenciais para conversões. Certifique-se de que sua proposta de valor esteja clara e que o caminho para a conversão seja intuitivo.\n\n## 2. Utilize depoimentos e provas sociais\n\nMostre casos de sucesso e depoimentos de clientes satisfeitos para construir confiança.\n\n## 3. Implemente testes A/B\n\nTeste diferentes versões de suas páginas para identificar o que funciona melhor com seu público.\n\n## 4. Simplifique o processo de checkout\n\nRemova obstáculos e simplifique o processo de compra para reduzir o abandono de carrinho.\n\n## 5. Crie senso de urgência\n\nUtilize ofertas por tempo limitado e contadores regressivos para incentivar ações imediatas.",
    status: "published",
    category: "vendas",
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "2023-05-10",
    views: 987,
    featured: false,
  },
]

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const postId = Number.parseInt(params.id)

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [post, setPost] = useState<any>(null)

  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [isFeatured, setIsFeatured] = useState(false)

  useEffect(() => {
    // Verificar autenticação
    const auth = localStorage.getItem("adminAuth")
    if (!auth || auth !== "true") {
      router.push("/admin/login")
      return
    }

    // Carregar dados do post
    const foundPost = MOCK_POSTS.find((p) => p.id === postId)

    if (foundPost) {
      setPost(foundPost)
      setTitle(foundPost.title)
      setSlug(foundPost.slug)
      setContent(foundPost.content)
      setExcerpt(foundPost.excerpt || "")
      setCategory(foundPost.category)
      setCoverImage(foundPost.coverImage || "")
      setIsPublished(foundPost.status === "published")
      setIsFeatured(foundPost.featured || false)
    } else {
      // Post não encontrado
      router.push("/admin/posts")
    }

    setIsAuthenticated(true)
    setIsLoading(false)
  }, [router, postId])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Simulação de salvamento - em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirecionar para a lista de posts após salvar
      router.push("/admin/posts")
    } catch (error) {
      console.error("Erro ao salvar post:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      // Simulação de exclusão - em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirecionar para a lista de posts após excluir
      router.push("/admin/posts")
    } catch (error) {
      console.error("Erro ao excluir post:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!isAuthenticated || !post) {
    return null // Não renderiza nada enquanto redireciona
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/admin/posts">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Editar Post</h1>
            <p className="text-gray-500">ID: {postId}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Excluir post</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="outline" asChild>
            <Link href={`/blog/${slug}`} target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Visualizar
            </Link>
          </Button>

          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSave}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      placeholder="Digite o título do post"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      placeholder="url-amigavel-do-post"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Resumo</Label>
                    <Textarea
                      id="excerpt"
                      placeholder="Um breve resumo do post"
                      rows={3}
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Conteúdo</Label>
                    <Tabs defaultValue="write">
                      <TabsList className="mb-2">
                        <TabsTrigger value="write">Escrever</TabsTrigger>
                        <TabsTrigger value="preview">Visualizar</TabsTrigger>
                      </TabsList>
                      <TabsContent value="write">
                        <Textarea
                          id="content"
                          placeholder="Conteúdo do post (suporta Markdown)"
                          rows={15}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          required
                          className="font-mono"
                        />
                      </TabsContent>
                      <TabsContent value="preview">
                        <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
                          {content ? (
                            <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, "<br />") }} />
                          ) : (
                            <p className="text-gray-400">
                              Nenhum conteúdo para visualizar. Comece a escrever para ver a prévia.
                            </p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Configurações do Post</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="vendas">Vendas</SelectItem>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="estrategia">Estratégia</SelectItem>
                      <SelectItem value="seo">SEO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverImage">Imagem de Capa</Label>
                  <Input
                    id="coverImage"
                    placeholder="URL da imagem de capa"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                  />
                  {coverImage && (
                    <div className="mt-2 border rounded-md overflow-hidden">
                      <img
                        src={coverImage || "/placeholder.svg"}
                        alt="Prévia da imagem de capa"
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=128&width=256"
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="published">Publicar</Label>
                    <p className="text-sm text-gray-500">Tornar o post visível no blog</p>
                  </div>
                  <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="featured">Destacar</Label>
                    <p className="text-sm text-gray-500">Mostrar na seção de destaques</p>
                  </div>
                  <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500">Criado em: {new Date(post.date).toLocaleDateString("pt-BR")}</p>
                  <p className="text-sm text-gray-500">Visualizações: {post.views.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
