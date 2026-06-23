"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

/**
 * Magnetic wrapper — element pulls toward the cursor inside a trigger radius.
 * Lerp-smoothed, RAF-driven. Pure JS, zero deps. Source: Andrew Woan tutorial.
 * Respects prefers-reduced-motion (no pull, default hover only).
 */
type Props = {
  children: ReactNode;
  strength?: number;     // 0.1 subtle -> 0.5 dramatic
  radius?: number;       // px from center where the field begins
  className?: string;
  style?: CSSProperties;
};

const lerp = (current: number, target: number, factor: number) =>
  current * (1 - factor) + target * factor;

export function MagneticButton({
  children,
  strength = 0.3,
  radius = 120,
  className,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rect = el.getBoundingClientRect();
    const mouse = { x: 0, y: 0 };
    const data = { x: { c: 0, t: 0 }, y: { c: 0, t: 0 } };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onResize = () => {
      rect = el.getBoundingClientRect();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });

    const render = () => {
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(mouse.x - cx, mouse.y - cy);

      if (dist < radius) {
        data.x.t = (mouse.x - cx) * strength;
        data.y.t = (mouse.y - cy) * strength;
      } else {
        data.x.t = 0;
        data.y.t = 0;
      }

      data.x.c = lerp(data.x.c, data.x.t, 0.18);
      data.y.c = lerp(data.y.c, data.y.t, 0.18);
      el.style.transform = `translate(${data.x.c.toFixed(2)}px, ${data.y.c.toFixed(2)}px)`;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
    };
  }, [strength, radius]);

  return (
    <div ref={ref} className={className} style={{ display: "inline-block", ...style }}>
      {children}
    </div>
  );
}
