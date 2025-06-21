'use client'
import { useParams } from 'next/navigation'
import OrderDetail from '../../../components/account/OrderDetail/OrderDetail'
import AccountNav from "../../../components/account/AccountNav/AccountNav"
import Navbar from "../../../components/layout/Navbar/Navbar"
import Styles from './OrderPage.module.css'
import Footer from "../../../components/layout/Footer/Footer"

export default function OrderPage() {
  const params = useParams()
  const orderId = params.orderId as string
  
  // Fetch order details based on orderId
  // For now, using mock data
  const order = {
    id: orderId,
    date: 'June 15, 2023',
    status: 'Delivered',
    shipping: {
      name: 'John Doe',
      address: '123 Main Street',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
      method: 'Standard Shipping'
    },
    payment: {
      method: 'Credit Card',
      last4: '1234'
    },
    items: [
      {
        id: 1,
        name: 'Butter Croissant',
        price: 3.99,
        quantity: 2,
        image: '/assets/croissant.jpg'
      },
      {
        id: 2,
        name: 'Chocolate Éclair',
        price: 4.25,
        quantity: 1,
        image: '/assets/eclair.jpg'
      }
    ],
    subtotal: 12.23,
    shippingCost: 0,
    tax: 0.98,
    total: 13.21
  }

  return (
    <div>
    <Navbar />
      <div className="container py-12">
      <div className={Styles.accountContainer}>
        <AccountNav />
        
        <div className={Styles.accountContent}>
          <div className={Styles.orderHeader}>
            <h1>Order #{order.id}</h1>
            <p>Placed on {order.date} • {order.status}</p>
          </div>
          
          <OrderDetail order={order} />
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}