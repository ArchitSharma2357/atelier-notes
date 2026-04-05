import { Link } from "react-router-dom";

export default function EmptyState({ title, copy, actionLabel, actionTo }) {
  return (
    <div className="border border-dashed border-black/15 bg-white/60 px-6 py-14 text-center">
      <h3 className="font-display text-3xl text-ink">{title}</h3>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone">{copy}</p>
      {actionLabel && actionTo ? (
        <Link
          className="pill-button mt-8 hover:-translate-y-0.5 hover:bg-[#17120f]"
          to={actionTo}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
