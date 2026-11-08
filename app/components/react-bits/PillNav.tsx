"use client";

// Adapted from React Bits PillNav. See LICENSE.md and README.md in this directory.
// Kept the rolling-label/fill interaction; the existing accessible mobile drawer stays separate.
import { motion, useReducedMotion } from "motion/react";

type Item = { label: string; href: string };

export default function PillNav({ items, activeHref }: { items: Item[]; activeHref: string }) {
  const reduce = useReducedMotion();
  return (
    <nav className="rb-pill-nav" aria-label="Primary navigation">
      <ul>
        {items.map(item => (
          <li key={item.href}>
            <a className="rb-pill-nav__item" href={item.href} aria-current={item.href === activeHref ? "location" : undefined}>
              {item.href === activeHref && <motion.span className="rb-pill-nav__active" layoutId="fro-nav-active"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 350, damping: 34 }} />}
              <span className="rb-pill-nav__fill" aria-hidden="true" />
              <span className="rb-pill-nav__face">{item.label}</span>
              <span className="rb-pill-nav__face-alt" aria-hidden="true">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
