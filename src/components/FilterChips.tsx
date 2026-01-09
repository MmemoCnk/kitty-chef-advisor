import React from 'react';
import { Leaf, Heart, Stethoscope } from 'lucide-react';

interface FilterChipsProps {
  filters: {
    grainFree: boolean;
    holistic: boolean;
    medical: boolean;
  };
  onFilterChange: (key: 'grainFree' | 'holistic' | 'medical') => void;
}

export function FilterChips({ filters, onFilterChange }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onFilterChange('grainFree')}
        className={filters.grainFree ? 'filter-chip-active' : 'filter-chip'}
      >
        <Leaf size={14} className="inline mr-1" />
        Grain-Free
      </button>
      <button
        onClick={() => onFilterChange('holistic')}
        className={filters.holistic ? 'filter-chip-active' : 'filter-chip'}
      >
        <Heart size={14} className="inline mr-1" />
        Holistic
      </button>
      <button
        onClick={() => onFilterChange('medical')}
        className={filters.medical ? 'filter-chip-active' : 'filter-chip'}
      >
        <Stethoscope size={14} className="inline mr-1" />
        ทางการแพทย์
      </button>
    </div>
  );
}
