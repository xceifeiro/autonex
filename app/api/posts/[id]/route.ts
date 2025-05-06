import { type NextRequest, NextResponse } from "next/server"
import { getPostById, updatePost, deletePost } from "@/lib/blog"
import { getUser } from "@/lib/auth"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const post = await getPostById(params.id)

    if (!post) {
      return NextResponse.json({ message: "Post não encontrado" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Erro ao buscar post:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser()

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const postData = await request.json()
    const updatedPost = await updatePost(params.id, postData)

    if (!updatedPost) {
      return NextResponse.json({ message: "Post não encontrado" }, { status: 404 })
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Erro ao atualizar post:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUser()

    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Não autorizado" }, { status: 401 })
    }

    const success = await deletePost(params.id)

    if (!success) {
      return NextResponse.json({ message: "Post não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ message: "Post excluído com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir post:", error)
    return NextResponse.json({ message: "Erro interno do servidor" }, { status: 500 })
  }
}
