# Supabase Authentication Setup

## Quick Setup Guide

### 1. Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Create a new project
4. Wait for the project to be ready

### 2. Get Your Credentials
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon public** key

### 3. Create Environment File
Create a `.env` file in the root directory with:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Enable Authentication
1. Go to **Authentication** → **Settings**
2. Make sure **Enable email confirmations** is configured as needed
3. Configure your email templates if desired

### 5. Test the Setup
1. Run `npm run dev`
2. Visit `http://localhost:5173`
3. Click "Start Your Journal" or "Try Voice Journal"
4. Try signing up with a test email

## Current Features

✅ **Landing Page** - Beautiful landing page matching your Figma design
✅ **Modern Login** - shadcn/ui inspired login/signup page
✅ **Authentication Flow** - Proper routing and session management
✅ **Modular Structure** - Easy to integrate and extend

## File Structure

```
src/
├── pages/
│   ├── LandingPage.jsx      # Landing page for unauthenticated users
│   ├── ModernLogin.jsx      # Modern login/signup page
│   ├── study.jsx           # Study mode page
│   └── wellness.jsx        # Wellness mode page
├── components/
│   └── ProtectedRoute.jsx   # Route protection
├── contexts/
│   ├── AuthContext.jsx     # Authentication state
│   └── ThemeContext.jsx    # Theme management
└── lib/
    └── supabase.js         # Supabase client
```

## Next Steps

1. Set up Supabase credentials
2. Test authentication flow
3. Customize the design further
4. Add more features to Study/Wellness pages
