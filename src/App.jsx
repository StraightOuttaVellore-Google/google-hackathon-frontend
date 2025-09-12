
import { useState } from 'react'
import { useTheme } from './contexts/ThemeContext'
import StudyPage from './pages/study'
import WellnessPage from './pages/wellness'
import DarkModeToggle from './components/DarkModeToggle'
import UserDropdown from './components/UserDropdown'

export default function App() {
  const { isDarkMode } = useTheme()
  const [isStudyMode, setIsStudyMode] = useState(true)

  const toggleMode = () => {
    setIsStudyMode(!isStudyMode)
  }

  const bgClasses = isStudyMode 
    ? 'bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950 dark:to-black'
    : 'bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-black'

  return (
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen transition-all duration-500 ${bgClasses}`}>
      {/* Dark Mode Toggle - Top Left */}
      <div className="fixed top-6 left-6 z-50">
        <DarkModeToggle />
      </div>

      {/* User Dropdown - Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <UserDropdown />
      </div>

      {/* Floating Toggle Switch */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-1 shadow-xl border border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <button
              onClick={toggleMode}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 transform ${
                isStudyMode 
                  ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white shadow-lg scale-105' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-white/20'
              }`}
            >
              📚 Study
            </button>
            <button
              onClick={toggleMode}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 transform ${
                !isStudyMode 
                  ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg scale-105' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-white/20'
              }`}
            >
              🌿 Wellness
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-24">
        {isStudyMode ? <StudyPage /> : <WellnessPage />}
      </div>
    </div>
  )
}
