import { collection, where, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { orderBy } from "firebase/firestore";
import { db } from "../configs/firebase";
import { query } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

// used to get the last 3 searched cities from firebase for a specific user
export default function useGetSearchedCity() {
  const [searchedCities, setSearchedCities] = useState<string[]>([]);

  //get the userId from localStorage
  const { userId } = JSON.parse(localStorage.getItem("authInfo") || "{}");

  useEffect(() => {
    if (!userId) return;
    // Define the Firestore collection
    const forecastCollectionRef = collection(db, "forecast");

    // Define the Firebase query
    const queryCities = query(
      forecastCollectionRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(3)
    );

    // Firestore listener, if Firbase db changed, update the state
    const unsubscribe = onSnapshot(queryCities, (snapshot) => {
      const cities: string[] = [];
      snapshot.docs.forEach((doc) => {
        if (!doc.data().city) return;
        cities.push(doc.data().city);
      });
      setSearchedCities(cities);
    });

    //cleanup function
    return () => unsubscribe();
  }, [userId]);

  return { searchedCities };
}
