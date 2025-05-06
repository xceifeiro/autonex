"use client"

import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  // Encode the URL and title for sharing
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  // Share URLs
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`

  // Handle share button click
  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  // Handle native share API if available
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          url: url,
        })
        .catch((error) => console.log("Error sharing:", error))
    }
  }

  return (
    <div className="flex items-center">
      <span className="text-sm text-gray-500 mr-2">Compartilhar:</span>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => handleShare(facebookUrl)}>
        <Facebook className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400" onClick={() => handleShare(twitterUrl)}>
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-700" onClick={() => handleShare(linkedinUrl)}>
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600" onClick={handleNativeShare}>
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
