"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FillButton } from "@/components/buttons";

gsap.registerPlugin(ScrollTrigger);

const TEASERS = [
  "Saffron Latte",
  "Avocado Toast",
  "San Sebastian Cake",
  "Cold Brew",
];

export default function MenuCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".mcta-img", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
      gsap.from(".mcta-reveal", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ background: "var(--color-bg)", padding: "7rem 3rem" }}
    >
      <style>{`
        .mcta-shell {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .mcta-img-wrap { position: relative; aspect-ratio: 4/3; overflow: hidden; }
        .mcta-img { position: absolute; inset: 0; }
        .mcta-teasers { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; margin: 1.75rem 0 2.25rem; }
        .mcta-teaser {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--color-muted);
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }
        .mcta-teaser::before {
          content: "";
          width: 5px; height: 5px;
          background: var(--color-accent);
          display: inline-block;
        }
        @media (max-width: 820px) {
          .mcta-shell { grid-template-columns: 1fr; gap: 2.5rem; }
          .mcta-order-img { order: 2; }
        }
      `}</style>

      <div className="mcta-shell">
        <div className="mcta-order-img mcta-img-wrap">
          <Image
            src="/aptitude/morning.jpg"
            alt="Morning service on the Aptitude terrace"
            fill
            className="mcta-img"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div>
          <p
            className="mcta-reveal"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              letterSpacing: "0.25em",
              color: "var(--color-accent)",
              textTransform: "uppercase",
            }}
          >
            No.03 / The Menu
          </p>

          <h2
            className="mcta-reveal"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "var(--color-ink)",
              lineHeight: 1.05,
              marginTop: "1rem",
            }}
          >
            Coffee, kitchen,<br />all day long.
          </h2>

          <p
            className="mcta-reveal"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.05rem",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              maxWidth: "26rem",
              marginTop: "1.25rem",
            }}
          >
            Signature lattes, an all-day kitchen and fresh bakery - from the first
            espresso to the last slice of San Sebastian cake.
          </p>

          <div className="mcta-reveal mcta-teasers">
            {TEASERS.map((t) => (
              <span key={t} className="mcta-teaser">{t}</span>
            ))}
          </div>

          <div className="mcta-reveal">
            <FillButton
              href="/menu"
              base="var(--color-ink)"
              fill="var(--color-accent)"
              baseText="var(--color-cream)"
              fillText="var(--color-cream)"
            >
              View Full Menu
            </FillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
