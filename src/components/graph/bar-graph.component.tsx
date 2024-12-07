"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarRectangleItem } from "recharts/types/cartesian/Bar";
import { DataKey } from "recharts/types/util/types";
import { formatDate } from "@/helpers/formats/format-date.helper";

export interface BarGraphProps<T> {
  config: ChartConfig;
  dataKey: DataKey<T>;
  data: BarRectangleItem[];
}

export function BarGraph<T>({
  config,
  dataKey: chart,
  data,
}: BarGraphProps<T>) {
  return (
    <ChartContainer config={config} className="aspect-auto h-[280px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          minTickGap={32}
          tickFormatter={(value) => formatDate(value, "DD/MMM")}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[150px]"
              nameKey="views"
              labelFormatter={(value) => formatDate(value, "DD/MM/YYYY")}
            />
          }
        />
        <Bar dataKey={chart} fill={`var(--color-${chart})`} />
      </BarChart>
    </ChartContainer>
  );
}
