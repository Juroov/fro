"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: number;
  stagger?: boolean;
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = false,
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay) {
              setTimeout(() => el.setAttribute("data-revealed", "true"), delay);
            } else {
              el.setAttribute("data-revealed", "true");
            }
            if (stagger) {
              Array.from(el.children).forEach((child, i) => {
                (child as HTMLElement).style.transitionDelay = `${i * 90}ms`;
              });
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, stagger, threshold]);

  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={`reveal-wrap${className ? " " + className : ""}`}>{children}</Tag>;
}
