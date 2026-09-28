import React, { useState } from 'react';
import { Product } from '../types';
import { mockProducts } from '../data/mockData';
import { FullScreenEmblemHero } from '../components/FullScreenEmblemHero';

interface ShopViewProps {
  onAddToCart: (product: Product, size: string) => void;
}

export function ShopView({ onAddToCart }: ShopViewProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');

  const handleModalAdd = () => {
    if (!selectedProduct) return;
    onAddToCart(selectedProduct, selectedSize);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full">
      {/* Full screen section before reaching content: word in emblem with white background */}
      <FullScreenEmblemHero label="SHOP" targetContentId="shop-content-section" />

      {/* Content section: stretches full width of viewport minus ribbons */}
      <div id="shop-content-section" className="w-full pb-16">
        {/* 4-Column Dashed Border Grid directly matching Desktop - Shop.png */}
        <div 
          id="shop-product-grid"
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-r border-dashed border-black/40"
        >
        {mockProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => {
              setSelectedProduct(product);
              setSelectedSize(product.sizes[1] || product.sizes[0] || 'M');
            }}
            className="group relative border-b border-r border-dashed border-black/40 max-sm:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 bg-white flex flex-col justify-between cursor-pointer transition-colors hover:bg-black/[0.015]"
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
                {product.currency}{product.price.toFixed(2)}
              </span>
            </div>

          </div>
        ))}
      </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            className="bg-white max-w-2xl w-full border border-black shadow-2xl p-6 md:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-xs font-black uppercase tracking-widest p-2 hover:bg-black/5 cursor-pointer"
            >
              [CLOSE ✕]
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
              {/* Product Image */}
              <div className="aspect-square bg-black/2 border border-dashed border-black/30 p-6 flex items-center justify-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Details & Customisation */}
              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-2xl font-black text-black">
                    {selectedProduct.name}
                  </h3>
                  <p className="font-mono text-xl font-bold text-black mt-2">
                    {selectedProduct.currency}{selectedProduct.price.toFixed(2)}
                  </p>
                  
                  <p className="text-xs text-black/85 leading-relaxed mt-4">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-dashed border-black/20 space-y-2">
                    <p className="text-[11px] font-bold text-black">
                      <span className="text-black/85 font-medium">Material: </span>{selectedProduct.material}
                    </p>
                    <p className="text-[11px] font-bold text-black">
                      <span className="text-black/85 font-medium">Stones: </span>{selectedProduct.gemstones}
                    </p>
                  </div>

                  {/* Size Selector */}
                  <div className="mt-5">
                    <label className="block text-[11px] font-black uppercase tracking-wider text-black mb-2">
                      Select Ring Size (UK):
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1 text-xs font-bold border transition-all cursor-pointer ${
                            selectedSize === sz
                              ? 'bg-black text-white border-black'
                              : 'border-black/30 text-black hover:border-black'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  id="modal-add-to-cart"
                  onClick={handleModalAdd}
                  className="w-full bg-black text-white py-3.5 text-xs font-black uppercase tracking-[0.25em] hover:bg-black/90 active:scale-[0.99] transition-all cursor-pointer mt-6 flex items-center justify-center"
                >
                  <span>Add to Bag — {selectedProduct.currency}{selectedProduct.price.toFixed(2)}</span>
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
