import {createClient} from "@supabase/supabase-js";

// Client-side Supabase client for use in React components
export const createSupabaseClient = () => {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

