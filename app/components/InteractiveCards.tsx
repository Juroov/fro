"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type IconName = "phone" | "email" | "map";

interface Project {
  name: string;
  type: string;
  capacity: string;
  iconName: string;
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="fro-project-card"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        <h3
          style={{
            color: "#fff",
            fontSize: "0.9375rem",
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            lineHeight: 1.35,
            letterSpacing: "-0.01em",
            wordBreak: "break-word",
          }}
        >
          {project.name}
        </h3>
        <span className="fro-badge" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
          {project.capacity}
        </span>
      </div>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "rgba(255,255,255,0.5)",
          maxWidth: "100%",
          fontFamily: "var(--font-body)",
        }}
      >
        {project.type}
      </p>
    </motion.article>
  );
}

/* Minimal inline SVGs — no icon library */
const ContactIcon = ({ name }: { name: IconName }) => {
  if (name === "phone")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  if (name === "email")
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-green)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
};

interface ContactLinkProps {
  href: string;
  iconName: IconName;
  text: string;
}

export function ContactLink({ href, iconName, text }: ContactLinkProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.625rem",
        fontFamily: "var(--font-body)",
        fontSize: "0.875rem",
        color: hovered ? "#fff" : "rgba(255,255,255,0.78)",
        textDecoration: "none",
        transition: "all 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
        minHeight: 44,
        padding: "0.5rem 1rem",
        borderRadius: 9999,
        background: hovered ? "rgba(141,198,63,0.18)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(141,198,63,0.5)" : "1px solid rgba(255,255,255,0.1)",
        transform: hovered ? "translateY(-2px)" : "translateY(0px)",
        boxShadow: hovered ? "0 8px 22px rgba(7,31,30,0.4), 0 0 14px rgba(141,198,63,0.25)" : "none",
      }}
    >
      <span style={{ transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1)", transition: "transform 0.22s ease", display: "inline-flex" }}>
        <ContactIcon name={iconName} />
      </span>
      <span>{text}</span>
    </a>
  );
}

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

