import { patchDestination } from "@/api"
import { Destination } from "@/types/destination"
import { Dispatch, SetStateAction } from "react"

export const handleFavorite = async (
  id: string,
  isFavorite: boolean,
  destinations: Destination[] | Destination,
  setDestinations: Dispatch<SetStateAction<Destination[] | Destination>>
) => {
  const destinationPatched = await patchDestination(id, { isFavorite: !isFavorite })

  console.log(destinationPatched)

  if (Array.isArray(destinations)) {
    setDestinations(destinations.map((destination: Destination) => ({
      ...destination,
      isFavorite: destination.id === id ? !destination.isFavorite : destination.isFavorite
    })))
  } else {
    setDestinations({
      ...destinations,
      isFavorite: destinations.id === id ? !destinations.isFavorite : destination.isFavorite
    })
  }
}
