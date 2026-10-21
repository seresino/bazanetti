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
      label: "shop",
      src: brand.icons.shop,
    },
    {
      tab: "info",
      label: "info",
      src: brand.icons.info,
    },
    {
      tab: "works",
      label: "works",
      src: brand.icons.works,
    },
    {
      tab: "vault",
      label: "vault",
      src: brand.icons.vault,
    },
  ] as const;

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-6 py-12 md:py-20 select-none">
      {/* Main Totem Emblems Grid directly matching Desktop - Home - Icons.png */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center animate-fade-in">
        {glyphs.map(({ tab, label, src }) => (
          <button
            key={tab}
            id={`home-glyph-${tab}`}
            onClick={() => onSelectTab(tab)}
            className="group relative flex items-center justify-center cursor-pointer transition-transform duration-200"
            aria-label={label}
          >
            <div className="flex items-center justify-center w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64">
              <span className="relative inline-block">
                <img
                  src={src ?? undefined}
                  alt={label}
                  className="block w-auto h-auto max-w-full max-h-full"
                />
                <span className="absolute left-1/2 bottom-[-30%] md:bottom-[-40%] -translate-x-1/2 mix-blend-difference text-white text-3xl sm:text-4xl md:text-5xl font-bold lowercase tracking-tight pointer-events-none select-none group-hover:opacity-0 transition-opacity duration-200">
                  {label}
                </span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
