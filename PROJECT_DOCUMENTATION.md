# Sahayata आवाज़AI - Project Documentation

## 📋 Overview

**Sahayata आवाज़AI** is a comprehensive wellness and productivity platform featuring study mode, wellness tracking, pomodoro timer, priority matrix, community chat, and voice AI capabilities.

---

## 🏗️ Architecture

The project consists of **3 separate applications** running on different ports:

### 1. **Frontend (Main App)** 
- **Location:** `D:\Googlev2hackathonFrontend`
- **Port:** `http://localhost:5173`
- **Technology:** React + Vite + Tailwind CSS
- **Purpose:** Main user interface with study mode, wellness dashboard, and all features

### 2. **Backend (API Server)**
- **Location:** `D:\Googlev2hackathonBackend`
- **Port:** `http://localhost:8000`
- **Technology:** FastAPI + Python + PostgreSQL
- **Purpose:** REST API, authentication, database operations, chat servers

### 3. **Discord Chat App**
- **Location:** `D:\Googlev2hackathonDiscord\discord-fullstack`
- **Port:** `http://localhost:3000`
- **Technology:** React + Vite + WebSocket
- **Purpose:** Full-featured Discord-like chat interface with real-time messaging

---

## 🚀 How to Run the Project

### **Prerequisites:**
- Node.js (v18+)
- Python (v3.9+)
- PostgreSQL database
- npm or yarn

### **Step 1: Start Backend**

```bash
cd D:\Googlev2hackathonBackend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Backend will run on:** `http://localhost:8000`
**API Documentation:** `http://localhost:8000/docs`

### **Step 2: Start Frontend**

```bash
cd D:\Googlev2hackathonFrontend
npm run dev
```

**Frontend will run on:** `http://localhost:5173`
**Network access:** `http://192.168.1.27:5173`

### **Step 3: Start Discord Chat App**

```bash
cd D:\Googlev2hackathonDiscord\discord-fullstack
npm run dev
```

**Discord app will run on:** `http://localhost:3000`

---

## 📡 Ports & URLs

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Frontend | 5173 | http://localhost:5173 | Main web app |
| Backend API | 8000 | http://localhost:8000 | REST API & WebSocket |
| Discord Chat | 3000 | http://localhost:3000 | Chat interface |
| API Docs | 8000 | http://localhost:8000/docs | Swagger/OpenAPI docs |

---

## 🗂️ Project Structure

### **Frontend (`D:\Googlev2hackathonFrontend`)**

```
src/
├── components/          # Reusable UI components
│   ├── Community.jsx           # Discord server browser widget
│   ├── GlobalWellnessGlobe.jsx # Interactive 3D globe
│   ├── NeumorphicCard.jsx      # Card wrapper with stars
│   ├── pomodoroTimer.jsx       # Pomodoro timer
│   ├── EisenhowerMatrix.jsx    # Priority matrix
│   ├── MonthlyCalendar.jsx     # Calendar widget
│   ├── VoiceAICard.jsx         # Voice AI interface
│   ├── World.jsx               # Global wellness component
│   └── ... (26 total components)
│
├── pages/              # Full page components
│   ├── LandingPage.jsx         # Home page
│   ├── ModernLogin.jsx         # Login/signup page
│   ├── wellness.jsx            # Wellness dashboard
│   ├── study.jsx               # Study mode page
│   ├── EisenhowerMatrixPage.jsx # Priority matrix page
│   ├── VoiceAIAgent.jsx        # Voice AI page
│   └── ... (13 total pages)
│
├── contexts/           # React contexts
│   ├── AuthContext.jsx         # Authentication state
│   └── ThemeContext.jsx        # Dark/light/black theme
│
├── utils/              # API utilities
│   ├── loginApi.js             # Auth API calls
│   ├── dailyJournalApi.js      # Journal endpoints
│   ├── moodboardApi.js         # Mood tracking
│   ├── pomodoroApi.js          # Pomodoro sessions
│   ├── priorityMatrixApi.js    # Task management
│   ├── statsApi.js             # Analytics
│   └── utilApi.js              # Generic API utils
│
├── styles/             # Styling
│   └── neumorphic.css          # Neumorphic design system
│
├── sounds/             # Audio files
│   ├── white.mp3, pink.mp3, brown.mp3
│   ├── rain.mp3, ocean.mp3, forest.mp3
│   └── cafe_chatter.mp3, city.mp3
│
└── App.jsx             # Main app router
```

### **Backend (`D:\Googlev2hackathonBackend`)**

```
routers/
├── auth.py                 # Login/signup endpoints
├── chat.py                 # Discord-like chat API
├── chat_manager.py         # WebSocket connection manager
├── daily_journal.py        # Daily journal CRUD
├── moodboard.py            # Mood tracking
├── priority_matrix.py      # Task management
├── stats.py                # Analytics & stats
└── voice_agent_journal.py  # Voice AI journal

main.py                 # FastAPI app entry point
model.py                # SQLModel database models
db.py                   # Database connection
utils.py                # JWT, password hashing
seed_chat_data.py       # Seed script for chat servers
requirements.txt        # Python dependencies
```

### **Discord Chat (`D:\Googlev2hackathonDiscord\discord-fullstack`)**

```
src/
├── App.jsx             # Main chat interface
└── components/
    └── ui/             # Shadcn UI components
```

---

## 🔐 Authentication Flow

1. User visits `http://localhost:5173`
2. Clicks "Get Started" → Redirects to `/login`
3. Signs up or logs in
4. Backend returns JWT token
5. Token stored in `localStorage.access_token`
6. All API requests include: `Authorization: Bearer <token>`
7. Protected routes check for valid token

---

## 🔗 API Endpoints (Backend - Port 8000)

### **Authentication**
- `POST /login` - Login with username/password
- `POST /signup` - Create new account

### **Chat**
- `GET /chat/servers` - Get user's servers
- `POST /chat/servers` - Create new server
- `POST /chat/servers/{id}/join` - Join server
- `GET /chat/servers/{id}/channels` - Get channels
- `POST /chat/servers/{id}/channels` - Create channel
- `GET /chat/servers/{id}/channels/{cid}/messages` - Get messages
- `WS /chat/ws?token=<jwt>` - WebSocket connection

### **Wellness Features**
- `GET/POST/PATCH/DELETE /daily_journal` - Daily journal
- `GET/POST/PATCH /moodboard` - Mood tracking
- `GET/POST/PATCH/DELETE /priority_matrix` - Task management
- `GET/POST /voice_agent_journal` - Voice AI journal

### **Analytics**
- `POST /stats/pomodoro/start` - Start pomodoro session
- `PATCH /stats/pomodoro/{id}/end` - End session
- `GET /stats/pomodoro-analytics/{year}/{month}` - Get analytics
- `POST /stats/sound/start` - Start sound session
- `GET /stats/sound-preferences/{year}/{month}` - Sound stats

---

## 💾 Database Structure

**PostgreSQL Tables:**
- `users` - User accounts
- `chatserver` - Discord-like servers
- `chatchannel` - Text/voice channels
- `chatmessage` - Chat messages
- `servermembership` - User-server relationships
- `prioritymatrix` - Eisenhower matrix tasks
- `dailyjournal` - Daily journal entries
- `moodboard` - Mood tracking data
- `journalsummaries` - Voice AI summaries
- `soundusagelog` - Sound session tracking
- `pomodorosession` - Pomodoro sessions

---

## 🎨 Design System

### **Theme Modes:**
- **Light Mode** - White backgrounds, dark text
- **Dark Mode** - Dark gray backgrounds, light text
- **Black Mode** - Pure black with enhanced neumorphic shadows

### **Neumorphic Design:**
- **Inset surfaces** - Pushed in appearance (inputs, stat cards)
- **Elevated surfaces** - Raised appearance (buttons, server items)
- **Selected state** - Popped out with scale transform
- **Soft shadows** - Multiple shadow layers for depth
- **Starry backgrounds** - Animated stars in cards (study: blue, wellness: green)

---

## 🌟 Key Features

### **Study Mode:**
- ✅ Pomodoro Timer with presets
- ✅ Ambient Sounds (8 types: white/pink/brown noise, rain, ocean, forest, cafe, city)
- ✅ Priority Matrix (Eisenhower Matrix)
- ✅ Monthly Statistics & Analytics
- ✅ Daily Journal
- ✅ Calendar view with emoji moods

### **Wellness Mode:**
- ✅ Wellness Calendar with mood tracking
- ✅ Voice AI Card for journaling
- ✅ Monthly Wellness Stats
- ✅ Community Chat integration
- ✅ Global Wellness Network (3D globe)
- ✅ Pathways visualization

### **Community Features:**
- ✅ Discord-like servers (3 default: General Community, Study Hub, Wellness & Mindfulness)
- ✅ Text and Voice channels
- ✅ Real-time messaging via WebSocket
- ✅ Server roles (Admin, Moderator, Member)
- ✅ Join servers by ID

### **Global Wellness:**
- ✅ Interactive 3D globe (globe.gl + WebGL)
- ✅ Wireframe grid lines
- ✅ Gray country polygons
- ✅ Glowing activity points (12 major cities)
- ✅ Cyan atmosphere
- ✅ Drag to rotate
- ✅ Click regions to view stats
- ✅ Overlay with region selection

---

## 🔄 Data Flow

### **Example: Chat Feature**

1. **User logs in** → Token stored in localStorage
2. **Navigate to Wellness page** → Community widget loads
3. **Fetch servers:** 
   ```
   Frontend → GET /chat/servers (with Bearer token) → Backend
   Backend → Query PostgreSQL → Return servers user is member of
   ```
4. **Click server** → Fetch channels
5. **Click "Open Chat App"** → Redirect to `localhost:3000` with token
6. **Discord app connects** → WebSocket to `ws://localhost:8000/chat/ws?token=<jwt>`
7. **Real-time messaging** via WebSocket events

---

## 🛠️ Environment Variables

### **Frontend (.env)**
```env
VITE_API_URL=http://localhost:8000
```

### **Discord App (.env)**
```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000
```

### **Backend (.env)**
```env
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=yourdb
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 📦 Dependencies

### **Frontend**
- `react` v19.1.1
- `react-router-dom` v7.8.2
- `tailwindcss` v4.1.13
- `framer-motion` v12.23.12
- `zustand` v5.0.8 (state management)
- `globe.gl` (3D globe visualization)
- `three` (3D graphics)
- `topojson-client` (geographic data)

### **Backend**
- `fastapi` - Web framework
- `sqlmodel` - ORM
- `uvicorn` - ASGI server
- `python-jose` - JWT tokens
- `passlib` - Password hashing
- `psycopg2` - PostgreSQL adapter

---

## 🎯 User Accounts

### **Created Servers:**
1. **🌍 General Community**
   - #welcome, #general-chat, #announcements
   - Voice Lounge

2. **📚 Study Hub**
   - #study-lounge, #homework-help, #resources
   - #study-together, #quiet-focus

3. **🧘 Wellness & Mindfulness**
   - #wellness-chat, #meditation-tips, #daily-gratitude, #support-group
   - Meditation Room

### **User Roles:**
- **Admin** - Can create channels, manage members, delete server
- **Moderator** - Can manage messages and members
- **Member** - Can send messages, view channels

---

## 🐛 Troubleshooting

### **WebGL Not Working (Globe not rendering)**
1. Enable hardware acceleration in Chrome: `chrome://settings/system`
2. Enable WebGL override: `chrome://flags/#ignore-gpu-blocklist`
3. Test at: `https://get.webgl.org/`
4. Try different browser (Firefox, Edge)

### **401 Unauthorized Errors**
- Token expired → Log out and log in again
- Backend restarted → Clear localStorage and re-login
- Solution: `localStorage.clear()` in browser console

### **No Servers Showing in Community**
- Not logged in → Check `localStorage.getItem('access_token')`
- No server memberships → Run `python seed_chat_data.py`
- Backend not running → Start backend on port 8000

### **Discord App Connection Failed**
- Wrong API URL → Check `.env` file has `VITE_API_URL=http://localhost:8000`
- Backend not running → Start backend
- Restart Discord app to load new env variables

---

## 📊 Database Seeding

### **Seed Chat Servers:**
```bash
cd D:\Googlev2hackathonBackend
python seed_chat_data.py
```

This creates:
- 3 chat servers (General Community, Study Hub, Wellness & Mindfulness)
- Multiple text and voice channels per server
- Adds all existing users as members

---

## 🎨 Key UI Components

### **Neumorphic Cards:**
- Used throughout the app for consistent design
- Starry backgrounds (study: blue stars, wellness: green stars)
- Soft inset/outset shadows
- Responsive to dark/light/black themes

### **Community Chat Widget:**
- Tabs: Servers / Channels
- Server list with selection
- Channel browser (text & voice)
- "Open Chat App" button → Redirects to port 3000
- Neumorphic design with scrollable content

### **Global Wellness Globe:**
- Mini rotating globe (180x180px) in wellness card
- Click to expand → Full overlay (700x700px)
- 3D interactive with drag-to-rotate
- Region selection (hover/click countries)
- Wireframe grid, gray landmasses, glowing city points
- Cyan atmosphere with glow effect

### **Pomodoro Timer:**
- Custom work/break times
- 3 presets (Classic, Quick Sprint, Deep Focus)
- Progress indicators
- Start/pause/reset controls
- Neumorphic design

---

## 🔒 Security

### **Authentication:**
- JWT tokens with expiration
- Password hashing using bcrypt
- Bearer token authentication on all protected routes
- CORS configured for localhost:5173 and localhost:3000

### **Credentials:**
- Stored in `localStorage` (access_token, user_data)
- Sent via `Authorization: Bearer <token>` header
- WebSocket auth via query parameter: `?token=<jwt>`

---

## 🌐 Navigation Routes

### **Frontend Routes:**
- `/` - Landing page
- `/login` - Login/signup page
- `/app` - Main dashboard (protected)
- `/wellness` - Wellness mode (protected)
- `/study` - Study mode (protected)
- `/matrix` - Eisenhower Matrix (protected)
- `/voice-ai` - Voice AI Agent (protected)
- `/article-1`, `/article-2`, etc. - Blog articles

---

## 💡 Features Overview

### **Study Features:**
- Pomodoro timer with analytics
- 8 ambient sounds with volume control
- Eisenhower priority matrix (4 quadrants)
- Daily journal with voice AI summaries
- Monthly calendar with statistics
- Sound usage tracking

### **Wellness Features:**
- Wellness mood tracking calendar
- Voice AI wellness journaling
- Global wellness network visualization
- Community chat integration
- Meditation and mindfulness resources
- Activity tracking

### **Community Features:**
- Server browsing and joining
- Channel navigation (text & voice)
- Real-time messaging
- Server roles and permissions
- Member management
- WebSocket-based live updates

---

## 🎯 User Workflow

### **First Time User:**
1. Visit `localhost:5173`
2. Click "Get Started" → `/login`
3. Sign up with username, email, password
4. Redirected to `/app`
5. Explore study mode or wellness mode
6. Join community servers
7. Open Discord chat for messaging

### **Returning User:**
1. Visit `localhost:5173`
2. Already logged in (token in localStorage)
3. Direct access to all features
4. Token auto-refreshes API calls

---

## 📈 Analytics & Tracking

### **Tracked Data:**
- Pomodoro sessions (start time, end time, duration)
- Sound usage (type, duration, preferences)
- Daily journal entries
- Mood tracking (emoji, summaries)
- Task completion (priority matrix)
- Monthly statistics

### **Stats API:**
- `/stats/pomodoro-analytics/{year}/{month}` - Session analytics
- `/stats/sound-preferences/{year}/{month}` - Sound usage patterns
- `/stats/monthly-overview/{year}/{month}` - Combined overview

---

## 🔧 Configuration Files

### **Frontend:**
- `package.json` - Dependencies & scripts
- `vite.config.js` - Vite configuration
- `tailwind.config.js` - Tailwind CSS setup
- `eslint.config.js` - Linting rules

### **Backend:**
- `requirements.txt` - Python dependencies
- `.env` - Environment variables (DB, JWT secret)
- Database connection via SQLModel

### **Discord:**
- `package.json` - Dependencies
- `vite.config.js` - Vite config (port 3000)
- `.env` - Backend API URL

---

## 🚨 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Can't see servers | Not logged in or no memberships | Log in, then run seed script |
| 401 Unauthorized | Token expired | Clear localStorage and re-login |
| 404 on /login | Backend auto-reload failed | Restart backend server |
| WebGL error | Hardware acceleration off | Enable in chrome://settings/system |
| Discord app 404 | Wrong API URL | Check .env has port 8000 |
| No globe rendering | WebGL disabled | Enable hardware acceleration |

---

## 📝 Development Notes

### **Technologies Used:**
- **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion
- **Backend:** FastAPI, SQLModel, PostgreSQL, WebSocket
- **3D Graphics:** globe.gl, Three.js, WebGL
- **State Management:** Zustand, React Context
- **Styling:** Custom neumorphic CSS, Tailwind utilities
- **Real-time:** WebSocket for chat

### **Design Philosophy:**
- Neumorphic design system
- Dark theme first
- Minimalistic and calm
- Accessibility focused
- Progressive disclosure
- Smooth animations (200-500ms transitions)

---

## 🎓 Learning Resources

- **WebGL Globe:** https://github.com/vasturiano/globe.gl
- **FastAPI Docs:** https://fastapi.tiangolo.com/
- **React Docs:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **WebSocket:** https://developer.mozilla.org/en-US/docs/Web/API/WebSocket

---

## 📞 Support

For issues:
1. Check browser console for errors
2. Check backend logs for API errors
3. Verify all 3 services are running
4. Check database connectivity
5. Verify environment variables

---

**Last Updated:** October 18, 2025  
**Version:** 1.0.0  
**Project:** Sahayata आवाज़AI - Google Hackathon 2025

