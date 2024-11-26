import { Dispatch, FC, SetStateAction } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { difficulties } from "@/constants/difficultyOptions";
import { dificultColor, starColor } from "@/helpers";
import { handleFavorite } from "@/helpers/handleFavorite";
import { Ionicons } from "@expo/vector-icons";
import { Destination } from "@/types/destination";

type DestinationCardProps = {
  name: string,
  id: string,
  isFavorite: boolean,
  destinations: Destination[],
  setDestinations: Dispatch<SetStateAction<Destination[]>>,
  difficulty: 'easy' | 'medium' | 'hard'
}

const DestinationCard: FC<DestinationCardProps> = ({
  name,
  id,
  isFavorite,
  destinations,
  setDestinations,
  difficulty
}) => {
  const handleGoToPlanetDetails = () => {
    router.navigate(`/destination/${id}`);
  }

  return (
    <View style={styles.planetCardButton}>
      <View style={styles.stepContainer}>
        <View style={styles.stepContainerInfo}>
          <Text style={styles.stepContainerText}>{name}</Text>
          <Pressable onPress={() => handleFavorite(id, isFavorite, destinations, setDestinations)}>
            <Ionicons {...(starColor(isFavorite))} size={20} />
          </Pressable>
        </View>
        <Text style={{ backgroundColor: dificultColor[difficulty], ...styles.chip }}>
          {difficulties[difficulty]}
        </Text>
        <Button onPress={() => handleGoToPlanetDetails()} title='Ver detalles' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 40
  },
  stepContainerText: {
    color: 'black',
    fontSize: 16,
  },
  chip: {
    padding: 5,
    borderRadius: 5,
  },
  stepContainerInfo: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  planetCardButton: {
    color: 'white',
    padding: 10,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  textDetails: {
    color: 'white'
  },
  appComponent: {
    flex: 1,
    alignItems: 'center',
    maxHeight: '85%',
    backgroundColor: '#f0f0f0',
  },
});

export default DestinationCard;
