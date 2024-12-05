import { OrdersFilters } from "@/components/app/orders/orders-filters.component";
import { OrdersTable } from "@/components/app/orders/orders-table.component";
import { PageContainer } from "@/components/layout/page-container.component";

export function OrdersPage() {
  return (
    <PageContainer scrollable>
      <div className="flex flex-col gap-4 h-full">
        <OrdersFilters />
        <OrdersTable />
      </div>
    </PageContainer>
  );
}
