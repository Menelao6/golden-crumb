import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import Styles from './ProductGrid.module.css'
import { Product, DietaryFilters } from '../../../../types/index'
import { useCart } from '../../../../context/CartContext'

interface ProductGridProps {
  activeCategory: string
  dietaryFilters: DietaryFilters
  sortOption: string
  onSortChange: (option: string) => void
  onAddToCart: (product: Product) => void
  cartItems: Product[]
}

export default function ProductGrid({ 
  activeCategory, 
  dietaryFilters, 
  sortOption, 
  onSortChange,
  onAddToCart,
  cartItems
}: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const {state: cartState } = useCart()
  
  // Fetch products from API (simulated)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Mock data
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "Butter Croissant",
            description: "Classic French croissant with layers of buttery goodness",
            price: 3.99,
            image: "/assets/products/Croissant.jpg",
            category: "pastries",
            dietary: []
          },
          {
            id: 2,
            name: "Chocolate Éclair",
            description: "Choux pastry filled with vanilla cream and topped with chocolate",
            price: 4.25,
            image: "/assets/products/eclair.jpg",
            category: "pastries",
            dietary: []
          },
          {
            id: 3,
            name: "Almond Croissant",
            description: "Croissant filled with almond cream and topped with sliced almonds",
            price: 4.50,
            image: "/assets/products/almond-croissant.jpg",
            category: "pastries",
            dietary: []
          },
          {
            id: 4,
            name: "Berry Tart",
            description: "Buttery tart shell filled with pastry cream and fresh berries",
            price: 5.75,
            image: "/assets/products/berry-tart.jpg",
            category: "pastries",
            dietary: []
          },
          {
            id: 5,
            name: "Chocolate Chip Cookie",
            description: "Classic cookie loaded with chocolate chips",
            price: 2.50,
            image: "/assets/products/chocolate-chip-cookie.jpg",
            category: "cookies",
            dietary: []
          },
          {
            id: 6,
            name: "Baguette",
            description: "Traditional French baguette with crispy crust",
            price: 3.25,
            image: "/assets/products/baguette.jpg",
            category: "breads",
            dietary: ["vegan"]
          },
          {
            id: 7,
            name: "Vegan Brownie",
            description: "Rich chocolate brownie made without animal products",
            price: 3.75,
            image: "/assets/products/vegan-brownie.jpg",
            category: "cookies",
            dietary: ["vegan"]
          },
          {
            id: 8,
            name: "Gluten-Free Muffin",
            description: "Blueberry muffin made with gluten-free flour",
            price: 3.50,
            image: "/assets/products/gluten-free-muffin.jpg",
            category: "pastries",
            dietary: ["glutenFree"]
          }
        ]
        
        setProducts(mockProducts)
        setIsLoading(false)
      } catch (error) {
        console.error("Failed to fetch products", error)
        setIsLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]
    
    // Apply category filter
    if (activeCategory !== 'all') {
      result = result.filter(product => 
        product.category === activeCategory || 
        (activeCategory === 'vegan' && product.dietary.includes('vegan')) ||
        (activeCategory === 'gluten-free' && product.dietary.includes('glutenFree'))
      )
    }
    
    // Apply dietary filters
    if (dietaryFilters.vegan) {
      result = result.filter(product => product.dietary.includes('vegan'))
    }
    if (dietaryFilters.glutenFree) {
      result = result.filter(product => product.dietary.includes('glutenFree'))
    }
    if (dietaryFilters.sugarFree) {
      result = result.filter(product => product.dietary.includes('sugarFree'))
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price)
      case 'price-high':
        return result.sort((a, b) => b.price - a.price)
      case 'popular':
      default:
        return result
    }
  }, [products, activeCategory, dietaryFilters, sortOption])

  // Get quantity in cart for a product
  const getQuantityInCart = (productId: number): number => {
    const item = cartItems.find(item => item.id === productId)
    return typeof item?.quantity === 'number' ? item.quantity : 0
  }

  if (isLoading) {
    return (
      <div className={Styles.loadingContainer}>
        <div className={Styles.spinner}></div>
        <p>Loading delicious pastries...</p>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className={Styles.emptyContainer}>
        <h3>No products found</h3>
        <p>Try adjusting your filters</p>
      </div>
    )
  }

  return (
    <div className={Styles.productGrid}>
      <div className={Styles.gridHeader}>
        <h2 className={Styles.gridTitle}>
          {activeCategory === 'all' ? 'All Pastries' : 
           activeCategory === 'vegan' ? 'Vegan Options' : 
           activeCategory === 'gluten-free' ? 'Gluten-Free' : 
           activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        <div className={Styles.sortOptions}>
          <label>Sort by:</label>
          <select 
            className={Styles.sortSelect}
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      <div className={Styles.productsContainer}>
        {filteredProducts.map(product => {
          const inCartQuantity = cartState.items.find(item => item.id === product.id)?.quantity || 0
          return (
            <div key={product.id} className={Styles.productCard}>
              <div className={Styles.cardImage}>
                <Image 
                src={product.image} alt={product.name} 
                width={200} height={200}
                />
              </div>
              <div className={Styles.cardContent}>
                <h3 className={Styles.productName}>{product.name}</h3>
                <p className={Styles.productDescription}>{product.description}</p>
                {product.dietary.length > 0 && (
                  <div className={Styles.dietaryTags}>
                    {product.dietary.includes('vegan') && (
                      <span className={Styles.tagVegan}>Vegan</span>
                    )}
                    {product.dietary.includes('glutenFree') && (
                      <span className={Styles.tagGlutenFree}>Gluten-Free</span>
                    )}
                    {product.dietary.includes('sugarFree') && (
                      <span className={Styles.tagSugarFree}>Sugar-Free</span>
                    )}
                  </div>
                )}
                <div className={Styles.cardFooter}>
                  <span className={Styles.productPrice}>${product.price.toFixed(2)}</span>
                  <div className={Styles.quantityControls}>
                    {inCartQuantity > 0 && (
                      <>
                        <button 
                          className={Styles.quantityButton}
                          onClick={() => onAddToCart({...product, quantity: -1})}
                        >
                          -
                        </button>
                        <span className={Styles.quantityDisplay}>{inCartQuantity}</span>
                      </>
                    )}
                    <button 
                      className={`${Styles.addButton} ${inCartQuantity > 0 ? Styles.addButtonActive : ''}`}
                      onClick={() => onAddToCart(product)}
                    >
                      {inCartQuantity > 0 ? '+' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}