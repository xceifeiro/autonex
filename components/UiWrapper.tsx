"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Importa o hook useRouter para navegação

type UiWrapperProps = {
  type: "button" | "input" | "select";
  label?: string;
  class?: string;
  placeholder?: string;
  options?: string[];
  value?: string;
  action?: string;
  redirectTo?: string; // Propriedade para o redirecionamento
};

export default function UiWrapper(props: UiWrapperProps) {
  const { type, label, class: className, placeholder, options = [], value, action, redirectTo } = props;
  const router = useRouter(); // Instanciamos o hook

  const handleAction = (eventType: "click" | "change", e: any) => {
    switch (action) {
      case "enviarFormulario":
        console.log("Ação: enviar formulário");
        // Lógica do envio do formulário aqui
        break;

      case "mostrarAlerta":
        alert("Você clicou!");
        break;

      case "logarValor":
        console.log("Valor:", e.target?.value);
        break;

      case "redirecionar":
        if (redirectTo) {
          router.push(redirectTo); // Realiza o redirecionamento para a URL
        }
        break;

      default:
        console.warn("Ação não reconhecida:", action);
    }
  };

  switch (type) {
    case "button":
      return (
        <button className={className} onClick={(e) => handleAction("click", e)}>
          {label}
        </button>
      );

    case "input":
      return (
        <input
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleAction("change", e)}
        />
      );

    case "select":
      return (
        <select
          className={className}
          value={value}
          onChange={(e) => handleAction("change", e)}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );

    default:
      return null;
  }
}
