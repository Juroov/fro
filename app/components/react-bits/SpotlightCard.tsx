"use client";

// Adapted from React Bits SpotlightCard. See LICENSE.md and README.md.
// Local pointer tracking avoids global handlers and idle animation loops.
import type { CSSProperties, HTMLAttributes, PointerEvent } from "react";

type Props = HTMLAttributes<HTMLElement> & { spotlightColor?: string };

export default function SpotlightCard({ children, className = "", spotlightColor = "rgba(141, 198, 63, 0.16)", style, ...props }: Props) {
  const move = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
    element.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
  };
  return <article {...props} className={`rb-spotlight ${className}`} onPointerMove={move}
    style={{ "--spotlight-color": spotlightColor, ...style } as CSSProperties}>{children}</article>;
}
