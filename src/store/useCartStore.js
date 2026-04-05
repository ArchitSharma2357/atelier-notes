import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const clampQuantity = (quantity) => Math.max(1, Math.min(99, quantity));

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) => {
        const nextQuantity = clampQuantity(quantity);
        const existing = get().items.find((item) => item.id === product.id);

        if (existing) {
          return set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: clampQuantity(item.quantity + nextQuantity) }
                : item,
            ),
          });
        }

        return set({
          items: [
            ...get().items,
            {
              id: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
              quantity: nextQuantity,
            },
          ],
        });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          return set({
            items: get().items.filter((item) => item.id !== productId),
          });
        }

        return set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity: clampQuantity(quantity) } : item,
          ),
        });
      },
      removeItem: (productId) =>
        set({
          items: get().items.filter((item) => item.id !== productId),
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "atelier-notes-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

export const useCartCount = () =>
  useCartStore((state) => state.items.reduce((count, item) => count + item.quantity, 0));

export const useCartSubtotal = () =>
  useCartStore((state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0));

