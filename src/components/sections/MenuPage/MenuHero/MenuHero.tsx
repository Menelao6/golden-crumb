import Styles from './MenuHero.module.css'

export default function MenuHero() {
  return (
    <section className={Styles.menuHero}>
      <div className="container">
        <div className={Styles.content}>
          <h1>Our Delicious Selection</h1>
          <p>Freshly baked pastries made daily with premium ingredients</p>
        </div>
      </div>
    </section>
  )
}