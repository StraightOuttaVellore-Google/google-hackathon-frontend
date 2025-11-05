import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, FileText, BookOpen, TrendingUp, Users, Shield, Microscope } from 'lucide-react'
import UserDropdown from '../components/UserDropdown'

export default function ResearchPage() {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const researchPapers = [
    {
      title: 'AI-Driven Conversational Agents for Youth Mental Health',
      authors: 'Feng et al.',
      journal: 'JMIR Mental Health',
      date: 'May 14, 2025',
      description: 'Systematic review & meta-analysis of 14 studies (1,974 youth, ages 12–25). Found AI chatbots significantly reduced depressive symptoms, with moderate-to-large effect sizes, supporting their role as scalable mental health interventions.',
      impact: 'Foundation for our voice AI approach',
      category: 'AI Research'
    },
    {
      title: 'Voice-Based Depression Recognition Using Deep Learning',
      authors: 'Huang et al.',
      journal: 'Scientific Reports',
      date: 'June 11, 2024',
      description: 'Developed a voice-based pre-training model (wav2vec 2.0) tested on the DAIC-WOZ dataset. Achieved 96.5% accuracy for binary classification of depression, demonstrating the strong potential of acoustic features in mental health detection.',
      impact: 'Informs our voice analysis capabilities',
      category: 'Machine Learning'
    },
    {
      title: 'STARS Guided Chatbot Trial for Youth Mental Health',
      authors: 'de Graaff et al.',
      journal: 'JMIR Mental Health',
      date: 'January 2025',
      description: 'Evaluated an 8-week guided chatbot intervention with Jordanian youth (ages 18–21). Found the chatbot feasible and acceptable in low- and middle-income country settings, while noting challenges in retention and personalization.',
      impact: 'Guided our retention strategies',
      category: 'Digital Health'
    },
    {
      title: 'Federated Learning in Mental Health Applications',
      authors: 'Multiple Authors',
      journal: 'Frontiers in Digital Health',
      date: 'March 2024',
      description: 'Systematic review on applying federated learning to mental health and activity recognition. Showed FL can preserve privacy while enabling collaborative AI training on sensitive data, though challenges in bias, heterogeneity, and security remain.',
      impact: 'Future privacy-preserving features',
      category: 'Privacy & Security'
    }
  ]

  const methodologies = [
    {
      icon: <Microscope className="w-6 h-6" />,
      title: 'Evidence-Based Design',
      description: 'Our platform is built on rigorous research findings from peer-reviewed studies in mental health, AI, and digital wellness.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'User-Centered Research',
      description: 'Continuous user testing and feedback collection inform our development priorities and feature improvements.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Longitudinal Studies',
      description: 'We track long-term outcomes and user engagement patterns to validate our approach to mental wellness.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Privacy-Preserving Research',
      description: 'All research activities comply with ethical guidelines and prioritize user privacy and data protection.'
    }
  ]

  return (
    <div 
      className="min-h-screen text-white overflow-x-hidden relative" 
      style={{ background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)' }}
    >
      {/* Gemini-style Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/15 via-blue-950/10 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-400/8 via-transparent to-transparent"></div>
      
      {/* Floating Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40 pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle 3s infinite ${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={{ 
          height: '88px', 
          background: 'linear-gradient(135deg, #000000 0%, #000000 30%, #060606 70%, #000000 100%)', 
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="flex justify-between items-center pl-3 md:pl-20 pr-3 md:pr-6 h-full relative">
          {/* Left Section - Mobile Hamburger Menu */}
          <div className="flex items-center">
            {/* Mobile Hamburger Menu - Left Side */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white/80 hover:text-white transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden lg:flex items-center gap-8">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium text-xl" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Back to Home
                </span>
              </button>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/images/16f6e1ea-b24f-4aa3-826c-1d847809b91a-removebg-preview.png" 
                  alt="Sahayata Logo" 
                  className="h-12 w-12 object-contain"
                />
                <span className="text-white font-medium text-2xl tracking-wide" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Sahayata
                </span>
              </button>
            </div>
          </div>

          {/* Center - Logo (Mobile Only) */}
          <button 
            onClick={() => navigate('/')}
            className="absolute left-1/2 transform -translate-x-1/2 lg:hidden hover:opacity-80 transition-opacity"
          >
            <img 
              src="/images/16f6e1ea-b24f-4aa3-826c-1d847809b91a-removebg-preview.png" 
              alt="Sahayata Logo" 
              className="h-8 w-8 object-contain"
            />
          </button>

          {/* Right Section - Desktop: Dashboard Button, Mobile: User Dropdown Only */}
          <div className="flex items-center gap-2 md:gap-6">
            {/* Go to Dashboard Button - Desktop Only */}
            <button
              onClick={() => navigate('/app')}
              className="px-5 py-2 rounded-full font-medium text-white text-lg transition-all duration-300 hover:bg-white/10 hidden md:block"
              style={{
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '24px',
                fontWeight: '500',
                fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
              }}
            >
              Go to Dashboard
            </button>

            {/* User Avatar Dropdown - Right Side */}
            <UserDropdown />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#060606] border-t border-gray-800/50 pl-4 pr-3 py-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  navigate('/')
                  setIsMobileMenuOpen(false)
                }}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-all duration-300 text-left"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                  Back to Home
                </span>
              </button>
              <button 
                onClick={() => {
                  navigate('/app')
                  setIsMobileMenuOpen(false)
                }}
                className="px-4 py-2 rounded-full font-medium text-white transition-all duration-300 hover:bg-white/10 text-left"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '24px',
                  fontWeight: '500',
                  fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                }}
              >
                Go to Dashboard
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className="px-6 relative overflow-hidden"
        style={{
          marginTop: '88px',
          paddingTop: '120px',
          paddingBottom: '80px',
          background: 'transparent'
        }}
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            {/* Logo first */}
            <div className="mb-8 flex justify-center">
              <img 
                src="/images/16f6e1ea-b24f-4aa3-826c-1d847809b91a-removebg-preview.png" 
                alt="Sahayata Logo" 
                className="object-contain opacity-100"
                style={{ 
                  width: '200px',
                  height: '200px'
                }}
              />
            </div>
            <h1 
              className="text-6xl md:text-7xl font-bold mb-6"
              style={{ 
                fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                filter: 'brightness(1.2)'
              }}
            >
              Research & Methodology
            </h1>
            <p 
              className="text-2xl text-gray-300 max-w-3xl mx-auto"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Grounded in peer-reviewed research and<br />
              evidence-based practices for youth mental wellness
            </p>
          </div>

          {/* Research Papers */}
          <div className="mb-20">
            <h2 
              className="text-4xl font-bold text-white mb-8"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Key Research Papers
            </h2>
            <div className="space-y-6">
              {researchPapers.map((paper, index) => (
                <div
                  key={index}
                  className="bg-black rounded-2xl p-6 border border-white/10 hover:border-blue-400/60 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <FileText className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">{paper.category}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-400">{paper.date}</span>
                      </div>
                      <h3 
                        className="text-xl font-bold text-white mb-2"
                        style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
                      >
                        {paper.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        {paper.authors} — <span className="italic">{paper.journal}</span>
                      </p>
                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {paper.description}
                      </p>
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <span className="text-sm font-semibold text-blue-400">Impact: </span>
                        <span className="text-sm text-gray-300">{paper.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology Section */}
          <div className="mb-20">
            <h2 
              className="text-4xl font-bold text-white mb-8"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Our Research Methodology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {methodologies.map((method, index) => (
                <div
                  key={index}
                  className="bg-black rounded-xl p-6 border border-white/10 hover:border-blue-400/60 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-blue-400">{method.icon}</div>
                    <div>
                      <h3 
                        className="text-xl font-bold text-white mb-2"
                        style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
                      >
                        {method.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ongoing Research */}
          <div className="bg-black rounded-2xl p-8 border border-white/10 mb-20">
            <div className="flex items-center gap-4 mb-6">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <h2 
                className="text-3xl font-bold text-white"
                style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
              >
                Ongoing Research Initiatives
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                We are actively collaborating with research institutions to advance the science of AI-assisted mental wellness. 
                Our current research focuses on:
              </p>
              <ul className="space-y-3 ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Long-term efficacy of voice-based therapeutic interventions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Cross-cultural adaptation of AI mental health tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Federated learning for privacy-preserving model training</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Personalization algorithms for improved user engagement</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <button
              onClick={() => navigate('/app')}
              className="px-8 py-4 rounded-full font-medium text-white text-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 mx-auto"
              style={{
                background: 'linear-gradient(90deg, #3b6bff, #2e96ff 65%, #acb7ff)',
                fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
              }}
            >
              Explore Our Platform
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

