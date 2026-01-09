import React from 'react';
import { FoodProduct } from '@/types/cat';
import { Check, X } from 'lucide-react';

interface SupplementsCardProps {
  supplements: string[];
  hasSupplements: FoodProduct['hasSupplements'];
}

export function SupplementsCard({ supplements, hasSupplements }: SupplementsCardProps) {
  return (
    <div className="cat-card">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>💊</span> สารเสริม ({supplements.length} รายการ)
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {supplements.join(', ')}...
      </p>
      <div className="flex flex-wrap gap-2">
        <div className={`cat-badge ${hasSupplements.taurine ? 'cat-badge-success' : 'cat-badge-danger'}`}>
          {hasSupplements.taurine ? <Check size={14} /> : <X size={14} />}
          Taurine
        </div>
        <div className={`cat-badge ${hasSupplements.omega3 ? 'cat-badge-success' : 'cat-badge-danger'}`}>
          {hasSupplements.omega3 ? <Check size={14} /> : <X size={14} />}
          Omega-3
        </div>
        <div className={`cat-badge ${hasSupplements.probiotics ? 'cat-badge-success' : 'cat-badge-danger'}`}>
          {hasSupplements.probiotics ? <Check size={14} /> : <X size={14} />}
          Probiotics
        </div>
      </div>
    </div>
  );
}
