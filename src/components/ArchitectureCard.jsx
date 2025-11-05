const ArchitectureCard = () => {
  const architectureLayers = [
    {
      title: "Frontend Applications",
      description: "React-based user interfaces with real-time capabilities",
      technologies: ["React", "Vite", "Tailwind CSS", "WebSocket Client"],
      apps: ["Main Web App", "Discord Chat Interface"],
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-400/30"
    },
    {
      title: "Backend API Services",
      description: "FastAPI microservices with WebSocket support",
      technologies: ["FastAPI", "Python 3.12", "WebSockets", "REST API"],
      apps: ["Voice Agent API", "Wellness Analysis", "Chat Manager", "Moodboard"],
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-400/30"
    },
    {
      title: "AI & ML Services",
      description: "Intelligent agent orchestration with context-aware responses",
      technologies: ["Google Gemini Live API", "Google ADK", "Mem0", "Hybrid RAG"],
      apps: ["Voice Journaling AI", "Wellness Agents", "Study Stress Agents", "MCP Server"],
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-400/30"
    },
    {
      title: "Database & Storage",
      description: "Unified real-time data layer with Firebase Firestore",
      technologies: ["Firebase Firestore", "Real-time Sync", "Cloud Storage", "Secret Manager"],
      apps: ["User Data", "Voice Journals", "Wellness Analytics", "Chat History"],
      color: "from-orange-500/20 to-orange-600/10",
      borderColor: "border-orange-400/30"
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable Google Cloud platform with auto-scaling",
      technologies: ["Google Cloud Run", "Cloud Functions", "Docker", "Container Registry"],
      apps: ["Backend Services", "API Gateway", "CDN", "Monitoring"],
      color: "from-cyan-500/20 to-cyan-600/10",
      borderColor: "border-cyan-400/30"
    },
    {
      title: "Security & Authentication",
      description: "Enterprise-grade security with end-to-end encryption",
      technologies: ["Firebase Auth", "JWT Tokens", "AES-256", "OAuth 2.0"],
      apps: ["User Authentication", "API Security", "Data Encryption", "Access Control"],
      color: "from-red-500/20 to-red-600/10",
      borderColor: "border-red-400/30"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 md:px-6">
      <div 
        className="rounded-2xl md:rounded-3xl p-6 md:p-12 transition-all duration-300"
        style={{
          background: '#000000',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.border = '1px solid rgba(66, 133, 244, 0.6)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.3), 0 0 40px rgba(66, 133, 244, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Architecture Diagram */}
        <div className="space-y-4 md:space-y-6">
          {architectureLayers.map((layer, index) => (
            <div
              key={index}
              className="relative rounded-xl md:rounded-2xl p-4 md:p-6 transition-all duration-300 hover:scale-[1.01] cursor-pointer group"
              style={{
                background: '#000000',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(66, 133, 244, 0.5)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(66, 133, 244, 0.2), 0 0 30px rgba(66, 133, 244, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Layer Header */}
              <div className="mb-3 md:mb-4">
                <h3 
                  className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2"
                  style={{
                    fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
                    filter: 'brightness(1.2)',
                    WebkitFontSmoothing: 'antialiased'
                  }}
                >
                  {layer.title}
                </h3>
                <p 
                  className="text-xs md:text-sm text-gray-400 font-medium mb-3 md:mb-4"
                  style={{
                    fontFamily: 'Google Sans, Arial, Helvetica, sans-serif'
                  }}
                >
                  {layer.description}
                </p>
                
                {/* Technologies */}
                <div className="mb-3 md:mb-4">
                  <div className="text-xs md:text-sm text-gray-500 font-medium mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                    Technologies:
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {layer.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium text-white/90"
                        style={{
                          fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          backdropFilter: 'blur(8px)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Applications/Services */}
                {layer.apps && (
                  <div>
                    <div className="text-xs md:text-sm text-gray-500 font-medium mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                      Services:
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {layer.apps.map((app, appIndex) => (
                        <span
                          key={appIndex}
                          className="px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium text-blue-300/90"
                          style={{
                            fontFamily: 'Google Sans, Arial, Helvetica, sans-serif',
                            background: 'rgba(66, 133, 244, 0.1)',
                            border: '1px solid rgba(66, 133, 244, 0.3)',
                            backdropFilter: 'blur(8px)'
                          }}
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Connection Line (except last) */}
              {index < architectureLayers.length - 1 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0.5 h-4 md:h-6 bg-gradient-to-b from-white/20 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Architecture Features */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                99.9%
              </div>
              <div className="text-xs md:text-sm text-gray-400 font-medium">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                &lt;100ms
              </div>
              <div className="text-xs md:text-sm text-gray-400 font-medium">API Response</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Real-time
              </div>
              <div className="text-xs md:text-sm text-gray-400 font-medium">Data Sync</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2" style={{ fontFamily: 'Google Sans, Arial, Helvetica, sans-serif' }}>
                Auto-scale
              </div>
              <div className="text-xs md:text-sm text-gray-400 font-medium">Infrastructure</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureCard;
