import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { FullScreenEmblemHero } from "../components/FullScreenEmblemHero";
import { fetchShopifyProducts } from "../lib/shopify";
import { fetchShopInfo, ShopInfo } from "../lib/sanity";
import { X } from "lucide-react";
import { TagButton } from "../components/TagButton";

interface ShopViewProps {
  onAddToCart: (product: Product, size: string) => void;
  onOpenCart?: () => void;
}

// Fallback copy until the client fills in Shop Info in Sanity
const infoPanelFallback = {
  returns: "Returns policy text to be provided.",
  shipping: "Shipping information text to be provided.",
  sizing: "Sizing guide text to be provided.",
} as const;

export function ShopView({ onAddToCart, onOpenCart }: ShopViewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [infoPanel, setInfoPanel] = useState<
    "returns" | "shipping" | "sizing" | null
  >(null);
  const [shopInfo, setShopInfo] = useState<ShopInfo | null>(null);

  useEffect(() => {
    fetchShopifyProducts().then((res) => {
      setProducts(res.products);
      setError(res.error);
      setLoading(false);
    });
    fetchShopInfo().then((res) => setShopInfo(res.info));
  }, []);

  // Refetch whenever the product modal opens so Studio edits always show
  useEffect(() => {
    if (selectedProduct) {
      fetchShopInfo().then((res) => setShopInfo(res.info));
    }
  }, [selectedProduct]);

  // Lock page scroll behind the modal (stops mobile chrome-collapse jolts)
  useEffect(() => {
    if (!selectedProduct) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedProduct]);

  const handleModalAdd = () => {
    if (!selectedProduct) return;
    onAddToCart(selectedProduct, selectedSize);
    setSelectedProduct(null);
    onOpenCart?.();
  };

  const selectedVariant = selectedProduct?.variants?.find(
    (v) => v.title === selectedSize,
  );
  const displayPrice = selectedVariant?.price ?? selectedProduct?.price ?? 0;
  const canBuy = selectedVariant
    ? selectedVariant.availableForSale
    : (selectedProduct?.inStock ?? false);

  const productImages = selectedProduct
    ? selectedProduct.images?.length
      ? selectedProduct.images
      : ([selectedProduct.image, selectedProduct.altImage].filter(
          Boolean,
        ) as string[])
    : [];

  const detailLines = selectedProduct
    ? ([
        selectedProduct.material && selectedProduct.material !== "—"
          ? `Material — ${selectedProduct.material}`
          : null,
        selectedProduct.gemstones && selectedProduct.gemstones !== "—"
          ? `Stones — ${selectedProduct.gemstones}`
          : null,
        ...(selectedProduct.description || "")
          .split(/\n+/)
          .map((s) => s.trim())
          .filter(Boolean),
      ].filter(Boolean) as string[])
    : [];

  return (
    <div className="w-full">
      {/* Full screen section before reaching content: word in emblem with white background */}
      <FullScreenEmblemHero
        label="SHOP"
        emblem="/emblems/shop.svg"
        targetContentId="shop-content-section"
      />

      {/* Content section: stretches full width of viewport minus ribbons */}
      <div id="shop-content-section" className="w-full pb-16">
        {/* Cart tag straddling the top edge of the grid */}
        <div className="relative z-10 flex justify-center translate-y-1/2">
          <TagButton label="CART" onClick={onOpenCart} />
        </div>
        {/* 4-Column Dashed Border Grid directly matching Desktop - Shop.png */}
        <div
          id="shop-product-grid"
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-r border-dashed border-black/40"
        >
          {loading && (
            <div className="col-span-full py-24 text-center text-xs font-bold uppercase tracking-wider text-black/50">
              Loading products…
            </div>
          )}
          {!loading && error && (
            <div className="col-span-full py-24 text-center text-xs font-bold uppercase tracking-wider text-red-700">
              {error}
            </div>
          )}
          {!loading && !error && products.length === 0 && (
            <div className="col-span-full py-24 text-center text-xs font-bold uppercase tracking-wider text-black/50">
              No products available yet.
            </div>
          )}
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setSelectedSize(product.sizes[1] || product.sizes[0] || "M");
                setInfoPanel(null);
              }}
              className="group relative border-b border-r border-dashed border-black/40 max-sm:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 bg-white flex flex-col justify-between cursor-pointer transition-colors"
            >
              {/* Product Image Stage */}
              <div className="relative w-full aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Product Label Row (matching Figma: Name on left, £00.00 on right) */}
              <div className="border-t border-dashed border-black/40 px-3.5 py-3 flex items-baseline justify-between text-xs font-bold text-black select-none">
                <span className="truncate pr-2 font-medium tracking-tight text-[11px] md:text-xs">
                  {product.name}
                </span>
                <span className="font-mono font-bold text-xs whitespace-nowrap">
                  {product.currency}
                  {product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal — split pane, dashed vertical divider */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-white/95 backdrop-blur-xs">
          <div
            className="relative bg-white w-full max-w-6xl max-h-full my-auto border border-black overflow-y-auto"
            onClick={(e) => {
              e.stopPropagation();
              setInfoPanel(null);
            }}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-10 p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: vertically scrolling image gallery, or policy text
                  when a returns/shipping/sizing button is active */}
              <div className="relative min-h-[40vh] md:min-h-[70vh]">
                {infoPanel ? (
                  <div className="h-[40vh] md:h-[70vh] overflow-y-auto p-6 md:p-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <h4 className="text-xs font-black uppercase tracking-widest text-black mb-4">
                      {infoPanel}
                    </h4>
                    {infoPanel === "sizing" ? (
                      shopInfo &&
                      (shopInfo.ringSizes.length > 0 ||
                        shopInfo.braceletSizes.length > 0 ||
                        shopInfo.necklaceSizes.length > 0) ? (
                        <div className="space-y-6">
                          {shopInfo.sizingIntro && (
                            <p className="text-xs md:text-sm font-haas font-normal leading-relaxed text-black/90 whitespace-pre-line">
                              {shopInfo.sizingIntro}
                            </p>
                          )}
                          {shopInfo.ringSizes.length > 0 && (
                            <SizeTable
                              title="Rings"
                              headers={[
                                "Size",
                                "UK Size",
                                "USA Size",
                                "EU Size",
                                "Circ. (mm)",
                                "Diam. (mm)",
                              ]}
                              rows={shopInfo.ringSizes.map((r) => [
                                r.label,
                                r.uk,
                                r.usa,
                                r.eu,
                                r.circumferenceMm,
                                r.diameterMm,
                              ])}
                            />
                          )}
                          {shopInfo.braceletSizes.length > 0 && (
                            <SizeTable
                              title="Bracelets"
                              headers={["Size", "Circ. (inch)", "Circ. (cm)"]}
                              rows={shopInfo.braceletSizes.map((r) => [
                                r.size,
                                r.circumferenceInch,
                                r.circumferenceCm,
                              ])}
                            />
                          )}
                          {shopInfo.necklaceSizes.length > 0 && (
                            <SizeTable
                              title="Necklaces & Pendants"
                              headers={["Size", "Length (inch)", "Length (cm)"]}
                              rows={shopInfo.necklaceSizes.map((r) => [
                                r.size,
                                r.lengthInch,
                                r.lengthCm,
                              ])}
                            />
                          )}
                        </div>
                      ) : (
                        <p className="text-xs md:text-sm font-haas font-normal leading-relaxed text-black/90 whitespace-pre-line">
                          {infoPanelFallback.sizing}
                        </p>
                      )
                    ) : (
                      <p className="text-xs md:text-sm font-haas font-normal leading-relaxed text-black/90 whitespace-pre-line">
                        {(infoPanel === "returns"
                          ? shopInfo?.returnsText
                          : shopInfo?.shippingText) ||
                          infoPanelFallback[infoPanel]}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="h-[40vh] md:h-[70vh] overflow-y-auto snap-y snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex flex-col gap-8">
                      {productImages.map((src, i) => (
                        <div
                          key={src + i}
                          className="h-[40vh] md:h-[70vh] shrink-0 snap-center flex items-center justify-center"
                        >
                          <img
                            src={src}
                            alt={`${selectedProduct.name} — ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: details, dashed vertical divider */}
              <div className="border-t md:border-t-0 md:border-l border-dashed border-black/40 p-8 md:p-12 flex flex-col justify-center space-y-6">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
                  {selectedProduct.name}
                </h3>

                {detailLines.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm font-haas uppercase text-black/90">
                    {detailLines.map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                )}

                {selectedProduct.sizes.length > 1 && (
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-black mb-2">
                      Select {selectedProduct.variantLabel || "Option"}:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1 text-xs font-bold border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? "bg-black text-white border-black"
                              : "border-black/30 text-black hover:border-black"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="font-mono text-base text-black">
                  {selectedProduct.currency}
                  {displayPrice.toFixed(2)}
                </p>

                {/* Angled tag button — inverts on hover */}
                {canBuy ? (
                  <TagButton
                    id="modal-add-to-cart"
                    label="Add to Cart"
                    onClick={handleModalAdd}
                    className="self-start"
                  />
                ) : (
                  <span className="text-black/40">Sold Out</span>
                )}

                {/* Policy buttons — same style as variant options; swap the
                    left pane from imagery to text */}
                <div className="flex flex-wrap gap-2">
                  {(["returns", "shipping", "sizing"] as const).map((panel) => (
                    <button
                      key={panel}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInfoPanel(infoPanel === panel ? null : panel);
                      }}
                      className={`px-3 py-1 text-xs font-bold uppercase border transition-all cursor-pointer ${
                        infoPanel === panel
                          ? "bg-black text-white border-black"
                          : "border-black/30 text-black hover:border-black"
                      }`}
                    >
                      {panel}
                    </button>
                  ))}
                </div>

                <p className="text-xs font-haas font-normal leading-relaxed text-black/70">
                  Please note, each piece is individually handcrafted. Due to
                  this unique process, the jewellery you receive will vary
                  slightly from the photo on the website. No two pieces are the
                  same. If you want to change the metal or gemstones please
                  contact us to discuss a bespoke version.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SizeTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: (string | number)[][];
}) {
  return (
    <div>
      <h5 className="text-[11px] font-black uppercase tracking-widest text-black mb-2">
        {title}
      </h5>
      <table className="w-full text-[11px] font-haas font-normal text-black/90 border-collapse">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left font-bold uppercase border-b border-black/30 pb-1 pr-3"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-b border-dashed border-black/20 py-1 pr-3"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
