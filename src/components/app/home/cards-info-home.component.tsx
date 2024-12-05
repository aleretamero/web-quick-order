import { CardInfo } from "@/components/card/card-info";
import { useGetCardsDashboardReport } from "@/domain/report/hooks/use-get-cards-dashboard-report.hook";
import { formatCurrency } from "@/helpers/formats/format-currency.helper";

export function CardsInfoHome() {
  const { data } = useGetCardsDashboardReport();

  if (!data) {
    return null; //TODO skeleton
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CardInfo
        title="Hoje"
        value={formatCurrency(data.today.receivedPrice)}
        descriptions={[
          `${formatCurrency(data.today.salePrice)} valor bruto`,
          `${data.today.quantity} ${
            data.today.quantity === 1 ? "venda" : "vendas"
          }`,
        ]}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
      />
      <CardInfo
        title="Ontem"
        value={formatCurrency(data.yesterday.receivedPrice)}
        descriptions={[
          `${formatCurrency(data.yesterday.salePrice)} valor bruto`,
          `${data.yesterday.quantity} ${
            data.yesterday.quantity === 1 ? "venda" : "vendas"
          }`,
        ]}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
      />
      <CardInfo
        title="Nessa semana"
        value={formatCurrency(data.thisWeek.receivedPrice)}
        descriptions={[
          `${formatCurrency(data.thisWeek.salePrice)} valor bruto`,
          `${data.thisWeek.quantity} ${
            data.thisWeek.quantity === 1 ? "venda" : "vendas"
          }`,
        ]}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
      />
      <CardInfo
        title="Esse mês"
        value={formatCurrency(data.thisMonth.receivedPrice)}
        descriptions={[
          `${formatCurrency(data.thisMonth.salePrice)} valor bruto`,
          `${data.thisMonth.quantity} ${
            data.thisMonth.quantity === 1 ? "venda" : "vendas"
          }`,
        ]}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
      />
    </div>
  );
}
