"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "O que é preciso preparar para a consultoria?",
      answer:
        "Recomendamos que você tenha uma visão geral dos seus processos atuais, principais desafios e objetivos. Quanto mais informações você puder compartilhar, mais personalizada será nossa análise.",
    },
    {
      question: "A consultoria realmente é gratuita?",
      answer:
        "Sim, a consultoria inicial de 30 minutos é totalmente gratuita e sem compromisso. Nosso objetivo é entender seu negócio e mostrar como podemos ajudar antes de qualquer decisão de investimento.",
    },
    {
      question: "Como funciona a consultoria por videoconferência?",
      answer:
        "Após o agendamento, você receberá um e-mail com o link para a videoconferência (Google Meet ou Zoom). No horário marcado, basta clicar no link para iniciar a reunião com nosso consultor.",
    },
    {
      question: "Posso remarcar a consultoria se surgir um imprevisto?",
      answer:
        "Sim, você pode remarcar com até 4 horas de antecedência. Basta responder o e-mail de confirmação solicitando o reagendamento ou entrar em contato pelo WhatsApp informado no e-mail.",
    },
    {
      question: "O que acontece após a consultoria?",
      answer:
        "Após a consultoria, você receberá um relatório com as principais recomendações e próximos passos. Se houver interesse, apresentaremos propostas personalizadas para implementação das soluções identificadas.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-200 to-purple-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-900 max-w-3xl mx-auto">
            Respostas para as dúvidas mais comuns sobre nossa consultoria
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className="border-none shadow-md cursor-pointer"
              onClick={() => toggleIndex(index)}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                {activeIndex === index && (
                  <p className="text-gray-700 transition-all duration-300">{faq.answer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
