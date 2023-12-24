import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "./forecastType";

interface ForecastState {
  weatherData: WeatherData[];
  currentCity: string;
  currentCountry: string;
  isLoading: boolean;
}

const initialState: ForecastState = {
  weatherData: [] as WeatherData[],
  currentCity: "",
  currentCountry: "TW",
  isLoading: false,
};

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setWeatherData(state, action: PayloadAction<WeatherData[]>) {
      state.weatherData = action.payload;
    },
    setCurrentCity(state, action: PayloadAction<string>) {
      state.currentCity = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCurrentCountry(state, action: PayloadAction<string>) {
      state.currentCountry = action.payload;
    },
  },
});

export const {
  setWeatherData,
  setCurrentCity,
  setIsLoading,
  setCurrentCountry,
} = forecastSlice.actions;

export default forecastSlice.reducer;
