import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store.ts";

type DispatchFunction = () => AppDispatch;

export const useForecastDispatch: DispatchFunction = useDispatch;
export const useForecastSelector: TypedUseSelectorHook<RootState> = useSelector;
