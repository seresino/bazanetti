import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { FullScreenEmblemHero } from "../components/FullScreenEmblemHero";
import { fetchShopifyProducts } from "../lib/shopify";
import { X } from "lucide-react";

interface ShopViewProps {
  onAddToCart: (product: Product, size: string) => void;
  onOpenCart?: () => void;
}

export function ShopView({ onAddToCart, onOpenCart }: ShopViewProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    fetchShopifyProducts().then((res) => {
      setProducts(res.products);
      setError(res.error);
      setLoading(false);
    });
  }, []);

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
                setImageIndex(0);
              }}
              className="group relative border-b border-r border-dashed border-black/40 max-sm:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 bg-white flex flex-col justify-between cursor-pointer transition-colors"
            >
              {/* Product Image Stage */}
              <div className="relative w-full aspect-square p-6 md:p-8 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
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
            className="relative bg-white w-full max-w-6xl border border-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 z-10 p-2 text-black hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: image carousel */}
              <div className="relative flex items-center justify-center p-10 md:p-16 min-h-[40vh] md:min-h-[70vh]">
                {productImages.length > 1 && (
                  <button
                    onClick={() =>
                      setImageIndex(
                        (imageIndex - 1 + productImages.length) %
                          productImages.length,
                      )
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-3 hover:opacity-50 cursor-pointer"
                    aria-label="Previous image"
                  >
                    <img
                      src="/images/ui/arrow.png"
                      alt=""
                      className="h-6 w-auto"
                    />
                  </button>
                )}
                <img
                  src={productImages[imageIndex] || selectedProduct.image}
                  alt={selectedProduct.name}
                  className="max-h-[60vh] w-auto max-w-full object-contain"
                />
                {productImages.length > 1 && (
                  <button
                    onClick={() =>
                      setImageIndex((imageIndex + 1) % productImages.length)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-3 hover:opacity-50 cursor-pointer"
                    aria-label="Next image"
                  >
                    <img
                      src="/images/ui/arrow.png"
                      alt=""
                      className="h-6 w-auto rotate-180"
                    />
                  </button>
                )}
              </div>

              {/* Right: details, dashed vertical divider */}
              <div className="border-t md:border-t-0 md:border-l border-dashed border-black/40 p-8 md:p-12 flex flex-col justify-center space-y-6">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
                  {selectedProduct.name}
                </h3>

                {detailLines.length > 0 && (
                  <ul className="list-disc pl-5 space-y-1 text-xs md:text-sm font-haas text-black/90">
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

                {/* Angled tag outline button */}
                <button
                  id="modal-add-to-cart"
                  onClick={handleModalAdd}
                  disabled={!canBuy}
                  className="disabled:cursor-not-allowed cursor-pointer self-start"
                >
                  {canBuy ? (
                    <img
                      src="/images/ui/tag-checkout.png"
                      alt="Checkout"
                      className="h-12 md:h-14 w-auto hover:opacity-70 transition-opacity"
                    />
                  ) : (
                    <span className="text-black/40">Sold Out</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
