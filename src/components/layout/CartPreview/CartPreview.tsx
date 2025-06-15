'use client'
import { FiX, FiShoppingCart } from 'react-icons/fi'
import Styles from './CartPreview.module.css'

export default function CartPreview({ 
  isOpen, 
  toggleCart,
  cartItems 
}: {
  isOpen: boolean
  toggleCart: () => void
  cartItems: number
}) {
  return (
    <div className={`${Styles.cartPreview} ${isOpen ? Styles.active : ''}`}>
      <div className={Styles.cartHeader}>
        <h3><FiShoppingCart /> Your Cart ({cartItems})</h3>
        <button onClick={toggleCart} className={Styles.closeCart}>
          <FiX />
        </button>
      </div>
      <div className={Styles.cartContent}>
        {cartItems > 0 ? (
          <div className={Styles.cartItem}>
            <p>Croissant</p>
            <p>1 x $3.99</p>
          </div>
        ) : (
          <p className={Styles.emptyCart}>Your cart is empty</p>
        )}
      </div>
    </div>
  )
}