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
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fro-nav ${scrolled ? "fro-nav--solid" : "fro-nav--transparent"}`}
      aria-label="Main navigation"
    >
      <div className="fro-container flex items-center justify-between px-6">
        {/* Logo image */}
        <a
          href="#"
          aria-label="FRO Solar home"
          style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          <img
            src="/fro-logo.png"
            alt="FRO Solar Energy Solution"
            style={{
              height: 52,
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))",
            }}
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.72)",
                  transition: "color 0.2s",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color =
                    "rgba(255,255,255,0.72)")
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
            className="hidden lg:block"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "0.8125rem",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "-0.01em",
            }}
          >
            0906-366-5473
          </a>
          <a
            href="#contact"
            className="btn-primary hidden md:inline-flex"
            style={{ fontSize: "0.8125rem", padding: "0.5625rem 1.25rem", boxShadow: "none" }}
          >
            Get a Quote
          </a>

          {/* Hamburger */}
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
            background: "rgba(7,31,30,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(141,198,63,0.12)",
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
                    color: "rgba(255,255,255,0.85)",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.9375rem",
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
                Get a Quote
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
