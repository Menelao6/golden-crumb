import { FiClock, FiMapPin } from 'react-icons/fi'
import Styles from './VisitUs.module.css'

export default function VisitUs() {
  return (
    <section className={`${Styles.visitUs} section`}>
      <div className="container">
        <div className={Styles.contentWrapper}>
          <div className={Styles.textContent}>
            <h2>Visit Our Bakery</h2>
            <p className={Styles.description}>We&apos;d love to see you in person! Come visit our cozy bakery and experience the warmth and aroma of freshly baked pastries.</p>
            
            <div className={Styles.infoItem}>
              <FiMapPin className={Styles.icon} />
              <div>
                <h3>Location</h3>
                <p>123 Tirana, Albania</p>
              </div>
            </div>
            
            <div className={Styles.infoItem}>
              <FiClock className={Styles.icon} />
              <div>
                <h3>Opening Hours</h3>
                <p>Monday - Friday: 7am - 7pm</p>
                <p>Saturday - Sunday: 8am - 4pm</p>
              </div>
            </div>
          </div>
          
          <div className={Styles.mapContainer}>
            <div className={Styles.map}>
              {/* Replace with your actual map embed */}
              <div className={Styles.placeholderMap}>
                <p>Map will be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}