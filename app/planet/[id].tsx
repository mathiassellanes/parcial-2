import { usePlanetById } from '@/hooks/fetchHooks';
import { router, useGlobalSearchParams } from 'expo-router';
import { FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { id } = useGlobalSearchParams()

  const { planet } = usePlanetById(id);

  return (
    <SafeAreaView style={styles.appComponent}>
      <View style={styles.stepContainer}>
        <Text>{planet?.name}</Text>
        <Text>{planet?.description}</Text>
        <Text>{planet?.moons}</Text>
        <Text>{planet?.moon_names.join(', ')}</Text>
        <Image source={{ uri: planet?.image }} style={styles.reactLogo} />
        <Pressable onPress={() => router.navigate('/')} style={styles.planetCardButton}>
          <Text>Go back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fffff',
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
  appComponent: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});
