// components/ComponentLinkWhatsApp.tsx
"use client"

export default function ComponentLinkWhatsApp(message: string) {
  const phone = "5506293204235" // coloque o número com DDI e DDD sem espaços ou traços
  const encodedMessage = encodeURIComponent(message)
  const url = `https://wa.me/${phone}?text=${encodedMessage}`

  return () => {
    window.open(url, "_blank")
  }
}