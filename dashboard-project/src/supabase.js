import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://itsbabmdgyssstdivykb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0c2JhYm1kZ3lzc3N0ZGl2eWtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczODM0MTksImV4cCI6MjA2Mjk1OTQxOX0.cgQ7q0FTXWKB927mOYwiMMCDmrypfZ5z6IrmyyIGMVU";
export const supabase = createClient(supabaseUrl, supabaseKey);