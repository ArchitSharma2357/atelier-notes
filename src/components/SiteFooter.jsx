import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-black/10 bg-white/60">
      <div className="page-shell grid gap-12 py-16 lg:grid-cols-3 lg:gap-8 lg:py-24">
        <div className="border-b border-black/10 pb-12 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
          <BrandLogo className="mb-6" compact />
          <p className="font-display text-4xl leading-tight text-ink">Made for slower desks and sharper notes.</p>
          <p className="mt-6 max-w-md text-sm leading-8 text-stone">
            Atelier Notes brings together journals, writing tools, and desk essentials with a calm,
            tactile point of view. Everything is chosen to feel useful, giftable, and easy to live with.
          </p>
        </div>

        <div className="border-b border-black/10 pb-12 lg:border-b-0 lg:border-r lg:px-12 lg:pb-0">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone">Explore Collection</p>
          <div className="mt-6 space-y-4 text-sm text-ink">
            <Link className="block transition hover:text-bronze" to="/">
              Home
            </Link>
            <Link className="block transition hover:text-bronze" to="/products">
              Shop All
            </Link>
            <Link className="block transition hover:text-bronze" to="/cart">
              Cart
            </Link>
            <Link className="block transition hover:text-bronze" to="/orders">
              Track Orders
            </Link>
          </div>
        </div>

        <div className="lg:pl-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone">Customer Care</p>
          <div className="mt-6 space-y-6 text-sm leading-8 text-stone">
            <p>Complimentary shipping over {formatPrice(799)} and careful packing for gifting-worthy deliveries.</p>
            <p>Need help choosing a journal or pen? Start with the curated collection and featured edits for a collected desk.</p>
            <div className="pt-2">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone/60">© {new Date().getFullYear()} Atelier Notes Studio</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const formatPrice = (price) => `Rs. ${price}`;
