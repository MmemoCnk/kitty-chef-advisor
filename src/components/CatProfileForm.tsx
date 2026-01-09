import React from 'react';
import { CatProfile, ALLERGY_LABELS, AllergyOption, BREED_OPTIONS } from '@/types/cat';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';

interface CatProfileFormProps {
  cat: Partial<CatProfile>;
  onChange: (cat: Partial<CatProfile>) => void;
  onRemove?: () => void;
  index: number;
  showRemove?: boolean;
}

export function CatProfileForm({ cat, onChange, onRemove, index, showRemove = true }: CatProfileFormProps) {
  const allergyOptions: AllergyOption[] = ['chicken', 'fish', 'beef', 'pork', 'dairy', 'eggs', 'wheat', 'corn', 'soy'];

  const handleAllergyToggle = (allergy: string) => {
    const current = cat.allergies || [];
    if (current.includes(allergy)) {
      onChange({ ...cat, allergies: current.filter((a) => a !== allergy) });
    } else {
      onChange({ ...cat, allergies: [...current, allergy] });
    }
  };

  return (
    <div className="cat-profile-card space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <span className="text-2xl">🐱</span>
          น้องแมวตัวที่ {index + 1}
        </h3>
        {showRemove && onRemove && (
          <button
            onClick={onRemove}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Name */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1 block">ชื่อน้องแมว</label>
        <input
          type="text"
          value={cat.name || ''}
          onChange={(e) => onChange({ ...cat, name: e.target.value })}
          placeholder="ชื่อน้องแมว"
          className="cat-input"
        />
      </div>

      {/* Breed */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1 block">สายพันธุ์</label>
        <div className="relative">
          <select
            value={cat.breed || ''}
            onChange={(e) => onChange({ ...cat, breed: e.target.value })}
            className="cat-input appearance-none cursor-pointer"
          >
            <option value="">เลือกสายพันธุ์</option>
            {BREED_OPTIONS.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Gender & Birth Date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">เพศ</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...cat, gender: 'male' })}
              className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
                cat.gender === 'male'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              ♂ เพศผู้
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...cat, gender: 'female' })}
              className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
                cat.gender === 'female'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              ♀ เพศเมีย
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">วันเกิด</label>
          <input
            type="date"
            value={cat.birthDate || ''}
            onChange={(e) => onChange({ ...cat, birthDate: e.target.value })}
            className="cat-input"
          />
        </div>
      </div>

      {/* Neutered & Fur Length */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">ทำหมัน</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...cat, isNeutered: true })}
              className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
                cat.isNeutered === true
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              ทำแล้ว
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...cat, isNeutered: false })}
              className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
                cat.isNeutered === false
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              ยังไม่ทำ
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-1 block">ความยาวขน</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onChange({ ...cat, furLength: 'short' })}
              className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
                cat.furLength === 'short'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              สั้น
            </button>
            <button
              type="button"
              onClick={() => onChange({ ...cat, furLength: 'long' })}
              className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
                cat.furLength === 'long'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              ยาว
            </button>
          </div>
        </div>
      </div>

      {/* Allergies */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">ข้อมูลการแพ้</label>
        <div className="flex flex-wrap gap-2">
          {allergyOptions.map((allergy) => (
            <button
              key={allergy}
              type="button"
              onClick={() => handleAllergyToggle(allergy)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                cat.allergies?.includes(allergy)
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {ALLERGY_LABELS[allergy]}
            </button>
          ))}
        </div>
      </div>

      {/* Diseases */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1 block">โรคประจำตัว</label>
        <input
          type="text"
          value={cat.diseases || ''}
          onChange={(e) => onChange({ ...cat, diseases: e.target.value })}
          placeholder="กรอกโรคประจำตัว (ถ้ามี)"
          className="cat-input"
        />
      </div>

      {/* Weight Loss */}
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-1 block">ต้องการลดน้ำหนัก?</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...cat, wantsWeightLoss: true })}
            className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
              cat.wantsWeightLoss === true
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            ต้องการ
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...cat, wantsWeightLoss: false })}
            className={`flex-1 py-2 rounded-xl font-medium transition-colors ${
              cat.wantsWeightLoss === false
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            ไม่ต้องการ
          </button>
        </div>
      </div>
    </div>
  );
}
