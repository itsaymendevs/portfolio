import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL || "https://mlncmwgoljergzncycsa.supabase.co";
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_nkwzs0o0B1vsULUZUiaqJg_9qMiZQRW";

if (!url || !anonKey) {
  console.warn("[supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — visitors will only be stored locally.");
}

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * Helper: check if Supabase is configured (env present)
 */
export function isSupabaseConfigured() {
  return Boolean(url && anonKey);
}
