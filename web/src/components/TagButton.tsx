import React from "react";

interface TagButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  id?: string;
}

// Pointed-tag silhouette — chevron depth is a fixed 24px on every button
const TAG_CLIP =
  "polygon(24px 0, calc(100% - 24px) 0, 100% 50%, calc(100% - 24px) 100%, 24px 100%, 0 50%)";

// Inner shape: the outer polygon offset inward 2px *perpendicular* to each
// edge, so the outline is a uniform 2px on the diagonals too — for the 45°
// chevrons that means ~2.83px horizontal / 2px vertical
const TAG_CLIP_INNER =
  "polygon(24.83px 2px, calc(100% - 24.83px) 2px, calc(100% - 2.83px) 50%, calc(100% - 24.83px) calc(100% - 2px), 24.83px calc(100% - 2px), 2.83px 50%)";

export function TagButton({
  label,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  id,
}: TagButtonProps) {
  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex h-12 items-center justify-center px-14 cursor-pointer transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {/* Outline layer: full tag shape in the stroke colour (stays black
          on hover so the border survives inversion) */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        style={{ clipPath: TAG_CLIP }}
      />
      {/* Interior: perpendicularly-inset shape — uniform 2px outline */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-white transition-colors duration-200 group-hover:bg-black"
        style={{ clipPath: TAG_CLIP_INNER }}
      />
      <span className="relative z-10 text-2xl uppercase leading-none translate-y-[2px] text-black transition-colors duration-200 group-hover:text-white">
        {label}
      </span>
    </button>
  );
}
