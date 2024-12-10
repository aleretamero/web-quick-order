import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container.component";
import { CreateOrderForm } from "@/components/app/orders/create/create-order-form.component";

export function CreateOrderPage() {
  return (
    <PageContainer scrollable>
      <Card className="mx-auto w-full my-4 max-w-5xl">
        <CardHeader className="px-2 sm:p-6">
          <CardTitle className="text-left text-2xl font-bold">
            Novo Pedido
          </CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <CreateOrderForm />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
