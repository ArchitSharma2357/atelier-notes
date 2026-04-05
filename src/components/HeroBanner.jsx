import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { resolveAssetPath } from "../utils/assetPath";

export default function HeroBanner({ products = [] }) {
  const [lead, second, third] = products;

  return (
    <section className="page-shell pt-10 sm:pt-14 lg:pt-16">
      <div className="overflow-hidden border border-black/10 bg-gradient-to-br from-white via-[#f8f3eb] to-[#efe4d4] shadow-float">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border-b border-black/10 px-8 py-10 sm:px-12 sm:py-16 lg:border-b-0 lg:border-r lg:px-16 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-bronze">A Modern Paper House</p>
            <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[0.92] tracking-tight text-ink sm:text-7xl lg:text-8xl">
              Stationery with sharper lines and quieter presence.
            </h1>
            <p className="mt-10 max-w-2xl text-base leading-8 text-stone lg:text-lg">
              Journals, fountain pens, and desk essentials selected for texture, clarity, and a more considered way of working.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/products"
                className="pill-button px-8 py-4 hover:-translate-y-0.5 hover:bg-[#17120f]"
              >
                Shop the collection
                <ArrowRight className="ml-3" size={18} />
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center justify-center border border-black/12 bg-white/80 px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:-translate-y-0.5 hover:bg-white"
              >
                View cart
              </Link>
            </div>

            <div className="mt-16 grid gap-0 border border-black/10 sm:grid-cols-3 shadow-sm">
              {["Giftable packaging", "Thoughtful paper textures", "Everyday desk essentials"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3 border-b border-black/10 bg-white/55 px-5 py-4 text-xs font-semibold uppercase tracking-widest text-stone/80 last:border-b-0 sm:border-b-0 sm:border-r last:sm:border-r-0">
                    <CheckCircle2 className="text-bronze" size={14} />
                    <span>{item}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col bg-[#efe5d7]">
            <div className="grid min-h-[600px] flex-1 grid-cols-[1fr_0.8fr] gap-4 p-4 sm:gap-6 sm:p-6">
              <div className="relative overflow-hidden border border-black/10 bg-white shadow-sm group">
                {lead ? (
                  <img
                    alt={lead.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    decoding="async"
                    loading="lazy"
                    src={resolveAssetPath(lead.image)}
                  />
                ) : null}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-6 py-6 text-white">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/80 font-semibold">Featured</p>
                  <p className="mt-2 font-display text-3xl leading-none">{lead?.name ?? "Seasonal pick"}</p>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="border border-black/10 bg-ink px-6 py-8 text-ivory shadow-sm">
                  <div className="flex items-center gap-2 text-ivory/70">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Seasonal Edit</span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl leading-tight">Desk pieces that feel composed, not overdesigned.</h3>
                  <p className="mt-5 text-sm leading-8 text-ivory/75">
                    Editorial curation, practical luxury, and a calmer rhythm from homepage to checkout.
                  </p>
                </div>

                <div className="grid flex-1 grid-cols-2 gap-4 sm:gap-6">
                  {[second, third].map((item, index) => (
                    <div key={item?.id ?? index} className="overflow-hidden border border-black/10 bg-white shadow-sm group">
                      {item ? (
                        <img
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          decoding="async"
                          loading="lazy"
                          src={resolveAssetPath(item.image)}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
