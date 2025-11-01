import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Target, Users, Heart, Zap, Globe, Shield, BookOpen, Timer, Grid3x3, Calendar, MessageCircle, Map, Brain, Watch, Radio, TrendingUp, Layers, Activity, Mic, FileText, Star, Database, Cloud, Settings } from 'lucide-react'

export default function AboutPage() {
  const navigate = useNavigate()

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
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-20">
            <h1 
              className="text-6xl md:text-7xl font-bold mb-6"
              style={{ 
                fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.4)',
                filter: 'brightness(1.2)'
              }}
            >
              Complete Guide to Sahayata
            </h1>
            <p 
              className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}
            >
              A comprehensive platform that combines AI-powered voice journaling, task management, 
              community support, and wearable integration to help you achieve mental wellness and productivity.
            </p>
          </div>

          {/* Table of Contents */}
          <div className="bg-black rounded-2xl p-8 border border-white/10 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
              What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Study Mode Features',
                'Wellness Mode Features',
                'Voice AI Journaling',
                'Task Management (Matrix)',
                'Community (Discord)',
                'Global Wellness (Reddit)',
                'Wearable Integration',
                'MCP Server & AI Native',
                'System Architecture'
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-blue-400/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STUDY MODE SECTION */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <BookOpen className="w-10 h-10 text-blue-400" />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Study Mode
              </h2>
            </div>

            <div className="space-y-6">
              {/* Pomodoro Timer */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <Timer className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Pomodoro Timer
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  A productivity technique that breaks work into 25-minute focused intervals (pomodoros) 
                  separated by short breaks. Helps maintain focus and prevent burnout.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                    <h4 className="text-white font-semibold mb-2">Features:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Customizable time presets (25, 45, 90 minutes)</li>
                      <li>• Break tracking (5, 15, 30 minutes)</li>
                      <li>• Session analytics and statistics</li>
                      <li>• Monthly productivity insights</li>
                    </ul>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                    <h4 className="text-white font-semibold mb-2">How It Works:</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Start a timer, work for the set duration, take a break, and repeat. 
                      The system tracks your sessions and provides insights into your productivity patterns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ambient Sounds */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <Radio className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Ambient Sounds
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Background audio designed to improve focus, reduce distractions, and create an optimal study environment.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {['White Noise', 'Pink Noise', 'Brown Noise', 'Rain', 'Ocean', 'Forest', 'Cafe', 'City'].map((sound, idx) => (
                    <div key={idx} className="bg-black/50 rounded-xl p-4 border border-white/5 text-center">
                      <div className="text-blue-400 font-semibold">{sound}</div>
                    </div>
                  ))}
                </div>
                <p className="text-gray-300 text-sm mt-4">
                  Each sound type has unique properties: white noise masks all frequencies equally, 
                  pink noise is more natural-sounding, rain creates a calming atmosphere, 
                  and cafe sounds simulate a productive work environment.
                </p>
              </div>

              {/* Eisenhower Matrix */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <Grid3x3 className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Eisenhower Priority Matrix
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  A task management system that categorizes tasks into four quadrants based on urgency and importance, 
                  helping you prioritize effectively.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-400/30">
                    <h4 className="text-blue-400 font-bold mb-2">Quadrant 1: Urgent & Important</h4>
                    <p className="text-gray-300 text-sm">Critical tasks requiring immediate attention (e.g., deadlines, emergencies)</p>
                  </div>
                  <div className="bg-green-500/10 rounded-xl p-4 border border-green-400/30">
                    <h4 className="text-green-400 font-bold mb-2">Quadrant 2: Important, Not Urgent</h4>
                    <p className="text-gray-300 text-sm">Strategic tasks that contribute to long-term goals (e.g., planning, learning)</p>
                  </div>
                  <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-400/30">
                    <h4 className="text-yellow-400 font-bold mb-2">Quadrant 3: Urgent, Not Important</h4>
                    <p className="text-gray-300 text-sm">Interruptions and distractions (e.g., meetings, notifications)</p>
                  </div>
                  <div className="bg-red-500/10 rounded-xl p-4 border border-red-400/30">
                    <h4 className="text-red-400 font-bold mb-2">Quadrant 4: Neither Urgent Nor Important</h4>
                    <p className="text-gray-300 text-sm">Time-wasters to eliminate or minimize (e.g., excessive social media)</p>
                  </div>
                </div>
              </div>

              {/* Daily Journal */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <FileText className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Daily Journal
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Text-based journaling system for Study Mode. Record your thoughts, reflect on your day, 
                  and track your emotional state. Journal entries can be processed by AI to generate insights 
                  and automatically create tasks via the MCP server.
                </p>
              </div>

              {/* Monthly Calendar & Analytics */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Monthly Calendar & Analytics
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Visual calendar showing your mood, task completion, and study sessions. 
                  Click on any day to view detailed information, add tasks, or edit journal entries.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                    <h4 className="text-white font-semibold mb-2">Features:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Monthly view with mood indicators</li>
                      <li>• Task overlay for each day</li>
                      <li>• Pomodoro session statistics</li>
                      <li>• Sound usage patterns</li>
                    </ul>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                    <h4 className="text-white font-semibold mb-2">Analytics:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Productivity trends</li>
                      <li>• Focus time analysis</li>
                      <li>• Task completion rates</li>
                      <li>• Sound preferences</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WELLNESS MODE SECTION */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <Heart className="w-10 h-10 text-green-400" />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Wellness Mode
              </h2>
            </div>

            <div className="space-y-6">
              {/* Voice AI Journaling */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <Mic className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Voice AI Journaling
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Powered by Google's Gemini Live API, this feature allows you to have natural, conversational 
                  voice sessions with an AI companion. Speak about your thoughts, feelings, and experiences, 
                  and receive empathetic, evidence-based responses.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                    <h4 className="text-white font-semibold mb-2">How It Works:</h4>
                    <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside">
                      <li>Click "Connect" to start a voice session</li>
                      <li>Speak naturally - the AI listens and responds</li>
                      <li>Voice Activity Detection (VAD) manages turn-taking</li>
                      <li>Session is summarized and stored</li>
                      <li>MCP server extracts actionable tasks from conversations</li>
                    </ol>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4 border border-white/5">
                    <h4 className="text-white font-semibold mb-2">AI Features:</h4>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Real-time voice conversation</li>
                      <li>• Context-aware responses (RAG)</li>
                      <li>• Empathetic, therapeutic tone</li>
                      <li>• Automatic session summaries</li>
                      <li>• Task extraction and creation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Wellness Calendar */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Wellness Calendar & Mood Tracking
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Track your daily mood, emotions, and wellness activities. Each day can be marked with 
                  emoji indicators and notes, providing a visual representation of your emotional journey.
                </p>
              </div>

              {/* Wellness Stats */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Monthly Wellness Statistics
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Comprehensive analytics showing mood trends, journaling frequency, voice session insights, 
                  and overall wellness patterns over time.
                </p>
              </div>

              {/* Pathways */}
              <div className="bg-black rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-4">
                  <Layers className="w-6 h-6 text-green-400" />
                  <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Pathways Visualization
                  </h3>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Interactive visualization showing your wellness journey, including milestones, 
                  patterns, and progress toward your goals.
                </p>
              </div>
            </div>
          </section>

          {/* COMMUNITY SECTION */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <MessageCircle className="w-10 h-10 text-purple-400" />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Community Features (Discord-like)
              </h2>
            </div>

            <div className="bg-black rounded-2xl p-8 border border-white/10">
              <p className="text-gray-300 mb-6 leading-relaxed">
                A Discord-like community platform where users can join servers, participate in text and voice channels, 
                and connect with others in a safe, moderated environment.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">Default Servers:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-white">General Community</strong> - Main discussion hub</li>
                    <li>• <strong className="text-white">Study Hub</strong> - Study groups and productivity tips</li>
                    <li>• <strong className="text-white">Wellness & Mindfulness</strong> - Mental health support</li>
                  </ul>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">Features:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Text and voice channels</li>
                    <li>• Real-time messaging (WebSocket)</li>
                    <li>• Server roles (Admin, Moderator, Member)</li>
                    <li>• Join servers by ID</li>
                    <li>• Channel organization</li>
                  </ul>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">How It Works:</h4>
                  <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside">
                    <li>Browse available servers</li>
                    <li>Join or create a server</li>
                    <li>Click "Open Chat App" to access full Discord interface</li>
                    <li>Connect via WebSocket for real-time messaging</li>
                    <li>Participate in channels and conversations</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* GLOBAL WELLNESS / REDDIT SECTION */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <Map className="w-10 h-10 text-orange-400" />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Global Wellness Network (Reddit-like)
              </h2>
            </div>

            <div className="bg-black rounded-2xl p-8 border border-white/10">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Country-specific Reddit-style communities where users can share posts, engage in discussions, 
                and connect with others from around the world. Accessible via the 3D globe in Wellness Mode.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">12 Countries Available:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                    {['🇺🇸 US', '🇮🇳 India', '🇬🇧 UK', '🇨🇦 Canada', '🇦🇺 Australia', '🇩🇪 Germany', 
                      '🇫🇷 France', '🇯🇵 Japan', '🇧🇷 Brazil', '🇨🇳 China', '🇲🇽 Mexico', '🇮🇹 Italy'].map((country, idx) => (
                      <div key={idx} className="p-2 bg-black/30 rounded">{country}</div>
                    ))}
                  </div>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">Features:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Create and share posts</li>
                    <li>• Comment and reply to posts</li>
                    <li>• Upvote/downvote system</li>
                    <li>• Sorting (Hot, New, Top)</li>
                    <li>• Subscribe to countries</li>
                    <li>• User activity tracking</li>
                    <li>• Media attachments</li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                <h4 className="text-white font-bold mb-3">How It Works:</h4>
                <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside">
                  <li>Open Wellness Mode and click on the 3D globe</li>
                  <li>Select a country from the overlay</li>
                  <li>Navigate to that country's Reddit community</li>
                  <li>Browse posts, create your own, or engage in discussions</li>
                  <li>All activity is tracked under your user ID</li>
                </ol>
              </div>
            </div>
          </section>

          {/* WEARABLE INTEGRATION SECTION */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <Watch className="w-10 h-10 text-cyan-400" />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Wearable Device Integration
              </h2>
            </div>

            <div className="bg-black rounded-2xl p-8 border border-white/10">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Seamless integration with wearable devices to track physiological and environmental data, 
                providing holistic insights into your wellness.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">Supported Devices:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-white">Ray-Ban Meta Glasses</strong> - Environmental data</li>
                    <li>• <strong className="text-white">Apple Watch Series 9</strong> - Health metrics</li>
                    <li>• <strong className="text-white">Fitbit Sense 2</strong> - Activity tracking</li>
                  </ul>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">Environmental Data:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Temperature & Humidity</li>
                    <li>• Air Quality</li>
                    <li>• Light Level</li>
                    <li>• Noise Level</li>
                    <li>• Location Context</li>
                  </ul>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">Physiological Data:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• Heart Rate</li>
                    <li>• Stress Level</li>
                    <li>• Focus Score</li>
                    <li>• Energy Level</li>
                    <li>• Sleep Quality</li>
                    <li>• Step Count</li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                <h4 className="text-white font-bold mb-3">How It Works:</h4>
                <ol className="text-gray-300 space-y-2 text-sm list-decimal list-inside">
                  <li>Register your wearable device in the system</li>
                  <li>Device syncs data automatically via API</li>
                  <li>Environmental and physiological data is stored</li>
                  <li>AI analyzes patterns and correlations</li>
                  <li>Receive personalized recommendations</li>
                  <li>View insights in the Wearable Insights Overlay</li>
                </ol>
              </div>
            </div>
          </section>

          {/* MCP SERVER & AI NATIVE SECTION */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <Brain className="w-10 h-10 text-yellow-400" />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                MCP Server & AI Native Integration
              </h2>
            </div>

            <div className="bg-black rounded-2xl p-8 border border-white/10 mb-8">
              <p className="text-gray-300 mb-6 leading-relaxed">
                Our platform is fully AI-native, meaning you can interact with Sahayata through multiple interfaces, 
                and the MCP (Model Context Protocol) server automatically processes journal entries to create actionable tasks.
              </p>

              {/* Journaling to Task Creation Flowchart */}
              <div className="bg-black/50 rounded-xl p-8 border border-white/5 mb-6">
                <h4 className="text-white font-bold mb-6 text-xl">Journaling → Task Creation Flow</h4>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  {/* Flow Step 1 */}
                  <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-400/40 text-center min-w-[200px]">
                    <Mic className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <h5 className="text-white font-bold mb-2">Voice Journal</h5>
                    <p className="text-gray-300 text-sm">User journals via Voice AI or GPT</p>
                  </div>
                  <div className="text-3xl text-blue-400">→</div>
                  
                  {/* Flow Step 2 */}
                  <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-400/40 text-center min-w-[200px]">
                    <Brain className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <h5 className="text-white font-bold mb-2">AI Processing</h5>
                    <p className="text-gray-300 text-sm">Gemini AI analyzes journal content</p>
                  </div>
                  <div className="text-3xl text-purple-400">→</div>
                  
                  {/* Flow Step 3 */}
                  <div className="bg-green-500/20 rounded-xl p-6 border border-green-400/40 text-center min-w-[200px]">
                    <Settings className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <h5 className="text-white font-bold mb-2">MCP Server</h5>
                    <p className="text-gray-300 text-sm">Extracts actionable tasks</p>
                  </div>
                  <div className="text-3xl text-green-400">→</div>
                  
                  {/* Flow Step 4 */}
                  <div className="bg-orange-500/20 rounded-xl p-6 border border-orange-400/40 text-center min-w-[200px]">
                    <Grid3x3 className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <h5 className="text-white font-bold mb-2">Task Created</h5>
                    <p className="text-gray-300 text-sm">Auto-added to Eisenhower Matrix</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">AI Native Features:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-white">Voice Journaling</strong> - Via Voice AI interface</li>
                    <li>• <strong className="text-white">GPT Integration</strong> - Journal directly on ChatGPT/Claude</li>
                    <li>• <strong className="text-white">Text Journaling</strong> - Traditional text input</li>
                    <li>• <strong className="text-white">Multi-Interface</strong> - Same data, different entry points</li>
                  </ul>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">MCP Server Capabilities:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• Automatically analyzes journal content</li>
                    <li>• Extracts actionable items and goals</li>
                    <li>• Creates tasks with appropriate priorities</li>
                    <li>• Assigns tasks to correct matrix quadrant</li>
                    <li>• Sets due dates based on context</li>
                  </ul>
                </div>
              </div>

              <div className="bg-black/50 rounded-xl p-6 border border-white/5 mt-6">
                <h4 className="text-white font-bold mb-3">Example Flow:</h4>
                <div className="text-gray-300 text-sm space-y-3">
                  <p><strong className="text-white">User journals:</strong> "I need to finish my project by Friday and also want to start exercising more."</p>
                  <p><strong className="text-white">MCP Server processes:</strong> Extracts two tasks: "Finish project" (Urgent & Important) and "Start exercising" (Important, Not Urgent)</p>
                  <p><strong className="text-white">Tasks created:</strong> Automatically added to Eisenhower Matrix with appropriate quadrants and due dates</p>
                </div>
              </div>
            </div>
          </section>

          {/* SYSTEM ARCHITECTURE SECTION */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <Database className="w-10 h-10 text-pink-400" />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                System Architecture
              </h2>
            </div>

            <div className="bg-black rounded-2xl p-8 border border-white/10">
              {/* Architecture Flowchart */}
              <div className="bg-black/50 rounded-xl p-8 border border-white/5 mb-6">
                <h4 className="text-white font-bold mb-6 text-xl">Platform Architecture Flow</h4>
                <div className="space-y-4">
                  {/* Layer 1: Frontend */}
                  <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-400/40">
                    <div className="flex items-center gap-3 mb-3">
                      <Activity className="w-6 h-6 text-blue-400" />
                      <h5 className="text-white font-bold text-lg">Frontend Layer (React + Vite)</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                      <div>• Study Mode UI</div>
                      <div>• Wellness Mode UI</div>
                      <div>• Community Interface</div>
                      <div>• Global Wellness (Reddit)</div>
                      <div>• Voice AI Interface</div>
                      <div>• Wearable Insights</div>
                    </div>
                  </div>
                  
                  <div className="text-center text-2xl text-blue-400 py-2">↓</div>
                  
                  {/* Layer 2: API */}
                  <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-400/40">
                    <div className="flex items-center gap-3 mb-3">
                      <Cloud className="w-6 h-6 text-purple-400" />
                      <h5 className="text-white font-bold text-lg">Backend API (FastAPI)</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                      <div>• REST API Endpoints</div>
                      <div>• WebSocket (Real-time)</div>
                      <div>• Authentication (JWT)</div>
                      <div>• Voice AI Service</div>
                      <div>• MCP Server Integration</div>
                      <div>• Wearable API</div>
                    </div>
                  </div>
                  
                  <div className="text-center text-2xl text-purple-400 py-2">↓</div>
                  
                  {/* Layer 3: AI Services */}
                  <div className="bg-green-500/20 rounded-xl p-6 border border-green-400/40">
                    <div className="flex items-center gap-3 mb-3">
                      <Brain className="w-6 h-6 text-green-400" />
                      <h5 className="text-white font-bold text-lg">AI Services</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                      <div>• Google Gemini Live API</div>
                      <div>• Voice Activity Detection (VAD)</div>
                      <div>• RAG (Retrieval Augmented Generation)</div>
                      <div>• Session Summarization</div>
                      <div>• Task Extraction (MCP)</div>
                      <div>• Wearable Data Analysis</div>
                    </div>
                  </div>
                  
                  <div className="text-center text-2xl text-green-400 py-2">↓</div>
                  
                  {/* Layer 4: Database */}
                  <div className="bg-orange-500/20 rounded-xl p-6 border border-orange-400/40">
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="w-6 h-6 text-orange-400" />
                      <h5 className="text-white font-bold text-lg">PostgreSQL Database</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
                      <div>• User Accounts</div>
                      <div>• Journal Entries</div>
                      <div>• Tasks (Eisenhower Matrix)</div>
                      <div>• Community Data</div>
                      <div>• Reddit Posts/Comments</div>
                      <div>• Wearable Data</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">Frontend Stack:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• React 19.1.1</li>
                    <li>• Vite</li>
                    <li>• Tailwind CSS 4.1.13</li>
                    <li>• React Router DOM 7.8.2</li>
                    <li>• Three.js / React Three Fiber</li>
                    <li>• Zustand (State Management)</li>
                    <li>• WebSocket Client</li>
                  </ul>
                </div>
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-3">Backend Stack:</h4>
                  <ul className="text-gray-300 space-y-1 text-sm">
                    <li>• FastAPI 0.115.0</li>
                    <li>• SQLModel 0.0.22 (SQLAlchemy ORM)</li>
                    <li>• PostgreSQL Database</li>
                    <li>• JWT Authentication</li>
                    <li>• WebSocket Support</li>
                    <li>• Google Gemini Live API</li>
                    <li>• MCP Server</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* COMPLETE FLOW SECTION */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <Star className="w-10 h-10 text-yellow-400" />
              <h2 className="text-4xl font-bold text-white" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Complete User Flow
              </h2>
            </div>

            <div className="bg-black rounded-2xl p-8 border border-white/10">
              <div className="space-y-6">
                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-4">Daily Workflow Example:</h4>
                  <ol className="text-gray-300 space-y-3 text-sm list-decimal list-inside">
                    <li><strong className="text-white">Morning:</strong> Check Eisenhower Matrix, start Pomodoro timer for focused work</li>
                    <li><strong className="text-white">Midday:</strong> Voice journal about your morning, MCP server creates tasks automatically</li>
                    <li><strong className="text-white">Afternoon:</strong> Update mood in Wellness Calendar, join Study Hub community</li>
                    <li><strong className="text-white">Evening:</strong> Review Global Wellness posts, check wearable insights</li>
                    <li><strong className="text-white">Night:</strong> Complete tasks, review analytics, plan for tomorrow</li>
                  </ol>
                </div>

                <div className="bg-black/50 rounded-xl p-6 border border-white/5">
                  <h4 className="text-white font-bold mb-4">Key Integrations:</h4>
                  <ul className="text-gray-300 space-y-2 text-sm">
                    <li>• <strong className="text-white">Journal → Tasks:</strong> MCP server automatically creates tasks from journal entries</li>
                    <li>• <strong className="text-white">Voice → Insights:</strong> Voice sessions generate summaries and recommendations</li>
                    <li>• <strong className="text-white">Wearable → Wellness:</strong> Device data informs wellness recommendations</li>
                    <li>• <strong className="text-white">Community → Support:</strong> Connect with others for motivation and guidance</li>
                    <li>• <strong className="text-white">AI Native:</strong> Journal via Voice AI, GPT, or text - all paths lead to the same system</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

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
              Start Your Journey
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