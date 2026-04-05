import { ArrowRight, ShieldCheck, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import CartLineItem from "../components/CartLineItem";
import EmptyState from "../components/EmptyState";
import SectionHeader from "../components/SectionHeader";
import { useCartActions } from "../hooks/useCartActions";
import { useCartStore, useCartSubtotal } from "../store/useCartStore";
import { formatPrice } from "../utils/formatters";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartSubtotal();
  const shipping = subtotal === 0 ? 0 : subtotal >= 799 ? 0 : 79;
  const total = subtotal + shipping;
  const { beginCheckout } = useCartActions();

  return (
    <div className="page-shell page-frame">
      <SectionHeader
        eyebrow="Cart"
        title="Review your selection before checkout."
        copy="Adjust quantities, remove items, and continue browsing until the order feels just right."
      />

      {items.length ? (
        <div className="mt-12 grid gap-12 xl:grid-cols-[1.1fr_0.7fr]">
          <div className="space-y-6">
            {items.map((item) => (
              <CartLineItem item={item} key={item.id} />
            ))}
          </div>

          <aside className="h-fit space-y-8 lg:sticky lg:top-28">
            <div className="border border-black/10 bg-white/80 p-8 shadow-card sm:p-10">
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-bronze mb-8">Order Summary</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between text-stone">
                  <span>Subtotal</span>
                  <span className="font-semibold text-ink">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-stone">
                  <span>Shipping</span>
                  <span className="font-semibold text-ink">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                {shipping !== 0 && (
                  <p className="text-[11px] text-stone/70">
                    Free shipping on orders over {formatPrice(799)}
                  </p>
                )}
                <div className="h-px bg-sand my-6" />
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold text-ink uppercase tracking-wider">Total</span>
                  <span className="font-bold text-ink text-xl">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                className="w-full bg-ink text-ivory py-5 px-6 mt-10 font-semibold uppercase tracking-[0.16em] text-xs transition-all hover:bg-bronze active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
                onClick={() => beginCheckout(total)}
                type="button"
              >
                Complete Purchase
                <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-stone/60">
                <ShieldCheck size={14} />
                Secure Checkout Powered by Atelier
              </div>

              <Link
                className="mt-6 inline-flex w-full items-center justify-center border border-black/10 bg-white px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-stone transition hover:text-ink hover:bg-porcelain"
                to="/products"
              >
                Continue browsing
              </Link>
            </div>

            <div className="border border-black/10 bg-[#f9f7f4] p-8">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-bronze mt-1" size={20} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink mb-2">Guaranteed Delivery</p>
                  <p className="text-xs text-stone leading-8">
                    Standard shipping: 3-5 business days. Your items are carefully packaged for safe transit.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <div className="mt-12 py-12">
          <EmptyState
            actionLabel="Browse products"
            actionTo="/products"
            copy="Your cart is empty right now. Add a journal, pen, or desk essential to begin building your order."
            title="Nothing in the cart yet"
          />
          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-stone">
            <ShoppingBag size={20} />
            Save pieces as you browse and return when you are ready to check out.
          </div>
        </div>
      )}
    </div>
  );
}
