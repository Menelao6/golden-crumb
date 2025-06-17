import Image from 'next/image'
import Styles from './About.module.css'

export default function About() {
  return (
    <section className={`${Styles.about} section`}>
      <div className="container">
        <div className={Styles.contentWrapper}>
          <div className={Styles.imageContainer}>
            <Image 
              src="/assets/bakery-interior.jpg" 
              alt="Bakery Interior" 
              width={600}
              height={400}
              className={Styles.image}
            />
          </div>
          
          <div className={Styles.textContent}>
            <h2>Our Story</h2>
            <p className={Styles.description}>
              Founded in 2010, Golden Crumb Bakery started as a small family-owned business with a passion for creating exceptional pastries. Our founder, Maria Rodriguez, brought her grandmothers traditional recipes and combined them with modern techniques to create our signature pastries.
            </p>
            <p className={Styles.description}>
              Today, we continue to use only the finest ingredients, sourcing locally whenever possible. Every item is handcrafted with love and attention to detail, ensuring that each bite brings joy to our customers.
            </p>
            <div className={Styles.cta}>
              <a href="/about" className="button">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}