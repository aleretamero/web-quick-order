import { BoxMultipleFilter } from "@/components/filter/box-multiple-filter.component";
import { DateRangePickerFilter } from "@/components/filter/date-range-picker-filter.component";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";

export function OrdersFilters() {
  return (
    <div className="flex justify-between items-center gap-4">
      <BoxMultipleFilter
        title="Filtros"
        filterKey={"tableStatusKey"}
        options={Object.entries(OrderStatus).map(([key, value]): any => ({
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
