import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme !== null) {
      return savedTheme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const isDarkMode = theme === 'dark' || theme === 'black'
  const isBlackMode = theme === 'black'

  useEffect(() => {
    localStorage.setItem('theme', theme)
    
    // Remove all theme classes
    document.documentElement.classList.remove('dark', 'black')
    
    // Add appropriate theme class
    if (theme === 'dark' || theme === 'black') {
      document.documentElement.classList.add('dark')
    }
    if (theme === 'black') {
      document.documentElement.classList.add('black')
    }
  }, [theme])

  const setThemeMode = (newTheme) => {
    setTheme(newTheme)
  }

  const value = {
    isDarkMode,
    isBlackMode,
    theme,
    setThemeMode,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
