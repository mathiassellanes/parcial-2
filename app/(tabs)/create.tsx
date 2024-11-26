import Form from "@/components/Form"
import { router } from "expo-router";
import { SafeAreaView } from "react-native";

const CreateScreen = () => {
  const handleOnSubmit = () => {
    router.navigate('/')
  }

  return (
    <SafeAreaView>
      <Form onSubmit={handleOnSubmit} />
    </SafeAreaView>
  )
}

export default CreateScreen;
