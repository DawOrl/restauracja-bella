/** Minimalne łączenie klas (bez zależności). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Formatowanie ceny w PLN, np. 44 -> "44 zł". */
export function formatPrice(value: number): string {
  return `${value} zł`;
}
