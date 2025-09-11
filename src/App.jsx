import { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import StudyPage from './pages/study'
import WellnessPage from './pages/wellness'

export default function App() {
  const [isStudyMode, setIsStudyMode] = useState(true)
  const { user, signOut } = useAuth()

  const toggleMode = () => {
    setIsStudyMode(!isStudyMode)
  }

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Toggle Switch */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full p-1 shadow-lg border border-gray-200">
          <div className="flex items-center">
            <button
              onClick={toggleMode}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isStudyMode 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Study
            </button>
            <button
              onClick={toggleMode}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !isStudyMode 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Wellness
            </button>
          </div>
        </div>
      </div>

      {/* User Info & Logout */}
      <div className="fixed top-6 right-6 z-50">
        <div className="bg-white rounded-lg p-3 shadow-lg border border-gray-200 flex items-center space-x-3">
          <div className="text-sm">
            <p className="text-gray-600">Welcome,</p>
            <p className="font-medium text-gray-800">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-20">
        {isStudyMode ? <StudyPage /> : <WellnessPage />}
      </div>
    </div>
  )
}
