// Simulação de um banco de dados para posts do blog
// Em produção, use um banco de dados real

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  author: {
    name: string
    avatar: string
  }
  category: string
  tags: string[]
  publishedAt: string
  updatedAt: string
  featured?: boolean
}

// Posts de exemplo
let posts: Post[] = [
  {
    id: "1",
    title: "Como a Inteligência Artificial está Transformando o Atendimento ao Cliente",
    slug: "como-a-inteligencia-artificial-esta-transformando-o-atendimento-ao-cliente",
    excerpt:
      "Descubra como empresas estão utilizando IA para melhorar a experiência do cliente e aumentar a eficiência operacional.",
    content: `
# Como a Inteligência Artificial está Transformando o Atendimento ao Cliente

A inteligência artificial (IA) está revolucionando a maneira como as empresas interagem com seus clientes. Com avanços em processamento de linguagem natural e aprendizado de máquina, os chatbots e assistentes virtuais estão se tornando cada vez mais sofisticados.

## Benefícios da IA no Atendimento

- **Disponibilidade 24/7**: Assistentes virtuais podem atender clientes a qualquer hora
- **Respostas instantâneas**: Redução no tempo de espera para o cliente
- **Personalização**: Análise de dados para oferecer experiências personalizadas
- **Escalabilidade**: Capacidade de lidar com múltiplos atendimentos simultaneamente

## Casos de Sucesso

Diversas empresas já estão colhendo os benefícios da implementação de IA no atendimento ao cliente. Bancos, varejistas e empresas de telecomunicações relatam aumento na satisfação do cliente e redução nos custos operacionais.

## O Futuro do Atendimento

A tendência é que a IA se torne ainda mais integrada aos processos de atendimento, com sistemas capazes de entender nuances emocionais e resolver problemas complexos sem intervenção humana.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    author: {
      name: "Ana Silva",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    category: "Tecnologia",
    tags: ["IA", "Atendimento", "Inovação"],
    publishedAt: "2023-10-15T10:00:00Z",
    updatedAt: "2023-10-15T10:00:00Z",
    featured: true,
  },
  {
    id: "2",
    title: "Estratégias de Marketing Digital para Pequenas Empresas",
    slug: "estrategias-de-marketing-digital-para-pequenas-empresas",
    excerpt: "Aprenda táticas eficientes de marketing digital que podem ser implementadas com orçamentos limitados.",
    content: `
# Estratégias de Marketing Digital para Pequenas Empresas

O marketing digital oferece oportunidades únicas para pequenas empresas competirem no mercado. Com estratégias bem planejadas, é possível alcançar resultados significativos mesmo com recursos limitados.

## Táticas Essenciais

- **SEO Local**: Otimize sua presença nos resultados de busca locais
- **Marketing de Conteúdo**: Crie conteúdo relevante para sua audiência
- **Redes Sociais**: Mantenha presença ativa nas plataformas relevantes para seu público
- **Email Marketing**: Construa relacionamentos duradouros com sua base de clientes

## Medindo Resultados

É fundamental acompanhar métricas como tráfego do site, taxa de conversão e engajamento nas redes sociais para ajustar suas estratégias conforme necessário.

## Automatização

Utilize ferramentas de automatização para otimizar seus esforços de marketing e focar no crescimento do negócio.
    `,
    coverImage: "/placeholder.svg?height=600&width=800",
    author: {
      name: "Carlos Mendes",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    category: "Marketing",
    tags: ["Marketing Digital", "Pequenas Empresas", "Estratégia"],
    publishedAt: "2023-09-28T14:30:00Z",
    updatedAt: "2023-09-30T09:15:00Z",
  },
]

// Funções para manipular posts
export async function getAllPosts(): Promise<Post[]> {
  // Simula um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...posts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return posts.find((post) => post.slug === slug) || null
}

export async function getPostById(id: string): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  return posts.find((post) => post.id === id) || null
}

export async function createPost(postData: Omit<Post, "id" | "publishedAt" | "updatedAt">): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const newPost: Post = {
    ...postData,
    id: Date.now().toString(),
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  posts.unshift(newPost)
  return newPost
}

export async function updatePost(id: string, postData: Partial<Post>): Promise<Post | null> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const postIndex = posts.findIndex((post) => post.id === id)
  if (postIndex === -1) return null

  const updatedPost = {
    ...posts[postIndex],
    ...postData,
    updatedAt: new Date().toISOString(),
  }

  posts[postIndex] = updatedPost
  return updatedPost
}

export async function deletePost(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const initialLength = posts.length
  posts = posts.filter((post) => post.id !== id)

  return posts.length < initialLength
}

// Categorias disponíveis
export const categories = [
  "Tecnologia",
  "Marketing",
  "Negócios",
  "Inovação",
  "Atendimento",
  "Automação",
  "Inteligência Artificial",
]
