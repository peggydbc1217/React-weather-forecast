import { collection, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { orderBy } from "firebase/firestore";
import { db } from "../configs/firebase";
import { query } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

export default function useGetSearchedCity() {
  const [searchedCities, setSearchedCities] = useState<string[]>([]);
  const { userId } = JSON.parse(localStorage.getItem("authInfo") || "{}");

  const forecastCollectionRef = collection(db, "forecast");

  useEffect(() => {
    if (!userId) return;
    const fetchCities = async () => {
      const querySnapshot = await getDocs(
        query(
          forecastCollectionRef,
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        )
      );
      const cities = querySnapshot.docs.map((doc) => doc.data().cityName);
      setSearchedCities(cities);
    };
    fetchCities();
  }, [userId, forecastCollectionRef]);

  return { searchedCities };
}
