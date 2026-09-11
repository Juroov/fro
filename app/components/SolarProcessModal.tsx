"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  ModernTropicalSolarVilla,
  PhotorealisticEnvironment,
  Annotation3D,
  SurveyLaserScanner,
  HolographicCADOverlay,
  ElectricalCurrentFlow,
  RealisticCameraController,
} from "./RealisticSolarVilla";

/* ─────────────────────────────────────────────────────────────
   INSTALLATION STEPS DATA
───────────────────────────────────────────────────────────── */
interface StepData {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  color: string;
  accentHex: number;
  specs: { label: string; value: string }[];
  annotations: { label: string; detail: string; pos: [number, number, number] }[];
}

const STEPS: StepData[] = [
  {
    id: "survey",
    step: "01",
    title: "Site Survey & 3D Drone Scan",
    subtitle: "Roof Assessment & Digital Shading Modeling",
    desc: "Our structural and electrical engineers survey your roof structure, rafter spacing, orientation, and year-round sun path using 3D digital azimuth modeling.",
    badge: "ENGINEERING INSPECTION",
    color: "#8DC63F",
    accentHex: 0x8dc63f,
    specs: [
      { label: "Optimal Azimuth", value: "180° Due South" },
      { label: "Roof Pitch", value: "18° Optimal Tilt" },
      { label: "Solar Irradiance", value: "5.4 kWh/m²/day" },
    ],
    annotations: [
      { label: "OPTICAL LASER SCAN", detail: "Active LIDAR Sweep", pos: [-2.2, 5.3, 0.2] },
      { label: "ROOF AZIMUTH", detail: "180° South (Max Yield)", pos: [0.3, 3.9, 1.6] },
      { label: "USABLE ROOF AREA", detail: "48.5 m² (Zero Shading)", pos: [3.2, 4.9, -0.4] },
    ],
  },
  {
    id: "cad",
    step: "02",
    title: "System Design & String CAD",
    subtitle: "Custom Engineering Simulation & Setbacks",
    desc: "We engineer a high-efficiency string layout in CAD, matching panel wattage, inverter DC voltage windows, and Philippine Electrical Code setback boundaries.",
    badge: "CAD BLUEPRINT",
    color: "#60C4FF",
    accentHex: 0x60c4ff,
    specs: [
      { label: "Module Capacity", value: "8 × 580W (4.64 kWp)" },
      { label: "Inverter Matching", value: "5kW Hybrid Single-Phase" },
      { label: "Design Life", value: "30+ Years" },
    ],
    annotations: [
      { label: "STRING 1 CIRCUIT", detail: "4 × 580W (2.32 kWp)", pos: [-2.2, 4.0, 1.0] },
      { label: "FIRE SETBACK", detail: "300mm Ridge Clearance", pos: [0.1, 5.4, -1.6] },
      { label: "STRING 2 CIRCUIT", detail: "4 × 580W (2.32 kWp)", pos: [2.5, 4.0, 1.0] },
    ],
  },
  {
    id: "permits",
    step: "03",
    title: "Permitting & Structural Engineering",
    subtitle: "DTI, LGU & Interconnection Filing",
    desc: "FRO Solar manages 100% of municipal building permits, City of Digos clearances, and utility Net Metering grid interconnection compliance.",
    badge: "100% COMPLIANT",
    color: "#F7941D",
    accentHex: 0xf7941d,
    specs: [
      { label: "Business Permit", value: "Digos LGU Valid 2026" },
      { label: "Safety Standard", value: "IOSH Certified Mgmt" },
      { label: "Electrical Code", value: "PEC 2017 Compliant" },
    ],
    annotations: [
      { label: "LGU DIGOS CLEARANCE", detail: "Permit No. 2026-3925", pos: [-2.6, 3.8, 1.6] },
      { label: "WIND LOAD RATED", detail: "250 km/h Typhoon Resistance", pos: [0.2, 5.3, -0.4] },
      { label: "TESDA NC II SEAL", detail: "Certified Master Electrician", pos: [2.8, 3.8, 1.6] },
    ],
  },
  {
    id: "racking",
    step: "04",
    title: "Mounting Rails & Waterproof Anchors",
    subtitle: "Structural Aluminum Substructure",
    desc: "Corrosion-resistant anodized aluminum rails are anchored into roof rafters using stainless-steel L-feet and UV-rated EPDM waterproof flashing seals.",
    badge: "250 KM/H WIND RATED",
    color: "#C4A35A",
    accentHex: 0xc4a35a,
    specs: [
      { label: "Rail Alloy", value: "AL6005-T5 Anodized" },
      { label: "Fasteners", value: "SUS304 Stainless Steel" },
      { label: "Waterproofing", value: "EPDM Compression Gasket" },
    ],
    annotations: [
      { label: "EPDM WATERPROOF GASKET", detail: "UV-Resistant Flashing Seal", pos: [-2.5, 3.7, 1.6] },
      { label: "AL6005-T5 RAILS", detail: "Continuous C-Channel Rails", pos: [0.2, 5.1, 0.2] },
      { label: "SUS304 L-FEET", detail: "Bolted into Rafters", pos: [2.7, 3.7, 1.6] },
    ],
  },
  {
    id: "modules",
    step: "05",
    title: "PV Panel Array Assembly",
    subtitle: "Tier-1 Monocrystalline Modules",
    desc: "Bifacial/half-cell monocrystalline solar modules are hoisted and locked into position with precision mid-clamps, end-clamps, and grounding clips.",
    badge: "TIER-1 MONO PERC",
    color: "#8DC63F",
    accentHex: 0x8dc63f,
    specs: [
      { label: "Cell Efficiency", value: "22.8% Max Efficiency" },
      { label: "Glass Coating", value: "Anti-Reflective ARC" },
      { label: "Warranty", value: "25-Yr Linear Yield" },
    ],
    annotations: [
      { label: "580W MONO MODULE", detail: "Tier-1 Half-Cut PERC", pos: [-2.4, 4.0, 1.0] },
      { label: "MID-CLAMP & BOLT", detail: "Stainless Hex Torque Lock", pos: [0.2, 5.2, 0.2] },
      { label: "TEMPERED ARC GLASS", detail: "Anti-Reflective Specular", pos: [2.6, 4.1, -0.5] },
    ],
  },
  {
    id: "inverter",
    step: "06",
    title: "Hybrid Inverter & Battery Storage",
    subtitle: "Balance-of-System Electrical & Conduit",
    desc: "TESDA NC II certified electricians wire the DC combiner, surge protective devices, hybrid inverter, lithium LiFePO4 battery bank, and AC distribution panel.",
    badge: "TESDA NC II CERTIFIED",
    color: "#F7941D",
    accentHex: 0xf7941d,
    specs: [
      { label: "Inverter Type", value: "IP65 Hybrid Smart Inverter" },
      { label: "Battery Bank", value: "10 kWh LiFePO4 Modular" },
      { label: "Switchgear", value: "Dual DC/AC Isolators" },
    ],
    annotations: [
      { label: "EMT SOLAR CONDUIT", detail: "Rigid Shielded Conduit", pos: [-4.6, 3.2, -0.4] },
      { label: "5kW HYBRID INVERTER", detail: "IP65 with Heatsink Fins", pos: [-4.3, 2.0, 0.4] },
      { label: "10 kWh LiFePO4 BATTERY", detail: "Modular Energy Storage", pos: [-4.6, 0.8, -0.2] },
    ],
  },
  {
    id: "testing",
    step: "07",
    title: "Testing & String Commissioning",
    subtitle: "Multi-Point Electrical Verification",
    desc: "We perform open-circuit voltage (Voc), short-circuit current (Isc), insulation resistance Megger testing, and polarity tests before energizing the system.",
    badge: "SAFETY VERIFIED",
    color: "#60C4FF",
    accentHex: 0x60c4ff,
    specs: [
      { label: "String Voc Test", value: "382.4 V DC Pass" },
      { label: "Ground Resistance", value: "< 5 Ohms Standard" },
      { label: "Polarity Check", value: "100% Zero Defect" },
    ],
    annotations: [
      { label: "LIVE CURRENT FLOW", detail: "DC-to-AC Conversion", pos: [-1.8, 3.4, 0.6] },
      { label: "VOLTAGE VERIFIED", detail: "382.4V DC String Voc Pass", pos: [-3.8, 2.2, 0.4] },
      { label: "GROUND BONDING", detail: "< 3.5 Ω Ground Impedance", pos: [-4.7, 0.6, 0.2] },
    ],
  },
  {
    id: "online",
    step: "08",
    title: "Grid Energization & Smart App",
    subtitle: "Clean Energy Online 24/7",
    desc: "System switched live! The home runs on self-generated clean solar energy with live mobile monitoring for yield, battery backup, and grid export.",
    badge: "ZERO POWER BILL",
    color: "#8DC63F",
    accentHex: 0x8dc63f,
    specs: [
      { label: "Live Output", value: "4.5 kW Current Yield" },
      { label: "Bill Reduction", value: "Up to 85% Savings" },
      { label: "CO₂ Avoided", value: "5.8 Tons/Year" },
    ],
    annotations: [
      { label: "4.64 kWp SOLAR ARRAY", detail: "Generating 100% Clean Power", pos: [0.4, 5.3, 0.1] },
      { label: "NET METER EXPORT", detail: "Selling Surplus to Grid", pos: [-4.8, 1.9, 0.2] },
      { label: "HOME POWERED", detail: "Appliances Run Free on Solar", pos: [2.0, 2.0, 1.8] },
    ],
  },
];

/* Realistic architectural models & textures are imported from RealisticSolarVilla */

/* ─────────────────────────────────────────────────────────────
   LOADING SCREEN
───────────────────────────────────────────────────────────── */
function LoadingScreen() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          background: "rgba(7, 31, 30, 0.95)",
          backdropFilter: "blur(20px)",
          padding: "2rem 3rem",
          borderRadius: 20,
          border: "1px solid rgba(141,198,63,0.3)",
          textAlign: "center",
          color: "#ffffff",
          fontFamily: "var(--font-display)",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "3px solid rgba(141,198,63,0.2)",
            borderTopColor: "#8DC63F",
            borderRadius: "50%",
            margin: "0 auto 1.25rem",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 4 }}>
          Rendering 3D Installation Scene
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
          {Math.round(progress)}% loaded
        </div>
      </div>
    </Html>
  );
}

/* ─────────────────────────────────────────────────────────────
   INTERACTIVE 3D MODAL WALKTHROUGH
───────────────────────────────────────────────────────────── */
export function SolarProcessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const data = STEPS[activeStep];
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const stepAnnotations = STEPS[activeStep]?.annotations || [];
  const activeColor = STEPS[activeStep]?.color || "#8DC63F";

  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and prevent background Lenis scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1));
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        setActiveStep((prev) => Math.max(0, prev - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Native non-passive wheel & touch handling to completely eliminate scroll overflow
    const el = modalRef.current;
    if (!el) return;

    let deltaAccumulator = 0;
    let isCooldown = false;
    let cooldownTimeout: NodeJS.Timeout | null = null;
    let idleTimeout: NodeJS.Timeout | null = null;

    const onWheel = (e: WheelEvent) => {
      // Always consume event so it never reaches window or Lenis
      e.preventDefault();
      e.stopPropagation();

      // Reset decay timeout
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        deltaAccumulator = 0;
      }, 140);

      // If currently in step cooldown, ignore accumulation
      if (isCooldown) return;

      deltaAccumulator += e.deltaY;

      // Threshold to trigger step transition smoothly without double-stepping
      if (Math.abs(deltaAccumulator) >= 35) {
        const direction = deltaAccumulator > 0 ? 1 : -1;
        deltaAccumulator = 0;
        isCooldown = true;

        setActiveStep((prev) => {
          const next = prev + direction;
          return Math.max(0, Math.min(STEPS.length - 1, next));
        });

        if (cooldownTimeout) clearTimeout(cooldownTimeout);
        cooldownTimeout = setTimeout(() => {
          isCooldown = false;
        }, 360);
      }
    };

    // Touch swipe support for mobile/tablets
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        // Prevent background mobile overscroll bounce
        e.preventDefault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.changedTouches.length === 1 && !isCooldown) {
        const touchEndY = e.changedTouches[0].clientY;
        const diff = touchStartY - touchEndY;
        if (Math.abs(diff) > 40) {
          isCooldown = true;
          setActiveStep((prev) => {
            const next = diff > 0 ? prev + 1 : prev - 1;
            return Math.max(0, Math.min(STEPS.length - 1, next));
          });
          setTimeout(() => {
            isCooldown = false;
          }, 360);
        }
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (cooldownTimeout) clearTimeout(cooldownTimeout);
      if (idleTimeout) clearTimeout(idleTimeout);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="How it works - 3D Solar Installation Process"
      data-lenis-prevent="true"
      data-lenis-prevent-wheel="true"
      data-lenis-prevent-touch="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#071f1e",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        overscrollBehavior: "contain",
        touchAction: "none",
      }}
    >
      {/* ── TOP HUD HEADER BAR ── */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 72,
          padding: "0 clamp(1rem, 3vw, 2rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(7, 31, 30, 0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(141,198,63,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <Image
            src="/fro-logo.png"
            alt="FRO Solar Logo"
            width={120}
            height={42}
            style={{ height: "clamp(32px, 5vw, 42px)", width: "auto", objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(0.8125rem, 2vw, 0.95rem)",
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              <span>3D Walkthrough</span>
              <span
                style={{
                  fontSize: 10,
                  color: "var(--color-fro-green)",
                  background: "rgba(141,198,63,0.15)",
                  padding: "0.15rem 0.5rem",
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                INTERACTIVE
              </span>
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-body)" }}>
              Step-by-step engineering walkthrough across Davao del Sur
            </div>
          </div>
        </div>

        {/* Phase Pill Selector Bar in Top Nav */}
        <div
          style={{
            display: "none",
            gap: "0.35rem",
            background: "rgba(255,255,255,0.05)",
            padding: "0.25rem",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
          className="md:flex"
        >
          {STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveStep(idx)}
              style={{
                background: activeStep === idx ? s.color : "transparent",
                color: activeStep === idx ? "#071f1e" : "rgba(255,255,255,0.65)",
                border: "none",
                borderRadius: 999,
                padding: "0.35rem 0.85rem",
                fontFamily: "var(--font-display)",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {s.step} {s.title.split("&")[0]}
            </button>
          ))}
        </div>

        {/* Close Modal Button */}
        <button
          onClick={onClose}
          aria-label="Close 3D walkthrough"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            color: "#ffffff",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.875rem",
            padding: "0.5rem 1.25rem",
            borderRadius: 9999,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.18)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
          }}
        >
          ✕ Close
        </button>
      </header>

      {/* ── FULLSCREEN 3D CANVAS VIEWPORT ── */}
      <div style={{ position: "relative", width: "100%", height: "100%", paddingTop: 72 }}>
        <Canvas
          shadows
          camera={{ position: [-0.6, 7.2, 13.8], fov: 45, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#bfe0ef"]} />

          <Suspense fallback={<LoadingScreen />}>
            <RealisticCameraController activeStep={activeStep} controlsRef={controlsRef} />
            <PhotorealisticEnvironment activeStep={activeStep} />
            <ModernTropicalSolarVilla activeStep={activeStep} />

            {/* Overlays */}
            {activeStep === 0 && <SurveyLaserScanner roofTilt={0.314} roofY={3.75} />}
            {activeStep === 1 && <HolographicCADOverlay roofTilt={0.314} roofY={3.75} />}
            {activeStep >= 6 && <ElectricalCurrentFlow />}
            {stepAnnotations.map((anno, idx) => (
              <Annotation3D key={idx} item={anno} color={activeColor} />
            ))}
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.06}
            maxPolarAngle={Math.PI / 2 - 0.02}
            minDistance={4}
            maxDistance={25}
          />
        </Canvas>

        {/* ── FLOATING 360° INSPECT HINT & RESET PERSPECTIVE ── */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(1rem, 3vw, 5.5rem)",
            right: "clamp(0.75rem, 2.5vw, 2rem)",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            className="hidden sm:flex"
            style={{
              background: "rgba(7, 31, 30, 0.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(141,198,63,0.3)",
              borderRadius: 9999,
              padding: "0.45rem 1rem",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: 12,
              color: "rgba(255,255,255,0.85)",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "var(--color-fro-green)", fontSize: 13 }}>✦</span>
            <span>360° Free Orbit &amp; Zoom</span>
          </div>

          <button
            onClick={() => {
              if (controlsRef.current) {
                // Re-trigger camera glide to current phase
                const evt = new CustomEvent("resetPhaseView");
                window.dispatchEvent(evt);
              }
            }}
            style={{
              background: "rgba(7, 31, 30, 0.88)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999,
              padding: "0.45rem 0.85rem",
              fontSize: 12,
              color: "#ffffff",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              transition: "all 0.2s ease",
            }}
            title="Re-align camera to current phase perspective"
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-fro-green)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")}
          >
            ↺ Reset View
          </button>
        </div>

        {/* ── LEFT HUD TELEMETRY CARD ── */}
        <div
          className="absolute z-40 top-20 left-3 right-3 sm:top-24 sm:left-6 sm:right-auto sm:max-w-[390px] md:max-w-[420px] max-h-[calc(100dvh-130px)] overflow-y-auto"
        >
          <div
            style={{
              background: "rgba(7, 31, 30, 0.94)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${data.color}55`,
              borderRadius: 18,
              padding: "clamp(1rem, 2.5vw, 1.75rem)",
              boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 32px ${data.color}18`,
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Header Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.85rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: data.color,
                  background: `${data.color}18`,
                  border: `1px solid ${data.color}44`,
                  padding: "0.25rem 0.65rem",
                  borderRadius: 6,
                  textTransform: "uppercase",
                }}
              >
                {data.badge}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 12,
                    color: data.color,
                  }}
                >
                  PHASE {data.step}
                </span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>OF 08</span>
              </div>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "1.3rem",
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "0.3rem",
                letterSpacing: "-0.02em",
              }}
            >
              {data.title}
            </h3>

            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: data.color,
                marginBottom: "0.75rem",
              }}
            >
              {data.subtitle}
            </h4>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.78)",
                lineHeight: 1.6,
                marginBottom: "1rem",
              }}
            >
              {data.desc}
            </p>

            {/* Spec tags */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "0.45rem",
                paddingTop: "0.85rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                marginBottom: "1rem",
              }}
            >
              {data.specs.map((spec, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    padding: "0.45rem 0.55rem",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.45)",
                      fontFamily: "var(--font-body)",
                      marginBottom: 2,
                    }}
                  >
                    {spec.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#ffffff",
                      fontFamily: "var(--font-display)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Step Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "0.65rem",
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                disabled={activeStep === 0}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: activeStep === 0 ? "rgba(255,255,255,0.25)" : "#ffffff",
                  padding: "0.4rem 0.85rem",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: activeStep === 0 ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-display)",
                }}
              >
                ← Previous
              </button>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                Scroll or use arrow keys
              </span>
              <button
                onClick={() => setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1))}
                disabled={activeStep === STEPS.length - 1}
                style={{
                  background: data.color,
                  border: "none",
                  color: "#071f1e",
                  padding: "0.4rem 0.85rem",
                  borderRadius: 6,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: activeStep === STEPS.length - 1 ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-display)",
                }}
              >
                Next Phase →
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT STEP PILL SELECTOR ── */}
        <div
          className="hidden lg:flex"
          style={{
            position: "absolute",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 40,
            flexDirection: "column",
            gap: "0.65rem",
          }}
        >
          {STEPS.map((s, idx) => {
            const isActive = activeStep === idx;
            const isPast = activeStep > idx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStep(idx)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  justifyContent: "flex-end",
                }}
              >
                {isActive && (
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 11,
                      color: s.color,
                      background: "rgba(7, 31, 30, 0.9)",
                      padding: "0.25rem 0.65rem",
                      borderRadius: 6,
                      border: `1px solid ${s.color}50`,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.step}. {s.title}
                  </span>
                )}
                <div
                  style={{
                    width: isActive ? 12 : 8,
                    height: isActive ? 32 : 8,
                    borderRadius: 99,
                    background: isActive
                      ? s.color
                      : isPast
                      ? "rgba(141,198,63,0.6)"
                      : "rgba(255,255,255,0.3)",
                    boxShadow: isActive ? `0 0 16px ${s.color}` : "none",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* ── BOTTOM HELPER / HINT ── */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 40,
            pointerEvents: "none",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "rgba(7, 31, 30, 0.88)",
              backdropFilter: "blur(16px)",
              border: `1px solid ${data.color}40`,
              borderRadius: 9999,
              padding: "0.5rem 1.4rem",
              boxShadow: "0 12px 32px rgba(0,0,0,0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 12,
                color: "#ffffff",
                letterSpacing: "0.04em",
              }}
            >
              SCROLL OR CLICK BUTTONS TO ADVANCE
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 11,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              ({activeStep + 1}/8)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   "HOW IT WORKS" TRIGGER BUTTON COMPONENT
───────────────────────────────────────────────────────────── */
export default function HowItWorksTrigger({
  className = "btn-ghost",
  id = "how-it-works-btn",
}: {
  className?: string;
  id?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        id={id}
        onClick={() => setIsOpen(true)}
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          cursor: "pointer",
        }}
      >
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
      </button>

      <SolarProcessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
