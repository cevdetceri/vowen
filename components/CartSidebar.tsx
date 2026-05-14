"use client";

import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/shopify";

export default function CartSidebar() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, loading } = useCart();

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const total = cart?.cost.totalAmount;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-[80] bg-black/40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[90] w-full max-w-[400px] bg-white flex flex-col transition-transform duration-300 ease-in-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#b89a72]" />
            <span className="text-[13px] tracking-[0.15em] uppercase font-inter text-[#1e1e1e]">
              Sepet {cart?.totalQuantity ? `(${cart.totalQuantity})` : ""}
            </span>
          </div>
          <button onClick={() => setCartOpen(false)} className="p-1 text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="w-10 h-10 text-gray-200" />
              <p className="text-[13px] text-gray-400 font-inter">Sepetiniz boş.</p>
              <button
                onClick={() => setCartOpen(false)}
                className="px-6 py-2.5 border border-[#1e1e1e] text-[11px] tracking-[0.2em] uppercase font-inter hover:bg-[#1e1e1e] hover:text-white transition-all duration-300"
              >
                Alışverişe Başla
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {lines.map((line) => (
                <div key={line.id} className="flex gap-4 py-4 border-b border-gray-100">
                  {/* Image */}
                  <div className="w-[80px] h-[100px] bg-[#f0ece6] shrink-0 relative overflow-hidden">
                    {line.merchandise.image ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={line.merchandise.image.altText ?? line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : null}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-light text-[#1e1e1e] leading-snug"
                      style={{ fontFamily: "var(--font-cormorant)" }}>
                      {line.merchandise.product.title}
                    </p>
                    <p className="text-[11px] text-gray-400 font-inter mt-0.5">{line.merchandise.title}</p>
                    <p className="text-[13px] text-[#1e1e1e] font-inter mt-1">
                      {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                    </p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(line.id, Math.max(1, line.quantity - 1))}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-40"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-[12px] font-inter">{line.quantity}</span>
                        <button
                          onClick={() => updateQuantity(line.id, line.quantity + 1)}
                          disabled={loading}
                          className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-40"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(line.id)}
                        disabled={loading}
                        className="text-[11px] text-gray-400 hover:text-red-500 font-inter disabled:opacity-40"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {lines.length > 0 && (
          <div className="px-6 py-5 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[12px] tracking-[0.1em] uppercase text-gray-500 font-inter">Toplam</span>
              <span className="text-[16px] font-light text-[#1e1e1e]" style={{ fontFamily: "var(--font-cormorant)" }}>
                {total ? formatPrice(total.amount, total.currencyCode) : "—"}
              </span>
            </div>
            <a
              href={cart?.checkoutUrl}
              className="block w-full py-3.5 bg-[#111111] text-white text-[11px] tracking-[0.2em] uppercase font-inter text-center hover:bg-[#b89a72] transition-all duration-300"
            >
              Ödemeye Geç
            </a>
            <p className="text-[10px] text-gray-400 text-center mt-3 font-inter">
              Kargo ve vergiler ödeme adımında hesaplanır.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
