import React from 'react';

interface HeaderBadgeProps {
  label: string;
  className?: string;
}

export function HeaderBadge({ label, className = '' }: HeaderBadgeProps) {
  return (
    <div className={`flex justify-center my-6 md:my-10 ${className}`}>
      <div 
        className="relative bg-black text-white px-8 md:px-14 py-2.5 md:py-3.5 tracking-wider font-extrabold text-2xl md:text-4xl uppercase select-none transition-transform hover:scale-[1.02]"
        style={{
          clipPath: 'polygon(22px 0%, calc(100% - 22px) 0%, 100% 50%, calc(100% - 22px) 100%, 22px 100%, 0% 50%)'
        }}
      >
        <span className="tracking-widest">{label}</span>
      </div>
    </div>
  );
}
