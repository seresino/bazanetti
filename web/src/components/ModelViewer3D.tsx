import React, { useEffect, useRef, useState } from "react";

// Dynamically import @google/model-viewer on client side
if (typeof window !== "undefined") {
  import("@google/model-viewer").catch((err) => {
    console.error("Failed to load @google/model-viewer:", err);
  });
}

// Augment React JSX namespace for custom element
declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          poster?: string;
          alt?: string;
          "camera-controls"?: boolean | string;
          "auto-rotate"?: boolean | string;
          "rotation-per-second"?: string;
          "camera-orbit"?: string;
          "field-of-view"?: string;
          "touch-action"?: string;
          "shadow-intensity"?: string;
          "interaction-prompt"?: string;
          exposure?: string;
          "environment-image"?: string;
          loading?: "auto" | "lazy" | "eager";
          reveal?: "auto" | "interaction" | "manual";
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }
}

interface ModelViewer3DProps {
  src: string;
  poster?: string;
  title: string;
  onUploadCustomGlb?: (file: File) => void;
}

export function ModelViewer3D({
  src,
  poster,
  title,
  onUploadCustomGlb,
}: ModelViewer3DProps) {
  const modelViewerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const viewer = modelViewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleUserInteraction = () => {
      setHasInteracted(true);
    };

    viewer.addEventListener("load", handleLoad);
    viewer.addEventListener("camera-change", handleUserInteraction);

    return () => {
      viewer.removeEventListener("load", handleLoad);
      viewer.removeEventListener("camera-change", handleUserInteraction);
    };
  }, [src]);

  const handleResetCamera = () => {
    const viewer = modelViewerRef.current;
    if (viewer && viewer.resetTurntableRotation) {
      viewer.resetTurntableRotation();
    }
    if (viewer) {
      viewer.cameraOrbit = "0deg 75deg 105%";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadCustomGlb) {
      onUploadCustomGlb(file);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#f8f8f8] flex items-center justify-center select-none overflow-hidden group">
      {/* 3D Model Viewer Canvas */}
      <model-viewer
        ref={modelViewerRef}
        src={src}
        poster={poster}
        alt={`3D Model of ${title}`}
        camera-controls=""
        auto-rotate={autoRotate ? "" : undefined}
        rotation-per-second="25deg"
        touch-action="pan-y"
        shadow-intensity="1.2"
        exposure="1.05"
        environment-image="neutral"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f7f7f7",
          outline: "none",
          cursor: "grab",
        }}
      />

      {/* Floating Drag Hint (Fades out once user drags) */}
      {!hasInteracted && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none z-10 flex items-center gap-2 bg-black/85 text-white px-3 py-1.5 shadow-md border border-white/10 animate-pulse">
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
            Click &amp; Drag to Rotate 360°
          </span>
        </div>
      )}

      {/* 3D Control Bar (Bottom Left & Right) */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        {/* Left: Status / Format Pill */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-black/80 text-white px-2.5 py-1 text-[10px] font-mono tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>INTERACTIVE 3D (.GLB)</span>
        </div>

        {/* Right: Controls (Auto-spin toggle, Reset, Test Custom File) */}
        <div className="pointer-events-auto flex items-center gap-1 bg-white/95 border border-black/20 p-1 shadow-sm">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer ${
              autoRotate
                ? "bg-black text-white"
                : "bg-transparent text-black hover:bg-black/5"
            }`}
            title="Toggle Auto-Rotation"
          >
            {autoRotate ? "Auto-Spin: ON" : "Auto-Spin: OFF"}
          </button>

          <button
            onClick={handleResetCamera}
            className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider font-bold text-black hover:bg-black/5 transition-colors cursor-pointer"
            title="Reset View"
          >
            Reset
          </button>

          {onUploadCustomGlb && (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider font-bold bg-neutral-100 hover:bg-neutral-200 text-black border-l border-black/10 transition-colors cursor-pointer"
                title="Test with your own .glb file"
              >
                Test .GLB
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".glb,.gltf"
                onChange={handleFileChange}
                className="hidden"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
