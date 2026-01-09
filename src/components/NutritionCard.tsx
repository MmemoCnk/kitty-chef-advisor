import React from 'react';
import { FoodProduct } from '@/types/cat';

interface NutritionCardProps {
  nutrition: FoodProduct['nutrition'];
}

export function NutritionCard({ nutrition }: NutritionCardProps) {
  return (
    <div className="cat-card">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>📊</span> โภชนาการ
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="nutrition-stat">
          <span className="text-2xl font-bold text-primary">{nutrition.protein}%</span>
          <span className="text-sm text-muted-foreground">Protein</span>
        </div>
        <div className="nutrition-stat">
          <span className="text-2xl font-bold text-primary">{nutrition.fat}%</span>
          <span className="text-sm text-muted-foreground">Fat</span>
        </div>
        <div className="nutrition-stat">
          <span className="text-2xl font-bold text-primary">{nutrition.fiber}%</span>
          <span className="text-sm text-muted-foreground">Fiber</span>
        </div>
        <div className="nutrition-stat">
          <span className="text-2xl font-bold text-primary">{nutrition.calories}</span>
          <span className="text-sm text-muted-foreground">kcal/100g</span>
        </div>
      </div>
    </div>
  );
}
