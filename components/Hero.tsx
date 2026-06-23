"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/MagneticButton";
import { FillButton } from "@/components/buttons";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const mediaRef    = useRef<HTMLVideoElement>(null);
  const labelRef    = useRef<HTMLParagraphElement>(null);
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const line3Ref    = useRef<HTMLSpanElement>(null);
  const subRef      = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // Scoped context: cleanup reverts ONLY this component's animations/triggers.
    const ctx = gsap.context(() => {
      if (mediaRef.current && sectionRef.current) {
        gsap.to(mediaRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(labelRef.current,  { opacity: 0, y: 20, duration: 0.6 })
        .from(line1Ref.current,  { opacity: 0, y: 40, duration: 0.8 }, "-=0.3")
        .from(line2Ref.current,  { opacity: 0, y: 40, duration: 0.8 }, "-=0.6")
        .from(line3Ref.current,  { opacity: 0, y: 40, duration: 0.8 }, "-=0.6")
        .from(subRef.current,    { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
        .from(ctaRef.current,    { opacity: 0, y: 20, duration: 0.6 }, "-=0.4");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100svh",
        overflow: "hidden",
      }}
    >
      {/* Background video */}
      <video
        ref={mediaRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/aptitude/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(28,23,16,0.80) 0%, rgba(28,23,16,0.12) 55%, transparent 100%)",
        }}
      />

      {/* Text block */}
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "3rem",
          right: "3rem",
        }}
        className="hero-text"
      >
        <style>{`
          @media (max-width: 768px) {
            .hero-text { left: 1.5rem !important; bottom: 2rem !important; }
            .hero-h1 { font-size: 3.5rem !important; }
          }
        `}</style>

        <p
          ref={labelRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            color: "var(--color-cream)",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <span
            style={{
              width: "28px",
              height: "1px",
              background: "var(--color-accent)",
              display: "inline-block",
            }}
          />
          Saadiyat Island - Abu Dhabi
        </p>

        <h1
          className="hero-h1"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "7rem",
            color: "var(--color-cream)",
            fontWeight: 300,
            lineHeight: 1,
            marginTop: "0.75rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span ref={line1Ref}>Coffee.</span>
          <span ref={line2Ref}>Culture.</span>
          <span ref={line3Ref}>The Louvre.</span>
        </h1>

        <p
          ref={subRef}
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(248,243,234,0.82)",
            fontSize: "1.05rem",
            maxWidth: "28rem",
            marginTop: "1.25rem",
            lineHeight: 1.6,
          }}
        >
          The only cafe with the Louvre Abu Dhabi as its backdrop.
        </p>

        <div
          ref={ctaRef}
          style={{ marginTop: "1.75rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          {/* Primary - magnetic + fill rise. Drives discovery (Hunt reward). */}
          <MagneticButton strength={0.35} radius={110}>
            <FillButton
              href="/menu"
              base="var(--color-cream)"
              fill="var(--color-accent)"
              baseText="var(--color-ink)"
              fillText="var(--color-cream)"
            >
              Show Menu
            </FillButton>
          </MagneticButton>

          {/* Secondary - ghost outline that fills cream on hover (same mechanic, inverted) */}
          <FillButton
            href="#visit"
            arrow={false}
            base="transparent"
            fill="var(--color-cream)"
            baseText="var(--color-cream)"
            fillText="var(--color-ink)"
            border="1px solid rgba(248,243,234,0.55)"
          >
            Plan Your Visit
          </FillButton>
        </div>
      </div>
    </section>
  );
}
