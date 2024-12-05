import { BarGraph } from "@/components/graph/bar-graph.component";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
import { useGetOrdersCompletedReport } from "@/domain/report/hooks/use-orders-completed-report.hook";
import { formatDate } from "@/helpers/formats/format-date.helper";
import { useMemo, useState } from "react";

const chartConfig = {
  value: {
    label: "Valor",
    color: "hsl(var(--chart-1))",
  },
  quantity: {
    label: "Quantidade",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CardBarGraphHome() {
  const { data } = useGetOrdersCompletedReport();

  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("value");

  const total = useMemo(
    () => ({
      value: data?.data.reduce((acc, curr) => acc + curr.value, 0) ?? 0,
      quantity: data?.data.reduce((acc, curr) => acc + curr.quantity, 0) ?? 0,
    }),
    [data]
  );

  if (!data) {
    return null; //TODO skeleton
  }

  return (
    <div className="col-span-12 xl:col-span-7">
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Pedidos Finalizados</CardTitle>
            <CardDescription>
              {formatDate(data.startDate)} a {formatDate(data.endDate)}
            </CardDescription>
          </div>
          <div className="flex">
            {Object.keys(chartConfig).map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <BarGraph
            config={chartConfig}
            dataKey={activeChart}
            data={data.data}
          />
        </CardContent>
      </Card>
    </div>
  );
}
