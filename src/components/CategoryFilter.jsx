export default function CategoryFilter({ categories, selectedCategory, onSelect }) {
  return (
    <div className="border border-black/10 bg-white">
      <div className="border-b border-black/10 px-3.5 py-2">
        <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-stone">Browse by Category</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5">
        {categories.map((category) => {
          const isActive = category === selectedCategory;

          return (
            <button
              key={category}
              className={[
                "border-r border-t border-black/10 px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] leading-tight transition duration-300 first:border-t-0 sm:[&:nth-child(-n+3)]:border-t-0 xl:[&:nth-child(-n+5)]:border-t-0 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(3n)]:border-r-0 xl:[&:nth-child(5n)]:border-r-0",
                isActive
                  ? "bg-ink text-ivory"
                  : "bg-white text-stone hover:bg-[#fbf6ef] hover:text-ink",
              ].join(" ")}
              onClick={() => onSelect(category)}
              type="button"
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
