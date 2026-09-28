import React, { useState, useEffect, useRef } from 'react';

export function FontUploader() {
  const [isNeueBrueckeActive, setIsNeueBrueckeActive] = useState<boolean | null>(null);
  const [testModeEnabled, setTestModeEnabled] = useState<boolean>(true);
  const [checking, setChecking] = useState<boolean>(true);
  const [uploading, setUploading] = useState<boolean>(false);
  const [serverFiles, setServerFiles] = useState<string[]>([]);
  const [bannerVisible, setBannerVisible] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Verification function that tests both FontFaceSet API and Canvas metrics
  const checkIsNeueBrueckeActive = async (): Promise<boolean> => {
    try {
      if (document.fonts) {
        // Trigger font load if not started
        await Promise.all([
          document.fonts.load('16px "Neue Brücke"'),
          document.fonts.load('16px "Neue Brucke"'),
        ]);
        await document.fonts.ready;
      }

      // Secondary check: Canvas glyph width differential against system fallbacks
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const testPhrase = 'BAZANETTI JEWELLERY & OBJECTS LONDON 1234567890';
        
        ctx.font = '72px monospace';
        const monoFallback = ctx.measureText(testPhrase).width;
        
        ctx.font = '72px "Neue Brücke", monospace';
        const customMono = ctx.measureText(testPhrase).width;

        ctx.font = '72px sans-serif';
        const sansFallback = ctx.measureText(testPhrase).width;

        ctx.font = '72px "Neue Brücke", sans-serif';
        const customSans = ctx.measureText(testPhrase).width;

        if (Math.abs(customMono - monoFallback) > 2 && Math.abs(customSans - sansFallback) > 2) {
          return true;
        }
      }

      if (document.fonts && (document.fonts.check('16px "Neue Brücke"') || document.fonts.check('16px "Neue Brucke"'))) {
        return true;
      }
    } catch (e) {
      console.error('Font check error:', e);
    }
    return false;
  };

  const runVerification = async () => {
    const active = await checkIsNeueBrueckeActive();
    setIsNeueBrueckeActive(active);
    setChecking(false);
  };

  // Check server files & run client verification
  useEffect(() => {
    fetch('/api/font-status')
      .then((res) => (res.ok ? res.json() : { installed: false, files: [] }))
      .then((data) => {
        setServerFiles(data?.files || []);
      })
      .catch(() => {})
      .finally(() => {
        runVerification();
      });

    // Re-verify when browser finishes loading fonts
    if (document.fonts) {
      document.fonts.addEventListener('loadingdone', runVerification);
    }

    const interval = setInterval(runVerification, 1500);

    return () => {
      clearInterval(interval);
      if (document.fonts) {
        document.fonts.removeEventListener('loadingdone', runVerification);
      }
    };
  }, []);

  // Sync color verification class to document.body
  useEffect(() => {
    if (!testModeEnabled || isNeueBrueckeActive === null) {
      document.body.classList.remove('font-test-green', 'font-test-red');
      return;
    }

    if (isNeueBrueckeActive) {
      document.body.classList.add('font-test-green');
      document.body.classList.remove('font-test-red');
    } else {
      document.body.classList.add('font-test-red');
      document.body.classList.remove('font-test-green');
    }

    return () => {
      document.body.classList.remove('font-test-green', 'font-test-red');
    };
  }, [isNeueBrueckeActive, testModeEnabled]);

  const handleUploadFile = async (file: File) => {
    setUploading(true);
    try {
      const res = await fetch(`/api/upload-font?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      const data = await res.json();
      if (data.success) {
        // Immediately register in browser
        try {
          const fontBuffer = await file.arrayBuffer();
          const fontFace = new FontFace('Neue Brücke', fontBuffer);
          await fontFace.load();
          document.fonts.add(fontFace);
        } catch (_) {}

        await runVerification();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleUploadFile(files[0]);
    }
  };

  if (checking) return null;

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        accept=".woff2,.woff,.otf,.ttf"
        className="hidden"
      />

      {/* Persistent Diagnostics Badge */}
      {bannerVisible && (
        <aside
          id="font-diagnostic-banner"
          aria-label="Font verification status"
          className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-3 text-xs shadow-2xl border backdrop-blur-md transition-all select-none max-w-sm rounded-none"
          style={{
            backgroundColor: '#0a0a0a',
            borderColor: isNeueBrueckeActive ? '#22c55e' : '#ef4444',
            color: '#ffffff',
          }}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
                style={{
                  backgroundColor: isNeueBrueckeActive ? '#22c55e' : '#ef4444',
                }}
              />
              <span className="font-bold tracking-wider uppercase text-[11px] text-white">
                Font Check: {isNeueBrueckeActive ? 'Neue Brücke Active' : 'Fallback Active'}
              </span>
            </div>
            <button
              onClick={() => setBannerVisible(false)}
              className="text-white/40 hover:text-white text-xs cursor-pointer px-1"
              title="Hide badge"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-1 text-[11px] text-neutral-300">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Font display color:</span>
              <span
                className="font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-[10px]"
                style={{
                  backgroundColor: isNeueBrueckeActive ? '#14532d' : '#7f1d1d',
                  color: isNeueBrueckeActive ? '#4ade80' : '#f87171',
                }}
              >
                {isNeueBrueckeActive ? 'GREEN (Neue Brücke)' : 'RED (Fallback)'}
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-white/50 pt-1">
              <span>Server files:</span>
              <span className="font-mono text-white/80">
                {serverFiles.length > 0 ? serverFiles.join(', ') : 'None in /public/fonts'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => setTestModeEnabled(!testModeEnabled)}
              className="flex-1 py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white cursor-pointer text-center"
            >
              {testModeEnabled ? 'Color Test: ON' : 'Color Test: OFF'}
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white cursor-pointer text-center"
              title="Upload new font file"
            >
              {uploading ? '...' : 'Upload .woff2'}
            </button>
          </div>
        </aside>
      )}

      {/* Minimized reopen button if banner closed */}
      {!bannerVisible && (
        <button
          onClick={() => setBannerVisible(true)}
          className="fixed bottom-3 right-3 z-50 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 border shadow-lg cursor-pointer"
          style={{
            backgroundColor: '#000000',
            borderColor: isNeueBrueckeActive ? '#22c55e' : '#ef4444',
            color: isNeueBrueckeActive ? '#22c55e' : '#ef4444',
          }}
        >
          ● Font Status
        </button>
      )}
    </>
  );
}
