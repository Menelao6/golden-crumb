import Styles from './PaymentForm.module.css'
import { useState } from 'react'

export default function PaymentForm({ 
  onSubmit, 
  onBack,
  paymentMethod,
  setPaymentMethod
}: { 
  onSubmit: () => void
  onBack: () => void
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}) {
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: ''
  })

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className={Styles.paymentForm}>
      <h2 className={Styles.sectionTitle}>Payment Method</h2>
      
      <div className={Styles.paymentMethods}>
        <label className={Styles.paymentOption}>
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === 'credit-card'}
            onChange={() => handlePaymentMethodChange('credit-card')}
          />
          <div className={Styles.optionContent}>
            <span className={Styles.optionTitle}>Credit/Debit Card</span>
          </div>
        </label>
        
        <label className={Styles.paymentOption}>
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === 'paypal'}
            onChange={() => handlePaymentMethodChange('paypal')}
          />
          <div className={Styles.optionContent}>
            <span className={Styles.optionTitle}>PayPal</span>
          </div>
        </label>
        
        <label className={Styles.paymentOption}>
          <input
            type="radio"
            name="paymentMethod"
            checked={paymentMethod === 'apple-pay'}
            onChange={() => handlePaymentMethodChange('apple-pay')}
          />
          <div className={Styles.optionContent}>
            <span className={Styles.optionTitle}>Apple Pay</span>
          </div>
        </label>
      </div>
      
      {paymentMethod === 'credit-card' && (
        <div className={Styles.cardForm}>
          <div className={Styles.formGroup}>
            <label htmlFor="cardNumber">Card Number *</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardData.cardNumber}
              onChange={handleCardChange}
              required
            />
          </div>
          
          <div className={Styles.formRow}>
            <div className={Styles.formGroup}>
              <label htmlFor="expiry">Expiry Date *</label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                placeholder="MM/YY"
                value={cardData.expiry}
                onChange={handleCardChange}
                required
              />
            </div>
            
            <div className={Styles.formGroup}>
              <label htmlFor="cvc">CVC *</label>
              <input
                type="text"
                id="cvc"
                name="cvc"
                placeholder="123"
                value={cardData.cvc}
                onChange={handleCardChange}
                required
              />
            </div>
          </div>
          
          <div className={Styles.formGroup}>
            <label htmlFor="cardName">Name on Card *</label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              placeholder="John Doe"
              value={cardData.cardName}
              onChange={handleCardChange}
              required
            />
          </div>
        </div>
      )}
      
      {paymentMethod === 'paypal' && (
        <div className={Styles.paypalInfo}>
          <p>You will be redirected to PayPal to complete your payment</p>
        </div>
      )}
      
      {paymentMethod === 'apple-pay' && (
        <div className={Styles.applePayInfo}>
          <p>You will be redirected to Apple Pay to complete your payment</p>
        </div>
      )}
      
      <div className={Styles.formActions}>
        <button 
          type="button" 
          className={Styles.backButton}
          onClick={onBack}
        >
          Back to Shipping
        </button>
        <button type="submit" className={Styles.continueButton}>
          Review Order
        </button>
      </div>
    </form>
  )
}