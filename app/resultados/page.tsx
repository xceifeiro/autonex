import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ChevronRight } from "lucide-react"

export default function Resultados() {
  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Resultados Reais
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça histórias de sucesso de empresas que transformaram seus negócios com nossas soluções de automação
          </p>
        </div>
      </section>

      {/* Case 1 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                E-commerce de Moda
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MegaFashion: +43% de Vendas em 2 Meses
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      43%
                    </p>
                    <p className="text-sm text-gray-600">Aumento em Vendas</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      68%
                    </p>
                    <p className="text-sm text-gray-600">Recuperação de Carrinhos</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      3x
                    </p>
                    <p className="text-sm text-gray-600">ROI em 60 dias</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">O Desafio</h3>
              <p className="text-gray-600 mb-4">
                A MegaFashion estava perdendo vendas devido a carrinhos abandonados e leads que esfriavam por falta de
                follow-up. A equipe pequena não conseguia dar conta do volume de atendimentos.
              </p>

              <h3 className="text-xl font-bold mb-3">Nossa Solução</h3>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">
                    Implementação de sistema de recuperação automática de carrinhos abandonados
                  </span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Chatbot para atendimento 24/7 integrado ao WhatsApp e site</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Sequência de e-mails automáticos para nutrição de leads</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Dashboard de vendas com alertas automáticos</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-3">Resultados</h3>
              <p className="text-gray-600 mb-6">
                Em apenas 2 meses, a MegaFashion aumentou suas vendas em 43%, com uma taxa de recuperação de carrinhos
                abandonados de 68%. O investimento se pagou 3x em apenas 60 dias.
              </p>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Cliente"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="italic text-gray-600">
                    "A automação transformou nosso negócio. Agora vendemos enquanto dormimos e nossa equipe pode focar
                    em estratégia e criação."
                  </p>
                  <p className="font-bold mt-1">Ana Silva, CEO da MegaFashion</p>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                Quero Resultados Semelhantes
              </Button>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Case MegaFashion"
                  width={600}
                  height={600}
                  className="rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case 2 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Case CreativeMinds"
                  width={600}
                  height={600}
                  className="rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Agência de Marketing
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CreativeMinds: 65% Menos Tempo em Tarefas Operacionais
              </h2>
              <div className="bg-gray-100 p-6 rounded-xl shadow-md mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      65%
                    </p>
                    <p className="text-sm text-gray-600">Redução de Tempo</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      32%
                    </p>
                    <p className="text-sm text-gray-600">Aumento em Clientes</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      0
                    </p>
                    <p className="text-sm text-gray-600">Relatórios Manuais</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">O Desafio</h3>
              <p className="text-gray-600 mb-4">
                A CreativeMinds gastava horas em tarefas repetitivas como relatórios de performance, agendamento de
                posts e gerenciamento de campanhas, deixando pouco tempo para estratégia.
              </p>

              <h3 className="text-xl font-bold mb-3">Nossa Solução</h3>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Sistema de relatórios automáticos para clientes</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Integração entre plataformas de marketing e CRM</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Automação de agendamento e publicação de conteúdo</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Dashboard centralizado de performance</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-3">Resultados</h3>
              <p className="text-gray-600 mb-6">
                A agência reduziu em 65% o tempo gasto em tarefas operacionais, conseguiu atender 32% mais clientes com
                a mesma equipe e eliminou completamente a necessidade de relatórios manuais.
              </p>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Cliente"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="italic text-gray-600">
                    "Nossa equipe agora foca em estratégia e criatividade enquanto os processos rodam sozinhos.
                    Conseguimos crescer sem precisar contratar."
                  </p>
                  <p className="font-bold mt-1">Carlos Mendes, Diretor da CreativeMinds</p>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                Quero Resultados Semelhantes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Case 3 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Clínica Estética
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BeautyPlus: 200+ Agendamentos Fora do Horário Comercial
              </h2>
              <div className="bg-gray-50 p-6 rounded-xl shadow-md mb-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      200+
                    </p>
                    <p className="text-sm text-gray-600">Novos Agendamentos</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      24/7
                    </p>
                    <p className="text-sm text-gray-600">Atendimento</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      85%
                    </p>
                    <p className="text-sm text-gray-600">Satisfação Cliente</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">O Desafio</h3>
              <p className="text-gray-600 mb-4">
                A BeautyPlus perdia clientes potenciais que tentavam agendar fora do horário comercial. A recepcionista
                não conseguia atender todas as ligações durante o expediente.
              </p>

              <h3 className="text-xl font-bold mb-3">Nossa Solução</h3>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Chatbot para WhatsApp e site com agendamento automático</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Sistema de lembretes automáticos para reduzir faltas</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Integração com agenda e sistema de pagamentos</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">Campanhas automáticas para clientes inativos</span>
                </li>
              </ul>

              <h3 className="text-xl font-bold mb-3">Resultados</h3>
              <p className="text-gray-600 mb-6">
                Em três meses, a clínica registrou mais de 200 novos agendamentos realizados fora do horário comercial,
                com 85% de satisfação dos clientes com o atendimento automatizado.
              </p>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt="Cliente"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="italic text-gray-600">
                    "O chatbot da AutoNex é um verdadeiro vendedor incansável. Atende 24h por dia e já converteu
                    centenas de agendamentos que teríamos perdido."
                  </p>
                  <p className="font-bold mt-1">Mariana Costa, Proprietária da BeautyPlus</p>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                Quero Resultados Semelhantes
              </Button>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="Case BeautyPlus"
                  width={600}
                  height={600}
                  className="rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mais Cases */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mais Histórias de Sucesso
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Conheça outros negócios que transformaram seus resultados com nossas soluções de automação
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
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Consultoria Financeira
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">FinancePro: +52% de Leads Qualificados</h3>
                <p className="text-gray-600 mb-4">
                  Implementação de landing page otimizada com formulários inteligentes e nutrição automática de leads.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">+52% em leads</span>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Ver case</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
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
                    Escola de Idiomas
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">GlobalSpeak: 28% Mais Matrículas</h3>
                <p className="text-gray-600 mb-4">
                  Campanhas de e-mail marketing automatizadas e chatbot para atendimento e pré-matrícula 24/7.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-bold">+28% em matrículas</span>
                  <div className="flex items-center text-purple-600 font-medium">
                    <span>Ver case</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
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
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Imobiliária</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">ImóvelCerto: 3x Mais Visitas Agendadas</h3>
                <p className="text-gray-600 mb-4">
                  Sistema de agendamento automático de visitas e qualificação de leads com chatbot inteligente.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">3x mais visitas</span>
                  <div className="flex items-center text-blue-600 font-medium">
                    <span>Ver case</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Quer Ser Nosso Próximo Case de Sucesso?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Agende uma consultoria gratuita e descubra como a automação pode transformar seus resultados
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-6 h-auto">
              Quero Automatizar Meu Negócio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
            >
              Ver Mais Cases
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
