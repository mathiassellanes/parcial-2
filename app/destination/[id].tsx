import { deleteDestination } from '@/api';
import { difficulties } from '@/constants/difficultyOptions';
import { useModal } from '@/context/modalContext';
import { dificultColor, starColor } from '@/helpers';
import { handleFavorite } from '@/helpers/handleFavorite';
import { useDestinationById } from '@/hooks/fetchHooks';
import { Ionicons } from '@expo/vector-icons';
import { router, useGlobalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Easing } from 'react-native';

export default function Destination() {
  const { id } = useGlobalSearchParams()
  const navigation = useNavigation();
  const { setData, dataUpdated } = useModal();

  const { destination, setDestination } = useDestinationById(Array.isArray(id) ? id[0] : id)

  const handleDelete = async () => {
    await deleteDestination(destination.id);

    router.push('/')
  }

  useEffect(() => {
    navigation.setOptions({
      title: destination?.name,
    });
  }, [destination]);

  useEffect(() => {
    setDestination(dataUpdated)
  }, [dataUpdated])

  return (
    <SafeAreaView style={styles.appComponent}>
      <Pressable style={styles.startButton} onPress={() => handleFavorite(destination?.id!, destination?.isFavorite!, destination!, setDestination)}>
        <Ionicons {...(starColor(destination?.isFavorite!))} size={30} />
      </Pressable>
      <Text style={{ backgroundColor: dificultColor[destination?.difficulty], ...styles.difficulty }}>
        {difficulties[destination?.difficulty]}
      </Text>
      <View style={styles.stepContainer}>
        <View style={styles.stepContainerInfo}>
          <Text style={styles.title}>{destination?.name}</Text>
          <Text style={styles.text}>{destination?.description}</Text>
        </View>

        <View style={styles.flexRow}>
          <Pressable onPress={handleDelete} style={{ ...styles.destinationCardButton, ...styles.deleteButton }}>
            <Text style={styles.buttonText}>Eliminar</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setData(destination);
              router.navigate('/destination/modal')
            }}
            style={styles.destinationCardButton}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'column',
    flex: 1,
    gap: 10,
    justifyContent: 'space-between',
    width: '80%',
    alignItems: 'center',
  },
  difficulty: {
    position: 'absolute',
    top: 40,
    left: 40,
    padding: 10,
    borderRadius: 5,
  },
  startButton: {
    position: 'absolute',
    top: 40,
    right: 40,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 40,
    justifyContent: 'space-evenly'
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  stepContainerInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 1,
  },
  destinationCardButton: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    color: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '40%',
    maxHeight: 50,
  },
  buttonText: {
    color: 'white',
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  box: {
    width: '100%',
    aspectRatio: 1,
  },
  reactLogo: {
    width: '80%',
    aspectRatio: 1,
  },
  appComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
