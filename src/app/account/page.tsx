'use client'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import OrderHistory from '../../components/account/OrderHistory/OrderHistory'
import AccountNav from '../../components/account/AccountNav/AccountNav'
import Styles from './AccountPage.module.css'
import Navbar from "../../components/layout/Navbar/Navbar"
import Footer from "../../components/layout/Footer/Footer"

export default function AccountPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  
  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <div>
    <Navbar />
      <div className="container py-12">
      <div className={Styles.accountHeader}>
        <h1>Welcome, {user.name}</h1>
        <p>Manage your account and view your order history</p>
      </div>
      
      <div className={Styles.accountContainer}>
        <AccountNav />
        
        <div className={Styles.accountContent}>
          <div className={Styles.accountSection}>
            <h2>Order History</h2>
            <OrderHistory />
          </div>
          
          <div className={Styles.accountSection}>
            <h2>Account Details</h2>
            <div className={Styles.detailsCard}>
              <div className={Styles.detailRow}>
                <span>Name:</span>
                <span>{user.name}</span>
              </div>
              <div className={Styles.detailRow}>
                <span>Email:</span>
                <span>{user.email}</span>
              </div>
              <div className={Styles.detailRow}>
                <span>Member Since:</span>
                <span>June 2025</span>
              </div>
            </div>
          </div>
          
          <div className={Styles.logoutContainer}>
            <button 
              onClick={() => {
                logout()
                router.push('/')
              }}
              className={Styles.logoutButton}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}