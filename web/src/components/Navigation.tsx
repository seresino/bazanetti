import React from "react";
import { ActiveTab } from "../types";
import { useBrand } from "../context/BrandContext";

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

const MISSING_ICON_CLASS =
  "font-mono text-[9px] font-bold text-white tracking-wider";

export function Navigation({ activeTab, onSelectTab }: NavigationProps) {
  const { brand } = useBrand();

  const navItems: {
    tab: ActiveTab;
    label: string;
    src: string | null;
    iconClass: string;
    fallbackClass: string;
    fallbackText: string;
  }[] = [
    {
      tab: "home",
      label: "Home",
      src: brand.monogramEmblem,
      iconClass: "h-8 w-auto md:h-9",
      fallbackClass: "text-xs font-black tracking-widest text-white",
      fallbackText: "[HOME]",
    },
    {
      tab: "shop",
      label: "Shop",
      src: brand.icons.shop,
      iconClass: "h-8 w-auto md:h-9",
      fallbackClass: MISSING_ICON_CLASS,
      fallbackText: "[NO SHOP ICON]",
    },
    {
      tab: "info",
      label: "Info",
      src: brand.icons.info,
      iconClass: "h-8 w-auto md:h-9",
      fallbackClass: MISSING_ICON_CLASS,
      fallbackText: "[NO INFO ICON]",
    },
    {
      tab: "works",
      label: "Works",
      src: brand.icons.works,
      iconClass: "h-8 w-auto md:h-9",
      fallbackClass: MISSING_ICON_CLASS,
      fallbackText: "[NO WORKS ICON]",
    },
    {
      tab: "vault",
      label: "Vault",
      src: brand.icons.vault,
      iconClass: "h-8 w-auto md:h-9",
      fallbackClass: MISSING_ICON_CLASS,
      fallbackText: "[NO VAULT ICON]",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full mix-blend-difference">
      <div className="w-full px-2 sm:px-3 md:px-3.5 py-4 md:py-6">
        {/* Navigation Glyphs: Evenly spaced stretching full width of the viewport */}
        <nav
          id="main-navigation"
          aria-label="Primary Navigation"
          className="w-full flex items-center justify-between"
        >
          {navItems.map((item) => {
            const isActive =
              activeTab === item.tab ||
              (activeTab === "project" && item.tab === "works");
            return (
              <button
                key={item.tab}
                id={`nav-tab-${item.tab}`}
                onClick={() => onSelectTab(item.tab)}
                className={`group relative w-11 flex flex-col items-center justify-center py-2 transition-all cursor-pointer ${
                  isActive
                    ? "text-white scale-110"
                    : "text-white/80 hover:text-white hover:scale-105"
                }`}
                title={item.label}
              >
                {item.src ? (
                  <span className="relative inline-block">
                    <img
                      src={item.src}
                      alt={item.label}
                      className={`${item.iconClass} object-contain brightness-0 invert transition-transform group-hover:scale-110`}
                    />
                    {item.tab !== "home" && (
                      <span className="absolute left-1/2 bottom-[-50%] -translate-x-1/2 mix-blend-difference text-white text-xl md:text-2xl font-bold lowercase tracking-tight pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {item.label}
                      </span>
                    )}
                  </span>
                ) : (
                  <span className={item.fallbackClass}>
                    {item.fallbackText}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
