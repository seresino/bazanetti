import React from 'react';

interface SideTickerProps {
  side: 'left' | 'right';
  hasHeader?: boolean;
}

export function SideTicker({ side, hasHeader = false }: SideTickerProps) {
  return (
    <aside
      aria-hidden="true"
      className={`hidden lg:flex flex-col justify-between items-center w-11 py-6 select-none pointer-events-none z-20 bg-white shrink-0 sticky ${
        hasHeader ? 'top-[73px] h-[calc(100vh-73px)]' : 'top-0 h-screen'
      }`}
    >
      {/* Top segment */}
      <div className="flex flex-col items-center gap-4">
        <span
          className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/90 rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          JEWELLERY &amp; OBJECTS
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
      </div>

      {/* Middle brand repeat */}
      <div className="flex flex-col items-center gap-6">
        <span
          className="text-[10px] font-black tracking-[0.45em] uppercase text-black rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          B A Z A N E T T I
        </span>
        <span className="w-1.5 h-1.5 rounded-full border border-black"></span>
        <span
          className="text-[9px] font-bold tracking-[0.25em] uppercase text-black/75 rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          REALISED IN LONDON
        </span>
        <span className="w-1.5 h-1.5 bg-black"></span>
      </div>

      {/* Bottom segment */}
      <div className="flex flex-col items-center gap-4">
        <span
          className="text-[10px] font-black tracking-[0.45em] uppercase text-black rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          B A Z A N E T T I
        </span>
        <span
          className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/90 rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          JEWELLERY &amp; OBJECTS
        </span>
      </div>
    </aside>
  );
}
