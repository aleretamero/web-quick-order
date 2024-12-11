import { BadgeOrderStatus } from "@/components/app/orders/badge-order-status.component";
import { SaveOrderForm } from "@/components/app/orders/create/save-order-form.component";
import { EditButtonIcon } from "@/components/button/edit-button";
import { TrashButtonIcon } from "@/components/button/trash-button";
import { Alert } from "@/components/feedback/alert.component";
import { Modal } from "@/components/feedback/modal.component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";
import { useCancelOrder } from "@/domain/orders/hooks/cancel-order.hook";
import { useDeleteOrder } from "@/domain/orders/hooks/delete-order.hook";
import { useFinishOrder } from "@/domain/orders/hooks/finish-order.hook";
import { useProcessOrder } from "@/domain/orders/hooks/process-order.hook";
import { OrderModel } from "@/domain/orders/models/order.model";
import { Role } from "@/domain/user/enums/role.enum";
import { formatCurrency } from "@/helpers/formats/format-currency.helper";
import { formatDate } from "@/helpers/formats/format-date.helper";
import { useAuth } from "@/hooks/use-auth.hook";
import { useNavigate } from "react-router";

interface CardOrderDetailsProps {
  order: OrderModel;
}

export function CardOrderDetails({ order }: CardOrderDetailsProps) {
  const { dataUser } = useAuth();
  const navigate = useNavigate();
  const { mutate: deleteMutate } = useDeleteOrder();
  const { mutate: cancelMutate } = useCancelOrder();
  const { mutate: finishMutate } = useFinishOrder();
  const { mutate: processMutate } = useProcessOrder();

  return (
    <Card className="mx-auto my-4 max-w-5xl">
      <ScrollArea className="p-4">
        <CardContent className="flex flex-col lg:flex-row w-full h-full gap-x-4 gap-y-12 p-0">
          <div className="flex-shrink-0 rounded-lg overflow-hidden flex justify-center items-center">
            <img
              className="w-80"
              src={order.imageUrl}
              alt={`Imagem do pedido ${order.id}`}
            />
          </div>
          <div className="flex-1 flex flex-col justify-between gap-4 w-full">
            <div className="flex gap-2 justify-end">
              <Modal
                title="Editar pedido"
                trigger={
                  <EditButtonIcon disabled={dataUser?.role === Role.EMPLOYEE} />
                }
                content={<SaveOrderForm order={order} />}
              />

              <Alert
                title="Deletar pedido"
                description="Tem certeza que deseja deletar esse pedido?"
                trigger={
                  <TrashButtonIcon
                    disabled={dataUser?.role === Role.EMPLOYEE}
                  />
                }
                action={() => {
                  deleteMutate(order.id);
                  navigate("/orders");
                }}
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2 items-center justify-between my-4">
                <BadgeOrderStatus status={order.status} size="large" />
                <span className="font-bold text-xl">
                  {formatDate(order.date)}
                </span>
              </div>
              <div className="my-2">
                <CardDescription>{order.description}</CardDescription>
              </div>
              {dataUser?.role === Role.ADMIN && (
                <div>
                  <Field
                    label="Preço de venda"
                    value={formatCurrency(order.salePrice)}
                  />
                  <Field
                    label="Preço recebido"
                    value={formatCurrency(order.receivedPrice)}
                  />
                </div>
              )}
            </div>
            <div className="flex mt-8 gap-4 items-center">
              <Button
                variant="default"
                onClick={() => processMutate(order.id)}
                disabled={order.status === OrderStatus.PROCESSING}
              >
                Processar
              </Button>
              <Button
                variant="default"
                onClick={() => finishMutate(order.id)}
                disabled={order.status === OrderStatus.COMPLETED}
              >
                Concluir
              </Button>
              <Button
                variant="destructive"
                onClick={() => cancelMutate(order.id)}
                disabled={order.status === OrderStatus.CANCELED}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </CardContent>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  );
}
