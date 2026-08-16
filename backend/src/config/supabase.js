const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing Supabase environment variables');
}

// We use the service role key in the backend to bypass RLS for admin tasks 
// or perform operations on behalf of users after validating their JWT.
const supabase = createClient(supabaseUrl || 'http://localhost:8000', supabaseServiceKey || 'mock-key', {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

module.exports = { supabase };
