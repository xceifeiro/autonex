import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface RelatedPostsProps {
  posts: Array<{
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
    }
    category: string
  }>
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Artigos Relacionados</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
        ))}
      </div>
    </section>
  )
}
