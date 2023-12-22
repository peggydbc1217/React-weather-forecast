import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { TooltipItem } from "chart.js";
import { useState } from "react";

Chart.register(CategoryScale);

const Data = [
  {
    id: 1,
    date: "1F",
    maxTemp: 60,
    minTemp: 83,
  },
  {
    id: 2,
    date: "2F",
    maxTemp: 63,
    minTemp: 35,
  },
  {
    id: 3,
    date: "3F",
    maxTemp: 68,
    minTemp: 55,
  },
  {
    id: 4,
    date: "4F",
    maxTemp: 90,
    minTemp: 45,
  },
  {
    id: 5,
    date: "5F",
    maxTemp: 10,
    minTemp: 23,
  }, 
];

const Data2 = [
  {
    id: 1,
    date: "1F",
    maxTemp: 80,
    minTemp: 3,
  },
  {
    id: 2,
    date: "2F",
    maxTemp: 4,
    minTemp: 35,
  },
  {
    id: 3,
    date: "3F",
    maxTemp: 8,
    minTemp: 55,
  },
  {
    id: 4,
    date: "4F",
    maxTemp: 90,
    minTemp: 45,
  },
  {
    id: 5,
    date: "5F",
    maxTemp: 430,
    minTemp: 23,
  }, 
];

const data = {
  labels: Data.map((data) => data.date),
  datasets: [
    {
      label: "Max Temp",

      data: Data.map((data) => data.maxTemp),
      backgroundColor: "white",
      borderColor: "#fb7c73",
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 7,
      // fill: {above: 'blue', below: 'red', target: {value: 350}}
    },
    {
      label: "Min Temp",
      data: Data2.map((data) => data.minTemp),
      backgroundColor: "white",
      borderColor: "#45D1FF",
      borderWidth: 3,
      tension: 0.3,
      pointRadius: 7,
      // fill: {above: 'blue', below: 'red', target: {value: 350}}
    },
  ],
};

const options = {
  type: "line",
  aspectRatio: 1,
  plugins: {
    title: {
      display: true,
      text: "5 Days Forecast",

      color: "#ff9448",
      font: {
        size: 36,
        family: "Preahvihear",
      },
      padding: 36,
    },
    legend: {
      // display: true,
      position: "bottom",
      align: "center",

      labels: {
        color: "#B14A00",
        font: {
          size: 16,
          family: "Preahvihear",
        },
      },
    },
    datalabels: {
      color: "red",
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#797979", // Background color
      titleFont: { size: 18 }, // Title font size
      bodyFont: { size: 16 }, // Body font size
      padding: 12, // Padding inside tooltip
      callbacks: {
        // title: function (tooltipItems: TooltipItem<"line">[]) {
        //   // Custom title
        //   return tooltipItems[0].label;
        // },
        label: function (tooltipItem: TooltipItem<"line">) {
          // Custom label
          return " Max Temp " + tooltipItem.parsed.y;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
        color: "#B14A00",
        font: {
          size: 20,
          family: "Preahvihear",
        },
      },
      ticks: {
        color: "#B14A00",
        font: {
          size: 16, 
          family: "Preahvihear",
        },
        min: 2016,
        max: 2020,
        stepSize: 1,
      },
      grid:{
        display:false,
      }

    },
    y: {
      title: {
        display: true,
        text: "Temp(°C)",
        color: "#B14A00",
        font: {
          size: 20,
          family: "Preahvihear",
        },
      },
      ticks: {
        color: "#B14A00",
        font: {
          size: 16,
          family: "Preahvihear",
        },
        min: 0,
        max: 5000,
        stepSize: 5,
      },
      grid: {
        display:false,
      },
    },
  },
};

function ForecastChart() {
  const [chartData, setChartData] = useState(data);

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}
export default ForecastChart;
