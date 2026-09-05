"use client";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fro-nav"
      style={{
        background: scrolled ? "rgba(9,46,44,0.97)" : "rgba(14,75,72,0.88)",
      }}
      aria-label="Main navigation"
    >
      <div className="fro-container flex items-center justify-between px-6">
        {/* Wordmark logo — no icon */}
        <a
          href="#"
          aria-label="FRO Solar home"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.15rem",
            color: "#fff",
            letterSpacing: "-0.03em",
          }}
        >
          FRO{" "}
          <span style={{ color: "var(--color-fro-green)", fontWeight: 400 }}>
            Solar
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.78)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.78)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+6309063665473"
            className="hidden md:block"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            0906-366-5473
          </a>
          <a
            href="#contact"
            className="btn-primary hidden md:inline-flex"
            style={{ fontSize: "0.875rem", padding: "0.6rem 1.25rem" }}
          >
            Request a Quote
          </a>

          {/* Pure CSS hamburger — no icon library */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                gap: open ? 0 : 5,
                width: 22,
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    height: 2,
                    background: "#fff",
                    borderRadius: 2,
                    width: i === 1 ? 16 : 22,
                    transition: "all 0.2s ease",
                    opacity: open && i === 1 ? 0 : 1,
                    transform:
                      open && i === 0
                        ? "rotate(45deg) translate(5px,5px)"
                        : open && i === 2
                        ? "rotate(-45deg) translate(5px,-5px)"
                        : "none",
                  }}
                />
              ))}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="lg:hidden absolute top-full left-0 right-0"
          style={{
            background: "rgba(9,46,44,0.98)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(141,198,63,0.2)",
          }}
        >
          <ul
            className="fro-container px-6 py-4 flex flex-col gap-1"
            role="list"
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.9)",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contact"
                className="btn-primary w-full justify-center"
                onClick={() => setOpen(false)}
              >
                Request a Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
