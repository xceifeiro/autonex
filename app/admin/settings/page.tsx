"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Save, Trash2, Plus, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Estados para as configurações
  const [generalSettings, setGeneralSettings] = useState({
    blogTitle: "AutoNex Blog",
    blogDescription: "Blog sobre automação, inteligência artificial e transformação digital",
    postsPerPage: "10",
    showAuthorInfo: true,
    enableComments: true,
  })

  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "AutoNex Blog | Automação e IA para Negócios",
    metaDescription: "Descubra como a automação e inteligência artificial podem transformar seu negócio",
    ogImage: "/images/og-image.jpg",
    twitterHandle: "@autonex",
    enableIndexing: true,
  })

  const [categories, setCategories] = useState([
    { id: 1, name: "Marketing", slug: "marketing", count: 5 },
    { id: 2, name: "Inteligência Artificial", slug: "inteligencia-artificial", count: 8 },
    { id: 3, name: "Automação", slug: "automacao", count: 12 },
    { id: 4, name: "Transformação Digital", slug: "transformacao-digital", count: 6 },
    { id: 5, name: "E-commerce", slug: "e-commerce", count: 3 },
  ])

  const [newCategory, setNewCategory] = useState("")

  // Verificar autenticação no lado do cliente
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true"
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  // Funções para atualizar as configurações
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSeoSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setGeneralSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSeoSwitchChange = (name: string, checked: boolean) => {
    setSeoSettings((prev) => ({ ...prev, [name]: checked }))
  }

  // Função para adicionar nova categoria
  const handleAddCategory = () => {
    if (!newCategory.trim()) return

    const slug = newCategory
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    const newCategoryObj = {
      id: categories.length + 1,
      name: newCategory,
      slug,
      count: 0,
    }

    setCategories([...categories, newCategoryObj])
    setNewCategory("")
  }

  // Função para remover categoria
  const handleRemoveCategory = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      setCategories(categories.filter((category) => category.id !== id))
    }
  }

  // Função para salvar as configurações
  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulando uma chamada de API
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Configurações salvas",
        description: "Suas configurações foram salvas com sucesso.",
      })
    }, 1000)
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-500 mt-1">Gerencie as configurações do seu blog</p>
        </div>
        <Button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Salvando...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Salvar Alterações
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-gray-100 p-1">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="appearance">Aparência</TabsTrigger>
        </TabsList>

        {/* Configurações Gerais */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>Configurações básicas do seu blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="blogTitle">Título do Blog</Label>
                <Input
                  id="blogTitle"
                  name="blogTitle"
                  value={generalSettings.blogTitle}
                  onChange={handleGeneralChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="blogDescription">Descrição do Blog</Label>
                <Textarea
                  id="blogDescription"
                  name="blogDescription"
                  value={generalSettings.blogDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postsPerPage">Posts por Página</Label>
                <Input
                  id="postsPerPage"
                  name="postsPerPage"
                  type="number"
                  value={generalSettings.postsPerPage}
                  onChange={handleGeneralChange}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="showAuthorInfo" className="block mb-1">
                      Mostrar Informações do Autor
                    </Label>
                    <p className="text-sm text-gray-500">Exibir informações do autor nos posts</p>
                  </div>
                  <Switch
                    id="showAuthorInfo"
                    checked={generalSettings.showAuthorInfo}
                    onCheckedChange={(checked) => handleSwitchChange("showAuthorInfo", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="enableComments" className="block mb-1">
                      Habilitar Comentários
                    </Label>
                    <p className="text-sm text-gray-500">Permitir que os leitores comentem nos posts</p>
                  </div>
                  <Switch
                    id="enableComments"
                    checked={generalSettings.enableComments}
                    onCheckedChange={(checked) => handleSwitchChange("enableComments", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de SEO */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de SEO</CardTitle>
              <CardDescription>Otimize seu blog para mecanismos de busca</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Título</Label>
                <Input id="metaTitle" name="metaTitle" value={seoSettings.metaTitle} onChange={handleSeoChange} />
                <p className="text-xs text-gray-500">Recomendado: 50-60 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Descrição</Label>
                <Textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={seoSettings.metaDescription}
                  onChange={handleSeoChange}
                  rows={3}
                />
                <p className="text-xs text-gray-500">Recomendado: 150-160 caracteres</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">Imagem Open Graph</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="ogImage"
                    name="ogImage"
                    value={seoSettings.ogImage}
                    onChange={handleSeoChange}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" /> Upload
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Recomendado: 1200x630 pixels</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitterHandle">Twitter Handle</Label>
                <Input
                  id="twitterHandle"
                  name="twitterHandle"
                  value={seoSettings.twitterHandle}
                  onChange={handleSeoChange}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableIndexing" className="block mb-1">
                    Permitir Indexação
                  </Label>
                  <p className="text-sm text-gray-500">Permitir que mecanismos de busca indexem seu blog</p>
                </div>
                <Switch
                  id="enableIndexing"
                  checked={seoSettings.enableIndexing}
                  onCheckedChange={(checked) => handleSeoSwitchChange("enableIndexing", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Gerenciamento de Categorias */}
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Categorias</CardTitle>
              <CardDescription>Adicione, edite ou remova categorias do blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Nova categoria..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddCategory}>
                  <Plus className="h-4 w-4 mr-2" /> Adicionar
                </Button>
              </div>

              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posts
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {categories.map((category) => (
                      <tr key={category.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{category.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{category.count}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCategory(category.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Configurações de Aparência */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Aparência</CardTitle>
              <CardDescription>Personalize a aparência do seu blog</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="block mb-2">Tema</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer bg-white shadow-sm">
                      <div className="w-full h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-md mb-2"></div>
                      <span className="text-sm font-medium">Padrão</span>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
                      <div className="w-full h-24 bg-gradient-to-r from-gray-800 to-gray-900 rounded-md mb-2"></div>
                      <span className="text-sm">Escuro</span>
                    </div>
                    <div className="border rounded-md p-4 flex flex-col items-center cursor-pointer">
                      <div className="w-full h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-md mb-2"></div>
                      <span className="text-sm">Natureza</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Cor Primária</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-md bg-blue-600"></div>
                    <Input id="primaryColor" defaultValue="#3B82F6" className="w-32" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Cor Secundária</Label>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-md bg-purple-600"></div>
                    <Input id="secondaryColor" defaultValue="#9333EA" className="w-32" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Fonte Principal</Label>
                  <select
                    id="fontFamily"
                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="inter">Inter</option>
                    <option value="roboto">Roboto</option>
                    <option value="opensans">Open Sans</option>
                    <option value="montserrat">Montserrat</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="darkMode" className="block mb-1">
                      Modo Escuro
                    </Label>
                    <p className="text-sm text-gray-500">Habilitar opção de modo escuro</p>
                  </div>
                  <Switch id="darkMode" defaultChecked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
