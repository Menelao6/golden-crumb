import { useState } from 'react'
import Styles from './ShippingForm.module.css'

export default function ShippingForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'Al',
    shippingMethod: 'standard'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={Styles.shippingForm}>
      <h2 className={Styles.sectionTitle}>Shipping Information</h2>
      
      <div className={Styles.formRow}>
        <div className={Styles.formGroup}>
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className={Styles.formGroup}>
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className={Styles.formRow}>
        <div className={Styles.formGroup}>
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className={Styles.formGroup}>
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className={Styles.formGroup}>
        <label htmlFor="address">Street Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className={Styles.formRow}>
        <div className={Styles.formGroup}>
          <label htmlFor="city">City *</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        
      </div>
      
      <div className={Styles.formGroup}>
        <label htmlFor="country">Country *</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="AL">Albania</option>
          <option value="KS">Kosova</option>
          <option value="MC">Macedonia</option>
        </select>
      </div>
      
      <h2 className={Styles.sectionTitle}>Shipping Method</h2>
      
      <div className={Styles.shippingMethods}>
        <label className={Styles.shippingOption}>
          <input
            type="radio"
            name="shippingMethod"
            value="standard"
            checked={formData.shippingMethod === 'standard'}
            onChange={handleChange}
          />
          <div className={Styles.optionContent}>
            <span className={Styles.optionTitle}>Standard Shipping</span>
            <span className={Styles.optionDetails}>3-5 business days • Free</span>
          </div>
        </label>
        
        <label className={Styles.shippingOption}>
          <input
            type="radio"
            name="shippingMethod"
            value="express"
            checked={formData.shippingMethod === 'express'}
            onChange={handleChange}
          />
          <div className={Styles.optionContent}>
            <span className={Styles.optionTitle}>Express Shipping</span>
            <span className={Styles.optionDetails}>1-2 business days • $9.99</span>
          </div>
        </label>
      </div>
      
      <div className={Styles.formActions}>
        <button type="submit" className={Styles.continueButton}>
          Continue to Payment
        </button>
      </div>
    </form>
  )
}