import Styles from './CategoryNav.module.css'

interface CategoryNavProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryNav({ 
  activeCategory, 
  onCategoryChange 
}: CategoryNavProps) {
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'pastries', name: 'Pastries' },
    { id: 'cakes', name: 'Cakes' },
    { id: 'breads', name: 'Breads' },
    { id: 'cookies', name: 'Cookies' },
    { id: 'vegan', name: 'Vegan Options' },
    { id: 'gluten-free', name: 'Gluten-Free' }
  ]

  return (
    <div className={Styles.categoryNav}>
      <h3 className={Styles.categoryTitle}>Categories</h3>
      <ul className={Styles.categoryList}>
        {categories.map(category => (
          <li key={category.id}>
            <button
              className={`${Styles.categoryButton} ${activeCategory === category.id ? Styles.active : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}