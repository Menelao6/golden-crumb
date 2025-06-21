'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Styles from './RegisterPage.module.css'
import Navbar from "../../components/layout/Navbar/Navbar"
import Footer from "../../components/layout/Footer/Footer"

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate inputs
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    
    setError('')
    setLoading(true)
    
    try {
      const success = await register(name, email, password)
      if (success) {
        router.push('/account')
      } else {
        setError('Failed to register')
      }
    } catch (err) {
      setError('Registration failed. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div>
    <Navbar />
      <div className="container py-12">
      <div className={Styles.registerContainer}>
        <div className={Styles.registerForm}>
          <h1>Create an Account</h1>
          
          {error && <div className={Styles.errorMessage}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className={Styles.formGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className={Styles.formGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className={Styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className={Styles.passwordHint}>At least 6 characters</p>
            </div>
            
            <div className={Styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className={Styles.formActions}>
              <button 
                type="submit" 
                className={Styles.registerButton}
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className={Styles.registerFooter}>
            <p>
              Already have an account? <Link href="/login">Login here</Link>
            </p>
          </div>
        </div>
        
        <div className={Styles.registerImage}>
          <div className={Styles.imageOverlay}></div>
          <div className={Styles.benefits}>
            <h2>Account Benefits</h2>
            <ul>
              <li>Track your order history</li>
              <li>Save your favorite items</li>
              <li>Exclusive member discounts</li>
              <li>Faster checkout process</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}