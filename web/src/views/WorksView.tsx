import React, { useState, useEffect, useCallback } from "react";
import { Project } from "../types";
import { FullScreenEmblemHero } from "../components/FullScreenEmblemHero";
import { fetchSanityWorks } from "../lib/sanity";

interface WorksViewProps {
  onSelectProject: (project: Project) => void;
}

const layoutPatterns = [
  { colSpan: "md:col-span-4", aspect: "aspect-4/3" },
  { colSpan: "md:col-span-5 md:row-span-2", aspect: "aspect-4/5" },
  { colSpan: "md:col-span-3", aspect: "aspect-square" },
  { colSpan: "md:col-span-3", aspect: "aspect-square" },
  { colSpan: "md:col-span-4", aspect: "aspect-3/4" },
  { colSpan: "md:col-span-5", aspect: "aspect-4/5" },
  { colSpan: "md:col-span-6 md:row-span-2", aspect: "aspect-3/4" },
  { colSpan: "md:col-span-5", aspect: "aspect-square" },
];

export function WorksView({ onSelectProject }: WorksViewProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    setIsEmpty(false);

    fetchSanityWorks().then((result) => {
      setProjects(result.data);
      setLoading(result.loading);
      setError(result.error);
      setIsEmpty(result.isEmpty);
    });
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="w-full">
      {/* Full screen section before reaching content */}
      <FullScreenEmblemHero
        label="WORKS"
        emblem="/emblems/works.svg"
        targetContentId="works-content-section"
      />

      {/* Editorial Masonry Grid */}
      <div
        id="works-content-section"
        className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-10 pb-16"
      >
        {/* Loading / error / empty states */}
        {loading && (
          <div className="w-full py-24 text-center text-xs font-bold uppercase tracking-wider text-black/50">
            Loading works…
          </div>
        )}

        {!loading && error && (
          <div className="w-full py-24 text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-black/50">
              Unable to load works.
            </p>
            <button
              onClick={loadData}
              className="px-4 py-2 border border-black text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && isEmpty && (
          <div className="w-full py-24 text-center text-xs font-bold uppercase tracking-wider text-black/50">
            No works available yet.
          </div>
        )}

        {/* The Grid: Rendered strictly with live Sanity data */}
        {!loading && !error && projects.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-start">
            {projects.map((project, index) => {
              const pattern = layoutPatterns[index % layoutPatterns.length];
              const client = project.client || "[Untitled]";

              return (
                <div
                  key={project.id}
                  id={`work-item-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className={`${pattern.colSpan} group cursor-pointer space-y-3`}
                >
                  <div
                    className={`relative ${pattern.aspect} overflow-hidden border border-black/10 bg-black/5`}
                  >
                    {project.coverImage ? (
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-neutral-100 text-center font-mono text-xs">
                        <span className="font-bold">{project.title}</span>
                        <span className="text-[10px] text-neutral-500 mt-1">
                          [No image uploaded in Sanity]
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                      {client}
                    </span>
                    <span className="text-[10px] font-black uppercase">●</span>
                    <span className="text-[10px] font-black uppercase">
                      {project.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
