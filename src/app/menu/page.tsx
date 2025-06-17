"use client";
import MenuHero from "../../components/sections/MenuPage/MenuHero/MenuHero";
import CategoryNav from "../../components/sections/MenuPage/CategoryNav/CategoryNav";
import DietaryFilters from "../../components/sections/MenuPage/DietaryFilters/DietaryFilters";
import DailySpecials from "../../components/sections/MenuPage/DailySpecials/DailySpecials";
import ProductGrid from "../../components/sections/MenuPage/ProductGrid/ProductGrid";
import { useState } from 'react'
import { Product } from '../../types/index'


export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [dietaryFilters, setDietaryFilters] = useState({
    vegan: false,
    glutenFree: false,
    sugarFree: false
  })
  const [sortOption, setSortOption] = useState('popular')
  const [cartItems, setCartItems] = useState<Product[]>([])

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  return (
    <div>
      <MenuHero />
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CategoryNav 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <DietaryFilters 
              dietaryFilters={dietaryFilters}
              onFilterChange={setDietaryFilters}
            />
          </div>
          <div className="lg:col-span-3">
            <DailySpecials />
            <ProductGrid 
              activeCategory={activeCategory}
              dietaryFilters={dietaryFilters}
              sortOption={sortOption}
              onSortChange={setSortOption}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
            />
          </div>
        </div>
      </div>
    </div>
  )
}