import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Brain, Mic, Database, Sparkles, Cpu, Lock, Zap } from 'lucide-react'

export default function ModelsPage() {
  const navigate = useNavigate()

  const models = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Google Gemini Live API',
      description: 'Our primary conversational AI model powering natural, empathetic voice interactions',
      details: [
        'Multi-turn conversation support with context retention',
        'Real-time voice streaming with low latency (<500ms)',
        'Emotion-aware responses tailored to user mood',
        '24kHz audio quality for natural voice synthesis',
        'Interruption handling for natural dialogue flow'
      ],
      category: 'PRIMARY MODEL'
    },
    {
      icon: <Mic className="w-8 h-8" />,
      title: 'Silero VAD (Voice Activity Detection)',
      description: 'Advanced voice activity detection for seamless conversation management',
      details: [
        'Real-time speech detection with 95%+ accuracy',
        'Background noise filtering and suppression',
        'Adaptive threshold adjustment based on environment',
        'Low-latency processing (<50ms detection time)',
        'Support for multiple languages and accents'
      ],
      category: 'VOICE PROCESSING'
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Hybrid RAG (Retrieval Augmented Generation)',
      description: 'Context-aware knowledge retrieval system for personalized responses',
      details: [
        'Manual RAG retrieval before each conversation turn',
        'Integration with Vertex AI RAG Store',
        'Corpus management for mental health and academic knowledge bases',
        'Semantic search across structured documents',
        'Context window optimization for relevant information'
      ],
      category: 'KNOWLEDGE RETRIEVAL'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Voice Synthesis & Audio Processing',
      description: 'High-quality voice synthesis and real-time audio manipulation',
      details: [
        '24kHz PCM audio streaming',
        'Real-time audio playback with Web Audio API',
        'Audio format conversion and optimization',
        'Voice cloning capabilities (future)',
        'Multi-language voice support'
      ],
      category: 'AUDIO PROCESSING'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Edge Computing Models',
      description: 'Client-side processing for privacy-preserving operations',
      details: [
        'Local voice activity detection',
        'Client-side audio preprocessing',
        'Privacy-first architecture with minimal data transmission',
        'Offline mode support (planned)',
        'Reduced server load and latency'
      ],
      category: 'EDGE AI'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Security & Privacy Models',
      description: 'Advanced encryption and privacy-preserving technologies',
      details: [
        'AES-256 end-to-end encryption',
        'JWT-based authentication system',
        'Zero-knowledge architecture for sensitive data',
        'GDPR and HIPAA compliance-ready',
        'Federated learning capabilities (research phase)'
      ],
      category: 'SECURITY'
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
        <div className="flex justify-between items-center pl-20 pr-6 h-full">
          <div className="flex items-center gap-8">
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
          
          <button
            onClick={() => navigate('/app')}
            className="px-5 py-2 rounded-full font-medium text-white text-lg transition-all duration-300 hover:bg-white/10"
            style={{
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '24px',
              fontWeight: '500',
              fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
            }}
          >
            Go to Dashboard
          </button>
        </div>
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
              AI Models & Technology
            </h1>
            <p 
              className="text-2xl text-gray-300 max-w-3xl mx-auto"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Discover the cutting-edge AI models and technologies<br />
              powering Sahayata's intelligent voice companion
            </p>
          </div>

          {/* Models Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {models.map((model, index) => (
              <div
                key={index}
                className="relative transition-all duration-300 hover:scale-105 cursor-pointer group"
                style={{
                  background: '#000000',
                  borderRadius: '24px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '32px',
                  minHeight: '400px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(66, 133, 244, 0.6)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.3), 0 0 40px rgba(66, 133, 244, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-blue-400">{model.icon}</div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-gray-300 mb-2 font-medium">
                        {model.category}
                      </div>
                      <h3 
                        className="text-2xl font-bold text-white"
                        style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
                      >
                        {model.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed font-medium flex-1">
                    {model.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {model.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                        <span className="text-blue-400 mt-1">✓</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Stack Section */}
          <div className="mt-20">
            <h2 
              className="text-4xl font-bold text-white mb-8 text-center"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Technical Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Vertex AI', category: 'Cloud AI' },
                { name: 'Gemini Live API', category: 'Conversational AI' },
                { name: 'Silero VAD', category: 'Voice Processing' },
                { name: 'WebSocket', category: 'Real-time Communication' },
                { name: 'FastAPI', category: 'Backend Framework' },
                { name: 'PostgreSQL', category: 'Database' },
                { name: 'React + Vite', category: 'Frontend' },
                { name: 'Web Audio API', category: 'Audio Processing' }
              ].map((tech, idx) => (
                <div
                  key={idx}
                  className="bg-black rounded-xl p-4 border border-white/10 hover:border-blue-400/60 transition-all duration-300 text-center"
                >
                  <div className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-400">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <button
              onClick={() => navigate('/app')}
              className="px-8 py-4 rounded-full font-medium text-white text-xl shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2 mx-auto"
              style={{
                background: 'linear-gradient(90deg, #3b6bff, #2e96ff 65%, #acb7ff)',
                fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
              }}
            >
              Experience Our AI Models
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

