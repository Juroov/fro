"use client";

import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Systems", href: "#systems" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Estimator", href: "#estimator" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.classList.add("menu-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner shell">
        <a className="brand" href="#home" aria-label="FRO Solar home" onClick={() => setOpen(false)}>
          <span className="brand__mark">
            <Image src="/fro-logo-transparent.png" alt="" width={54} height={54} priority sizes="54px" />
          </span>
          <span className="brand__copy">
            <strong>FRO Solar</strong>
            <span>Power Installation Services</span>
          </span>
        </a>

        <nav className="desktop-menu" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href="tel:+639063665473" aria-label="Call FRO Solar at 0906 366 5473">
            <Phone size={17} aria-hidden="true" />
            <span>0906 366 5473</span>
          </a>
          <a className="button button--primary header-quote" href="#contact">Get a quote</a>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`}>
        <nav className="shell" aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
          ))}
          <div className="mobile-menu__actions">
            <a className="button button--primary" href="#contact" onClick={() => setOpen(false)}>Request a quote</a>
            <a className="button button--outline-light" href="tel:+639063665473" onClick={() => setOpen(false)}>
              <Phone size={17} aria-hidden="true" /> Call now
            </a>
          </div>
        </nav>
      </div>
      {open ? <button className="menu-backdrop" aria-label="Close navigation" onClick={() => setOpen(false)} /> : null}
    </header>
  );
}
