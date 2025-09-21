import { createClient } from '@supabase/supabase-js'

// Get these values from your Supabase dashboard at https://supabase.com
// Create a .env file and add your credentials there
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create the client if we have real credentials
let supabase = null

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('https://') && supabaseAnonKey.startsWith('eyJ')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('Supabase client initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
    supabase = createMockClient()
  }
} else {
  // Create a mock client for development
  console.warn('Supabase credentials not found or using placeholder values. Using mock client for development.')
  console.warn('To set up Supabase:')
  console.warn('1. Create a .env file in the root directory')
  console.warn('2. Add VITE_SUPABASE_URL=your_actual_url')
  console.warn('3. Add VITE_SUPABASE_ANON_KEY=your_actual_key')
  supabase = createMockClient()
}

function createMockClient() {
  return {
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
