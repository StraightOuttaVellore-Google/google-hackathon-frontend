import { createContext, useContext, useEffect, useState } from 'react'
import { loginApi } from '../utils/loginApi'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  // Initialize from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('access_token')
      const storedUser = localStorage.getItem('user_data')
      
      if (storedToken && storedUser) {
        try {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error('Failed to restore auth state:', error)
          localStorage.removeItem('access_token')
          localStorage.removeItem('user_data')
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const signInWithEmail = async (username, password) => {
    try {
      setLoading(true)
      const response = await loginApi.login(username, password)
      
      if (response.access_token) {
        // Store token
        localStorage.setItem('access_token', response.access_token)
        localStorage.setItem('token_type', response.token_type)
        
        // Create user object from response
        const userData = {
          username: username,
          token_type: response.token_type,
        }
        localStorage.setItem('user_data', JSON.stringify(userData))
        
        setToken(response.access_token)
        setUser(userData)
        return { data: response, error: null }
      }
      return { data: null, error: { message: 'Login failed' } }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error: { message: error.message || 'Failed to sign in. Please try again.' } }
    } finally {
      setLoading(false)
    }
  }

  const signUpWithEmail = async (username, email, password) => {
    try {
      setLoading(true)
      const response = await loginApi.register({ username, email, password })
      return { data: response, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error: { message: error.message || 'Failed to sign up. Please try again.' } }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      // Clear all auth data from localStorage
      localStorage.removeItem('access_token')
      localStorage.removeItem('token_type')
      localStorage.removeItem('user_data')
      
      setToken(null)
      setUser(null)
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: { message: 'Failed to sign out. Please try again.' } }
    }
  }

  const value = {
    user,
    loading,
    token,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
