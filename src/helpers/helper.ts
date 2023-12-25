import { WeatherData } from "../features/forecast/forecastType";

// extract everydays weather data(6AM, 12PM, 18PM) from weather forecast data
export function getForecastByTime(data: WeatherData[]) {
  const days: WeatherData[] = [];

  data.forEach((item) => {
    const time = item.dt_txt.slice(11, 13);
    if (time === "06" || time === "12" || time === "18") {
      days.push(item);
    }
  });

  return days;
}

export function capitilizeFirstLetter(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// extract max and min temp for each day
export interface TempMaxAndMin {
  [date: string]: { tempMax: number; tempMin: number };
}

export function getDayTempMaxAndMin(data: WeatherData[]) {
  const tempMaxAndMin: TempMaxAndMin = data.reduce((acc, curr) => {
    const date = curr.dt_txt.slice(0, 10);

    if (!acc[date]) {
      // If this date is not in acc, add it
      acc[date] = {
        tempMax: curr.main.temp_max,
        tempMin: curr.main.temp_min,
      };
    } else {
      // If this date is already in the acc, compare and update the tempMax and tempMin
      const currentTempMax = curr.main.temp_max;
      const currentTempMin = curr.main.temp_min;

      if (currentTempMax > acc[date].tempMax) {
        acc[date].tempMax = currentTempMax;
      }
      if (currentTempMin < acc[date].tempMin) {
        acc[date].tempMin = currentTempMin;
      }
    }

    return acc;
  }, {} as TempMaxAndMin);

  // transform into array, because chartjs only accept array
  const dateArr = Object.keys(tempMaxAndMin);
  const tempMaxArr = dateArr.map((date) => tempMaxAndMin[date].tempMax);
  const tempMinArr = dateArr.map((date) => tempMaxAndMin[date].tempMin);

  return { dateArr, tempMaxArr, tempMinArr };
}
