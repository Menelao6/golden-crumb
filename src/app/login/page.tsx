'use client'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Styles from './LoginPage.module.css'
import Navbar from "../../components/layout/Navbar/Navbar"
import Footer from "../../components/layout/Footer/Footer"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    try {
      const success = await login(email, password)
      if (success) {
        router.push('/account')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      setError('Failed to log in')
    }
    
    setLoading(false)
  }

  return (
    <div>
        <Navbar />
        <div className="container py-12">
        
      <div className={Styles.loginContainer}>
        <div className={Styles.loginForm}>
          <h1>Login to Your Account</h1>
          
          {error && <div className={Styles.errorMessage}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
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
            </div>
            
            <div className={Styles.formActions}>
              <button 
                type="submit" 
                className={Styles.loginButton}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          
          <div className={Styles.loginFooter}>
            <p>
              Don't have an account? <Link href="/register">Register here</Link>
            </p>
            <p>
              <Link href="/forgot-password">Forgot your password?</Link>
            </p>
          </div>
        </div>
        
        <div className={Styles.loginImage}>
          <div className={Styles.imageOverlay}></div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}