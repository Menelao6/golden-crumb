'use client'
import React, { createContext, useContext, useEffect, useReducer, ReactNode } from 'react'
import { Product } from "../types/index"

type CartState = {
  items: Product[]
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: 'ADD_ITEM'; item: Product }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.item.id)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.item.id
              ? { ...item, quantity: (item.quantity || 1) + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.item.price
        }
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.item.price
      }
    }
    
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.id)
      if (!itemToRemove) return state
      
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
        totalItems: state.totalItems - (itemToRemove.quantity || 1),
        totalPrice: state.totalPrice - (itemToRemove.price * (itemToRemove.quantity || 1))
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const itemToUpdate = state.items.find(item => item.id === action.id)
      if (!itemToUpdate) return state
      
      const oldQuantity = itemToUpdate.quantity || 1
      const newItems = state.items.map(item =>
        item.id === action.id ? { ...item, quantity: action.quantity } : item
      )
      
      return {
        ...state,
        items: newItems,
        totalItems: state.totalItems - oldQuantity + action.quantity,
        totalPrice: state.totalPrice - (itemToUpdate.price * oldQuantity) + (itemToUpdate.price * action.quantity)
      }
    }
    
    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 }
      
    default:
      return state
  }
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0
  })

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        if (parsedCart && parsedCart.items) {
          dispatch({ type: 'CLEAR_CART' })
          parsedCart.items.forEach((item: Product) => {
            if (item.quantity && item.quantity > 0) {
              dispatch({ 
                type: 'UPDATE_QUANTITY', 
                id: item.id, 
                quantity: item.quantity 
              })
            }
          })
        }
      } catch (e) {
        console.error('Failed to parse cart data', e)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state))
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}