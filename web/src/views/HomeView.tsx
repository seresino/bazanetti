import React from 'react';
import { ActiveTab } from '../types';
import { useBrand } from '../context/BrandContext';

interface HomeViewProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export function HomeView({ onSelectTab }: HomeViewProps) {
  const { brand } = useBrand();

  return (
    <div className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 py-12 md:py-20 select-none">
      
      {/* Main Totem Emblems Grid directly matching Desktop - Home - Icons.png */}
      <div className="w-full max-w-5xl py-8 md:py-16 flex flex-col items-center justify-center animate-fade-in my-auto">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-14 md:gap-20 items-center justify-items-center w-full">
          
          {/* 1. Shop Icon */}
          <button
            id="home-glyph-shop"
            onClick={() => onSelectTab('shop')}
            className="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 p-3"
            aria-label="Shop"
          >
            <div className="relative flex items-center justify-center">
              {brand.icons.shop ? (
                <img
                  src={brand.icons.shop}
                  alt="Shop"
                  className="w-24 h-20 sm:w-28 sm:h-24 md:w-36 md:h-30 object-contain group-hover:opacity-70 transition-opacity"
                />
              ) : (
                <div className="w-24 h-20 sm:w-28 sm:h-24 md:w-36 md:h-30 border border-dashed border-red-500/50 flex items-center justify-center p-2 text-center text-red-600 font-mono text-[10px]">
                  [SHOP ICON MISSING IN SANITY]
                </div>
              )}
              <span className="absolute inset-0 flex items-center justify-center font-black text-xs sm:text-sm md:text-base tracking-wider text-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none z-10">
                SHOP
              </span>
            </div>
          </button>

          {/* 2. Info Icon */}
          <button
            id="home-glyph-info"
            onClick={() => onSelectTab('info')}
            className="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 p-3"
            aria-label="Info"
          >
            <div className="relative flex items-center justify-center">
              {brand.icons.info ? (
                <img
                  src={brand.icons.info}
                  alt="Info"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain group-hover:opacity-70 transition-opacity"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 border border-dashed border-red-500/50 flex items-center justify-center p-2 text-center text-red-600 font-mono text-[10px]">
                  [INFO ICON MISSING IN SANITY]
                </div>
              )}
              <span className="absolute inset-0 flex items-center justify-center font-black text-xs sm:text-sm md:text-base tracking-wider text-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none z-10">
                INFO
              </span>
            </div>
          </button>

          {/* 3. Works Icon */}
          <button
            id="home-glyph-works"
            onClick={() => onSelectTab('works')}
            className="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 p-3"
            aria-label="Works"
          >
            <div className="relative flex items-center justify-center">
              {brand.icons.works ? (
                <img
                  src={brand.icons.works}
                  alt="Works"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain group-hover:opacity-70 transition-opacity"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 border border-dashed border-red-500/50 flex items-center justify-center p-2 text-center text-red-600 font-mono text-[10px]">
                  [WORKS ICON MISSING IN SANITY]
                </div>
              )}
              <span className="absolute inset-0 flex items-center justify-center font-black text-xs sm:text-sm md:text-base tracking-wider text-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none z-10">
                WORKS
              </span>
            </div>
          </button>

          {/* 4. Vault Icon */}
          <button
            id="home-glyph-vault"
            onClick={() => onSelectTab('vault')}
            className="group relative flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 p-3"
            aria-label="Vault"
          >
            <div className="relative flex items-center justify-center">
              {brand.icons.vault ? (
                <img
                  src={brand.icons.vault}
                  alt="Vault"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 object-contain group-hover:opacity-70 transition-opacity"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 border border-dashed border-red-500/50 flex items-center justify-center p-2 text-center text-red-600 font-mono text-[10px]">
                  [VAULT ICON MISSING IN SANITY]
                </div>
              )}
              <span className="absolute inset-0 flex items-center justify-center font-black text-xs sm:text-sm md:text-base tracking-wider text-black uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none select-none z-10">
                VAULT
              </span>
            </div>
          </button>

        </div>
      </div>
    </div>
  );
}
