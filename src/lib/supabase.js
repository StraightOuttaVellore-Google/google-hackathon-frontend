import { createClient } from '@supabase/supabase-js'

// Get these values from your Supabase dashboard at https://supabase.com
// Create a .env file and add your credentials there
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lwnledluqvyoottwkjfg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3bmxlZGx1cXZ5b290dHdramZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NzUxNDcsImV4cCI6MjA3MzI1MTE0N30.T7shEg1tgvaNTKGer2gfWXf3hjyYfNCtqSPwwQRZ0_s'

// Debug logging
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing')

// Only create the client if we have real credentials
let supabase = null

if (supabaseUrl !== 'https://placeholder.supabase.co' && supabaseAnonKey !== 'placeholder-key' && supabaseUrl.includes('lwnledluqvyoottwkjfg')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Create a mock client for development
  console.warn('Supabase credentials not found. Using mock client for development.')
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signUp: async () => ({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: async () => ({ error: null })
    }
  }
}

export { supabase }
