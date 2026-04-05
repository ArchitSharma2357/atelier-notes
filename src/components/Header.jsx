import { ShoppingBag, Search } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { useCartCount } from "../store/useCartStore";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "Orders", to: "/orders" },
  { label: "Track", to: "/track" },
];

function navClassName({ isActive }) {
  return [
    "border-b px-1 pb-2 text-sm font-semibold uppercase tracking-[0.16em] transition",
    isActive ? "border-ink text-ink" : "border-transparent text-stone hover:border-black/20 hover:text-ink",
  ].join(" ");
}

export default function Header() {
  const cartCount = useCartCount();

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-porcelain/90 backdrop-blur-xl">
      <div className="page-shell flex items-center justify-between gap-8 py-5 lg:py-6">
        <BrandLogo />

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} className={navClassName} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden border border-black/10 bg-white/70 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone lg:block whitespace-nowrap">
            New season arrivals
          </div>
          <Link
            to="/products"
            className="hidden h-12 w-12 items-center justify-center border border-black/10 bg-white/72 text-ink transition hover:-translate-y-0.5 hover:bg-white sm:inline-flex"
            aria-label="Browse products"
          >
            <Search size={20} />
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex h-12 w-12 items-center justify-center border border-ink bg-ink text-ivory transition hover:-translate-y-0.5 shadow-sm"
            aria-label="Open cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 inline-flex min-w-[22px] h-[22px] items-center justify-center bg-blush px-1.5 py-0.5 text-[10px] font-bold text-ink shadow-sm">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>

      <div className="page-shell pb-4 md:hidden">
        <nav className="grid grid-cols-4 border border-black/10 bg-white/70 shadow-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                [
                  "px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] transition",
                  isActive ? "bg-ink text-ivory" : "text-stone hover:bg-white hover:text-ink",
                ].join(" ")
              }
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
