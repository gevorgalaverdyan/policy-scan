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

const CHART_CONFIG: ChartConfig = {
  transparency: { label: "Transparency" },
  data_minimization: { label: "Data Minimization" },
  third_party: { label: "Third-party Sharing" },
  consent_mechanism: { label: "Consent Mechanisms" },
  retention: { label: "Retention Policies" },
  children: { label: "Children's Privacy" },
};

const getColor = (value: number): string => {
  if (value >= 1 && value <= 50) return "hsl(var(--chart-red))";
  if (value >= 51 && value <= 70) return "hsl(var(--chart-orange))";
  if (value >= 71 && value <= 100) return "hsl(var(--chart-green))";
  return "hsl(var(--chart-gray))"; // fallback color if value is outside range
};

export interface PolicyScanAnalysisProps {
  scores: {
    transparency: number;
    data_minimization: number;
    third_party: number;
    consent_mechanism: number;
    retention: number;
    children: number;
  };
}

export function PolicyScanAnalysis({ scores }: PolicyScanAnalysisProps) {
  const CHART_DATA = [
    {
      category: CHART_CONFIG.transparency.label,
      value: scores.transparency,
      fill: getColor(scores.transparency),
    },
    {
      category: CHART_CONFIG.data_minimization.label,
      value: scores.data_minimization,
      fill: getColor(scores.data_minimization),
    },
    {
      category: CHART_CONFIG.third_party.label,
      value: scores.third_party,
      fill: getColor(scores.third_party),
    },
    {
      category: CHART_CONFIG.consent_mechanism.label,
      value: scores.consent_mechanism,
      fill: getColor(scores.consent_mechanism),
    },
    {
      category: CHART_CONFIG.retention.label,
      value: scores.retention,
      fill: getColor(scores.retention),
    },
    {
      category: CHART_CONFIG.children.label,
      value: scores.children,
      fill: getColor(scores.children),
    },
  ];

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
