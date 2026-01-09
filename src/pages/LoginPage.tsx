import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CatIcon } from '@/components/CatIcon';
import { Eye, EyeOff, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const success = login(username, password);
    setIsLoading(false);

    if (success) {
      toast.success('เข้าสู่ระบบสำเร็จ!');
      navigate('/app');
    } else {
      toast.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          {/* Logo */}
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl gradient-primary mb-4 animate-float">
              <CatIcon className="text-white" size={56} />
            </div>
            <h1 className="text-3xl font-extrabold text-gradient-primary">
              Cat Food Finder
            </h1>
            <p className="text-muted-foreground mt-2">
              ค้นหาอาหารที่ดีที่สุดสำหรับน้องแมว 🐱
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้"
                className="cat-input"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                รหัสผ่าน
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่าน"
                  className="cat-input pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cat-button-primary flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">หรือ</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Guest & Register Buttons */}
          <div className="space-y-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => navigate('/app')}
              className="w-full cat-button-secondary flex items-center justify-center gap-2"
            >
              <ArrowRight size={20} />
              ใช้งานโดยไม่ล็อกอิน
            </button>

            <button
              onClick={() => navigate('/register')}
              className="w-full cat-button-ghost flex items-center justify-center gap-2"
            >
              <UserPlus size={20} />
              สมัครสมาชิกใหม่
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-muted-foreground">
          Made with 💕 for cat lovers
        </p>
      </div>
    </div>
  );
}
