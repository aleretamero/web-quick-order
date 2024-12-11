import { SaveOrderForm } from "@/components/app/orders/save-order-form.component";
import { EditButtonIcon } from "@/components/button/edit-button";
import { PlusButtonIcon } from "@/components/button/plus-button";
import { Modal } from "@/components/feedback/modal.component";
import { OrderModel } from "@/domain/orders/models/order.model";
import { Role } from "@/domain/user/enums/role.enum";
import { useAuth } from "@/hooks/use-auth.hook";
import { useState } from "react";

interface SaveOrderModalProps {
  order?: OrderModel;
}

export function ModalSaveOrder({ order }: SaveOrderModalProps) {
  const { dataUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return order ? (
    <Modal
      title="Editar pedido"
      trigger={<EditButtonIcon disabled={dataUser?.role === Role.EMPLOYEE} />}
      content={
        <SaveOrderForm order={order} onSuccess={() => setIsModalOpen(false)} />
      }
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    />
  ) : (
    <Modal
      title="Novo pedido"
      trigger={<PlusButtonIcon disabled={dataUser?.role === Role.EMPLOYEE} />}
      content={<SaveOrderForm onSuccess={() => setIsModalOpen(false)} />}
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
    />
  );
}
