import React from 'react';

interface FullScreenEmblemHeroProps {
  label: string;
  targetContentId: string;
}

export function FullScreenEmblemHero({ label, targetContentId }: FullScreenEmblemHeroProps) {
  const handleScrollToContent = () => {
    const el = document.getElementById(targetContentId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      aria-label={`${label} entry`}
      className="w-full min-h-[calc(100vh-73px)] flex flex-col justify-center items-center bg-white select-none px-4"
    >
      {/* Centered Emblem with generous white space directly matching Figma design */}
      <div 
        onClick={handleScrollToContent}
        className="relative bg-black text-white px-12 sm:px-20 md:px-28 py-4 sm:py-5 md:py-6 tracking-wider font-extrabold text-3xl sm:text-5xl md:text-6xl uppercase select-none transition-transform duration-300 hover:scale-[1.02] shadow-sm cursor-pointer"
        style={{
          clipPath: 'polygon(26px 0%, calc(100% - 26px) 0%, 100% 50%, calc(100% - 26px) 100%, 26px 100%, 0% 50%)'
        }}
      >
        <span className="tracking-widest block text-center">
          {label}
        </span>
      </div>
    </section>
  );
}
