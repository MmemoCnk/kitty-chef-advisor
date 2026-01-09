import React from 'react';
import { FoodProduct } from '@/types/cat';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface TrustScoreCardProps {
  trustScore: number;
  positivePercent: number;
  negativePercent: number;
  reviews: FoodProduct['reviews'];
}

export function TrustScoreCard({
  trustScore,
  positivePercent,
  negativePercent,
  reviews,
}: TrustScoreCardProps) {
  const positiveReviews = reviews.filter((r) => r.isPositive);
  const negativeReviews = reviews.filter((r) => !r.isPositive);

  return (
    <div className="cat-card">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <span>🏆</span> Trust Score & ความคิดเห็น
      </h3>

      {/* Trust Score */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-secondary"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-primary"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${trustScore}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
            {trustScore}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <ThumbsUp size={16} className="text-accent" />
            <span className="text-sm font-medium">Positive: {positivePercent}%</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsDown size={16} className="text-destructive" />
            <span className="text-sm font-medium">Negative: {negativePercent}%</span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-3">
        {positiveReviews.slice(0, 2).map((review) => (
          <div key={review.id} className="p-3 rounded-xl bg-accent/10 border border-accent/20">
            <p className="text-sm">"{review.text}"</p>
            <p className="text-xs text-muted-foreground mt-1">- {review.author}</p>
          </div>
        ))}
        {negativeReviews.slice(0, 1).map((review) => (
          <div key={review.id} className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
            <p className="text-sm">"{review.text}"</p>
            <p className="text-xs text-muted-foreground mt-1">- {review.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
