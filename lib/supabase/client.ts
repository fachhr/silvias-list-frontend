// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing environment variable NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseServiceRoleKey) {
  throw new Error("Missing environment variable SUPABASE_SERVICE_ROLE_KEY");
}

// Create a single supabase client for interacting with your database
// Note: We use the SERVICE_ROLE_KEY here for backend operations
// This key has admin privileges and bypasses RLS.
// Ensure this file is ONLY used in backend (Netlify Functions, API routes).
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

// If you also need a client that respects RLS (e.g., for user-specific reads via a function)
// you'd typically pass the user's JWT to create a scoped client, or rely on frontend RLS.
// For this update function, admin client is appropriate as we're acting on behalf of the user
// after verifying their Clerk JWT.