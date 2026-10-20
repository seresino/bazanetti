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

const ROTATION_RAD_PER_SEC = (25 * Math.PI) / 180;

interface ModelViewer3DProps {
  src: string;
  poster?: string;
  title: string;
}

export function ModelViewer3D({ src, poster, title }: ModelViewer3DProps) {
  const modelViewerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

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

  // Drive the turntable per-frame from the moment the model loads — the
  // auto-rotate attribute eases in and lags several seconds before starting.
  useEffect(() => {
    if (!isLoaded || hasInteracted) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const viewer = modelViewerRef.current;
      if (viewer) {
        const orbit = viewer.getCameraOrbit();
        orbit.theta += ((now - last) / 1000) * ROTATION_RAD_PER_SEC;
        viewer.cameraOrbit = orbit.toString();
        viewer.jumpCameraToGoal();
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isLoaded, hasInteracted]);

  return (
    <div className="relative w-full h-full bg-white flex items-center justify-center select-none overflow-hidden group">
      {/* 3D Model Viewer Canvas */}
      <model-viewer
        ref={modelViewerRef}
        src={src}
        poster={poster}
        alt={`3D Model of ${title}`}
        camera-controls=""
        camera-orbit="180deg 75deg 105%"
        touch-action="pan-y"
        shadow-intensity="1.2"
        exposure="1.05"
        environment-image="neutral"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
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
    </div>
  );
}
