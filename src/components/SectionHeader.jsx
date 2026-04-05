export default function SectionHeader({ eyebrow, title, copy, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      {eyebrow ? (
        <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-bronze mb-4">{eyebrow}</p>
      ) : null}
      <h2 className="section-title">{title}</h2>
      {copy ? <p className="section-copy mt-6 lg:text-base">{copy}</p> : null}
    </div>
  );
}
