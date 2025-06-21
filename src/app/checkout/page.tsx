'use client'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import PaymentForm from "../../components/checkout/PaymentForm/PaymentForm"
import ShippingForm from "../../components/checkout/ShipingForm/ShipingForm"
import OrderReview from "../../components/checkout/OrderReview/OrderReview"
import Confirmation from "../../components/checkout/Confirmation/Confirmation"
import Styles from './CheckoutPage.module.css'

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const { state: cartState, dispatch } = useCart()
  const [shippingInfo, setShippingInfo] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [orderId, setOrderId] = useState('')

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  const handleShippingSubmit = (data: any) => {
    setShippingInfo(data)
    nextStep()
  }

  const handlePaymentSubmit = () => {
    nextStep()
  }

  const handlePlaceOrder = () => {
    // Generate mock order ID
    const newOrderId = `ORD-${Date.now().toString().slice(-6)}`
    setOrderId(newOrderId)
    dispatch({ type: 'CLEAR_CART' })
    nextStep()
  }

  return (
    <div className="container py-12">
      <div className={Styles.checkoutHeader}>
        <div className={`${Styles.step} ${currentStep >= 1 ? Styles.active : ''}`}>
          <span>1</span>
          <p>Shipping</p>
        </div>
        <div className={Styles.divider}></div>
        <div className={`${Styles.step} ${currentStep >= 2 ? Styles.active : ''}`}>
          <span>2</span>
          <p>Payment</p>
        </div>
        <div className={Styles.divider}></div>
        <div className={`${Styles.step} ${currentStep >= 3 ? Styles.active : ''}`}>
          <span>3</span>
          <p>Review</p>
        </div>
        <div className={Styles.divider}></div>
        <div className={`${Styles.step} ${currentStep === 4 ? Styles.active : ''}`}>
          <span>4</span>
          <p>Confirmation</p>
        </div>
      </div>

      <div className={Styles.checkoutContent}>
        {currentStep === 1 && (
          <ShippingForm onSubmit={handleShippingSubmit} />
        )}
        
        {currentStep === 2 && (
          <PaymentForm 
            onSubmit={handlePaymentSubmit} 
            onBack={prevStep}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        )}
        
        {currentStep === 3 && (
          <OrderReview 
            shippingInfo={shippingInfo}
            paymentMethod={paymentMethod}
            onBack={prevStep}
            onPlaceOrder={handlePlaceOrder}
          />
        )}
        
        {currentStep === 4 && (
          <Confirmation 
            orderId={orderId}
            shippingInfo={shippingInfo}
          />
        )}
      </div>
    </div>
  )
}