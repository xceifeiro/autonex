import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface PostCardProps {
  post: {
    id: number
    slug: string
    title: string
    excerpt: string
    coverImage: string
    date: string
    readTime: string
    author: {
      name: string
      avatar: string
      role: string
    }
    category: string
  }
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  if (featured) {
    return (
      <Card className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-full">
              <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </div>
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">{post.category}</Badge>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{post.title}</h3>
              <p className="text-gray-600 mb-6">{post.excerpt}</p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={post.author.avatar || "/placeholder.svg"}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-3">{post.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
              <Link href={`/blog/${post.slug}`}>
                <Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Ler artigo completo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{post.category}</Badge>
        </div>
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        <div className="flex items-center mb-2">
          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm text-gray-700">{post.author.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-3">{post.date}</span>
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Button variant="outline" className="w-full flex items-center justify-center">
            Ler artigo
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
