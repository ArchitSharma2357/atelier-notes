import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { resolveAssetPath } from "../utils/assetPath";
import { formatPrice } from "../utils/formatters";
import QuantityStepper from "./QuantityStepper";

export default function CartLineItem({ item }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <article className="grid gap-4 border border-black/10 bg-white/60 p-4 transition-all hover:bg-white sm:grid-cols-[120px_1fr_auto] sm:p-5">
      <Link
        className="aspect-[4/5] overflow-hidden border border-black/10 bg-[#f8f1e7] sm:aspect-square"
        to={`/products/${item.slug}`}
      >
        <img
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          decoding="async"
          loading="lazy"
          src={resolveAssetPath(item.image)}
        />
      </Link>

      <div className="flex flex-col justify-between py-0.5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-bronze">{item.category}</p>
          <Link className="mt-1 block text-lg font-display text-ink hover:text-bronze transition-colors" to={`/products/${item.slug}`}>
            {item.name}
          </Link>
          <p className="mt-1 text-sm text-stone/80 font-medium">{formatPrice(item.price)}</p>
        </div>

        <div className="mt-4 flex items-center gap-6">
          <QuantityStepper
            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
            quantity={item.quantity}
          />
          <button
            className="text-[10px] font-bold uppercase tracking-widest text-stone/60 hover:text-ink transition-colors underline underline-offset-4"
            onClick={() => removeItem(item.id)}
            type="button"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between py-0.5">
        <div className="text-right">
          <p className="text-xl font-semibold text-ink">{formatPrice(item.price * item.quantity)}</p>
        </div>

        <div className="hidden sm:block">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-stone/40">
            In stock
          </span>
        </div>
      </div>
    </article>
  );
}
