import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase";
import useGetSearchedCity from "./useGetSearchedCity";

//Used to add a searched city to firebase
export default function useAddSearchedCity() {
  //get the userId from localStorage
  const { userId } = JSON.parse(localStorage.getItem("authInfo") || "{}");

  //get the last 3 searched cities from firebase for a specific user
  const { searchedCities } = useGetSearchedCity();

  // Define the Firestore collection
  const forecastCollectionRef = collection(db, "forecast");

  //add a searched city to firebase
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
