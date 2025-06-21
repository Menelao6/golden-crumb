import Link from 'next/link'
import Styles from './OrderDetail.module.css'

export default function OrderDetail({ order }: { order: any }) {
  return (
    <div className={Styles.orderDetail}>
      <div className={Styles.orderSections}>
        <div className={Styles.section}>
          <h2>Shipping Information</h2>
          <div className={Styles.sectionContent}>
            <p>{order.shipping.name}</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
            <p>{order.shipping.country}</p>
            <p className={Styles.shippingMethod}>
              <strong>Shipping Method:</strong> {order.shipping.method}
            </p>
          </div>
        </div>
        
        <div className={Styles.section}>
          <h2>Payment Method</h2>
          <div className={Styles.sectionContent}>
            <p><strong>{order.payment.method}</strong></p>
            <p>Ending in •••• {order.payment.last4}</p>
          </div>
        </div>
      </div>
      
      <div className={Styles.orderItemsSection}>
        <h2>Order Items</h2>
        <div className={Styles.itemsList}>
          {order.items.map((item: any) => (
            <div key={item.id} className={Styles.itemRow}>
              <div className={Styles.itemInfo}>
                <div className={Styles.itemImage}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div>
                  <h3 className={Styles.itemName}>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className={Styles.itemQuantity}>
                <span>{item.quantity}</span>
              </div>
              <div className={Styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className={Styles.orderSummary}>
        <div className={Styles.summaryRow}>
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className={Styles.summaryRow}>
          <span>Shipping</span>
          <span>{order.shippingCost > 0 ? `$${order.shippingCost.toFixed(2)}` : 'Free'}</span>
        </div>
        <div className={Styles.summaryRow}>
          <span>Tax</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className={`${Styles.summaryRow} ${Styles.total}`}>
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className={Styles.orderActions}>
        <Link href="/menu" className={Styles.continueButton}>
          Continue Shopping
        </Link>
        <button className={Styles.reorderButton}>
          Reorder
        </button>
      </div>
    </div>
  )
}