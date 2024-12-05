import { PieGraph } from "@/components/graph/pie-graph.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";
import { formatDate } from "@/helpers/formats/format-date.helper";
import { useMemo } from "react";

const data = {
  startDate: "2024-04-01",
  endDate: "2024-04-07",
  chartData: [
    {
      status: OrderStatus.PENDING,
      quantity: 275,
      fill: "var(--color-pending)",
    },
    {
      status: OrderStatus.PROCESSING,
      quantity: 200,
      fill: "var(--color-processing)",
    },
    {
      status: OrderStatus.CANCELED,
      quantity: 287,
      fill: "var(--color-canceled)",
    },
    {
      status: OrderStatus.COMPLETED,
      quantity: 173,
      fill: "var(--color-completed)",
    },
  ],
};

const chartConfig = {
  quantity: {
    label: "Total",
  },
  pending: {
    label: OrderStatus.PENDING,
    color: "hsl(var(--chart-1))",
  },
  processing: {
    label: OrderStatus.PROCESSING,
    color: "hsl(var(--chart-2))",
  },
  canceled: {
    label: OrderStatus.CANCELED,
    color: "hsl(var(--chart-3))",
  },
  completed: {
    label: OrderStatus.COMPLETED,
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function CardPieGraphHome() {
  const total = useMemo(() => {
    return data.chartData.reduce((acc, curr) => acc + curr.quantity, 0);
  }, []);

  return (
    <div className="col-span-12 xl:col-span-5">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pedidos por Status</CardTitle>
          <CardDescription>
            {formatDate(data.startDate)} a {formatDate(data.endDate)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <PieGraph
            data={data.chartData}
            config={chartConfig}
            total={total.toLocaleString()}
            label="Pedidos"
          />
        </CardContent>
      </Card>
    </div>
  );
}
