"use client";
import React from "react";
import { Pie } from "react-chartjs-2";

function PieChart({ chartData }: any) {
  console.log(chartData);
  return (
    <div className="chart-container" style={{ maxWidth: 500 }}>
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>

      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Harvests",
            },
          },
        }}
      />
    </div>
  );
}
export default PieChart;
