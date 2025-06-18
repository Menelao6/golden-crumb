'use client'
import { FiX, FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import Styles from './CartPreview.module.css'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartPreview({ 
  isOpen, 
  toggleCart
}: {
  isOpen: boolean
  toggleCart: () => void
  cartItems?: { id: number, name: string, price: number, image: string, quantity?: number }[]
}) {
  const { state, dispatch } = useCart()
  
  const handleRemoveItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', id })
  }
  
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', id })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', id, quantity })
    }
  }

  return (
    <div className={`${Styles.cartPreview} ${isOpen ? Styles.active : ''}`}>
      <div className={Styles.cartHeader}>
        <h3><FiShoppingCart /> Your Cart ({state.totalItems})</h3>
        <button onClick={toggleCart} className={Styles.closeCart}>
          <FiX />
        </button>
      </div>
      
      <div className={Styles.cartContent}>
        {state.items.length > 0 ? (
          <>
            <ul className={Styles.cartItems}>
              {state.items.map(item => (
                <li key={item.id} className={Styles.cartItem}>
                  <div className={Styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={Styles.itemDetails}>
                    <h4 className={Styles.itemName}>{item.name}</h4>
                    <p className={Styles.itemPrice}>${item.price.toFixed(2)}</p>
                    <div className={Styles.quantityControls}>
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className={Styles.quantityButton}
                      >
                        -
                      </button>
                      <span className={Styles.quantity}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className={Styles.quantityButton}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className={Styles.removeButton}
                  >
                    <FiTrash2 />
                  </button>
                </li>
              ))}
            </ul>
            
            <div className={Styles.cartSummary}>
              <div className={Styles.summaryRow}>
                <span>Subtotal</span>
                <span>${state.totalPrice.toFixed(2)}</span>
              </div>
              <div className={Styles.summaryRow}>
                <span>Tax</span>
                <span>${(state.totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className={`${Styles.summaryRow} ${Styles.total}`}>
                <span>Total</span>
                <span>${(state.totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
            
            <div className={Styles.cartActions}>
              <Link href="/cart" className={Styles.viewCartButton} onClick={toggleCart}>
                View Full Cart
              </Link>
              <Link href="/checkout" className={Styles.checkoutButton} onClick={toggleCart}>
                Proceed to Checkout
              </Link>
            </div>
          </>
        ) : (
          <div className={Styles.emptyCart}>
            <p>Your cart is empty</p>
            <Link href="/menu" className={Styles.shopButton} onClick={toggleCart}>
              Browse Menu
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}