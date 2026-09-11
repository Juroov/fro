"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface PowerFlowStep {
  step: string;
  label: string;
  detail: string;
}

interface MetricItem {
  label: string;
  value: string;
  note: string;
}

interface SolarPath {
  id: string;
  pathNumber: string;
  title: string;
  subtitle: string;
  categoryTag: string;
  capacityRange: string;
  description: string;
  verifiedProject: string;
  projectCapacity: string;
  idealFor: string;
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
    title: "Grid-Tied Solar Systems",
    subtitle: "Daytime Power Generation + Utility Net Metering",
    categoryTag: "Fastest ROI • Lowest Upfront",
    capacityRange: "3 kW to 160 kW+",
    description:
      "Connect your residential or commercial property directly to Davao Light or DASURECO. Your rooftop panels feed your appliances first; daytime surplus automatically exports to the grid, converting sunlight into substantial utility bill credits.",
    verifiedProject: "RJL Ricemill & Viacrusis Hospital",
    projectCapacity: "160 kW / 100 kW",
    idealFor: "Rice mills, hospitals, schools, commercial buildings & homes with daytime air conditioning.",
    images: {
      primary: "/path-grid-tied.jpg",
      secondary: "/hero-solar.jpg",
      caption: "Commercial & Industrial Rooftop Array in Region XI",
    },
    metrics: [
      { label: "Bill Reduction", value: "Up to 90%", note: "Immediate utility slash" },
      { label: "Estimated ROI", value: "3.5–5 Yrs", note: "Fast capital payback" },
      { label: "Net Metering", value: "Ready", note: "Utility export credits" },
      { label: "Panel Lifespan", value: "25–30 Yrs", note: "Linear yield warranty" },
    ],
    powerFlow: [
      { step: "1. Capture", label: "PV Array", detail: "Monocrystalline silicon absorbs tropical sunlight" },
      { step: "2. Convert", label: "String Inverter", detail: "High-efficiency DC to 220V AC transformation" },
      { step: "3. Power", label: "Facility Loads", detail: "Powers running lights, AC, motors, and appliances" },
      { step: "4. Export", label: "Utility Net Meter", detail: "Surplus daytime kW credited to electric bill" },
    ],
  },
  {
    id: "hybrid",
    pathNumber: "02",
    title: "Hybrid + Battery Storage",
    subtitle: "Intelligent Power Routing with Seamless Blackout Resilience",
    categoryTag: "Zero Outages • 24/7 Autonomy",
    capacityRange: "5 kW to 50 kW / 10–50 kWh",
    description:
      "The ultimate energy security for Davao homes and mission-critical businesses. Pairs Tier-1 solar with safe Lithium Iron Phosphate (LiFePO4) battery banks. Switches within sub-10 milliseconds during brownouts — your lights and computers never flicker.",
    verifiedProject: "Lt. Col. Solamo Residence & Camp Sabros",
    projectCapacity: "24 kW / 50 kWh & 32 kW / 32 kWh",
    idealFor: "Modern residences, private clinics, restaurants, cold-chain cafes, and uninterrupted home offices.",
    images: {
      primary: "/path-hybrid.jpg",
      secondary: "/path-grid-tied.jpg",
      caption: "LiFePO4 Battery Bank & Pure Sine Hybrid Inverter Setup",
    },
    metrics: [
      { label: "Outage Transfer", value: "< 10 ms", note: "Zero computer flicker" },
      { label: "Bill Reduction", value: "Up to 95%", note: "Day + night solar usage" },
      { label: "Battery Cycles", value: "6,000+", note: "10–15 year operational life" },
      { label: "Chemistry", value: "LiFePO4", note: "Thermal-safe lithium cells" },
    ],
    powerFlow: [
      { step: "1. Generate", label: "Solar Array", detail: "Captures abundant daytime solar energy" },
      { step: "2. Route", label: "Hybrid Controller", detail: "Smart AI allocates power to loads and battery" },
      { step: "3. Store", label: "Lithium BESS", detail: "Stores excess kWh for evening and peak hours" },
      { step: "4. Protect", label: "UPS Island Mode", detail: "Sub-10ms automatic backup during grid outages" },
    ],
  },
  {
    id: "off-grid",
    pathNumber: "03",
    title: "Off-Grid Microgrid Systems",
    subtitle: "Complete Energy Sovereignty for Locations Beyond the Grid",
    categoryTag: "100% Autonomous • Zero Utility Bills",
    capacityRange: "3 kW to 50 kW / Up to 107 kWh",
    description:
      "Engineered for mountain resorts, highland agriculture, rural schools, and remote island facilities. Fully independent microgrids with industrial solar arrays, heavy-duty deep-cycle battery reserves, and robust solid-state inverters.",
    verifiedProject: "Malita Elementary School & Highland Resorts",
    projectCapacity: "50 kW / 107 kWh Storage",
    idealFor: "Mountain retreats, eco-tourism resorts, provincial schools, remote agricultural farms & radio towers.",
    images: {
      primary: "/path-offgrid.jpg",
      secondary: "/path-hybrid.jpg",
      caption: "Highland Autonomous Solar Microgrid in Southern Mindanao",
    },
    metrics: [
      { label: "Grid Reliance", value: "0%", note: "Complete independence" },
      { label: "Autonomy", value: "2–3 Days", note: "Continuous cloudy weather reserve" },
      { label: "Fuel Expenses", value: "₱0 / Mo", note: "Replaces noisy diesel gensets" },
      { label: "Operating Noise", value: "0 dB", note: "Silent solid-state power" },
    ],
    powerFlow: [
      { step: "1. Harvest", label: "Ground & Roof PV", detail: "Heavy-yield arrays engineered for mountain climates" },
      { step: "2. Regulate", label: "MPPT Chargers", detail: "Maximum Power Point Tracking extracts peak wattage" },
      { step: "3. Reservoir", label: "Deep-Cycle Bank", detail: "High-capacity storage buffers day and night loads" },
      { step: "4. Distribute", label: "Isolated AC Grid", detail: "Pure sine wave electricity for refrigeration and lighting" },
    ],
  },
  {
    id: "electrical-civil",
    pathNumber: "04",
    title: "Turnkey Electrical & Civil Works",
    subtitle: "Substructure Engineering, Protection Panels & Grid Compliance",
    categoryTag: "TESDA NC II Certified • Full EPC",
    capacityRange: "Residential to 175 MW Scale",
    description:
      "A solar system is only as durable as its mounting foundation and electrical safety circuitry. Every FRO Solar installation includes 250 km/h typhoon-rated anodized aluminum substructures, stainless steel hardware, DC/AC breaker boxes, surge protection devices, and utility-compliant cabling.",
    verifiedProject: "International Power Plants & Regional EPC",
    projectCapacity: "Up to 175 MW Plant Commissioning",
    idealFor: "Every rooftop solar project, building electrical retrofits, sub-metering, and utility interconnects.",
    images: {
      primary: "/path-electrical-civil.jpg",
      secondary: "/solar-engineer.jpg",
      caption: "Typhoon-Grade Racking, Weather-Tight Conduits & Protection Panels",
    },
    metrics: [
      { label: "Wind Rating", value: "250 km/h", note: "Typhoon-grade aluminum rails" },
      { label: "Standards", value: "PEC & IOSH", note: "Philippine Electrical Code compliant" },
      { label: "Craftsmanship", value: "TESDA NC II", note: "Certified installation masters" },
      { label: "Corrosion", value: "6005-T5", note: "Anodized structural aluminum" },
    ],
    powerFlow: [
      { step: "1. Survey", label: "Site Engineering", detail: "Structural roof load testing and shading audit" },
      { step: "2. Anchor", label: "Civil Substructure", detail: "Heavy-duty aluminum racking with waterproof EPDM seals" },
      { step: "3. Protection", label: "AC/DC Distribution", detail: "Dedicated DC isolators, breakers & lightning arresters" },
      { step: "4. Commission", label: "Utility Handover", detail: "Testing, grounding verification & Net Metering approval" },
    ],
  },
];

export default function WhatWeInstallPathGallery() {
  const [activePathIndex, setActivePathIndex] = useState(0);
  const [selectedPhotoView, setSelectedPhotoView] = useState<"primary" | "secondary">("primary");
  const reduce = useReducedMotion();

  const activePath = SOLAR_PATHS[activePathIndex];

  const handleSelectPath = (index: number) => {
    setActivePathIndex(index);
    setSelectedPhotoView("primary");
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight") {
      handleSelectPath((index + 1) % SOLAR_PATHS.length);
    } else if (e.key === "ArrowLeft") {
      handleSelectPath((index - 1 + SOLAR_PATHS.length) % SOLAR_PATHS.length);
    }
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
                  <span className="fro-path-node-title">
                    {path.title.split(" ")[0]} {path.title.split(" ")[1]}
                  </span>
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

      {/* 2. DYNAMIC PATH GALLERY STAGE */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePath.id}
          id={`path-panel-${activePath.id}`}
          role="tabpanel"
          aria-labelledby={`path-tab-${activePath.id}`}
          className="fro-path-stage"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* LEFT PANE: VISUAL SHOWCASE */}
          <div className="fro-path-visual-pane">
            <div className="fro-path-main-image-wrapper">
              <Image
                src={selectedPhotoView === "primary" ? activePath.images.primary : activePath.images.secondary}
                alt={activePath.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="fro-path-main-image"
                priority
              />
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

            {/* POWER FLOW SCHEMATIC */}
            <div className="fro-path-schematic-section">
              <div className="fro-schematic-header">
                <span className="fro-schematic-title">ENGINEERED POWER FLOW</span>
                <span className="fro-schematic-hint">Sequential Energy Routing</span>
              </div>
              <div className="fro-schematic-grid">
                {activePath.powerFlow.map((flow, fIdx) => (
                  <div key={flow.step} className="fro-schematic-node">
                    <div className="fro-schematic-node-top">
                      <span className="fro-schematic-step">{flow.step}</span>
                      {fIdx < activePath.powerFlow.length - 1 && (
                        <span className="fro-schematic-arrow" aria-hidden="true">→</span>
                      )}
                    </div>
                    <strong className="fro-schematic-label">{flow.label}</strong>
                    <span className="fro-schematic-detail">{flow.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* TECHNICAL METRICS GRID */}
            <div className="fro-path-metrics-grid">
              {activePath.metrics.map((metric) => (
                <div key={metric.label} className="fro-path-metric-card">
                  <span className="fro-metric-label">{metric.label}</span>
                  <strong className="fro-metric-val">{metric.value}</strong>
                  <span className="fro-metric-note">{metric.note}</span>
                </div>
              ))}
            </div>

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
                  <span>Request Assessment for {activePath.title.split(" ")[0]}</span>
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
