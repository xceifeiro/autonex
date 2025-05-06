import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface CategoryBadgeProps {
  category: string
  href?: string
  variant?: "default" | "outline" | "secondary" | "destructive"
  size?: "default" | "sm" | "lg"
}

export default function CategoryBadge({ category, href, variant = "default", size = "default" }: CategoryBadgeProps) {
  const baseClasses = "bg-blue-100 text-blue-800 hover:bg-blue-200"

  if (href) {
    return (
      <Link href={href}>
        <Badge variant={variant} className={baseClasses}>
          {category}
        </Badge>
      </Link>
    )
  }

  return (
    <Badge variant={variant} className={baseClasses}>
      {category}
    </Badge>
  )
}
