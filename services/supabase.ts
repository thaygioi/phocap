import { createClient } from '@supabase/supabase-js';

// Lấy biến môi trường từ Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Hàm kiểm tra cấu hình (giữ lại cho bạn dùng)
export const isConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};

// Khởi tạo Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
