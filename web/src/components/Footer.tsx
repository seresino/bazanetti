import React from 'react';
import { ActiveTab } from '../types';
import { BazanettiBMonogram } from './Icons';
import { useBrand } from '../context/BrandContext';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export function Footer({ onSelectTab }: FooterProps) {
  const { brand } = useBrand();

  return (
    <footer className="w-full mt-24 border-t border-dashed border-black bg-white select-none">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-10 md:py-14">
        
        {/* ========================================================= */}
        {/* 1. NARROW VIEWPORT LAYOUT (matches Figma reference image) */}
        {/* Switches automatically when viewport is narrow (< 1024px) */}
        {/* ========================================================= */}
        <div className="block lg:hidden w-full relative">
          {/* Brand Heading / Wordmark */}
          {brand.wordmarkLogo ? (
            <img
              src={brand.wordmarkLogo}
              alt="BAZANETTI"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain"
            />
          ) : (
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black">
              BAZANETTI
            </h2>
          )}


          {/* Category Descriptor */}
          <p className="mt-6 sm:mt-7 text-sm sm:text-base font-black tracking-wider uppercase text-black">
            JEWELLERY &amp; OBJECTS
          </p>

          {/* Origin Descriptor */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base font-black tracking-wider uppercase text-black">
            REALISED IN LONDON
          </p>

          {/* Navigation Links with solid bullets */}
          <div className="mt-6 sm:mt-8 space-y-2 text-sm sm:text-base font-black tracking-wider uppercase text-black">
            <div>
              <button
                id="footer-mobile-link-info"
                onClick={() => {
                  onSelectTab('info');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:opacity-70 transition-opacity flex items-center gap-2.5 cursor-pointer text-left"
              >
                <span className="text-base select-none leading-none">•</span>
                <span>INFO</span>
              </button>
            </div>
            <div>
              <button
                id="footer-mobile-link-shop"
                onClick={() => {
                  onSelectTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:opacity-70 transition-opacity flex items-center gap-2.5 cursor-pointer text-left"
              >
                <span className="text-base select-none leading-none">•</span>
                <span>SHOP</span>
              </button>
            </div>
            <div>
              <button
                id="footer-mobile-link-works"
                onClick={() => {
                  onSelectTab('works');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:opacity-70 transition-opacity flex items-center gap-2.5 cursor-pointer text-left"
              >
                <span className="text-base select-none leading-none">•</span>
                <span>WORKS</span>
              </button>
            </div>
            <div>
              <button
                id="footer-mobile-link-vault"
                onClick={() => {
                  onSelectTab('vault');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:opacity-70 transition-opacity flex items-center gap-2.5 cursor-pointer text-left"
              >
                <span className="text-base select-none leading-none">•</span>
                <span>VAULT</span>
              </button>
            </div>
          </div>

          {/* Contact / Social Links with solid bullets */}
          <div className="mt-6 sm:mt-7 space-y-2 text-sm sm:text-base font-black tracking-wider uppercase text-black">
            <div>
              <a
                id="footer-mobile-link-email"
                href={`mailto:${brand.emailAddress || 'studio@bazanetti.com'}`}
                className="hover:opacity-70 transition-opacity flex items-center gap-2.5 text-left"
              >
                <span className="text-base select-none leading-none">•</span>
                <span>EMAIL</span>
              </a>
            </div>
            <div>
              <a
                id="footer-mobile-link-instagram"
                href={brand.instagramUrl || "https://instagram.com/bazanetti"}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity flex items-center gap-2.5 text-left"
              >
                <span className="text-base select-none leading-none">•</span>
                <span>INSTAGRAM</span>
              </a>
            </div>
          </div>

          {/* Bottom Row: Copyright on left, Bazanetti Emblem on right */}
          <div className="mt-9 sm:mt-12 flex items-end justify-between gap-4">
            <p className="text-xs sm:text-sm font-black tracking-wider text-black uppercase">
              ©2026 – RIGHTS RESERVED
            </p>

            <button
              id="footer-mobile-monogram"
              onClick={() => {
                onSelectTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Return to Home"
              className="p-1 hover:opacity-75 transition-opacity cursor-pointer text-black shrink-0"
            >
              {brand.monogramEmblem ? (
                <img
                  src={brand.monogramEmblem}
                  alt="Bazanetti Monogram"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
              ) : (
                <BazanettiBMonogram className="w-12 h-12 sm:w-16 sm:h-16" />
              )}
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. WIDE VIEWPORT LAYOUT (5 Columns evenly distributed)    */}
        {/* Active on larger screens (>= 1024px)                      */}
        {/* ========================================================= */}
        <div className="hidden lg:grid w-full grid-cols-5 gap-6 xl:gap-8 items-start">
          
          {/* Col 1: Brand & Copyright */}
          <div className="flex flex-col justify-between h-full space-y-6">
            {brand.wordmarkLogo ? (
              <img
                src={brand.wordmarkLogo}
                alt="BAZANETTI"
                className="h-7 xl:h-9 w-auto object-contain"
              />
            ) : (
              <h2 className="text-2xl xl:text-3xl font-black tracking-tight text-black">
                BAZANETTI
              </h2>
            )}
            <p className="text-[11px] font-bold tracking-wider text-black/90 uppercase">
              ©2026 – RIGHTS RESERVED
            </p>
          </div>

          {/* Col 2: Category Tag */}
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-black">
              JEWELLERY &amp; OBJECTS
            </p>
          </div>

          {/* Col 3: Origin Tag */}
          <div>
            <p className="text-xs font-black tracking-widest uppercase text-black">
              REALISED IN LONDON
            </p>
          </div>

          {/* Col 4: Navigation Links */}
          <div className="space-y-1.5 text-xs font-black tracking-widest uppercase text-black">
            <div>
              <button
                id="footer-link-info"
                onClick={() => {
                  onSelectTab('info');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:underline flex items-center gap-2 cursor-pointer"
              >
                <span>•</span> INFO
              </button>
            </div>
            <div>
              <button
                id="footer-link-shop"
                onClick={() => {
                  onSelectTab('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:underline flex items-center gap-2 cursor-pointer"
              >
                <span>•</span> SHOP
              </button>
            </div>
            <div>
              <button
                id="footer-link-works"
                onClick={() => {
                  onSelectTab('works');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:underline flex items-center gap-2 cursor-pointer"
              >
                <span>•</span> WORKS
              </button>
            </div>
            <div>
              <button
                id="footer-link-vault"
                onClick={() => {
                  onSelectTab('vault');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:underline flex items-center gap-2 cursor-pointer"
              >
                <span>•</span> VAULT
              </button>
            </div>
            <div className="pt-2">
              <a
                id="footer-link-email"
                href={`mailto:${brand.emailAddress || 'studio@bazanetti.com'}`}
                className="hover:underline flex items-center gap-2"
              >
                <span>•</span> EMAIL
              </a>
            </div>
            <div>
              <a
                id="footer-link-instagram"
                href={brand.instagramUrl || "https://instagram.com/bazanetti"}
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-2"
              >
                <span>•</span> INSTAGRAM
              </a>
            </div>
          </div>

          {/* Col 5: Right Monogram Icon */}
          <div className="flex justify-end items-end h-full">
            <button
              id="footer-brand-monogram"
              onClick={() => {
                onSelectTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="Return to Home"
              className="p-1 hover:opacity-75 transition-opacity cursor-pointer text-black"
            >
              {brand.monogramEmblem ? (
                <img
                  src={brand.monogramEmblem}
                  alt="Bazanetti Monogram"
                  className="w-12 h-12 xl:w-14 xl:h-14 object-contain"
                />
              ) : (
                <BazanettiBMonogram className="w-12 h-12 xl:w-14 xl:h-14" />
              )}
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
