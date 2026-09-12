"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

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
        fontSize: "clamp(0.75rem, 3.2vw, 0.875rem)",
        color: hovered ? "#fff" : "rgba(255,255,255,0.78)",
        textDecoration: "none",
        transition: "all 0.24s cubic-bezier(0.16, 1, 0.3, 1)",
        minHeight: 44,
        padding: "0.5rem 0.875rem",
        borderRadius: 9999,
        background: hovered ? "rgba(141,198,63,0.18)" : "rgba(255,255,255,0.04)",
        border: hovered ? "1px solid rgba(141,198,63,0.5)" : "1px solid rgba(255,255,255,0.1)",
        transform: hovered ? "translateY(-2px)" : "translateY(0px)",
        boxShadow: hovered ? "0 8px 22px rgba(7,31,30,0.4), 0 0 14px rgba(141,198,63,0.25)" : "none",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <span style={{ transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1)", transition: "transform 0.22s ease", display: "inline-flex", flexShrink: 0 }}>
        <ContactIcon name={iconName} />
      </span>
      <span style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}>{text}</span>
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

/* ─── AnimatedStat ────────────────────────────────────────────────── */
interface AnimatedStatProps {
  number: string; // e.g. "28", "175", "10+"
  unit?: string;  // e.g. "Yrs", "MW", "Countries"
  label: string;
}

export function AnimatedStat({ number, unit, label }: AnimatedStatProps) {
  const reduce = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);

  // Parse numeric portion from strings like "10+", "175", "28", "7"
  const hasPlus = number.endsWith("+");
  const numericValue = parseInt(number.replace("+", ""), 10);

  // Count-up via requestAnimationFrame when in view
  const handleViewEnter = () => {
    if (started || reduce) {
      setDisplayed(numericValue);
      return;
    }
    setStarted(true);
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * numericValue));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <motion.div
      className="hero-stat-cell"
      onViewportEnter={handleViewEnter}
      viewport={{ once: true, amount: 0.6 }}
    >
      <dt>
        <span
          className="fro-counter-num"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(1.75rem, 3.8vw, 3rem)",
            color: "#fff",
            lineHeight: 1,
            display: "block",
            letterSpacing: "-0.04em",
          }}
        >
          {displayed}
          {hasPlus && "+"}
          {unit && (
            <span style={{ color: "var(--color-fro-green)", fontSize: "0.52em", letterSpacing: 0 }}>
              {" "}{unit}
            </span>
          )}
        </span>
      </dt>
      <dd
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.8125rem",
          color: "rgba(255,255,255,0.68)",
          marginTop: "0.375rem",
          letterSpacing: "0.01em",
          lineHeight: 1.4,
        }}
      >
        {label}
      </dd>
    </motion.div>
  );
}

/* ─── ProjectFilterTabs ───────────────────────────────────────────── */
type FilterCategory = "All" | "Grid-Tied" | "Hybrid" | "Off-Grid";

const FILTER_LABELS: FilterCategory[] = ["All", "Grid-Tied", "Hybrid", "Off-Grid"];

interface ProjectForFilter {
  name: string;
  type: string;
  capacity: string;
  iconName: string;
}

interface ProjectFilterTabsProps {
  projects: ProjectForFilter[];
}

export function ProjectFilterTabs({ projects }: ProjectFilterTabsProps) {
  const [active, setActive] = useState<FilterCategory>("All");

  const filtered = projects.filter((p) => {
    if (active === "All") return true;
    if (active === "Grid-Tied") return p.type.toLowerCase().includes("grid-tied");
    if (active === "Off-Grid") return p.type.toLowerCase().includes("off-grid");
    if (active === "Hybrid") return p.type.toLowerCase().includes("hybrid");
    return true;
  });

  return (
    <div>
      {/* Tab bar */}
      <div className="fro-tab-filter" role="tablist" aria-label="Filter installations by system type">
        {FILTER_LABELS.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={active === cat}
            onClick={() => setActive(cat)}
            className={`fro-tab-btn${active === cat ? " active" : ""}`}
          >
            {cat}
            {cat !== "All" && (
              <span className="fro-tab-count">
                {projects.filter((p) => {
                  const t = p.type.toLowerCase();
                  if (cat === "Grid-Tied") return t.includes("grid-tied");
                  if (cat === "Off-Grid") return t.includes("off-grid");
                  if (cat === "Hybrid") return t.includes("hybrid");
                  return false;
                }).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 220px), 1fr))",
          gap: "0.875rem",
          marginTop: "1.5rem",
        }}
      >
        <AnimatePresence mode="sync">
          {filtered.map((p, i) => (
            <motion.div
              key={p.name}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
            >
              <ProjectCard project={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p style={{ color: "rgba(255,255,255,0.45)", textAlign: "center", padding: "2rem 0", fontSize: "0.9rem" }}>
          No installations in this category yet.
        </p>
      )}
    </div>
  );
}

