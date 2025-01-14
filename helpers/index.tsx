import { Platform } from "react-native"

export const isAndroid = Platform.OS === 'android'

export const dificultColor = {
  easy: 'lightgreen',
  medium: 'yellow',
  hard: 'violet'
}

export const starColor = (isLiked: boolean) => {
  if (isLiked) {
    return {
      color: isAndroid ? 'yellow' : 'pink',
      name: isAndroid ? 'star-sharp' : 'heart-sharp'
    }
  }

  return {
    color: isAndroid ? 'green' : '',
    name: isAndroid ? 'star-outline' : 'heart-outline',
  }
}
