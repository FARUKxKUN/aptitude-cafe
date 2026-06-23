"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NumberCounter } from "@/components/NumberCounter";
import { ColorRevealText } from "@/components/ColorRevealText";

gsap.registerPlugin(ScrollTrigger);

export default function Identity() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);
  const img1Ref    = useRef<HTMLDivElement>(null);
  const img2Ref    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        x: -40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from([img1Ref.current, img2Ref.current], {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--color-bg)",
        padding: "6rem 3rem",
      }}
    >
      <style>{`
        .identity-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .proof-strip {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
        }
        .proof-value {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--color-accent);
          font-weight: 300;
        }
        .proof-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--color-muted);
          margin-top: 0.15rem;
        }
        @media (max-width: 900px) {
          .identity-grid { grid-template-columns: 1fr; gap: 3rem; }
          .identity-grid section { padding: 4rem 1.5rem; }
        }
      `}</style>

      <div className="identity-grid">
        {/* Left - text */}
        <div ref={textRef}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "var(--color-muted)",
              textTransform: "uppercase",
            }}
          >
            No.01 / Our Story
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "3rem",
              fontWeight: 300,
              lineHeight: 1.15,
              color: "var(--color-ink)",
              marginTop: "1rem",
            }}
          >
            One of Abu Dhabi&apos;s<br />
            first specialty<br />
            coffee shops.
          </h2>

          <ColorRevealText
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-ink)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "28rem",
              marginTop: "1.5rem",
            }}
          >
            Open since 2017, Aptitude is the official cafe partner of Louvre Abu Dhabi Park. Find us at Saadiyat Island Cultural District - where great coffee meets world-class art.
          </ColorRevealText>

          <div className="proof-strip">
            <div>
              <div className="proof-value"><NumberCounter target={2017} /></div>
              <div className="proof-label">Established</div>
            </div>
            <div>
              <div className="proof-value"><NumberCounter target={17} suffix="K+" /></div>
              <div className="proof-label">Instagram followers</div>
            </div>
            <div>
              <div className="proof-value"><NumberCounter text="Louvre" /></div>
              <div className="proof-label">Official park cafe</div>
            </div>
          </div>
        </div>

        {/* Right - stacked images */}
        <div style={{ position: "relative" }}>
          <div
            ref={img1Ref}
            style={{
              position: "relative",
              aspectRatio: "4/3",
              border: "1px solid var(--color-accent)",
              overflow: "hidden",
            }}
          >
            <Image
              src="/aptitude/fresco.jpg"
              alt="Aptitude outdoor terrace"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            ref={img2Ref}
            style={{
              position: "relative",
              aspectRatio: "4/3",
              marginLeft: "2rem",
              marginTop: "-2rem",
              overflow: "hidden",
            }}
          >
            <Image
              src="/aptitude/collective.jpg"
              alt="Aptitude interior"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
