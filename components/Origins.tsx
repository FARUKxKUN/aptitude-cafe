"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BEANS = [
  { country: "Panama",   region: "Boquete",     note: "Floral, jasmine, bright" },
  { country: "Colombia", region: "Huila",       note: "Caramel, red fruit, smooth" },
  { country: "Brazil",   region: "Cerrado",     note: "Chocolate, nuts, full body" },
  { country: "Ethiopia", region: "Yirgacheffe", note: "Berry, citrus, complex" },
];

export default function Origins() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !listRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const rows = listRef.current!.querySelectorAll(".bean-row");
      gsap.from(rows, {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--color-ink)", padding: "7rem 3rem" }}
    >
      <style>{`
        .origins-shell { max-width: 1200px; margin: 0 auto; }
        .bean-row {
          position: relative;
          display: grid;
          grid-template-columns: 5rem 1fr auto;
          align-items: baseline;
          gap: 2rem;
          padding: 2rem 1.5rem;
          border-top: 1px solid rgba(248,243,234,0.12);
          cursor: pointer;
          overflow: hidden;
        }
        .bean-row:last-child { border-bottom: 1px solid rgba(248,243,234,0.12); }
        /* terracotta wipe fill */
        .bean-row::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--color-accent);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.45s cubic-bezier(0.65,0,0.35,1);
          z-index: 0;
        }
        .bean-row:hover::before { transform: scaleX(1); }
        .bean-row > * { position: relative; z-index: 1; }
        .bean-index {
          font-family: var(--font-body);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          color: var(--color-accent-alt);
          transition: color 0.3s;
        }
        .bean-country {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 300;
          color: var(--color-cream);
          line-height: 1;
          transition: transform 0.4s cubic-bezier(0.65,0,0.35,1);
        }
        .bean-meta {
          text-align: right;
          transition: transform 0.4s cubic-bezier(0.65,0,0.35,1);
        }
        .bean-region {
          font-family: var(--font-body);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent-alt);
          transition: color 0.3s;
        }
        .bean-note {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: rgba(248,243,234,0.7);
          margin-top: 0.4rem;
          transition: color 0.3s;
        }
        .bean-row:hover .bean-index,
        .bean-row:hover .bean-region { color: var(--color-cream); }
        .bean-row:hover .bean-note { color: rgba(248,243,234,0.95); }
        .bean-row:hover .bean-country { transform: translateX(12px); }
        .bean-row:hover .bean-meta { transform: translateX(-8px); }
        @media (max-width: 700px) {
          .bean-row {
            grid-template-columns: 3rem 1fr;
            gap: 1rem 1.25rem;
            padding: 1.5rem 1rem;
          }
          .bean-meta { grid-column: 2; text-align: left; }
          .bean-meta { transform: none !important; }
        }
      `}</style>

      <div className="origins-shell">
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            color: "var(--color-accent-alt)",
            textTransform: "uppercase",
          }}
        >
          No.02 / The Beans
        </p>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            fontWeight: 300,
            color: "var(--color-cream)",
            marginTop: "1rem",
            marginBottom: "3.5rem",
            lineHeight: 1.1,
          }}
        >
          Ethically sourced.<br />
          Consciously roasted.
        </h2>

        <div ref={listRef}>
          {BEANS.map((bean, i) => (
            <div key={bean.country} className="bean-row">
              <span className="bean-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="bean-country">{bean.country}</span>
              <span className="bean-meta">
                <span className="bean-region">{bean.region}</span>
                <span className="bean-note" style={{ display: "block" }}>
                  {bean.note}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
