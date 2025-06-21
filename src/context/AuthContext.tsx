'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = {
  id: string
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (e) {
        console.error('Failed to parse user data', e)
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    setLoading(true)
    return new Promise(resolve => {
      setTimeout(() => {
        // Mock authentication
        if (email === 'user@example.com' && password === 'password') {
          const userData = {
            id: '1',
            name: 'John Doe',
            email: email
          }
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
          setLoading(false)
          resolve(true)
        } else {
          setLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true)
    return new Promise(resolve => {
      setTimeout(() => {
        const userData = {
          id: Date.now().toString(),
          name,
          email
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        setLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}