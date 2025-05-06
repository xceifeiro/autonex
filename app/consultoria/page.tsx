"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  CalendarIcon,
  User,
  Briefcase,
  ArrowRight,
  CheckCheck,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { FAQSection } from "@/components/FAQsection"



export default function ConsultoriaPage() {

  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    segmento: "",
    funcionarios: "",
    desafios: "",
    data: undefined as Date | undefined,
    horario: "",
    preferencia: "video", // video, telefone, presencial
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDateChange = (date: Date | undefined) => {
    setFormData((prev) => ({ ...prev, data: date }))
  }

  const handlePreferenciaChange = (value: string) => {
    setFormData((prev) => ({ ...prev, preferencia: value }))
  }

  const nextStep = () => {
    window.scrollTo(0, 0)
    setStep(step + 1)
  }

  const prevStep = () => {
    window.scrollTo(0, 0)
    setStep(step - 1)
  }

  const isStepOneValid = () => {
    const { nome, email, telefone, empresa } = formData
    return nome !== "" && email !== "" && telefone !== "" && empresa !== ""
  }

  const isStepTwoValid = () => {
    const { segmento, funcionarios, desafios } = formData
    return segmento !== "" && funcionarios !== "" && desafios !== ""
  }

  const isStepThreeValid = () => {
    const { data, horario } = formData
    return data !== undefined && horario !== ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar dados para o webhook do n8n
      const webhookUrl = "https://your-n8n-webhook-url.com" // Substitua pela URL real do seu webhook n8n

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "consultoria_agendamento",
          data: {
            ...formData,
            data: formData.data ? format(formData.data, "yyyy-MM-dd") : null,
            timestamp: new Date().toISOString(),
          },
        }),
      }).catch((error) => {
        // Em caso de erro na requisição, apenas logamos o erro
        // mas continuamos o fluxo para não bloquear a experiência do usuário
        console.error("Erro ao enviar dados para n8n:", error)
      })

      // Mesmo se houver erro na requisição, continuamos o fluxo
      setIsSubmitted(true)
      setIsSubmitting(false)

      // Opcional: redirecionar após alguns segundos
      // setTimeout(() => {
      //   router.push('/consultoria/obrigado')
      // }, 5000)
    } catch (error) {
      console.error("Erro ao processar formulário:", error)
      setIsSubmitting(false)
    }
  }

  const horarios = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="flex justify-start items-start md:p-10">
                <Image
                    src="/images/logo-branca.png"
                    alt="Consultoria estratégica"
                    width={600}
                    height={600}
                    className="z-10 max-w-full h-auto"
                />
               </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Agende uma Consultoria Estratégica Gratuita
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Descubra como automatizar processos, aumentar vendas e reduzir custos operacionais com uma consultoria
                personalizada.
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-3">
                    <Clock className="h-5 w-5 text-blue-300" />
                  </div>
                  <span>30 minutos</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-3">
                    <CheckCircle className="h-5 w-5 text-green-300" />
                  </div>
                  <span>Totalmente gratuita</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-white/20 rounded-full p-2 mr-3">
                    <Calendar className="h-5 w-5 text-purple-300" />
                  </div>
                  <span>Horários flexíveis</span>
                </div>
              </div>
              <Button
                onClick={() => document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" })}
                size="lg"
                className="text-white hover:text-gray-200 bg-gradient-to-r from-blue-500 to-purple-500 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 text-lg px-8 py-6 h-auto"
              >
                Agendar Minha Consultoria
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              O Que Você Vai Receber
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Uma consultoria personalizada para identificar oportunidades de automação e crescimento no seu negócio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-8">
                <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Diagnóstico Personalizado</h3>
                <p className="text-gray-600">
                  Análise detalhada dos seus processos atuais e identificação de gargalos que podem ser resolvidos com
                  automação.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="p-8">
                <div className="bg-purple-100 text-purple-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <CheckCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Plano de Ação Prático</h3>
                <p className="text-gray-600">
                  Recomendações específicas e um roteiro claro para implementar soluções de automação que trarão
                  resultados rápidos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-8">
                <div className="bg-blue-100 text-blue-600 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <Calendar className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-4">Estimativa de Resultados</h3>
                <p className="text-gray-600">
                  Projeção de economia de tempo, redução de custos e aumento de receita que você pode esperar com as
                  automações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulário de Agendamento */}
      <section id="agendamento" className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                Agende Sua Consultoria Gratuita
              </h2>
              <p className="text-lg text-gray-300">
                Preencha o formulário abaixo para reservar seu horário com um de nossos especialistas
              </p>
            </div>

            {isSubmitted ? (
              <Card className="border-none shadow-xl bg-white">
                <CardContent className="p-12 text-center">
                  <div className="bg-green-100 text-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Agendamento Confirmado!</h3>
                  <p className="text-lg text-gray-700 mb-6">
                    Sua consultoria foi agendada com sucesso para{" "}
                    <span className="font-bold">
                      {formData.data ? format(formData.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : ""} às{" "}
                      {formData.horario}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-8">
                    Enviamos um e-mail de confirmação para <span className="font-medium">{formData.email}</span> com
                    todos os detalhes e instruções para a consultoria.
                  </p>
                  <div className="bg-gray-50 p-6 rounded-xl mb-8">
                    <h4 className="font-bold mb-3">Próximos passos:</h4>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Verifique seu e-mail e adicione o evento ao seu calendário</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Prepare suas dúvidas e objetivos para a consultoria</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>Nosso consultor entrará em contato no horário agendado</span>
                      </li>
                    </ul>
                  </div>
                  <Button
                    onClick={() => router.push("/")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Voltar para a Página Inicial
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-none shadow-xl bg-white">
                <CardContent className="p-8">
                  <div className="mb-8">
                    <div className="flex justify-between mb-6">
                      <div className={`flex items-center ${step >= 1 ? "text-blue-600" : "text-gray-400"}`}>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? "bg-blue-100" : "bg-gray-100"}`}
                        >
                          <User className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Seus dados</span>
                      </div>
                      <div className="w-16 h-[2px] mt-4 bg-gray-200"></div>
                      <div className={`flex items-center ${step >= 2 ? "text-blue-600" : "text-gray-400"}`}>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? "bg-blue-100" : "bg-gray-100"}`}
                        >
                          <Briefcase className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Seu negócio</span>
                      </div>
                      <div className="w-16 h-[2px] mt-4 bg-gray-200"></div>
                      <div className={`flex items-center ${step >= 3 ? "text-blue-600" : "text-gray-400"}`}>
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? "bg-blue-100" : "bg-gray-100"}`}
                        >
                          <Calendar className="h-4 w-4" />
                        </div>
                        <span className="font-medium">Agendamento</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {step === 1 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>

                        <div className="space-y-3">
                          <Label htmlFor="nome">Nome completo</Label>
                          <Input
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleInputChange}
                            placeholder="Seu nome completo"
                            className="border-gray-300 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="email">E-mail profissional</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="seu@email.com"
                            className="border-gray-300 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="telefone">Telefone</Label>
                          <Input
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleInputChange}
                            placeholder="(00) 00000-0000"
                            className="border-gray-300 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="empresa">Nome da empresa</Label>
                          <Input
                            id="empresa"
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            placeholder="Nome da sua empresa"
                            className="border-gray-300 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div className="flex justify-end mt-8">
                          <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!isStepOneValid()}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            Próximo
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-6">Sobre Seu Negócio</h3>

                        <div className="space-y-3">
                          <Label htmlFor="segmento">Segmento de atuação</Label>
                          <Select
                            value={formData.segmento}
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
                          <Label htmlFor="funcionarios">Número de funcionários</Label>
                          <Select
                            value={formData.funcionarios}
                            onValueChange={(value) => handleSelectChange("funcionarios", value)}
                          >
                            <SelectTrigger className="border-gray-300 focus:border-blue-500">
                              <SelectValue placeholder="Selecione o tamanho da empresa" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-5">1-5 funcionários</SelectItem>
                              <SelectItem value="6-20">6-20 funcionários</SelectItem>
                              <SelectItem value="21-50">21-50 funcionários</SelectItem>
                              <SelectItem value="51-200">51-200 funcionários</SelectItem>
                              <SelectItem value="201+">Mais de 200 funcionários</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="desafios">Principais desafios ou objetivos</Label>
                          <Textarea
                            id="desafios"
                            name="desafios"
                            value={formData.desafios}
                            onChange={handleInputChange}
                            placeholder="Descreva os principais desafios que você enfrenta ou o que gostaria de melhorar no seu negócio"
                            rows={4}
                            className="border-gray-300 focus:border-blue-500"
                            required
                          />
                        </div>

                        <div className="flex justify-between mt-8">
                          <Button
                            type="button"
                            onClick={prevStep}
                            variant="outline"
                            className="border-gray-300 text-gray-700"
                          >
                            Voltar
                          </Button>
                          <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!isStepTwoValid()}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            Próximo
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-6">Escolha a Data e Horário</h3>

                        <div className="space-y-3">
                          <Label>Data da consultoria</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal border-gray-300",
                                  !formData.data && "text-gray-500",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.data ? (
                                  format(formData.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={formData.data}
                                onSelect={handleDateChange}
                                initialFocus
                                disabled={
                                  (date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0)) || // Datas passadas
                                    date.getDay() === 0 || // Domingo
                                    date.getDay() === 6 // Sábado
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="horario">Horário disponível</Label>
                          <Select
                            value={formData.horario}
                            onValueChange={(value) => handleSelectChange("horario", value)}
                          >
                            <SelectTrigger className="border-gray-300 focus:border-blue-500">
                              <SelectValue placeholder="Selecione um horário" />
                            </SelectTrigger>
                            <SelectContent>
                              {horarios.map((horario) => (
                                <SelectItem key={horario} value={horario}>
                                  {horario}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-3">
                          <Label>Preferência de atendimento</Label>
                          <RadioGroup
                            value={formData.preferencia}
                            onValueChange={handlePreferenciaChange}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="video" id="video" />
                              <Label htmlFor="video" className="cursor-pointer">
                                Videoconferência (Google Meet ou Zoom)
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="telefone" id="telefone" />
                              <Label htmlFor="telefone" className="cursor-pointer">
                                Ligação telefônica
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="presencial" id="presencial" />
                              <Label htmlFor="presencial" className="cursor-pointer">
                                Presencial (Anápolis/GO)
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="flex justify-between mt-8">
                          <Button
                            type="button"
                            onClick={prevStep}
                            variant="outline"
                            className="border-gray-300 text-gray-700"
                          >
                            Voltar
                          </Button>
                          <Button
                            type="submit"
                            disabled={!isStepThreeValid() || isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          >
                            {isSubmitting ? "Agendando..." : "Confirmar Agendamento"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Depoimentos COMENTADO POR ENQUANTO 
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Veja como nossas consultorias têm ajudado empresas a transformar seus negócios
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
                    <h3 className="text-lg font-bold">Carlos Mendes</h3>
                    <p className="text-gray-600 text-sm">Agência de Marketing</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "A consultoria foi um divisor de águas para nossa agência. Identificamos processos que consumiam horas
                  da equipe e conseguimos automatizá-los completamente."
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
                    <h3 className="text-lg font-bold">Ana Oliveira</h3>
                    <p className="text-gray-600 text-sm">Clínica Estética</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "Implementamos o sistema de agendamento automático sugerido na consultoria e reduzimos as faltas em
                  70%. O retorno sobre o investimento foi quase imediato."
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
                    <h3 className="text-lg font-bold">Roberto Santos</h3>
                    <p className="text-gray-600 text-sm">E-commerce</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  "A consultoria nos ajudou a identificar que estávamos perdendo vendas por falta de atendimento fora do
                  horário comercial. Implementamos o chatbot e as vendas aumentaram 32%."
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
      <FAQSection />

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Transformar seu Negócio?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Agende sua consultoria gratuita agora e descubra como a automação pode impulsionar seus resultados
          </p>
          <Button
            onClick={() => document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
          >
            Agendar Minha Consultoria Gratuita
          </Button>
        </div>
      </section>
    </div>
  )
}
