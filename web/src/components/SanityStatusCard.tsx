import React from 'react';

interface SanityStatusCardProps {
  type: 'works' | 'vault';
  loading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  projectId: string;
  dataset: string;
  onRetry: () => void;
}

export function SanityStatusCard({
  type,
  loading,
  error,
  isEmpty,
  projectId,
  dataset,
  onRetry,
}: SanityStatusCardProps) {
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'Current Origin';
  const typeLabel = type === 'works' ? 'Work Project' : 'Vault Item';
  const schemaTypeName = type === 'works' ? 'work' : 'vaultItem';

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto my-12 p-8 border border-dashed border-black bg-neutral-50 text-center select-none">
        <div className="inline-block w-3 h-3 bg-black animate-ping mb-4" />
        <h3 className="text-base md:text-lg font-black tracking-wider uppercase">
          Querying Sanity CMS...
        </h3>
        <p className="mt-2 text-xs font-mono text-black/70">
          Project ID: <span className="font-bold text-black">{projectId}</span> | Dataset: <span className="font-bold text-black">{dataset}</span>
        </p>
      </div>
    );
  }

  if (error) {
    const isCorsLikely =
      error.toLowerCase().includes('failed to fetch') ||
      error.toLowerCase().includes('network') ||
      error.toLowerCase().includes('cors') ||
      error.toLowerCase().includes('access-control');

    return (
      <div className="w-full max-w-3xl mx-auto my-12 border-2 border-black bg-white text-black p-6 md:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-black pb-4">
          <div>
            <span className="inline-block bg-black text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 mb-2">
              Sanity Connection Error
            </span>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
              Failed to Fetch {type === 'works' ? 'Works' : 'Vault'} Data
            </h3>
          </div>
          <button
            onClick={onRetry}
            className="px-4 py-2 border border-black bg-black text-white text-xs font-black uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            Retry Connection
          </button>
        </div>

        {/* Detailed Error Output */}
        <div className="bg-neutral-100 p-4 border border-black/20 font-mono text-xs break-all">
          <p className="font-bold text-red-600 mb-1">Error Details:</p>
          <p className="text-black/80">{error}</p>
        </div>

        {/* Diagnostic Checklist */}
        <div className="space-y-3 text-xs">
          <p className="font-black uppercase tracking-wider">Troubleshooting Checklist:</p>
          <ol className="list-decimal pl-5 space-y-2 text-black/90">
            {isCorsLikely && (
              <li className="font-medium">
                <span className="font-bold text-black">CORS Origin Missing (Most Common):</span>
                <p className="mt-0.5 text-neutral-600">
                  Sanity blocks browser requests from new domains by default. Go to{' '}
                  <a
                    href="https://www.sanity.io/manage"
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-bold text-black hover:opacity-75"
                  >
                    sanity.io/manage
                  </a>{' '}
                  &rarr; select project <span className="font-mono bg-neutral-100 px-1">{projectId}</span> &rarr;{' '}
                  <strong>API</strong> tab &rarr; <strong>CORS Origins</strong> &rarr; click{' '}
                  <strong>Add CORS origin</strong> and add:
                </p>
                <div className="mt-1.5 p-2 bg-neutral-100 border border-black/30 font-mono text-[11px] select-all">
                  {currentOrigin}
                </div>
                <p className="mt-1 text-[11px] text-neutral-600">
                  (Check <em>Allow credentials</em> when adding).
                </p>
              </li>
            )}
            <li>
              <span className="font-bold text-black">Dataset Name Check:</span>
              <p className="mt-0.5 text-neutral-600">
                Currently querying dataset: <span className="font-mono font-bold text-black">{dataset}</span>.
                Ensure your dataset is named <code className="font-mono bg-neutral-100 px-1">{dataset}</code> and is set to{' '}
                <strong>Public</strong> in your Sanity project settings.
              </p>
            </li>
            <li>
              <span className="font-bold text-black">Published Documents:</span>
              <p className="mt-0.5 text-neutral-600">
                Make sure you clicked the green <strong>Publish</strong> button (not just draft) on your documents inside Sanity Studio.
              </p>
            </li>
          </ol>
        </div>

        <div className="pt-2 flex justify-between items-center text-[11px] font-mono text-neutral-500 border-t border-black/10">
          <span>Target Project: {projectId}</span>
          <span>Target Dataset: {dataset}</span>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="w-full max-w-3xl mx-auto my-12 border border-black bg-white text-black p-6 md:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 border-b border-black pb-4">
          <div>
            <span className="inline-block bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 mb-2">
              Connected to Sanity
            </span>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">
              No Published {type === 'works' ? 'Works' : 'Vault Items'} Found
            </h3>
          </div>
          <button
            onClick={onRetry}
            className="px-4 py-2 border border-black bg-black text-white text-xs font-black uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            Check Again
          </button>
        </div>

        <div className="space-y-3 text-xs text-black/80 leading-relaxed">
          <p>
            The website successfully connected to your Sanity project (
            <span className="font-mono font-bold text-black">{projectId}</span>) and dataset (
            <span className="font-mono font-bold text-black">{dataset}</span>), but the query returned <strong>0 documents</strong> of type{' '}
            <code className="font-mono font-bold bg-neutral-100 px-1 py-0.5 text-black">
              &quot;{schemaTypeName}&quot;
            </code>.
          </p>

          <div className="bg-neutral-50 p-4 border border-black/20 space-y-2">
            <p className="font-bold uppercase tracking-wider text-black">How to make them appear here:</p>
            <ol className="list-decimal pl-5 space-y-1 text-neutral-700">
              <li>
                Open your Sanity Studio at <code className="font-mono bg-neutral-200 px-1">http://localhost:3333</code> (or deployed studio URL).
              </li>
              <li>
                Click on <strong>{typeLabel}</strong> in the sidebar.
              </li>
              <li>
                Click <strong>+ Create</strong>, enter title &amp; image, and click the green <strong>Publish</strong> button.
              </li>
              <li>
                Return here and click <strong>Check Again</strong>.
              </li>
            </ol>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center text-[11px] font-mono text-neutral-500 border-t border-black/10">
          <span>Connected: true</span>
          <span>Items: 0</span>
        </div>
      </div>
    );
  }

  return null;
}
