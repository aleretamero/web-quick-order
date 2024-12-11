import { OrdersFilters } from "@/components/app/orders/orders-filters.component";
import { OrdersTable } from "@/components/app/orders/orders-table.component";
import { ModalSaveOrder } from "@/components/app/orders/save-order-modal.component";
import { PageContainer } from "@/components/layout/page-container.component";

export function OrdersPage() {
  return (
    <PageContainer scrollable>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between items-center gap-4">
          <OrdersFilters />
          <ModalSaveOrder />
        </div>
        <OrdersTable />
      </div>
    </PageContainer>
  );
}
