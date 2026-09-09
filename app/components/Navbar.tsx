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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: 76,
        display: "flex",
        alignItems: "center",
        transition: "background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease",
        background: scrolled
          ? "rgba(7, 31, 30, 0.95)"
          : "linear-gradient(180deg, rgba(7, 31, 30, 0.75) 0%, rgba(7, 31, 30, 0.25) 75%, transparent 100%)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(141,198,63,0.15)" : "none",
      }}
    >
      <div
        className="fro-container"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
        }}
      >
        {/* Logo image — transparent PNG without white square background */}
        <a
          href="#"
          aria-label="FRO Solar home"
          style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          <img
            src="/fro-logo-transparent.png"
            alt="FRO Solar Energy Solution"
            style={{
              height: 50,
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
            }}
          />
        </a>

        {/* Desktop links */}
        <ul
          className="hidden lg:flex items-center"
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          role="list"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.85)",
                  transition: "color 0.2s ease",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--color-fro-green)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.85)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + Phone Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
            flexShrink: 0,
          }}
        >
          <a
            href="tel:+639063665473"
            className="hidden lg:inline-flex items-center gap-1.5"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.8)",
              letterSpacing: "-0.01em",
              padding: "0.375rem 0.75rem",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#fff";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(141,198,63,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-fro-green)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            0906-366-5473
          </a>

          <a
            href="#contact"
            className="btn-primary hidden md:inline-flex"
            style={{
              fontSize: "0.875rem",
              padding: "0.625rem 1.35rem",
              boxShadow: "0 4px 14px rgba(141,198,63,0.3)",
            }}
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
