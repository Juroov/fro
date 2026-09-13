"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface StepData {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  color: string;
  specs: { label: string; value: string }[];
  details: string[];
}

const STEPS: StepData[] = [
  {
    id: "survey",
    step: "01",
    title: "Site Survey",
    subtitle: "Roof Assessment and Shading Analysis",
    desc: "Structural and electrical engineers assess your roof structure, orientation, and year-round sun path to design the optimal solar layout for your property.",
    badge: "Engineering",
    color: "#8DC63F",
    specs: [
      { label: "Azimuth", value: "180\u00b0 South" },
      { label: "Roof Pitch", value: "18\u00b0 Tilt" },
      { label: "Irradiance", value: "5.4 kWh/m\u00b2" },
    ],
    details: [
      "Roof structural integrity check",
      "Sun path and shading simulation",
      "Load capacity verification",
      "Full photo documentation",
    ],
  },
  {
    id: "cad",
    step: "02",
    title: "System Design",
    subtitle: "Custom String Layout and Engineering",
    desc: "High-efficiency string layout engineered to match panel wattage, inverter DC voltage windows, and Philippine Electrical Code setback boundaries.",
    badge: "CAD Blueprint",
    color: "#60C4FF",
    specs: [
      { label: "Capacity", value: "8 x 580W" },
      { label: "Inverter", value: "5kW Hybrid" },
      { label: "Design Life", value: "30+ Years" },
    ],
    details: [
      "CAD string layout drawing",
      "Single-line electrical diagram",
      "Load flow and sizing calculations",
      "Fire setback compliance check",
    ],
  },
  {
    id: "permits",
    step: "03",
    title: "Permitting",
    subtitle: "DTI, LGU and Net Metering Filing",
    desc: "FRO Solar handles 100% of building permits, City of Digos clearances, and utility Net Metering grid interconnection on your behalf.",
    badge: "Compliance",
    color: "#F7941D",
    specs: [
      { label: "Permit", value: "LGU 2026" },
      { label: "Safety", value: "IOSH Certified" },
      { label: "Code", value: "PEC 2017" },
    ],
    details: [
      "LGU building permit application",
      "Utility interconnection agreement",
      "Net Metering enrollment",
      "TESDA electrician certification seal",
    ],
  },
  {
    id: "racking",
    step: "04",
    title: "Mounting",
    subtitle: "Structural Aluminum Substructure",
    desc: "Corrosion-resistant anodized aluminum rails anchored into rafters with stainless-steel L-feet and UV-rated EPDM waterproof flashing seals.",
    badge: "250 km/h Rated",
    color: "#C4A35A",
    specs: [
      { label: "Rail", value: "AL6005-T5" },
      { label: "Fasteners", value: "SUS304 Steel" },
      { label: "Sealing", value: "EPDM Gasket" },
    ],
    details: [
      "Anodized aluminum C-channel rails",
      "Stainless L-feet bolted into rafters",
      "EPDM UV-resistant flashing seals",
      "Typhoon-rated hardware throughout",
    ],
  },
  {
    id: "modules",
    step: "05",
    title: "Panel Installation",
    subtitle: "Tier-1 Monocrystalline Modules",
    desc: "Bifacial half-cell monocrystalline panels hoisted and secured with precision mid-clamps, end-clamps, and grounding clips to the mounting rails.",
    badge: "Tier-1 PERC",
    color: "#8DC63F",
    specs: [
      { label: "Efficiency", value: "22.8% Max" },
      { label: "Glass", value: "Anti-Reflective" },
      { label: "Warranty", value: "25-Year" },
    ],
    details: [
      "Tier-1 half-cut PERC modules",
      "Precision mid and end clamp torquing",
      "MC4 waterproof DC connectors",
      "Panel grounding and bonding",
    ],
  },
  {
    id: "inverter",
    step: "06",
    title: "Inverter Wiring",
    subtitle: "Balance-of-System Electrical",
    desc: "TESDA NC II certified electricians wire the DC combiner, surge devices, hybrid inverter, LiFePO4 battery bank, and AC distribution panel.",
    badge: "TESDA NC II",
    color: "#F7941D",
    specs: [
      { label: "Inverter", value: "IP65 Hybrid" },
      { label: "Battery", value: "10 kWh LiFePO4" },
      { label: "Switchgear", value: "DC/AC Isolators" },
    ],
    details: [
      "EMT shielded solar conduit runs",
      "DC surge protective devices",
      "Hybrid inverter commissioning",
      "LiFePO4 battery bank wiring",
    ],
  },
  {
    id: "testing",
    step: "07",
    title: "Testing",
    subtitle: "Multi-Point Electrical Verification",
    desc: "Open-circuit voltage (Voc), insulation resistance Megger testing, and polarity checks performed by certified engineers before energizing the system.",
    badge: "Safety Verified",
    color: "#60C4FF",
    specs: [
      { label: "String Voc", value: "382.4 V DC" },
      { label: "Ground", value: "< 5 Ohms" },
      { label: "Polarity", value: "Zero Defect" },
    ],
    details: [
      "Open-circuit voltage (Voc) test",
      "Insulation resistance Megger test",
      "Polarity and earth fault check",
      "Full system safety sign-off",
    ],
  },
  {
    id: "online",
    step: "08",
    title: "Handover",
    subtitle: "Clean Energy Online 24/7",
    desc: "System goes live. Your property runs on clean solar with mobile monitoring for live yield, battery backup, and grid export \u2014 we walk you through everything.",
    badge: "System Live",
    color: "#8DC63F",
    specs: [
      { label: "Live Output", value: "4.5 kW" },
      { label: "Bill Savings", value: "Up to 85%" },
      { label: "CO2 Saved", value: "5.8 T/yr" },
    ],
    details: [
      "Live system energization",
      "Mobile monitoring app setup",
      "Owner operation walkthrough",
      "Warranty and after-care handover",
    ],
  },
];

/* ── Inline responsive styles injected once ─────────────────────────── */
const MODAL_CSS = `
  .hiw-overlay {
    position: fixed;
    inset: 0;
    z-index: 8000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(7,31,30,0.82);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .hiw-dialog {
    width: 100%;
    max-width: 880px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(158deg, #0D2B29 0%, #071F1E 100%);
    border: 1px solid rgba(141,198,63,0.14);
    border-radius: 22px;
    overflow: hidden;
    box-shadow: 0 40px 90px rgba(0,0,0,0.65), inset 0 0 0 1px rgba(255,255,255,0.04);
    /* Height: fill available space with a cap */
    max-height: min(88dvh, 720px);
    height: min(88dvh, 720px);
  }
  .hiw-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
    gap: 0.75rem;
  }
  .hiw-body {
    display: flex;
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }
  .hiw-sidebar {
    width: 200px;
    flex-shrink: 0;
    border-right: 1px solid rgba(255,255,255,0.06);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0.75rem;
    /* Always shown on desktop */
  }
  .hiw-pills-row {
    display: none; /* Hidden on desktop, shown on mobile */
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 0 1rem;
    flex-shrink: 0;
  }
  .hiw-pills-inner {
    display: flex;
    gap: 0.35rem;
    overflow-x: auto;
    scrollbar-width: none;
    padding: 0.625rem 0;
    -webkit-overflow-scrolling: touch;
  }
  .hiw-pills-inner::-webkit-scrollbar { display: none; }
  .hiw-detail {
    flex: 1;
    min-width: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  .hiw-detail-inner {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.5rem;
  }
  .hiw-specs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.625rem;
  }
  .hiw-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.25rem;
    border-top: 1px solid rgba(255,255,255,0.07);
    flex-shrink: 0;
    gap: 0.5rem;
  }
  /* Mobile overrides */
  @media (max-width: 600px) {
    .hiw-overlay { padding: 0; align-items: flex-end; }
    .hiw-dialog {
      border-radius: 20px 20px 0 0;
      max-height: 92dvh;
      height: 92dvh;
      max-width: 100%;
    }
    .hiw-sidebar { display: none !important; }
    .hiw-pills-row { display: block !important; }
    .hiw-detail-inner { padding: 1rem; gap: 1rem; }
    .hiw-specs-grid { grid-template-columns: repeat(3, 1fr); gap: 0.5rem; }
    .hiw-topbar { padding: 0.875rem 1rem; }
    .hiw-footer { padding: 0.625rem 1rem; }
  }
  /* Tablet */
  @media (min-width: 601px) {
    .hiw-pills-row { display: none !important; }
    .hiw-sidebar { display: flex !important; }
  }
`;

/* ── Detail Panel ────────────────────────────────────────────────────── */
function DetailPanel({ step, reduce }: { step: StepData; reduce: boolean | null }) {
  return (
    <motion.div
      key={step.id}
      initial={reduce ? false : { opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -8 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="hiw-detail-inner"
    >
      {/* Header row */}
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
          {/* Step number bubble */}
          <div
            style={{
              minWidth: 42,
              height: 42,
              borderRadius: 12,
              background: `${step.color}1C`,
              border: `1.5px solid ${step.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.62rem",
              fontWeight: 800,
              color: step.color,
              letterSpacing: "0.05em",
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            {step.step}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Badge */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "0.18rem 0.55rem",
                borderRadius: 9999,
                background: `${step.color}1A`,
                border: `1px solid ${step.color}30`,
                fontSize: "0.58rem",
                fontWeight: 700,
                color: step.color,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                marginBottom: "0.3rem",
              }}
            >
              {step.badge}
            </span>
            <h3
              style={{
                fontSize: "clamp(1.05rem, 2.8vw, 1.25rem)",
                fontWeight: 800,
                color: "#fff",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.38)",
                margin: "0.2rem 0 0",
                lineHeight: 1.4,
              }}
            >
              {step.subtitle}
            </p>
          </div>
        </div>
        {/* Description */}
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.72,
            color: "rgba(255,255,255,0.7)",
            margin: 0,
          }}
        >
          {step.desc}
        </p>
      </div>

      {/* What we do */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 14,
          padding: "1rem 1.1rem",
        }}
      >
        <p
          style={{
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.25)",
            margin: "0 0 0.7rem",
            textTransform: "uppercase",
          }}
        >
          What we do
        </p>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "0.45rem",
          }}
        >
          {step.details.map((d, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.55rem",
                fontSize: "0.845rem",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.45,
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: `${step.color}1E`,
                  border: `1.5px solid ${step.color}4A`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "0.12rem",
                  fontSize: "0.5rem",
                  color: step.color,
                  fontWeight: 800,
                }}
              >
                &#10003;
              </span>
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Specs */}
      <div>
        <p
          style={{
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.25)",
            margin: "0 0 0.625rem",
            textTransform: "uppercase",
          }}
        >
          Key specs
        </p>
        <div className="hiw-specs-grid">
          {step.specs.map((s, i) => (
            <div
              key={i}
              style={{
                background: `linear-gradient(135deg, ${step.color}12, ${step.color}06)`,
                border: `1px solid ${step.color}25`,
                borderRadius: 12,
                padding: "0.75rem 0.875rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.57rem",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  color: step.color,
                  marginBottom: "0.3rem",
                  textTransform: "uppercase",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.25,
                }}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Sidebar step list (desktop) ─────────────────────────────────────── */
function SidebarList({
  steps,
  activeIdx,
  onSelect,
}: {
  steps: StepData[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  return (
    <>
      {steps.map((s, i) => {
        const active = i === activeIdx;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.55rem",
              width: "100%",
              padding: "0.6rem 0.7rem",
              background: active
                ? `linear-gradient(135deg, ${s.color}16, ${s.color}07)`
                : "transparent",
              border: active
                ? `1px solid ${s.color}35`
                : "1px solid transparent",
              borderRadius: 9,
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.18s ease",
            }}
          >
            <span
              style={{
                minWidth: 26,
                height: 26,
                borderRadius: "50%",
                background: active ? s.color : "rgba(255,255,255,0.07)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.58rem",
                fontWeight: 800,
                color: active ? "#071F1E" : "rgba(255,255,255,0.3)",
                flexShrink: 0,
                transition: "all 0.18s ease",
              }}
            >
              {s.step}
            </span>
            <span
              style={{
                fontSize: "0.76rem",
                fontWeight: 700,
                color: active ? "#fff" : "rgba(255,255,255,0.42)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                transition: "color 0.18s ease",
              }}
            >
              {s.title}
            </span>
          </button>
        );
      })}
    </>
  );
}

/* ── Pill nav (mobile) ───────────────────────────────────────────────── */
function PillNav({
  steps,
  activeIdx,
  onSelect,
}: {
  steps: StepData[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current?.children[activeIdx] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeIdx]);

  return (
    <div ref={scrollRef} className="hiw-pills-inner">
      {steps.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSelect(i)}
          style={{
            flexShrink: 0,
            padding: "0.32rem 0.7rem",
            borderRadius: 9999,
            background: i === activeIdx ? s.color : "rgba(255,255,255,0.07)",
            border: i === activeIdx ? "none" : "1px solid rgba(255,255,255,0.1)",
            color: i === activeIdx ? "#071F1E" : "rgba(255,255,255,0.48)",
            fontSize: "0.68rem",
            fontWeight: 700,
            cursor: "pointer",
            transition: "all 0.18s ease",
            whiteSpace: "nowrap",
          }}
        >
          {s.step}. {s.title}
        </button>
      ))}
    </div>
  );
}

/* ── Progress dots ───────────────────────────────────────────────────── */
function DotTrack({ steps, activeIdx, onSelect }: { steps: StepData[]; activeIdx: number; onSelect: (i: number) => void }) {
  return (
    <div style={{ display: "flex", gap: "0.28rem", alignItems: "center" }}>
      {steps.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Step ${i + 1}`}
          style={{
            width: i === activeIdx ? 18 : 6,
            height: 6,
            borderRadius: 9999,
            background: i === activeIdx ? s.color : "rgba(255,255,255,0.14)",
            border: "none",
            cursor: "pointer",
            padding: 0,
            transition: "all 0.24s cubic-bezier(0.16,1,0.3,1)",
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Modal ──────────────────────────────────────────────────────── */
function HowItWorksModal({ onClose }: { onClose: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const reduce = useReducedMotion();
  const activeStep = STEPS[activeIdx];

  const prev = useCallback(() => setActiveIdx((p) => Math.max(0, p - 1)), []);
  const next = useCallback(() => setActiveIdx((p) => Math.min(STEPS.length - 1, p + 1)), []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, next, prev]);

  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = saved; };
  }, []);

  return (
    <div
      className="hiw-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="How solar installation works"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <style>{MODAL_CSS}</style>

      <motion.div
        className="hiw-dialog"
        initial={reduce ? false : { opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top bar */}
        <div className="hiw-topbar">
          <div style={{ minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              How Solar Installation Works
            </h2>
            <p
              style={{
                margin: "0.15rem 0 0",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.32)",
              }}
            >
              8 steps &#8212; from first survey to live system
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            &#10005;
          </button>
        </div>

        {/* Mobile pills */}
        <div className="hiw-pills-row">
          <PillNav steps={STEPS} activeIdx={activeIdx} onSelect={setActiveIdx} />
        </div>

        {/* Body */}
        <div className="hiw-body">
          {/* Sidebar */}
          <div className="hiw-sidebar">
            <SidebarList steps={STEPS} activeIdx={activeIdx} onSelect={setActiveIdx} />
          </div>

          {/* Detail */}
          <div className="hiw-detail">
            <AnimatePresence mode="wait">
              <DetailPanel key={activeStep.id} step={activeStep} reduce={reduce} />
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="hiw-footer">
          <button
            onClick={prev}
            disabled={activeIdx === 0}
            style={{
              padding: "0.42rem 0.875rem",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: activeIdx === 0 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.62)",
              fontSize: "0.76rem",
              fontWeight: 600,
              cursor: activeIdx === 0 ? "not-allowed" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            &larr; Prev
          </button>

          <DotTrack steps={STEPS} activeIdx={activeIdx} onSelect={setActiveIdx} />

          {activeIdx < STEPS.length - 1 ? (
            <button
              onClick={next}
              style={{
                padding: "0.42rem 0.875rem",
                borderRadius: 9999,
                background: activeStep.color,
                border: "none",
                color: "#071F1E",
                fontSize: "0.76rem",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Next &rarr;
            </button>
          ) : (
            <button
              onClick={onClose}
              style={{
                padding: "0.42rem 0.875rem",
                borderRadius: 9999,
                background: "#8DC63F",
                border: "none",
                color: "#071F1E",
                fontSize: "0.76rem",
                fontWeight: 700,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Get a Quote &rarr;
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ── Exported trigger ─────────────────────────────────────────────────── */
export default function HowItWorksTrigger({
  children,
  className = "btn-ghost",
  id = "how-it-works-btn",
  style,
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        id={id}
        onClick={() => setOpen(true)}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
          ...style,
        }}
      >
        {children ?? (
          <>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--color-fro-green)" }}
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span>How It Works</span>
          </>
        )}
      </button>
      <AnimatePresence>
        {open && <HowItWorksModal onClose={close} />}
      </AnimatePresence>
    </>
  );
}
