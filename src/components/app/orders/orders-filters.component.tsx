import { BoxMultipleFilter } from "@/components/filter/box-multiple-filter.component";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";
import { useQueryParamsOrderStatus } from "@/domain/orders/hooks/use-query-params-order-status";

export function OrdersFilters() {
  const { key } = useQueryParamsOrderStatus();

  const statusText = {
    PENDING: "Pendente",
    PROCESSING: "Processando",
    COMPLETED: "Completo",
    CANCELED: "Cancelado",
    DELETED: "Deletado",
  };

  return (
    <div className="flex items-center gap-4">
      <BoxMultipleFilter
        title="Filtros"
        filterKey={key}
        options={Object.entries(OrderStatus)
          .filter(([key]) => key !== OrderStatus.DELETED)
          .map(([key, value]): any => ({
            value: key,
            label: statusText[value as OrderStatus],
          }))}
        align="start"
        size="lg"
      />
    </div>
  );
}
