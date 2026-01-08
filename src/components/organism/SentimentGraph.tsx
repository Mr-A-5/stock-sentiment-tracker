"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Card from "../atoms/Card";
import descriptions from "@/assets/descriptions";

export function SentimentGraph({
  data,
}: {
  data: { sentiment: string; value: number }[];
}) {
  const COLORS: Record<string, string> = {
    Positive: "#22c55e",
    Neutral: "#eab308",
    Negative: "#ef4444",
  };

  return (
    <Card
      title="Sentiment Graph"
      className=""
      height="md"
      width="md"
      description={descriptions.SentimentGraph}
    >
      <ResponsiveContainer width="100%" height={225} className={"pr-7"}>
        <BarChart data={data}>
          <XAxis dataKey="sentiment" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value">
            {data.map((entry: { sentiment: string; value: number }) => (
              <Cell key={entry.sentiment} fill={COLORS[entry.sentiment]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
