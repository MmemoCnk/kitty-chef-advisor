import React from 'react';
import { CatProfile } from '@/types/cat';
import { Plus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CatAvatarSelectorProps {
  cats: CatProfile[];
  selectedCatIds: string[];
  onToggleCat: (catId: string) => void;
  onAddCat?: () => void;
}

// Generate a color from cat name using full name hash
function getCatColor(name: string): string {
  const colors = [
    'from-orange-400 to-amber-500',
    'from-pink-400 to-rose-500',
    'from-violet-400 to-purple-500',
    'from-blue-400 to-cyan-500',
    'from-emerald-400 to-teal-500',
    'from-yellow-400 to-orange-500',
    'from-red-400 to-pink-500',
    'from-indigo-400 to-blue-500',
  ];
  // Use full name for hash to differentiate cats with same first letter
  const hash = name.split('').reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);
  return colors[hash % colors.length];
}

export function CatAvatarSelector({ cats, selectedCatIds, onToggleCat, onAddCat }: CatAvatarSelectorProps) {
  const navigate = useNavigate();

  const handleAddCat = () => {
    if (onAddCat) {
      onAddCat();
    } else {
      navigate('/cats/add');
    }
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-6 scrollbar-hide">
      {cats.map((cat) => {
        const isSelected = selectedCatIds.includes(cat.id);
        const colorGradient = getCatColor(cat.name);
        
        return (
          <button
            key={cat.id}
            onClick={() => onToggleCat(cat.id)}
            className={`relative flex-shrink-0 transition-all duration-200 ${
              isSelected ? 'scale-110' : 'opacity-70 hover:opacity-100'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${colorGradient} flex items-center justify-center text-white font-bold text-lg shadow-md ${
                isSelected ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
              }`}
            >
              {cat.name.charAt(0).toUpperCase()}
            </div>
            {isSelected && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Check size={12} className="text-primary-foreground" />
              </div>
            )}
            {/* Show full name below avatar */}
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap max-w-[80px] truncate">
              {cat.name}
            </span>
          </button>
        );
      })}

      {/* Always show Add Cat Button if less than 8 cats */}
      {cats.length < 8 && (
        <button
          onClick={handleAddCat}
          className="relative flex-shrink-0 w-12 h-12 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Plus size={24} />
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
            เพิ่ม
          </span>
        </button>
      )}
    </div>
  );
}
