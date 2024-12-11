import { OrdersFilters } from "@/components/app/orders/orders-filters.component";
import { OrdersTable } from "@/components/app/orders/orders-table.component";
import { OrdersViewCards } from "@/components/app/orders/orders-view-cards.component";
import { ModalSaveOrder } from "@/components/app/orders/save-order-modal.component";
import { PageContainer } from "@/components/layout/page-container.component";
import { useIsMobile } from "@/hooks/use-is-mobile.hook";

export function OrdersPage() {
  const isMobile = useIsMobile();
  return (
    <PageContainer scrollable>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-between items-center gap-4">
          <OrdersFilters />
          <ModalSaveOrder />
        </div>
        {!isMobile ? <OrdersTable /> : <OrdersViewCards />}
      </div>
    </PageContainer>
  );
}
