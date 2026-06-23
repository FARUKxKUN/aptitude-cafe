"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

/**
 * Orange-bar experiment. Flip to `false` to return to the original
 * transparent-over-hero -> solid-ink-on-scroll behavior.
 */
const ORANGE_NAV = true;

type Props = {
  /** Pages without a hero start solid so the nav is always legible. */
  solid?: boolean;
};

/** Aptitude mark - two kissing circles, inherits currentColor, no tile. */
function AptitudeMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size * 0.5}
      height={size}
      viewBox="0 0 32 64"
      fill="currentColor"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <circle cx="16" cy="16" r="15.5" />
      <circle cx="16" cy="48" r="15.5" />
    </svg>
  );
}

export default function Nav({ solid = false }: Props) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // With the orange bar the nav is always solid - no scroll toggle needed.
    if (ORANGE_NAV || solid || !navRef.current) return;
    const nav = navRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#hero",
        start: "bottom top",
        onEnter: () => nav.classList.add("nav-solid"),
        onLeaveBack: () => nav.classList.remove("nav-solid"),
      });
    });

    return () => ctx.revert();
  }, [solid]);

  // 30% terracotta with a slight blur so text stays legible over the hero video.
  const navBg = ORANGE_NAV ? "rgba(139, 58, 42, 0.3)" : "transparent";

  return (
    <>
      <style>{`
        .nav-base {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 3rem;
          transition: background 0.3s ease;
        }
        .nav-solid { background: var(--color-ink); }
        .nav-logo-lockup {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--color-cream);
          text-decoration: none;
        }
        .nav-logo-word {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: 1.4rem;
          letter-spacing: 0.02em;
          line-height: 1;
          color: var(--color-cream);
        }
        .nav-link {
          position: relative;
          font-family: var(--font-body);
          color: var(--color-cream);
          font-size: 0.875rem;
          text-decoration: none;
          letter-spacing: 0.04em;
          padding: 0.25rem 0;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0; bottom: -2px;
          height: 1px; width: 100%;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.3s cubic-bezier(0.65,0,0.35,1);
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-book {
          font-family: var(--font-body);
          background: ${ORANGE_NAV ? "var(--color-ink)" : "var(--color-accent)"};
          color: var(--color-cream);
          font-size: 0.875rem;
          text-decoration: none;
          padding: 0.6rem 1.4rem;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          letter-spacing: 0.04em;
          transition: background 0.25s, color 0.25s;
        }
        .nav-book:hover {
          background: var(--color-cream);
          color: var(--color-ink);
        }
        @media (max-width: 768px) {
          .nav-base { padding: 0.75rem 1.5rem; }
          .nav-links { display: none !important; }
        }
      `}</style>

      <nav
        ref={navRef}
        className={`nav-base ${!ORANGE_NAV && solid ? "nav-solid" : ""}`}
        style={{ background: navBg }}
      >
        <Link href="/" className="nav-logo-lockup" aria-label="Aptitude home">
          <AptitudeMark size={26} />
          <span className="nav-logo-word">Aptitude</span>
        </Link>

        <div className="nav-links" style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <Link href="/menu" className="nav-link">Menu</Link>
          <Link href="/menu#coffee" className="nav-link">Coffee</Link>
          <Link href="/#visit" className="nav-link">Visit</Link>

          <MagneticButton strength={0.4} radius={90}>
            <a
              href="https://wa.me/971509885445"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-book"
            >
              Book a Table
            </a>
          </MagneticButton>
        </div>
      </nav>
    </>
  );
}
