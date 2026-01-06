
import React, { useState, useEffect } from 'react';
import { supabase, isConfigured, SUPABASE_URL } from './services/supabase';
import { ClipboardCheck, GraduationCap, User, Calendar, Phone, Send, CheckCircle2, AlertCircle, Settings, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfigWarning, setShowConfigWarning] = useState(false);

  useEffect(() => {
    if (!isConfigured()) {
      setShowConfigWarning(true);
    }
  }, []);

  const [formData, setFormData] = useState({
    full_name: '',
    birthday: '',
    grade_apply: 'Lớp 1',
    parent_name: '',
    phone: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConfigured()) {
      setError('Vui lòng cấu hình SUPABASE_URL và SUPABASE_ANON_KEY trong file services/supabase.ts trước khi gửi.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error: insertError } = await supabase
        .from('applications')
        .insert([
          {
            full_name: formData.full_name,
            birthday: formData.birthday,
            grade_apply: formData.grade_apply,
            parent_name: formData.parent_name,
            phone: formData.phone
          }
        ]);

      if (insertError) throw insertError;

      // Thành công
      setSuccess(true);
      setFormData({
        full_name: '',
        birthday: '',
        grade_apply: 'Lớp 1',
        parent_name: '',
        phone: ''
      });
      
      // Hiển thị alert sau khi UI đã cập nhật trạng thái thành công
      setTimeout(() => alert('Đăng ký tuyển sinh thành công!'), 100);
    } catch (err: any) {
      console.error(err);
      setError('Lỗi: ' + (err.message || 'Không thể kết nối với Supabase. Vui lòng kiểm tra cấu hình URL và Key.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {showConfigWarning && (
        <div className="max-w-md w-full mb-4 bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3 shadow-sm">
          <Settings className="text-amber-600 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-amber-800 font-bold text-sm">Chưa cấu hình Supabase</h3>
            <p className="text-amber-700 text-xs mt-1 leading-relaxed">
              Bạn cần thay đổi <strong>SUPABASE_URL</strong> và <strong>SUPABASE_ANON_KEY</strong> trong file <code>services/supabase.ts</code> để ứng dụng có thể gửi dữ liệu.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100">
        {/* Header Section */}
        <div className="bg-blue-600 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
            <GraduationCap size={120} />
          </div>
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/20 rounded-full mb-4">
              <GraduationCap size={40} />
            </div>
            <h1 className="text-2xl font-bold">Tuyển sinh Đầu cấp</h1>
            <p className="text-blue-100 mt-1">Năm học 2024 - 2025</p>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 animate-pulse">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
              <CheckCircle2 size={18} className="shrink-0" />
              <span>Đăng ký tuyển sinh thành công!</span>
            </div>
          )}

          {/* Họ tên học sinh */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User size={16} className="text-blue-500" />
              Họ và tên học sinh
            </label>
            <input
              required
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="VD: Nguyễn Văn A"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-300"
            />
          </div>

          {/* Ngày sinh */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Calendar size={16} className="text-blue-500" />
              Ngày sinh
            </label>
            <input
              required
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-300"
            />
          </div>

          {/* Lớp đăng ký */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <ClipboardCheck size={16} className="text-blue-500" />
              Lớp đăng ký
            </label>
            <select
              name="grade_apply"
              value={formData.grade_apply}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all cursor-pointer"
            >
              <option value="Lớp 1">Lớp 1</option>
            </select>
          </div>

          {/* Họ tên phụ huynh */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <User size={16} className="text-blue-500" />
              Họ tên phụ huynh
            </label>
            <input
              required
              type="text"
              name="parent_name"
              value={formData.parent_name}
              onChange={handleChange}
              placeholder="Họ tên bố hoặc mẹ"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-300"
            />
          </div>

          {/* Số điện thoại */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Phone size={16} className="text-blue-500" />
              Số điện thoại phụ huynh
            </label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="09xx xxx xxx"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all hover:border-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white transition-all duration-300 shadow-lg ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed scale-95' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-200 active:scale-95 shadow-blue-100'
            }`}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Send size={20} />
                Gửi đăng ký tuyển sinh
              </>
            )}
          </button>
        </form>

        <div className="p-4 bg-gray-50 text-center border-t border-gray-100 flex items-center justify-center gap-4">
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
            Hệ thống bảo mật dữ liệu 256-bit
          </p>
          <div className="w-px h-3 bg-gray-300"></div>
          <a 
            href="admin.html" 
            className="text-[10px] uppercase tracking-wider text-blue-500 font-bold hover:underline flex items-center gap-1"
          >
            <Lock size={10} />
            Quản trị
          </a>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-400 text-sm">
        &copy; 2024 Hệ thống Tuyển sinh điện tử. Mọi quyền được bảo lưu.
      </footer>
    </div>
  );
};

export default App;
