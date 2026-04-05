import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, inputRef }) {
  return (
    <label className="flex w-full items-center gap-3 border border-black/10 bg-white px-4 py-2.5 shadow-sm transition focus-within:border-ink/30 focus-within:shadow-card">
      <Search className="text-stone" size={18} />
      <input
        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-stone"
        ref={inputRef}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search notebooks, pens, sticky notes..."
        type="search"
        value={value}
      />
      {value ? (
        <button
          aria-label="Clear search"
          className="inline-flex h-7.5 w-7.5 items-center justify-center border border-black/10 bg-porcelain text-stone transition hover:bg-sand/50 hover:text-ink"
          onClick={() => onChange("")}
          type="button"
        >
          <X size={14} />
        </button>
      ) : null}
    </label>
  );
}
