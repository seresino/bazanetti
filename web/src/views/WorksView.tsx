import React, { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { FullScreenEmblemHero } from '../components/FullScreenEmblemHero';
import { fetchSanityWorks, projectId, dataset } from '../lib/sanity';
import { SanityStatusCard } from '../components/SanityStatusCard';

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
      <FullScreenEmblemHero label="WORKS" targetContentId="works-content-section" />

      {/* Editorial Masonry Grid */}
      <div id="works-content-section" className="w-full px-4 sm:px-6 md:px-8 lg:px-10 pt-10 pb-16">
        
        {/* Status / Error feedback when not displaying live projects */}
        {(loading || error || isEmpty) && (
          <SanityStatusCard
            type="works"
            loading={loading}
            error={error}
            isEmpty={isEmpty}
            projectId={projectId}
            dataset={dataset}
            onRetry={loadData}
          />
        )}

        {/* Live Sanity Feed Header badge */}
        {!loading && !error && !isEmpty && projects.length > 0 && (
          <div className="mb-6 flex items-center justify-between border-b border-black pb-3">
            <span className="text-xs font-black uppercase tracking-wider">
              Works Archive
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-black uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sanity Feed ({projects.length} Works)
            </span>
          </div>
        )}

        {/* The Grid: Rendered strictly with live Sanity data */}
        {!loading && !error && projects.length > 0 && (
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-10 items-start">
            {projects.map((project, index) => {
              const pattern = layoutPatterns[index % layoutPatterns.length];
              const badgeLabel = project.category || 'AWFC ● Champions League';

              return (
                <div
                  key={project.id}
                  id={`work-item-${project.id}`}
                  onClick={() => onSelectProject(project)}
                  className={`${pattern.colSpan} group cursor-pointer space-y-3`}
                >
                  <div className={`relative ${pattern.aspect} overflow-hidden border border-black/10 bg-black/5`}>
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
                        <span className="text-[10px] text-neutral-500 mt-1">[No image uploaded in Sanity]</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-black text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5">
                      {badgeLabel}
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
