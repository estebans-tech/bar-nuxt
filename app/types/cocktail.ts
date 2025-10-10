// Public types for cocktail UI

export interface CocktailCard {
  id: string
  name: string
  price: number
  flavorNote: string
  imageSrc: string
  alt?: string
  tags?: string[]
}