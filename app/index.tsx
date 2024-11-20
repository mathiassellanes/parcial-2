import { usePlanets } from '@/hooks/fetchHooks';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { planets } = usePlanets();

  const handleGoToPlanetDetails = ({ id }: { id: string }) => {
    router.navigate(`/form`);
  }

  return (
    <SafeAreaView style={styles.appComponent}>
      <FlatList
        data={planets}
        keyExtractor={(planet) => planet.id.toString()}
        renderItem={({ item: planet }) => (
          <View style={styles.stepContainer}>
            <Text>{planet.name}</Text>
            <Text>{planet.description}</Text>
            <Text>{planet.moons}</Text>
            <Text>{planet.moon_names.join(', ')}</Text>
            <Image source={{ uri: planet.image }} style={styles.reactLogo} />
            <Pressable onPress={() => handleGoToPlanetDetails({id: planet.id}) } style={styles.planetCardButton}>
              <Text style={styles.textDetails}>View details</Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  planetCardButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 10,
    borderRadius: 5,
  },
  reactLogo: {
    width: 100,
    height: 100,
  },
  textDetails: {
    color: 'white'
  },
  appComponent: {
    flex: 1,
    height: '85%',
    backgroundColor: '#f0f0f0',
  },
});
