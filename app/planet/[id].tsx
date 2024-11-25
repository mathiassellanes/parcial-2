import { useModal } from '@/context/modalContext';
import { usePlanetById } from '@/hooks/fetchHooks';
import { router, useGlobalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useRef } from 'react';
import { FlatList, Animated, Image, Pressable, SafeAreaView, StyleSheet, Text, View, Easing } from 'react-native';

export default function HomeScreen() {
  const { id } = useGlobalSearchParams()
  const rotateValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const { setData } = useModal();

  const { planet } = usePlanetById(id);

  console.log(planet);

  useEffect(() => {
    navigation.setOptions({
      title: planet?.name,
    });
  }, [planet]);

  const combinedStyle = {
    transform: [
      {
        rotate: rotateValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
          easing: Easing.linear
        }),
      ])
    ).start();
  }, []);

  return (
    <SafeAreaView style={styles.appComponent}>
      <View style={styles.stepContainer}>
        <View style={styles.stepContainerInfo}>
          <Text style={styles.title}>{planet?.name}</Text>
          <Animated.Image source={{ uri: planet?.image }} style={[styles.box, combinedStyle]} />
          <Text style={styles.text}>{planet?.description}</Text>
          <Text style={styles.text}>{planet?.moons ? `${planet?.moons} Moon${planet?.moons > 1 ? 's' : ''}: ` : 'Doesn`t have moons'}{planet?.moon_names.join(', ')}{planet?.moons > planet?.moon_names.length ? '...' : ''}</Text>
        </View>
        <Pressable onPress={() => router.navigate('/')} style={styles.planetCardButton}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable onPress={() => {
          setData(planet);
          router.navigate('/planet/modal')
        }} style={styles.planetCardButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </Pressable>
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
  stepContainerInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 1,
  },
  planetCardButton: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  buttonText: {
    color: 'white',
  },
  text: {
    color: 'white',
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
    backgroundColor: 'black',
  },
});
