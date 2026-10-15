import React from "react";
import { ActiveTab } from "../types";
import { useBrand } from "../context/BrandContext";

interface HomeViewProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export function HomeView({ onSelectTab }: HomeViewProps) {
  const { brand } = useBrand();

  const glyphs = [
    {
      tab: "shop",
      label: "SHOP",
      src: brand.icons.shop,
      size: "w-24 h-20 sm:w-28 sm:h-24 md:w-36 md:h-30",
    },
    {
      tab: "info",
      label: "INFO",
      src: brand.icons.info,
      size: "w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30",
    },
    {
      tab: "works",
      label: "WORKS",
      src: brand.icons.works,
      size: "w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30",
    },
    {
      tab: "vault",
      label: "VAULT",
      src: brand.icons.vault,
      size: "w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30",
    },
  ] as const;

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-6 py-12 md:py-20 select-none">
      {/* Main Totem Emblems Grid directly matching Desktop - Home - Icons.png */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center animate-fade-in">
        {glyphs.map(({ tab, label, src, size }) => (
          <button
            key={tab}
            id={`home-glyph-${tab}`}
            onClick={() => onSelectTab(tab)}
            className="group relative flex items-center justify-center cursor-pointer transition-transform duration-200"
            aria-label={label}
          >
            <div className="relative flex items-center justify-center">
              <img
                src={src ?? undefined}
                alt={label}
                className={`${size} object-contain group-hover:opacity-30 transition-opacity duration-300 ease-out`}
              />
              <span className="absolute inset-0 flex items-center justify-center font-haas font-bold text-xs sm:text-sm md:text-base text-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none z-10">
                {label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
