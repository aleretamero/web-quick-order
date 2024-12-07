import { PieGraph } from "@/components/graph/pie-graph.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { useGetOrdersStatusReport } from "@/domain/report/hooks/use-orders-status-report.hook";
import { formatDate } from "@/helpers/formats/format-date.helper";
import { useMemo } from "react";

const chartConfig = {
  quantity: {
    label: "Total",
  },
  PENDING: {
    label: "Pendente",
    color: "hsl(var(--chart-1))",
  },
  PROCESSING: {
    label: "Processando",
    color: "hsl(var(--chart-2))",
  },
  CANCELED: {
    label: "Cancelado",
    color: "hsl(var(--chart-3))",
  },
  COMPLETED: {
    label: "Finalizado",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function CardPieGraphHome() {
  const { data } = useGetOrdersStatusReport();

  const total = useMemo(() => {
    return data?.data.reduce((acc, curr) => acc + curr.quantity, 0) ?? 0;
  }, [data]);

  const chartData = useMemo(() => {
    return (
      data?.data.map((item) => ({
        ...item,
        label: (chartConfig as any)[item.status.toLowerCase()]?.label,
        fill: (chartConfig as any)[item.status]?.color,
      })) ?? []
    );
  }, [data]);

  return (
    <div className="col-span-12 xl:col-span-5">
      <Card className="w-full h-full flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pedidos por Status</CardTitle>
          <CardDescription>
            {formatDate(data?.startDate)} a {formatDate(data?.endDate)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <PieGraph
            data={chartData}
            config={chartConfig}
            total={total.toLocaleString()}
            label="Pedidos"
          />
        </CardContent>
      </Card>
    </div>
  );
}
