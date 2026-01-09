import React from 'react';
import { FoodProduct } from '@/types/cat';
import { getSimilarProducts } from '@/data/mockFoods';
import { ThumbsUp, ThumbsDown, ChevronRight } from 'lucide-react';

interface SimilarProductsCardProps {
  productId: string;
  filters: { grainFree: boolean; holistic: boolean; medical: boolean };
  onProductClick: (product: FoodProduct) => void;
}

export function SimilarProductsCard({ productId, filters, onProductClick }: SimilarProductsCardProps) {
  let similarProducts = getSimilarProducts(productId);

  // Apply filters
  if (filters.grainFree) {
    similarProducts = similarProducts.filter((p) => p.isGrainFree);
  }
  if (filters.holistic) {
    similarProducts = similarProducts.filter((p) => p.isHolistic);
  }
  if (filters.medical) {
    similarProducts = similarProducts.filter((p) => p.isMedical);
  }

  if (similarProducts.length === 0) {
    return (
      <div className="cat-card">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span>📚</span> ยี่ห้อที่คล้ายกัน
        </h3>
        <p className="text-muted-foreground text-sm">ไม่พบสินค้าที่ตรงกับตัวกรอง</p>
      </div>
    );
  }

  return (
    <div className="cat-card">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>📚</span> ยี่ห้อที่คล้ายกัน
      </h3>
      <div className="space-y-3">
        {similarProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => onProductClick(product)}
            className="w-full p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
              🍽️
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{product.brand}</p>
              <p className="text-sm text-muted-foreground truncate">{product.formula}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs flex items-center gap-1 text-accent">
                  <ThumbsUp size={12} /> {product.positivePercent}%
                </span>
                <span className="text-xs flex items-center gap-1 text-destructive">
                  <ThumbsDown size={12} /> {product.negativePercent}%
                </span>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
