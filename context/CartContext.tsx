"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  ShopifyCart,
  createCart,
  addToCart as shopifyAddToCart,
  removeFromCart as shopifyRemoveFromCart,
  updateCartLine as shopifyUpdateCartLine,
} from "@/lib/shopify";

type CartContextType = {
  cart: ShopifyCart | null;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  totalQuantity: number;
  loading: boolean;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getOrCreateCart = useCallback(async (): Promise<ShopifyCart> => {
    const stored = localStorage.getItem("shopify_cart_id");
    if (stored && cart?.id === stored) return cart;
    const newCart = await createCart();
    localStorage.setItem("shopify_cart_id", newCart.id);
    setCart(newCart);
    return newCart;
  }, [cart]);

  useEffect(() => {
    // Warm up cart on mount if one exists
    const stored = localStorage.getItem("shopify_cart_id");
    if (stored) {
      createCart().then((c) => { setCart(c); localStorage.setItem("shopify_cart_id", c.id); });
    }
  }, []);

  const addToCart = async (variantId: string, quantity = 1) => {
    setLoading(true);
    try {
      const c = await getOrCreateCart();
      const updated = await shopifyAddToCart(c.id, variantId, quantity);
      setCart(updated);
      setCartOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (lineId: string) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updated = await shopifyRemoveFromCart(cart.id, lineId);
      setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cart) return;
    setLoading(true);
    try {
      const updated = await shopifyUpdateCartLine(cart.id, lineId, quantity);
      setCart(updated);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart, cartOpen, setCartOpen,
      addToCart, removeFromCart, updateQuantity,
      totalQuantity: cart?.totalQuantity ?? 0,
      loading,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
