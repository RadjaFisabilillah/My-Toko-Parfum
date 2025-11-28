import { createClient } from "@supabase/supabase-js";

// Pastikan variabel lingkungan dimuat
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Inisialisasi klien Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
