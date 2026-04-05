import { ArrowRight, Leaf, Package, PenTool } from "lucide-react";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import ProductGrid from "../components/ProductGrid";
import ProductSkeletonCard from "../components/ProductSkeletonCard";
import SectionHeader from "../components/SectionHeader";
import { useCatalog } from "../hooks/useCatalog";

const promiseCards = [
  {
    icon: PenTool,
    title: "Writing-led curation",
    copy: "Paper, pens, and desk tools selected for texture, clarity, and everyday pleasure.",
  },
  {
    icon: Leaf,
    title: "Thoughtful materials",
    copy: "Cotton paper, recycled notebooks, and durable desk pieces bring warmth and longevity to the collection.",
  },
  {
    icon: Package,
    title: "Wrapped with intention",
    copy: "A store experience designed to feel calm, giftable, and easy to browse from first glance to checkout.",
  },
];

const collectionCards = [
  {
    title: "Journals & Notebooks",
    copy: "Soft paper textures, tactile covers, and practical sizes for lists, letters, and slower thoughts.",
  },
  {
    title: "Writing Instruments",
    copy: "Fountain pens and desk writers chosen for comfort in hand and a more expressive line on paper.",
  },
  {
    title: "Desk Companions",
    copy: "Sticky notes, staplers, and tidy tools that keep the worktable composed without feeling clinical.",
  },
];

const editorialNotes = [
  "Pieces chosen for touch, tone, and usefulness rather than endless volume.",
  "A restrained palette and quiet layout that lets the products do the talking.",
  "A shopping flow that stays smooth on mobile, desktop, and gifting journeys.",
  "Details like loading states, saved carts, and quick browsing built into the experience.",
];

export default function HomePage() {
  const { products, isLoading } = useCatalog();
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

  return (
    <div>
      <HeroBanner products={featuredProducts} />

      <section className="section-container">
        <div className="grid gap-8 lg:grid-cols-3">
          {promiseCards.map(({ icon: Icon, title, copy }) => (
            <article key={title} className="paper-card border p-8">
              <div className="inline-flex border border-black/10 bg-ivory p-3 text-bronze">
                <Icon size={24} />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-8 text-stone">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-container">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <SectionHeader
            eyebrow="Shop By Mood"
            title="Everything here belongs on a calm, well-used table."
            copy="Instead of feeling like a marketplace, the collection is arranged like a small paper shop: tactile, purposeful, and easy to move through."
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {collectionCards.map((collection) => (
              <article key={collection.title} className="paper-card border p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bronze">Collection</p>
                <h3 className="mt-4 font-display text-2xl text-ink">{collection.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone">{collection.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Featured Selection"
            title="Best-loved pieces for a more collected everyday desk."
            copy="A tighter edit of customer favourites, tactile notebooks, and polished writing instruments."
          />
          <Link
            className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-bronze"
            to="/products"
          >
            View all products
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-12">
          {isLoading ? (
            <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => (
                <ProductSkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </div>
      </section>

      <section className="section-container">
        <div className="grid gap-0 border border-black/10 bg-white/75 shadow-card lg:grid-cols-[1fr_1.1fr]">
          <div className="p-8 lg:border-r border-black/10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-bronze">Our Approach</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-ink lg:text-5xl">
              A stationery store should feel composed before it feels busy.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-8 text-stone lg:text-base">
              Atelier Notes is shaped around thoughtful product discovery, elegant spacing, and a product story that feels warm rather than transactional.
            </p>
          </div>
          <div className="grid gap-0 border-t border-black/10 lg:border-t-0 sm:grid-cols-2">
            {editorialNotes.map((item) => (
              <div key={item} className="border-b border-black/10 bg-ivory p-8 text-sm leading-8 text-stone even:sm:border-l last:border-b-0 sm:[&:nth-last-child(2)]:border-b-0">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container">
        <div className="overflow-hidden border border-black/10 bg-ink px-8 py-12 text-ivory shadow-float sm:px-12 lg:px-16 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ivory/70">From The Studio</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
                For journals that invite longer entries and tools that make the desk feel finished.
              </h2>
            </div>
            <div className="space-y-6 text-sm leading-8 text-ivory/75 lg:text-base">
              <p>
                The best stationery never shouts. It supports routine, slows the hand down, and makes even simple notes feel a little more considered.
              </p>
              <Link
                className="inline-flex items-center gap-2 text-sm font-semibold text-ivory transition hover:text-blush"
                to="/products"
              >
                Discover the full collection
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
