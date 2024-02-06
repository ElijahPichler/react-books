import { createClient, SupabaseClient } from '@supabase/supabase-js';





const supabaseUrl: string = 'https://wsqictbddqxdhknupfha.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzcWljdGJkZHF4ZGhrbnVwZmhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNjI3NzEsImV4cCI6MjAyMjczODc3MX0.nT4hGm5gTVhg6_JpJl0QRdBt_4nrtBkcmDCmAAKUCas';


export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

