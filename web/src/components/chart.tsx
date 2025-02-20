"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Score",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface Log {
  date: string;
  averageScore: number;
}

interface ChartProps {
  logs: Log[];
}

export function ChartComponent({ logs }: ChartProps) {
  const dataSet = logs.map((log) => ({
    date: new Date(log.date).toLocaleDateString("en-US", { weekday: "short" }),
    score: log.averageScore || 50,
  }));

  return (
    <ChartContainer config={chartConfig} className="py-4">
      <LineChart
        accessibilityLayer
        data={dataSet}
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
          tickMargin={12}
        />
        <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="score"
          type="monotone"
          stroke="hsl(var(--chart-1))"
          strokeWidth={3}
          dot={true}
          name="Score"
        />
      </LineChart>
    </ChartContainer>
  );
}
