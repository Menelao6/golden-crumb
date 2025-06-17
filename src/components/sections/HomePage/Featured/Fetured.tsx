import Link from "next/link"
import Styles from "./Featured.module.css"
import Image from "next/image"

export default function Featured() {
    const featuredItems = [
        {
            id: 1,
            name: "Croisant",
            description: "Buttery, flaky viennoiserie pastry",
            price: 3.99,
            image: "/assets/Croisant.jpg"
        },
        {
            id: 2,
            name: "Macarons",
            description: "Delicate French sandwich cookies",
            price: 2.50,
            image: "/assets/macarons.jpg"
        },
        {
            id: 3,
            name: "Chocolate Éclair",
            description: "Choux pastry filled with cream",
            price: 4.25,
            image: "/assets/eclair.jpg"
        }
       ]

       return (
    <section className={`${Styles.featured} section section--alt-1`}>
      <div className="container">
        <div className={Styles.sectionHeader}>
          <h2>Our Featured Delights</h2>
          <p>Discover our most loved pastries</p>
        </div>
        
        <div className={Styles.featuredGrid}>
          {featuredItems.map(item => (
            <div key={item.id} className={Styles.featuredCard}>
              <div className={Styles.cardImage}>
                <Image
                  src={item.image} 
                  alt={item.name} 
                  className={Styles.productImage}
                  width= {400}
                  height= {300}
                />
              </div>
              <div className={Styles.cardContent}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className={Styles.cardFooter}>
                  <span className={Styles.price}>${item.price.toFixed(2)}</span>
                  <button className={Styles.addButton}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className={Styles.ctaContainer}>
          <Link href="/menu" className="button">
            View Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
