import React from "react";
import { useState } from "react";

export default function useGetSearchedCity() {
  const [city, setCity] = useState<string>("");

  return <div>useGetSearchedCity</div>;
}
