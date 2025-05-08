"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import ComponentLinkWhatsApp from "@/components/LinkWhats"


export default function Sobre() {
  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Sobre a AutoNex
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça nossa história e como ajudamos empresas a crescerem com automação inteligente
          </p>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nossa Missão
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                <span className="font-bold text-blue-600">
                  "Simplificar o crescimento dos nossos clientes com tecnologia acessível"
                </span>
              </p>
              <p className="text-gray-600 mb-6">
                Na AutoNex, acreditamos que a tecnologia deve ser uma aliada do crescimento empresarial, não um
                obstáculo. Nossa missão é democratizar o acesso à automação inteligente, permitindo que empresas de
                todos os portes possam crescer sem precisar aumentar proporcionalmente seus custos operacionais.
              </p>
              <p className="text-gray-600 mb-6">
                Trabalhamos para que nossos clientes possam focar no que realmente importa: estratégia, inovação e
                relacionamento com seus clientes, enquanto os processos operacionais funcionam no automático.
              </p>

              <h2 className="text-3xl font-bold mb-6 mt-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Nossa Visão
              </h2>
              <p className="text-gray-600 mb-6">
                Ser reconhecida como a principal parceira de automação para empresas no Brasil,
                transformando a maneira como os negócios operam e crescem através de soluções tecnológicas acessíveis e
                eficientes.
              </p>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/missao.svg"
                  alt="Missão da AutoNex"
                  width={500}
                  height={500}
                  className="max-w-[430px] md:max-w-[500px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nossos Valores
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Princípios que guiam nossas decisões e relacionamentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-full mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Inovação</h3>
                  <p className="text-gray-600">
                    Buscamos constantemente novas soluções e tecnologias para oferecer o melhor aos nossos clientes,
                    mantendo-nos na vanguarda da automação empresarial.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-500"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-4 rounded-full mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Agilidade</h3>
                  <p className="text-gray-600">
                    Valorizamos processos ágeis e eficientes, tanto internamente quanto nas soluções que desenvolvemos
                    para nossos clientes, garantindo resultados rápidos.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-full mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Parceria</h3>
                  <p className="text-gray-600">
                    Construímos relacionamentos duradouros com nossos clientes, baseados em confiança e transparência,
                    celebrando cada conquista como nossa.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossa História COMENTADA 
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nossa História
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">Como nasceu e evoluiu a AutoNex</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/placeholder.svg?height=500&width=600"
                  alt="História da AutoNex"
                  width={600}
                  height={500}
                  className="rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
            <div>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold mb-3">2018: O Início</h3>
                  <p className="text-gray-600">
                    A AutoNex nasceu da frustração de seus fundadores com processos manuais e ineficientes em pequenas
                    empresas. Começamos oferecendo soluções simples de automação para e-commerces.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
                  <h3 className="text-xl font-bold mb-3">2019: Expansão</h3>
                  <p className="text-gray-600">
                    Ampliamos nosso portfólio para incluir automação de marketing e atendimento, ajudando dezenas de
                    pequenas empresas a crescerem sem aumentar suas equipes.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                  <h3 className="text-xl font-bold mb-3">2020: Transformação Digital</h3>
                  <p className="text-gray-600">
                    Com a pandemia, aceleramos nossa missão de ajudar empresas a operarem remotamente, desenvolvendo
                    soluções de automação para trabalho à distância.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-600">
                  <h3 className="text-xl font-bold mb-3">2021-2022: Consolidação</h3>
                  <p className="text-gray-600">
                    Consolidamos nossa metodologia e expandimos para novos segmentos, como clínicas, agências e empresas
                    de serviços, com soluções cada vez mais personalizadas.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-gradient-to-r from-blue-600 to-purple-600">
                  <h3 className="text-xl font-bold mb-3">Hoje</h3>
                  <p className="text-gray-600">
                    Atualmente, a AutoNex é referência em automação para PMEs, com centenas de casos de sucesso e uma
                    equipe multidisciplinar apaixonada por transformar negócios através da tecnologia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Equipe 
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nossa Equipe
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conheça os especialistas por trás das soluções da AutoNex
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <div className="h-64 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Membro da equipe"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Ricardo Oliveira</h3>
                <p className="text-blue-600 font-medium mb-3">CEO & Fundador</p>
                <p className="text-gray-600 text-sm">
                  Especialista em automação empresarial com mais de 15 anos de experiência em tecnologia e gestão.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-500"></div>
              <div className="h-64 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Membro da equipe"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Juliana Santos</h3>
                <p className="text-blue-600 font-medium mb-3">CTO</p>
                <p className="text-gray-600 text-sm">
                  Engenheira de software com foco em integrações e desenvolvimento de soluções personalizadas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <div className="h-64 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Membro da equipe"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Fernando Costa</h3>
                <p className="text-blue-600 font-medium mb-3">Diretor de Operações</p>
                <p className="text-gray-600 text-sm">
                  Especialista em processos e implementação de automações com foco em resultados mensuráveis.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg overflow-hidden bg-white">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="h-64 overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=300"
                  alt="Membro da equipe"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold mb-1">Camila Almeida</h3>
                <p className="text-blue-600 font-medium mb-3">Diretora de Sucesso do Cliente</p>
                <p className="text-gray-600 text-sm">
                  Especialista em experiência do cliente e implementação de estratégias de automação.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              Conheça Toda a Equipe
            </Button>
          </div>
        </div>
      </section> */}

      {/* Parceiros 
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nossos Parceiros
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Empresas que confiam na AutoNex para soluções de automação
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex justify-center">
                <Image
                  src="/placeholder.svg?height=80&width=160"
                  alt={`Parceiro ${i}`}
                  width={160}
                  height={80}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Vamos Transformar Seu Negócio Juntos</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Agende uma consultoria gratuita e descubra como a automação pode impulsionar seus resultados
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="text-gray-700 border-0 bg-white/90 hover:bg-white/80 text-lg px-8 py-6 h-auto"
              onClick={() => window.location.href = "/full-digital"}
            >
              Conhecer Plano Full Digital
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-0 hover:text-white/80 bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-blue-600 text-lg px-8 py-6 h-auto"
              onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre automações...")}
            >
              Conhecer Mais Sobre Automações
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
