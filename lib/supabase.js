import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nxcutmzeairlnaaqwfwc.supabase.co";
const supabaseKey = "sb_publishable_ojIznWnzUlLkUO2CQMRe_Q_hPPZb6xM";

export const supabase = createClient(supabaseUrl, supabaseKey);
