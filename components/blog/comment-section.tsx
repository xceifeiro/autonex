"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThumbsUp, MessageCircle } from "lucide-react"

interface Comment {
  id: number
  author: {
    name: string
    avatar: string
  }
  content: string
  date: string
  likes: number
  isLiked?: boolean
}

interface CommentSectionProps {
  postId: number
  initialComments?: Comment[]
}

export default function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulação de envio de comentário
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now(),
        author: {
          name: "Usuário",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        content: newComment,
        date: new Date().toLocaleDateString("pt-BR"),
        likes: 0,
      }

      setComments([...comments, comment])
      setNewComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked,
          }
        }
        return comment
      }),
    )
  }

  return (
    <div className="space-y-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Deixe seu comentário</h3>

      <div className="space-y-4">
        <Textarea
          placeholder="Escreva seu comentário aqui..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex justify-end">
          <Button
            onClick={handleSubmitComment}
            disabled={isSubmitting || !newComment.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? "Enviando..." : "Enviar comentário"}
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Comentários ({comments.length})</h3>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Seja o primeiro a comentar neste artigo!</div>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{comment.author.name}</h4>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.content}</p>
                    <div className="mt-2 flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center ${comment.isLiked ? "text-blue-600" : "text-gray-600"}`}
                        onClick={() => handleLikeComment(comment.id)}
                      >
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {comment.likes > 0 && comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center text-gray-600 ml-2">
                        <MessageCircle className="mr-1 h-4 w-4" />
                        Responder
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
