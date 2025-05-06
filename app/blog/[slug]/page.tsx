"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Calendar,
  Clock,
  ChevronLeft,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  MessageCircle,
  ThumbsUp,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dados simulados para os posts do blog
const blogPosts = [
  {
    id: 1,
    slug: "como-automatizar-atendimento-ao-cliente",
    title: "Como Automatizar o Atendimento ao Cliente e Aumentar Vendas em 43%",
    excerpt:
      "Descubra como implementar um sistema de atendimento automatizado que funciona 24/7 e aumenta significativamente suas conversões.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-11-15",
    readTime: "8 min",
    author: {
      name: "Ricardo Oliveira",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "CEO & Fundador",
    },
    category: "Atendimento",
    content: `
      <h2>Introdução</h2>
      <p>No mundo acelerado dos negócios atuais, a automação do atendimento ao cliente não é mais um luxo, mas uma necessidade competitiva. Empresas que implementam sistemas de atendimento automatizado estão vendo aumentos significativos em suas taxas de conversão e satisfação do cliente.</p>
      
      <p>Neste artigo, vamos explorar como você pode implementar um sistema de atendimento automatizado eficaz que não apenas funciona 24 horas por dia, 7 dias por semana, mas também pode aumentar suas vendas em até 43%, como vimos com vários de nossos clientes.</p>
      
      <h2>Por que automatizar o atendimento ao cliente?</h2>
      <p>Antes de mergulharmos nos detalhes de implementação, vamos entender por que a automação do atendimento ao cliente é tão crucial:</p>
      
      <ul>
        <li><strong>Disponibilidade 24/7:</strong> Os clientes esperam respostas rápidas a qualquer hora do dia.</li>
        <li><strong>Escalabilidade:</strong> Atenda centenas de clientes simultaneamente sem aumentar sua equipe.</li>
        <li><strong>Consistência:</strong> Garanta que todos os clientes recebam o mesmo nível de atendimento de alta qualidade.</li>
        <li><strong>Redução de custos:</strong> Diminua significativamente os custos operacionais de atendimento.</li>
        <li><strong>Dados valiosos:</strong> Colete insights importantes sobre as necessidades e comportamentos dos clientes.</li>
      </ul>
      
      <h2>Estratégias de automação que realmente funcionam</h2>
      <p>Aqui estão as estratégias comprovadas que ajudaram nossos clientes a aumentar suas vendas em 43% em média:</p>
      
      <h3>1. Chatbots inteligentes com IA</h3>
      <p>Os chatbots modernos, alimentados por inteligência artificial, podem entender perguntas complexas e fornecer respostas personalizadas. Eles podem:</p>
      
      <ul>
        <li>Responder perguntas frequentes sobre produtos e serviços</li>
        <li>Ajudar os clientes a encontrar os produtos certos</li>
        <li>Processar pedidos e pagamentos</li>
        <li>Coletar informações de contato para follow-up</li>
      </ul>
      
      <p>Um de nossos clientes do setor de e-commerce implementou um chatbot que consegue responder a 78% das perguntas dos clientes sem intervenção humana, resultando em um aumento de 35% nas vendas fora do horário comercial.</p>
      
      <h3>2. Automação de follow-up</h3>
      <p>Muitas vendas são perdidas simplesmente porque não há um acompanhamento adequado. A automação de follow-up pode:</p>
      
      <ul>
        <li>Enviar e-mails personalizados com base no comportamento do cliente</li>
        <li>Reengajar clientes que abandonaram carrinhos</li>
        <li>Oferecer descontos ou incentivos no momento certo</li>
        <li>Manter sua marca na mente do cliente</li>
      </ul>
      
      <p>Uma clínica estética que implementou um sistema de follow-up automatizado viu um aumento de 28% nos agendamentos confirmados.</p>
      
      <h3>3. Integração multicanal</h3>
      <p>Os clientes esperam poder se comunicar com sua empresa através de vários canais. Um sistema de atendimento verdadeiramente eficaz deve integrar:</p>
      
      <ul>
        <li>WhatsApp Business</li>
        <li>Chat no site</li>
        <li>Redes sociais (Facebook Messenger, Instagram DM)</li>
        <li>E-mail</li>
        <li>SMS</li>
      </ul>
      
      <p>Uma agência de marketing digital que implementou atendimento integrado em todos esses canais viu um aumento de 52% na taxa de resposta dos clientes.</p>
      
      <h2>Como implementar um sistema de atendimento automatizado</h2>
      <p>Agora que entendemos os benefícios e estratégias, vamos ao passo a passo para implementação:</p>
      
      <h3>Passo 1: Mapeie a jornada do cliente</h3>
      <p>Antes de automatizar qualquer coisa, você precisa entender completamente a jornada do seu cliente:</p>
      
      <ul>
        <li>Quais são as perguntas mais frequentes em cada estágio?</li>
        <li>Quais são os principais pontos de atrito?</li>
        <li>Onde estão as oportunidades de conversão?</li>
      </ul>
      
      <h3>Passo 2: Escolha as ferramentas certas</h3>
      <p>Existem diversas ferramentas no mercado, mas é importante escolher aquelas que:</p>
      
      <ul>
        <li>Integram-se facilmente com seus sistemas existentes</li>
        <li>Oferecem personalização avançada</li>
        <li>Fornecem análises detalhadas</li>
        <li>Têm capacidade de aprendizado e melhoria contínua</li>
      </ul>
      
      <h3>Passo 3: Crie conteúdo personalizado</h3>
      <p>O sucesso do seu sistema de atendimento automatizado depende muito do conteúdo:</p>
      
      <ul>
        <li>Desenvolva respostas para as perguntas mais frequentes</li>
        <li>Crie scripts de conversação que soem naturais</li>
        <li>Prepare e-mails de follow-up personalizados</li>
        <li>Desenvolva gatilhos específicos para diferentes comportamentos</li>
      </ul>
      
      <h3>Passo 4: Implemente e teste</h3>
      <p>A implementação deve ser gradual:</p>
      
      <ul>
        <li>Comece com um canal (geralmente o chat do site)</li>
        <li>Teste extensivamente antes de lançar</li>
        <li>Treine sua equipe para trabalhar em conjunto com o sistema automatizado</li>
        <li>Estabeleça protocolos claros para transferência para atendentes humanos</li>
      </ul>
      
      <h3>Passo 5: Monitore, analise e otimize</h3>
      <p>A automação não é "configurar e esquecer":</p>
      
      <ul>
        <li>Monitore as métricas de desempenho regularmente</li>
        <li>Analise as conversas para identificar áreas de melhoria</li>
        <li>Atualize seu conteúdo com base no feedback e nas análises</li>
        <li>Continue expandindo para mais canais e funcionalidades</li>
      </ul>
      
      <h2>Casos de sucesso reais</h2>
      <p>Vamos examinar alguns casos reais de clientes que implementaram nossas soluções de atendimento automatizado:</p>
      
      <h3>E-commerce de Moda</h3>
      <p>A MegaFashion implementou um sistema de atendimento automatizado com foco em recuperação de carrinhos abandonados e sugestões de produtos. Resultados:</p>
      
      <ul>
        <li>Aumento de 43% nas vendas em 2 meses</li>
        <li>Taxa de recuperação de carrinhos de 68%</li>
        <li>ROI de 3x em 60 dias</li>
      </ul>
      
      <h3>Clínica Estética</h3>
      <p>A BeautyPlus automatizou seu sistema de agendamentos e lembretes. Resultados:</p>
      
      <ul>
        <li>Mais de 200 novos agendamentos realizados fora do horário comercial</li>
        <li>Redução de 70% nas faltas</li>
        <li>Aumento de 85% na satisfação dos clientes</li>
      </ul>
      
      <h2>Conclusão</h2>
      <p>A automação do atendimento ao cliente não é apenas uma tendência tecnológica, mas uma estratégia de negócios essencial que pode transformar significativamente seus resultados. Com uma implementação cuidadosa e uma abordagem centrada no cliente, você pode não apenas aumentar suas vendas em 43% ou mais, mas também melhorar a satisfação do cliente e reduzir custos operacionais.</p>
      
      <p>Lembre-se: a chave para o sucesso é encontrar o equilíbrio perfeito entre automação eficiente e toque humano quando necessário. Os clientes valorizam a conveniência e a rapidez da automação, mas também apreciam a empatia e a compreensão que só um atendente humano pode oferecer em situações mais complexas.</p>
      
      <p>Está pronto para transformar seu atendimento ao cliente? Entre em contato conosco para uma consultoria gratuita e descubra como podemos ajudar sua empresa a alcançar resultados semelhantes.</p>
    `,
    tags: ["Atendimento ao Cliente", "Automação", "Chatbots", "Vendas", "IA"],
    relatedPosts: [2, 4, 6],
  },
  {
    id: 2,
    slug: "inteligencia-artificial-pequenas-empresas",
    title: "Inteligência Artificial para Pequenas Empresas: Guia Completo",
    excerpt:
      "Um guia prático sobre como pequenas empresas podem implementar IA em seus processos sem grandes investimentos.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-11-08",
    readTime: "12 min",
    author: {
      name: "Juliana Santos",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "CTO",
    },
    category: "Inteligência Artificial",
    content: "Conteúdo completo do artigo sobre IA para pequenas empresas...",
    tags: ["Inteligência Artificial", "Pequenas Empresas", "Automação", "Produtividade", "Tecnologia"],
    relatedPosts: [1, 3, 5],
  },
  {
    id: 3,
    slug: "automacao-marketing-digital",
    title: "Automação de Marketing Digital: 7 Estratégias que Funcionam",
    excerpt:
      "Estratégias comprovadas para automatizar seu marketing digital e obter resultados consistentes sem esforço manual.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-10-25",
    readTime: "10 min",
    author: {
      name: "Fernando Costa",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Diretor de Operações",
    },
    category: "Marketing",
    content: "Conteúdo completo do artigo sobre automação de marketing digital...",
    tags: ["Marketing Digital", "Automação", "E-mail Marketing", "Redes Sociais", "Leads"],
    relatedPosts: [1, 2, 6],
  },
  {
    id: 4,
    slug: "chatbots-whatsapp-negocios",
    title: "Chatbots no WhatsApp: Como Implementar em Seu Negócio",
    excerpt: "Um guia passo a passo para implementar chatbots no WhatsApp e transformar seu atendimento e vendas.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-10-18",
    readTime: "9 min",
    author: {
      name: "Camila Almeida",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Diretora de Sucesso do Cliente",
    },
    category: "WhatsApp",
    content: "Conteúdo completo do artigo sobre chatbots no WhatsApp...",
    tags: ["WhatsApp", "Chatbots", "Atendimento", "Automação", "Vendas"],
    relatedPosts: [1, 3, 6],
  },
  {
    id: 5,
    slug: "transformacao-digital-empresas",
    title: "Transformação Digital: Por Onde Começar em 2024",
    excerpt: "Um roteiro prático para empresas que desejam iniciar ou acelerar sua jornada de transformação digital.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-10-10",
    readTime: "11 min",
    author: {
      name: "André Martins",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Especialista em Transformação Digital",
    },
    category: "Transformação Digital",
    content: "Conteúdo completo do artigo sobre transformação digital...",
    tags: ["Transformação Digital", "Inovação", "Tecnologia", "Estratégia", "Processos"],
    relatedPosts: [2, 3, 6],
  },
  {
    id: 6,
    slug: "tendencias-tecnologia-2024",
    title: "10 Tendências de Tecnologia que Dominarão 2024",
    excerpt:
      "Conheça as principais tendências tecnológicas que moldarão o mercado e impactarão os negócios no próximo ano.",
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "2023-09-28",
    readTime: "14 min",
    author: {
      name: "Mariana Silva",
      avatar: "/placeholder.svg?height=100&width=100",
      role: "Analista de Tendências",
    },
    category: "Tendências",
    content: "Conteúdo completo do artigo sobre tendências de tecnologia...",
    tags: ["Tendências", "Tecnologia", "Inovação", "Futuro", "Mercado"],
    relatedPosts: [2, 3, 5],
  },
]

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("artigo")
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    // Simular carregamento do post
    setIsLoading(true)

    // Encontrar o post pelo slug
    const foundPost = blogPosts.find((p) => p.slug === slug)

    if (foundPost) {
      setPost(foundPost)

      // Encontrar posts relacionados
      const related = foundPost.relatedPosts.map((id) => blogPosts.find((p) => p.id === id)).filter(Boolean)

      setRelatedPosts(related)
    }

    setIsLoading(false)
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
        <p className="text-gray-600 mb-6">O artigo que você está procurando não existe ou foi removido.</p>
        <Link href="/blog">
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Voltar para o Blog
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-6">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Voltar para o Blog
          </Link>
          <br />
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">{post.category}</Badge>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{post.title}</h1>
          <div className="flex items-center justify-center text-white/80">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="mr-4">{post.date}</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Cover Image */}
          <div className="relative h-64 md:h-96">
            <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="artigo" className="p-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="artigo"
                onClick={() => setActiveTab("artigo")}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Artigo
              </TabsTrigger>
              <TabsTrigger
                value="comentarios"
                onClick={() => setActiveTab("comentarios")}
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
              >
                Comentários
              </TabsTrigger>
            </TabsList>

            <TabsContent value="artigo" className="pt-6">
              {/* Author Info */}
              <div className="flex items-center mb-8">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  <p className="text-sm text-gray-500">{post.author.role}</p>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Tags */}
              <div className="mt-8">
                <h4 className="text-sm font-medium text-gray-500 mb-2">TAGS</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="bg-gray-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`flex items-center ${liked ? "text-blue-600" : "text-gray-600"}`}
                      onClick={() => setLiked(!liked)}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {liked ? "Curtido" : "Curtir"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center text-gray-600 ml-2"
                      onClick={() => setActiveTab("comentarios")}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Comentar
                    </Button>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Compartilhar:</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-700">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comentarios" className="pt-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Deixe seu comentário</h3>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Escreva seu comentário aqui..."
                />
                <div className="mt-4 flex justify-end">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Enviar comentário
                  </Button>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Comentários (0)</h3>
                  <div className="text-center py-8 text-gray-500">Seja o primeiro a comentar neste artigo!</div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Artigos Relacionados</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedPosts.map((relatedPost) => (
            <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={relatedPost.coverImage || "/placeholder.svg"}
                  alt={relatedPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{relatedPost.category}</Badge>
                </div>
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{relatedPost.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                <div className="flex items-center mb-2">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                    <Image
                      src={relatedPost.author.avatar || "/placeholder.svg"}
                      alt={relatedPost.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-gray-700">{relatedPost.author.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="mr-3">{relatedPost.date}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{relatedPost.readTime}</span>
                </div>
                <div className="mt-4">
                  <Link href={`/blog/${relatedPost.slug}`} className="w-full">
                    <Button variant="outline" className="w-full flex items-center justify-center">
                      Ler artigo
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button variant="outline" className="bg-white">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Ver todos os artigos
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Pronto para transformar seu negócio?</h2>
          <p className="text-white/80 mb-8">
            Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar resultados extraordinários
            com automação e inteligência artificial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-700 hover:bg-white/90">Agendar Consultoria</Button>
            <Button variant="outline" className="bg-purple-500 border-0 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm">
              Conhecer Soluções
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
