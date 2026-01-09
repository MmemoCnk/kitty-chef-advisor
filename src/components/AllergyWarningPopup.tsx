import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface AllergyWarningPopupProps {
  allergens: string[];
  catName: string;
  onClose: () => void;
}

export function AllergyWarningPopup({ allergens, catName, onClose }: AllergyWarningPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-card rounded-3xl p-6 max-w-sm w-full animate-scale-in shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center">
            <AlertTriangle size={28} className="text-destructive" />
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors">
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>
        <h3 className="text-xl font-bold text-destructive mb-2">
          ⚠️ เตือน! มีสารก่อภูมิแพ้
        </h3>
        <p className="text-muted-foreground mb-4">
          อาหารนี้มีส่วนประกอบที่ <span className="font-semibold text-foreground">{catName}</span> แพ้:
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {allergens.map((allergen) => (
            <span key={allergen} className="allergy-tag">
              {allergen}
            </span>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full cat-button-primary"
        >
          รับทราบ
        </button>
      </div>
    </div>
  );
}
