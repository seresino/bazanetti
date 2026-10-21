import React, { useEffect, useState } from "react";
import { fetchLegalPages } from "../lib/sanity";
import { LegalPage, privacyPolicy, termsOfService } from "../lib/legalContent";

interface LegalViewProps {
  page: "terms" | "privacy";
}

export function LegalView({ page }: LegalViewProps) {
  const fallback = page === "terms" ? termsOfService : privacyPolicy;
  const [doc, setDoc] = useState<LegalPage>(fallback);

  useEffect(() => {
    setDoc(fallback);
    fetchLegalPages().then((res) => {
      const remote = page === "terms" ? res.terms : res.privacy;
      if (remote?.sections?.length) setDoc(remote);
    });
  }, [page]);

  return (
    <div className="w-full bg-white select-text">
      <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 pt-10 md:pt-16 pb-24 max-w-4xl">
        <h1 className="font-display font-black uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl text-black">
          {doc.title}
        </h1>
        <p className="mt-3 text-xs md:text-sm font-haas font-normal uppercase tracking-wider text-black/60">
          {doc.lastUpdated}
        </p>

        <div className="mt-10 md:mt-14 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xs md:text-sm font-haas font-bold uppercase tracking-widest text-black mb-4">
                {section.heading}
              </h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) => (
                  <p
                    key={i}
                    className="text-xs md:text-sm font-haas font-normal leading-relaxed text-black/90 whitespace-pre-line"
                  >
                    {block.lead ? (
                      <>
                        <span className="font-bold">{block.lead}</span>
                        {" — "}
                        {block.text}
                      </>
                    ) : (
                      block.text
                    )}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
