# 🎨 Voice Agent Frontend

A modern, responsive React frontend for an AI-powered wellness and voice journaling platform. Features beautiful neumorphic design, real-time voice interaction, and comprehensive wellness tracking.

## 🌟 Features

### 🎯 Core Functionality
- **Voice AI Agent**: Real-time voice interaction with Google Gemini Live API
- **Study Mode**: Academic-focused wellness tracking and study tools
- **Wellness Mode**: Comprehensive mental health and wellness analysis
- **Moodboard**: Visual mood tracking with beautiful data visualizations
- **Eisenhower Matrix**: Task prioritization and time management
- **Daily Journaling**: Track daily emotions, activities, and wellness metrics
- **Wellness Analysis**: AI-powered emotional and mental wellness insights
- **Statistics Dashboard**: Comprehensive analytics and progress tracking
- **Community Features**: Reddit-style community support
- **Research Hub**: Wellness research articles and resources

### 🎨 Design Features
- **Neumorphic UI**: Modern soft-shadow design system
- **Dark/Light/Black Themes**: Multiple theme options with smooth transitions
- **Responsive Design**: Mobile-first, works on all devices
- **3D Visualizations**: Interactive globe and data visualizations
- **Smooth Animations**: Framer Motion powered transitions
- **Glassmorphism**: Liquid glass effects for modern aesthetics

### 🎙️ Voice Features
- **Real-time Transcription**: Live speech-to-text
- **Voice Analysis**: AI-powered emotional analysis from voice
- **Sound Effects**: Immersive audio feedback
- **Voice Journaling**: Record and analyze voice journals
- **WebSocket Integration**: Real-time bidirectional communication

## 🛠️ Tech Stack

- **Framework**: React 19.1.1 with Vite 7.1.2
- **Styling**: 
  - Tailwind CSS 4.1.13
  - Neumorphic design system
  - Custom CSS animations
- **UI Components**: 
  - Headless UI
  - Heroicons
  - Lucide React
- **3D Graphics**: 
  - Three.js
  - React Three Fiber
  - Globe.gl
- **Animations**: Framer Motion 12.23.24
- **State Management**: Zustand 5.0.8
- **Routing**: React Router DOM 7.8.2
- **HTTP Client**: Built-in fetch with WebSocket support

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running (see [backend README](../backend_working_voiceagent/google-hackathon-backend-5b3907c4ed9eb19dbaa08b898a42a4ee1ea5e5fe/README.md))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/StraightOuttaVellore-Google/google-hackathon-frontend.git
cd google-hackathon-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory (never commit this file):

```env
# API Configuration
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000

# Firebase Configuration (if using Firebase directly)
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id

# Google Services
VITE_GOOGLE_CLOUD_PROJECT=your-gcp-project-id

# Feature Flags
VITE_ENABLE_VOICE_AGENT=true
VITE_ENABLE_WELLNESS_ANALYSIS=true
```

### 4. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### 6. Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
.
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/            # Base UI components (Button, Input, etc.)
│   │   ├── VoiceAIOverlay.jsx
│   │   ├── WellnessAnalysisResults.jsx
│   │   ├── SoundPlayer.jsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── LandingPage.jsx
│   │   ├── VoiceAIAgent.jsx
│   │   ├── study.jsx
│   │   ├── wellness.jsx
│   │   ├── moodboard.jsx
│   │   ├── EisenhowerMatrixPage.jsx
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── services/          # API services
│   │   ├── apiService.js
│   │   ├── voiceService.js
│   │   └── loggingService.js
│   ├── stores/           # Zustand stores
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
│   ├── images/          # Image assets
│   └── assets/          # Other static files
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies
```

## 🎨 Theme System

The app supports three theme modes:

### Light Theme
- Soft, clean aesthetic
- Light backgrounds with subtle shadows
- Perfect for daytime use

### Dark Theme
- Modern dark mode
- Reduced eye strain
- Galaxy-inspired backgrounds

### Black Theme
- Pure black background
- Maximum contrast
- OLED-friendly

Switch themes using the theme dropdown in the navigation.

## 🔌 API Integration

### Backend API
The frontend communicates with the backend via:
- **REST API**: Standard HTTP endpoints
- **WebSocket**: Real-time voice agent communication

### Environment Variables
All API endpoints are configured via `VITE_API_URL` in `.env`:
- Development: `http://localhost:8000`
- Production: Your deployed backend URL

## 🎙️ Voice Agent Integration

### Setup
1. Ensure backend is running with WebSocket support
2. Configure `VITE_WS_URL` in `.env`
3. Enable voice features via `VITE_ENABLE_VOICE_AGENT=true`

### Usage
1. Navigate to Voice AI Agent page
2. Click "Start Recording" to begin voice interaction
3. Speak naturally - the AI will transcribe and respond in real-time
4. View wellness analysis results after each session

## 🐳 Docker Deployment

### Build Docker Image
```bash
docker build -t voice-agent-frontend .
```

### Run Container
```bash
docker run -p 80:80 \
  -e VITE_API_URL=https://your-backend-url.com \
  voice-agent-frontend
```

## ☁️ Google Cloud Deployment

### Using Cloud Run

1. **Build and push to Container Registry**:
```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/voice-agent-frontend
```

2. **Deploy to Cloud Run**:
```bash
gcloud run deploy voice-agent-frontend \
  --image gcr.io/PROJECT_ID/voice-agent-frontend \
  --platform managed \
  --region us-central1 \
  --set-env-vars="VITE_API_URL=https://your-backend-url.com" \
  --allow-unauthenticated
```

### Using Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Build the app**:
```bash
npm run build
```

3. **Deploy**:
```bash
firebase deploy --only hosting
```

## 🔒 Security Best Practices

⚠️ **Never commit sensitive files:**
- `.env` files
- API keys
- Service account credentials

✅ **Environment Variables:**
- Use `VITE_` prefix for client-side variables
- Never expose secrets - use backend API for sensitive operations
- Use Google Cloud Secret Manager for production secrets

## 📱 Responsive Design

The app is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)

## 🧪 Testing

### Run Linter
```bash
npm run lint
```

### Manual Testing Checklist
- [ ] Voice agent connection works
- [ ] Theme switching functions correctly
- [ ] All pages load without errors
- [ ] API calls return expected data
- [ ] WebSocket connections are stable
- [ ] Responsive design works on all screen sizes

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      // ...
    }
  }
}
```

### Components
All components are modular and can be customized in `src/components/`

## 📚 Documentation

- [Project Documentation](./PROJECT_DOCUMENTATION.md) - Detailed project docs
- [Clean Architecture](./CLEAN_ARCHITECTURE_FINAL.md) - Architecture overview
- [Design Rules](./RULES_DESIGN.md) - Design system guidelines
- [Backend README](../backend_working_voiceagent/google-hackathon-backend-5b3907c4ed9eb19dbaa08b898a42a4ee1ea5e5fe/README.md) - Backend API documentation

## 🔗 Related Projects

This frontend is part of the larger **Sahay** ecosystem:

- **[Backend API](https://github.com/StraightOuttaVellore-Google/google-hackathon-backend)** - FastAPI backend
- **[Discord Fullstack](https://github.com/StraightOuttaVellore-Google/discord-fullstack)** - Neumorphic chat interface
- **[Voice Agent](https://github.com/StraightOuttaVellore-Google/VoiceAgentGeminiLive)** - Standalone voice agent

## 🐛 Known Issues

- Voice agent requires stable WebSocket connection
- Some features require backend API to be running
- Large file uploads may need optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is part of the Google Hackathon submission.

## 👥 Authors

- **StraightOuttaVellore-Google** - [GitHub](https://github.com/StraightOuttaVellore-Google)

## 🙏 Acknowledgments

- Google Gemini Live API
- React Three Fiber community
- Neumorphic design inspiration
- Tailwind CSS team

---

**Note**: For production deployment, ensure all environment variables are configured correctly. The frontend uses `VITE_` prefixed variables that are embedded at build time.

