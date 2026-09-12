"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface PowerFlowStep {
  step: string;
  label: string;
  detail: string;
  hardware: string;
  flowState: string;
}

interface MetricItem {
  label: string;
  value: string;
  note: string;
  pct: number;
}

interface SolarPath {
  id: string;
  pathNumber: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  capacityRange: string;
  description: string;
  verifiedProject: string;
  projectCapacity: string;
  idealFor: string;
  hardwareChips: string[];
  images: {
    primary: string;
    secondary: string;
    caption: string;
  };
  metrics: MetricItem[];
  powerFlow: PowerFlowStep[];
}

const SOLAR_PATHS: SolarPath[] = [
  {
    id: "grid-tied",
    pathNumber: "01",
    shortTitle: "Grid-Tied Solar",
    title: "Grid-Tied Solar Systems",
    subtitle: "Daytime Power Generation + Utility Net Metering",
    categoryTag: "Fastest ROI • Lowest Upfront",
    capacityRange: "3 kW to 160 kW+",
    description:
      "Connect your residential or commercial property directly to Davao Light or DASURECO. Your rooftop panels feed your appliances first; daytime surplus automatically exports to the grid, converting sunlight into substantial utility bill credits.",
    verifiedProject: "RJL Ricemill & Viacrusis Hospital",
    projectCapacity: "160 kW / 100 kW",
    idealFor: "Rice mills, hospitals, schools, commercial buildings & homes with daytime air conditioning.",
    hardwareChips: [
      "Tier-1 Monocrystalline PV",
      "High-Efficiency String Inverter",
      "DASURECO / DLPC Net Metering",
      "Type II Lightning & Surge Arresters",
    ],
    images: {
      primary: "/path-grid-tied.jpg",
      secondary: "/hero-solar.jpg",
      caption: "Commercial & Industrial Rooftop Array in Region XI",
    },
    metrics: [
      { label: "Bill Reduction", value: "Up to 90%", note: "Immediate utility slash", pct: 90 },
      { label: "Estimated ROI", value: "3.5–5 Yrs", note: "Fast capital payback", pct: 85 },
      { label: "Net Metering", value: "Ready", note: "Utility export credits", pct: 100 },
      { label: "Panel Lifespan", value: "25–30 Yrs", note: "Linear yield warranty", pct: 95 },
    ],
    powerFlow: [
      {
        step: "1. Capture",
        label: "PV Array",
        detail: "Monocrystalline silicon absorbs tropical sunlight with 21.8%+ module efficiency",
        hardware: "Tier-1 Mono PERC Panels",
        flowState: "Clean DC Power Generated",
      },
      {
        step: "2. Convert",
        label: "String Inverter",
        detail: "High-efficiency solid-state inversion converts DC to synchronized 220V/60Hz AC",
        hardware: "98.6% Euro-Efficiency Core",
        flowState: "Grid-Synced Pure Sine Wave",
      },
      {
        step: "3. Power",
        label: "Facility Loads",
        detail: "Supplies daytime AC motors, refrigeration, lighting, and heavy commercial equipment",
        hardware: "Direct Load Prioritization",
        flowState: "Zero Grid Draw Daytime",
      },
      {
        step: "4. Export",
        label: "Utility Net Meter",
        detail: "Surplus power automatically flows back to the utility grid for peso-for-peso credits",
        hardware: "Bi-Directional Net Meter",
        flowState: "Monthly Bill Credit Applied",
      },
    ],
  },
  {
    id: "hybrid",
    pathNumber: "02",
    shortTitle: "Hybrid Storage",
    title: "Hybrid + Battery Storage",
    subtitle: "Intelligent Power Routing with Seamless Blackout Resilience",
    categoryTag: "Zero Outages • 24/7 Autonomy",
    capacityRange: "5 kW to 50 kW / 10–50 kWh",
    description:
      "The ultimate energy security for Davao homes and mission-critical businesses. Pairs Tier-1 solar with safe Lithium Iron Phosphate (LiFePO4) battery banks. Switches within sub-10 milliseconds during brownouts — your lights and computers never flicker.",
    verifiedProject: "Lt. Col. Solamo Residence & Camp Sabros",
    projectCapacity: "24 kW / 50 kWh & 32 kW / 32 kWh",
    idealFor: "Modern residences, private clinics, restaurants, cold-chain cafes, and uninterrupted home offices.",
    hardwareChips: [
      "Hybrid Inverter with Smart EPS",
      "LiFePO4 Lithium Battery Bank",
      "Sub-10ms Fast Transfer Relay",
      "24/7 Mobile Cloud BMS Monitoring",
    ],
    images: {
      primary: "/path-hybrid.jpg",
      secondary: "/path-grid-tied.jpg",
      caption: "LiFePO4 Battery Bank & Pure Sine Hybrid Inverter Setup",
    },
    metrics: [
      { label: "Outage Transfer", value: "< 10 ms", note: "Zero computer flicker", pct: 100 },
      { label: "Bill Reduction", value: "Up to 95%", note: "Day + night solar usage", pct: 95 },
      { label: "Battery Cycles", value: "6,000+", note: "10–15 year operational life", pct: 92 },
      { label: "Chemistry", value: "LiFePO4", note: "Thermal-safe lithium cells", pct: 100 },
    ],
    powerFlow: [
      {
        step: "1. Generate",
        label: "Solar Array",
        detail: "Captures abundant tropical sunlight to power the building and charge storage simultaneously",
        hardware: "Tier-1 High-Density Array",
        flowState: "Dual-Bus DC Generation",
      },
      {
        step: "2. Route",
        label: "Hybrid Controller",
        detail: "Intelligent AI algorithm arbitrates power between daytime loads, battery banks, and grid",
        hardware: "Dual MPPT Hybrid Hub",
        flowState: "Dynamic Energy Routing",
      },
      {
        step: "3. Store",
        label: "Lithium BESS",
        detail: "Safely stores excess kilowatt-hours in deep-cycle LiFePO4 cells for night and blackout usage",
        hardware: "Integrated Smart BMS",
        flowState: "Full Storage Reservoir",
      },
      {
        step: "4. Protect",
        label: "UPS Island Mode",
        detail: "Sub-10ms instantaneous islanding isolates property during DASURECO grid brownouts",
        hardware: "Automatic Transfer Switch",
        flowState: "Uninterrupted 24/7 Power",
      },
    ],
  },
  {
    id: "off-grid",
    pathNumber: "03",
    shortTitle: "Off-Grid Solar",
    title: "Off-Grid Microgrid Systems",
    subtitle: "Complete Energy Sovereignty for Locations Beyond the Grid",
    categoryTag: "100% Autonomous • Zero Utility Bills",
    capacityRange: "3 kW to 50 kW / Up to 107 kWh",
    description:
      "Engineered for mountain resorts, highland agriculture, rural schools, and remote island facilities. Fully independent microgrids with industrial solar arrays, heavy-duty deep-cycle battery reserves, and robust solid-state inverters.",
    verifiedProject: "Malita Elementary School & Highland Resorts",
    projectCapacity: "50 kW / 107 kWh Storage",
    idealFor: "Mountain retreats, eco-tourism resorts, provincial schools, remote agricultural farms & radio towers.",
    hardwareChips: [
      "Heavy-Yield Mountain Arrays",
      "Industrial Dual-MPPT Controllers",
      "High-Ampacity Battery Banks",
      "Solid-State Standalone Inverters",
    ],
    images: {
      primary: "/path-offgrid.jpg",
      secondary: "/path-hybrid.jpg",
      caption: "Highland Autonomous Solar Microgrid in Southern Mindanao",
    },
    metrics: [
      { label: "Grid Reliance", value: "0%", note: "Complete independence", pct: 100 },
      { label: "Autonomy", value: "2–3 Days", note: "Cloudy weather reserve", pct: 85 },
      { label: "Fuel Expenses", value: "₱0 / Mo", note: "Replaces diesel gensets", pct: 100 },
      { label: "Operating Noise", value: "0 dB", note: "Silent solid-state power", pct: 100 },
    ],
    powerFlow: [
      {
        step: "1. Harvest",
        label: "Ground & Roof PV",
        detail: "High-yield solar array engineered specifically for high-elevation fog and tropical heat",
        hardware: "Reinforced Anti-PID Modules",
        flowState: "Continuous Renewable Harvest",
      },
      {
        step: "2. Regulate",
        label: "MPPT Regulators",
        detail: "Ultra-fast maximum power point tracking squeezes 99%+ of available energy into the system",
        hardware: "Industrial Dual-String MPPT",
        flowState: "Optimal Current Regulation",
      },
      {
        step: "3. Reservoir",
        label: "Deep-Cycle Bank",
        detail: "Massive battery reserve holds up to 107 kWh of usable energy for 48–72h overcast autonomy",
        hardware: "LiFePO4 Modular Rack Bank",
        flowState: "Multi-Day Energy Buffer",
      },
      {
        step: "4. Distribute",
        label: "Isolated AC Grid",
        detail: "Provides pure sine wave 220V power for commercial refrigeration, water pumps, and lighting",
        hardware: "Isolated Microgrid Board",
        flowState: "Clean 220V Autonomous AC",
      },
    ],
  },
  {
    id: "electrical-civil",
    pathNumber: "04",
    shortTitle: "Turnkey EPC",
    title: "Turnkey Electrical & Civil Works",
    subtitle: "Substructure Engineering, Protection Panels & Grid Compliance",
    categoryTag: "TESDA NC II Certified • Full EPC",
    capacityRange: "Residential to 175 MW Scale",
    description:
      "A solar system is only as durable as its mounting foundation and electrical safety circuitry. Every FRO Solar installation includes 250 km/h typhoon-rated anodized aluminum substructures, stainless steel hardware, DC/AC breaker boxes, surge protection devices, and utility-compliant cabling.",
    verifiedProject: "International Power Plants & Regional EPC",
    projectCapacity: "Up to 175 MW Plant Commissioning",
    idealFor: "Every rooftop solar project, building electrical retrofits, sub-metering, and utility interconnects.",
    hardwareChips: [
      "AL6005-T5 Typhoon-Rated Rails",
      "SUS304 Stainless Steel Fasteners",
      "PEC-Compliant Surge Panels",
      "EPDM Waterproof Roof Seals",
    ],
    images: {
      primary: "/path-electrical-civil.jpg",
      secondary: "/solar-engineer.jpg",
      caption: "Typhoon-Grade Racking, Weather-Tight Conduits & Protection Panels",
    },
    metrics: [
      { label: "Wind Rating", value: "250 km/h", note: "Typhoon-grade aluminum rails", pct: 100 },
      { label: "Standards", value: "PEC & IOSH", note: "Philippine Electrical Code", pct: 100 },
      { label: "Craftsmanship", value: "TESDA NC II", note: "Certified installation masters", pct: 100 },
      { label: "Corrosion", value: "6005-T5", note: "Anodized structural aluminum", pct: 95 },
    ],
    powerFlow: [
      {
        step: "1. Survey",
        label: "Site Engineering",
        detail: "Comprehensive roof structural assessment, azimuth analysis, and 3D shading simulations",
        hardware: "Drone & Laser Shading Audit",
        flowState: "Precision Layout Validated",
      },
      {
        step: "2. Anchor",
        label: "Civil Substructure",
        detail: "Heavy-duty extruded aluminum racking with EPDM waterproof flashings rated for 250 km/h winds",
        hardware: "AL6005-T5 & SUS304 Racking",
        flowState: "Zero-Leak Typhoon Anchor",
      },
      {
        step: "3. Protection",
        label: "AC/DC Distribution",
        detail: "Pre-wired IP65 enclosures with dedicated DC isolators, MCB breakers, and lightning arresters",
        hardware: "Type II SPD & Arc Fault Detect",
        flowState: "Full Code Safety Isolation",
      },
      {
        step: "4. Commission",
        label: "Utility Handover",
        detail: "Ground resistance testing, insulation check, and full Net Metering documentation approval",
        hardware: "DASURECO / DLPC Certificate",
        flowState: "Official Commercial Energization",
      },
    ],
  },
];

export default function WhatWeInstallPathGallery() {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedPhotoView, setSelectedPhotoView] = useState<"primary" | "secondary">("primary");
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [activeMobileView, setActiveMobileView] = useState<"flow" | "metrics" | "all">("all");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const activePath = SOLAR_PATHS[activePathIndex];

  // Auto-pulse through power flow steps every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlowStep((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, [activePathIndex]);

  const handleSelectPath = (index: number) => {
    if (index === activePathIndex) return;
    setDirection(index > activePathIndex ? 1 : -1);
    setActivePathIndex(index);
    setSelectedPhotoView("primary");
    setActiveFlowStep(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      handleSelectPath((index + 1) % SOLAR_PATHS.length);
    } else if (e.key === "ArrowLeft") {
      handleSelectPath((index - 1 + SOLAR_PATHS.length) % SOLAR_PATHS.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        handleSelectPath((activePathIndex + 1) % SOLAR_PATHS.length);
      } else {
        handleSelectPath((activePathIndex - 1 + SOLAR_PATHS.length) % SOLAR_PATHS.length);
      }
    }
    setTouchStartX(null);
  };

  return (
    <div className="fro-path-gallery-wrapper">
      {/* 1. PATH WAYPOINT RAIL */}
      <div className="fro-path-rail-container" role="tablist" aria-label="Solar installation paths">
        <div className="fro-path-rail-track">
          {SOLAR_PATHS.map((path, index) => {
            const isActive = index === activePathIndex;
            return (
              <button
                key={path.id}
                role="tab"
                id={`path-tab-${path.id}`}
                aria-selected={isActive}
                aria-controls={`path-panel-${path.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSelectPath(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`fro-path-node-btn ${isActive ? "active" : ""}`}
              >
                <div className="fro-path-node-badge">
                  <span className="fro-path-node-num">{path.pathNumber}</span>
                  <div className="fro-path-node-dot" />
                </div>
                <div className="fro-path-node-text">
                  <span className="fro-path-node-title">{path.shortTitle}</span>
                  <span className="fro-path-node-tag">{path.capacityRange}</span>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="activePathGlow"
                    className="fro-path-node-glow"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Swipe Hint & Prev/Next Quick Controls */}
      <div className="flex md:hidden items-center justify-between px-1 text-xs text-white/60 mb-2">
        <button
          type="button"
          onClick={() => handleSelectPath((activePathIndex - 1 + SOLAR_PATHS.length) % SOLAR_PATHS.length)}
          className="flex items-center gap-1 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 text-white/85 transition-all cursor-pointer"
          aria-label="Previous pathway"
        >
          <span>←</span>
          <span className="font-semibold">Prev</span>
        </button>
        <span className="font-semibold text-white/80 text-[0.72rem]">
          Pathway <span style={{ color: "var(--color-fro-green)", fontWeight: 800 }}>{activePathIndex + 1}</span> of {SOLAR_PATHS.length} • {activePath.shortTitle}
        </span>
        <button
          type="button"
          onClick={() => handleSelectPath((activePathIndex + 1) % SOLAR_PATHS.length)}
          className="flex items-center gap-1 py-1.5 px-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 text-white/85 transition-all cursor-pointer"
          aria-label="Next pathway"
        >
          <span className="font-semibold">Next</span>
          <span>→</span>
        </button>
      </div>

      {/* 2. DYNAMIC PATH GALLERY STAGE */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={activePath.id}
          id={`path-panel-${activePath.id}`}
          role="tabpanel"
          aria-labelledby={`path-tab-${activePath.id}`}
          className="fro-path-stage"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          initial={reduce ? false : { opacity: 0, x: direction * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: direction * -24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* LEFT PANE: VISUAL SHOWCASE */}
          <div className="fro-path-visual-pane">
            <div className="fro-path-main-image-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPhotoView + activePath.id}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={selectedPhotoView === "primary" ? activePath.images.primary : activePath.images.secondary}
                    alt={`${activePath.title} - ${selectedPhotoView === "primary" ? "Jobsite View" : "Detail View"}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="fro-path-main-image"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              <div className="fro-path-image-scrim" />

              {/* Top Floating Badges */}
              <div className="fro-path-floating-badges">
                <span className="fro-path-kicker-pill">
                  <span className="fro-pulse-dot" />
                  PATH {activePath.pathNumber}
                </span>
                <span className="fro-path-verified-badge">
                  ✦ {activePath.categoryTag}
                </span>
              </div>

              {/* Bottom Project Overlay */}
              <div className="fro-path-project-callout">
                <div className="fro-path-project-meta">
                  <span className="fro-path-project-label">VERIFIED COMMISSIONING</span>
                  <p className="fro-path-project-name">{activePath.verifiedProject}</p>
                  <span className="fro-path-project-cap">{activePath.projectCapacity}</span>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnail Selector Strip */}
            <div className="fro-path-thumb-strip">
              <button
                type="button"
                onClick={() => setSelectedPhotoView("primary")}
                className={`fro-path-thumb-btn ${selectedPhotoView === "primary" ? "active" : ""}`}
                aria-label="View main installation photo"
              >
                <div className="fro-path-thumb-img-wrapper">
                  <Image src={activePath.images.primary} alt="Primary angle" fill sizes="80px" className="object-cover" />
                </div>
                <span>Jobsite View</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedPhotoView("secondary")}
                className={`fro-path-thumb-btn ${selectedPhotoView === "secondary" ? "active" : ""}`}
                aria-label="View alternate installation angle"
              >
                <div className="fro-path-thumb-img-wrapper">
                  <Image src={activePath.images.secondary} alt="Alternate angle" fill sizes="80px" className="object-cover" />
                </div>
                <span>Detail View</span>
              </button>
              <div className="fro-path-thumb-caption">
                {activePath.images.caption}
              </div>
            </div>

            {/* Hardware Component Chips */}
            <div className="fro-hardware-chips-block">
              <span className="fro-hardware-label">KEY SYSTEM HARDWARE:</span>
              <div className="fro-hardware-chips">
                {activePath.hardwareChips.map((chip, cIdx) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * cIdx }}
                    className="fro-hardware-chip"
                  >
                    ✦ {chip}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANE: TECHNICAL SPECIFICATIONS & SCHEMATIC */}
          <div className="fro-path-specs-pane">
            <div className="fro-path-header-block">
              <div className="fro-path-header-top">
                <span className="fro-path-header-tag">ENGINEERED POWER SOLUTION</span>
                <span className="fro-path-header-scale">{activePath.capacityRange}</span>
              </div>
              <h3 className="fro-path-title">{activePath.title}</h3>
              <p className="fro-path-subtitle">{activePath.subtitle}</p>
              <p className="fro-path-desc">{activePath.description}</p>
            </div>

            {/* Mobile View Toggle Filter */}
            <div className="flex md:hidden fro-subview-toggle" role="group" aria-label="Content view filter">
              <button
                type="button"
                onClick={() => setActiveMobileView("all")}
                className={`fro-subview-btn ${activeMobileView === "all" ? "active" : ""}`}
              >
                ✦ Full View
              </button>
              <button
                type="button"
                onClick={() => setActiveMobileView("flow")}
                className={`fro-subview-btn ${activeMobileView === "flow" ? "active" : ""}`}
              >
                ⚡ Power Flow
              </button>
              <button
                type="button"
                onClick={() => setActiveMobileView("metrics")}
                className={`fro-subview-btn ${activeMobileView === "metrics" ? "active" : ""}`}
              >
                📊 Specs & ROI
              </button>
            </div>

            {/* POWER FLOW SCHEMATIC - Dynamic Energy Routing Simulation */}
            {(activeMobileView === "all" || activeMobileView === "flow") && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="fro-path-schematic-section"
              >
                <div className="fro-schematic-header">
                  <div className="flex items-center gap-2">
                    <span className="fro-schematic-title">ENGINEERED POWER FLOW</span>
                    <span className="fro-flow-live-pill">
                      <span className="fro-pulse-dot" /> LIVE SIMULATION
                    </span>
                  </div>
                  <span className="fro-schematic-hint hidden sm:inline">Tap any step to inspect</span>
                </div>

                <div className="fro-schematic-grid">
                  {activePath.powerFlow.map((flow, fIdx) => {
                    const isStepActive = activeFlowStep === fIdx;
                    return (
                      <button
                        type="button"
                        key={flow.step}
                        onClick={() => setActiveFlowStep(fIdx)}
                        className={`fro-schematic-node text-left ${isStepActive ? "active-flow" : ""}`}
                        aria-pressed={isStepActive}
                      >
                        <div className="fro-schematic-node-top">
                          <span className="fro-schematic-step">{flow.step}</span>
                          {fIdx < activePath.powerFlow.length - 1 && (
                            <span className="fro-schematic-arrow" aria-hidden="true">
                              <span className="fro-arrow-desktop">→</span>
                              <span className="fro-arrow-mobile">{fIdx === 1 ? "↓" : "→"}</span>
                            </span>
                          )}
                        </div>
                        <strong className="fro-schematic-label">{flow.label}</strong>
                        <span className="fro-schematic-detail">{flow.detail}</span>
                        {isStepActive && (
                          <motion.div
                            layoutId="activeFlowIndicator"
                            className="fro-flow-active-badge mt-1"
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            ● {flow.flowState}
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active Step Focus Bar */}
                <div className="fro-flow-focus-bar">
                  <span className="fro-flow-focus-tag">STEP {activeFlowStep + 1} FOCUS:</span>
                  <span className="fro-flow-focus-text">
                    <strong style={{ color: "var(--color-fro-green)" }}>{activePath.powerFlow[activeFlowStep].hardware}</strong>
                    {" — "}
                    {activePath.powerFlow[activeFlowStep].flowState}
                  </span>
                </div>
              </motion.div>
            )}

            {/* TECHNICAL METRICS GRID - With Dynamic Visual Gauges */}
            {(activeMobileView === "all" || activeMobileView === "metrics") && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="fro-path-metrics-grid"
              >
                {activePath.metrics.map((metric, mIdx) => (
                  <div key={metric.label} className="fro-path-metric-card">
                    <span className="fro-metric-label">{metric.label}</span>
                    <strong className="fro-metric-val">{metric.value}</strong>
                    <span className="fro-metric-note">{metric.note}</span>

                    {/* Dynamic Visual Progress Gauge */}
                    <div className="fro-metric-gauge-track" aria-hidden="true">
                      <motion.div
                        className="fro-metric-gauge-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.pct}%` }}
                        transition={{ duration: 0.75, delay: 0.1 * mIdx, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* IDEAL APPLICATIONS & ACTION */}
            <div className="fro-path-footer-action">
              <div className="fro-path-ideal-block">
                <span className="fro-path-ideal-title">RECOMMENDED APPLICATION:</span>
                <p className="fro-path-ideal-text">{activePath.idealFor}</p>
              </div>
              <div className="fro-path-cta-row">
                <a
                  href="#contact"
                  className="btn-primary fro-path-quote-btn"
                  title={`Request consultation for ${activePath.title}`}
                >
                  <span>Request Assessment for {activePath.shortTitle}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

