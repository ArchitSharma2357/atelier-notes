import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import EmptyState from "../components/EmptyState";
import ProductGrid from "../components/ProductGrid";
import ProductSkeletonCard from "../components/ProductSkeletonCard";
import SearchBar from "../components/SearchBar";
import SectionHeader from "../components/SectionHeader";
import { useCatalog } from "../hooks/useCatalog";
import { normalizeSearchText, scoreProduct, sortProducts } from "../utils/search";

const quickSearches = ["Cotton paper", "Fountain pen", "Sticky notes", "Desk essentials"];

export default function ProductsPage() {
  const { products, categories, isLoading } = useCatalog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const searchInputRef = useRef(null);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeSearchText(deferredSearchQuery);

    const items = products
      .filter((product) => {
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesSearch = !normalizedQuery || scoreProduct(product, normalizedQuery) > 0;

        return matchesCategory && matchesSearch;
      })
      .map((product) => ({
        product,
        score: normalizedQuery ? scoreProduct(product, normalizedQuery) : 0,
      }));

    if (normalizedQuery) {
      return items
        .sort((a, b) => b.score - a.score || a.product.name.localeCompare(b.product.name))
        .map(({ product }) => product);
    }

    return sortProducts(
      items.map(({ product }) => product),
      sortBy,
    );
  }, [deferredSearchQuery, products, selectedCategory, sortBy]);

  const quickMatches = useMemo(() => {
    return quickSearches.filter((term) => {
      const matchesCategory =
        selectedCategory === "All" || filteredProducts.some((product) => product.category === selectedCategory);
      const sameAsCurrent = normalizeSearchText(term) === normalizeSearchText(searchQuery);

      return matchesCategory && !sameAsCurrent;
    });
  }, [filteredProducts, searchQuery, selectedCategory]);

  const categoryLabel = selectedCategory === "All" ? "Entire Collection" : selectedCategory;
  const hasActiveFilters = selectedCategory !== "All" || Boolean(searchQuery);
  const resultSummary = searchQuery
    ? `Showing ${filteredProducts.length} result${filteredProducts.length === 1 ? "" : "s"} for "${searchQuery}"`
    : `Showing ${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} in ${categoryLabel}`;

  useEffect(() => {
    const onKeyDown = (event) => {
      const activeTag = document.activeElement?.tagName;
      const isTypingField =
        activeTag === "INPUT" || activeTag === "TEXTAREA" || document.activeElement?.isContentEditable;

      if (event.key === "/" && !isTypingField) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === "Escape" && document.activeElement === searchInputRef.current) {
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="page-shell page-frame">
      <SectionHeader
        eyebrow="Catalog"
        title="A refined mix of journals, pens, desk notes, and worktable essentials."
        copy="Browse by category, search for a favourite, and discover tactile pieces selected for everyday writing and a calmer desk."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border border-black/10 bg-white/75 p-8 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-bronze">Browse Notes</p>
          <h3 className="mt-4 font-display text-3xl text-ink lg:text-4xl">Find the right piece by mood, material, or purpose.</h3>
          <p className="mt-4 text-sm leading-8 text-stone">
            Search for a familiar item or use the category chips to move through journals, writing tools, and desk companions.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-stone/60">
            Tip: press `/` to focus search
          </p>
        </div>

        <div className="flex flex-col justify-center border border-black/10 bg-white/70 p-6 shadow-sm sm:p-8">
          <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
            <SearchBar inputRef={searchInputRef} onChange={setSearchQuery} value={searchQuery} />
            <label className="flex items-center gap-3 border border-black/10 bg-white px-5 py-3 text-sm text-stone">
              <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em]">Sort</span>
              <select
                className="w-full bg-transparent font-semibold text-ink outline-none"
                onChange={(event) => setSortBy(event.target.value)}
                value={sortBy}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>

          <div className="mt-4">
            <CategoryFilter
              categories={categories}
              onSelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="border border-black/10 bg-white/70 px-6 py-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone">Showing</p>
          <p className="mt-1.5 text-base font-semibold text-ink">{isLoading ? "Loading..." : `${filteredProducts.length} products`}</p>
        </div>
        <div className="border border-black/10 bg-white/70 px-6 py-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone">Category</p>
          <p className="mt-1.5 text-base font-semibold text-ink">{categoryLabel}</p>
        </div>
        <div className="border border-black/10 bg-white/70 px-6 py-4 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone">Search</p>
          <p className="mt-1.5 truncate text-base font-semibold text-ink">{searchQuery || "No keyword applied"}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border border-black/10 bg-white/75 px-6 py-4 text-sm text-stone sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className="font-medium text-ink">
          {resultSummary}
        </p>
        <div className="flex flex-wrap gap-2.5">
          {quickMatches.map((term) => (
            <button
              key={term}
              className="border border-black/10 bg-[#fbf6ef] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone transition hover:border-ink/25 hover:text-ink"
              onClick={() => {
                setSearchQuery(term);
                searchInputRef.current?.focus();
              }}
              type="button"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {hasActiveFilters ? (
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border border-black/10 bg-white/75 px-6 py-5 text-sm text-stone sm:flex-row sm:items-center">
          <p>Filters are active. Clear them to return to the full collection.</p>
          <button
            className="border border-ink bg-ink px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-ivory transition hover:bg-[#17120f]"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setSortBy("featured");
            }}
            type="button"
          >
            Clear all
          </button>
        </div>
      ) : null}

      <div className="mt-12">
        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <ProductSkeletonCard key={index} />
            ))}
          </div>
        ) : filteredProducts.length ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <EmptyState
            actionLabel="Reset filters"
            actionTo="/products"
            copy="No products match the current search. Try a broader keyword like fountain pen, cotton paper, or desk essentials."
            title="Nothing matched this pass"
          />
        )}
      </div>
    </div>
  );
}
