"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Mail, MapPin, Phone, MessageSquare } from "lucide-react"
import { Pricing } from "@/components/ui/pricing"

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    interesse: "",
    mensagem: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, interesse: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        empresa: "",
        interesse: "",
        mensagem: "",
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Estamos prontos para ajudar a automatizar seu negócio e impulsionar seus resultados
          </p>
        </div>
      </section>

      {/* Formulário e Informações */}
      <section className="py-20 bg-gradient-to-r from-blue-100 to-purple-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Fale Conosco
              </h2>
              <p className="text-gray-800 mb-8">
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas úteis. Estamos ansiosos
                para entender seu negócio e como podemos ajudar.
              </p>

              {isSubmitted ? (
                <Card className="border-green-100 bg-green-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white mb-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-green-700 mb-3">Mensagem Enviada com Sucesso!</h3>
                      <p className="text-green-600 mb-6">Obrigado pelo seu contato. Nossa equipe retornará em breve.</p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0"
                      >
                        Enviar Nova Mensagem
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="empresa">Empresa</Label>
                      <Input
                        id="empresa"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder="Nome da sua empresa"
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interesse">O que deseja automatizar?</Label>
                    <Select value={formData.interesse} onValueChange={handleSelectChange}>
                      <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vendas">Automação de Vendas</SelectItem>
                        <SelectItem value="atendimento">Atendimento Automatizado</SelectItem>
                        <SelectItem value="operacoes">Operações Inteligentes</SelectItem>
                        <SelectItem value="site">Site ou Landing Page</SelectItem>
                        <SelectItem value="marketing">Automação de Marketing</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem</Label>
                    <Textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      placeholder="Conte-nos mais sobre seu negócio e o que deseja automatizar"
                      rows={5}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 py-6 h-auto text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                  </Button>
                </form>
              )}
            </div>

            <div>
              <Card className="border-none shadow-xl h-full bg-white overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Informações de Contato
                  </h3>

                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Telefone</h4>
                        <p className="text-gray-600">+55 62 99320-4235</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">E-mail</h4>
                        <p className="text-gray-600">contato@autonextech.com.br</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-full mr-4">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Endereço</h4>
                        <p className="text-gray-600">
                          Rua Inglaterra, n° 108, Santa Isabel
                          <br />
                          Anápolis - GO
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-full mr-4">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">Horário de Atendimento</h4>
                        <p className="text-gray-600">
                          Segunda a Sexta: 9h às 18h
                          <br />
                          Sábado: 13h às 17h
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 space-y-4">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white 
                    border-0 flex items-center justify-center gap-2"
                    onClick={() => window.open("/consultoria#agendamento")}
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Agendar Demonstração</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 flex items-center justify-center gap-2"
                      onClick={() => window.open("https://api.whatsapp.com/send?phone=%205562993204235&text=%F0%9F%98%83+Ol%C3%A1+vim+atrav%C3%A9s+do+site%2C+gostaria+de+saber+mais+sobre+automa%C3%A7%C3%B5es...+%F0%9F%91%8B")}
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Conversar no WhatsApp</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
        <div className="rounded-xl overflow-hidden shadow-xl h-96 bg-gray-200 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d239.328333748761!2d-48.9458735247497!3d-16.30999468238024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ea413f7135c09%3A0xc36bb2fc556f877d!2sR.%20Inglaterra%20Q%2015%2C%20108%20-%20Vila%20Santa%20Isabel%2C%20An%C3%A1polis%20-%20GO%2C%2075083-325!5e0!3m2!1spt-BR!2sbr!4v1746518772312!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div className="flex items-center text-white">
                <MapPin className="h-6 w-6 mr-2" />
                <p>Rua Inglaterra, n° 108, Santa Isabel, Anápolis/GO</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Quanto tempo leva para implementar uma automação?</h3>
                <p className="text-gray-600">
                  O tempo de implementação varia conforme a complexidade do projeto. Automações simples podem ser
                  implementadas em 1-2 semanas, enquanto projetos mais complexos podem levar de 4-8 semanas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-500"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Preciso ter conhecimento técnico para usar as automações?</h3>
                <p className="text-gray-600">
                  Não! Nossas soluções são desenvolvidas pensando em usuários sem conhecimento técnico. Além disso,
                  oferecemos treinamento completo para sua equipe.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">As automações funcionam com os sistemas que já uso?</h3>
                <p className="text-gray-600">
                  Sim! Trabalhamos com as principais plataformas do mercado e desenvolvemos integrações personalizadas
                  quando necessário para conectar com seus sistemas atuais.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">Qual o investimento necessário para automatizar meu negócio?</h3>
                <p className="text-gray-600">
                  O investimento varia conforme as necessidades do seu negócio. Temos pacotes de serviços a partir de {Pricing("Plano_01")}.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
              variant="outline"
              className="text-gray-700 border-0 bg-white/90 hover:bg-white/80 text-lg px-8 py-6 h-auto"
              onClick={() => window.open("/consultoria#agendamento")}
            >
              agendar demonstração
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:text-white/80 text-lg px-8 py-6 h-auto"
              onClick={() => window.open("/solucoes")}
            >
              Conhecer Serviços da AutoNex
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
