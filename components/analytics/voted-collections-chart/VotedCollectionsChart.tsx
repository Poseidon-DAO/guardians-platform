"use client";

import { ThemeTypes } from "@/components/switch-theme/SwitchTheme";
import { Text } from "@/components/ui";
import format from "date-fns/format";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DataItem = { date: string; votes: number };

type IProps = {
  data: DataItem[];
  theme?: ThemeTypes;
};

export default function VotedCollectionsChart({ data, theme }: IProps) {
  if (!data.length) return null;

  return (
    <div className="flex flex-col justify-between h-full">
      <Text className="text-center py-1 text-lg">
        Amount of votes on the collection
      </Text>

      <ResponsiveContainer width="100%" height="100%" className="rounded-lg">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 30,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={(value) => format(new Date(value), "dd MMM")}
            tickMargin={10}
            stroke={theme === "dark" ? "rgb(243 244 246)" : "#1F2046"}
          />
          <YAxis stroke={theme === "dark" ? "rgb(243 244 246)" : "#1F2046"} />
          <Tooltip
            formatter={(value) => [value, "Votes"]}
            contentStyle={{
              background: theme === "dark" ? "#1e293b" : "rgb(243 244 246)",
              borderColor: theme === "dark" ? "#334155" : "transparent",
            }}
            wrapperClassName="rounded-lg"
          />
          <Line
            type="monotone"
            dataKey="votes"
            stroke={theme === "dark" ? "#f20a70" : "#4923fc"}
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
