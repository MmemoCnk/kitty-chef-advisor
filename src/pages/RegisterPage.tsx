import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CatIcon } from '@/components/CatIcon';
import { Eye, EyeOff, ArrowLeft, Check, Mail, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    if (!email || !email.includes('@')) {
      toast.error('กรุณากรอก Email ที่ถูกต้อง');
      return false;
    }
    if (!username || username.length < 3) {
      toast.error('ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร');
      return false;
    }
    if (!password || password.length < 6) {
      toast.error('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return false;
    }
    if (password !== confirmPassword) {
      toast.error('รหัสผ่านไม่ตรงกัน');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const success = register(email, username, password);
    setIsLoading(false);

    if (success) {
      toast.success('สมัครสมาชิกสำเร็จ!');
      navigate('/app');
    } else {
      toast.error('ชื่อผู้ใช้หรือ Email นี้ถูกใช้แล้ว');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center gap-4 p-4 max-w-lg mx-auto">
          <button onClick={() => navigate('/')} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">สมัครสมาชิก</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="cat-card space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                <CatIcon className="text-white" size={28} />
              </div>
              <div>
                <h2 className="font-bold text-lg">สร้างบัญชีใหม่</h2>
                <p className="text-sm text-muted-foreground">กรอกข้อมูลเพื่อเริ่มต้นใช้งาน</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="cat-input pl-12"
                />
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">ชื่อผู้ใช้</label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ตั้งชื่อผู้ใช้"
                  className="cat-input pl-12"
                />
                <UserIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">รหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ตั้งรหัสผ่าน (อย่างน้อย 6 ตัว)"
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

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">ยืนยันรหัสผ่าน</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                className="cat-input"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cat-button-primary flex items-center justify-center gap-2 py-4"
          >
            <Check size={20} />
            {isLoading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            สมัครสมาชิกเสร็จแล้วสามารถเพิ่มน้องแมวได้ในภายหลัง 🐱
          </p>
        </form>
      </div>
    </div>
  );
}
