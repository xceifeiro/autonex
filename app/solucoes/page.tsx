"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BarChart2, Bot, MousePointer, Smartphone, Zap, Mail, TrendingUpDown, ShoppingCart, MessageCircleReply, CircleFadingPlus, UserCheck,
  Workflow, OctagonAlert, Network, CircleDollarSign, FileUser, WalletCards, ContactRound
} from "lucide-react"
import ComponentLinkWhatsApp from "@/components/LinkWhats"

export default function Solucoes() {
  return (
    <div className="flex flex-col pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Nossas Soluções
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Soluções personalizadas de automação para impulsionar seu negócio e reduzir trabalho manual
          </p>
        </div>
      </section>

      {/* Automação de Vendas */}
      <section id="vendas" className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Automação de Vendas
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Venda Enquanto Dorme
              </h2>
              <p className="text-gray-600 mb-6">
                Transforme seu processo de vendas com automações inteligentes que captam, nutrem e convertem leads 24
                horas por dia, 7 dias por semana.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full mr-3">
                    <Zap className="h-5 w-5" />
                  </div>
                  <span>Captação automática de leads qualificados</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full mr-3">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>Envio de e-mails e mensagens personalizadas</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full mr-3">
                    <TrendingUpDown className="h-5 w-5" />
                  </div>
                  <span>Follow-ups inteligentes que não deixam leads esfriarem</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full mr-3">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <span>Recuperação de carrinhos abandonados</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-md mb-6">
                {/* Depoimento Comentado}
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Loja Virtual MegaFashion</h4>
                    <p className="text-sm text-gray-600">E-commerce de Moda</p>
                  </div>
                </div>
                */}
                <p className="text-gray-600 italic text-sm">
                  "Aumente suas vendas com um processo automático e eficiente, que não deixa nenhum Lead esfriar."
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre automações para processo de Vendas...")}>
                Quero Automatizar Minhas Vendas
              </Button>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/sales.svg"
                  alt="Automação de vendas"
                  width={500}
                  height={500}
                  className="max-w-[500px] rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Divisor de Seção */}
      <div className="relative h-10 md:h-10">
        <div className="absolute w-full h-10 md:h-10 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-current text-white"
            ></path>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 to-purple-500/60 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Atendimento Automatizado */}
      <section id="atendimento" className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/chat-bot.svg"
                  alt="Atendimento automatizado"
                  width={500}
                  height={500}
                  className="max-w-[500px] rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Atendimento Automatizado
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Atenda 24/7 Sem Aumentar Sua Equipe
              </h2>
              <p className="text-gray-600 mb-6">
                Ofereça suporte instantâneo e qualificado em qualquer horário com chatbots inteligentes e sistemas de
                atendimento automatizado.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-2 rounded-full mr-3">
                    <Bot className="h-5 w-5" />
                  </div>
                  <span>Chatbots humanizados para WhatsApp e site</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-2 rounded-full mr-3">
                    <MessageCircleReply className="h-5 w-5" />
                  </div>
                  <span>Respostas rápidas para dúvidas frequentes</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-2 rounded-full mr-3">
                    <CircleFadingPlus className="h-5 w-5" />
                  </div>
                  <span>Integração com WhatsApp, Instagram e Facebook</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-500 text-white p-2 rounded-full mr-3">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <span>Transferência inteligente para atendentes humanos</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-md mb-6">
                {/* Depoimento Comentado}
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Loja Virtual MegaFashion</h4>
                    <p className="text-sm text-gray-600">E-commerce de Moda</p>
                  </div>
                </div>
                */}
                <p className="text-gray-600 italic text-sm">
                  "Um atendente para seu négocio com um chatbot humanizado que responde 24/7."
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre atendimento automático...")}>
                Quero Automatizar Meu Atendimento
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Divisor de Seção */}
      <div className="relative h-10 md:h-10">
        <div className="absolute w-full h-10 md:h-10 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-current text-white"
            ></path>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 to-purple-500/60 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Operações Inteligentes */}
      <section id="operacoes" className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Operações Inteligentes
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Reduza Trabalho Manual pela Metade
              </h2>
              <p className="text-gray-600 mb-6">
                Automatize processos operacionais repetitivos e libere sua equipe para focar no que realmente importa:
                estratégia e crescimento.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full mr-3">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <span>Relatórios automáticos de desempenho</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full mr-3">
                    <Workflow className="h-5 w-5" />
                  </div>
                  <span>Integração entre sistemas e plataformas</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full mr-3">
                    <OctagonAlert className="h-5 w-5" />
                  </div>
                  <span>Alertas e monitoramentos automáticos</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full mr-3">
                    <Network className="h-5 w-5" />
                  </div>
                  <span>Automação de tarefas administrativas</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-md mb-6">
                {/* Depoimento Comentado}
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Loja Virtual MegaFashion</h4>
                    <p className="text-sm text-gray-600">E-commerce de Moda</p>
                  </div>
                </div>
                */}
                <p className="text-gray-600 italic text-sm">
                  "Organize e separe suas tarefas com um processo automático e eficiente, que não deixa nada passar."
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre automações de processos e operações...")}>
                Quero Automatizar Minhas Operações
              </Button>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/work.svg"
                  alt="Operações inteligentes"
                  width={500}
                  height={500}
                  className="max-w-[500px] rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Divisor de Seção */}
      <div className="relative h-10 md:h-10">
        <div className="absolute w-full h-10 md:h-10 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-current text-white"
            ></path>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 to-purple-500/60 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Sites e Landing Pages */}
      <section id="sites" className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/site.svg"
                  alt="Sites e landing pages"
                  width={500}
                  height={500}
                  className="max-w-[500px] rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Sites e Landing Pages
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sites que Vendem por Você
              </h2>
              <p className="text-gray-600 mb-6">
                Desenvolvimento de sites e landing pages otimizados para conversão, com automações integradas que captam
                leads 24/7.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full mr-3">
                    <MousePointer className="h-5 w-5" />
                  </div>
                  <span>Sites responsivos e otimizados para SEO</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full mr-3">
                    <CircleDollarSign className="h-5 w-5" />
                  </div>
                  <span>Landing pages focadas em conversão</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full mr-3">
                    <FileUser className="h-5 w-5" />
                  </div>
                  <span>Formulários inteligentes com automação</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-full mr-3">
                    <WalletCards className="h-5 w-5" />
                  </div>
                  <span>Integração com sistemas de pagamento</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-md mb-6">
                {/* Depoimento Comentado}
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Loja Virtual MegaFashion</h4>
                    <p className="text-sm text-gray-600">E-commerce de Moda</p>
                  </div>
                </div>
                */}
                <p className="text-gray-600 italic text-sm">
                  "Sites feitos para converter, com integrações, design inovador e sistemas de gestão."
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre Sites e Landing Pages...")}>
                Quero um Site que Converte
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Divisor de Seção */}
      <div className="relative h-10 md:h-10">
        <div className="absolute w-full h-10 md:h-10 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
              className="fill-current text-white"
            ></path>
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 to-purple-500/60 backdrop-blur-sm"></div>
        </div>
      </div>

      {/* Automação de Marketing */}
      <section id="marketing" className="py-20 bg-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Automação de Marketing
              </div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Marketing que Trabalha Sozinho
              </h2>
              <p className="text-gray-600 mb-6">
                Automatize suas campanhas de marketing para manter presença constante e nutrir leads até a conversão,
                sem esforço manual.
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full mr-3">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <span>Agendamento de postagens em redes sociais</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full mr-3">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span>Campanhas de e-mail marketing automatizadas</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full mr-3">
                    <ContactRound className="h-5 w-5" />
                  </div>
                  <span>Nutrição de leads com conteúdo personalizado</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-2 rounded-full mr-3">
                    <BarChart2 className="h-5 w-5" />
                  </div>
                  <span>Análise automática de resultados de campanhas</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-md mb-6">
                {/* Depoimento Comentado}
                <div className="flex items-center mb-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <Image
                      src="/placeholder.svg?height=48&width=48"
                      alt="Cliente"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Loja Virtual MegaFashion</h4>
                    <p className="text-sm text-gray-600">E-commerce de Moda</p>
                  </div>
                </div>
                */}
                <p className="text-gray-600 italic text-sm">
                  "Automatizar o processo de marketing é a chave para aumentar a eficiência e reduzir custos."
                </p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              onClick={ComponentLinkWhatsApp("Olá, vim através do site e gostaria de saber mais sobre automações de Marketing...")}
              >
                Quero Automatizar Meu Marketing
              </Button>
            </div>
            <div>
              <div className="relative">
                <div className="absolute -top-5 -left-5 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-5 -right-5 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
                <Image
                  src="/marketing.svg"
                  alt="Automação de marketing"
                  width={500}
                  height={500}
                  className="max-w-[500px] p-8 rounded-xl shadow-xl relative z-10"
                />
              </div>
            </div>
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
