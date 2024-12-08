import { BoxMultipleFilter } from "@/components/filter/box-multiple-filter.component";
import { DateRangePickerFilter } from "@/components/filter/date-range-picker-filter.component";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";
import { useQueryParamsOrderStatus } from "@/domain/orders/hooks/use-query-params-order-status";

export function OrdersFilters() {
  const { key } = useQueryParamsOrderStatus();

  return (
    <div className="flex justify-between items-center gap-4">
      <BoxMultipleFilter
        title="Filtros"
        filterKey={key}
        options={Object.entries(OrderStatus)
          .filter(([key]) => key !== OrderStatus.DELETED)
          .map(([key, value]): any => ({
            value: key,
            label: value,
          }))}
        align="start"
        size="lg"
      />
      <DateRangePickerFilter />
    </div>
  );
}
