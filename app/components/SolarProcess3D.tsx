"use client";

import React, { useRef, useMemo, useState, useEffect, useCallback, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import {
  ModernTropicalSolarVilla,
  PhotorealisticEnvironment,
  Annotation3D,
  SurveyLaserScanner,
  HolographicCADOverlay,
  ElectricalCurrentFlow,
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



/* ─────────────────────────────────────────────────────────────
   CINEMATIC CAMERA CONTROLLER (Driven directly by progress 0->1)
───────────────────────────────────────────────────────────── */
function CameraController({
  scrollProgress,
  onStepChange,
}: {
  scrollProgress: number;
  onStepChange: (stepIdx: number) => void;
}) {
  const { camera } = useThree();

  const cameraWaypoints = useMemo(
    () => [
      // 01: Site Survey
      { pos: new THREE.Vector3(-0.6, 7.2, 13.5), target: new THREE.Vector3(-0.6, 3.2, 0) },
      // 02: CAD Blueprint
      { pos: new THREE.Vector3(1.2, 9.0, 9.0), target: new THREE.Vector3(-0.4, 3.8, 0) },
      // 03: Permitting
      { pos: new THREE.Vector3(-5.5, 6.8, 10.5), target: new THREE.Vector3(-0.5, 3.4, 0) },
      // 04: Racking & Mounting
      { pos: new THREE.Vector3(3.5, 5.8, 5.8), target: new THREE.Vector3(0.2, 4.0, 0) },
      // 05: Module Assembly
      { pos: new THREE.Vector3(-2.6, 5.4, 6.8), target: new THREE.Vector3(-0.3, 3.9, 0) },
      // 06: Hybrid Inverter & Battery (Camera glides to the left utility wall)
      { pos: new THREE.Vector3(-7.5, 2.4, 3.6), target: new THREE.Vector3(-4.5, 1.4, 0) },
      // 07: Testing & Voltage Verification
      { pos: new THREE.Vector3(-4.8, 4.8, 10.5), target: new THREE.Vector3(-1.2, 2.6, 0) },
      // 08: Commissioned Hero Shot
      { pos: new THREE.Vector3(5.2, 6.8, 12.5), target: new THREE.Vector3(-0.4, 3.0, 0) },
    ],
    []
  );

  const curPos = useRef(new THREE.Vector3());
  const curTarget = useRef(new THREE.Vector3());
  const lastStep = useRef(-1);

  useFrame(() => {
    const t = Math.max(0, Math.min(1, scrollProgress));
    const stepFloat = t * (STEPS.length - 1);
    const stepIdx = Math.min(Math.floor(stepFloat), STEPS.length - 2);
    const subProgress = stepFloat - stepIdx;

    const from = cameraWaypoints[stepIdx];
    const to = cameraWaypoints[stepIdx + 1];

    curPos.current.lerpVectors(from.pos, to.pos, subProgress);
    curTarget.current.lerpVectors(from.target, to.target, subProgress);

    camera.position.lerp(curPos.current, 0.09);
    camera.lookAt(curTarget.current);

    const nearestStep = Math.round(stepFloat);
    if (nearestStep !== lastStep.current) {
      lastStep.current = nearestStep;
      onStepChange(nearestStep);
    }
  });

  return null;
}

/* ─────────────────────────────────────────────────────────────
   3D IN-SCENE METRICS HUD CARD
───────────────────────────────────────────────────────────── */
function HUDCard({
  activeStep,
  onSelectStep,
}: {
  activeStep: number;
  onSelectStep: (idx: number) => void;
}) {
  const data = STEPS[activeStep];

  return (
    <div
      style={{
        position: "fixed",
        top: "6.5rem",
        left: "2.5rem",
        zIndex: 40,
        maxWidth: 440,
      }}
    >
      <div
        style={{
          background: "rgba(7, 31, 30, 0.94)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${data.color}55`,
          borderRadius: 20,
          padding: "1.75rem",
          boxShadow: `0 24px 64px rgba(0,0,0,0.5), 0 0 32px ${data.color}18`,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Step Badge & Navigation Counter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.08em",
              color: data.color,
              background: `${data.color}18`,
              border: `1px solid ${data.color}44`,
              padding: "0.3rem 0.75rem",
              borderRadius: 8,
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
                fontSize: 13,
                color: data.color,
              }}
            >
              PHASE {data.step}
            </span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>OF 08</span>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "1.375rem",
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: "0.35rem",
            letterSpacing: "-0.02em",
          }}
        >
          {data.title}
        </h3>

        <h4
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.875rem",
            color: data.color,
            marginBottom: "0.85rem",
          }}
        >
          {data.subtitle}
        </h4>

        {/* Narrative Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.65,
            marginBottom: "1.25rem",
          }}
        >
          {data.desc}
        </p>

        {/* Engineering Specifications Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            marginBottom: "1rem",
          }}
        >
          {data.specs.map((spec, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.04)",
                padding: "0.5rem 0.6rem",
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

        {/* Phase Quick Navigation Buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "0.75rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <button
            onClick={() => onSelectStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: activeStep === 0 ? "rgba(255,255,255,0.25)" : "#ffffff",
              padding: "0.35rem 0.75rem",
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
            Scroll or click to step
          </span>
          <button
            onClick={() => onSelectStep(Math.min(STEPS.length - 1, activeStep + 1))}
            disabled={activeStep === STEPS.length - 1}
            style={{
              background: data.color,
              border: "none",
              color: "#071f1e",
              padding: "0.35rem 0.75rem",
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
  );
}

/* ─────────────────────────────────────────────────────────────
   RIGHT SIDEBAR STEP SELECTOR / CLICKABLE PROGRESS
───────────────────────────────────────────────────────────── */
function StepNavigation({
  activeStep,
  onSelectStep,
}: {
  activeStep: number;
  onSelectStep: (idx: number) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        right: "2rem",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 40,
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {STEPS.map((s, idx) => {
        const isActive = activeStep === idx;
        const isPast = activeStep > idx;
        return (
          <button
            key={s.id}
            onClick={() => onSelectStep(idx)}
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
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
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
  );
}

/* ─────────────────────────────────────────────────────────────
   BOTTOM SCROLL HELPER
───────────────────────────────────────────────────────────── */
function BottomHelper({ activeStep }: { activeStep: number }) {
  const data = STEPS[activeStep];
  return (
    <div
      style={{
        position: "fixed",
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
          padding: "0.6rem 1.6rem",
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
          SCROLL TO EXPLORE NEXT STEP
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
  );
}

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
   ROOT EXPORT COMPONENT
───────────────────────────────────────────────────────────── */
export default function SolarProcess3D() {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [webGLOk] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      const c = document.createElement("canvas");
      return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
    } catch {
      return false;
    }
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize 3D camera & animation directly with page scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;
      if (scrollableDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDist));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click to jump to any step
  const handleSelectStep = useCallback((stepIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollableDist = rect.height - window.innerHeight;
    const targetScrollY = containerTop + (stepIdx / (STEPS.length - 1)) * scrollableDist;
    window.scrollTo({ top: targetScrollY, behavior: "smooth" });
  }, []);

  if (!webGLOk) {
    return (
      <div style={{ padding: "4rem", textAlign: "center", background: "#071f1e", color: "#fff" }}>
        <h2>Interactive 3D Solar Installation</h2>
        <p>Your browser or device does not support WebGL hardware acceleration.</p>
      </div>
    );
  }

  return (
    <section
      id="process"
      aria-label="Solar installation 3D process"
      style={{
        position: "relative",
        background: "#071f1e",
      }}
    >
      {/* ── SECTION HEADER ── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          textAlign: "center",
          padding: "6rem 1.5rem 2rem",
          background: "linear-gradient(to bottom, #071f1e 0%, rgba(7,31,30,0) 100%)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.25rem",
            background: "rgba(141,198,63,0.12)",
            border: "1px solid rgba(141,198,63,0.3)",
            borderRadius: 9999,
            padding: "0.4rem 1.2rem",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.75rem",
            color: "var(--color-fro-green)",
            letterSpacing: "0.06em",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--color-fro-green)",
            }}
          />
          INTERACTIVE 3D ENGINEERING WALKTHROUGH
        </div>

        <h2
          style={{
            color: "#ffffff",
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            letterSpacing: "-0.035em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Turnkey Solar Installation,{" "}
          <span style={{ color: "var(--color-fro-green)" }}>Step by Step</span>
        </h2>

        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "var(--font-body)",
            fontSize: "1.0625rem",
            maxWidth: "54ch",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Experience our complete engineering workflow — from 3D roof scanning and heavy-duty racking to live grid energization.
        </p>
      </div>

      {/* ── SCROLL-DRIVEN 3D CANVAS VIEWPORT ── */}
      <div
        ref={containerRef}
        style={{
          height: `${STEPS.length * 90}vh`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Canvas
            shadows
            camera={{ position: [-0.6, 7.2, 13.5], fov: 46, near: 0.1, far: 200 }}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            dpr={[1, 1.5]}
          >
            <color attach="background" args={["#bcdde9"]} />

            <Suspense fallback={<LoadingScreen />}>
              <CameraController
                scrollProgress={scrollProgress}
                onStepChange={setActiveStep}
              />
              <PhotorealisticEnvironment activeStep={activeStep} />
              <ModernTropicalSolarVilla activeStep={activeStep} />

              {/* Overlays */}
              {activeStep === 0 && <SurveyLaserScanner roofTilt={0.314} roofY={3.75} />}
              {activeStep === 1 && <HolographicCADOverlay roofTilt={0.314} roofY={3.75} />}
              {activeStep >= 6 && <ElectricalCurrentFlow />}
              {STEPS[activeStep]?.annotations?.map((anno, idx) => (
                <Annotation3D key={idx} item={anno} color={STEPS[activeStep]?.color || "#8DC63F"} />
              ))}
            </Suspense>
          </Canvas>

          {/* ── INTERACTIVE DOM OVERLAYS ── */}
          <HUDCard activeStep={activeStep} onSelectStep={handleSelectStep} />
          <StepNavigation activeStep={activeStep} onSelectStep={handleSelectStep} />
          <BottomHelper activeStep={activeStep} />
        </div>
      </div>
    </section>
  );
}
