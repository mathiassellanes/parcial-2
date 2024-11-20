import { useState } from "react";
import { SectionListComponent, Text, TextInput, View } from "react-native";

const planetForm = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    moons: "",
    moon_names: "",
    image: "",
  });

  return (
    <View>
      <TextInput
        onChange={(nombre) => setForm({
          ...form,
          name: nombre
        })}
        value={form.name}
        placeholder="Name"
      />
      <TextInput
        onChange={(descripcion) => setForm({
          ...form,
          description: descripcion
        })}
        value={form.description}
        placeholder="Description" />
      <TextInput
        placeholder="Moons"
        value={form.moons}
        onChange={(lunas) => setForm({
          ...form,
          moons: lunas
        })}
      />
      <TextInput
        placeholder="Moon names"
        value={form.moon_names}
        onChange={(nombres) => setForm({
          ...form,
          moon_names: nombres
        })}
      />
      <TextInput
        placeholder="Image"
        value={form.image}
        onChange={(imagen) => setForm({
          ...form,
          image: imagen
        })}
      />
    </View>
  );
}

export default planetForm;
