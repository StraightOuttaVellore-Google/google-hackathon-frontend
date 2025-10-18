import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import { Sun, Moon } from 'lucide-react'
import { loginApi, handleApiError } from '../utils/loginApi'

export default function ModernLogin() {
  const navigate = useNavigate()
  const { signInWithEmail, signUpWithEmail } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const { isDarkMode, toggleDarkMode } = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        // Signup: requires username, email, password
        const { data, error } = await signUpWithEmail(username, email, password)
        
        if (error) {
          setMessage(error.message)
        } else {
          setMessage('Account created successfully! Redirecting to login...')
          setTimeout(() => {
            setIsSignUp(false)
            setUsername('')
            setEmail('')
            setPassword('')
            setMessage('')
          }, 1500)
        }
      } else {
        // Login: requires username, password - use AuthContext method
        const { data, error } = await signInWithEmail(username, password)
        
        if (error) {
          setMessage(error.message)
        } else if (data) {
          // AuthContext handles token storage and state updates
          setMessage('Login successful! Redirecting...')
          // Redirect to app after successful login
          setTimeout(() => navigate('/app'), 500)
        }
      }
    } catch (error) {
      const errorMessage = handleApiError(error)
      setMessage(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      {/* Logo - Top Left (Clickable) */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 hover:opacity-80 transition-opacity"
      >
        <span className={`font-medium text-2xl tracking-wide ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`} style={{ 
          fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' 
        }}>
          Sahayata आवाज़AI
        </span>
      </button>

      {/* Theme Toggle - Top Right */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-6 right-6 p-2 rounded-lg transition-colors ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        }`}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main Form Container - Larger Size */}
      <div className="w-full max-w-lg">
        <div className={`${
          isDarkMode 
            ? 'bg-black' 
            : 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl'
        } p-8`}>
          <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-2">
                  <h1 className={`text-3xl font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`} style={{ 
                    fontFamily: 'Arial, Helvetica, sans-serif' 
                  }}>
                    {isSignUp ? 'Welcome to Sahayata' : 'Welcome to Sahayata'}
                  </h1>
                  <div className={`text-center text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {isSignUp ? "Already have an account? " : "Don't have an account? "}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="underline underline-offset-4 hover:text-blue-500 transition-colors"
                    >
                      {isSignUp ? 'Sign in' : 'Sign up'}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Username Field */}
                  <div className="grid gap-3">
                    <label 
                      htmlFor="username" 
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Choose a username"
                      required
                    />
                  </div>

                  {/* Email Field - Only for Signup */}
                  {isSignUp && (
                    <div className="grid gap-3">
                      <label 
                        htmlFor="email" 
                        className={`text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="m@example.com"
                        required
                      />
                    </div>
                  )}

                  {/* Password Field */}
                  <div className="grid gap-3">
                    <label 
                      htmlFor="password" 
                      className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-3 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        isDarkMode 
                          ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter your password"
                      required
                      minLength={6}
                    />
                  </div>

                  {message && (
                    <div className={`p-3 rounded-lg text-sm ${
                      message.includes('successfully') || message.includes('created')
                        ? (isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-700')
                        : (isDarkMode ? 'bg-red-900/30 text-red-300' : 'bg-red-100 text-red-700')
                    }`}>
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </div>
                    ) : (
                      isSignUp ? 'Sign Up' : 'Sign In'
                    )}
                  </button>
                </div>

                <div className={`relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center ${
                  isDarkMode ? 'after:border-gray-600' : 'after:border-gray-300'
                } after:border-t`}>
                  <span className={`relative z-10 px-2 ${
                    isDarkMode ? 'bg-black text-gray-400' : 'bg-white/10 text-gray-500'
                  }`}>
                    Or
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <button 
                    type="button" 
                    className={`w-full py-2 px-4 rounded-lg border font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      isDarkMode
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    Apple
                  </button>
                  <button 
                    type="button" 
                    className={`w-full py-2 px-4 rounded-lg border font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      isDarkMode
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    Google
                  </button>
                </div>
              </div>
            </form>

            <div className={`text-center text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              By clicking continue, you agree to our{' '}
              <a href="#" className="underline underline-offset-4 hover:text-blue-500 transition-colors">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline underline-offset-4 hover:text-blue-500 transition-colors">
                Privacy Policy
              </a>.
            </div>
          </div>
        </div>

        {/* Back to Landing */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => window.history.back()}
            className={`text-sm transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  )
}
