import DropDownPicker from 'react-native-dropdown-picker';
import { useState } from 'react';
import { Text, TextInput, View, Button, StyleSheet } from 'react-native';
import { useModal } from '@/context/modalContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedView } from '@/components/ThemedView';

export type Planet = {
  id: number;
  name: string;
  description: string;
  moons: number;
  moon_names: string[];
  image: string;
};

const Form = () => {
  const { data } = useModal();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' }
  ]);

  const [planet, setPlanet] = useState<Planet>({
    id: data?.id || 0,
    name: data?.name || '',
    description: data?.description || '',
    moons: data?.moons || 0,
    moon_names: data?.moon_names || [],
    image: data?.image || ''
  });

  const handleInputChange = (field: keyof Planet, value: any) => {
    setPlanet({ ...planet, [field]: value });
  };

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica para enviar el formulario
    console.log(planet);
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>Form</Text>
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Name"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        value={planet.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Description"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        value={planet.description}
        onChangeText={(text) => handleInputChange('description', text)}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Moons"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        value={planet.moons.toString()}
        keyboardType="numeric"
        onChangeText={(text) => handleInputChange('moons', parseInt(text))}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Moon Names (comma separated)"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        value={planet.moon_names.join(', ')}
        onChangeText={(text) => handleInputChange('moon_names', text.split(',').map(name => name.trim()))}
      />
      <TextInput
        style={[styles.input, isDarkMode && styles.inputDark]}
        placeholder="Image URL"
        placeholderTextColor={isDarkMode ? '#ccc' : '#666'}
        value={planet.image}
        onChangeText={(text) => handleInputChange('image', text)}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={[styles.dropdown, isDarkMode && styles.dropdownDark]}
        textStyle={{ color: isDarkMode ? '#fff' : '#000' }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
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
