import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
"https://llchmhjnehnyginnvvou.supabase.co";

const supabasePublishableKey =
"sb_publishable_s5-aF-axLFxiXM3tcpym_w_ylynr5nQ";

export const supabase = createClient(
    supabaseUrl,
    supabasePublishableKey,
    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);
