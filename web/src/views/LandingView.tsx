import React from "react";
import { useBrand } from "../context/BrandContext";

interface LandingViewProps {
  onEnter: () => void;
}

export function LandingView({ onEnter }: LandingViewProps) {
  const { brand, loading } = useBrand();

  return (
    <div className="relative w-full h-screen min-h-[650px] bg-black overflow-hidden flex items-center justify-center select-none">
      {/* 1. Live Background GIF from Sanity */}
      {brand.landingBackgroundGif ? (
        <img
          src={brand.landingBackgroundGif}
          alt="Bazanetti Background"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />
      ) : (
        /* Dark minimal canvas when GIF is not yet uploaded in Sanity */
        <div className="absolute inset-0 bg-neutral-950 flex flex-col items-center justify-end pb-8">
          {!loading && (
            <div className="z-10 bg-black/80 border border-white/20 text-white/70 px-4 py-2 text-[10px] font-mono tracking-widest uppercase">
              Sanity: Upload &apos;landingBackgroundGif&apos; in Brand Settings
            </div>
          )}
        </div>
      )}

      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl w-full mix-blend-difference">
        <button
          id="bazanetti-landing-logo-btn"
          onClick={onEnter}
          className="group focus:outline-none cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 flex flex-col items-center"
          aria-label="Enter Bazanetti - View Totem Glyphs"
        >
          {brand.wordmarkLogo && (
            /* Custom Wordmark image from Sanity */
            <img
              src={brand.wordmarkLogo}
              alt="BAZANETTI"
              className="w-full max-w-[85vw] max-h-36 sm:max-h-52 md:max-h-64 object-contain brightness-0 invert transition-transform duration-300"
            />
          )}
        </button>
      </div>
    </div>
  );
}
