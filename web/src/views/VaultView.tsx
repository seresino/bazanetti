import React, { useState, useEffect, useCallback } from 'react';
import { VaultItem } from '../types';
import { FullScreenEmblemHero } from '../components/FullScreenEmblemHero';
import { fetchSanityVault, projectId, dataset } from '../lib/sanity';
import { SanityStatusCard } from '../components/SanityStatusCard';

export function VaultView() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [activeItem, setActiveItem] = useState<VaultItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    setIsEmpty(false);

    fetchSanityVault().then((result) => {
      setItems(result.data);
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
      {/* Full screen section before reaching content: word in emblem with white background */}
      <FullScreenEmblemHero label="VAULT" targetContentId="vault-content-section" />

      {/* Archival Grid Section */}
      <div id="vault-content-section" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-16">
        
        {/* Status / Error feedback when not displaying live items */}
        {(loading || error || isEmpty) && (
          <SanityStatusCard
            type="vault"
            loading={loading}
            error={error}
            isEmpty={isEmpty}
            projectId={projectId}
            dataset={dataset}
            onRetry={loadData}
          />
        )}

        {/* Live Sanity Vault Header badge */}
        {!loading && !error && !isEmpty && items.length > 0 && (
          <div className="mb-4 flex items-center justify-between border-b border-black pb-3">
            <span className="text-xs font-black uppercase tracking-wider">
              Permanent Vault
            </span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-widest text-black uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sanity Vault ({items.length} Artifacts)
            </span>
          </div>
        )}

        {/* Grid of Archival Rings strictly with live Sanity data */}
        {!loading && !error && items.length > 0 && (
          <div 
            id="vault-archive-grid"
            className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 md:gap-4 my-6"
          >
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative aspect-square overflow-hidden border border-black/20 bg-white p-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:border-black hover:shadow-md"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 p-2 text-center font-mono text-[9px]">
                    <span className="font-bold">{item.code}</span>
                    <span className="text-neutral-500">{item.title}</span>
                  </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/80 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between text-center select-none">
                  <span className="text-[9px] font-mono font-bold tracking-widest text-white/70">
                    {item.code}
                  </span>
                  <p className="text-[10px] font-bold leading-tight line-clamp-2">
                    {item.title}
                  </p>
                  <span className="text-[8px] font-mono text-white/60">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Archival Item */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div 
            className="bg-white max-w-lg w-full border border-black shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 text-xs font-black uppercase tracking-widest p-2 hover:bg-black/5 cursor-pointer"
            >
              [CLOSE ✕]
            </button>

            <div className="space-y-4">
              <div className="aspect-square bg-black/5 border border-black/10 overflow-hidden">
                {activeItem.image ? (
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-100 font-mono text-xs text-neutral-500">
                    [No image uploaded]
                  </div>
                )}
              </div>

              <div className="border-t border-dashed border-black/20 pt-4 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="font-mono text-xs font-bold text-black/75">
                    {activeItem.code}
                  </span>
                  <span className="font-mono text-xs font-bold text-black">
                    Est. {activeItem.year}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-black">
                  {activeItem.title}
                </h3>
                
                <p className="text-xs text-black/85">
                  <span className="font-semibold text-black">Material:</span> {activeItem.material}
                </p>
                <p className="text-[11px] font-mono text-black/75">
                  {activeItem.edition}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
