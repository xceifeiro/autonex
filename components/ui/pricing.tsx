
export const planoValores = {
  Plano_01: "R$ 497",
  Plano_02: "R$ 1.197",
  Plano_03: "R$ 1.997",
  Plano_04: "Personalizado",
} as const;

export type PlanoVariant = keyof typeof planoValores;

export function Pricing(variant: PlanoVariant): string {
  return planoValores[variant];
}