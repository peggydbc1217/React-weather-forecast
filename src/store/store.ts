import { configureStore } from "@reduxjs/toolkit";
import forecastSlice from "../features/forecast/forecastSlice";

const store = configureStore({
  reducer: {
    forecast: forecastSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
