import Link from 'next/link'
import Styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={`${Styles.hero} section`}>
      <div className="container">
        <div className={Styles.heroContent}>
          <h1>Delicious Pastries Crafted with Love</h1>
          <p>Indulge in our handcrafted pastries made from the finest ingredients. Freshly baked every day.</p>
          <div className={Styles.heroButtons}>
            <Link href="/menu" className="button">View Menu</Link>
            <Link href="/contact" className={`${Styles.outlineButton} button`}>Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  )
}