import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/data-table/data-table.component";
import { useGetOrders } from "@/domain/orders/hooks/use-get-orders.hook";
import { OrderModel } from "@/domain/orders/models/order.model";
import { formatCurrency } from "@/helpers/formats/format-currency.helper";

export function OrdersTable() {
  const { data, isLoading, totalItems } = useGetOrders();

  const columns: ColumnDef<OrderModel>[] = useMemo(
    () => [
      {
        accessorKey: "image",
        header: () => <span className="w-fit">Imagem</span>,
        cell: ({ row }) => (
          <div className="overflow-hidden rounded-md flex justify-center items-center w-[50px]">
            <img
              src={row.original.imageUrl}
              alt="Product image"
              width={50}
              className="h-auto w-auto object-contain"
            />
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: () => (
          <span className="w-fit">
            <span className="hidden md:inline-block">Status</span>
          </span>
        ),
        cell: ({ row }) => <span>{row.original.status}</span>,
      },
      {
        accessorKey: "description",
        header: () => (
          <span className="w-fit">
            <span className="hidden md:inline-block">Descrição</span>
          </span>
        ),
        cell: ({ row }) => (
          <span className="truncate ">{row.original.description}</span>
        ),
      },
      {
        accessorKey: "totalPrice",
        header: () => (
          <span className="w-fit">
            <span className="hidden md:inline-block">Preço de Venda</span>
          </span>
        ),
        cell: ({ row }) => (
          <span>{formatCurrency(row.original.salePrice)}</span>
        ),
      },
      {
        accessorKey: "totalItems",
        header: () => (
          <span className="w-fit">
            <span className="hidden md:inline-block">Preço Recebido</span>
          </span>
        ),
        cell: ({ row }) => (
          <span>{formatCurrency(row.original.receivedPrice)}</span>
        ),
      },
    ],
    []
  );

  if (isLoading) {
    return <div>Loading...</div>; // skeleton
  }

  return <DataTable columns={columns} data={data} totalItems={totalItems} />;
}
