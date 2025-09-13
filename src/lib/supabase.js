import { createClient } from '@supabase/supabase-js'

// Get these values from your Supabase dashboard at https://supabase.com
// Create a .env file and add your credentials there
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create the client if we have real credentials
let supabase = null

if (supabaseUrl !== null || supabaseAnonKey !== null) {
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
