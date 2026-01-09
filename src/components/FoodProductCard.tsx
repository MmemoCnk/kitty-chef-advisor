import React from 'react';
import { FoodProduct } from '@/types/cat';
import { ThumbsUp, ThumbsDown, ChevronRight, Leaf, Heart, Stethoscope } from 'lucide-react';

interface FoodProductCardProps {
  product: FoodProduct;
  onClick: () => void;
}

export function FoodProductCard({ product, onClick }: FoodProductCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full cat-card text-left flex items-center gap-4 animate-slide-up"
    >
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-3xl flex-shrink-0">
        🍽️
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-bold truncate">{product.brand}</h3>
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
        <p className="text-sm text-muted-foreground truncate">{product.formula}</p>
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
      <ChevronRight size={24} className="text-muted-foreground flex-shrink-0" />
    </button>
  );
}
