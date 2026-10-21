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
import { X } from "lucide-react";

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
          camera-orbit="180deg 75deg 105%"
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
        <div className="w-full h-full flex flex-col items-center justify-center bg-white p-2 text-center font-mono text-[9px]">
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

  const activeGlbUrl = activeItem ? activeItem.model3dUrl || null : null;

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
  // (scroll down = items travel left). Only hijacks the wheel while the
  // cursor is over the strip itself — above/below it scrolls the page.
  useEffect(() => {
    const strip = gridRef.current;
    if (!strip) return;

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

    strip.addEventListener("wheel", onWheel, { passive: false });
    return () => strip.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="w-full h-full">
      {/* Full page emblem design: the archive grid runs behind the emblem
          and scrolls horizontally when the wheel is used over it */}
      <section
        aria-label="Vault archive"
        className="relative w-full min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-100px)] flex items-center bg-white overflow-hidden select-none"
      >
        {/* Horizontally scrolling two-row strip of vault items */}
        <div
          ref={gridRef}
          id="vault-archive-grid"
          className="w-full overflow-x-auto overflow-y-hidden py-6 -translate-y-5 md:-translate-y-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                  glbUrl={item.model3dUrl || null}
                  onOpen={() => setActiveItem(item)}
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
            className="h-14 sm:h-[88px] md:h-[104px] w-auto pointer-events-auto hover:cursor-pointer"
          />
        </div>
      </section>

      {/* Archival item modal — 3D model + name only, matching shop modal chrome */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-white/95 backdrop-blur-xs"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative bg-white w-full max-w-3xl border border-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 z-10 p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-square w-full">
              {activeGlbUrl ? (
                <ModelViewer3D
                  src={activeGlbUrl}
                  poster={activeItem.image}
                  title={activeItem.title}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-haas text-black/40">
                  No 3D file
                </div>
              )}
            </div>

            <div className="border-t border-dashed border-black/40 px-6 py-4 flex items-baseline justify-between gap-4">
              <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-black">
                {activeItem.title}
              </h3>
              <span className="font-mono text-xs text-black/60 shrink-0">
                {activeItem.year}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
