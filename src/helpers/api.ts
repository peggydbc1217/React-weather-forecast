//Axios
import axios from "axios";
import { AxiosResponse } from "axios";
//Types
import { CityGeoCode } from "../features/forecast/InputDateForm";
import { WeatherApiResponse } from "../features/forecast/forecastType";
import { WeatherData } from "../features/forecast/forecastType";

//Helpers
import { getForecastByTime } from "./helper";

//Configs and Const
import { API_KEY, API_KEY_OPENWEATHER } from "../configs/config";
const RESULTS_LIMIT = 25;
const FORECAST_LIMIT = 40;
import { toast } from "react-hot-toast";

// get city list from API, used for autocomplete
export async function getCityList(query: string): Promise<CityGeoCode[]> {
  try {
    const API_URL = `https://api.api-ninjas.com/v1/city?name=${query.toLowerCase()}&limit=${RESULTS_LIMIT}`;

    const res = await axios.get<CityGeoCode[]>(API_URL, {
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    if (res.status !== 200) throw new Error("Error fetching data");

    const filteredCities = res.data.filter((city: CityGeoCode) =>
      city.name.toLowerCase().startsWith(query.toLowerCase())
    );

    return filteredCities;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    return [];
  }
}

// get city geocode from API, used the response lat, lon to get weather forecast
export async function getCityGeoCode(
  city: string
): Promise<{ lat: number; lon: number }> {
  try {
    const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=a97897c2428e5a4ba77f2a0d9fd70ab7`;

    const res: AxiosResponse = await axios.get(API_URL);
    if (res.status !== 200 || res.data.length === 0)
      throw new Error("No city found, please try another city");
    return res.data[0];
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
      throw new Error(err.message);
    }
    return { lat: 0, lon: 0 };
  }
}

// get current weather forecast from API
export async function getForecast(
  lat: number,
  lon: number
): Promise<WeatherData[]> {
  try {
    const API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat.toFixed(
      2
    )}&lon=${lon.toFixed(
      2
    )}&appid=${API_KEY_OPENWEATHER}&units=metric&cnt=${FORECAST_LIMIT}`;

    const res = await axios.get<WeatherApiResponse>(API_URL);
    if (res.status !== 200 || res.data.list.length === 0)
      throw new Error("There is no data or city not found");

    const fiveDaysforecast = getForecastByTime(res.data.list);

    return fiveDaysforecast;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
      throw new Error(err.message);
    }
    return [];
  }
}
