"use client";
import Navbar from "../../components/layout/Navbar/Navbar";
import Footer from "../../components/layout/Footer/Footer";
import { useCart } from '../../context/CartContext';
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
  const { dispatch } = useCart()

  const handleAddToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', item: product })
  }

  return (
    <div>
      <Navbar />
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
      <Footer />
    </div>
  )
}