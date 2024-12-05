"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { OrderStatus } from "@/domain/orders/enums/order-status.enum";

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

export function PieGraph() {
  const total = React.useMemo(() => {
    return data.chartData.reduce((acc, curr) => acc + curr.quantity, 0);
  }, []);

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pedidos por Status</CardTitle>
        <CardDescription>
          {new Date(data.startDate).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          a{" "}
          {new Date(data.endDate).toLocaleDateString("pt-BR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data.chartData}
              dataKey="quantity"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pedidos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
