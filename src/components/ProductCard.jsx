import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartActions } from "../hooks/useCartActions";
import { resolveAssetPath } from "../utils/assetPath";
import { formatPrice } from "../utils/formatters";

export default function ProductCard({ product }) {
  const { addToCart } = useCartActions();
  const discount =
    product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

  return (
    <article className="group paper-card overflow-hidden border">
      <Link className="block" to={`/products/${product.slug}`}>
        <div className="relative aspect-[0.9] overflow-hidden bg-[#f8f1e7]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/15 via-transparent to-white/10 opacity-70" />
          <img
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            decoding="async"
            loading="lazy"
            src={resolveAssetPath(product.image)}
          />
          <span className="absolute left-4 top-4 z-20 border border-black/10 bg-white/92 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">
            {product.badge}
          </span>
          {discount ? (
            <span className="absolute bottom-4 left-4 z-20 border border-black/10 bg-blush/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">
              Save {discount}%
            </span>
          ) : null}
          <span className="absolute right-4 top-4 z-20 border border-white/20 bg-ink/80 p-2 text-ivory opacity-0 transition group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </Link>

      <div className="space-y-4 p-6 lg:p-7">
        <div>
          <div className="flex items-center justify-between gap-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-bronze">{product.category}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-stone/70">{product.inventory} in stock</p>
          </div>
          <Link to={`/products/${product.slug}`}>
            <h3 className="mt-3 line-clamp-2 text-xl font-semibold leading-tight text-ink transition group-hover:text-bronze">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2.5 line-clamp-2 text-sm leading-7 text-stone">{product.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          {product.highlights.slice(0, 2).map((highlight) => (
            <span
              key={highlight}
              className="border border-black/10 bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-stone shadow-sm"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <div>
            <p className="text-xl font-semibold text-ink">{formatPrice(product.price)}</p>
            {product.originalPrice > product.price ? (
              <p className="text-sm text-stone line-through">{formatPrice(product.originalPrice)}</p>
            ) : null}
          </div>
          <button
            className="inline-flex h-12 items-center gap-3 border border-ink bg-ink px-6 text-xs font-semibold uppercase tracking-[0.16em] text-ivory transition hover:-translate-y-0.5 hover:bg-[#17120f] active:scale-95 shadow-sm"
            onClick={() => addToCart(product)}
            type="button"
          >
            <ShoppingBag size={18} />
            Add to bag
          </button>
        </div>
      </div>
    </article>
  );
}
