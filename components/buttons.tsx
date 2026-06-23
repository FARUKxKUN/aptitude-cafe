"use client";

import { type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

/**
 * A small kit of DISTINCT button effects - one per interaction, never repeated:
 *  - FillButton : color panel slides up from the bottom, label recolors (gradient-shift)
 *  - SkewButton : label skews up and out while a duplicate rises in (text skew slide)
 *  - LineButton : underline draws in from the left, arrow nudges right
 * All sit on 44px+ targets and respect keyboard focus via the browser default.
 */

type Common = {
  children: ReactNode;
  href: string;
  external?: boolean;
  arrow?: boolean;
};

function Anchor({
  href,
  external,
  className,
  style,
  children,
  ariaLabel,
}: {
  href: string;
  external?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  ariaLabel?: string;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} style={style} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

const BTN_CSS = `
  .fillbtn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    overflow: hidden;
    padding: 0.95rem 2rem;
    min-height: 44px;
    font-family: var(--font-body);
    font-size: 0.875rem;
    letter-spacing: 0.06em;
    text-decoration: none;
    cursor: pointer;
    background: var(--btn-base);
    color: var(--btn-base-text);
    border: var(--btn-border, none);
  }
  .fillbtn .fillbtn-panel {
    position: absolute;
    inset: 0;
    background: var(--btn-fill);
    transform: translateY(101%);
    transition: transform 0.42s cubic-bezier(0.65,0,0.35,1);
    z-index: 0;
  }
  .fillbtn .fillbtn-content {
    position: relative;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    transition: color 0.42s cubic-bezier(0.65,0,0.35,1);
  }
  .fillbtn:hover .fillbtn-panel { transform: translateY(0); }
  .fillbtn:hover .fillbtn-content { color: var(--btn-fill-text); }
  .fillbtn .fillbtn-arrow { transition: transform 0.42s cubic-bezier(0.65,0,0.35,1); }
  .fillbtn:hover .fillbtn-arrow { transform: translateX(4px); }

  .skewbtn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0.95rem 2rem;
    min-height: 44px;
    font-family: var(--font-body);
    font-size: 0.875rem;
    letter-spacing: 0.06em;
    text-decoration: none;
    cursor: pointer;
    background: transparent;
    border: 1px solid var(--btn-border);
    color: var(--btn-text);
  }
  .skewbtn-stack { position: relative; display: inline-block; line-height: 1.1; }
  .skewbtn-stack span { display: block; transition: transform 0.42s cubic-bezier(0.76,0,0.24,1); }
  .skewbtn-stack .skew-b { position: absolute; top: 0; left: 0; transform: translateY(130%) skewY(5deg); }
  .skewbtn:hover .skew-a { transform: translateY(-130%) skewY(5deg); }
  .skewbtn:hover .skew-b { transform: translateY(0) skewY(0); }

  .linebtn {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    min-height: 44px;
    font-family: var(--font-body);
    font-size: 0.95rem;
    letter-spacing: 0.04em;
    text-decoration: none;
    cursor: pointer;
    color: var(--btn-text);
  }
  .linebtn::after {
    content: "";
    position: absolute;
    left: 0; bottom: 0.35rem;
    height: 1px; width: 100%;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.35s cubic-bezier(0.65,0,0.35,1);
  }
  .linebtn:hover::after { transform: scaleX(1); }
  .linebtn .linebtn-arrow { transition: transform 0.35s cubic-bezier(0.65,0,0.35,1); }
  .linebtn:hover .linebtn-arrow { transform: translateX(5px); }
`;

/** Mounted once; shared by every button instance. */
export function ButtonStyles() {
  return <style>{BTN_CSS}</style>;
}

function vars(obj: Record<string, string>): CSSProperties {
  return obj as unknown as CSSProperties;
}

/* 1. Fill - panel rises from bottom, label recolors */
export function FillButton({
  children,
  href,
  external,
  arrow = true,
  base = "var(--color-cream)",
  fill = "var(--color-accent)",
  baseText = "var(--color-ink)",
  fillText = "var(--color-cream)",
  border = "none",
}: Common & {
  base?: string;
  fill?: string;
  baseText?: string;
  fillText?: string;
  border?: string;
}) {
  return (
    <Anchor
      href={href}
      external={external}
      className="fillbtn"
      style={vars({
        "--btn-base": base,
        "--btn-fill": fill,
        "--btn-base-text": baseText,
        "--btn-fill-text": fillText,
        "--btn-border": border,
      })}
    >
      <span className="fillbtn-panel" aria-hidden />
      <span className="fillbtn-content">
        {children}
        {arrow && <ArrowRight className="fillbtn-arrow" />}
      </span>
    </Anchor>
  );
}

/* 2. Skew slide - two stacked labels */
export function SkewButton({
  children,
  href,
  external,
  borderColor = "var(--color-cream)",
  textColor = "var(--color-cream)",
}: Common & { borderColor?: string; textColor?: string }) {
  return (
    <Anchor
      href={href}
      external={external}
      className="skewbtn"
      style={vars({ "--btn-border": borderColor, "--btn-text": textColor })}
    >
      <span className="skewbtn-stack">
        <span className="skew-a">{children}</span>
        <span className="skew-b">{children}</span>
      </span>
    </Anchor>
  );
}

/* 3. Line draw - underline + arrow nudge */
export function LineButton({
  children,
  href,
  external,
  arrow = true,
  color = "var(--color-ink)",
}: Common & { color?: string }) {
  return (
    <Anchor
      href={href}
      external={external}
      className="linebtn"
      style={vars({ "--btn-text": color })}
    >
      {children}
      {arrow && <ArrowRight size={15} className="linebtn-arrow" />}
    </Anchor>
  );
}
