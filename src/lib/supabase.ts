
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../integrations/supabase/types';

const supabaseUrl = 'https://behobepwtvtoflaupmri.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlaG9iZXB3dHZ0b2ZsYXVwbXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwMjU5NzgsImV4cCI6MjA1NTYwMTk3OH0.Qu7b5QK9ksKArQ3VbvrI1fHRvOMDK89AUROp0fi-oKg';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
