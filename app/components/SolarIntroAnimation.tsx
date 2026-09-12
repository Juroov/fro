"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";

/* ─── Solar Panel SVG ─────────────────────────────────────────────── */
const PANEL_COLS = 3;
const PANEL_ROWS = 2;
const PW = 80;  // panel width
const PH = 52;  // panel height
const PGX = 10; // gap x
const PGY = 14; // gap y

const TOTAL_W = PANEL_COLS * PW + (PANEL_COLS - 1) * PGX; // 260
const START_X = (300 - TOTAL_W) / 2; // 20
const START_Y = 116;

// Sun position
const SUN_CX = 150;
const SUN_CY = 56;
const SUN_R  = 24;

// Precompute 8 ray endpoints
const RAY_INNER = SUN_R + 7;
const RAY_OUTER = SUN_R + 20;
const RAYS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 45 * Math.PI) / 180;
  return {
    x1: SUN_CX + Math.cos(angle) * RAY_INNER,
    y1: SUN_CY + Math.sin(angle) * RAY_INNER,
    x2: SUN_CX + Math.cos(angle) * RAY_OUTER,
    y2: SUN_CY + Math.sin(angle) * RAY_OUTER,
    delay: 140 + i * 35,
  };
});

// Panel array cells
const PANELS = Array.from({ length: PANEL_ROWS }, (_, row) =>
  Array.from({ length: PANEL_COLS }, (_, col) => ({
    x: START_X + col * (PW + PGX),
    y: START_Y + row * (PH + PGY),
    delay: 320 + (row * PANEL_COLS + col) * 65,
  }))
).flat();

const ARRAY_BOTTOM = START_Y + PANEL_ROWS * PH + (PANEL_ROWS - 1) * PGY;

function SolarSVG() {
  return (
    <svg
      viewBox="0 0 300 258"
      width="280"
      height="241"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      <defs>
        <radialGradient id="intro-sun-g" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFD180" />
          <stop offset="100%" stopColor="#F7941D" />
        </radialGradient>
        <radialGradient id="intro-aura-g" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F7941D" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#F7941D" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="intro-panel-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0D3D3B" />
          <stop offset="100%" stopColor="#071F1E" />
        </linearGradient>
        <radialGradient id="intro-charge-g" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#8DC63F" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#8DC63F" stopOpacity="0.05" />
        </radialGradient>
        <filter id="intro-glow-f" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="intro-pglow-f" x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Sun aura halo ── */}
      <circle
        cx={SUN_CX}
        cy={SUN_CY}
        r={48}
        fill="url(#intro-aura-g)"
        className="intro-sun-aura"
      />

      {/* ── Sun ── */}
      <circle
        cx={SUN_CX}
        cy={SUN_CY}
        r={SUN_R}
        fill="url(#intro-sun-g)"
        filter="url(#intro-glow-f)"
        className="intro-sun-core"
      />

      {/* ── Sun rays ── */}
      {RAYS.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="#F7941D"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="14"
          strokeDashoffset="14"
          className="intro-ray"
          style={{ animationDelay: `${r.delay}ms` }}
        />
      ))}

      {/* ── Power flow dashed line from array to bottom ── */}
      <line
        x1={SUN_CX}
        y1={START_Y}
        x2={SUN_CX}
        y2={ARRAY_BOTTOM + 22}
        stroke="#8DC63F"
        strokeWidth="1.5"
        strokeDasharray="5 3"
        opacity="0"
        className="intro-power-line"
      />

      {/* ── Panel Array ── */}
      {PANELS.map(({ x, y, delay }, idx) => (
        <g key={idx}>
          {/* Base panel */}
          <rect
            x={x}
            y={y}
            width={PW}
            height={PH}
            rx="3"
            fill="url(#intro-panel-g)"
            stroke="#1E6B66"
            strokeWidth="1"
          />

          {/* Cell grid — 3 cols × 2 rows */}
          {/* Vertical dividers */}
          <line x1={x + PW / 3}     y1={y + 1} x2={x + PW / 3}     y2={y + PH - 1} stroke="#1A5F5B" strokeWidth="0.6" />
          <line x1={x + (PW*2)/3}   y1={y + 1} x2={x + (PW*2)/3}   y2={y + PH - 1} stroke="#1A5F5B" strokeWidth="0.6" />
          {/* Horizontal divider */}
          <line x1={x + 1} y1={y + PH/2} x2={x + PW - 1} y2={y + PH/2} stroke="#1A5F5B" strokeWidth="0.6" />

          {/* Reflection highlight */}
          <line
            x1={x + 5}
            y1={y + 5}
            x2={x + 20}
            y2={y + 5}
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Charge glow overlay */}
          <rect
            x={x}
            y={y}
            width={PW}
            height={PH}
            rx="3"
            fill="url(#intro-charge-g)"
            filter="url(#intro-pglow-f)"
            opacity="0"
            className="intro-panel-charge"
            style={{ animationDelay: `${delay}ms` }}
          />

          {/* Active indicator dot */}
          <circle
            cx={x + PW - 9}
            cy={y + 9}
            r="3.5"
            fill="#8DC63F"
            opacity="0"
            className="intro-panel-dot"
            style={{ animationDelay: `${delay + 100}ms` }}
          />
        </g>
      ))}

      {/* ── Ground mount bar ── */}
      <line
        x1={START_X - 8}
        y1={ARRAY_BOTTOM + 10}
        x2={START_X + TOTAL_W + 8}
        y2={ARRAY_BOTTOM + 10}
        stroke="#1E6B66"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
        className="intro-mount"
      />

      {/* ── Mounting legs ── */}
      <line x1={START_X + 28}           y1={ARRAY_BOTTOM + 10} x2={START_X + 28}           y2={ARRAY_BOTTOM + 22} stroke="#1E6B66" strokeWidth="2" strokeLinecap="round" opacity="0.5" className="intro-mount" />
      <line x1={START_X + TOTAL_W - 28} y1={ARRAY_BOTTOM + 10} x2={START_X + TOTAL_W - 28} y2={ARRAY_BOTTOM + 22} stroke="#1E6B66" strokeWidth="2" strokeLinecap="round" opacity="0.5" className="intro-mount" />

      {/* ── Ground line ── */}
      <line
        x1={START_X - 16}
        y1={ARRAY_BOTTOM + 22}
        x2={START_X + TOTAL_W + 16}
        y2={ARRAY_BOTTOM + 22}
        stroke="#155954"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.45"
        className="intro-mount"
      />

      {/* ── "GENERATING" label ── */}
      <text
        x={SUN_CX}
        y={ARRAY_BOTTOM + 40}
        textAnchor="middle"
        fontSize="9"
        fontFamily="'Montserrat', system-ui, sans-serif"
        fontWeight="700"
        letterSpacing="0.14em"
        fill="#8DC63F"
        opacity="0"
        className="intro-energy-text"
      >
        ⚡ GENERATING
      </text>
    </svg>
  );
}

/* ─── Intro Animation Component ───────────────────────────────────── */
export default function SolarIntroAnimation() {
  const [visible, setVisible] = useState(true);
  const shouldReduce = useReducedMotion();

  // Scroll lock while intro is visible
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Automatic exit timer — runs automatically without needing to tap
  useEffect(() => {
    if (shouldReduce) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2400);

    return () => clearTimeout(timer);
  }, [shouldReduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="fro-intro-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="FRO Solar Energy"
          // Starts full screen, then pops out / slides up smoothly
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            opacity: 0.98,
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          className="intro-overlay"
        >
          {/* Dot-grid texture (matches brand) */}
          <div className="intro-dotgrid" aria-hidden="true" />

          {/* Ambient bottom glow */}
          <div className="intro-ambient-glow" aria-hidden="true" />

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="intro-logo-wrap"
          >
            <Image
              src="/fro-logo-transparent.png"
              alt="FRO Solar Energy Solution"
              width={200}
              height={66}
              priority
              className="intro-logo"
            />
          </motion.div>

          {/* ── SVG Panel Animation ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <SolarSVG />
          </motion.div>

          {/* ── Tagline ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center" }}
          >
            <p className="intro-tagline">Powering Davao del Sur with the Sun</p>
            <p className="intro-sub">FRO Solar Power Installation Services</p>
          </motion.div>

          {/* ── Progress bar ── */}
          <div className="intro-progress-track" aria-hidden="true">
            <motion.div
              className="intro-progress-fill"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.1, delay: 0.2, ease: "easeInOut" }}
            />
          </div>

          {/* ── Optional Skip button (not needed, but available) ── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => setVisible(false)}
            className="intro-skip-btn"
            aria-label="Skip intro animation"
          >
            Skip intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
