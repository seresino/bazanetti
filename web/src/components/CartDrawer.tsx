import React, { useEffect } from "react";
import { CartItem } from "../types";
import { X, Trash2, ShieldCheck } from "lucide-react";
import { TagButton } from "./TagButton";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onCheckout: () => void;
  note: string;
  onNoteChange: (note: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  note,
  onNoteChange,
}: CartDrawerProps) {
  // Lock page scroll behind the drawer (stops mobile chrome-collapse jolts)
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

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
          <span className="text-xl font-bold tracking-tight uppercase text-black">
            Cart
          </span>
          <button
            id="cart-drawer-close"
            onClick={onClose}
            className="p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer text-black"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-black/5">
          {items.length === 0 ? (
            <div className="text-center py-24 space-y-3">
              <p className="text-lg font-bold text-black/90">
                Your bag is empty
              </p>
              <p className="text-xs text-black/75 tracking-wider uppercase">
                Explore the Shop to add limited edition castings.
              </p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.size}-${idx}`}
                className="py-6 first:pt-0 flex gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover bg-white border border-black/10"
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
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.size, -1)
                        }
                        className="px-2 py-1 hover:bg-black/5 transition-colors cursor-pointer"
                        title="Decrease"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.product.id, item.size, 1)
                        }
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

        {/* Order note — above the subtotal divider */}
        {items.length > 0 && (
          <div className="px-6 pt-4 pb-8">
            <label
              htmlFor="order-note"
              className="text-[10px] font-black tracking-widest uppercase text-black/85 block mb-2"
            >
              Add a note to your order
            </label>
            <textarea
              id="order-note"
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              rows={2}
              className="w-full border border-black/30 focus:border-black outline-none p-3 text-xs font-haas font-normal text-black resize-none"
            />
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-black/10 bg-white space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black tracking-widest uppercase text-black/85">
                Subtotal
              </span>
              <span className="text-lg font-black text-black">
                £{subtotal.toFixed(2)}
              </span>
            </div>

            <p className="text-[10px] text-black/75 tracking-wider uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              Tax included and shipping calculated at checkout
            </p>

            <TagButton
              id="cart-checkout-button"
              label="Checkout"
              onClick={onCheckout}
              className="mx-auto"
            />
          </div>
        )}
      </aside>
    </div>
  );
}
