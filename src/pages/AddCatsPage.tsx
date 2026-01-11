import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { CatProfileForm } from '@/components/CatProfileForm';
import { CatProfile } from '@/types/cat';
import { ArrowLeft, Check, Plus } from 'lucide-react';
import { toast } from 'sonner';

function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

const emptyCat = (): Partial<CatProfile> => ({
  id: generateId(),
  name: '',
  breed: '',
  gender: undefined,
  birthDate: '',
  isNeutered: undefined,
  allergies: [],
  allergiesOther: '',
  dislikes: [],
  dislikesOther: '',
  furLength: undefined,
  diseases: '',
  wantsWeightLoss: undefined,
});

export default function AddCatsPage() {
  const navigate = useNavigate();
  const { catId } = useParams();
  const { user, isLoggedIn, addCat, updateCat } = useAuth();
  const [cats, setCats] = useState<Partial<CatProfile>[]>([emptyCat()]);
  const [isLoading, setIsLoading] = useState(false);
  const isEditing = !!catId;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
      return;
    }

    // If editing, load cat data
    if (catId && user) {
      const existingCat = user.cats.find((c) => c.id === catId);
      if (existingCat) {
        setCats([existingCat]);
      } else {
        toast.error('ไม่พบข้อมูลน้องแมว');
        navigate('/app');
      }
    }
  }, [isLoggedIn, catId, user, navigate]);

  const handleAddCat = () => {
    if (cats.length >= 8) {
      toast.error('สามารถเพิ่มได้สูงสุด 8 ตัวเท่านั้น');
      return;
    }
    setCats([...cats, emptyCat()]);
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
    await new Promise((r) => setTimeout(r, 500));

    cats.forEach((cat) => {
      const validCat: CatProfile = {
        id: cat.id || generateId(),
        name: cat.name || '',
        breed: cat.breed || 'ไม่ระบุ',
        gender: cat.gender || 'male',
        birthDate: cat.birthDate || '',
        isNeutered: cat.isNeutered || false,
        allergies: cat.allergies || [],
        allergiesOther: cat.allergiesOther || '',
        dislikes: cat.dislikes || [],
        dislikesOther: cat.dislikesOther || '',
        furLength: cat.furLength || 'short',
        diseases: cat.diseases || '',
        wantsWeightLoss: cat.wantsWeightLoss || false,
      };

      if (isEditing) {
        updateCat(validCat);
      } else {
        addCat(validCat);
      }
    });

    setIsLoading(false);
    toast.success(isEditing ? 'แก้ไขข้อมูลเรียบร้อย!' : 'เพิ่มน้องแมวเรียบร้อย!');
    navigate('/app');
  };

  const handleSkip = () => {
    navigate('/app');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border z-10">
        <div className="flex items-center gap-4 p-4 max-w-lg mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">
            {isEditing ? 'แก้ไขข้อมูลน้องแมว' : 'เพิ่มน้องแมว'}
          </h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto p-4 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cat Info */}
          <div className="text-center mb-6">
            <span className="text-6xl">🐱</span>
            <p className="text-muted-foreground mt-2">
              {isEditing
                ? 'แก้ไขข้อมูลน้องแมวของคุณ'
                : 'เพิ่มข้อมูลน้องแมวเพื่อรับคำแนะนำอาหารที่เหมาะสม'}
            </p>
          </div>

          {/* Cat Profiles */}
          <div>
            {!isEditing && (
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">ข้อมูลน้องแมว</h2>
                <span className="text-sm text-muted-foreground">{cats.length}/8 ตัว</span>
              </div>
            )}

            <div className="space-y-4">
              {cats.map((cat, index) => (
                <CatProfileForm
                  key={cat.id}
                  cat={cat}
                  index={index}
                  onChange={(updated) => handleCatChange(index, updated)}
                  onRemove={() => handleRemoveCat(index)}
                  showRemove={!isEditing && cats.length > 1}
                  showHeader={!isEditing}
                />
              ))}
            </div>

            {!isEditing && cats.length < 8 && (
              <button
                type="button"
                onClick={handleAddCat}
                className="w-full mt-4 cat-button-secondary flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                เพิ่มน้องแมวอีกตัว
              </button>
            )}
          </div>

          {/* Submit */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cat-button-primary flex items-center justify-center gap-2 py-4"
            >
              <Check size={20} />
              {isLoading ? 'กำลังบันทึก...' : isEditing ? 'บันทึกการแก้ไข' : 'บันทึกและเริ่มใช้งาน'}
            </button>

            {!isEditing && (
              <button
                type="button"
                onClick={handleSkip}
                className="w-full cat-button-ghost"
              >
                ข้ามไปก่อน เพิ่มทีหลัง
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
