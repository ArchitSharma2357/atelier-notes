import { Link } from "react-router-dom";

function BrandMark({ className = "", inverse = false }) {
  const stroke = inverse ? "#FFFAF3" : "#231D18";
  const fill = inverse ? "#231D18" : "#FFF8EF";
  const accent = inverse ? "#E7D1C0" : "#9B6C45";

  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill={fill} height="76" stroke={stroke} strokeWidth="2.5" width="76" x="10" y="10" />
      <path
        d="M10 26L26 10M70 10L86 26M10 70L26 86M70 86L86 70"
        fill="none"
        stroke={accent}
        strokeWidth="2"
      />
      <path
        d="M25 66L43 24L61 66M31 52H55"
        fill="none"
        stroke={stroke}
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path
        d="M49 66V28L69 66V28"
        fill="none"
        stroke={stroke}
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth="4"
      />
      <path d="M70 18L78 26L70 34L62 26Z" fill={accent} />
      <circle cx="70" cy="26" fill={fill} r="2.2" />
    </svg>
  );
}

export default function BrandLogo({
  to = "/",
  className = "",
  inverse = false,
  compact = false,
  tagline = "Fine stationery and desk objects",
}) {
  const textColor = inverse ? "text-ivory" : "text-ink";
  const subColor = inverse ? "text-ivory/65" : "text-stone";

  return (
    <Link className={`flex items-center gap-4 ${className}`.trim()} to={to}>
      <BrandMark
        className={compact ? "h-11 w-11 shrink-0" : "h-12 w-12 shrink-0"}
        inverse={inverse}
      />
      <div className="min-w-0">
        <p className={`font-display text-[2rem] leading-none tracking-[0.02em] ${textColor}`}>
          Atelier Notes
        </p>
        <p className={`mt-1 text-[11px] uppercase tracking-[0.28em] ${subColor}`}>
          {tagline}
        </p>
      </div>
    </Link>
  );
}

