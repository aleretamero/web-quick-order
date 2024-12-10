import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";
import { cn } from "@/lib/utils";

export function BadgeOrderStatus({
  size = "medium",
  status,
}: {
  size?: "small" | "medium" | "large";
  status: OrderStatus;
}) {
  const statusColor = {
    PENDING: "bg-yellow-500",
    PROCESSING: "bg-blue-500",
    COMPLETED: "bg-green-500",
    CANCELED: "bg-red-500",
    DELETED: "bg-gray-500",
  };

  const statusText = {
    PENDING: "Pendente",
    PROCESSING: "Processando",
    COMPLETED: "Completo",
    CANCELED: "Cancelado",
    DELETED: "Deletado",
  };

  return (
    <Badge
      className={cn("hover:bg-none dark:hover:bg-none", {
        [statusColor[status]]: statusColor[status],
        "text-xs": size === "small",
        "text-sm": size === "medium",
        "text-xl": size === "large",
      })}
    >
      {statusText[status]}
    </Badge>
  );
}
