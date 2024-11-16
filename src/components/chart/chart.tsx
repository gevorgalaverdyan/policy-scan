"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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

const CHART_DATA = [
  { category: "Transparency", value: 100, fill: "hsl(var(--chart-red))" },
  {
    category: "Data Minimization",
    value: 100,
    fill: "hsl(var(--chart-orange))",
  },
  {
    category: "Third-party Sharing",
    value: 100,
    fill: "hsl(var(--chart-red))",
  },
  {
    category: "Consent Mechanisms",
    value: 100,
    fill: "hsl(var(--chart-orange))",
  },
  { category: "Retention Policies", value: 90, fill: "hsl(var(--chart-red))" },
  {
    category: "Children's Privacy",
    value: 50,
    fill: "hsl(var(--chart-green))",
  },
];

const CHART_CONFIG: ChartConfig = {
  transparency: { label: "Transparency", color: "hsl(var(--chart-red))" },
  data_minimization: {
    label: "Data Minimization",
    color: "hsl(var(--chart-orange))",
  },
  third_party: { label: "Third-party Sharing", color: "hsl(var(--chart-red))" },
  consent_mechanism: {
    label: "Consent Mechanisms",
    color: "hsl(var(--chart-orange))",
  },
  retention: { label: "Retention Policies", color: "hsl(var(--chart-red))" },
  children: { label: "Children's Privacy", color: "hsl(var(--chart-green))" },
};

export function PolicyScanAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Policy Scan Analysis</CardTitle>
        <CardDescription>Data analysis for privacy policies</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CHART_CONFIG} className="font-bold">
          <BarChart
            accessibilityLayer
            data={CHART_DATA}
            layout="vertical"
            margin={{ right: 40 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="category"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="value" layout="vertical" radius={4}>
              <LabelList
                dataKey="category"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
