import { useCart } from '@/context/CartContext'
import Styles from './OrderReview.module.css'

export default function OrderReview({ 
  shippingInfo, 
  paymentMethod,
  onBack,
  onPlaceOrder
}: { 
  shippingInfo: any
  paymentMethod: string
  onBack: () => void
  onPlaceOrder: () => void
}) {
  const { state: cartState } = useCart()
  
  const getPaymentMethodLabel = () => {
    switch(paymentMethod) {
      case 'credit-card': return 'Credit/Debit Card'
      case 'paypal': return 'PayPal'
      case 'apple-pay': return 'Apple Pay'
      default: return paymentMethod
    }
  }

  return (
    <div className={Styles.orderReview}>
      <h2 className={Styles.sectionTitle}>Review Your Order</h2>
      
      <div className={Styles.reviewSections}>
        <div className={Styles.section}>
          <h3>Shipping Information</h3>
          <div className={Styles.sectionContent}>
            <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
            <p>{shippingInfo.address}</p>
            <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
            <p>{shippingInfo.country}</p>
            <p>{shippingInfo.email}</p>
            <p>{shippingInfo.phone}</p>
          </div>
        </div>
        
        <div className={Styles.section}>
          <h3>Shipping Method</h3>
          <div className={Styles.sectionContent}>
            <p>
              {shippingInfo.shippingMethod === 'standard' 
                ? 'Standard Shipping (3-5 business days) • Free' 
                : 'Express Shipping (1-2 business days) • $9.99'}
            </p>
          </div>
        </div>
        
        <div className={Styles.section}>
          <h3>Payment Method</h3>
          <div className={Styles.sectionContent}>
            <p>{getPaymentMethodLabel()}</p>
          </div>
        </div>
        
        <div className={Styles.section}>
          <h3>Order Summary</h3>
          <div className={Styles.orderItems}>
            {cartState.items.map(item => (
              <div key={item.id} className={Styles.orderItem}>
                <div className={Styles.itemInfo}>
                  <span className={Styles.itemName}>{item.name}</span>
                  <span className={Styles.itemQuantity}>x {item.quantity}</span>
                </div>
                <div className={Styles.itemPrice}>${(item.price * (item.quantity || 1)).toFixed(2)}</div>
              </div>
            ))}
          </div>
          
          <div className={Styles.orderSummary}>
            <div className={Styles.summaryRow}>
              <span>Subtotal</span>
              <span>${cartState.totalPrice.toFixed(2)}</span>
            </div>
            <div className={Styles.summaryRow}>
              <span>Shipping</span>
              <span>{shippingInfo.shippingMethod === 'standard' ? 'Free' : '$9.99'}</span>
            </div>
            <div className={Styles.summaryRow}>
              <span>Tax (20%)</span>
              <span>${(cartState.totalPrice * 0.20).toFixed(2)}</span>
            </div>
            <div className={`${Styles.summaryRow} ${Styles.total}`}>
              <span>Total</span>
              <span>
                $
                {(
                  cartState.totalPrice * 1.20 + 
                  (shippingInfo.shippingMethod === 'express' ? 9.99 : 0)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className={Styles.formActions}>
        <button 
          type="button" 
          className={Styles.backButton}
          onClick={onBack}
        >
          Back to Payment
        </button>
        <button 
          type="button" 
          className={Styles.placeOrderButton}
          onClick={onPlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  )
}