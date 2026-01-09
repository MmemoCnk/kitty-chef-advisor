import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CatIcon } from '@/components/CatIcon';
import { CatProfileForm } from '@/components/CatProfileForm';
import { CatProfile } from '@/types/cat';
import { Eye, EyeOff, ArrowLeft, Plus, Check } from 'lucide-react';
import { toast } from 'sonner';

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

const emptycat = (): Partial<CatProfile> => ({
  id: generateId(),
  name: '',
  breed: '',
  gender: undefined,
  birthDate: '',
  isNeutered: undefined,
  allergies: [],
  furLength: undefined,
  diseases: '',
  wantsWeightLoss: undefined,
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cats, setCats] = useState<Partial<CatProfile>[]>([emptycat()]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCat = () => {
    if (cats.length >= 8) {
      toast.error('สามารถเพิ่มได้สูงสุด 8 ตัวเท่านั้น');
      return;
    }
    setCats([...cats, emptycat()]);
  };

  const handleRemoveCat = (index: number) => {
    if (cats.length === 1) {
      toast.error('ต้องมีน้องแมวอย่างน้อย 1 ตัว');
      return;
    }
    setCats(cats.filter((_, i) => i !== index));
  };

  const handleCatChange = (index: number, updatedCat: Partial<CatProfile>) => {
    setCats(cats.map((c, i) => (i === index ? updatedCat : c)));
  };

  const validateForm = (): boolean => {
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

    for (let i = 0; i < cats.length; i++) {
      const cat = cats[i];
      if (!cat.name) {
        toast.error(`กรุณากรอกชื่อน้องแมวตัวที่ ${i + 1}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    const validCats = cats.map((cat) => ({
      id: cat.id || generateId(),
      name: cat.name || '',
      breed: cat.breed || 'ไม่ระบุ',
      gender: cat.gender || 'male',
      birthDate: cat.birthDate || '',
      isNeutered: cat.isNeutered || false,
      allergies: cat.allergies || [],
      furLength: cat.furLength || 'short',
      diseases: cat.diseases || '',
      wantsWeightLoss: cat.wantsWeightLoss || false,
    })) as CatProfile[];

    const success = register(username, password, validCats);
    setIsLoading(false);

    if (success) {
      toast.success('สมัครสมาชิกสำเร็จ!');
      navigate('/app');
    } else {
      toast.error('ชื่อผู้ใช้นี้ถูกใช้แล้ว');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center gap-4 p-4 max-w-lg mx-auto">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">สมัครสมาชิก</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Account Info */}
          <div className="cat-card space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                <CatIcon className="text-white" size={28} />
              </div>
              <div>
                <h2 className="font-bold text-lg">ข้อมูลบัญชี</h2>
                <p className="text-sm text-muted-foreground">สร้างบัญชีใหม่ของคุณ</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ตั้งชื่อผู้ใช้"
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
              <label className="text-sm font-medium text-muted-foreground mb-1 block">
                ยืนยันรหัสผ่าน
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                className="cat-input"
              />
            </div>
          </div>

          {/* Cat Profiles */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">ข้อมูลน้องแมว 🐱</h2>
              <span className="text-sm text-muted-foreground">{cats.length}/8 ตัว</span>
            </div>

            <div className="space-y-4">
              {cats.map((cat, index) => (
                <CatProfileForm
                  key={cat.id}
                  cat={cat}
                  index={index}
                  onChange={(updated) => handleCatChange(index, updated)}
                  onRemove={() => handleRemoveCat(index)}
                  showRemove={cats.length > 1}
                />
              ))}
            </div>

            {cats.length < 8 && (
              <button
                type="button"
                onClick={handleAddCat}
                className="w-full mt-4 cat-button-secondary flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                เพิ่มน้องแมว
              </button>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cat-button-primary flex items-center justify-center gap-2 py-4"
          >
            <Check size={20} />
            {isLoading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
          </button>
        </form>
      </div>
    </div>
  );
}
