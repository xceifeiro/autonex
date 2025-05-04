"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Clock, DollarSign, Laptop, MessageSquare, Smartphone, Tablet } from "lucide-react"
import ParticlesBackground from "@/components/particles-background"
import WhatsappChat from "@/components/chat/whatsapp-chat"
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { LottiePlayer } from '@/components/LottiePlayer'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)
  const [successAnimation, setSuccessAnimation] = useState<object | null>(null)

  useEffect(() => {
    fetch('/lotties/lottie-01.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSuccessAnimation(data);
      })
      .catch((err) => console.error(err)); // Em caso de erro
  }, [])
  return (
    <div className="flex flex-col">
      {/* Hero Section with Lateral lottie */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
        <ParticlesBackground />
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center relative z-10">
          
          {/* Lottie Animation */}
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
              {/* Imagem COMENTADA
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Automação empresarial"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl relative z-10"
              />*/}
              <div>
                {successAnimation ? (
                  <Lottie
                    animationData={successAnimation}
                    className="min-w-[100px] max-w-[600px] max-h-[600px] relative z-10"
                    loop
                    autoplay
                  />
                ) : (
                  <p className="text-white">Carregando animação...</p>
                )}
              </div>
            </div>
          </div>
          {/* Texto Principal */}
          <div className="w-full md:w-1/2 md:pr-8 mb-10 md:mb-0 order-1 md:order-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Coloque sua empresa no modo automático e aumente seus resultados
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Automatizamos suas vendas, atendimento e processos para que você foque no crescimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-lg px-6 py-5 h-auto"
              >
                Quero Automatizar Meu Negócio
              </Button>
              <Button
                size="lg"
                onClick={openChat}
                className="bg-green-500 hover:bg-green-600 text-white border-0 text-lg px-6 py-5 h-auto"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Ver Demonstração
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements for futuristic effect */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-16 h-16 bg-blue-400 rounded-full opacity-10 blur-3xl animate-pulse"></div>
      </section>

      {/* Responsiveness Section 
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Funcionamento Perfeito em Qualquer Tela
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Layouts otimizados para mobile, tablet e desktop. Menus colapsáveis, imagens fluidas e CTAs sempre
              acessíveis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Smartphone className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Mobile</h3>
                  <p className="text-gray-600">
                    Experiência otimizada para smartphones, com navegação simplificada e carregamento rápido.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-500"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Tablet className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Tablet</h3>
                  <p className="text-gray-600">
                    Layout adaptado para aproveitar o espaço adicional, mantendo a facilidade de navegação.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Laptop className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Desktop</h3>
                  <p className="text-gray-600">
                    Experiência completa com todos os recursos e visualizações expandidas para telas maiores.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Benefícios da Automação
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Transforme seu negócio com soluções que aumentam resultados e reduzem esforço manual
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-gradient-to-r from-blue-900 to-purple-800 rounded-lg p-8 shadow-lg hover:shadow-x1 transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl text-white font-bold mb-4">Aumento de Vendas</h3>
              <p className="text-gray-300">
                Multiplique suas conversões com follow-ups automáticos e atendimento 24/7 que não deixa leads esfriarem.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700 font-medium">
                  Clientes relatam aumento médio de 43% nas vendas em apenas 3 meses.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-800 to-blue-700 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-white text-xl font-bold mb-4">Atendimento 24/7</h3>
              <p className="text-gray-300">
                Ofereça suporte instantâneo em qualquer horário sem aumentar sua equipe ou custos operacionais.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700 font-medium">Mais de 200 atendimentos mensais fora do horário comercial.</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-700 to-purple-600 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-white text-xl font-bold mb-4">Economia de Tempo</h3>
              <p className="text-gray-300">
                Reduza erros manuais e libere sua equipe de tarefas repetitivas para focar no que realmente importa.
              </p>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700 font-medium">
                  Redução média de 65% no tempo gasto em tarefas operacionais.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Botão de demonstração */}
        <div className="mt-12 text-center">
          <Button
            onClick={openChat}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-base sm:text-lg px-4 sm:px-6 py-4 sm:py-5 h-auto"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            <span className="whitespace-normal">Demonstração de Atendimento Automático</span>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-r from-gray-300 to-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Processo simples e eficiente para implementar automações que transformam seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg h-full border-t-4 border-blue-500">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Entendimento</h3>
                <p className="text-gray-600">
                  Analisamos seus processos atuais e identificamos oportunidades de automação
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg h-full border-t-4 border-blue-600">
                <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Planejamento</h3>
                <p className="text-gray-600">
                  Desenvolvemos uma estratégia personalizada com soluções sob medida para seu negócio
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg h-full border-t-4 border-purple-500">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Implantação</h3>
                <p className="text-gray-600">
                  Implementamos as automações com acompanhamento e treinamento da sua equipe
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                <ArrowRight className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl p-6 shadow-lg h-full border-t-4 border-purple-600">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  4
                </div>
                <h3 className="text-xl font-bold mb-3">Crescimento</h3>
                <p className="text-gray-600">
                  Seu negócio opera com mais eficiência, gerando mais resultados com menos esforço
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button
            onClick={openChat}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 text-base sm:text-lg px-4 sm:px-6 py-4 sm:py-5 h-auto"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            <span className="whitespace-normal">Demonstração de Atendimento Automático</span>
          </Button>
        </div>
      </section>

      {/* Mini Portfolio 
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nossos Cases de Sucesso
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conheça alguns dos resultados que entregamos para nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="h-56 overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=224&width=400"
                  alt="Case de sucesso"
                  width={400}
                  height={224}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">E-commerce</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Loja Virtual Automatizada</h3>
                <p className="text-gray-600 mb-4">
                  E-commerce com atendimento 24/7 e recuperação automática de carrinhos abandonados
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">+43% em vendas</span>
                  <Button onClick={openChat} variant="ghost" className="text-blue-600 hover:text-blue-800 p-0 h-auto">
                    <span>Ver demonstração</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="h-56 overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=224&width=400"
                  alt="Case de sucesso"
                  width={400}
                  height={224}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Agência Digital
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Agência Digital Otimizada</h3>
                <p className="text-gray-600 mb-4">
                  Automação de relatórios e integração de sistemas para gestão centralizada
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-bold">65% menos tempo operacional</span>
                  <Button
                    onClick={openChat}
                    variant="ghost"
                    className="text-purple-600 hover:text-purple-800 p-0 h-auto"
                  >
                    <span>Ver demonstração</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 bg-white">
              <div className="h-56 overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=224&width=400"
                  alt="Case de sucesso"
                  width={400}
                  height={224}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Clínica</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Clínica com Agenda Inteligente</h3>
                <p className="text-gray-600 mb-4">
                  Sistema de agendamento automático com lembretes e confirmações via WhatsApp
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">+200 agendamentos/mês</span>
                  <Button onClick={openChat} variant="ghost" className="text-blue-600 hover:text-blue-800 p-0 h-auto">
                    <span>Ver demonstração</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Automatizar seu Negócio?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Agende uma consultoria gratuita e descubra como a automação pode transformar seus resultados
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-900 hover:bg-gray-100 text-base sm:text-lg px-6 py-4 sm:py-5 h-auto"
            >
              Quero Automatizar Meu Negócio
            </Button>
            <Button
              size="lg"
              onClick={openChat}
              className="bg-green-500 hover:bg-green-600 text-white border-0 text-base sm:text-lg px-6 py-4 sm:py-5 h-auto"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Testar Atendimento Automático
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Chat Component */}
      <WhatsappChat
        webhookUrl="https://your-n8n-webhook-url.com"
        botName="AutoNex Assistente"
        initialMessage="👋 Olá! Sou o assistente virtual da AutoNex. Como posso ajudar você hoje? Experimente perguntar sobre automação, preços ou agendar uma demonstração."
        isOpen={isChatOpen}
        onClose={closeChat}
      />
    </div>
  )
}
