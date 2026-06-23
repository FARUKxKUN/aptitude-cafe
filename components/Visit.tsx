"use client";

import { MagneticButton } from "@/components/MagneticButton";

const MAPS_URL =
  "https://www.google.com/maps/place/Aptitude+Caf%C3%A9+%26+Eatery/@24.5340188,54.3983292,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5e67ba2ebd14d5:0x702c09325f644051!8m2!3d24.5340188!4d54.4009041";
const INSTAGRAM_URL = "https://www.instagram.com/aptitude.ae/";

export default function Visit() {
  return (
    <section
      id="visit"
      style={{
        background: "var(--color-accent)",
        padding: "5rem 3rem",
      }}
    >
      <style>{`
        .visit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        .visit-btn {
          display: block;
          padding: 1rem 2rem;
          font-family: var(--font-body);
          font-size: 0.875rem;
          letter-spacing: 0.06em;
          text-decoration: none;
          text-align: center;
          transition: background 0.2s, color 0.2s, opacity 0.2s;
          cursor: pointer;
        }
        .visit-btn-outline {
          border: 1px solid var(--color-cream);
          color: var(--color-cream);
          background: transparent;
        }
        .visit-btn-outline:hover {
          background: var(--color-cream);
          color: var(--color-accent);
        }
        .visit-btn-fill {
          background: var(--color-cream);
          color: var(--color-accent);
        }
        .visit-btn-fill:hover {
          opacity: 0.88;
        }
        .visit-footer {
          margin-top: 4rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(248,243,234,0.2);
          display: flex;
          justify-content: space-between;
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: rgba(248,243,234,0.4);
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 768px) {
          .visit-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          section#visit { padding: 4rem 1.5rem; }
        }
      `}</style>

      <div className="visit-grid">
        {/* Left */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              color: "rgba(248,243,234,0.6)",
              textTransform: "uppercase",
            }}
          >
            No.04 / Find Us
          </p>

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 300,
              color: "var(--color-cream)",
              marginTop: "1rem",
              lineHeight: 1.2,
            }}
          >
            Find us at the<br />
            Louvre Abu Dhabi.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "rgba(248,243,234,0.7)",
              marginTop: "1.5rem",
              lineHeight: 1.7,
            }}
          >
            Louvre Abu Dhabi Park<br />
            Saadiyat Island Cultural District<br />
            Abu Dhabi, UAE
          </p>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "rgba(248,243,234,0.55)",
              marginTop: "1rem",
            }}
          >
            Open daily - perfect before or after your Louvre visit.
          </p>
        </div>

        {/* Right - CTAs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "20rem" }}>
          <MagneticButton strength={0.3} radius={120} style={{ display: "block" }}>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="visit-btn visit-btn-outline"
              style={{ display: "block" }}
            >
              Get Directions
            </a>
          </MagneticButton>
          <MagneticButton strength={0.3} radius={120} style={{ display: "block" }}>
            <a
              href="https://wa.me/971509885445"
              target="_blank"
              rel="noopener noreferrer"
              className="visit-btn visit-btn-fill"
              style={{ display: "block" }}
            >
              Book via WhatsApp
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Footer strip */}
      <div className="visit-footer">
        <span>© 2025 Aptitude Cafe &amp; Eatery</span>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-cream)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,243,234,0.4)")}
        >
          @aptitude.ae
        </a>
      </div>
    </section>
  );
}
