export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  dietary: string[]
  quantity?: number
}

export type DietaryFilters = {
  vegan: boolean
  glutenFree: boolean
  sugarFree: boolean
}