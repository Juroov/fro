"use client";
import { useState } from "react";

type IconName = "phone" | "email" | "map";

interface Project {
  name: string;
  type: string;
  capacity: string;
  iconName: string;
}

export function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(255,255,255,0.10)"
          : "rgba(255,255,255,0.06)",
        border: "1px solid rgba(141,198,63,0.2)",
        borderRadius: 12,
        padding: "1.5rem",
        transition: "background 0.2s ease",
        cursor: "default",
      }}
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
            fontSize: "0.975rem",
            fontWeight: 600,
            fontFamily: "var(--font-display)",
            lineHeight: 1.3,
          }}
        >
          {project.name}
        </h3>
        <span className="fro-badge" style={{ flexShrink: 0 }}>
          {project.capacity}
        </span>
      </div>
      <p
        style={{
          fontSize: "0.8rem",
          color: "rgba(255,255,255,0.45)",
          maxWidth: "100%",
          fontFamily: "var(--font-body)",
        }}
      >
        {project.type}
      </p>
    </article>
  );
}

/* Minimal inline SVGs — no icon library */
const ContactIcon = ({ name }: { name: IconName }) => {
  if (name === "phone")
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  if (name === "email")
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontFamily: "var(--font-body)",
        fontSize: "0.9rem",
        color: hovered ? "#fff" : "rgba(255,255,255,0.72)",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
    >
      <ContactIcon name={iconName} />
      {text}
    </a>
  );
}
