import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        aria-label="Shopping Bag"
        className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between border-l border-black/10"
      >
        {/* Header */}
        <div className="p-6 border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold tracking-tight text-black">
              BAG ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-black/5 text-black">
              Realised in London
            </span>
          </div>
          <button
            id="cart-drawer-close"
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 divide-y divide-black/5">
          {items.length === 0 ? (
            <div className="text-center py-24 space-y-3">
              <p className="text-lg font-bold text-black/90">Your bag is empty</p>
              <p className="text-xs text-black/75 tracking-wider uppercase">
                Explore the Shop to add limited edition castings.
              </p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.product.id}-${item.size}-${idx}`} className="pt-6 first:pt-0 flex gap-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover bg-black/5 border border-black/10"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-black uppercase">
                        {item.product.name}
                      </h4>
                      <p className="text-sm font-black text-black">
                        £{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="text-[11px] font-semibold tracking-wider text-black/80 mt-0.5">
                      Size: {item.size} • {item.product.material}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-black/20 text-xs font-bold">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                        className="px-2 py-1 hover:bg-black/5 transition-colors cursor-pointer"
                        title="Decrease"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-mono">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                        className="px-2 py-1 hover:bg-black/5 transition-colors cursor-pointer"
                        title="Increase"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      className="text-black/80 hover:text-black transition-colors p-1 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-black/10 bg-black/2 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black tracking-widest uppercase text-black/85">Subtotal</span>
              <span className="text-lg font-black text-black">
                £{subtotal.toFixed(2)}
              </span>
            </div>
            
            <p className="text-[10px] text-black/75 tracking-wider uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              Includes London hallmark certificate &amp; bespoke gift box
            </p>

            <button
              id="cart-checkout-button"
              onClick={onCheckout}
              className="w-full bg-black text-white py-4 font-black uppercase text-xs tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-black/90 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
