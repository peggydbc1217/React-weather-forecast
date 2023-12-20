import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const forecastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } =
  forecastSlice.actions;

export default forecastSlice.reducer;
