import React from 'react';
import { ActiveTab } from '../types';
import { useBrand } from '../context/BrandContext';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export function Navigation({
  activeTab,
  onSelectTab,
}: NavigationProps) {
  const { brand } = useBrand();

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode }[] = [
    {
      tab: 'home',
      label: 'Home',
      icon: brand.monogramEmblem ? (
        <img
          src={brand.monogramEmblem}
          alt="Home"
          className="w-6 h-6 md:w-7 md:h-7 object-contain transition-transform group-hover:scale-110"
        />
      ) : (
        <span className="text-xs font-black tracking-widest text-black">
          [HOME]
        </span>
      ),
    },
    {
      tab: 'shop',
      label: 'Shop',
      icon: brand.icons.shop ? (
        <img
          src={brand.icons.shop}
          alt="Shop"
          className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform group-hover:scale-110"
        />
      ) : (
        <span className="font-mono text-[9px] font-bold text-red-600 tracking-wider">
          [NO SHOP ICON]
        </span>
      ),
    },
    {
      tab: 'info',
      label: 'Info',
      icon: brand.icons.info ? (
        <img
          src={brand.icons.info}
          alt="Info"
          className="w-7 h-7 md:w-8 md:h-8 object-contain transition-transform group-hover:scale-110"
        />
      ) : (
        <span className="font-mono text-[9px] font-bold text-red-600 tracking-wider">
          [NO INFO ICON]
        </span>
      ),
    },
    {
      tab: 'works',
      label: 'Works',
      icon: brand.icons.works ? (
        <img
          src={brand.icons.works}
          alt="Works"
          className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform group-hover:scale-110"
        />
      ) : (
        <span className="font-mono text-[9px] font-bold text-red-600 tracking-wider">
          [NO WORKS ICON]
        </span>
      ),
    },
    {
      tab: 'vault',
      label: 'Vault',
      icon: brand.icons.vault ? (
        <img
          src={brand.icons.vault}
          alt="Vault"
          className="w-8 h-8 md:w-9 md:h-9 object-contain transition-transform group-hover:scale-110"
        />
      ) : (
        <span className="font-mono text-[9px] font-bold text-red-600 tracking-wider">
          [NO VAULT ICON]
        </span>
      ),
    },
  ];


  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs">
      <div className="w-full px-2 sm:px-3 md:px-3.5 py-4 md:py-6">
        
        {/* Navigation Glyphs: Evenly spaced stretching full width of the viewport */}
        <nav 
          id="main-navigation"
          aria-label="Primary Navigation"
          className="w-full flex items-center justify-between"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.tab || (activeTab === 'project' && item.tab === 'works');
            return (
              <button
                key={item.tab}
                id={`nav-tab-${item.tab}`}
                onClick={() => onSelectTab(item.tab)}
                className={`group relative w-11 flex flex-col items-center justify-center py-2 transition-all cursor-pointer ${
                  isActive ? 'text-black scale-110' : 'text-black/80 hover:text-black hover:scale-105'
                }`}
                title={item.label}
              >
                {item.icon}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
