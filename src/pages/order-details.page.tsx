import { CardOrderDetails } from "@/components/app/orders/details/card-order-details.component";
import { PageContainer } from "@/components/layout/page-container.component";
import { useGetOrder } from "@/domain/orders/hooks/use-get-order.hook";
import { useParams } from "react-router";

export function OrderDetailsPage() {
  const { id } = useParams();
  const { data } = useGetOrder(id);

  if (!data) {
    return null; // TODO: Add loading state
  }

  const order = data.data;

  return (
    <PageContainer scrollable>
      <CardOrderDetails order={order} />
    </PageContainer>
  );
}
