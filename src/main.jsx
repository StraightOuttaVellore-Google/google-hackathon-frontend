import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import ModernLogin from './pages/ModernLogin'
import TestPage from './pages/TestPage'
import App from './App'
import Article1 from './pages/Article1'
import Article2 from './pages/Article2'
import Article3 from './pages/Article3'
import Article4 from './pages/Article4'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<ModernLogin />} />
          <Route path="/article/article1" element={<Article1 />} />
          <Route path="/article/article2" element={<Article2 />} />
          <Route path="/article/article3" element={<Article3 />} />
          <Route path="/article/article4" element={<Article4 />} />
          <Route 
            path="/app/*" 
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)
