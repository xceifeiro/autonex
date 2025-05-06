"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewPostPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    featured: false,
    status: "draft",
  })

  // Verificar autenticação no lado do cliente
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true"
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  // Gerar slug a partir do título
  useEffect(() => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.title])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Simulação de salvamento - em produção, isso seria uma chamada de API real
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirecionar para a lista de posts
      router.push("/admin/posts")
    } catch (error) {
      console.error("Erro ao salvar post:", error)
      alert("Ocorreu um erro ao salvar o post. Tente novamente.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center mb-8">
        <Link href="/admin/posts">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <div className="ml-4">
          <h1 className="text-3xl font-bold text-gray-900">Novo Post</h1>
          <p className="text-gray-500 mt-1">Crie um novo post para o blog</p>
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e, formData.status === "draft")}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Conteúdo</CardTitle>
                <CardDescription>Informações principais do post</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Digite o título do post"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="url-do-post"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Resumo</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    placeholder="Breve resumo do post"
                    rows={3}
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
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Conteúdo do post em Markdown"
                        rows={15}
                        className="font-mono"
                      />
                    </TabsContent>
                    <TabsContent value="preview">
                      <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
                        {formData.content ? (
                          <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                        ) : (
                          <p className="text-gray-400">A visualização do conteúdo aparecerá aqui</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publicação</CardTitle>
                <CardDescription>Configurações de publicação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Rascunho</SelectItem>
                      <SelectItem value="published">Publicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="SEO">SEO</SelectItem>
                      <SelectItem value="E-commerce">E-commerce</SelectItem>
                      <SelectItem value="Conteúdo">Conteúdo</SelectItem>
                      <SelectItem value="Redes Sociais">Redes Sociais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Destacar post</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={(e) => handleSubmit(e, true)} disabled={isSaving}>
                  Salvar rascunho
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isSaving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Salvando..." : "Publicar"}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO</CardTitle>
                <CardDescription>Otimização para mecanismos de busca</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Título SEO</Label>
                  <Input id="metaTitle" placeholder="Título para SEO" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Descrição SEO</Label>
                  <Textarea id="metaDescription" placeholder="Descrição para SEO" rows={3} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
