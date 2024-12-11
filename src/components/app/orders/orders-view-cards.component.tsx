import { useGetOrders } from "@/domain/orders/hooks/use-get-orders.hook";
import { useNavigate } from "react-router";
import { BadgeOrderStatus } from "@/components/app/orders/badge-order-status.component";
import { useAuth } from "@/hooks/use-auth.hook";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";
import { Field } from "@/components/ui/field";
import { formatDate } from "@/helpers/formats/format-date.helper";
import { formatCurrency } from "@/helpers/formats/format-currency.helper";
import { cn } from "@/lib/utils";
import { Role } from "@/domain/user/enums/role.enum";
import { Pagination } from "@/components/layout/pagination.component";

export function OrdersViewCards() {
  const { dataUser } = useAuth();
  const { data, isLoading, totalItems } = useGetOrders();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>; // skeleton
  }

  if (!data) {
    return null; // TODO: Add error state
  }

  const statusColor = {
    PENDING: "border-yellow-500 dark:border-yellow-400",
    PROCESSING: "border-blue-500 dark:border-blue-400",
    COMPLETED: "border-green-500 dark:border-green-400",
    CANCELED: "border-red-500 dark:border-red-400",
    DELETED: "border-gray-500 dark:border-gray-400",
  };

  return (
    <div className="mb-12">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-4">
        {data.map((order) => (
          <Card
            className={cn("w-full overflow-hidden", statusColor[order.status as OrderStatus])}
            key={order.id}
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <CardContent className="h-[200px] w-full flex p-0 rounded-md overflow-hidden">
              <div className="h-[200px] flex-shrink-0">
                <img
                  className="h-full w-full object-cover"
                  src={order.imageUrl}
                  alt="Imagem do pedido"
                />
              </div>
              <div className="flex w-full flex-col justify-between">
                <div className="flex w-full flex-col p-2">
                  <div className="space-y-2">
                    <Field label="Data" value={formatDate(order.date)} />
                    {dataUser?.role === Role.ADMIN && (
                      <>
                        <Field
                          label="Preço de Venda"
                          value={formatCurrency(order.salePrice)}
                          className="py-0"
                        />
                        <Field
                          label="Preço Recebido"
                          value={formatCurrency(order.receivedPrice)}
                          className="py-0"
                        />
                      </>
                    )}
                    <CardDescription className="line-clamp-2">
                      {order.description}
                    </CardDescription>
                  </div>
                </div>
                <BadgeOrderStatus
                  status={order.status as OrderStatus}
                  className="w-full rounded-none"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination totalItems={totalItems} />
    </div>
  );
}
