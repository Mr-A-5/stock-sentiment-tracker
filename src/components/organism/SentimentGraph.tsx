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
import en from "@/messages/en.json";
import es from "@/messages/es.json";

const locales: Record<string, typeof en> = {
  en,
  es,
};

export function SentimentGraph({
  data,
  locale,
}: {
  data: { sentiment: string; value: number }[];
  locale: string;
}) {
  const text = locales[locale] ?? en;
  const COLORS: Record<string, string> = {
    Positive: "#22c55e",
    Neutral: "#eab308",
    Negative: "#ef4444",
  };

  return (
    <Card
      title={text["Sentiment Graph"].Title}
      height="md"
      width="md"
      description={text["Sentiment Graph"].Description}
    >
      <div className="md:max-w-85 lg:max-w-78 mx-auto">
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
      </div>
    </Card>
  );
}
