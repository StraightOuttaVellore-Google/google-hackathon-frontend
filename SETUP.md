# Authentication Setup Guide

## Supabase Configuration

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new account or sign in
   - Create a new project

2. **Get Your Credentials**
   - In your Supabase dashboard, go to Settings > API
   - Copy your Project URL and anon public key

3. **Create Environment File**
   - Create a `.env` file in the frontend directory
   - Add your credentials:
   ```
   VITE_SUPABASE_URL=your_project_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Enable Email Authentication**
   - In Supabase dashboard, go to Authentication > Settings
   - Make sure "Enable email confirmations" is configured as needed
   - Configure your email templates if desired

## Running the App

1. Install dependencies: `npm install`
2. Create your `.env` file with Supabase credentials
3. Run the development server: `npm run dev`

## Features

- **Authentication**: Email/password sign up and sign in
- **Protected Routes**: App content only accessible after login
- **User Session**: Persistent login across browser sessions
- **Toggle Interface**: Switch between Study and Wellness modes
- **Logout**: Secure logout functionality

## File Structure

- `src/lib/supabase.js` - Supabase client configuration
- `src/contexts/AuthContext.jsx` - Authentication state management
- `src/components/ProtectedRoute.jsx` - Route protection component
- `src/pages/Login.jsx` - Login/signup page
- `src/App.jsx` - Main authenticated app interface
