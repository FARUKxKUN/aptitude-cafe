"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Count-up stat. Pure requestAnimationFrame - no gsap, no ScrollTrigger, no
 * dependency on any external ticker. Renders the live value in React state so
 * there is never an SSR/client mismatch and it can never get "stuck" on a DOM
 * write that didn't happen. Animates once when scrolled into view.
 *
 *  <NumberCounter target={2017} />          -> 0 ... 2017
 *  <NumberCounter target={17} suffix="K+" />-> 0K+ ... 17K+
 *  <NumberCounter text="Louvre" />          -> static text
 */
type Props = {
  target?: number;
  text?: string;
  suffix?: string;
  durationMs?: number;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function NumberCounter({ target, text, suffix = "", durationMs = 1600 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (text !== undefined || target === undefined) return;
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let raf = 0;
    let startTs = 0;
    let started = false;

    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / durationMs, 1);
      setValue(Math.round(easeOutCubic(p) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (started) return;
      started = true;
      raf = requestAnimationFrame(tick);
    };

    // Fire immediately if already on screen, otherwise wait for scroll-in.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      start();
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, text, durationMs]);

  if (text !== undefined) return <span>{text}</span>;
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
