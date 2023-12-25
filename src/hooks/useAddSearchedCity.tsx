import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase";

export default function useAddSearchedCity() {
  const cityCollectionRef = collection(db, "forecast");

  const { userId } = JSON.parse(localStorage.getItem("authInfo") || "{}");
  const addSearchedCity = async (city: string, lat: string, lon: string) => {
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
