import { TooltipItem } from "chart.js";

interface ChartSettingsProps {
  tempMaxArr: number[];
  tempMinArr: number[];
  dateArr: string[];
}

export default function useGetChartSettings({
  tempMaxArr,
  tempMinArr,
  dateArr,
}: ChartSettingsProps) {
  const chartData = {
    labels: dateArr,
    datasets: [
      {
        label: "Max Temp",

        data: tempMaxArr,
        backgroundColor: "white",
        borderColor: "#fb7c73",
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 7,
        // fill: {above: 'blue', below: 'red', target: {value: 350}}
      },
      {
        label: "Min Temp",
        data: tempMinArr,
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
        text: "5 Days Forecast ",

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
        backgroundColor: "#797979",
        titleFont: { size: 18 },
        bodyFont: { size: 16 },
        padding: 12,
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
        grid: {
          display: false,
        },
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
          stepSize: 1,
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return { options, chartData };
}
