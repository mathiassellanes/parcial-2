import DestinationCard from '@/components/Destination';
import { useModal } from '@/context/modalContext';
import { useDestinations } from '@/hooks/fetchHooks';
import { useEffect } from 'react';

import { Dimensions, FlatList, SafeAreaView, StyleSheet} from 'react-native';

const dimension = Dimensions.get('screen')

export default function Destinations() {
  const { dataUpdated } = useModal()

  console.log()

  const { destinations, setDestinations, fetchDestinations } = useDestinations();

  useEffect(() => {
    if (dataUpdated) {
      fetchDestinations()
    }
  }, [dataUpdated])

  return (
    <SafeAreaView style={styles.appComponent}>
      <FlatList
        style={{maxHeight: dimension.height * 0.85}}
        data={destinations}
        keyExtractor={(destination, index) => `${destination.id}${index}`}
        renderItem={({ item }) => (
          <DestinationCard
            {...item}
            id={item.id}
            destinations={destinations}
            setDestinations={setDestinations}
          />
        )}
      />
    </SafeAreaView>
  );
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
    backgroundColor: '#f0f0f0',
    height: '100%'
  },
});
