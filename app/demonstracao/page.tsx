"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, MessageSquare, CheckCheck, Smartphone, Globe, Instagram } from "lucide-react"
import DemonstracaoChat from "@/components/chat/demonstracao-chat"

export default function Demonstracao() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [businessInfo, setBusinessInfo] = useState({
    nome: "",
    empresa: "",
    segmento: "",
    desafios: "",
    canais: "whatsapp",
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Verifica se todos os campos obrigatórios estão preenchidos
    const { nome, empresa, segmento, desafios } = businessInfo
    setIsFormValid(nome !== "" && empresa !== "" && segmento !== "" && desafios !== "")
  }, [businessInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBusinessInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setBusinessInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar dados para o webhook do N8N
      const webhookUrl = "https://your-n8n-webhook-url.com" // Substitua pela URL real do seu webhook N8N

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "business_info",
          data: businessInfo,
          timestamp: new Date().toISOString(),
          source: "demonstracao_page",
        }),
      }).catch((error) => {
        // Em caso de erro na requisição, apenas logamos o erro
        // mas continuamos o fluxo para não bloquear a experiência do usuário
        console.error("Erro ao enviar dados para N8N:", error)
      })

      // Mesmo se houver erro na requisição, continuamos o fluxo
      setCurrentStep(1)
      setIsChatOpen(true)
    } catch (error) {
      console.error("Erro ao processar formulário:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const openChat = () => {
    if (currentStep === 0) {
      // Se estiver no passo 0, precisamos preencher o formulário primeiro
      const element = document.getElementById("questionario")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      setIsChatOpen(true)
    }
  }

  const closeChat = () => setIsChatOpen(false)

  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experimente o Atendimento Automático com IA
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Veja como a inteligência artificial pode transformar o atendimento do seu negócio em qualquer canal de
            comunicação
          </p>
          <Button
            onClick={openChat}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white border-0 text-lg px-8 py-6 h-auto"
          >
            <MessageSquare className="mr-2 h-6 w-6" />
            Iniciar Demonstração
          </Button>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Como Funciona a Demonstração
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Personalizamos a experiência para mostrar como a IA pode atender às necessidades específicas do seu
              negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Conte sobre seu negócio</h3>
              <p className="text-gray-600 text-center">
                Responda algumas perguntas sobre sua empresa, segmento e principais desafios de atendimento
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-purple-500">
              <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Experimente o chat</h3>
              <p className="text-gray-600 text-center">
                Interaja com nossa IA que simulará o atendimento personalizado para o seu tipo de negócio
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-green-500">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-center">Veja os resultados</h3>
              <p className="text-gray-600 text-center">
                Descubra como essa mesma experiência pode ser implementada nos canais de comunicação da sua empresa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Questionário */}
      <section id="questionario" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {currentStep === 0 ? "Conte-nos sobre seu negócio" : "Informações do seu negócio"}
              </h2>
              <p className="text-lg text-gray-700">
                {currentStep === 0
                  ? "Estas informações nos ajudarão a personalizar a demonstração para seu segmento"
                  : "Obrigado pelas informações! Agora você pode interagir com nosso assistente virtual."}
              </p>
            </div>

            {currentStep === 0 ? (
              <Card className="border-none shadow-xl">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="nome">Seu nome</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={businessInfo.nome}
                        onChange={handleChange}
                        placeholder="Digite seu nome"
                        className="border-gray-300 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="empresa">Nome da empresa</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        value={businessInfo.empresa}
                        onChange={handleChange}
                        placeholder="Digite o nome da sua empresa"
                        className="border-gray-300 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="segmento">Segmento de atuação</Label>
                      <Select
                        value={businessInfo.segmento}
                        onValueChange={(value) => handleSelectChange("segmento", value)}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="servicos">Prestação de Serviços</SelectItem>
                          <SelectItem value="saude">Saúde</SelectItem>
                          <SelectItem value="educacao">Educação</SelectItem>
                          <SelectItem value="alimentacao">Alimentação</SelectItem>
                          <SelectItem value="varejo">Varejo</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="desafios">Principais desafios de atendimento</Label>
                      <Textarea
                        id="desafios"
                        name="desafios"
                        value={businessInfo.desafios}
                        onChange={handleChange}
                        placeholder="Descreva os principais desafios que você enfrenta no atendimento aos clientes"
                        rows={4}
                        className="border-gray-300 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="canais">Canal de preferência</Label>
                      <Select
                        value={businessInfo.canais}
                        onValueChange={(value) => handleSelectChange("canais", value)}
                      >
                        <SelectTrigger className="border-gray-300 focus:border-blue-500">
                          <SelectValue placeholder="Selecione o canal principal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook Messenger</SelectItem>
                          <SelectItem value="site">Chat no Site</SelectItem>
                          <SelectItem value="telegram">Telegram</SelectItem>
                          <SelectItem value="email">E-mail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-6 h-auto text-lg"
                      disabled={!isFormValid || isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Iniciar Demonstração"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-none shadow-xl bg-white overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-center">Informações recebidas com sucesso!</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-gray-700">
                        <span className="font-medium">Nome:</span> {businessInfo.nome}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-gray-700">
                        <span className="font-medium">Empresa:</span> {businessInfo.empresa}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-gray-700">
                        <span className="font-medium">Segmento:</span>{" "}
                        {businessInfo.segmento === "ecommerce"
                          ? "E-commerce"
                          : businessInfo.segmento === "servicos"
                            ? "Prestação de Serviços"
                            : businessInfo.segmento === "saude"
                              ? "Saúde"
                              : businessInfo.segmento === "educacao"
                                ? "Educação"
                                : businessInfo.segmento === "alimentacao"
                                  ? "Alimentação"
                                  : businessInfo.segmento === "varejo"
                                    ? "Varejo"
                                    : "Outro"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCheck className="h-5 w-5 text-green-600 mr-2" />
                      <p className="text-gray-700">
                        <span className="font-medium">Canal preferido:</span>{" "}
                        {businessInfo.canais === "whatsapp"
                          ? "WhatsApp"
                          : businessInfo.canais === "instagram"
                            ? "Instagram"
                            : businessInfo.canais === "facebook"
                              ? "Facebook Messenger"
                              : businessInfo.canais === "site"
                                ? "Chat no Site"
                                : businessInfo.canais === "telegram"
                                  ? "Telegram"
                                  : "E-mail"}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={openChat}
                    className="w-full bg-green-500 hover:bg-green-600 text-white border-0 py-6 h-auto text-lg flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Abrir Chat de Demonstração
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Canais de Integração */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Integre com Qualquer Canal de Comunicação
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Nossa solução de IA pode ser implementada em todos os canais que você já utiliza para se comunicar com
              seus clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-green-500"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 p-4 rounded-full mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                      <path d="M9.5 13.5c.5 1 1.5 1.5 2.5 1.5s2-.5 2.5-1.5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">WhatsApp</h3>
                  <p className="text-gray-600">
                    Automatize o atendimento no canal mais utilizado pelos brasileiros, com respostas rápidas e
                    personalizadas
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-purple-500"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-4 rounded-full mb-6">
                    <Instagram className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Instagram</h3>
                  <p className="text-gray-600">
                    Responda DMs automaticamente, qualifique leads e direcione para vendedores quando necessário
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-blue-500"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Globe className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Chat no Site</h3>
                  <p className="text-gray-600">
                    Ofereça suporte 24/7 no seu site, com transferência para atendentes humanos quando necessário
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-blue-500"></div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-4 rounded-full mb-6">
                    <Smartphone className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Outros Canais</h3>
                  <p className="text-gray-600">
                    Telegram, Facebook Messenger, SMS, E-mail e outros canais de comunicação com seus clientes
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Funcionalidades da IA
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conheça os recursos avançados que nossa solução de IA oferece para transformar o atendimento do seu
              negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white rounded-xl p-8 shadow-lg flex">
              <div className="mr-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Respostas Inteligentes</h3>
                <p className="text-gray-600">
                  A IA entende o contexto das perguntas e fornece respostas precisas, mesmo para questões complexas
                  sobre produtos, serviços e políticas da empresa.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg flex">
              <div className="mr-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                    <path d="M10 9H8" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Coleta de Informações</h3>
                <p className="text-gray-600">
                  Captura dados importantes dos clientes de forma natural durante a conversa, como nome, e-mail,
                  telefone e preferências, alimentando seu CRM automaticamente.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg flex">
              <div className="mr-6">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Transferência Inteligente</h3>
                <p className="text-gray-600">
                  Identifica quando um atendente humano é necessário e transfere a conversa de forma suave, com todo o
                  histórico e contexto para o departamento correto.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg flex">
              <div className="mr-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Personalização Avançada</h3>
                <p className="text-gray-600">
                  Adapta o tom, linguagem e respostas de acordo com o perfil da sua empresa e do seu cliente, criando
                  uma experiência única e personalizada.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg flex">
              <div className="mr-6">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Análise de Sentimento</h3>
                <p className="text-gray-600">
                  Detecta emoções e intenções dos clientes, permitindo respostas mais empáticas e alertando quando há
                  insatisfação ou urgência na conversa.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg flex">
              <div className="mr-6">
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3">Segurança e Privacidade</h3>
                <p className="text-gray-600">
                  Protege dados sensíveis e segue todas as normas de privacidade, incluindo LGPD, com criptografia e
                  armazenamento seguro de informações dos clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Benefícios para o seu Negócio
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Descubra como a automação inteligente pode transformar o atendimento e impulsionar os resultados da sua
              empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Atendimento 24/7</h3>
                <p className="text-gray-600 mb-6">
                  Ofereça suporte aos seus clientes a qualquer hora, todos os dias da semana, sem custos adicionais de
                  equipe ou horas extras.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-700 font-medium">
                    "Aumentamos em 35% as conversões de vendas fora do horário comercial" - Cliente E-commerce
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Redução de Custos</h3>
                <p className="text-gray-600 mb-6">
                  Diminua em até 70% os custos com atendimento ao cliente, automatizando perguntas frequentes e
                  processos repetitivos.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-700 font-medium">
                    "Economizamos R$ 15.000 por mês em custos operacionais" - Cliente Varejo
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Aumento de Satisfação</h3>
                <p className="text-gray-600 mb-6">
                  Melhore a experiência do cliente com respostas rápidas e precisas, aumentando a satisfação e
                  fidelização.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700 font-medium">
                    "Nosso NPS aumentou de 67 para 89 em apenas 3 meses" - Cliente Saúde
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Escalabilidade</h3>
                <p className="text-gray-600 mb-6">
                  Atenda centenas ou milhares de clientes simultaneamente, sem perda de qualidade ou tempo de espera.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-yellow-700 font-medium">
                    "Conseguimos lidar com o aumento de 300% nas consultas durante a Black Friday" - Cliente E-commerce
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Dados Valiosos</h3>
                <p className="text-gray-600 mb-6">
                  Colete insights importantes sobre seus clientes, identificando padrões, necessidades e oportunidades
                  de melhoria.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-700 font-medium">
                    "Descobrimos 3 novos produtos para desenvolver a partir das conversas" - Cliente Serviços
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-500"></div>
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Equipe Mais Produtiva</h3>
                <p className="text-gray-600 mb-6">
                  Libere sua equipe para focar em tarefas estratégicas, enquanto a IA cuida das interações rotineiras.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-700 font-medium">
                    "Nossos atendentes agora fecham 40% mais vendas de alto valor" - Cliente Imobiliário
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Revolucionar seu Atendimento?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Experimente agora mesmo como a IA pode transformar a comunicação com seus clientes em qualquer canal
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              onClick={openChat}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white border-0 text-lg px-8 py-6 h-auto"
            >
              <MessageSquare className="mr-2 h-6 w-6" />
              Iniciar Demonstração
            </Button>
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              Falar com um Consultor
            </Button>
          </div>
        </div>
      </section>

      {/* Chat de Demonstração */}
      {currentStep === 1 && <DemonstracaoChat isOpen={isChatOpen} onClose={closeChat} businessInfo={businessInfo} />}
    </div>
  )
}
