import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase";
import useGetSearchedCity from "./useGetSearchedCity";

export default function useAddSearchedCity() {
  const { userId } = JSON.parse(localStorage.getItem("authInfo") || "{}");
  const { searchedCities } = useGetSearchedCity();
  const forecastCollectionRef = collection(db, "forecast");

  const addSearchedCity = async (city: string, lat: number, lon: number) => {
    if (searchedCities.includes(city)) return;
    if (!userId) return;
    await addDoc(forecastCollectionRef, {
      city,
      createdAt: serverTimestamp(),
      userId,
      lat,
      lon,
    });
  };

  return { addSearchedCity };
}
