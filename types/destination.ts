export type Destination = {
  id?: string
  name: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  isFavorite: boolean
}
