import React from "react";
import { ActiveTab } from "../types";
import { useBrand } from "../context/BrandContext";

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export function Footer({ onSelectTab }: FooterProps) {
  const { brand } = useBrand();

  const navLinks = [
    { tab: "info", label: "INFO" },
    { tab: "shop", label: "SHOP" },
    { tab: "works", label: "WORKS" },
    { tab: "vault", label: "VAULT" },
  ] as const;

  const contactLinks = [
    {
      id: "email",
      label: "EMAIL",
      href: `mailto:${brand.emailAddress || "studio@bazanetti.com"}`,
      external: false,
    },
    {
      id: "instagram",
      label: "INSTAGRAM",
      href: brand.instagramUrl || "https://instagram.com/bazanetti",
      external: true,
    },
  ];

  const legalLinks = [
    { tab: "terms", label: "TERMS" },
    { tab: "privacy", label: "PRIVACY" },
  ] as const;

  const goTo = (tab: ActiveTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-24 border-t border-dashed border-black bg-white select-none font-haas font-medium">
      <div className="w-full px-4 sm:px-4 md:px-6 lg:px-6 py-10 md:py-14">
        {/* ========================================================= */}
        {/* 1. NARROW VIEWPORT LAYOUT (matches Figma reference image) */}
        {/* Switches automatically when viewport is narrow (< 1024px) */}
        {/* ========================================================= */}
        <div className="block lg:hidden w-full relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-black">
            BAZANETTI
          </h2>

          {/* Category Descriptor */}
          <p className="mt-6 sm:mt-7 text-sm sm:text-base uppercase text-black">
            JEWELLERY &amp; OBJECTS
          </p>

          {/* Origin Descriptor */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-base uppercase text-black">
            REALISED IN LONDON
          </p>

          {/* Navigation Links with solid bullets */}
          <div className="mt-6 sm:mt-8 text-sm sm:text-base uppercase text-black">
            {navLinks.map(({ tab, label }) => (
              <div key={tab}>
                <button
                  id={`footer-mobile-link-${tab}`}
                  onClick={() => goTo(tab)}
                  className="hover:opacity-70 transition-opacity flex items-center gap-2.5 cursor-pointer text-left"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                  <span>{label}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Contact / Social Links with solid bullets */}
          <div className="mt-6 sm:mt-7 text-sm sm:text-base font-medium tracking-wider uppercase text-black">
            {contactLinks.map(({ id, label, href, external }) => (
              <div key={id}>
                <a
                  id={`footer-mobile-link-${id}`}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="hover:opacity-70 transition-opacity flex items-center gap-2.5 text-left"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                  <span>{label}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Legal Links with solid bullets */}
          <div className="mt-6 sm:mt-7 text-sm sm:text-base uppercase text-black">
            {legalLinks.map(({ tab, label }) => (
              <div key={tab}>
                <button
                  id={`footer-mobile-link-${tab}`}
                  onClick={() => goTo(tab)}
                  className="hover:opacity-70 transition-opacity flex items-center gap-2.5 cursor-pointer text-left"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                  <span>{label}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Bottom Row: Copyright on left, Bazanetti Emblem on right */}
          <div className="flex items-end justify-between">
            <p className="text-sm sm:text-base uppercase text-black">
              ©2026 – RIGHTS RESERVED
            </p>

            <button
              id="footer-mobile-monogram"
              onClick={() => goTo("home")}
              aria-label="Return to Home"
              className="p-1 hover:opacity-75 transition-opacity cursor-pointer text-black shrink-0"
            >
              <img
                src={brand.monogramEmblem || ""}
                alt="Bazanetti Monogram"
                className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. WIDE VIEWPORT LAYOUT (4 equal cols + slim icon col)    */}
        {/* Active on larger screens (>= 1024px)                      */}
        {/* ========================================================= */}
        <div className="hidden lg:grid w-full grid-cols-[repeat(4,1fr)_auto] gap-6 xl:gap-8 items-start">
          {/* Col 1: Brand & Copyright */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <h2 className="text-5xl xl:text-5xl font-display font-black text-black">
              BAZANETTI
            </h2>
            <p className="text-sm font-medium uppercase">
              ©2026 – RIGHTS RESERVED
            </p>
          </div>

          {/* Col 2: Category Tag */}
          <div>
            <p className="text-sm uppercase text-black">
              JEWELLERY &amp; OBJECTS
            </p>
          </div>

          {/* Col 3: Origin Tag */}
          <div>
            <p className="text-sm uppercase text-black">REALISED IN LONDON</p>
          </div>

          {/* Col 4: Navigation Links */}
          <div className="text-sm uppercase text-black">
            {navLinks.map(({ tab, label }) => (
              <div key={tab}>
                <button
                  id={`footer-link-${tab}`}
                  onClick={() => goTo(tab)}
                  className="hover:underline flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>{" "}
                  {label}
                </button>
              </div>
            ))}
            {contactLinks.map(({ id, label, href, external }, i) => (
              <div key={id} className={i === 0 ? "pt-2" : undefined}>
                <a
                  id={`footer-link-${id}`}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="hover:underline flex items-center gap-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>{" "}
                  {label}
                </a>
              </div>
            ))}
            {legalLinks.map(({ tab, label }, i) => (
              <div key={tab} className={i === 0 ? "pt-2" : undefined}>
                <button
                  id={`footer-link-${tab}`}
                  onClick={() => goTo(tab)}
                  className="hover:underline flex items-center gap-2 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>{" "}
                  {label}
                </button>
              </div>
            ))}
          </div>

          {/* Col 5: Right Monogram Icon */}
          <div className="flex justify-end items-start h-full">
            <button
              id="footer-brand-monogram"
              onClick={() => goTo("home")}
              aria-label="Return to Home"
              className="px-1 -mt-2 hover:opacity-75 transition-opacity cursor-pointer text-black"
            >
              <img
                src={brand.monogramEmblem || ""}
                alt="Bazanetti Monogram"
                className="w-12 h-12 xl:w-14 xl:h-14 object-contain"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
