import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Total Classes",
      data: [400, 600, 800, 300, 500, 200, 700],
      backgroundColor: "#f87171",
    },
    {
      label: "Total Users",
      data: [700, 200, 500, 300, 400, 600, 800],
      backgroundColor: "#60a5fa",
    },
    {
      label: "Total Users",
      data: [100, 200, 500, 300, 400, 600, 400],
      backgroundColor: "#c084fc",
    },
  ],
};

export default function Chart() {
  return <Bar options={options} data={data} />;
}
