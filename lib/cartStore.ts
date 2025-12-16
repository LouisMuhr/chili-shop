// lib/cartStore.ts

import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void; // ← hier definieren
};

export const useCart = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) => set((state) => ({ items: [...state.items, { ...item, quantity: 1 }] })),

  removeItem: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  increaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      ),
    })),

  getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

  clearCart: () => set({ items: [] }), // ← hier die Funktion
}));

// Optional: separate export, falls du clearCart global nutzen willst
export const clearCart = () => useCart.getState().clearCart();