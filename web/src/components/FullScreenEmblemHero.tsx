import React from "react";

interface FullScreenEmblemHeroProps {
  label: string;
  emblem: string;
  targetContentId: string;
}

export function FullScreenEmblemHero({
  label,
  emblem,
  targetContentId,
}: FullScreenEmblemHeroProps) {
  const handleScrollToContent = () => {
    const el = document.getElementById(targetContentId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      aria-label={`${label} entry`}
      className="w-full min-h-[calc(100vh-73px)] flex flex-col justify-center items-center bg-white select-none px-4"
    >
      {/* Fixed-size emblem SVG: identical on every page regardless of label */}
      <img
        src={emblem}
        alt={label}
        onClick={handleScrollToContent}
        draggable={false}
        className="h-14 sm:h-[88px] md:h-[104px] w-auto select-none hover:cursor-pointer"
      />
    </section>
  );
}
