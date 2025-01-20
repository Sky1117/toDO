import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AnalyticsChartProps {
  completed: number;
  pending: number;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  completed,
  pending,
}) => {
  // Check if there are no tasks
  if (completed === 0 && pending === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Task Analytics</h2>
        <p>No tasks available</p>
      </div>
    );
  }

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#4CAF50", "#FFA726"];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Task Analytics</h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={entry.name} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: COLORS[index] }}
            />
            <span>{`${entry.name}: ${entry.value}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsChart;
