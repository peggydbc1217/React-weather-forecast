import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase";
import useGetSearchedCity from "./useGetSearchedCity";
import {
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function useAddSearchedCity() {
  const cityCollectionRef = collection(db, "forecast");
  const { userId } = JSON.parse(localStorage.getItem("authInfo") || "{}");
  const { searchedCities } = useGetSearchedCity();
  const forecastCollectionRef = collection(db, "forecast");

  const addSearchedCity = async (city: string, lat: number, lon: number) => {
    if (searchedCities.includes(city)) return;
    if (!userId) return;
    if (searchedCities.length === 3) {
      const lastCity = searchedCities[2];
      const querySnapshot = await getDocs(
        query(
          forecastCollectionRef,
          where("cityName", "==", lastCity),
          orderBy("createdAt", "desc")
        )
      );
      const lastCityId = querySnapshot.docs[0].id;
      await deleteDoc(doc(forecastCollectionRef, lastCityId));
    }
    await addDoc(cityCollectionRef, {
      city,
      createdAt: serverTimestamp(),
      userId,
      lat,
      lon,
    });
  };

  return { addSearchedCity };
}
