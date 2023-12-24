import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useForecastSelector } from "../../store/hooks";
import { getDayTempMaxAndMin } from "../../helpers/helper";
import useGetChartSettings from "../../hooks/useGetChartSettings";

Chart.register(CategoryScale);

function ForecastChart() {
  // get weather data from redux store
  const weather = useForecastSelector((state) => state.forecast.weatherData);

  //get date, tempMax, tempMin for each day
  const { dateArr, tempMaxArr, tempMinArr } = getDayTempMaxAndMin(weather);

  // get chart data and options, apply to Line component
  const { chartData, options } = useGetChartSettings({
    tempMaxArr,
    tempMinArr,
    dateArr,
  });

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
}
export default ForecastChart;
