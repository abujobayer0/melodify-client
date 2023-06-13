import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const data = {
  datasets: [
    {
      label: "total classes",
      data: Array.from({ length: 50 }, () => ({
        x: Math.floor(Math.random() * 201) - 100,
        y: Math.floor(Math.random() * 201) - 100,
        r: Math.floor(Math.random() * 16) + 5,
      })),
      backgroundColor: "#60a5fa",
    },
    {
      label: "total approved classes",
      data: Array.from({ length: 50 }, () => ({
        x: Math.floor(Math.random() * 201) - 100,
        y: Math.floor(Math.random() * 201) - 100,
        r: Math.floor(Math.random() * 16) + 5,
      })),
      backgroundColor: "#f87171",
    },
    {
      label: "total enrolled students",
      data: Array.from({ length: 50 }, () => ({
        x: Math.floor(Math.random() * 201) - 100,
        y: Math.floor(Math.random() * 201) - 100,
        r: Math.floor(Math.random() * 16) + 5,
      })),
      backgroundColor: "#c084fc",
    },
  ],
};

export function BubbleChart() {
  return <Bubble options={options} data={data} />;
}
