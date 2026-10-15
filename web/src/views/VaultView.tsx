import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { VaultItem } from "../types";
import { fetchSanityVault, projectId, dataset } from "../lib/sanity";
import { ModelViewer3D } from "../components/ModelViewer3D";

// Fallback high-quality jewelry sample model for demonstration
const SAMPLE_DEMO_GLB =
  "https://modelviewer.dev/shared-assets/models/glTF-Sample-Assets/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb";

const TILE_SPIN_RAD_PER_SEC = (30 * Math.PI) / 180;

// A single archive cell: shows the live 3D model when one is attached and
// spins it while hovered; falls back to the item's still image otherwise.
// Rotation is driven per-frame via turntableRotation so it starts instantly —
// the built-in auto-rotate attribute eases in and lags behind the hover.
function VaultTile({
  item,
  glbUrl,
  onOpen,
}: {
  item: VaultItem;
  glbUrl: string | null;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    if (!hovered) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const viewer = viewerRef.current;
      // Only touch the API once upgraded AND loaded — writing accessors on an
      // unupgraded element shadows them. cameraOrbit is the writable orbit;
      // jumpCameraToGoal skips interpolation so the spin is instant.
      if (viewer && viewer.loaded === true) {
        const orbit = viewer.getCameraOrbit();
        orbit.theta += ((now - last) / 1000) * TILE_SPIN_RAD_PER_SEC;
        viewer.cameraOrbit = orbit.toString();
        viewer.jumpCameraToGoal();
      }
      last = now;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered]);

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-[clamp(120px,21vh,210px)] aspect-square overflow-hidden cursor-pointer"
    >
      {glbUrl ? (
        <model-viewer
          ref={viewerRef}
          src={glbUrl}
          alt={`3D model of ${item.title}`}
          loading="lazy"
          environment-image="neutral"
          exposure="1.05"
          shadow-intensity="1"
          interaction-prompt="none"
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            pointerEvents: "none",
            outline: "none",
          }}
        />
      ) : item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 p-2 text-center font-mono text-[9px]">
          <span className="font-bold">{item.code}</span>
          <span className="text-neutral-500">{item.title}</span>
        </div>
      )}
    </div>
  );
}

export function VaultView() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [activeItem, setActiveItem] = useState<VaultItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [modalMode, setModalMode] = useState<"3d" | "photo">("3d");
  const [localGlbUrls, setLocalGlbUrls] = useState<Record<string, string>>({});
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

  // When opening an item, default to 3D if a 3D model exists or if local test file exists
  const handleOpenItem = (item: VaultItem) => {
    setActiveItem(item);
    const has3D = Boolean(item.model3dUrl || localGlbUrls[item.id]);
    setModalMode(has3D ? "3d" : "photo");
  };

  const handleTestUpload = (item: VaultItem, file: File) => {
    const objectUrl = URL.createObjectURL(file);
    setLocalGlbUrls((prev) => ({ ...prev, [item.id]: objectUrl }));
    setModalMode("3d");
  };

  const activeGlbUrl = activeItem
    ? localGlbUrls[activeItem.id] || activeItem.model3dUrl || null
    : null;

  // Repeat the vault items so the strip always overflows the viewport —
  // the archive reads as wallpaper behind the emblem (as in the design).
  const wallpaperItems = useMemo(() => {
    if (!items.length) return [] as { item: VaultItem; key: string }[];
    const minCells = 16; // enough columns to run past the right edge
    const copies = Math.max(1, Math.ceil(minCells / items.length));
    const cells: { item: VaultItem; key: string }[] = [];
    for (let c = 0; c < copies; c++) {
      items.forEach((item, i) =>
        cells.push({ item, key: `${item.id}-${c}-${i}` }),
      );
    }
    if (cells.length % 2) {
      const item = items[0];
      cells.push({ item, key: `${item.id}-pad` });
    }
    return cells;
  }, [items]);

  // Vertical wheel over the grid scrolls the items horizontally
  // (scroll down = items travel left). Once the strip is exhausted,
  // the wheel falls through to normal page scrolling.
  useEffect(() => {
    const zone = heroRef.current;
    const strip = gridRef.current;
    if (!zone || !strip) return;

    const onWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      const max = strip.scrollWidth - strip.clientWidth;
      const canScroll =
        delta > 0 ? strip.scrollLeft < max - 1 : strip.scrollLeft > 0;
      if (canScroll) {
        e.preventDefault();
        strip.scrollLeft += delta;
      }
    };

    zone.addEventListener("wheel", onWheel, { passive: false });
    return () => zone.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="w-full h-full">
      {/* Full page emblem design: the archive grid runs behind the emblem
          and scrolls horizontally when the wheel is used over it */}
      <section
        ref={heroRef}
        aria-label="Vault archive"
        className="relative w-full h-full min-h-0 flex items-center bg-white overflow-hidden overscroll-none select-none"
      >
        {/* Horizontally scrolling two-row strip of vault items */}
        <div
          ref={gridRef}
          id="vault-archive-grid"
          className="w-full overflow-x-auto overflow-y-hidden py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loading && (
            <div className="w-full py-24 text-center text-xs font-bold uppercase tracking-wider text-black/50">
              Loading vault…
            </div>
          )}

          {!loading && error && (
            <div className="w-full py-24 text-center space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-black/50">
                Unable to load vault.
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
              No vault items available yet.
            </div>
          )}

          {!loading && !error && wallpaperItems.length > 0 && (
            <div className="w-max grid grid-rows-2 grid-flow-col gap-3 md:gap-4">
              {wallpaperItems.map(({ item, key }) => (
                <VaultTile
                  key={key}
                  item={item}
                  glbUrl={item.model3dUrl || localGlbUrls[item.id] || null}
                  onOpen={() => handleOpenItem(item)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Emblem centred on top of the grid */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/emblems/vault.svg"
            alt="VAULT"
            draggable={false}
            onClick={() =>
              gridRef.current?.scrollBy({
                left: gridRef.current.clientWidth * 0.6,
                behavior: "smooth",
              })
            }
            className="h-20 sm:h-[88px] md:h-[104px] w-auto pointer-events-auto hover:cursor-pointer"
          />
        </div>
      </section>

      {/* Modal for Archival Item with Interactive 3D Rotation */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xs animate-fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white max-w-xl w-full border border-black shadow-2xl p-5 sm:p-7 relative max-h-[92vh] flex flex-col overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Close & Tabs */}
            <div className="flex items-center justify-between border-b border-black pb-3 mb-4">
              {/* Mode Switcher: 3D vs Photo */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setModalMode("3d")}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                    modalMode === "3d"
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-neutral-600 border-neutral-300 hover:border-black"
                  }`}
                >
                  360° 3D Model
                </button>
                <button
                  onClick={() => setModalMode("photo")}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
                    modalMode === "photo"
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-neutral-600 border-neutral-300 hover:border-black"
                  }`}
                >
                  Still Photo
                </button>
              </div>

              <button
                onClick={() => setActiveItem(null)}
                className="text-xs font-mono font-bold uppercase tracking-widest px-2 py-1 hover:bg-black/5 cursor-pointer text-black"
              >
                [CLOSE ✕]
              </button>
            </div>

            {/* Main Interactive Stage */}
            <div className="relative aspect-square w-full bg-neutral-100 border border-black/15 overflow-hidden">
              {modalMode === "3d" ? (
                activeGlbUrl ? (
                  <ModelViewer3D
                    src={activeGlbUrl}
                    poster={activeItem.image}
                    title={activeItem.title}
                    onUploadCustomGlb={(file) =>
                      handleTestUpload(activeItem, file)
                    }
                  />
                ) : (
                  /* If no 3D model uploaded yet for this item, offer immediate test upload or sample demo */
                  <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-neutral-50 relative">
                    <div className="w-12 h-12 mb-3 rounded-full border border-black/20 flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                        <line x1="12" y1="22.08" x2="12" y2="12" />
                      </svg>
                    </div>

                    <h4 className="text-sm font-bold uppercase tracking-wider text-black mb-1">
                      No 3D File Linked in Sanity Yet
                    </h4>
                    <p className="text-[11px] text-neutral-500 max-w-xs mb-4">
                      Upload your exported{" "}
                      <code className="bg-neutral-200 px-1 py-0.5 rounded text-black font-mono">
                        .glb
                      </code>{" "}
                      file in Sanity Studio to enable 360° click-and-drag
                      rotation for this piece.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <label className="px-3 py-1.5 bg-black text-white text-[11px] font-mono uppercase font-bold tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer">
                        <span>Test Local .GLB File</span>
                        <input
                          type="file"
                          accept=".glb,.gltf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleTestUpload(activeItem, file);
                          }}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={() => {
                          setLocalGlbUrls((prev) => ({
                            ...prev,
                            [activeItem.id]: SAMPLE_DEMO_GLB,
                          }));
                        }}
                        className="px-3 py-1.5 border border-black/30 hover:border-black text-black text-[11px] font-mono uppercase font-bold tracking-wider transition-colors cursor-pointer"
                      >
                        Try Sample 3D Model
                      </button>
                    </div>
                  </div>
                )
              ) : /* Still Photo View */
              activeItem.image ? (
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-xs text-neutral-500">
                  [No image uploaded]
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="border-t border-dashed border-black/20 pt-4 mt-4 space-y-2">
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
                <span className="font-semibold text-black">Material:</span>{" "}
                {activeItem.material}
              </p>

              <div className="flex items-center justify-between text-[11px] font-mono text-black/75 pt-1">
                <span>{activeItem.edition}</span>
                {activeGlbUrl && (
                  <span className="text-emerald-700 font-bold">
                    ✓ 3D Mesh Attached
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
