"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";

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
      { label: "ROOF AZIMUTH", detail: "180° South (Max Yield)", pos: [0, 4.4, 1.2] },
      { label: "USABLE ROOF AREA", detail: "48.5 m² (Zero Shading)", pos: [2.5, 4.2, -0.5] },
      { label: "OPTICAL LASER SCAN", detail: "Active LIDAR Sweep", pos: [-2.5, 4.6, 0.8] },
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
      { label: "STRING 1 CIRCUIT", detail: "4 × 580W (2.32 kWp)", pos: [-1.8, 4.3, 0] },
      { label: "STRING 2 CIRCUIT", detail: "4 × 580W (2.32 kWp)", pos: [1.8, 4.3, 0] },
      { label: "FIRE SETBACK", detail: "300mm Ridge Clearance", pos: [0, 4.6, -1.8] },
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
      { label: "WIND LOAD RATED", detail: "250 km/h Typhoon Resistance", pos: [0, 4.4, 0] },
      { label: "LGU DIGOS CLEARANCE", detail: "Permit No. 2026-3925", pos: [-2.5, 3.8, 1.5] },
      { label: "TESDA NC II SEAL", detail: "Certified Master Electrician", pos: [2.5, 3.8, 1.5] },
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
      { label: "AL6005-T5 RAILS", detail: "Continuous C-Channel Rails", pos: [0, 4.2, 0.6] },
      { label: "SUS304 L-FEET", detail: "Bolted into Rafters", pos: [2.2, 4.0, 1.4] },
      { label: "EPDM WATERPROOF GASKET", detail: "UV-Resistant Flashing Seal", pos: [-2.2, 4.0, 1.4] },
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
      { label: "580W MONO MODULE", detail: "Tier-1 Half-Cut PERC", pos: [-1.2, 4.3, 0.4] },
      { label: "MID-CLAMP & BOLT", detail: "Stainless Hex Torque Lock", pos: [0, 4.3, 0.4] },
      { label: "TEMPERED ARC GLASS", detail: "Anti-Reflective Specular", pos: [1.8, 4.3, -0.6] },
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
      { label: "5kW HYBRID INVERTER", detail: "IP65 with Heatsink Fins", pos: [-4.6, 2.0, 0] },
      { label: "10 kWh LiFePO4 BATTERY", detail: "Modular Energy Storage", pos: [-4.6, 0.8, 0] },
      { label: "EMT SOLAR CONDUIT", detail: "Rigid Shielded Conduit", pos: [-4.6, 3.0, 0] },
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
      { label: "VOLTAGE VERIFIED", detail: "382.4V DC String Voc Pass", pos: [-3.8, 2.2, 0.5] },
      { label: "GROUND BONDING", detail: "< 3.5 Ω Ground Impedance", pos: [-4.6, 0.2, 0.5] },
      { label: "LIVE CURRENT FLOW", detail: "DC-to-AC Conversion", pos: [-2.0, 3.2, 0.5] },
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
      { label: "4.64 kWp SOLAR ARRAY", detail: "Generating 100% Clean Power", pos: [0, 4.5, 0] },
      { label: "NET METER EXPORT", detail: "Selling Surplus to Grid", pos: [-4.6, 1.8, 0] },
      { label: "HOME POWERED", detail: "Appliances Run Free on Solar", pos: [1.5, 2.0, 2.0] },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   PROCEDURAL TEXTURE GENERATORS
───────────────────────────────────────────────────────────── */
function createSolarCellTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#0c1626";
  ctx.fillRect(0, 0, 1024, 1024);

  const cols = 6;
  const rows = 10;
  const cellW = 1024 / cols;
  const cellH = 1024 / rows;
  const margin = 2.5;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = c * cellW + margin;
      const y = r * cellH + margin;
      const w = cellW - margin * 2;
      const h = cellH - margin * 2;

      const grad = ctx.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0, "#0e1e36");
      grad.addColorStop(0.5, "#0b172a");
      grad.addColorStop(1, "#08111f");
      ctx.fillStyle = grad;

      const corner = 7;
      ctx.beginPath();
      ctx.moveTo(x + corner, y);
      ctx.lineTo(x + w - corner, y);
      ctx.lineTo(x + w, y + corner);
      ctx.lineTo(x + w, y + h - corner);
      ctx.lineTo(x + w - corner, y + h);
      ctx.lineTo(x + corner, y + h);
      ctx.lineTo(x, y + h - corner);
      ctx.lineTo(x, y + corner);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(230, 240, 255, 0.9)";
      ctx.lineWidth = 1.2;
      for (let b = 1; b <= 9; b++) {
        const bx = x + (w / 10) * b;
        ctx.beginPath();
        ctx.moveTo(bx, y);
        ctx.lineTo(bx, y + h);
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(180, 210, 245, 0.28)";
      ctx.lineWidth = 0.5;
      for (let f = 1; f < 28; f++) {
        const fy = y + (h / 28) * f;
        ctx.beginPath();
        ctx.moveTo(x, fy);
        ctx.lineTo(x + w, fy);
        ctx.stroke();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createRoofTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#22252a";
  ctx.fillRect(0, 0, 512, 512);

  const ribSpacing = 32;
  for (let x = 0; x < 512; x += ribSpacing) {
    ctx.fillStyle = "#383d45";
    ctx.fillRect(x, 0, 3, 512);
    ctx.fillStyle = "#141618";
    ctx.fillRect(x + 3, 0, 2, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function createWoodSlatTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#8a5832";
  ctx.fillRect(0, 0, 256, 256);

  const slatH = 16;
  for (let y = 0; y < 256; y += slatH) {
    ctx.fillStyle = "#9e673c";
    ctx.fillRect(0, y + 1, 256, slatH - 2);
    ctx.fillStyle = "#4a2d18";
    ctx.fillRect(0, y + slatH - 2, 256, 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 6);
  return texture;
}

/* ─────────────────────────────────────────────────────────────
   DETAILED SOLAR PANEL (With Frame, Glass & Clamps)
───────────────────────────────────────────────────────────── */
function DetailedSolarPanel({
  position,
  rotation,
  visible = true,
  scale = 1,
  highlighted = false,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  visible?: boolean;
  scale?: number;
  highlighted?: boolean;
}) {
  const cellTex = useMemo(() => createSolarCellTexture(), []);

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xd0d0d0,
        metalness: 0.92,
        roughness: 0.18,
      }),
    []
  );

  const cellMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: cellTex,
        color: highlighted ? 0xb0e5ff : 0xffffff,
        metalness: 0.88,
        roughness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        reflectivity: 1.0,
      }),
    [cellTex, highlighted]
  );

  const clampMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        metalness: 0.95,
        roughness: 0.2,
      }),
    []
  );

  if (!visible) return null;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh material={frameMaterial} castShadow>
        <boxGeometry args={[1.76, 0.045, 1.04]} />
      </mesh>
      <mesh position={[0, 0.024, 0]} material={cellMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.72, 0.008, 1.0]} />
      </mesh>
      <mesh position={[0, -0.03, 0.35]} castShadow>
        <boxGeometry args={[0.22, 0.03, 0.14]} />
        <meshStandardMaterial color={0x181818} roughness={0.7} />
      </mesh>
      {[-0.86, 0.86].map((x, i) => (
        <group key={i} position={[x, 0.03, 0]}>
          <mesh material={clampMaterial} castShadow>
            <boxGeometry args={[0.04, 0.02, 0.08]} />
          </mesh>
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.008, 0.008, 0.01, 8]} />
            <meshStandardMaterial color={0xdddddd} metalness={0.95} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   ALUMINUM RACKING SYSTEM (Unistrut Rails & L-Feet)
───────────────────────────────────────────────────────────── */
function RackingSystem({
  visible = true,
  roofAngle,
  roofY,
}: {
  visible: boolean;
  roofAngle: number;
  roofY: number;
}) {
  const railMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xdcdcdc,
        metalness: 0.95,
        roughness: 0.2,
      }),
    []
  );

  const bracketMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xbbbbbb,
        metalness: 0.92,
        roughness: 0.25,
      }),
    []
  );

  if (!visible) return null;

  const railZPositions = [-1.55, -0.52, 0.52, 1.55];

  return (
    <group position={[0, roofY + 0.05, 0]} rotation={[roofAngle, 0, 0]}>
      {railZPositions.map((z, idx) => (
        <group key={idx} position={[0, 0.04, z]}>
          <mesh material={railMat} castShadow>
            <boxGeometry args={[7.8, 0.045, 0.045]} />
          </mesh>
          {[-3.2, -1.6, 0, 1.6, 3.2].map((x, bIdx) => (
            <group key={bIdx} position={[x, -0.04, 0]}>
              <mesh material={bracketMat} castShadow>
                <boxGeometry args={[0.05, 0.08, 0.05]} />
              </mesh>
              <mesh position={[0, -0.045, 0]}>
                <boxGeometry args={[0.08, 0.01, 0.08]} />
                <meshStandardMaterial color={0x111111} roughness={0.9} />
              </mesh>
            </group>
          ))}
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   3D FLOATING ANNOTATION TAGS
───────────────────────────────────────────────────────────── */
function Annotation3D({
  item,
  color,
}: {
  item: { label: string; detail: string; pos: [number, number, number] };
  color: string;
}) {
  return (
    <group position={item.pos}>
      <Html center distanceFactor={14}>
        <div
          style={{
            background: "rgba(7, 31, 30, 0.94)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${color}`,
            borderRadius: 10,
            padding: "0.45rem 0.85rem",
            boxShadow: `0 8px 24px rgba(0,0,0,0.5), 0 0 12px ${color}33`,
            pointerEvents: "none",
            whiteSpace: "nowrap",
            transform: "translate(-50%, -100%)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: 10,
              color: color,
              letterSpacing: "0.06em",
              marginBottom: 2,
            }}
          >
            ● {item.label}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 11,
              color: "#ffffff",
              fontWeight: 600,
            }}
          >
            {item.detail}
          </div>
        </div>
      </Html>
      <mesh>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={new THREE.Color(color)} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   PHILIPPINE MODERN TROPICAL ARCHITECTURAL VILLA
───────────────────────────────────────────────────────────── */
function ModernSolarHouse({ activeStep }: { activeStep: number }) {
  const roofTex = useMemo(() => createRoofTexture(), []);
  const woodTex = useMemo(() => createWoodSlatTexture(), []);

  const stuccoMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xf6f5f0,
        roughness: 0.88,
        metalness: 0.05,
      }),
    []
  );

  const charcoalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x252930,
        roughness: 0.5,
        metalness: 0.5,
      }),
    []
  );

  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: woodTex,
        roughness: 0.75,
        metalness: 0.1,
      }),
    [woodTex]
  );

  const roofMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: roofTex,
        roughness: 0.35,
        metalness: 0.8,
      }),
    [roofTex]
  );

  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x1a2b38,
        metalness: 0.2,
        roughness: 0.05,
        transmission: 0.8,
        thickness: 0.4,
        transparent: true,
        opacity: 0.85,
        reflectivity: 0.95,
      }),
    []
  );

  const roofTilt = 0.314;
  const roofCenterY = 3.65;

  const panelCount = activeStep < 4 ? 0 : activeStep === 4 ? 4 : 8;

  const panelsLayout = useMemo(() => {
    const arr: { pos: [number, number, number]; rot: [number, number, number] }[] = [];
    const cols = 4;
    const rows = 2;
    const spacingX = 1.84;
    const spacingZ = 1.1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - 1.5) * spacingX;
        const zLocal = (r - 0.5) * spacingZ;
        const y = roofCenterY + 0.15 - Math.sin(roofTilt) * zLocal;
        const z = Math.cos(roofTilt) * zLocal;
        arr.push({
          pos: [x, y, z],
          rot: [roofTilt, 0, 0],
        });
      }
    }
    return arr;
  }, [roofCenterY, roofTilt]);

  const stepAnnotations = STEPS[activeStep]?.annotations || [];
  const activeColor = STEPS[activeStep]?.color || "#8DC63F";

  return (
    <group position={[0, 0, 0]}>
      {/* ── CONCRETE PATIO / FOUNDATION PLINTH ── */}
      <mesh position={[0, 0.1, 0.4]} receiveShadow>
        <boxGeometry args={[11.5, 0.2, 9]} />
        <meshStandardMaterial color={0xdcdcdc} roughness={0.8} />
      </mesh>

      {/* ── GROUND FLOOR STRUCTURE ── */}
      <mesh position={[0, 1.6, 0]} material={stuccoMat} castShadow receiveShadow>
        <boxGeometry args={[9.0, 3.0, 6.4]} />
      </mesh>

      {/* ── WOOD ACCENT PORTICO / ENTRANCE WALL ── */}
      <mesh position={[-3.2, 1.6, 3.22]} material={woodMat} castShadow>
        <boxGeometry args={[2.2, 2.9, 0.08]} />
      </mesh>

      {/* ── ENTRANCE DOOR ── */}
      <mesh position={[-3.2, 1.3, 3.27]} castShadow>
        <boxGeometry args={[1.0, 2.3, 0.04]} />
        <meshStandardMaterial color={0x3a2215} roughness={0.7} />
      </mesh>
      <mesh position={[-2.8, 1.3, 3.3]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        <meshStandardMaterial color={0xcccccc} metalness={0.9} />
      </mesh>

      {/* ── MODERN BLACK-FRAMED SLIDING GLASS DOORS ── */}
      <mesh position={[1.4, 1.4, 3.22]} material={glassMat} castShadow>
        <boxGeometry args={[4.4, 2.4, 0.05]} />
      </mesh>
      {[-0.8, 0.6, 2.0, 3.4].map((x, i) => (
        <mesh key={i} position={[x - 0.6, 1.4, 3.24]} material={charcoalMat}>
          <boxGeometry args={[0.05, 2.45, 0.06]} />
        </mesh>
      ))}

      {/* ── WARM INTERIOR GLOW ── */}
      <pointLight position={[1.4, 1.6, 1.5]} intensity={0.4} color={0xffe2b0} distance={6} />

      {/* ── MAIN ROOF (Sloping Forward, Fully Visible) ── */}
      <group position={[0, roofCenterY, 0]} rotation={[roofTilt, 0, 0]}>
        <mesh material={roofMat} castShadow receiveShadow>
          <boxGeometry args={[9.4, 0.12, 4.4]} />
        </mesh>
        <mesh position={[0, 0.08, -2.2]} material={charcoalMat}>
          <boxGeometry args={[9.5, 0.06, 0.12]} />
        </mesh>
        <mesh position={[0, -0.06, 2.2]} material={charcoalMat} castShadow>
          <boxGeometry args={[9.5, 0.16, 0.08]} />
        </mesh>
      </group>

      {/* ── ALUMINUM RACKING RAILS & L-FEET ── */}
      <RackingSystem
        visible={activeStep >= 3}
        roofAngle={roofTilt}
        roofY={roofCenterY}
      />

      {/* ── 8 HIGH-EFFICIENCY MONOCRYSTALLINE PANELS ── */}
      {panelsLayout.map((p, idx) => (
        <DetailedSolarPanel
          key={idx}
          position={p.pos}
          rotation={p.rot}
          visible={idx < panelCount}
          highlighted={activeStep >= 6}
        />
      ))}

      {/* ── ALUMINUM EXTENSION LADDER ── */}
      {activeStep >= 2 && activeStep <= 5 && (
        <group position={[4.1, 1.9, 1.8]} rotation={[-0.24, 0.05, 0]}>
          {[-0.22, 0.22].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 4.2, 0.06]} />
              <meshStandardMaterial color={0xb5b5b5} metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
          {Array.from({ length: 11 }).map((_, i) => (
            <mesh key={i} position={[0, -1.8 + i * 0.36, 0]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color={0xcccccc} metalness={0.9} />
            </mesh>
          ))}
        </group>
      )}

      {/* ── UTILITY ELECTRICAL WALL (Inverter, Battery, Conduit) ── */}
      <UtilityElectricalWall activeStep={activeStep} />

      {/* ── SITE SURVEY LASER SCAN (Step 1) ── */}
      {activeStep === 0 && <SurveyLaserScanner roofTilt={roofTilt} roofY={roofCenterY} />}

      {/* ── HOLOGRAPHIC CAD BLUEPRINT (Step 2) ── */}
      {activeStep === 1 && <HolographicCADOverlay roofTilt={roofTilt} roofY={roofCenterY} />}

      {/* ── ELECTRICAL CURRENT FLOW (Step 7 & 8) ── */}
      {activeStep >= 6 && <ElectricalCurrentFlow />}

      {/* ── 3D ANNOTATIONS PER STEP ── */}
      {stepAnnotations.map((anno, idx) => (
        <Annotation3D key={idx} item={anno} color={activeColor} />
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   UTILITY ELECTRICAL WALL (Inverter, Battery & Conduit)
───────────────────────────────────────────────────────────── */
function UtilityElectricalWall({ activeStep }: { activeStep: number }) {
  const isPowered = activeStep >= 5;

  return (
    <group position={[-4.54, 1.4, 0]}>
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2.4, 12]} />
        <meshStandardMaterial color={0x999999} metalness={0.95} roughness={0.2} />
      </mesh>

      <group position={[0, 0.35, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.82, 0.56]} />
          <meshStandardMaterial color={0xf2f2f2} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.08, 0, 0]}>
          <boxGeometry args={[0.04, 0.78, 0.5]} />
          <meshStandardMaterial color={0x2b2b2b} metalness={0.9} />
        </mesh>
        <mesh position={[0.112, 0.12, 0]}>
          <boxGeometry args={[0.005, 0.22, 0.36]} />
          <meshStandardMaterial
            color={isPowered ? 0x052414 : 0x111111}
            emissive={isPowered ? 0x8dc63f : 0x000000}
            emissiveIntensity={isPowered ? 0.65 : 0.0}
          />
        </mesh>
        {isPowered && (
          <Text
            position={[0.12, 0.12, 0]}
            rotation={[0, Math.PI / 2, 0]}
            fontSize={0.038}
            color="#8DC63F"
            anchorX="center"
            anchorY="middle"
          >
            4.85 kW | 230V
          </Text>
        )}
        <mesh position={[0.115, -0.15, 0.1]}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <meshStandardMaterial
            color={isPowered ? 0x8dc63f : 0x555555}
            emissive={isPowered ? 0x8dc63f : 0x000000}
            emissiveIntensity={isPowered ? 2.0 : 0}
          />
        </mesh>
        <mesh position={[0.115, -0.22, -0.1]} rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
          <meshStandardMaterial color={isPowered ? 0xd63031 : 0x555555} />
        </mesh>
      </group>

      <group position={[0, -0.65, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.2, 0.95, 0.65]} />
          <meshStandardMaterial color={0x2b2d42} metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0.102, 0, 0]}>
          <boxGeometry args={[0.005, 0.88, 0.58]} />
          <meshStandardMaterial color={0xffffff} roughness={0.3} />
        </mesh>
        <mesh position={[0.108, 0.3, 0]}>
          <boxGeometry args={[0.002, 0.035, 0.38]} />
          <meshStandardMaterial
            color={isPowered ? 0x8dc63f : 0x333333}
            emissive={isPowered ? 0x8dc63f : 0x000000}
            emissiveIntensity={isPowered ? 1.5 : 0}
          />
        </mesh>
        <Text
          position={[0.108, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.045}
          color="#0E4B48"
          anchorX="center"
          anchorY="middle"
        >
          FRO LITHIUM 10kWh
        </Text>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   SURVEY SCANNER (Step 01 Laser Scan)
───────────────────────────────────────────────────────────── */
function SurveyLaserScanner({
  roofTilt,
  roofY,
}: {
  roofTilt: number;
  roofY: number;
}) {
  const scanLineRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (scanLineRef.current) {
      scanLineRef.current.position.z = Math.sin(state.clock.elapsedTime * 2.2) * 1.8;
    }
  });

  return (
    <group position={[0, roofY + 0.1, 0]} rotation={[roofTilt, 0, 0]}>
      <mesh ref={scanLineRef}>
        <boxGeometry args={[9.2, 0.02, 0.08]} />
        <meshBasicMaterial color={0x8dc63f} transparent opacity={0.85} />
      </mesh>
      <mesh position={[0, 0.02, 0]}>
        <planeGeometry args={[8.8, 3.8, 8, 4]} />
        <meshBasicMaterial color={0x60c4ff} wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOLOGRAPHIC CAD OVERLAY (Step 02 System String Layout)
───────────────────────────────────────────────────────────── */
function HolographicCADOverlay({
  roofTilt,
  roofY,
}: {
  roofTilt: number;
  roofY: number;
}) {
  return (
    <group position={[0, roofY + 0.12, 0]} rotation={[roofTilt, 0, 0]}>
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[8.8, 3.8, 16, 8]} />
        <meshBasicMaterial color={0x60c4ff} wireframe transparent opacity={0.55} />
      </mesh>
      <Text
        position={[0, 0.05, 1.8]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.24}
        color="#60C4FF"
        anchorX="center"
      >
        7.80 m SPAN × 3.60 m SLOPE [4.64 kWp]
      </Text>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   ELECTRICAL CURRENT FLOW (Step 07 & 08 Energy Generation)
───────────────────────────────────────────────────────────── */
function ElectricalCurrentFlow() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 50;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = -4.54;
      arr[i * 3 + 1] = 0.4 + (i / count) * 3.2;
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= 0.04;
      if (pos[i * 3 + 1] < 0.2) {
        pos[i * 3 + 1] = 3.6;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={0x8dc63f}
        size={0.08}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─────────────────────────────────────────────────────────────
   NATURAL TROPICAL ENVIRONMENT & LIGHTING
───────────────────────────────────────────────────────────── */
function RealisticEnvironment({ activeStep }: { activeStep: number }) {
  const isOnline = activeStep >= 6;

  return (
    <>
      <directionalLight
        position={[14, 20, 14]}
        intensity={isOnline ? 2.8 : 2.2}
        color={0xfffaea}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.0003}
      />
      <hemisphereLight args={[0x87ceeb, 0x2d5028, 0.8]} />
      <directionalLight position={[-12, 10, -8]} intensity={0.4} color={0xbedcff} />

      <group position={[28, 40, 28]}>
        <mesh>
          <sphereGeometry args={[3.2, 32, 32]} />
          <meshBasicMaterial color={0xfff299} />
        </mesh>
        <mesh>
          <ringGeometry args={[3.6, 7.5, 48]} />
          <meshBasicMaterial
            color={0xffe680}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color={0x2e5229} roughness={0.9} metalness={0.0} />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 6.2]}
        receiveShadow
      >
        <planeGeometry args={[4.8, 5.5]} />
        <meshStandardMaterial color={0xb2b6b8} roughness={0.8} />
      </mesh>

      <fog attach="fog" args={["#d4eaf5", 30, 85]} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   CINEMATIC CAMERA CONTROLLER (Interpolates to target step)
───────────────────────────────────────────────────────────── */
function CameraController({ activeStep }: { activeStep: number }) {
  const { camera } = useThree();

  const cameraWaypoints = useMemo(
    () => [
      // 01: Site Survey
      { pos: new THREE.Vector3(0, 7.2, 13.5), target: new THREE.Vector3(0, 3.2, 0) },
      // 02: CAD Blueprint
      { pos: new THREE.Vector3(1.5, 9.0, 9.0), target: new THREE.Vector3(0, 3.8, 0) },
      // 03: Permitting
      { pos: new THREE.Vector3(-5.5, 6.8, 10.5), target: new THREE.Vector3(-0.5, 3.4, 0) },
      // 04: Racking & Mounting
      { pos: new THREE.Vector3(3.8, 5.8, 5.8), target: new THREE.Vector3(0.5, 4.0, 0) },
      // 05: Module Assembly
      { pos: new THREE.Vector3(-2.8, 5.4, 6.8), target: new THREE.Vector3(0, 3.9, 0) },
      // 06: Hybrid Inverter & Battery (Camera glides to the left utility wall)
      { pos: new THREE.Vector3(-7.5, 2.4, 3.6), target: new THREE.Vector3(-4.5, 1.4, 0) },
      // 07: Testing & Voltage Verification
      { pos: new THREE.Vector3(-4.8, 4.8, 10.5), target: new THREE.Vector3(-1.2, 2.6, 0) },
      // 08: Commissioned Hero Shot
      { pos: new THREE.Vector3(5.5, 6.8, 12.5), target: new THREE.Vector3(0, 3.0, 0) },
    ],
    []
  );

  const curPos = useRef(new THREE.Vector3(0, 7.2, 13.5));
  const curTarget = useRef(new THREE.Vector3(0, 3.2, 0));

  useFrame(() => {
    const target = cameraWaypoints[activeStep] || cameraWaypoints[0];
    curPos.current.lerp(target.pos, 0.08);
    curTarget.current.lerp(target.target, 0.08);

    camera.position.copy(curPos.current);
    camera.lookAt(curTarget.current);
  });

  return null;
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
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
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  // Wheel scroll event inside modal to step through phases
  const lastWheelTime = useRef(0);
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return; // Debounce wheel
    if (e.deltaY > 25) {
      setActiveStep((prev) => Math.min(STEPS.length - 1, prev + 1));
      lastWheelTime.current = now;
    } else if (e.deltaY < -25) {
      setActiveStep((prev) => Math.max(0, prev - 1));
      lastWheelTime.current = now;
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="How it works - 3D Solar Installation Process"
      onWheel={handleWheel}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#071f1e",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── TOP APP BAR ── */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 72,
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(7, 31, 30, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(141,198,63,0.15)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <img
            src="/fro-logo.png"
            alt="FRO Solar Logo"
            style={{ height: 42, width: "auto", objectFit: "contain" }}
          />
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "0.95rem",
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              How It Works &mdash; 3D Installation Process
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
          camera={{ position: [0, 7.2, 13.5], fov: 46, near: 0.1, far: 200 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#bcdde9"]} />

          <Suspense fallback={<LoadingScreen />}>
            <CameraController activeStep={activeStep} />
            <RealisticEnvironment activeStep={activeStep} />
            <ModernSolarHouse activeStep={activeStep} />
          </Suspense>
        </Canvas>

        {/* ── LEFT HUD TELEMETRY CARD ── */}
        <div
          style={{
            position: "absolute",
            top: "6.5rem",
            left: "2rem",
            zIndex: 40,
            maxWidth: 420,
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
          style={{
            position: "absolute",
            right: "2rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 40,
            display: "flex",
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
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: data.color,
                boxShadow: `0 0 8px ${data.color}`,
              }}
            />
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
