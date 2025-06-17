import Link from 'next/link'
import Styles from './Highlights.module.css'
import Image from "next/image"

export default function Highlights() {
  const highlights = [
    {
      id: 1,
      title: "Weekend Special",
      description: "Every Saturday and Sunday, enjoy our special pastry bundles at 20% off. Perfect for family gatherings or treating yourself!",
      image: "/assets/weekend-special.jpg",
      cta: "View Weekend Menu",
      link: "/menu?special=weekend"
    },
    {
      id: 2,
      title: "Baking Classes",
      description: "Join our master pastry chef for exclusive baking classes. Learn the secrets behind our most popular pastries in a fun, hands-on environment.",
      image: "/assets/baking-class.jpg",
      cta: "Book a Class",
      link: "/classes"
    }
  ]

  return (
    <section className={`${Styles.highlights} section`}>
      <div className="container">
        <div className={Styles.sectionHeader}>
          <h2>Golden Crumb Highlights</h2>
          <p>Discover our special offers and events</p>
        </div>
        
        <div className={Styles.highlightsContainer}>
          {highlights.map((highlight, index) => (
            <div 
              key={highlight.id} 
              className={`${Styles.highlightItem} ${index % 2 === 1 ? Styles.reverse : ''}`}
            >
              <div className={Styles.highlightImage}>
                <Image
                  src={highlight.image} 
                  alt={highlight.title} 
                  className={Styles.highlightImg}
                    width={400}
                    height={300}
                />
              </div>
              <div className={Styles.highlightContent}>
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
                <Link href={highlight.link} className={Styles.highlightButton}>
                  {highlight.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}