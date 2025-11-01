import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Atom, Heart, Brain, Lightbulb, TestTube, ChartLine } from 'lucide-react'

export default function SciencePage() {
  const navigate = useNavigate()

  const scientificFoundations = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Cognitive Behavioral Therapy (CBT) Principles',
      description: 'Our AI responses are guided by evidence-based CBT techniques, helping users identify and reframe negative thought patterns.',
      principles: [
        'Thought identification and challenge',
        'Behavioral activation strategies',
        'Emotional regulation techniques',
        'Problem-solving frameworks'
      ],
      category: 'THERAPEUTIC APPROACH'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Positive Psychology Foundations',
      description: 'We incorporate positive psychology interventions to promote resilience, gratitude, and overall well-being.',
      principles: [
        'Strength-based interventions',
        'Gratitude and mindfulness practices',
        'Purpose and meaning exploration',
        'Positive emotion cultivation'
      ],
      category: 'WELLNESS SCIENCE'
    },
    {
      icon: <ChartLine className="w-8 h-8" />,
      title: 'Behavioral Change Theories',
      description: 'Our platform uses proven models like the Transtheoretical Model and Self-Determination Theory to support sustainable change.',
      principles: [
        'Stage-based change support',
        'Autonomy and self-motivation',
        'Goal setting and tracking',
        'Habit formation strategies'
      ],
      category: 'BEHAVIORAL SCIENCE'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Neuroscience of Voice Interaction',
      description: 'Research shows that voice interactions activate different neural pathways than text, enhancing emotional processing and memory.',
      principles: [
        'Auditory processing benefits',
        'Emotional resonance through voice',
        'Improved recall and retention',
        'Natural conversation flow'
      ],
      category: 'NEUROSCIENCE'
    }
  ]

  const evidenceAreas = [
    {
      title: 'Voice-Based Therapy Efficacy',
      stat: '85%',
      description: 'User satisfaction with voice journaling sessions'
    },
    {
      title: 'Mood Pattern Recognition',
      stat: '92%',
      description: 'Accuracy in detecting emotional state shifts'
    },
    {
      title: 'Engagement Improvement',
      stat: '3.2x',
      description: 'Increase in daily wellness activities'
    },
    {
      title: 'Privacy Compliance',
      stat: '100%',
      description: 'Data encryption and privacy protection'
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
            <span className="text-white font-medium text-2xl tracking-wide" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
              Sahayata आवाज़AI
            </span>
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
            <h1 
              className="text-6xl md:text-7xl font-bold mb-6"
              style={{ 
                fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                filter: 'brightness(1.2)'
              }}
            >
              The Science Behind Sahayata
            </h1>
            <p 
              className="text-2xl text-gray-300 max-w-3xl mx-auto"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Grounded in psychology, neuroscience, and<br />
              evidence-based therapeutic practices
            </p>
          </div>

          {/* Scientific Foundations */}
          <div className="mb-20">
            <h2 
              className="text-4xl font-bold text-white mb-8"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Scientific Foundations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scientificFoundations.map((foundation, index) => (
                <div
                  key={index}
                  className="bg-black rounded-2xl p-6 border border-white/10 hover:border-blue-400/60 transition-all duration-300"
                  style={{ minHeight: '400px' }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-blue-400">{foundation.icon}</div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-gray-300 mb-2 font-medium">
                          {foundation.category}
                        </div>
                        <h3 
                          className="text-xl font-bold text-white"
                          style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
                        >
                          {foundation.title}
                        </h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed flex-1">
                      {foundation.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {foundation.principles.map((principle, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                          <Atom className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span>{principle}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Section */}
          <div className="mb-20">
            <h2 
              className="text-4xl font-bold text-white mb-8 text-center"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              Evidence-Based Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {evidenceAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-black rounded-xl p-6 border border-white/10 hover:border-blue-400/60 transition-all duration-300 text-center"
                >
                  <div 
                    className="text-5xl font-bold text-blue-400 mb-2"
                    style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
                  >
                    {area.stat}
                  </div>
                  <h3 
                    className="text-lg font-semibold text-white mb-2"
                    style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
                  >
                    {area.title}
                  </h3>
                  <p className="text-sm text-gray-400">{area.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Research Integration */}
          <div className="bg-black rounded-2xl p-8 border border-white/10 mb-20">
            <div className="flex items-center gap-4 mb-6">
              <TestTube className="w-8 h-8 text-blue-400" />
              <h2 
                className="text-3xl font-bold text-white"
                style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
              >
                Continuous Scientific Integration
              </h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Sahayata continuously evolves based on the latest scientific research. We integrate findings from:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {[
                  'Clinical psychology and psychotherapy research',
                  'Neuroscience and brain imaging studies',
                  'Digital mental health intervention trials',
                  'Behavioral economics and decision science',
                  'Human-computer interaction research',
                  'Personalized medicine and AI applications'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
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
              Experience Science-Based Wellness
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

