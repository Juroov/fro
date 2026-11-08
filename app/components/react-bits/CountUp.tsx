"use client";

// Adapted from React Bits CountUp. See LICENSE.md and README.md.
// Count-only variant with server-rendered final values and a stable accessible label.
import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export default function CountUp({ to, suffix = "", duration = 1.4 }: { to: number; suffix?: string; duration?: number }) {
  const root = useRef<HTMLSpanElement>(null);
  const digits = useRef<HTMLSpanElement>(null);
  const visible = useInView(root, { once: true, amount: 0.8 });
  const format = new Intl.NumberFormat("en-PH");
  const label = `${format.format(to)}${suffix}`;

  useEffect(() => {
    const element = digits.current;
    if (!visible || !element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const numberFormat = new Intl.NumberFormat("en-PH");
    const finish = () => { element.textContent = numberFormat.format(to); };
    if (preference.matches) { finish(); return; }
    const animation = animate(0, to, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate: value => { element.textContent = numberFormat.format(Math.round(value)); },
      onComplete: finish,
    });
    const handlePreference = () => { if (preference.matches) { animation.stop(); finish(); } };
    preference.addEventListener("change", handlePreference);
    return () => { animation.stop(); preference.removeEventListener("change", handlePreference); finish(); };
  }, [visible, to, duration]);

  return <span ref={root} className="rb-count-up"><span className="sr-only">{label}</span><span aria-hidden="true"><span ref={digits} className="rb-count-up__digits" style={{ minWidth: `${String(to).length}ch` }}>{format.format(to)}</span>{suffix}</span></span>;
}
