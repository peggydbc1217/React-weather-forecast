import { collection, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../configs/firebase";
import { query } from "firebase/firestore";

export default function useGetSearchedCity() {
  const [city, setCity] = useState<string[]>([]);
  const { userId } = JSON.parse(localStorage.getItem("authInfo") || "{}");
  console.log(userId);

  const forecastCollectionRef = collection(db, "forecast");

  useEffect(() => {
    let unsubscribe = () => {};
    if (!userId) return;
    const getCity = () => {
      try {
        const queryCities = query(
          forecastCollectionRef,
          where("userId", "==", userId),
          orderBy("createdAt", "desc")
        );
        unsubscribe = onSnapshot(queryCities, (snapshot) => {
          const cities: string[] = [];
          snapshot.forEach((doc) => {
            cities.push(doc.data().city);
          });
          console.log(cities);

          setCity(cities);
        });

        setCity(city);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    };
    getCity();
    return () => unsubscribe();
  }, [city, forecastCollectionRef, userId]);

  return { city };
}
