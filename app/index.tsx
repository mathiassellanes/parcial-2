import { usePlanets } from '@/hooks/fetchHooks';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { planets } = usePlanets();

  const navigation = useNavigation();

  const handleGoToPlanetDetails = ({ id }: { id: string }) => {
    router.navigate(`/planet/${id}`);
  }


  return (
    <SafeAreaView style={styles.appComponent}>
      <FlatList
        data={planets}
        keyExtractor={(planet) => planet.id.toString()}
        renderItem={({ item: planet }) => (
          <Pressable onPress={() => handleGoToPlanetDetails({ id: planet.id })} style={styles.planetCardButton}>
            <View style={styles.stepContainer}>
              <Text style={styles.stepContainerText}>{planet.name}</Text>
              <Image source={{ uri: planet.image }} style={styles.reactLogo} />
            </View>
          </Pressable>
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
    backgroundColor: 'black',
  },
  stepContainerText: {
    color: 'white',
  },
  planetCardButton: {
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
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
