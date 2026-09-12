"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

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
  const [hoveredNavIndex, setHoveredNavIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <nav
        aria-label="Main Navigation"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          background: scrolled ? "rgba(7,31,30,0.94)" : "rgba(7,31,30,0.65)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(141,198,63,0.18)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
        }}
      >
        <div
          className="fro-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 72,
          }}
        >
          {/* Brand logo */}
          <a
            href="#"
            aria-label="FRO Solar home"
            className="fro-nav-brand"
            style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          >
            <Image
              src="/fro-logo-transparent.png"
              alt="FRO Solar Energy Solution"
              width={160}
              height={50}
              priority
              style={{
                height: "clamp(38px, 5vw, 50px)",
                width: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
              }}
            />
          </a>

          {/* Desktop links with organic liquid hover pill */}
          <ul
            className="desktop-nav-links fro-nav-liquid-track"
            role="list"
            onMouseLeave={() => setHoveredNavIndex(null)}
          >
            {navLinks.map((link, idx) => {
              const isHovered = hoveredNavIndex === idx;
              return (
                <li
                  key={link.href}
                  className="fro-nav-item"
                  onMouseEnter={() => setHoveredNavIndex(idx)}
                >
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        layoutId={shouldReduceMotion ? undefined : "fro-navbar-liquid-pill"}
                        className="fro-navbar-liquid-pill"
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 32,
                          mass: 0.7,
                        }}
                        aria-hidden="true"
                      >
                        <span className="fro-liquid-pill-glare" />
                        <span className="fro-liquid-pill-core" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <a
                    href={link.href}
                    className={`fro-nav-link ${isHovered ? "is-active" : ""}`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* CTA + Phone Actions */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              flexShrink: 0,
            }}
          >
            {/* Desktop phone link with liquid glass capsule */}
            <a
              href="tel:+639063665473"
              className="desktop-header-action fro-nav-liquid-pill-btn"
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
              <span>0906-366-5473</span>
            </a>

            {/* Desktop Quote Button */}
            <a
              href="#contact"
              className="btn-primary desktop-header-action"
              style={{
                fontSize: "0.875rem",
                padding: "0.625rem 1.35rem",
                boxShadow: "0 4px 14px rgba(141,198,63,0.3)",
              }}
            >
              Get a Quote
            </a>

            {/* Quick Mobile Tap-to-Call Button */}
            <a
              href="tel:+639063665473"
              aria-label="Call FRO Solar directly"
              className="mobile-call-btn"
              style={{
                width: 42,
                height: 42,
                borderRadius: "9999px",
                background: "rgba(141,198,63,0.18)",
                border: "1px solid rgba(141,198,63,0.35)",
                color: "var(--color-fro-green)",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>

            {/* Accessible Hamburger Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setOpen(!open)}
              className="mobile-nav-toggle"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              style={{
                width: 44,
                height: 44,
                borderRadius: 8,
                background: open ? "rgba(255,255,255,0.08)" : "transparent",
                border: open ? "1px solid rgba(255,255,255,0.15)" : "none",
                cursor: "pointer",
              }}
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

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              className="lg:hidden absolute top-full left-0 right-0"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              style={{
                background: "rgba(7,31,30,0.98)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderTop: "1px solid rgba(141,198,63,0.15)",
                borderBottom: "1px solid rgba(141,198,63,0.15)",
                boxShadow: "0 16px 40px rgba(0,0,0,0.6)",
                maxHeight: "calc(100dvh - 72px)",
                overflowY: "auto",
              }}
            >
              <div className="fro-container py-4 flex flex-col gap-1">
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.9)",
                          padding: "0.875rem 0.5rem",
                          borderBottom: "1px solid rgba(255,255,255,0.06)",
                          fontSize: "1rem",
                          minHeight: 44,
                        }}
                      >
                        <span>{link.label}</span>
                        <span style={{ color: "var(--color-fro-green)", fontSize: "0.875rem" }}>→</span>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Mobile Quick Action Buttons in Drawer */}
                <div className="pt-3 pb-2 flex flex-col gap-2.5">
                  <a
                    href="#contact"
                    className="btn-primary w-full justify-center"
                    onClick={() => setOpen(false)}
                  >
                    Get a Free Quote
                  </a>
                  <a
                    href="tel:+639063665473"
                    className="btn-ghost w-full justify-center"
                    style={{
                      border: "1px solid rgba(141,198,63,0.35)",
                      color: "#ffffff",
                      fontSize: "0.875rem",
                    }}
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      width="15"
                      height="15"
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
                    Call 0906-366-5473
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Dimmed backdrop to dismiss drawer by tapping outside */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-backdrop"
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
