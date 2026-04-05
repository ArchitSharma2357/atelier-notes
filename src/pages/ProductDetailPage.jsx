import { ArrowLeft, Check, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import ProductGrid from "../components/ProductGrid";
import ProductSkeletonCard from "../components/ProductSkeletonCard";
import QuantityStepper from "../components/QuantityStepper";
import SectionHeader from "../components/SectionHeader";
import { useCartActions } from "../hooks/useCartActions";
import { useCatalog } from "../hooks/useCatalog";
import { resolveAssetPath } from "../utils/assetPath";
import { trackViewItem } from "../utils/analytics";
import { formatPrice } from "../utils/formatters";
import { getRelatedProducts } from "../utils/productHelpers";

function ProductDetailSkeleton() {
  return (
    <div className="grid animate-pulse gap-8 lg:grid-cols-[1fr_0.9fr]">
      <div className="aspect-square bg-[#eadfce]" />
      <div className="space-y-4">
        <div className="h-3 w-24 bg-[#dbcdb8]" />
        <div className="h-10 w-full bg-[#e8dccd]" />
        <div className="h-10 w-4/5 bg-[#e8dccd]" />
        <div className="h-5 w-32 bg-[#e0d2c0]" />
        <div className="h-4 w-full bg-[#efe5d9]" />
        <div className="h-4 w-11/12 bg-[#efe5d9]" />
        <div className="h-4 w-10/12 bg-[#efe5d9]" />
        <div className="h-14 w-44 bg-[#dbcab6]" />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCartActions();
  const { products, isLoading } = useCatalog();
  const [quantity, setQuantity] = useState(1);

  const product = useMemo(
    () => products.find((candidate) => candidate.slug === slug),
    [products, slug],
  );

  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(products, product) : []),
    [product, products],
  );

  useEffect(() => {
    if (product) {
      trackViewItem(product);
      document.title = `${product.name} • Atelier Notes`;
    }

    return () => {
      document.title = "Atelier Notes";
    };
  }, [product]);

  if (isLoading) {
    return (
      <div className="page-shell page-frame">
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="page-shell page-frame">
        <EmptyState
          actionLabel="Return to catalog"
          actionTo="/products"
          copy="The product you requested is not available right now. Explore the rest of the collection instead."
          title="Product not found"
        />
      </div>
    );
  }

  return (
    <div className="page-shell page-frame">
      <Link
        className="inline-flex items-center gap-2 text-sm font-semibold text-stone transition hover:text-ink"
        to="/products"
      >
        <ArrowLeft size={18} />
        Back to collection
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <div className="overflow-hidden border border-black/10 bg-white/70 shadow-card">
            <img
              alt={product.name}
              className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
              decoding="async"
              src={resolveAssetPath(product.image)}
            />
          </div>
          <div className="grid gap-0 border border-black/10 bg-white/70 shadow-sm sm:grid-cols-3">
              <div className="border-b border-black/10 bg-ivory p-6 sm:border-b-0 sm:border-r">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone">Material-led</p>
                <p className="mt-3 text-sm leading-7 text-ink">Chosen for touch, finish, and everyday durability.</p>
              </div>
            <div className="border-b border-black/10 bg-ivory p-6 sm:border-b-0 sm:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone">Gift-friendly</p>
              <p className="mt-3 text-sm leading-7 text-ink">A thoughtful pick for worktables, studies, and gifting lists.</p>
            </div>
            <div className="bg-ivory p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone">Well paired</p>
              <p className="mt-3 text-sm leading-7 text-ink">Designed to sit naturally beside journals, pens, and desk tools.</p>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {product.gallery.slice(0, 2).map((image, index) => (
              <div key={image} className="overflow-hidden border border-black/10 bg-white/70 shadow-sm">
                <img
                  alt={`${product.name} view ${index + 1}`}
                  className="aspect-[1.1] w-full object-cover transition-transform duration-700 hover:scale-105"
                  decoding="async"
                  loading="lazy"
                  src={resolveAssetPath(image)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-fit border border-black/10 bg-white/75 p-8 shadow-card lg:sticky lg:top-28">
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-bronze">{product.category}</p>
            <span className="border border-black/10 bg-ivory px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">
              {product.badge}
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl leading-tight text-ink lg:text-5xl">{product.name}</h1>
          <p className="mt-5 text-base leading-8 text-stone">{product.tagline}</p>
          {product.description && product.description !== product.tagline ? (
            <p className="mt-4 text-sm leading-8 text-stone/80">{product.description}</p>
          ) : null}

          <div className="mt-8 flex items-end gap-4">
            <p className="text-4xl font-semibold text-ink">{formatPrice(product.price)}</p>
            {product.originalPrice > product.price ? (
              <p className="pb-1 text-lg text-stone line-through">{formatPrice(product.originalPrice)}</p>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <QuantityStepper
              onDecrease={() => setQuantity((current) => Math.max(1, current - 1))}
              onIncrease={() => setQuantity((current) => Math.min(product.inventory || 99, current + 1))}
              quantity={quantity}
            />
            <p className="text-sm text-stone">
              <span className="font-semibold text-ink">{formatPrice(product.price * quantity)}</span> for this selection
            </p>
          </div>

          <div className="mt-10 space-y-4 border border-black/10 bg-ivory p-6">
            {product.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3 text-sm leading-7 text-stone">
                <Check className="mt-1 text-bronze" size={18} />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              className="pill-button w-full flex-1 hover:-translate-y-0.5 hover:bg-[#17120f]"
              onClick={() => addToCart(product, quantity)}
              type="button"
            >
              <ShoppingBag className="mr-3" size={18} />
              Add to cart
            </button>
            <Link
              className="inline-flex flex-1 items-center justify-center border border-black/10 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:-translate-y-0.5 hover:bg-porcelain"
              to="/cart"
            >
              Go to cart
            </Link>
          </div>

          <div className="mt-10 grid gap-0 border border-black/10 bg-white/80 sm:grid-cols-2">
            <div className="flex items-start gap-4 border-b border-black/10 bg-porcelain p-6 sm:border-b-0 sm:border-r">
              <Truck className="mt-1 text-bronze" size={20} />
              <div>
                <p className="text-sm font-semibold text-ink">Reliable Shipping</p>
                <p className="mt-2 text-xs leading-6 text-stone">Dispatched in 2-4 days, wrapped with care.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-porcelain p-6">
              <ShieldCheck className="mt-1 text-bronze" size={20} />
              <div>
                <p className="text-sm font-semibold text-ink">Secure flow</p>
                <p className="mt-2 text-xs leading-6 text-stone">Safe checkout and remembered bag.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-0 border border-black/10 bg-white sm:grid-cols-2">
            <div className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">Availability</p>
              <p className="mt-2 text-sm font-semibold text-ink">
                {product.inStock ? `${product.inventory} units ready` : "Out of stock"}
              </p>
            </div>
            <div className="border-t border-black/10 p-6 sm:border-l sm:border-t-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone">Packaging</p>
              <p className="mt-2 text-sm text-ink">Gift-worthy delivery as standard.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-24">
        <SectionHeader
          eyebrow="You May Also Like"
          title="More from the same collection"
          copy="A few nearby pieces that pair naturally with this product."
        />

        <div className="mt-12">
          {relatedProducts.length ? (
            <ProductGrid products={relatedProducts} />
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }, (_, index) => (
                <ProductSkeletonCard key={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
