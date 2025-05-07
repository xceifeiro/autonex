// app/layout.tsx
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoNex - Automação Empresarial para Crescimento",
  icons: { icon: "/images/favicon-v2.svg" },
  description:
    "Automatize suas vendas, atendimento e processos para que você foque no crescimento do seu negócio. Soluções personalizadas para empresas de todos os tamanhos.",
  keywords:
    "automação empresarial, automação de vendas, atendimento automático, produtividade, crescimento empresarial"
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ConditionalHeader />
          <main className="min-h-screen overflow-x-hidden">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
