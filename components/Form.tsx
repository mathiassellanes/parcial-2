import DropDownPicker from 'react-native-dropdown-picker';
import { useEffect, useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { useModal } from '@/context/modalContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';
import { addDestination, updateDestination } from '@/api';
import { Destination } from '@/types/destination';
import { difficultyOptions } from '@/constants/difficultyOptions';

export type Planet = {
  id: number;
  name: string;
  description: string;
  moons: number;
  moon_names: string[];
  image: string;
};

const Form = ({ onSubmit }: { onSubmit?: () => void }) => {
  const { data, closeModal, setDataUpdated } = useModal();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [difficulty, setDifficulty] = useState('');
  const [open, setOpen] = useState(false);

  const [destination, setDestination] = useState<Destination>({
    name: data?.name || '',
    description: data?.description || '',
    difficulty: data?.difficulty || 'easy',
    isFavorite: data?.isFavorite || false,
  });

  const handleInputChange = (field: keyof Planet, value: any) => {
    setDestination({ ...destination, [field]: value });
  };

  const handleSubmit = async () => {
    if (data) {
      const dataUpdated = await updateDestination(data.id, destination)

      setDataUpdated(dataUpdated)
    } else {
      const dataCreated = await addDestination(destination);

      setDataUpdated(dataCreated)
    }

    setDestination({
      name: '',
      description: '',
      difficulty: 'easy',
      isFavorite: false,
    })
    setDifficulty('easy')

    onSubmit?.()
    closeModal()
  };

  useEffect(() => {
    if (!difficulty) {
      setDifficulty(destination.difficulty)
    }
  }, [destination])

  useEffect(() => {
    setDestination((prevValue) => ({
      ...prevValue,
      difficulty,
    }))
  }, [difficulty])

  return (
    <ThemedView style={styles.container}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>
        {
          data ? 'Editar' : 'Crear'
        } Destino
      </Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Nombre del destino"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        value={destination.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Descripción breve"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        value={destination.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      <DropDownPicker
        open={open}
        value={difficulty}
        items={difficultyOptions}
        setOpen={setOpen}
        setValue={setDifficulty}
        style={[styles.dropdown, isDarkMode && styles.dropdownDark]}
        textStyle={{ color: isDarkMode ? '#fff' : '#000' }}
        placeholder='Elije una dificultad'
      />
      <Button title={
        data ? 'Editar' : 'Crear'
      } onPress={handleSubmit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    height: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  titleDark: {
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: '#000',
  },
  inputDark: {
    borderColor: '#555',
    color: '#fff',
  },
  dropdown: {
    marginBottom: 20,
  },
  dropdownDark: {
    backgroundColor: '#333',
  },
});

export default Form;
