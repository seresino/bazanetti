import React from "react";

// Interlocking Engraved Rings Graphic ("EST. BAZANETTI IN LONDON")
export function InterlockingRingsGraphic({
  className = "w-28 h-20",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* First Ring */}
      <ellipse
        cx="65"
        cy="50"
        rx="42"
        ry="28"
        stroke="black"
        strokeWidth="6"
        strokeDasharray="3 1"
      />
      <ellipse cx="65" cy="50" rx="32" ry="20" stroke="black" strokeWidth="3" />
      {/* Second Interlocking Ring */}
      <ellipse
        cx="105"
        cy="56"
        rx="40"
        ry="26"
        stroke="black"
        strokeWidth="6"
      />
      <ellipse
        cx="105"
        cy="56"
        rx="30"
        ry="18"
        stroke="black"
        strokeWidth="3"
        strokeDasharray="4 2"
      />
      {/* Ribbon Banner */}
      <path
        d="M25 45 Q 65 30 115 42 L 118 55 Q 65 42 28 58 Z"
        fill="white"
        stroke="black"
        strokeWidth="2.5"
      />
      <text
        x="36"
        y="52"
        fill="black"
        fontSize="9"
        fontWeight="900"
        fontFamily="sans-serif"
        letterSpacing="1"
      >
        EST. BAZANETTI
      </text>
      <text
        x="80"
        y="78"
        fill="black"
        fontSize="8"
        fontWeight="800"
        fontFamily="sans-serif"
        letterSpacing="0.5"
      >
        LONDON
      </text>
    </svg>
  );
}
