import React from "react";
import { useBrand } from "../context/BrandContext";

interface SideTickerProps {
  side: "right" | "left";
  hasHeader?: boolean;
}

export function SideTicker({ side, hasHeader = false }: SideTickerProps) {
  const { brand } = useBrand();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const unitRef = React.useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = React.useState(1);

  // Repeat the motif enough times to cover the full rail height;
  // overflow-hidden lets the last copy clip mid-word at the footer.
  React.useEffect(() => {
    const container = containerRef.current;
    const unit = unitRef.current;
    if (!container || !unit) return;

    const update = () => {
      const unitHeight = unit.offsetHeight;
      if (!unitHeight) return;
      setRepeatCount(
        Math.max(1, Math.ceil(container.clientHeight / unitHeight)),
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(unit);
    return () => observer.disconnect();
  }, [brand.monogramEmblem]);

  return (
    <aside
      aria-hidden="true"
      className="hidden lg:block relative w-11 shrink-0 self-stretch select-none pointer-events-none z-20 bg-white"
    >
      {/* Sticky viewport-height rail inside the full-height aside: pinned
          while scrolling, pushed up when the footer arrives */}
      <div
        ref={containerRef}
        className={`sticky py-6 overflow-hidden flex flex-col items-center gap-8 ${
          hasHeader ? "top-[100px] h-[calc(100vh-100px)]" : "top-0 h-screen"
        }`}
      >
        {Array.from({ length: repeatCount }, (_, i) => (
          <div
            key={i}
            ref={i === 0 ? unitRef : undefined}
            className="flex flex-col items-center gap-8 shrink-0"
          >
            <span
              className="font-haas text-[12px] font-normal leading-none tracking-[0.05em] uppercase text-center text-black rotate-360"
              style={{ writingMode: "vertical-lr" }}
            >
              {brand.tagline || "JEWELLERY & OBJECTS"}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
            <span
              className="font-haas text-[12px] font-normal leading-none tracking-[0.65em] uppercase text-center text-black rotate-360"
              style={{ writingMode: "vertical-lr" }}
            >
              BAZANETTI
            </span>
            <span className="w-2.5 h-2.5 rounded-full border border-black"></span>
            <span
              className="font-haas text-[12px] font-normal leading-none tracking-[0.05em] uppercase text-center text-black rotate-360"
              style={{ writingMode: "vertical-lr" }}
            >
              {brand.locationTagline || "REALISED IN LONDON"}
            </span>
            {brand.monogramEmblem ? (
              <img
                src={brand.monogramEmblem}
                alt=""
                className="w-4 h-4 object-contain"
              />
            ) : (
              <span className="font-mono text-[7px] font-bold text-red-600 tracking-wider">
                [NO B LOGO]
              </span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
