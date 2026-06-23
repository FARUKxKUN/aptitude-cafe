"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

type Item = { name: string; desc?: string; price?: string };
type Group = { label: string; items: Item[] };
type Page = { id: string; kicker: string; title: string; columns: [Group[], Group[]] };

// Transcribed from the real Aptitude Cafe & E Bakery menu. Prices in AED, incl. 5% VAT.
const PAGES: Page[] = [
  {
    id: "coffee",
    kicker: "No.01 / The Bar",
    title: "Coffee & Drinks",
    columns: [
      [
        {
          label: "Our Artwork",
          items: [
            { name: "Cold Brew", price: "30" },
            { name: "Saffron Latte", desc: "Iced / Hot", price: "30" },
            { name: "Spanish Latte", desc: "Iced / Hot", price: "30" },
            { name: "Pistachio Latte", desc: "Iced / Hot", price: "35" },
            { name: "Rose Latte", desc: "Iced / Hot", price: "30" },
            { name: "Matcha Latte", price: "30" },
            { name: "Affogato", price: "27" },
            { name: "Stitch", desc: "Iced / Hot", price: "32" },
            { name: "Spanish Stitch", desc: "Iced / Hot", price: "35" },
            { name: "Caramel Latte", desc: "Iced / Hot", price: "30" },
            { name: "Vanilla Latte", desc: "Iced / Hot", price: "30" },
            { name: "Hazelnut Latte", desc: "Iced / Hot", price: "30" },
          ],
        },
        {
          label: "Steamin' Mugs",
          items: [
            { name: "Espresso", price: "19" },
            { name: "Americano", price: "21" },
            { name: "Cortado", price: "23" },
            { name: "Cappuccino", price: "25" },
            { name: "Latte", price: "25" },
            { name: "Iced Latte", price: "25" },
            { name: "Filtered", desc: "V60, Chemex, Aeropress", price: "35" },
            { name: "Extra Shot of Espresso", price: "9" },
          ],
        },
      ],
      [
        {
          label: "Extra Positivi(tea)",
          items: [
            { name: "Avantcha Tea", desc: "Whole leaf teas and herbal infusions with an experimental twist" },
            { name: "Assam Breakfast", price: "20" },
            { name: "Organic Ginger Breeze", price: "20" },
            { name: "Herbal", price: "20" },
          ],
        },
        {
          label: "Smoothies",
          items: [
            { name: "Very Bery", price: "25" },
            { name: "Exotic", price: "25" },
            { name: "Passionately Fruittie", price: "25" },
            { name: "Bonjourno' Blueberry", price: "25" },
          ],
        },
        {
          label: "Beat the Heat",
          items: [
            { name: "Ice Tea", price: "21" },
            { name: "Cold Pressed Juice", price: "18" },
            { name: "Coconut Water", price: "16" },
            { name: "Sparkling Water", price: "12" },
            { name: "Still Water", price: "8" },
          ],
        },
      ],
    ],
  },
  {
    id: "food",
    kicker: "No.02 / The Kitchen",
    title: "All-Day Kitchen",
    columns: [
      [
        {
          label: "Chop Chop",
          items: [
            { name: "Ceaser Chicken Salad", desc: "Chicken, lettuce mix, lollo roso, parmesan, special dressing", price: "35" },
            { name: "Quinoa Salad", desc: "Quinoa, onion, parsley, tomato, cucumber, olive oil", price: "35" },
            { name: "Berries Salad", desc: "Lettuce, blueberry, blackberry, strawberry, walnuts, feta, special dressing", price: "35" },
            { name: "Acai Berry Bowl", desc: "Acai, strawberry, peanut butter, granola", price: "30" },
          ],
        },
        {
          label: "A Sweet Fix",
          items: [
            { name: "Brownies", price: "15" },
            { name: "Ice Cream", price: "15" },
            { name: "San Sebastian Cake", price: "25" },
            { name: "Croissant", desc: "Plain / Zaatar / Almonds", price: "13" },
            { name: "Cinnamon Danish", price: "13" },
            { name: "Freshly Sliced Mix Fruits", price: "20" },
          ],
        },
      ],
      [
        {
          label: "Bites to Go",
          items: [
            { name: "Turkey Sandwich", desc: "Brown bread, smoked turkey, feta, spinach", price: "35" },
            { name: "Steak & Mushroom Sandwich", desc: "Grilled beef, cheddar, lollo roso", price: "35" },
            { name: "The Club Sandwich", desc: "Turkey, cheddar, boiled egg, tomato, lollo roso, cucumber, ranch", price: "35" },
            { name: "Avocado Toast", desc: "Sourdough, avocado, pomegranate, arugula, feta, chilli flakes", price: "30" },
          ],
        },
      ],
    ],
  },
];

function GroupBlock({ group }: { group: Group }) {
  return (
    <div className="menu-group">
      <h3 className="menu-group-label">{group.label}</h3>
      {group.items.map((item) => (
        <div key={item.name} className="menu-row">
          <div>
            <span className="menu-item-name">{item.name}</span>
            {item.desc && <span className="menu-item-desc">{item.desc}</span>}
          </div>
          {item.price && <span className="menu-price">{item.price}</span>}
        </div>
      ))}
    </div>
  );
}

export default function MenuView() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".menu-head > *", { opacity: 0, y: 40, duration: 0.9, stagger: 0.1, ease: "power3.out" });
      gsap.utils.toArray<HTMLElement>(".menu-group").forEach((g) => {
        gsap.from(g, {
          opacity: 0,
          y: 28,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: g, start: "top 88%" },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} style={{ background: "var(--color-bg)", minHeight: "100vh" }}>
      <style>{`
        .menu-shell { max-width: 1150px; margin: 0 auto; padding: 0 3rem; }
        .menu-hero {
          padding: 9rem 0 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .menu-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          padding-bottom: 1rem;
        }
        .menu-group { margin-bottom: 2.75rem; }
        .menu-group-label {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          font-weight: 300;
          color: var(--color-ink);
          padding-bottom: 0.75rem;
          margin-bottom: 0.5rem;
          border-bottom: 1.5px solid var(--color-accent);
        }
        .menu-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: baseline;
          padding: 0.7rem 0;
          border-bottom: 1px solid rgba(28,23,16,0.08);
        }
        .menu-item-name {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-ink);
          letter-spacing: 0.01em;
        }
        .menu-item-desc {
          display: block;
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--color-muted);
          margin-top: 0.2rem;
          line-height: 1.4;
          max-width: 24rem;
        }
        .menu-price {
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--color-accent);
          font-weight: 600;
          white-space: nowrap;
        }
        .menu-pagetitle {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 3.25rem);
          font-weight: 300;
          color: var(--color-ink);
          letter-spacing: -0.01em;
          margin-bottom: 2.5rem;
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .menu-pagekicker {
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-accent);
        }
        @media (max-width: 820px) {
          .menu-shell { padding: 0 1.5rem; }
          .menu-hero { grid-template-columns: 1fr; padding: 7rem 0 2rem; }
          .menu-hero-img { display: none; }
          .menu-cols { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>

      <div className="menu-shell">
        {/* Header */}
        <div className="menu-hero menu-head">
          <div>
            <p className="menu-pagekicker">Aptitude - Cafe &amp; E Bakery</p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 300,
                color: "var(--color-ink)",
                lineHeight: 0.95,
                marginTop: "1rem",
                letterSpacing: "-0.02em",
              }}
            >
              The Menu
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                color: "var(--color-ink)",
                opacity: 0.72,
                marginTop: "1.25rem",
                maxWidth: "27rem",
                lineHeight: 1.6,
              }}
            >
              Specialty coffee, signature lattes and an all-day kitchen, served on
              the terrace overlooking the dome. Non-dairy milk on request. Prices in
              AED, inclusive of 5% VAT.
            </p>
          </div>
          <div
            className="menu-hero-img"
            style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}
          >
            <Image
              src="/aptitude/food.jpg"
              alt="A signature dish at Aptitude"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Pages */}
        {PAGES.map((page) => (
          <section key={page.id} id={page.id} style={{ padding: "3rem 0 2rem" }}>
            <h2 className="menu-pagetitle">
              {page.title}
              <span className="menu-pagekicker">{page.kicker}</span>
            </h2>
            <div className="menu-cols">
              <div>{page.columns[0].map((g) => <GroupBlock key={g.label} group={g} />)}</div>
              <div>{page.columns[1].map((g) => <GroupBlock key={g.label} group={g} />)}</div>
            </div>
          </section>
        ))}

        {/* Footer CTA */}
        <div
          style={{
            padding: "2.5rem 0 5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(28,23,16,0.12)",
            marginTop: "2rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              fontWeight: 300,
              color: "var(--color-ink)",
            }}
          >
            Reserve your table on the terrace.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <MagneticButton strength={0.35} radius={100}>
              <Link
                href="/#visit"
                style={{
                  display: "inline-block",
                  border: "1px solid var(--color-ink)",
                  color: "var(--color-ink)",
                  padding: "0.85rem 1.75rem",
                  fontSize: "0.875rem",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                }}
              >
                Find Us
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.35} radius={100}>
              <a
                href="https://wa.me/971509885445"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "var(--color-accent)",
                  color: "var(--color-cream)",
                  padding: "0.85rem 1.75rem",
                  fontSize: "0.875rem",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  fontFamily: "var(--font-body)",
                }}
              >
                Book via WhatsApp
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
