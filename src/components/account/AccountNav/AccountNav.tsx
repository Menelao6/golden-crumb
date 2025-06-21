import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Styles from './AccountNav.module.css'
import { FiUser, FiShoppingBag, FiHeart, FiSettings } from 'react-icons/fi'

export default function AccountNav() {
  const pathname = usePathname()
  
  const navItems = [
    { 
      path: '/account', 
      label: 'Dashboard', 
      icon: <FiUser /> 
    },
    { 
      path: '/account/orders', 
      label: 'Orders', 
      icon: <FiShoppingBag /> 
    },
    { 
      path: '/account/wishlist', 
      label: 'Wishlist', 
      icon: <FiHeart /> 
    },
    { 
      path: '/account/settings', 
      label: 'Settings', 
      icon: <FiSettings /> 
    }
  ]

  return (
    <nav className={Styles.accountNav}>
      <ul>
        {navItems.map(item => (
          <li key={item.path}>
            <Link 
              href={item.path}
              className={`${Styles.navLink} ${pathname === item.path ? Styles.active : ''}`}
            >
              <span className={Styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}