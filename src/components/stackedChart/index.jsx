import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Total Selected Classes",
      data: [120, 300, 200, 400, 150, 250, 180],
      backgroundColor: "rgb(96, 165, 250)",
    },

    {
      label: "Total Enrolled Classes",
      data: [180, 220, 320, 280, 200, 350, 270],
      backgroundColor: "rgb(248, 113, 113)",
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

export function StackedChart() {
  return <Bar options={options} data={data} />;
}
