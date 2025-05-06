import { type NextRequest, NextResponse } from "next/server"
import { getAllPosts, createPost } from "@/lib/blog"
import { getUser } from "@/lib/auth"

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const postData = await request.json()

    // Validação básica
    if (!postData.title || !postData.content || !postData.slug) {
      return NextResponse.json(
        { message: "Dados incompletos. Título, conteúdo e slug são obrigatórios." },
        { status: 400 },
      )
    }

    const newPost = await createPost(postData)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar post:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
