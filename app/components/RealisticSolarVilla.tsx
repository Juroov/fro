"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────
   PROCEDURAL ULTRA-HIGH RESOLUTION TEXTURES
───────────────────────────────────────────────────────────── */

/**
 * Photorealistic Monocrystalline Silicon Solar Cell Texture:
 * - Obsidian deep blue/black anti-reflective silicon wafers
 * - Rounded wafer chamfer corners (M10/G12 half-cut wafer design)
 * - 16 Micro-busbars (SMBB / Multi-Busbar silver wires)
 * - 100+ microscopic silver fingers per cell for true metallic micro-structure
 * - White dielectric grid gaps between cells
 */
export function createUltraRealisticSolarCellTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  // Dark obsidian-indigo antireflective background
  ctx.fillStyle = "#0a111e";
  ctx.fillRect(0, 0, 1024, 1024);

  // 6 columns x 12 rows half-cut monocrystalline cell layout
  const cols = 6;
  const rows = 12;
  const cellW = 1024 / cols;
  const cellH = 1024 / rows;
  const gap = 3.2;

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const x = c * cellW + gap / 2;
      const y = r * cellH + gap / 2;
      const w = cellW - gap;
      const h = cellH - gap;

      // Realistic iridescent silicon wafer gradient (deep navy to crystalline black)
      const grad = ctx.createLinearGradient(x, y, x + w, y + h);
      grad.addColorStop(0, "#0e1a2f");
      grad.addColorStop(0.35, "#0b1526");
      grad.addColorStop(0.75, "#08101e");
      grad.addColorStop(1, "#050b15");
      ctx.fillStyle = grad;

      // Chamfered / pseudo-octagonal monocrystalline cell geometry
      const chamfer = 6;
      ctx.beginPath();
      ctx.moveTo(x + chamfer, y);
      ctx.lineTo(x + w - chamfer, y);
      ctx.lineTo(x + w, y + chamfer);
      ctx.lineTo(x + w, y + h - chamfer);
      ctx.lineTo(x + w - chamfer, y + h);
      ctx.lineTo(x + chamfer, y + h);
      ctx.lineTo(x, y + h - chamfer);
      ctx.lineTo(x, y + chamfer);
      ctx.closePath();
      ctx.fill();

      // Micro-texture crystalline grain
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
      for (let i = 0; i < 14; i++) {
        ctx.fillRect(x + Math.random() * (w - 4), y + Math.random() * (h - 4), 3, 3);
      }

      // 16 Micro-busbars (SMBB silver continuous wires)
      const busbars = 16;
      for (let b = 1; b <= busbars; b++) {
        const bx = x + (w / (busbars + 1)) * b;
        ctx.strokeStyle = "rgba(235, 245, 255, 0.85)";
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(bx, y);
        ctx.lineTo(bx, y + h);
        ctx.stroke();

        // Busbar soldering pad dots
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.beginPath();
        ctx.arc(bx, y + h * 0.25, 1.2, 0, Math.PI * 2);
        ctx.arc(bx, y + h * 0.75, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ultra-fine fingers (sub-millimeter collection grid lines)
      const fingers = 32;
      ctx.strokeStyle = "rgba(185, 215, 250, 0.22)";
      ctx.lineWidth = 0.5;
      for (let f = 1; f < fingers; f++) {
        const fy = y + (h / fingers) * f;
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

/**
 * Architectural Warm Teak Wood Slat / Louver Texture
 */
export function createArchitecturalWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#6d4427";
  ctx.fillRect(0, 0, 512, 512);

  // Vertical wood planks with realistic tone variation and grain
  const slatW = 32;
  for (let x = 0; x < 512; x += slatW) {
    const toneGrad = ctx.createLinearGradient(x, 0, x + slatW, 0);
    const r = 110 + Math.floor((Math.sin(x * 0.1) + 1) * 15);
    const g = 65 + Math.floor((Math.sin(x * 0.1) + 1) * 10);
    const b = 38 + Math.floor((Math.sin(x * 0.1) + 1) * 6);

    toneGrad.addColorStop(0, `rgb(${r - 20}, ${g - 15}, ${b - 10})`);
    toneGrad.addColorStop(0.15, `rgb(${r}, ${g}, ${b})`);
    toneGrad.addColorStop(0.85, `rgb(${r + 8}, ${g + 5}, ${b + 3})`);
    toneGrad.addColorStop(1, `rgb(${r - 30}, ${g - 25}, ${b - 20})`); // Deep shadow groove

    ctx.fillStyle = toneGrad;
    ctx.fillRect(x + 2, 0, slatW - 3, 512);

    // Deep shadow reveal line between slats
    ctx.fillStyle = "#1e1008";
    ctx.fillRect(x, 0, 2, 512);

    // Subtle natural wood grain lines
    ctx.strokeStyle = "rgba(40, 20, 10, 0.18)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 4; i++) {
      const gx = x + 4 + i * 6 + Math.sin(x) * 2;
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      ctx.bezierCurveTo(gx + 3, 170, gx - 2, 340, gx + 2, 512);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/**
 * Architectural Stucco / Micro-Cement Texture
 */
export function createArchitecturalConcreteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#e8e6e1";
  ctx.fillRect(0, 0, 512, 512);

  // Organic micro-noise texture
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const s = Math.random() * 2.5;
    const dark = Math.random() > 0.5;
    ctx.fillStyle = dark ? "rgba(40, 40, 45, 0.035)" : "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(x, y, s, s);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

/**
 * Architectural Paver Stone Texture
 */
export function createStonePaverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#3a3d42";
  ctx.fillRect(0, 0, 512, 512);

  const tileW = 128;
  const tileH = 128;
  const joint = 4;

  for (let x = 0; x < 512; x += tileW) {
    for (let y = 0; y < 512; y += tileH) {
      const grad = ctx.createLinearGradient(x, y, x + tileW, y + tileH);
      const v = 60 + Math.floor(Math.random() * 20);
      grad.addColorStop(0, `rgb(${v + 15}, ${v + 15}, ${v + 18})`);
      grad.addColorStop(1, `rgb(${v - 10}, ${v - 10}, ${v - 8})`);

      ctx.fillStyle = grad;
      ctx.fillRect(x + joint, y + joint, tileW - joint * 2, tileH - joint * 2);

      // Fine stone flecks
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      for (let k = 0; k < 30; k++) {
        ctx.fillRect(
          x + joint + Math.random() * (tileW - joint * 2),
          y + joint + Math.random() * (tileH - joint * 2),
          2,
          2
        );
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/* ─────────────────────────────────────────────────────────────
   HIGH-FIDELITY SOLAR PV MODULE (Detailed Frame, ARC Glass, Clamps)
───────────────────────────────────────────────────────────── */
export function HighFidelitySolarPanel({
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
  const cellTex = useMemo(() => createUltraRealisticSolarCellTexture(), []);

  // Anodized black/silver extruded aluminum frame with 35mm profile lip
  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x1f2329,
        metalness: 0.92,
        roughness: 0.28,
      }),
    []
  );

  // Anti-reflective coated (ARC) tempered solar glass with iridescent sheen
  const cellMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: cellTex,
        color: highlighted ? 0xa8e6cf : 0xffffff,
        metalness: 0.82,
        roughness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        reflectivity: 1.0,
      }),
    [cellTex, highlighted]
  );

  // Stainless steel mid/end clamps
  const clampMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.96,
        roughness: 0.15,
      }),
    []
  );

  if (!visible) return null;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* ── Outer Extruded Aluminum Frame with Raised Rim ── */}
      <mesh material={frameMaterial} castShadow>
        <boxGeometry args={[1.76, 0.045, 1.04]} />
      </mesh>

      {/* ── Recessed Anti-Reflective Solar Cell & Tempered Glass ── */}
      <mesh position={[0, 0.024, 0]} material={cellMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.72, 0.008, 1.0]} />
      </mesh>

      {/* ── Underside IP68 Junction Box ── */}
      <group position={[0, -0.032, 0.28]}>
        <mesh castShadow>
          <boxGeometry args={[0.24, 0.032, 0.16]} />
          <meshStandardMaterial color={0x151515} roughness={0.7} />
        </mesh>
        {/* Heat dissipation fins on junction box */}
        {[-0.06, 0, 0.06].map((fx, i) => (
          <mesh key={i} position={[fx, -0.018, 0]}>
            <boxGeometry args={[0.015, 0.01, 0.14]} />
            <meshStandardMaterial color={0x222222} />
          </mesh>
        ))}
        {/* Black UV-rated DC cables exiting junction box */}
        <mesh position={[-0.08, -0.01, 0.1]}>
          <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} rotation={[Math.PI / 3, 0, 0]} />
          <meshStandardMaterial color={0x0d0d0d} roughness={0.5} />
        </mesh>
        <mesh position={[0.08, -0.01, 0.1]}>
          <cylinderGeometry args={[0.007, 0.007, 0.14, 8]} rotation={[Math.PI / 3, 0, 0]} />
          <meshStandardMaterial color={0x0d0d0d} roughness={0.5} />
        </mesh>
        {/* Red/Black MC4 Connector Plugs */}
        <mesh position={[-0.1, -0.04, 0.18]}>
          <cylinderGeometry args={[0.01, 0.01, 0.04, 8]} />
          <meshStandardMaterial color={0xd63031} />
        </mesh>
        <mesh position={[0.1, -0.04, 0.18]}>
          <cylinderGeometry args={[0.01, 0.01, 0.04, 8]} />
          <meshStandardMaterial color={0x151515} />
        </mesh>
      </group>

      {/* ── Stainless Steel Mid-Clamps and Hex Torque Bolts ── */}
      {[-0.86, 0.86].map((x, i) => (
        <group key={i} position={[x, 0.028, 0]}>
          <mesh material={clampMaterial} castShadow>
            <boxGeometry args={[0.045, 0.018, 0.09]} />
          </mesh>
          <mesh position={[0, 0.014, 0]}>
            <cylinderGeometry args={[0.009, 0.009, 0.012, 8]} />
            <meshStandardMaterial color={0xeeeeee} metalness={0.98} roughness={0.1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   AL6005-T5 STRUCTURAL ALUMINUM RACKING SYSTEM
───────────────────────────────────────────────────────────── */
export function HeavyDutyRackingSystem({
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
        color: 0xc8cbd0,
        metalness: 0.94,
        roughness: 0.22,
      }),
    []
  );

  const bracketMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x9ca3af,
        metalness: 0.92,
        roughness: 0.3,
      }),
    []
  );

  const epdmMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x181818,
        roughness: 0.85,
        metalness: 0.1,
      }),
    []
  );

  if (!visible) return null;

  // 4 continuous structural rails supporting the 2x4 array
  const railZPositions = [-1.55, -0.52, 0.52, 1.55];

  return (
    <group position={[0, roofY + 0.05, 0]} rotation={[roofAngle, 0, 0]}>
      {railZPositions.map((z, idx) => (
        <group key={idx} position={[0, 0.045, z]}>
          {/* Main Continuous C-Channel Rail */}
          <mesh material={railMat} castShadow>
            <boxGeometry args={[7.8, 0.048, 0.042]} />
          </mesh>
          {/* Top C-channel groove */}
          <mesh position={[0, 0.024, 0]}>
            <boxGeometry args={[7.76, 0.005, 0.018]} />
            <meshStandardMaterial color={0x444444} roughness={0.5} />
          </mesh>

          {/* SUS304 L-Feet Mounts anchored with EPDM Rubber Flashing Pads */}
          {[-3.2, -1.6, 0, 1.6, 3.2].map((x, bIdx) => (
            <group key={bIdx} position={[x, -0.042, 0]}>
              {/* L-foot upright arm */}
              <mesh material={bracketMat} castShadow>
                <boxGeometry args={[0.05, 0.085, 0.045]} />
              </mesh>
              {/* L-foot base horizontal foot */}
              <mesh position={[0, -0.04, 0.02]} material={bracketMat} castShadow>
                <boxGeometry args={[0.05, 0.012, 0.08]} />
              </mesh>
              {/* Black UV-resistant EPDM Rubber Cushion Pad */}
              <mesh position={[0, -0.048, 0.02]} material={epdmMat}>
                <boxGeometry args={[0.065, 0.008, 0.095]} />
              </mesh>
              {/* Stainless Steel Lag Screw Head */}
              <mesh position={[0, -0.035, 0.04]}>
                <cylinderGeometry args={[0.008, 0.008, 0.01, 6]} />
                <meshStandardMaterial color={0xdddddd} metalness={0.95} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* Grounding bare copper conductor running across rails */}
      <mesh position={[3.6, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 3.4, 8]} />
        <meshStandardMaterial color={0xb87333} metalness={0.95} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   BALANCE OF SYSTEM: HYBRID SMART INVERTER, LITHIUM BATTERY & CONDUITS
───────────────────────────────────────────────────────────── */
export function RealisticUtilityElectricalSystem({ activeStep }: { activeStep: number }) {
  const isPowered = activeStep >= 5;

  const casingMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xf5f7fa,
        metalness: 0.75,
        roughness: 0.25,
      }),
    []
  );

  const heatsinkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x2d3436,
        metalness: 0.9,
        roughness: 0.35,
      }),
    []
  );

  return (
    <group position={[-4.56, 1.35, 0.2]}>
      {/* ── Heavy-Gauge EMT Solar Conduit from Roof Array to Inverter ── */}
      <group position={[0, 1.45, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.022, 0.022, 2.2, 16]} />
          <meshStandardMaterial color={0xa0a5ab} metalness={0.95} roughness={0.2} />
        </mesh>
        {/* Wall Unistrut Mounting Straps */}
        {[-0.6, 0.2, 0.8].map((cy, i) => (
          <mesh key={i} position={[0.02, cy, 0]}>
            <boxGeometry args={[0.012, 0.035, 0.07]} />
            <meshStandardMaterial color={0x718096} metalness={0.8} />
          </mesh>
        ))}
        {/* 90-Degree Metallic Conduit Pull Elbow (LB Fitting) */}
        <mesh position={[0, -1.05, 0]}>
          <boxGeometry args={[0.06, 0.07, 0.06]} />
          <meshStandardMaterial color={0x888f98} metalness={0.9} />
        </mesh>
      </group>

      {/* ── 5kW HYBRID RESIDENTIAL SOLAR INVERTER ── */}
      <group position={[0, 0.25, 0]}>
        {/* Main Inverter Body */}
        <mesh castShadow receiveShadow material={casingMat}>
          <boxGeometry args={[0.24, 0.78, 0.54]} />
        </mesh>

        {/* Die-Cast Aluminum Heat Sink Fins on Top/Rear */}
        <mesh position={[-0.09, 0, 0]} material={heatsinkMat}>
          <boxGeometry args={[0.05, 0.74, 0.48]} />
        </mesh>
        {/* Individual Cooling Fins */}
        {Array.from({ length: 8 }).map((_, fi) => (
          <mesh key={fi} position={[-0.08, 0.36 - fi * 0.1, 0]}>
            <boxGeometry args={[0.06, 0.012, 0.46]} />
            <meshStandardMaterial color={0x1f2428} metalness={0.95} />
          </mesh>
        ))}

        {/* Tempered Glass Front Control Visor */}
        <mesh position={[0.122, 0.08, 0]}>
          <boxGeometry args={[0.006, 0.38, 0.42]} />
          <meshPhysicalMaterial
            color={0x0b131f}
            metalness={0.9}
            roughness={0.08}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Illuminated Status Ring (Green Breathing Glow) */}
        <mesh position={[0.126, 0.18, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.038, 0.048, 24]} />
          <meshBasicMaterial
            color={isPowered ? 0x8dc63f : 0x555555}
            transparent
            opacity={isPowered ? 0.95 : 0.4}
          />
        </mesh>

        {/* OLED Digital Telemetry Display */}
        <mesh position={[0.126, 0.05, 0]}>
          <planeGeometry args={[0.26, 0.12]} rotation={[0, Math.PI / 2, 0]} />
          <meshStandardMaterial
            color={isPowered ? 0x051e16 : 0x0a0f18}
            emissive={isPowered ? 0x8dc63f : 0x000000}
            emissiveIntensity={isPowered ? 0.45 : 0}
          />
        </mesh>
        {isPowered && (
          <Text
            position={[0.128, 0.05, 0]}
            rotation={[0, Math.PI / 2, 0]}
            fontSize={0.032}
            color="#8DC63F"
            anchorX="center"
            anchorY="middle"
          >
            4.85 kW  230V 60Hz
          </Text>
        )}

        {/* Rotary DC Isolator Switch (Red Knob on Yellow Faceplate) */}
        <group position={[0.125, -0.22, -0.14]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.08, 0.08, 0.01]} />
            <meshStandardMaterial color={0xf1c40f} roughness={0.4} />
          </mesh>
          <mesh position={[0.012, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.024, 0.024, 0.024, 16]} />
            <meshStandardMaterial color={0xe74c3c} roughness={0.3} />
          </mesh>
        </group>

        {/* Weatherproof AC Mini Circuit Breaker Box */}
        <group position={[0.125, -0.22, 0.14]}>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.1, 0.12, 0.015]} />
            <meshStandardMaterial color={0x2c3e50} />
          </mesh>
          {/* Tinted Polycarbonate Flap */}
          <mesh position={[0.008, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.08, 0.09, 0.008]} />
            <meshPhysicalMaterial color={0x34495e} transmission={0.7} roughness={0.1} />
          </mesh>
        </group>
      </group>

      {/* ── MODULAR 10 kWh LiFePO4 ENERGY STORAGE BATTERY ── */}
      <group position={[0, -0.72, 0]}>
        {/* Main Battery Cabinet in Brushed Charcoal Titanium */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.22, 0.96, 0.68]} />
          <meshStandardMaterial color={0x1e2229} metalness={0.88} roughness={0.25} />
        </mesh>
        {/* Front Anodized Faceplate with Chamfer Trim */}
        <mesh position={[0.112, 0, 0]}>
          <boxGeometry args={[0.006, 0.9, 0.62]} />
          <meshStandardMaterial color={0x2b303c} metalness={0.7} roughness={0.35} />
        </mesh>

        {/* Multi-Segment State-of-Charge (SoC) LED Bar */}
        <group position={[0.118, 0.34, 0]}>
          {[-0.14, -0.07, 0, 0.07, 0.14].map((segX, idx) => (
            <mesh key={idx} position={[0, 0, segX]}>
              <boxGeometry args={[0.004, 0.016, 0.05]} />
              <meshStandardMaterial
                color={isPowered ? 0x8dc63f : 0x444444}
                emissive={isPowered ? 0x8dc63f : 0x000000}
                emissiveIntensity={isPowered ? 1.4 : 0}
              />
            </mesh>
          ))}
        </group>

        <Text
          position={[0.118, 0.08, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.046}
          color="#8DC63F"
          anchorX="center"
          anchorY="middle"
        >
          FRO LITHIUM 10kWh
        </Text>
        <Text
          position={[0.118, -0.01, 0]}
          rotation={[0, Math.PI / 2, 0]}
          fontSize={0.024}
          color="#A0AEC0"
          anchorX="center"
          anchorY="middle"
        >
          LiFePO4 HIGH-VOLTAGE STORAGE
        </Text>

        {/* High-Voltage DC Interconnect Cables */}
        <mesh position={[0, 0.44, -0.15]}>
          <cylinderGeometry args={[0.012, 0.012, 0.18, 12]} />
          <meshStandardMaterial color={0xe67e22} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.44, 0.15]}>
          <cylinderGeometry args={[0.012, 0.012, 0.18, 12]} />
          <meshStandardMaterial color={0x111111} roughness={0.6} />
        </mesh>
      </group>

      {/* ── Grounding Earth Pit & Copper Busbar at Foundation Base ── */}
      <group position={[0, -1.25, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.14, 0.14, 0.14]} />
          <meshStandardMaterial color={0x333333} roughness={0.8} />
        </mesh>
        <mesh position={[0.072, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.045, 16]} />
          <meshStandardMaterial color={0xd35400} metalness={0.9} />
        </mesh>
        {/* Yellow-Green Earth Ground Cable */}
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 1.2, 8]} />
          <meshStandardMaterial color={0x27ae60} roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   PHOTOREALISTIC MODERN TROPICAL SOLAR VILLA
───────────────────────────────────────────────────────────── */
export function ModernTropicalSolarVilla({ activeStep }: { activeStep: number }) {
  const woodTex = useMemo(() => createArchitecturalWoodTexture(), []);
  const stuccoTex = useMemo(() => createArchitecturalConcreteTexture(), []);
  const paverTex = useMemo(() => createStonePaverTexture(), []);

  // Micro-cement warm stucco wall material
  const wallMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: stuccoTex,
        color: 0xf5f3ee,
        roughness: 0.88,
        metalness: 0.04,
      }),
    [stuccoTex]
  );

  // Dark charcoal architectural metal trims and fascias
  const darkMetalMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x1a1d22,
        roughness: 0.35,
        metalness: 0.85,
      }),
    []
  );

  // Warm Teak architectural composite slats
  const teakMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: woodTex,
        roughness: 0.7,
        metalness: 0.15,
      }),
    [woodTex]
  );

  // Standing seam roof tray material (satin charcoal architectural coating)
  const roofTrayMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x22262d,
        roughness: 0.42,
        metalness: 0.78,
      }),
    []
  );

  // Modern floor-to-ceiling architectural double glazing
  const architecturalGlassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: 0x1c2b36,
        metalness: 0.15,
        roughness: 0.04,
        transmission: 0.75,
        thickness: 0.3,
        transparent: true,
        opacity: 0.85,
        reflectivity: 0.98,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
      }),
    []
  );

  // Roof tilt: 18° optimal solar angle for Digos City / Davao del Sur
  const roofTilt = 0.314;
  const roofCenterY = 3.75;

  // Active panel count based on step:
  // Step 0-3: 0 panels (survey, cad, permitting, racking)
  // Step 4: 4 panels hoisted (phase 5: modules)
  // Step 5+: All 8 panels locked in place
  const panelCount = activeStep < 4 ? 0 : activeStep === 4 ? 4 : 8;

  // Array of 8 modules (2 rows x 4 columns)
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
        const y = roofCenterY + 0.16 - Math.sin(roofTilt) * zLocal;
        const z = Math.cos(roofTilt) * zLocal;
        arr.push({
          pos: [x, y, z],
          rot: [roofTilt, 0, 0],
        });
      }
    }
    return arr;
  }, [roofCenterY, roofTilt]);

  return (
    <group position={[0, 0, 0]}>
      {/* ── CONCRETE FOUNDATION APRON WITH BEVELED EDGES ── */}
      <mesh position={[0, 0.1, 0.4]} receiveShadow>
        <boxGeometry args={[11.8, 0.22, 9.6]} />
        <meshStandardMaterial color={0xd2d6dc} roughness={0.75} />
      </mesh>

      {/* ── DARK GRAVEL DRAINAGE TRENCH AROUND FOUNDATION ── */}
      <mesh position={[0, 0.02, 0.4]} receiveShadow>
        <boxGeometry args={[12.8, 0.06, 10.6]} />
        <meshStandardMaterial color={0x2b2d30} roughness={0.95} />
      </mesh>

      {/* ── STONE SLATE ENTRANCE PATHWAY ── */}
      <mesh position={[-3.1, 0.12, 5.2]} receiveShadow>
        <boxGeometry args={[2.0, 0.04, 2.8]} />
        <meshStandardMaterial map={paverTex} roughness={0.65} metalness={0.2} />
      </mesh>

      {/* ── GROUND FLOOR VILLA MAIN STRUCTURE ── */}
      <mesh position={[0, 1.65, 0]} material={wallMat} castShadow receiveShadow>
        <boxGeometry args={[9.2, 3.1, 6.6]} />
      </mesh>

      {/* ── CANTILEVERED UPPER ARCHITECTURAL PORTICO & CANOPY ── */}
      <group position={[0, 3.25, 3.4]}>
        {/* Horizontal Overhang Slab */}
        <mesh material={darkMetalMat} castShadow>
          <boxGeometry args={[9.6, 0.16, 1.2]} />
        </mesh>
        {/* Teak Wood Slat Underside Soffit */}
        <mesh position={[0, -0.09, 0]} material={teakMat}>
          <boxGeometry args={[9.5, 0.02, 1.1]} />
        </mesh>
        {/* Warm Recessed Soffit Downlights */}
        {[-3.6, -1.8, 0, 1.8, 3.6].map((lx, i) => (
          <group key={i} position={[lx, -0.1, 0.2]}>
            <mesh>
              <cylinderGeometry args={[0.04, 0.04, 0.01, 12]} />
              <meshBasicMaterial color={0xffe8b5} />
            </mesh>
            <pointLight intensity={0.4} color={0xffd896} distance={4} />
          </group>
        ))}
      </group>

      {/* ── ENTRANCE WING: TEAK COMPOSITE FEATURE WALL ── */}
      <mesh position={[-3.1, 1.65, 3.34]} material={teakMat} castShadow receiveShadow>
        <boxGeometry args={[2.4, 3.0, 0.1]} />
      </mesh>

      {/* ── MODERN MINIMALIST PIVOT DOOR ── */}
      <group position={[-3.1, 1.35, 3.4]}>
        <mesh castShadow>
          <boxGeometry args={[1.05, 2.35, 0.05]} />
          <meshStandardMaterial color={0x181a1f} roughness={0.6} />
        </mesh>
        {/* 1.4m Long Brushed Stainless Steel Vertical Bar Pull Handle */}
        <mesh position={[-0.42, 0, 0.045]}>
          <cylinderGeometry args={[0.014, 0.014, 1.4, 12]} />
          <meshStandardMaterial color={0xe2e8f0} metalness={0.96} roughness={0.15} />
        </mesh>
        {/* Backing Stand-offs for Handle */}
        <mesh position={[-0.42, 0.5, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.03, 8]} />
          <meshStandardMaterial color={0xcccccc} metalness={0.95} />
        </mesh>
        <mesh position={[-0.42, -0.5, 0.025]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.03, 8]} />
          <meshStandardMaterial color={0xcccccc} metalness={0.95} />
        </mesh>
        {/* Modern Brushed Steel House Number Plaque ("28 SOL") */}
        <mesh position={[0.85, 0.45, 0.01]}>
          <boxGeometry args={[0.34, 0.22, 0.01]} />
          <meshStandardMaterial color={0x262930} metalness={0.8} />
        </mesh>
        <Text
          position={[0.85, 0.45, 0.02]}
          fontSize={0.075}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
        >
          28 SOL
        </Text>
      </group>

      {/* ── ARCHITECTURAL OUTDOOR LED WALL SCONCES ── */}
      {[-1.6, 4.3].map((wx, i) => (
        <group key={i} position={[wx, 2.1, 3.36]}>
          {/* Black Sconce Body */}
          <mesh material={darkMetalMat}>
            <boxGeometry args={[0.06, 0.24, 0.06]} />
          </mesh>
          {/* Up-Light & Down-Light Warm Beams */}
          <pointLight position={[0, 0.14, 0.05]} intensity={0.5} color={0xffd48a} distance={3.5} />
          <pointLight position={[0, -0.14, 0.05]} intensity={0.5} color={0xffd48a} distance={3.5} />
        </group>
      ))}

      {/* ── MODERN FLOOR-TO-CEILING GLASS SLIDING WALL ── */}
      <group position={[1.4, 1.45, 3.32]}>
        {/* Main Architectural Glass Sheets */}
        <mesh material={architecturalGlassMat} castShadow>
          <boxGeometry args={[4.6, 2.5, 0.04]} />
        </mesh>
        {/* Floor Recessed Track & Header Guide */}
        <mesh position={[0, -1.26, 0]} material={darkMetalMat}>
          <boxGeometry args={[4.65, 0.04, 0.09]} />
        </mesh>
        <mesh position={[0, 1.26, 0]} material={darkMetalMat}>
          <boxGeometry args={[4.65, 0.04, 0.09]} />
        </mesh>
        {/* Black Anodized Slim Mullions */}
        {[-2.28, -0.76, 0.76, 2.28].map((mx, i) => (
          <mesh key={i} position={[mx, 0, 0.02]} material={darkMetalMat}>
            <boxGeometry args={[0.06, 2.52, 0.06]} />
          </mesh>
        ))}
        {/* Minimalist Door Pull Bar */}
        <mesh position={[0.7, 0, 0.05]}>
          <cylinderGeometry args={[0.008, 0.008, 0.6, 8]} />
          <meshStandardMaterial color={0xdddddd} metalness={0.9} />
        </mesh>
      </group>

      {/* ── WARM INTERIOR LIVING SPACE GLOW & AMBIENCE ── */}
      <pointLight position={[1.4, 1.7, 1.8]} intensity={0.65} color={0xffe8c2} distance={7} />
      <pointLight position={[-1.2, 1.7, 1.5]} intensity={0.4} color={0xffdfab} distance={5} />

      {/* ── STANDING SEAM METAL ROOF (Angled 18° with 3D Ribs) ── */}
      <group position={[0, roofCenterY, 0]} rotation={[roofTilt, 0, 0]}>
        {/* Main Roof Structural Tray */}
        <mesh material={roofTrayMat} castShadow receiveShadow>
          <boxGeometry args={[9.6, 0.12, 4.5]} />
        </mesh>

        {/* 3D Extruded Longitudinal Standing Seam Ribs (Every 400mm) */}
        {Array.from({ length: 23 }).map((_, rIdx) => {
          const ribX = -4.5 + rIdx * 0.41;
          return (
            <mesh key={rIdx} position={[ribX, 0.08, 0]} material={darkMetalMat} castShadow>
              <boxGeometry args={[0.028, 0.042, 4.48]} />
            </mesh>
          );
        })}

        {/* Ridge Cap Flashing at Apex */}
        <mesh position={[0, 0.08, -2.25]} material={darkMetalMat} castShadow>
          <boxGeometry args={[9.66, 0.06, 0.16]} />
        </mesh>

        {/* Dark Box Eave Fascia Board */}
        <mesh position={[0, -0.06, 2.25]} material={darkMetalMat} castShadow>
          <boxGeometry args={[9.66, 0.16, 0.08]} />
        </mesh>

        {/* Seamless Dark Aluminum Rainwater Gutter Trough */}
        <mesh position={[0, -0.12, 2.32]} material={darkMetalMat} castShadow>
          <boxGeometry args={[9.66, 0.08, 0.1]} />
        </mesh>
      </group>

      {/* ── RAINWATER DOWNSPOUT PIPE RUNNING DOWN CORNER ── */}
      <group position={[4.65, 1.75, 2.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.035, 0.035, 3.4, 12]} />
          <meshStandardMaterial color={0x2b2e35} metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Downspout wall brackets */}
        {[-1.0, 0.2, 1.4].map((by, i) => (
          <mesh key={i} position={[-0.04, by, 0]}>
            <boxGeometry args={[0.06, 0.025, 0.09]} />
            <meshStandardMaterial color={0x555555} />
          </mesh>
        ))}
      </group>

      {/* ── STRUCTURAL ALUMINUM RACKING SYSTEM (AL6005-T5) ── */}
      <HeavyDutyRackingSystem
        visible={activeStep >= 3}
        roofAngle={roofTilt}
        roofY={roofCenterY}
      />

      {/* ── 8 HIGH-EFFICIENCY MONOCRYSTALLINE PV MODULES ── */}
      {panelsLayout.map((p, idx) => (
        <HighFidelitySolarPanel
          key={idx}
          position={p.pos}
          rotation={p.rot}
          visible={idx < panelCount}
          highlighted={activeStep >= 6}
        />
      ))}

      {/* ── ALUMINUM EXTENSION LADDER (Phases 3-6) ── */}
      {activeStep >= 2 && activeStep <= 5 && (
        <group position={[4.2, 2.0, 1.9]} rotation={[-0.24, 0.05, 0]}>
          {[-0.22, 0.22].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} castShadow>
              <boxGeometry args={[0.04, 4.4, 0.06]} />
              <meshStandardMaterial color={0xc0c4cc} metalness={0.94} roughness={0.18} />
            </mesh>
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <mesh key={i} position={[0, -1.9 + i * 0.35, 0]} castShadow>
              <cylinderGeometry args={[0.014, 0.014, 0.44, 8]} rotation={[0, 0, Math.PI / 2]} />
              <meshStandardMaterial color={0xd5d8de} metalness={0.92} />
            </mesh>
          ))}
        </group>
      )}

      {/* ── ELECTRICAL BALANCE OF SYSTEM (Inverter, Battery, Conduits) ── */}
      <RealisticUtilityElectricalSystem activeStep={activeStep} />

      {/* ── LUSH TROPICAL LANDSCAPING (Broadleaf Plants, Palms, Boxwood) ── */}
      <TropicalLandscaping />
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   LUSH PHILIPPINE TROPICAL GARDEN LANDSCAPING
───────────────────────────────────────────────────────────── */
export function TropicalLandscaping() {
  const leafMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x1f5424,
        roughness: 0.6,
        metalness: 0.08,
        side: THREE.DoubleSide,
      }),
    []
  );

  const lightLeafMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x3d7e35,
        roughness: 0.55,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
    []
  );

  const planterMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x272a30,
        roughness: 0.7,
        metalness: 0.4,
      }),
    []
  );

  return (
    <group>
      {/* ── Right Flank Tropical Palm Group ── */}
      <group position={[5.4, 0, -1.5]}>
        {/* Palm Trunk */}
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.16, 3.6, 10]} />
          <meshStandardMaterial color={0x524335} roughness={0.9} />
        </mesh>
        {/* Tropical Palm Fronds Fan */}
        {Array.from({ length: 9 }).map((_, pi) => {
          const angle = (pi / 9) * Math.PI * 2;
          return (
            <group key={pi} position={[0, 3.5, 0]} rotation={[0.4, angle, 0]}>
              <mesh position={[0, 0.4, 0.8]} rotation={[-0.4, 0, 0]} material={leafMat} castShadow>
                <boxGeometry args={[0.25, 0.02, 1.8]} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* ── Front Entrance Modern Boxwood Planter Boxes ── */}
      {[-1.6, 3.9].map((bx, i) => (
        <group key={i} position={[bx, 0.35, 4.3]}>
          {/* Architectural Concrete Planter Box */}
          <mesh material={planterMat} castShadow receiveShadow>
            <boxGeometry args={[1.1, 0.5, 0.6]} />
          </mesh>
          {/* Soil */}
          <mesh position={[0, 0.24, 0]}>
            <boxGeometry args={[1.02, 0.04, 0.52]} />
            <meshStandardMaterial color={0x2b1d14} roughness={0.95} />
          </mesh>
          {/* Manicured Ornamental Shrub Mound */}
          <mesh position={[0, 0.45, 0]} castShadow>
            <sphereGeometry args={[0.38, 12, 10]} />
            <meshStandardMaterial color={0x245828} roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* ── Left Flank Tropical Broadleaf Foliage / Monstera ── */}
      <group position={[-5.4, 0, 2.2]}>
        {Array.from({ length: 6 }).map((_, mi) => {
          const angle = (mi / 6) * Math.PI * 1.5;
          return (
            <group key={mi} position={[Math.cos(angle) * 0.3, 0.4 + mi * 0.15, Math.sin(angle) * 0.3]}>
              <mesh
                position={[0, 0.3, 0.5]}
                rotation={[0.5, angle, 0]}
                material={lightLeafMat}
                castShadow
              >
                <circleGeometry args={[0.45, 8]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   PHOTOREALISTIC ENVIRONMENT, SKY & LIGHTING
───────────────────────────────────────────────────────────── */
export function PhotorealisticEnvironment({ activeStep }: { activeStep: number }) {
  const isOnline = activeStep >= 6;

  return (
    <>
      {/* ── Primary Sunlight at Optimal Philippine Solar Azimuth ── */}
      <directionalLight
        position={[15, 22, 13]}
        intensity={isOnline ? 2.6 : 2.2}
        color={0xfffaec}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={65}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.00015}
        shadow-radius={2}
      />

      {/* ── Soft Sky Radiant Fill Light (Deep Blue Sky Dome Bounce) ── */}
      <hemisphereLight
        args={[0x7bb6dd, 0x3d4f2b, 0.95]}
      />

      {/* ── Warm Ground Surface Fill Light ── */}
      <directionalLight
        position={[-12, 8, -6]}
        intensity={0.35}
        color={0xdbeafe}
      />

      {/* ── Sun Disk and Atmospheric Corona in Distance ── */}
      <group position={[32, 46, 30]}>
        <mesh>
          <sphereGeometry args={[3.6, 32, 32]} />
          <meshBasicMaterial color={0xfffae0} />
        </mesh>
        <mesh>
          <ringGeometry args={[3.8, 8.5, 48]} />
          <meshBasicMaterial
            color={0xffed99}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* ── Manicured Tropical Grass Ground Plane ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[140, 140]} />
        <meshStandardMaterial color={0x2d5226} roughness={0.88} metalness={0.02} />
      </mesh>

      {/* ── Modern Architectural Concrete Entrance Apron ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 6.6]} receiveShadow>
        <planeGeometry args={[5.2, 5.8]} />
        <meshStandardMaterial color={0xb8bcc2} roughness={0.7} />
      </mesh>

      {/* ── Atmospheric Tropical Horizon Haze ── */}
      <fog attach="fog" args={["#bfe0ef", 32, 95]} />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   3D FLOATING ANNOTATION TAGS
───────────────────────────────────────────────────────────── */
export function Annotation3D({
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
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
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
            {item.label}
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
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   SURVEY SCANNER (Step 01 LIDAR Drone Laser Scan)
───────────────────────────────────────────────────────────── */
export function SurveyLaserScanner({
  roofTilt = 0.314,
  roofY = 3.75,
}: {
  roofTilt?: number;
  roofY?: number;
}) {
  const scanLineRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (scanLineRef.current) {
      scanLineRef.current.position.z = Math.sin(state.clock.elapsedTime * 2.2) * 1.8;
    }
  });

  return (
    <group position={[0, roofY + 0.1, 0]} rotation={[roofTilt, 0, 0]}>
      {/* Moving green laser beam */}
      <mesh ref={scanLineRef}>
        <boxGeometry args={[9.4, 0.02, 0.08]} />
        <meshBasicMaterial color={0x8dc63f} transparent opacity={0.88} />
      </mesh>
      {/* 3D LIDAR Polygon Wireframe Grid */}
      <mesh position={[0, 0.02, 0]}>
        <planeGeometry args={[9.2, 4.0, 10, 5]} />
        <meshBasicMaterial color={0x60c4ff} wireframe transparent opacity={0.45} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────────────────────────
   HOLOGRAPHIC CAD OVERLAY (Step 02 System String Layout)
───────────────────────────────────────────────────────────── */
export function HolographicCADOverlay({
  roofTilt = 0.314,
  roofY = 3.75,
}: {
  roofTilt?: number;
  roofY?: number;
}) {
  return (
    <group position={[0, roofY + 0.12, 0]} rotation={[roofTilt, 0, 0]}>
      <mesh position={[0, 0.01, 0]}>
        <planeGeometry args={[9.0, 4.0, 16, 8]} />
        <meshBasicMaterial color={0x60c4ff} wireframe transparent opacity={0.55} />
      </mesh>
      <Text
        position={[0, 0.06, 1.8]}
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
   ELECTRICAL CURRENT FLOW PARTICLES (Step 07 & 08 Generation)
───────────────────────────────────────────────────────────── */
export function ElectricalCurrentFlow() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 50;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = -4.56;
      arr[i * 3 + 1] = 0.4 + (i / count) * 3.2;
      arr[i * 3 + 2] = 0.2;
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
   REALISTIC CINEMATIC CAMERA CONTROLLER (Smooth Interpolation)
───────────────────────────────────────────────────────────── */
export function RealisticCameraController({
  activeStep,
  controlsRef,
}: {
  activeStep: number;
  controlsRef?: React.RefObject<any>;
}) {
  const { camera } = useThree();
  const isTransitioningRef = useRef(true);

  const cameraWaypoints = useMemo(
    () => [
      // 01: Site Survey & Drone Scan (Elevated front architectural elevation)
      { pos: new THREE.Vector3(0, 7.2, 13.8), target: new THREE.Vector3(0, 3.2, 0) },
      // 02: CAD Blueprint (Angled roof layout perspective)
      { pos: new THREE.Vector3(1.8, 9.2, 9.2), target: new THREE.Vector3(0, 3.8, 0) },
      // 03: Permitting (Structural 3/4 engineering perspective)
      { pos: new THREE.Vector3(-5.5, 6.8, 10.5), target: new THREE.Vector3(-0.5, 3.4, 0) },
      // 04: Mounting Rails (Close framing on aluminum rails and L-feet)
      { pos: new THREE.Vector3(3.8, 5.8, 6.0), target: new THREE.Vector3(0.5, 4.0, 0) },
      // 05: Module Assembly (Close framing on half-cut monocrystalline modules)
      { pos: new THREE.Vector3(-2.8, 5.5, 6.8), target: new THREE.Vector3(0, 4.0, 0) },
      // 06: Hybrid Inverter & Battery (Camera glides to the left utility wall)
      { pos: new THREE.Vector3(-7.8, 2.3, 3.4), target: new THREE.Vector3(-4.6, 1.3, 0.2) },
      // 07: Testing & Voltage Verification (Mid-angle electrical check)
      { pos: new THREE.Vector3(-4.8, 4.8, 10.5), target: new THREE.Vector3(-1.5, 2.6, 0) },
      // 08: Commissioned Hero Shot (Dramatic sun-drenched wide angle)
      { pos: new THREE.Vector3(5.8, 6.8, 12.8), target: new THREE.Vector3(0, 3.0, 0) },
    ],
    []
  );

  useEffect(() => {
    isTransitioningRef.current = true;
    const handleReset = () => {
      isTransitioningRef.current = true;
    };
    window.addEventListener("resetPhaseView", handleReset);
    return () => window.removeEventListener("resetPhaseView", handleReset);
  }, [activeStep]);

  useFrame((_, delta) => {
    if (!isTransitioningRef.current) return;
    const safeStep = Math.max(0, Math.min(cameraWaypoints.length - 1, Math.round(activeStep)));
    const target = cameraWaypoints[safeStep] || cameraWaypoints[0];

    // Frame-rate independent exponential smooth damping
    const factor = 1 - Math.exp(-6.5 * Math.min(delta, 0.1));

    camera.position.lerp(target.pos, factor);
    if (controlsRef && controlsRef.current) {
      controlsRef.current.target.lerp(target.target, factor);
      controlsRef.current.update();
    } else {
      camera.lookAt(target.target);
    }

    if (
      camera.position.distanceTo(target.pos) < 0.02 &&
      (!controlsRef?.current || controlsRef.current.target.distanceTo(target.target) < 0.02)
    ) {
      camera.position.copy(target.pos);
      if (controlsRef?.current) {
        controlsRef.current.target.copy(target.target);
        controlsRef.current.update();
      }
      isTransitioningRef.current = false;
    }
  });

  return null;
}

