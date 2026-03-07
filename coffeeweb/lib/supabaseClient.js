import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mmxczcfzsxoqlzeexaqg.supabase.co";
const supabaseKey = "sb_publishable_Pn27D9-6SFMKwhMIbNDBjA_tqz5NPAb";

export const supabase = createClient(supabaseUrl, supabaseKey);