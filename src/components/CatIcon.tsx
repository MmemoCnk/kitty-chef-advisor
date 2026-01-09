import React from 'react';

interface CatIconProps {
  className?: string;
  size?: number;
}

export function CatIcon({ className = '', size = 48 }: CatIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      {/* Cat ears */}
      <path
        d="M20 35 L30 10 L45 30 Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M80 35 L70 10 L55 30 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Inner ears */}
      <path
        d="M25 30 L32 15 L40 28 Z"
        fill="currentColor"
        opacity="0.5"
      />
      <path
        d="M75 30 L68 15 L60 28 Z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Face */}
      <ellipse
        cx="50"
        cy="55"
        rx="35"
        ry="32"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Eyes */}
      <ellipse cx="38" cy="50" rx="6" ry="8" fill="white" />
      <ellipse cx="62" cy="50" rx="6" ry="8" fill="white" />
      <ellipse cx="39" cy="51" rx="3" ry="4" fill="black" />
      <ellipse cx="63" cy="51" rx="3" ry="4" fill="black" />
      {/* Eye shine */}
      <circle cx="40" cy="49" r="1.5" fill="white" />
      <circle cx="64" cy="49" r="1.5" fill="white" />
      {/* Nose */}
      <ellipse cx="50" cy="62" rx="4" ry="3" fill="hsl(350, 60%, 65%)" />
      {/* Mouth */}
      <path
        d="M50 65 Q45 72 42 70"
        stroke="hsl(25, 30%, 40%)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M50 65 Q55 72 58 70"
        stroke="hsl(25, 30%, 40%)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Whiskers */}
      <line x1="25" y1="58" x2="10" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="25" y1="62" x2="8" y2="62" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="25" y1="66" x2="10" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="75" y1="58" x2="90" y2="55" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="75" y1="62" x2="92" y2="62" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="75" y1="66" x2="90" y2="69" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
