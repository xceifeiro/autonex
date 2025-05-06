"use client";

import { usePathname } from "next/navigation";
import Header from "./header";

export default function ConditionalHeader() {
  const pathname = usePathname();

  // Verifica se é a página de demonstração
  const hiddenRoutes = ["/demonstracao", "/consultoria"];

if (hiddenRoutes.includes(pathname)) return null;

  return <Header />;
}
