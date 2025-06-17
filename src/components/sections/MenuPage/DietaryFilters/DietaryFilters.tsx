import Styles from './DietaryFilters.module.css'
import { DietaryFilters as DietaryFiltersType } from '@/types'

interface DietaryFiltersProps {
  dietaryFilters: DietaryFiltersType
  onFilterChange: (filters: DietaryFiltersType) => void
}

export default function DietaryFilters({ 
  dietaryFilters, 
  onFilterChange 
}: DietaryFiltersProps) {
  const handleFilterChange = (filterName: keyof DietaryFiltersType) => {
    onFilterChange({
      ...dietaryFilters,
      [filterName]: !dietaryFilters[filterName]
    })
  }

  return (
    <div className={Styles.dietaryFilters}>
      <h3 className={Styles.filterTitle}>Dietary Preferences</h3>
      <div className={Styles.filterGroup}>
        <label className={Styles.filterLabel}>
          <input
            type="checkbox"
            checked={dietaryFilters.vegan}
            onChange={() => handleFilterChange('vegan')}
          />
          <span className={Styles.checkmark}></span>
          Vegan
        </label>
        
        <label className={Styles.filterLabel}>
          <input
            type="checkbox"
            checked={dietaryFilters.glutenFree}
            onChange={() => handleFilterChange('glutenFree')}
          />
          <span className={Styles.checkmark}></span>
          Gluten-Free
        </label>
        
        <label className={Styles.filterLabel}>
          <input
            type="checkbox"
            checked={dietaryFilters.sugarFree}
            onChange={() => handleFilterChange('sugarFree')}
          />
          <span className={Styles.checkmark}></span>
          Sugar-Free
        </label>
      </div>
    </div>
  )
}