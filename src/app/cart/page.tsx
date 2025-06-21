'use client'
import { useCart } from '../../context/CartContext'
import Link from 'next/link'
import Styles from './CartPage.module.css'

export default function CartPage() {
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
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (

    <div className="container py-12">
      <h1 className={Styles.pageTitle}>Your Shopping Cart</h1>
      
      {state.items.length > 0 ? (
        <div className={Styles.cartContainer}>
          <div className={Styles.cartItems}>
            <div className={Styles.cartHeader}>
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>
            
            <ul className={Styles.itemsList}>
              {state.items.map(item => (
                <li key={item.id} className={Styles.cartItem}>
                  <div className={Styles.itemInfo}>
                    <div className={Styles.itemImage}>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div>
                      <h3 className={Styles.itemName}>{item.name}</h3>
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className={Styles.removeButton}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className={Styles.itemPrice}>${item.price.toFixed(2)}</div>
                  
                  <div className={Styles.itemQuantity}>
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
                  
                  <div className={Styles.itemTotal}>
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
            
            <div className={Styles.cartActions}>
              <Link href="/menu" className={Styles.continueButton}>
                Continue Shopping
              </Link>
              <button onClick={clearCart} className={Styles.clearButton}>
                Clear Cart
              </button>
            </div>
          </div>
          
          <div className={Styles.cartSummary}>
            <h2 className={Styles.summaryTitle}>Order Summary</h2>
            
            <div className={Styles.summaryDetails}>
              <div className={Styles.summaryRow}>
                <span>Subtotal</span>
                <span>${state.totalPrice.toFixed(2)}</span>
              </div>
              <div className={Styles.summaryRow}>
                <span>Tax (20%)</span>
                <span>${(state.totalPrice * 0.2).toFixed(2)}</span>
              </div>
              <div className={Styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className={`${Styles.summaryRow} ${Styles.total}`}>
                <span>Total</span>
                <span>${(state.totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
            
            <Link href="/checkout" className={Styles.checkoutButton}>
              Proceed to Checkout
            </Link>
            
            <div className={Styles.paymentOptions}>
              <div className={Styles.paymentIcons}>
                <span>We accept:</span>
                <div className={Styles.icons}>
                  <img src="/assets/social/visa.svg" alt="Visa" />
                  <img src="/assets/social/mastercard.svg" alt="Mastercard" />
                  <img src="/assets/social/amex.svg" alt="American Express" />
                  <img src="/assets/social/paypal.svg" alt="PayPal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={Styles.emptyCart}>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <Link href="/menu" className={Styles.shopButton}>
            Browse Menu
          </Link>
        </div>
      )}
    </div>
  )
}