import Form from '@/components/Form';
import { Link, router } from 'expo-router';
import { Button, Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

export default function Modal({ children }: { children: React.ReactNode }) {
  const goBack = () => {
    router.dismiss();
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
        style={{ flex: 1, width: '100%' }}
        onPress={goBack}
      />
      <Animated.View
        entering={SlideInDown}
        style={{
          width: '90%',
          height: '80%',
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
