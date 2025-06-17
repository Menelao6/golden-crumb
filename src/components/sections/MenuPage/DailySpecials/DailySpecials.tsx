import Link from 'next/link'
import Styles from './DailySpecials.module.css'
import { FiClock } from 'react-icons/fi'

export default function DailySpecials() {
  const specials = [
    { id: 1, name: "Croissant Combo", discount: "20% OFF", description: "3 croissants + coffee", link: "/menu/croissant-combo" },
    { id: 2, name: "Macaron Box", discount: "15% OFF", description: "12-piece assorted macarons", link: "/menu/macaron-box" }
  ]

  return (
    <div className={Styles.specialsContainer}>
      <div className={Styles.specialsHeader}>
        <h2 className={Styles.sectionTitle}>Todays Specials</h2>
        <div className={Styles.timer}>
          <FiClock className={Styles.clockIcon} />
          <span>Ends in 4:23:12</span>
        </div>
      </div>
      <div className={Styles.specialsGrid}>
        {specials.map(special => (
          <Link key={special.id} href={special.link} className={Styles.specialCard}>
            <div className={Styles.specialContent}>
              <h3 className={Styles.specialName}>{special.name}</h3>
              <p className={Styles.specialDiscount}>{special.discount}</p>
              <p className={Styles.specialDescription}>{special.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}