import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zzntrlepuvjlgimmhnip.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6bnRybGVwdXZqbGdpbW1obmlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTE3NjUsImV4cCI6MjA2MDI2Nzc2NX0.7mvlBh4aoeAb8bN-qe4PRAzeUeLPjzR7wx8HwP576CE";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'shekharsaileshdecoration'
    }
  }
});
