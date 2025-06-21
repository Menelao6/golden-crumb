import Link from 'next/link'
import { FiCheckCircle, FiClock, FiShoppingBag } from 'react-icons/fi'
import Styles from './Confirmation.module.css'

export default function Confirmation({ 
  orderId,
  shippingInfo
}: { 
  orderId: string
  shippingInfo: any
}) {
  return (
    <div className={Styles.confirmation}>
      <div className={Styles.confirmationHeader}>
        <FiCheckCircle className={Styles.successIcon} />
        <h2>Thank You for Your Order!</h2>
        <p>Your order has been placed successfully</p>
        <div className={Styles.orderId}>Order #: {orderId}</div>
      </div>
      
      <div className={Styles.infoBoxes}>
        <div className={Styles.infoBox}>
          <FiClock className={Styles.infoIcon} />
          <h3>Estimated Delivery</h3>
          <p>
            {shippingInfo.shippingMethod === 'standard' 
              ? '3-5 business days' 
              : '1-2 business days'}
          </p>
        </div>
        
        <div className={Styles.infoBox}>
          <FiShoppingBag className={Styles.infoIcon} />
          <h3>Order Summary</h3>
          <p>You will receive a confirmation email shortly</p>
        </div>
      </div>
      
      <div className={Styles.shippingInfo}>
        <h3>Shipping to:</h3>
        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
        <p>{shippingInfo.address}</p>
        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
        <p>{shippingInfo.country}</p>
      </div>
      
      <div className={Styles.actions}>
        <Link href="/menu" className={Styles.continueButton}>
          Continue Shopping
        </Link>
        <Link href="/account/orders" className={Styles.orderButton}>
          View Order History
        </Link>
      </div>
    </div>
  )
}