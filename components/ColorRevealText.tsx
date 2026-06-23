"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * "Reading light" — words illuminate from a dim tone to full color as the
 * paragraph scrolls through view. Free manual word-split (no SplitText).
 * Source: SpyltMilk portfolio pattern.
 */
type Props = {
  children: string;
  dimColor?: string;
  className?: string;
  style?: CSSProperties;
};

export function ColorRevealText({
  children,
  dimColor = "rgba(122,111,98,0.35)",
  className,
  style,
}: Props) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLSpanElement>(".crw");

    const ctx = gsap.context(() => {
      gsap.from(words, {
        color: dimColor,
        stagger: { each: 0.05, from: "start" },
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [dimColor]);

  const parts = children.split(/(\s+)/);

  return (
    <p ref={ref} className={className} style={style}>
      {parts.map((part, i) =>
        /\s+/.test(part) ? (
          part
        ) : (
          <span key={i} className="crw" style={{ display: "inline-block" }}>
            {part}
          </span>
        )
      )}
    </p>
  );
}
