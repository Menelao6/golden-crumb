import Link from 'next/link'
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import Styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className="container">
        <div className={Styles.footerContent}>
          <div className={Styles.footerColumn}>
            <div className={Styles.logo}>
              <Link href="/">
                <span className={Styles.logoText}>Golden Crumb</span>
              </Link>
            </div>
            <p className={Styles.description}>
              Crafting delicious pastries with love and the finest ingredients since 2010.
            </p>
            <div className={Styles.socials}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FiInstagram />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FiFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FiTwitter />
              </a>
            </div>
          </div>
          
          <div className={Styles.footerColumn}>
            <h3 className={Styles.columnTitle}>Quick Links</h3>
            <ul className={Styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/login">Login</Link></li>
            </ul>
          </div>
          
          <div className={Styles.footerColumn}>
            <h3 className={Styles.columnTitle}>Contact Us</h3>
            <ul className={Styles.contactInfo}>
              <li>
                <FiMapPin />
                <span>123 Tirana, Albania</span>
              </li>
              <li>
                <FiPhone />
                <span>(+355) 456-789-566</span>
              </li>
              <li>
                <FiMail />
                <span>info@goldencrumb.com</span>
              </li>
            </ul>
          </div>
          
          <div className={Styles.footerColumn}>
            <h3 className={Styles.columnTitle}>Newsletter</h3>
            <p className={Styles.newsletterText}>Subscribe to receive updates and special offers</p>
            <form className={Styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className={Styles.emailInput}
                required
              />
              <button type="submit" className={Styles.subscribeButton}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className={Styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Golden Crumb Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}