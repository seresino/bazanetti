import React from 'react';
import { useBrand } from '../context/BrandContext';

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

      {/* 2. Perforated Halftone Screenprint Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
          backgroundSize: '8px 8px'
        }}
        aria-hidden="true"
      />

      {/* 3. Vignette Shadow Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none bg-radial-[circle_at_center,transparent_30%,rgba(0,0,0,0.85)_100%]"
        aria-hidden="true"
      />

      {/* 4. Centered Layered BAZANETTI Brandmark Button */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl w-full">
        <button
          id="bazanetti-landing-logo-btn"
          onClick={onEnter}
          className="group focus:outline-none cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95 flex flex-col items-center"
          aria-label="Enter Bazanetti - View Totem Glyphs"
        >
          {brand.wordmarkLogo ? (
            /* Custom Wordmark image from Sanity */
            <img
              src={brand.wordmarkLogo}
              alt="BAZANETTI"
              className="w-full max-w-[85vw] max-h-36 sm:max-h-52 md:max-h-64 object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_40px_rgba(255,255,255,0.8)]"
            />
          ) : (
            /* Outlined Stencil BAZANETTI Display Title Fallback */
            <h1 
              className="text-5xl sm:text-7xl md:text-9xl lg:text-[11rem] font-black tracking-[0.08em] text-transparent uppercase transition-all duration-300 group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.75)]"
              style={{
                WebkitTextStroke: '2px #ffffff',
                textShadow: '0 0 40px rgba(255,255,255,0.25)'
              }}
            >
              BAZANETTI
            </h1>
          )}
        </button>
      </div>

    </div>
  );
}
