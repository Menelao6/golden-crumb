'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiShoppingCart, FiUser, FiX, FiMenu } from 'react-icons/fi'
import CartPreview from '../CartPreview/CartPreview'
import Styles from './Navbar.module.css'

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [cartItems] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const toggleNav = () => setIsNavOpen(!isNavOpen)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset
      const isScrollingDown = currentScrollPos > prevScrollPos
      
      if (currentScrollPos > 100 && isScrollingDown) { // Reduced to 100px
        setVisible(false)
        setIsCartOpen(false)
      } else {
        setVisible(true)
      }
      
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <>
      <nav className={`${Styles.navbar} ${visible ? Styles.visible : Styles.hidden}`}>
        <div className={Styles.logo}>
          <Link href="/">
            <Image 
              src="/assets/logo.png" 
              alt="Bakery Logo"
              width={100}
              height={50}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={Styles.desktopLinks}>
          <ul className={Styles.navLinks}>
            <li><Link href="/" className={Styles.navLink}>Home</Link></li>
            <li><Link href="/menu" className={Styles.navLink}>Menu</Link></li>
            <li><Link href="/about" className={Styles.navLink}>About</Link></li>
            <li><Link href="/contact" className={Styles.navLink}>Contact</Link></li>
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className={Styles.desktopActions}>
          <Link href="/login" className={Styles.loginLink}>
            Login
          </Link>
          <button className={Styles.cartButton} onClick={toggleCart}>
            <FiShoppingCart className={Styles.cartIcon} />
            {cartItems > 0 && <span className={Styles.cartBadge}>{cartItems}</span>}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className={Styles.mobileActions}>
          <Link href="/login" className={Styles.userIcon}>
            <FiUser />
          </Link>
          <button className={Styles.cartButton} onClick={toggleCart}>
            <FiShoppingCart className={Styles.cartIcon} />
            {cartItems > 0 && <span className={Styles.cartBadge}>{cartItems}</span>}
          </button>
          <button
            className={`${Styles.menuButton} ${isNavOpen ? Styles.active : ''}`}
            onClick={toggleNav}
            aria-label={isNavOpen ? 'Close menu' : 'Open menu'}
          >
            {isNavOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`${Styles.mobileMenu} ${isNavOpen ? Styles.active : ''}`}>
        <ul className={Styles.mobileLinks}>
          <li><Link href="/" className={Styles.navLink} onClick={toggleNav}>Home</Link></li>
          <li><Link href="/menu" className={Styles.navLink} onClick={toggleNav}>Menu</Link></li>
          <li><Link href="/about" className={Styles.navLink} onClick={toggleNav}>About</Link></li>
          <li><Link href="/contact" className={Styles.navLink} onClick={toggleNav}>Contact</Link></li>
          <li><Link href="/login" className={Styles.navLink} onClick={toggleNav}>Login</Link></li>
          <li><Link href="/register" className={Styles.navLink} onClick={toggleNav}>Register</Link></li>
        </ul>
      </div>

      <CartPreview 
        isOpen={isCartOpen} 
        toggleCart={toggleCart}
        cartItems={cartItems}
      />
    </>
  )
}