import { useModal } from '@/context/modalContext';
import { Link, router } from 'expo-router';
import { Button, Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function Modal({ children }: { children: React.ReactNode }) {
  const {closeModal, setData} = useModal();

  const handleClose = () => {
    setData(null)
    closeModal();
  }

  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000040',
      }}
    >
      <Pressable
        style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }}
        onPress={handleClose}
      />
      <Animated.View
        entering={SlideInDown}
        style={{
          width: '90%',
          height: '40%',
          borderRadius: 10,
          elevation: 1,
          shadowColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}
