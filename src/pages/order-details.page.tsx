import { PageContainer } from "@/components/layout/page-container.component";
import { useGetOrder } from "@/domain/orders/hooks/get-order.hook";
import { useParams } from "react-router";

export function OrderDetailsPage() {
  const { id } = useParams();

  const { data } = useGetOrder(id);

  return (
    <PageContainer scrollable>
      <pre>{JSON.stringify(data, null, 2)}</pre>;
    </PageContainer>
  );
}
