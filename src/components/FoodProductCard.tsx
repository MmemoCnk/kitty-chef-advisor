import React from 'react';
import { FoodProduct, CatProfile } from '@/types/cat';
import { ThumbsUp, ThumbsDown, ChevronRight, Leaf, Heart, Stethoscope, AlertTriangle, Plus, Check } from 'lucide-react';

interface FoodProductCardProps {
  product: FoodProduct;
  onClick: () => void;
  selectedCats?: CatProfile[];
  isInCompare?: boolean;
  onToggleCompare?: () => void;
}

export function FoodProductCard({ 
  product, 
  onClick, 
  selectedCats = [],
  isInCompare = false,
  onToggleCompare
}: FoodProductCardProps) {
  // Check for dislikes in selected cats
  const dislikeWarnings: { catName: string; ingredient: string }[] = [];
  
  selectedCats.forEach((cat) => {
    const allDislikes = [...(cat.dislikes || [])];
    if (cat.dislikesOther) {
      allDislikes.push(...cat.dislikesOther.split(',').map((d) => d.trim().toLowerCase()));
    }

    allDislikes.forEach((dislike) => {
      const found = product.ingredients.some((ing) =>
        ing.toLowerCase().includes(dislike.toLowerCase())
      );
      if (found) {
        dislikeWarnings.push({ catName: cat.name, ingredient: dislike });
      }
    });
  });

  // Check which cats this food is good for
  const suitableFor: string[] = [];
  selectedCats.forEach((cat) => {
    const hasAllergy = [...(cat.allergies || []), ...(cat.allergiesOther?.split(',').map((a) => a.trim()) || [])]
      .some((allergy) => product.ingredients.some((ing) => ing.toLowerCase().includes(allergy.toLowerCase())));
    
    if (!hasAllergy) {
      const hasDislike = dislikeWarnings.some((w) => w.catName === cat.name);
      if (!hasDislike) {
        suitableFor.push(cat.name);
      }
    }
  });

  return (
    <div className="cat-card animate-slide-up">
      <div className="flex items-start gap-4">
        <button
          onClick={onClick}
          className="flex-1 flex items-center gap-4 text-left"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0">
            🍽️
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold truncate">{product.formula}</h3>
              <span className="text-sm text-muted-foreground">- {product.brand}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap mt-1">
              {product.isGrainFree && (
                <span className="cat-badge-success text-xs">
                  <Leaf size={10} /> GF
                </span>
              )}
              {product.isHolistic && (
                <span className="cat-badge-info text-xs">
                  <Heart size={10} /> H
                </span>
              )}
              {product.isMedical && (
                <span className="cat-badge-warning text-xs">
                  <Stethoscope size={10} /> M
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm flex items-center gap-1 text-accent">
                <ThumbsUp size={14} /> {product.positivePercent}%
              </span>
              <span className="text-sm flex items-center gap-1 text-destructive">
                <ThumbsDown size={14} /> {product.negativePercent}%
              </span>
              <span className="text-xs cat-badge-info">Score: {product.trustScore}</span>
            </div>
          </div>
        </button>

        <div className="flex flex-col items-center gap-2">
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare();
              }}
              className={`p-2 rounded-full transition-colors ${
                isInCompare
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {isInCompare ? <Check size={18} /> : <Plus size={18} />}
            </button>
          )}
          <button onClick={onClick} className="p-2">
            <ChevronRight size={24} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Dislike Warnings */}
      {dislikeWarnings.length > 0 && (
        <div className="mt-3 p-3 rounded-xl bg-warning/10 border border-warning/20">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              {dislikeWarnings.map((warning, idx) => (
                <p key={idx}>
                  มี<span className="font-medium">{warning.ingredient}</span> - {warning.catName} ไม่ชอบ
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Suitable for */}
      {suitableFor.length > 0 && selectedCats.length > 1 && (
        <div className="mt-3 p-3 rounded-xl bg-accent/10 border border-accent/20">
          <p className="text-sm text-accent">
            ✅ เหมาะกับน้อง {suitableFor.join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
