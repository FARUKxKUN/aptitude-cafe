"use client";

/**
 * Pure-CSS infinite marquee. Items duplicated, track translated -50% on loop.
 * Source: Truus.co Awwwards pattern.
 */
const TERMS = [
  "Single Origin",
  "Slow Roasted",
  "Saadiyat Island",
  "Specialty Coffee",
  "Est. 2017",
  "Al Fresco",
  "Louvre Abu Dhabi",
  "Freshly Baked",
];

export default function Marquee() {
  const items = [...TERMS, ...TERMS];

  return (
    <div
      style={{
        background: "var(--color-ink)",
        borderTop: "1px solid rgba(248,243,234,0.08)",
        borderBottom: "1px solid rgba(248,243,234,0.08)",
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "1.25rem 0",
      }}
    >
      <style>{`
        @keyframes apt-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .apt-marquee-track {
          display: inline-flex;
          gap: 0;
          animation: apt-marquee 32s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .apt-marquee-track { animation: none; }
        }
        .apt-marquee-item {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          color: var(--color-cream);
          padding: 0 2.5rem;
          display: inline-flex;
          align-items: center;
          gap: 2.5rem;
        }
        .apt-marquee-dot {
          width: 6px;
          height: 6px;
          background: var(--color-accent);
          display: inline-block;
        }
      `}</style>

      <div className="apt-marquee-track">
        {items.map((term, i) => (
          <span key={i} className="apt-marquee-item">
            {term}
            <span className="apt-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
