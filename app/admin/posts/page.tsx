"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, MoreVertical, Edit, Trash2, Eye, ArrowUpDown } from "lucide-react"

// Importando os dados simulados do blog para garantir consistência
import { blogPosts } from "@/lib/blog-data"

// Convertendo os dados do blog para o formato usado no admin
const ADMIN_POSTS = blogPosts.map((post) => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  status: "published",
  category: post.category,
  date: post.date,
  views: Math.floor(Math.random() * 2000), // Simulando visualizações
}))

export default function AdminPostsPage() {
  const router = useRouter()
  const [posts, setPosts] = useState(ADMIN_POSTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [isLoading, setIsLoading] = useState(true)

  // Verificar autenticação no lado do cliente
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true"
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  // Função para ordenar os posts
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filtrar e ordenar os posts
  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortField) return 0

      const fieldA = a[sortField as keyof typeof a]
      const fieldB = b[sortField as keyof typeof b]

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortDirection === "asc" ? fieldA.localeCompare(fieldB) : fieldB.localeCompare(fieldA)
      }

      if (typeof fieldA === "number" && typeof fieldB === "number") {
        return sortDirection === "asc" ? fieldA - fieldB : fieldB - fieldA
      }

      return 0
    })

  // Função para excluir um post
  const handleDeletePost = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      setPosts(posts.filter((post) => post.id !== id))
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-500 mt-1">Gerencie os posts do seu blog</p>
        </div>
        <Link href="/admin/posts/new">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" /> Novo Post
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar posts..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">
                  <button className="flex items-center" onClick={() => handleSort("title")}>
                    Título
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center" onClick={() => handleSort("category")}>
                    Categoria
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center" onClick={() => handleSort("status")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center" onClick={() => handleSort("date")}>
                    Data
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead>
                  <button className="flex items-center" onClick={() => handleSort("views")}>
                    Visualizações
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhum post encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>
                      <Badge
                        variant={post.status === "published" ? "default" : "secondary"}
                        className={
                          post.status === "published"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {post.status === "published" ? "Publicado" : "Rascunho"}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>{post.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.slug}`} target="_blank">
                              <div className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                <span>Visualizar</span>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/posts/${post.id}/edit`}>
                              <div className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeletePost(post.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Excluir</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
