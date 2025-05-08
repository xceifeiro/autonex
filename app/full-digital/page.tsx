"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowRight, CheckCircle, Bot, Sparkles, Globe, FileText, Instagram, MessageSquare, Calendar, Zap, Clock, BarChart3, CheckCheck, X, DollarSign,} from "lucide-react"
import { Pricing } from "@/components/ui/pricing"
import ComponentLinkWhatsApp from "@/components/LinkWhats"
import { useChat } from "@/components/chat-widget/context"


export default function FullDigitalPage() {
  const { openChat } = useChat()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <Badge className="mb-6 bg-white/20 text-white px-4 py-1 text-sm rounded-full backdrop-blur-sm">
                Solução Completa para Empresas
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
                Automatize seu Negócio com{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Inteligência
                </span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                Atendimento, Agenda, Conteúdo e Redes Sociais — Tudo Automatizado para sua Empresa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 text-lg px-6 py-5 h-auto"
                  onClick={() => window.open("https://api.whatsapp.com/send?phone=%205562993204235&text=%F0%9F%98%83+Ol%C3%A1+vim+atrav%C3%A9s+do+site%2C+gostaria+de+saber+mais+sobre+automa%C3%A7%C3%B5es...+%F0%9F%91%8B")}
            
                >
                  Quero Automatizar Meu Negócio
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={openChat}
                  className="bg-transparent border-white hover:text-white text-white hover:bg-white/10 text-lg px-6 py-5 h-auto"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Ver demonstração
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm p-8 rounded-2xl border border-white/10 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-600/30 p-3 rounded-full mb-3">
                      <Bot className="h-6 w-6 text-blue-200" />
                    </div>
                    <p className="text-white text-sm">Robô Atendente</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-600/30 p-3 rounded-full mb-3">
                      <Sparkles className="h-6 w-6 text-purple-200" />
                    </div>
                    <p className="text-white text-sm">Robô JAMES</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-600/30 p-3 rounded-full mb-3">
                      <Globe className="h-6 w-6 text-blue-200" />
                    </div>
                    <p className="text-white text-sm">Site Completo</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-600/30 p-3 rounded-full mb-3">
                      <FileText className="h-6 w-6 text-purple-200" />
                    </div>
                    <p className="text-white text-sm">Blog Automático</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-600/30 p-3 rounded-full mb-3">
                      <Instagram className="h-6 w-6 text-blue-200" />
                    </div>
                    <p className="text-white text-sm">Redes Sociais</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-600/30 p-3 rounded-full mb-3">
                      <Calendar className="h-6 w-6 text-purple-200" />
                    </div>
                    <p className="text-white text-sm">Agendamento</p>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-white/10 rounded-xl">
                  <p className="text-white text-center">
                    <span className="text-sm">A partir de</span>
                    <span className="text-3xl font-bold mx-2">{Pricing("Plano_01")}</span>
                    <span className="text-sm">/mês</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios do Combo */}
      <section className="py-20 bg-gray-200 border-none rounded-none shadow-xl z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-1 text-sm rounded-full">Solução Completa</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Benefícios do Autonex Full Digital
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Transforme sua presença digital e automatize processos com nossa solução integrada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-8">
                <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Bot className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Atendimento Inteligente com IA</h3>
                <p className="text-gray-600 mb-6">
                  Automatize o atendimento em todos os canais de comunicação da sua empresa com um assistente virtual
                  inteligente.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Integração com WhatsApp, Instagram e Facebook</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Qualificação automática de leads</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Transferência inteligente para atendentes humanos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="p-8">
                <div className="bg-purple-100 text-purple-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Robô JAMES</h3>
                <p className="text-gray-600 mb-6">
                  Seu assistente pessoal para gestão completa de agenda, finanças e tarefas do seu negócio.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Gerenciamento inteligente de agenda e compromissos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Controle financeiro com relatórios automáticos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Organização e priorização de tarefas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-8">
                <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Globe className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Site Completo</h3>
                <p className="text-gray-600 mb-6">
                  Desenvolvimento de um site profissional, responsivo e otimizado para conversões.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Design personalizado e responsivo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Otimização para SEO e conversões</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Integração com sistemas de pagamento e CRM</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="p-8">
                <div className="bg-purple-100 text-purple-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <FileText className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Blog Automatizado</h3>
                <p className="text-gray-600 mb-6">
                  Blog integrado ao seu site com produção de conteúdo automatizada por IA.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Geração de conteúdo relevante para seu público</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Otimização para palavras-chave e SEO</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Calendário editorial automatizado</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-8">
                <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Instagram className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Redes Sociais Automatizadas</h3>
                <p className="text-gray-600 mb-6">
                  Gestão completa das suas redes sociais com publicações automáticas integradas ao blog.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Publicação automática em múltiplas plataformas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Criação de conteúdo visual com IA</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Monitoramento e resposta a comentários</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="p-8">
                <div className="bg-purple-100 text-purple-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Zap className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Resultados Reais</h3>
                <p className="text-gray-600 mb-6">
                  Transforme sua presença digital e obtenha resultados mensuráveis para seu negócio.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Aumento médio de 43% nas vendas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Redução de até 70% em custos operacionais</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Aumento de 300% no tráfego orgânico</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-gray-200 z-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-1 text-sm rounded-full">
              Processo Simplificado
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Como Funciona
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Entenda como nosso sistema automatiza a criação e publicação de conteúdo para sua empresa
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="pt-6 text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Envio do Tema</h3>
                  <p className="text-gray-600">
                    Você envia o tema desejado para o conteúdo através do painel de controle ou WhatsApp
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="pt-6 text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Processamento pela IA</h3>
                  <p className="text-gray-600">
                    Nossa IA pesquisa, escreve o conteúdo, cria imagens e legendas otimizadas para SEO
                  </p>
                </div>
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg relative">
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="pt-6 text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Instagram className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Publicação Automática</h3>
                  <p className="text-gray-600">
                    O conteúdo é publicado automaticamente no seu blog e distribuído nas redes sociais
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 p-8 bg-white rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-center">Benefícios do Processo Automatizado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Economia de Tempo</h4>
                    <p className="text-gray-600">Reduza em até 95% o tempo gasto com criação de conteúdo</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Consistência</h4>
                    <p className="text-gray-600">Mantenha uma presença constante e profissional em todos os canais</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Redução de Custos</h4>
                    <p className="text-gray-600">Elimine a necessidade de contratar múltiplos profissionais</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Escalabilidade</h4>
                    <p className="text-gray-600">Aumente a produção de conteúdo sem aumentar custos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Planos e Preços */}
      <section className="py-20 bg-gradient-to-b from-gray-900 via-blue-900 to-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 px-4 py-1 text-sm rounded-full">Planos Flexíveis</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Planos e Preços
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Escolha o plano ideal para o tamanho e necessidades do seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl shadow-black  hover:shadow-black transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl">Essencial</CardTitle>
                <CardDescription>Ideal para pequenas empresas</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-gray-500 line-through">R$ 997/mês</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{Pricing("Plano_01")}</span>
                    <span className="text-gray-600 ml-2">/mês</span>
                  </div>
                  <span className="text-gray-600 ml-2">+ valor de Setup</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">2 conteúdos por semana</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Robô atendente com IA</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Site responsivo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Blog automatizado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Publicação em 2 redes sociais</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-gray-300 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-400">Robô JAMES</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre o plano Essencial.")}>
                  Contratar Agora
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-xl hover:shadow-2xl shadow-black  hover:shadow-black  transition-all duration-300 bg-white overflow-hidden relative scale-105 z-10">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                Mais Popular
              </div>
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl">Profissional</CardTitle>
                <CardDescription>Ideal para empresas em crescimento</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-gray-500 line-through">R$ 1.997/mês</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{Pricing("Plano_02")}</span>
                    <span className="text-gray-600 ml-2">/mês</span>
                  </div>
                  <span className="text-gray-600 ml-2">+ valor de Setup</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">4-6 conteúdos por semana</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Robô atendente com IA avançado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Site completo com área de membros</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Blog automatizado com SEO avançado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Publicação em 4 redes sociais</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Robô JAMES básico</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre o plano Profissional.")}>
                  Contratar Agora
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl shadow-black  hover:shadow-black transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardHeader className="pb-0">
                <CardTitle className="text-2xl">Empresarial</CardTitle>
                <CardDescription>Solução personalizada para sua empresa</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-6">
                  <p className="text-gray-500 line-through">R$ 3.197/mês</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">{Pricing("Plano_03")}</span>
                  </div>
                  <span className="text-gray-600 ml-2">+ valor á combinar por personalização</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Conteúdo diário personalizado</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Robô atendente com IA premium</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Site completo com e-commerce</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Blog automatizado com estratégia de conteúdo</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Publicação em todas as redes sociais</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCheck className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span className="text-gray-700">Robô JAMES completo</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre o plano Empresarial.")}>
                  Falar com Consultor
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Todos os planos incluem suporte técnico e atualizações gratuitas</p>
            <Button variant="outline" onClick={openChat} className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <MessageSquare className="mr-2 h-5 w-5" />
              Demonstração de Atendimento Automátizado
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos 
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-800 px-4 py-1 text-sm rounded-full">
              Clientes Satisfeitos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Veja como o Autonex Full Digital tem transformado negócios reais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="bg-blue-100 w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Avatar"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Mariana Costa</h3>
                    <p className="text-gray-600 text-sm">Clínica de Estética</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "O Autonex Full Digital transformou completamente nossa presença online. Nosso blog gera leads
                  qualificados todos os dias e o atendimento automático converteu 40% mais agendamentos."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      className={i > 0 ? "ml-1" : ""}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="bg-purple-100 w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Avatar"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Ricardo Mendes</h3>
                    <p className="text-gray-600 text-sm">Escritório de Advocacia</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "Economizamos mais de R$ 8.000 por mês em custos com marketing e ainda assim triplicamos nossa
                  presença online. O robô JAMES organizou toda nossa agenda e finanças."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      className={i > 0 ? "ml-1" : ""}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    <div className="bg-blue-100 w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=64&width=64"
                        alt="Avatar"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Carla Oliveira</h3>
                    <p className="text-gray-600 text-sm">E-commerce de Moda</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "Nosso ROI foi de 300% em apenas 3 meses. O conteúdo gerado automaticamente nos posicionou como
                  referência no setor e o atendimento 24/7 aumentou nossas vendas em 52%."
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      stroke="none"
                      className={i > 0 ? "ml-1" : ""}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 px-4 py-1 text-sm rounded-full">Dúvidas Frequentes</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Respostas para as dúvidas mais comuns sobre o Autonex Full Digital
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  Como funciona a criação automática de conteúdo?
                </AccordionTrigger>
                <AccordionContent>
                  Nossa tecnologia de IA analisa seu nicho de mercado, pesquisa as tendências atuais e cria conteúdo
                  relevante e otimizado para SEO. Você pode fornecer temas específicos ou deixar que nossa IA sugira os
                  melhores tópicos para seu público-alvo. Todo o processo é automatizado, desde a pesquisa até a
                  publicação no blog e redes sociais.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">Posso revisar o conteúdo antes da publicação?</AccordionTrigger>
                <AccordionContent>
                  Sim! Você pode configurar o sistema para enviar todo o conteúdo para aprovação antes da publicação.
                  Também oferecemos um modo híbrido, onde você pode revisar apenas os primeiros conteúdos até ganhar
                  confiança no sistema, e depois automatizar completamente o processo.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">O que é o Robô JAMES e como ele funciona?</AccordionTrigger>
                <AccordionContent>
                  O Robô JAMES é um assistente virtual que gerencia sua agenda, finanças e tarefas. Ele pode agendar
                  compromissos, enviar lembretes, organizar suas finanças com categorização automática de despesas e
                  receitas, gerar relatórios financeiros e ajudar na priorização e acompanhamento de tarefas. Tudo isso
                  integrado com seu calendário e sistemas existentes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  Quanto tempo leva para implementar a solução completa?
                </AccordionTrigger>
                <AccordionContent>
                  O tempo de implementação varia de acordo com a complexidade do seu negócio e o plano escolhido. Em
                  média, conseguimos ter o sistema básico funcionando em 7 dias, e a solução completa em até 30 dias.
                  Durante esse período, trabalhamos em estreita colaboração com sua equipe para garantir que tudo seja
                  personalizado de acordo com suas necessidades.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  É possível personalizar o plano para minhas necessidades específicas?
                </AccordionTrigger>
                <AccordionContent>
                  Absolutamente! Além dos planos padrão, oferecemos personalização completa para atender às necessidades
                  específicas do seu negócio. No plano Empresarial, podemos adicionar funcionalidades exclusivas,
                  integrações com sistemas existentes e desenvolver automações sob medida. Entre em contato com nossos
                  consultores para uma avaliação detalhada das suas necessidades.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  Existe fidelidade ou posso cancelar quando quiser?
                </AccordionTrigger>
                <AccordionContent>
                  Não exigimos contratos de fidelidade. Você pode cancelar seu plano a qualquer momento. No entanto,
                  oferecemos descontos especiais para contratos anuais. Nosso objetivo é que você permaneça conosco
                  pelos resultados que entregamos, não por obrigação contratual.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Chamada Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sua empresa não pode mais perder tempo com processos manuais
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Enquanto você lê isso, seus concorrentes já estão automatizando seus processos e conquistando mais clientes.
            Não fique para trás.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
            size="lg" 
            className="bg-white text-blue-900 hover:bg-gray-300 text-lg px-8 py-6 h-auto"
            onClick={() => window.open("https://api.whatsapp.com/send?phone=%205562993204235&text=%F0%9F%98%83+Ol%C3%A1+vim+atrav%C3%A9s+do+site%2C+gostaria+de+saber+mais+sobre+automa%C3%A7%C3%B5es...+%F0%9F%91%8B")}
            >
            Quero Automatizar Agora
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={openChat}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:text-white/90 text-lg px-8 py-6 h-auto border-0"
            >
              <MessageSquare 
              className="mr-2 h-5 w-5"
              onClick={openChat} />
              Ver demonstração
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
