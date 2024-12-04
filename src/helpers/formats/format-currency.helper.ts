export function formatCurrency(value?: number | string): string {
  if (value === undefined) {
    return "";
  }

  if (typeof value === "string") {
    value = parseFloat(value);
  }

  const moneyFormatter = Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return moneyFormatter.format(value);
}
