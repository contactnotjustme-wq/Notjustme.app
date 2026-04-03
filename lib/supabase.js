import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nxcutmzeairlnaaqwfwc.supabase.co";
const supabaseKey = "你的 publishable key";

export const supabase = createClient(supabaseUrl, supabaseKey);
