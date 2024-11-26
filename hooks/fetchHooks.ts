import { getAllDestinations, getDestinationById } from "@/api"
import { Destination } from "@/types/destination";
import { useEffect, useState } from "react";

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const fetchDestinations = async () => {
    const destinationsresult = await getAllDestinations();

    const { favorite, nonFavorite } = destinationsresult.reduce((prevDestination, destination) => {
      prevDestination[destination.isFavorite ? 'favorite' : 'nonFavorite'].push(destination)

      return prevDestination
    }, { favorite: [], nonFavorite: [] })

    const sortedFavorite = favorite.sort((a, b) => a.name.localeCompare(b.name));
    const sortedNonFavorite = nonFavorite.sort((a,b) => a.name.localeCompare(b.name));

    setDestinations([
      ...sortedFavorite,
      ...sortedNonFavorite
    ]);
  };

  useEffect(() => {
    fetchDestinations();
  }, []);


  return { destinations, setDestinations, fetchDestinations };
}

export const useDestinationById = (id: string) => {
  const [destination, setDestination] = useState<Destination | null>(null);

  const fetchDestination = async () => {
    const destination = await getDestinationById(id);
    setDestination(destination);
  };

  useEffect(() => {
    fetchDestination();
  }, []);

  return { destination, fetchDestination, setDestination };
}
