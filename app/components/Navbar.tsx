"use client";

import Image from "next/image";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PillNav from "./react-bits/PillNav";

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
  const [activeHref, setActiveHref] = useState("#home");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      const readingLine = window.innerHeight * 0.38;
      let current = "#home";
      for (const section of sections) {
        if (section.getBoundingClientRect().top > readingLine) break;
        current = `#${section.id}`;
      }
      setActiveHref(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const background = Array.from(document.querySelectorAll<HTMLElement>('main, footer, .mobile-action-bar'));
    const previousInert = background.map(element => element.inert);
    background.forEach(element => { element.inert = true; });
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])].filter((element): element is HTMLButtonElement | HTMLAnchorElement => element !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.body.classList.add("menu-open");
    const closeOnDesktop = () => { if (window.innerWidth > 1120) setOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner shell">
        <a className="brand" href="#home" aria-label="FRO Solar home" onClick={() => setOpen(false)}>
          <span className="brand__mark">
            <Image src="/fro-logo-transparent.png" alt="" width={54} height={54} sizes="54px" />
          </span>
          <span className="brand__copy">
            <strong>FRO Solar</strong>
            <span>Power Installation Services</span>
          </span>
        </a>

        <div className="desktop-menu"><PillNav items={links} activeHref={activeHref} /></div>

        <div className="header-actions">
          <a className="header-phone" href="tel:+639063665473" aria-label="Call FRO Solar at 0906 366 5473">
            <Phone size={17} aria-hidden="true" />
            <span>0906 366 5473</span>
          </a>
          <a className="button button--primary header-quote" href="#contact">Get a quote</a>
          <button
            type="button"
            className="menu-toggle"
            ref={toggleRef}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div ref={menuRef} id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`}>
        <nav className="shell" aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={activeHref === link.href ? "location" : undefined} onClick={() => setOpen(false)}>{link.label}</a>
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
