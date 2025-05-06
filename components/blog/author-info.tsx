import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AuthorInfoProps {
  author: {
    name: string
    avatar: string
    role: string
    bio?: string
  }
  showBio?: boolean
}

export default function AuthorInfo({ author, showBio = false }: AuthorInfoProps) {
  return (
    <div className={`flex ${showBio ? "flex-col items-center text-center" : "items-center"}`}>
      <Avatar className={`${showBio ? "h-20 w-20 mb-4" : "h-12 w-12 mr-4"}`}>
        <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium text-gray-900">{author.name}</p>
        <p className="text-sm text-gray-500">{author.role}</p>
        {showBio && author.bio && <p className="mt-2 text-gray-600">{author.bio}</p>}
      </div>
    </div>
  )
}
