import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="inline-flex items-center border border-black/10 bg-white">
      <button
        aria-label="Decrease quantity"
        className="inline-flex h-10 w-10 items-center justify-center border-r border-black/10 text-ink transition hover:bg-porcelain"
        onClick={onDecrease}
        type="button"
      >
        <Minus size={16} />
      </button>
      <span className="min-w-12 text-center text-sm font-semibold text-ink">{quantity}</span>
      <button
        aria-label="Increase quantity"
        className="inline-flex h-10 w-10 items-center justify-center border-l border-black/10 text-ink transition hover:bg-porcelain"
        onClick={onIncrease}
        type="button"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
