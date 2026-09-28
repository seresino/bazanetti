import React from 'react';

// BAZANETTI Custom B Monogram
export function BazanettiBMonogram({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
      {/* Left brutalist pillar with bottom curve and diagonal facet notch */}
      <path d="M 12 12 H 46 V 48 L 30 64 L 46 78 V 90 H 34 C 18 90 12 76 12 60 Z" />
      {/* Right top lobe with angled bottom facet */}
      <path d="M 54 12 H 76 C 88 12 95 20 95 29 C 95 38 88 44 76 44 L 54 35 Z" />
      {/* Right bottom lobe with angled top facet */}
      <path d="M 54 48 L 76 57 C 88 61 95 69 95 78 C 95 86 88 90 76 90 H 54 Z" />
    </svg>
  );
}

// Glyph 1: Logo / Home Monogram Icon
export function MonogramGlyph({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="currentColor" className={className}>
      <path d="M6 4 H24 C32 4 37 9 37 15 C37 19 34 21 29 22 C35 24 38 28 38 34 C38 40 32 42 24 42 H6 V4 Z M16 12 V18 H23 C26 18 28 17 28 15 C28 13 26 12 23 12 H16 Z M16 26 V33 H24 C27 33 29 31 29 29 C29 27 27 26 24 26 H16 Z" />
    </svg>
  );
}

// Glyph 2: Inverted Triangle with Ring (Shop)
export function ShopGlyph({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" fill="currentColor" className={className}>
      {/* Downward triangle base */}
      <polygon points="5,22 55,22 30,48" />
      {/* Ring / gem contour looping through */}
      <path d="M22 6 C22 2 38 2 38 6 V22 H22 V6 Z" />
      <path
        d="M26 8 H34 V18 H26 Z"
        fill="white"
      />
      {/* Central cutout on triangle */}
      <ellipse cx="30" cy="24" rx="8" ry="5" fill="white" />
    </svg>
  );
}

// Glyph 3: Diamond with 'i' (Info / Order Form)
export function InfoGlyph({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" className={className}>
      {/* Rotated 45-degree diamond */}
      <rect x="7" y="7" width="36" height="36" rx="4" transform="rotate(45 25 25)" fill="currentColor" />
      {/* Inverted white 'i' */}
      <circle cx="25" cy="18" r="3.2" fill="white" />
      <rect x="22" y="24" width="6" height="13" rx="1.5" fill="white" />
    </svg>
  );
}

// Glyph 4: Angular Monolithic 'W' (Works / Portfolio)
export function WorksGlyph({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" fill="currentColor" className={className}>
      {/* Heavy faceted monolithic W block with beveled corner */}
      <path d="M4 6 H40 L48 14 V44 H4 Z" />
      {/* Inner carved negative space to form the 'W' */}
      <polygon points="12,14 18,34 22,20 28,20 32,34 38,14 44,14 36,40 26,40 25,32 24,40 14,40 6,14" fill="white" />
    </svg>
  );
}

// Glyph 5: Vault / Safe Lockbox (Vault)
export function VaultGlyph({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" fill="currentColor" className={className}>
      {/* Top arched shackle / handle */}
      <path d="M18 18 C18 10 32 10 32 18 V22 H37 C39 22 41 24 41 26 V44 H9 V26 C9 24 11 22 13 22 H18 V18 Z M23 18 C23 14 27 14 27 18 V22 H23 V18 Z" />
      {/* Horizontal cut slats on safe body */}
      <rect x="13" y="28" width="24" height="4" fill="white" />
      <rect x="13" y="36" width="24" height="4" fill="white" />
    </svg>
  );
}

// Interlocking Engraved Rings Graphic ("EST. BAZANETTI IN LONDON")
export function InterlockingRingsGraphic({ className = "w-28 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* First Ring */}
      <ellipse cx="65" cy="50" rx="42" ry="28" stroke="black" strokeWidth="6" strokeDasharray="3 1" />
      <ellipse cx="65" cy="50" rx="32" ry="20" stroke="black" strokeWidth="3" />
      {/* Second Interlocking Ring */}
      <ellipse cx="105" cy="56" rx="40" ry="26" stroke="black" strokeWidth="6" />
      <ellipse cx="105" cy="56" rx="30" ry="18" stroke="black" strokeWidth="3" strokeDasharray="4 2" />
      {/* Ribbon Banner */}
      <path d="M25 45 Q 65 30 115 42 L 118 55 Q 65 42 28 58 Z" fill="white" stroke="black" strokeWidth="2.5" />
      <text x="36" y="52" fill="black" fontSize="9" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">
        EST. BAZANETTI
      </text>
      <text x="80" y="78" fill="black" fontSize="8" fontWeight="800" fontFamily="sans-serif" letterSpacing="0.5">
        LONDON
      </text>
    </svg>
  );
}
