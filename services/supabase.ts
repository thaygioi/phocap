
import { createClient } from '@supabase/supabase-js';

// Các biến cấu hình Supabase (Người dùng hãy thay bằng giá trị thực từ Supabase Dashboard)
export const SUPABASE_URL = "https://your-project-url.supabase.co";
export const SUPABASE_ANON_KEY = "your-anon-key";

// Kiểm tra xem người dùng đã thay đổi thông tin cấu hình chưa
export const isConfigured = () => {
  return SUPABASE_URL !== "https://your-project-url.supabase.co" && SUPABASE_ANON_KEY !== "your-anon-key";
};

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
