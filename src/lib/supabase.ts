// Supabase is currently disabled - no database/backend needed for now

// import { createClient } from '@supabase/supabase-js';
import { useToast } from 'vue-toastification';

// Supabase configuration is commented out
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
// const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Mock Supabase client for compatibility
export const supabase = {
  auth: {
    signUp: () => Promise.resolve({ data: { user: null }, error: { message: "Supabase is disabled" } }),
    signInWithPassword: () => Promise.resolve({ data: { user: null }, error: { message: "Supabase is disabled" } }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null })
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: [], error: { message: "Supabase is disabled" } }),
    update: () => ({ data: [], error: { message: "Supabase is disabled" } }),
    delete: () => ({ data: [], error: { message: "Supabase is disabled" } }),
    upsert: () => ({ data: [], error: { message: "Supabase is disabled" } })
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: { message: "Supabase storage is disabled" } }),
      remove: () => Promise.resolve({ data: null, error: { message: "Supabase storage is disabled" } }),
      getPublicUrl: () => ({ data: { publicUrl: "" } })
    })
  }
};

// Mock admin client
export const supabaseAdmin = {
  auth: {
    admin: {
      listUsers: () => Promise.resolve({ data: { users: [] }, error: { message: "Supabase is disabled" } }),
      deleteUser: () => Promise.resolve({ data: null, error: { message: "Supabase is disabled" } }),
      updateUserById: () => Promise.resolve({ data: null, error: { message: "Supabase is disabled" } })
    }
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: [], error: { message: "Supabase is disabled" } }),
    update: () => ({ data: [], error: { message: "Supabase is disabled" } }),
    delete: () => ({ data: [], error: { message: "Supabase is disabled" } }),
    upsert: () => ({ data: [], error: { message: "Supabase is disabled" } })
  })
};

export async function doLogout() {
    // Confirm logout
    const confirmed = window.confirm("Are you sure you want to logout?");

    // If not confirmed, exit the function early
    if (!confirmed) {
      return;
    }

    const toast = useToast();

    // Mock logout since Supabase is disabled
    toast.success("Logout Successfully! (Mock - Supabase disabled)");
}
