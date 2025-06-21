import Link from 'next/link'
import Styles from './OrderHistory.module.css'

export default function OrderHistory() {
  // Mock order data
  const orders = [
    {
      id: 'ORD-12345',
      date: 'June 15, 2023',
      status: 'Delivered',
      total: 42.97,
      items: [
        { name: 'Croissant', quantity: 2 },
        { name: 'Chocolate Éclair', quantity: 1 }
      ]
    },
    {
      id: 'ORD-12346',
      date: 'June 10, 2023',
      status: 'Delivered',
      total: 28.50,
      items: [
        { name: 'Macaron Box', quantity: 1 },
        { name: 'Baguette', quantity: 1 }
      ]
    },
    {
      id: 'ORD-12347',
      date: 'June 5, 2023',
      status: 'Delivered',
      total: 15.75,
      items: [
        { name: 'Chocolate Chip Cookie', quantity: 3 }
      ]
    }
  ]

  if (orders.length === 0) {
    return (
      <div className={Styles.emptyOrders}>
        <p>You haven't placed any orders yet</p>
        <Link href="/menu" className={Styles.shopButton}>
          Browse Menu
        </Link>
      </div>
    )
  }

  return (
    <div className={Styles.ordersContainer}>
      <div className={Styles.ordersHeader}>
        <div>Order #</div>
        <div>Date</div>
        <div>Status</div>
        <div>Total</div>
        <div></div>
      </div>
      
      <div className={Styles.ordersList}>
        {orders.map(order => (
          <div key={order.id} className={Styles.orderItem}>
            <div className={Styles.orderId}>{order.id}</div>
            <div className={Styles.orderDate}>{order.date}</div>
            <div className={Styles.orderStatus}>{order.status}</div>
            <div className={Styles.orderTotal}>${order.total.toFixed(2)}</div>
            <div className={Styles.orderActions}>
              <Link href={`/account/orders/${order.id}`} className={Styles.viewButton}>
                View Details
              </Link>
            </div>
            
            <div className={Styles.orderItems}>
              <span>Items: </span>
              {order.items.map((item, index) => (
                <span key={index} className={Styles.orderItemName}>
                  {item.quantity} x {item.name}
                  {index < order.items.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}