import Image from "next/image";
import Navbar from "./components/Navbar";
import { ContactLink, Reveal, AnimatedStat, ProjectFilterTabs } from "./components/InteractiveCards";
import HowItWorksTrigger from "./components/SolarProcessModal";
import WhatWeInstallPathGallery from "./components/WhatWeInstallPathGallery";
import FloatingCTA from "./components/FloatingCTA";
import SolarIntroAnimation from "./components/IntroAnimationClient";

const stats = [
  { number: "28", unit: "Yrs", label: "Industry experience" },
  { number: "175", unit: "MW", label: "Largest plant commissioned" },
  { number: "10+", unit: "", label: "Completed installations" },
  { number: "7", unit: "Countries", label: "International field experience" },
];

const projects = [
  { name: "RJL Ricemill", type: "Grid-Tied", capacity: "160 kW", iconName: "Factory" },
  { name: "Viacrusis Hospital", type: "Grid-Tied", capacity: "100 kW", iconName: "Buildings" },
  { name: "Malita Elementary School", type: "Off-Grid + Battery", capacity: "50 kW / 107 kWh", iconName: "HouseLine" },
  { name: "Camp Sabros", type: "Hybrid + Battery", capacity: "32 kW / 32 kWh", iconName: "Leaf" },
  { name: "Ultralab", type: "Hybrid", capacity: "32 kW", iconName: "Factory" },
  { name: "Kapalong Banana Plantation", type: "Grid-Tied", capacity: "30 kW", iconName: "Leaf" },
  { name: "Lt. Col. Solamo Residence", type: "Hybrid + Battery", capacity: "24 kW / 50 kWh", iconName: "HouseLine" },
  { name: "Encar Resort", type: "Hybrid + Battery", capacity: "18 kW / 36 kWh", iconName: "Buildings" },
  { name: "Ramyan Restaurant & Cafe", type: "Hybrid", capacity: "16 kW", iconName: "Buildings" },
  { name: "Leon Evelyn Residence", type: "Hybrid", capacity: "12 kW", iconName: "HouseLine" },
];

const certifications = [
  { name: "DTI Business Name Registration", detail: "No. 5981531", validity: "2024 - 2029" },
  { name: "City of Digos Business Permit", detail: "Permit No. 2026-1102403000-3925", validity: "Valid until 31 Dec 2026" },
  { name: "TESDA NC II - Electrical Installation & Maintenance", detail: "Cert No. 24112402018725", validity: "2024 - 2029" },
  { name: "IOSH Managing Safely", detail: "Cert No. 9826 - TWI Middle East", validity: "Issued 18 Feb 2011" },
];

export default function HomePage() {
  return (
    <>
      {/* Intro animation — overlays full screen, auto-exits after ~2.4 s */}
      <SolarIntroAnimation />
      <FloatingCTA />
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        aria-label="FRO Solar hero"
        style={{
          position: "relative",
          minHeight: "100dvh",
          maxWidth: "100%",
          overflowX: "clip",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(to bottom, rgba(7,31,30,0.3) 0%, rgba(7,31,30,0.55) 50%, rgba(7,31,30,0.85) 85%, rgba(7,31,30,0.98) 100%), url('/hero-solar.jpg') center/cover no-repeat",
        }}
      >
        <div
          className="fro-container w-full"
          style={{
            paddingTop: "clamp(6rem, 13vh, 8.5rem)",
            paddingBottom: "clamp(2rem, 5vh, 3.5rem)",
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: 640 }}>
            {/* Solar Kicker Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(141,198,63,0.16)",
                border: "1px solid rgba(141,198,63,0.38)",
                borderRadius: 9999,
                padding: "0.35rem 0.85rem",
                marginBottom: "1.25rem",
                backdropFilter: "blur(8px)",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <span style={{ color: "var(--color-fro-green)", fontSize: "0.75rem", flexShrink: 0 }}>✦</span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "clamp(0.65rem, 2.7vw, 0.75rem)",
                  letterSpacing: "0.05em",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  lineHeight: 1.35,
                  wordBreak: "break-word",
                }}
              >
                Engineered Monocrystalline Solar &amp; Storage
              </span>
            </div>

            <h1
              style={{
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.15rem, 5.8vw, 4.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.035em",
                marginBottom: "1.25rem",
              }}
            >
              Power Your Home<br />
              <span style={{ color: "var(--color-fro-green)" }}>with the Sun.</span>
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                fontSize: "clamp(0.95rem, 2.2vw, 1.125rem)",
                maxWidth: "50ch",
                marginBottom: "2rem",
                lineHeight: 1.65,
                fontFamily: "var(--font-body)",
              }}
            >
              Solar installation across the Philippines by engineers who have commissioned power plants up to 175 MW across seven countries.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-3.5 items-stretch sm:items-center">
              <a href="#contact" className="btn-primary w-full sm:w-auto text-center" id="hero-cta">
                Request a Quote
              </a>
              <a href="#projects" className="btn-ghost w-full sm:w-auto text-center" id="hero-view-work-cta">
                See Our Work
              </a>
              <HowItWorksTrigger className="btn-ghost w-full sm:w-auto justify-center" id="hero-how-it-works-cta" />
            </div>
          </div>
        </div>

        {/* COMBINED TRANSITIONAL STATS BAR */}
        <div
          aria-label="Company credentials"
          style={{
            position: "relative",
            zIndex: 10,
            width: "100%",
            borderTop: "1px solid rgba(141,198,63,0.18)",
            background: "linear-gradient(180deg, rgba(14,75,72,0.72) 0%, rgba(7,31,30,0.92) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "clamp(1.25rem, 3vw, 2rem) 1rem clamp(1.5rem, 3.5vw, 2.25rem)",
          }}
        >
          {/* Subtle green ambient accent glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              right: "15%",
              height: 1,
              background: "linear-gradient(90deg, transparent 0%, var(--color-fro-green) 50%, transparent 100%)",
              opacity: 0.6,
            }}
          />
          <div className="fro-container">
            <dl className="hero-stats-grid">
              {stats.map((s) => (
                <AnimatedStat key={s.label} number={s.number} unit={s.unit} label={s.label} />
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* SOLAR PANEL INTRO */}
      <section id="solar-intro" aria-label="Introduction to solar panels" className="fro-section" style={{ background: "var(--color-fro-white)", borderBottom: "1px solid var(--color-fro-border)" }}>
        <div className="fro-container">
          <Reveal>
            <div style={{ marginBottom: "clamp(2.25rem, 5vw, 3.5rem)", maxWidth: 640 }}>
              <div className="fro-accent-line" style={{ marginBottom: "1.25rem" }} aria-hidden="true" />
              <h2 style={{ marginBottom: "0.875rem" }}>How Solar Panels Power Your Life</h2>
              <p>Convert abundant Philippine sunshine into free, reliable electricity. Built with Tier-1 monocrystalline cells engineered for high tropical heat, heavy rain, and coastal weather.</p>
            </div>
          </Reveal>

          {/* 3 Pillars Grid */}
          <div className="fro-solar-intro-grid">
            {/* Pillar 1: Solar Generation */}
            <Reveal delay={0.06}>
              <div className="fro-solar-pillar-card" style={{ height: "100%" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(141,198,63,0.14)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(141,198,63,0.25)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-green-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                    </div>
                    <span className="fro-badge">PHASE 01 • CAPTURE</span>
                  </div>
                  <h3 style={{ fontSize: "1.1875rem", marginBottom: "0.625rem", color: "var(--color-fro-teal)" }}>
                    High-Efficiency Monocrystalline Panels
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                    High-purity monocrystalline silicon cells absorb direct and ambient tropical sunshine, generating silent DC power even on overcast days across Davao del Sur. Fortified by 3.2mm tempered anti-reflective glass.
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", borderTop: "1px solid var(--color-fro-border)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fro-teal-light)", background: "var(--color-fro-off-white)", padding: "0.25rem 0.6rem", borderRadius: 6 }}>
                    21.8%+ Efficiency
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fro-teal-light)", background: "var(--color-fro-off-white)", padding: "0.25rem 0.6rem", borderRadius: 6 }}>
                    250 km/h Wind Resistance
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Pillar 2: Inverter & Storage */}
            <Reveal delay={0.12}>
              <div className="fro-solar-pillar-card" style={{ height: "100%" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(14,75,72,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(14,75,72,0.18)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                        <path d="M12 11v4" />
                        <path d="M10 13h4" />
                      </svg>
                    </div>
                    <span className="fro-badge" style={{ color: "var(--color-fro-teal)", background: "rgba(14,75,72,0.1)" }}>
                      PHASE 02 • CONVERT
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.1875rem", marginBottom: "0.625rem", color: "var(--color-fro-teal)" }}>
                    Smart Inversion &amp; Battery Backup
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                    The inverter instantly converts raw DC power into clean 230V AC current for air conditioning, refrigerators, pumps, and electronics. Surplus power charges battery storage for seamless power during brownouts.
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", borderTop: "1px solid var(--color-fro-border)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fro-teal-light)", background: "var(--color-fro-off-white)", padding: "0.25rem 0.6rem", borderRadius: 6 }}>
                    Pure Sine Wave 230V
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fro-teal-light)", background: "var(--color-fro-off-white)", padding: "0.25rem 0.6rem", borderRadius: 6 }}>
                    &lt;10ms Auto-Switchover
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Pillar 3: Net Metering & Savings */}
            <Reveal delay={0.18}>
              <div className="fro-solar-pillar-card" style={{ height: "100%" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(247,148,29,0.12)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(247,148,29,0.25)" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-fro-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 3v18h18" />
                        <path d="m19 9-5 5-4-4-3 3" />
                        <polyline points="14 9 19 9 19 14" />
                      </svg>
                    </div>
                    <span className="fro-badge" style={{ color: "var(--color-fro-orange)", background: "rgba(247,148,29,0.12)" }}>
                      PHASE 03 • SAVINGS
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.1875rem", marginBottom: "0.625rem", color: "var(--color-fro-teal)" }}>
                    Net Metering &amp; Slashed Utility Bills
                  </h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                    Generate peak power during daylight hours when commercial and residential electricity tariffs are highest. Under utility Net Metering, any surplus energy is fed back into the grid for credits on your monthly bill.
                  </p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", borderTop: "1px solid var(--color-fro-border)", paddingTop: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fro-teal-light)", background: "var(--color-fro-off-white)", padding: "0.25rem 0.6rem", borderRadius: 6 }}>
                    Up to 90% Bill Reduction
                  </span>
                  <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-fro-teal-light)", background: "var(--color-fro-off-white)", padding: "0.25rem 0.6rem", borderRadius: 6 }}>
                    Utility Meter Credit
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Quick Engineering Standards Strip */}
          <Reveal delay={0.24}>
            <div className="fro-specs-strip">
              <div className="fro-specs-item">
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--color-fro-teal)" }}>
                  25–30 Yrs
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-fro-ink-muted)", lineHeight: 1.4 }}>
                  Linear power output guarantee
                </span>
              </div>
              <div className="fro-specs-item">
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--color-fro-green-dark)" }}>
                  0 dB Silent
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-fro-ink-muted)", lineHeight: 1.4 }}>
                  Zero fuel, zero engine maintenance
                </span>
              </div>
              <div className="fro-specs-item">
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--color-fro-teal)" }}>
                  250 km/h
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-fro-ink-muted)", lineHeight: 1.4 }}>
                  Typhoon-grade aluminum substructure
                </span>
              </div>
              <div className="fro-specs-item">
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--color-fro-orange)" }}>
                  TESDA NC II
                </span>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-fro-ink-muted)", lineHeight: 1.4 }}>
                  Licensed electrical installation
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES / WHAT WE INSTALL - PATH GALLERY */}
      <section id="services" aria-label="What we install" className="fro-section" style={{ background: "var(--color-fro-off-white)" }}>
        <div className="fro-container">
          <Reveal>
            <div style={{ marginBottom: "clamp(2rem, 4vw, 3rem)", maxWidth: 640 }}>
              <div className="fro-accent-line" style={{ marginBottom: "1.25rem" }} aria-hidden="true" />
              <h2 style={{ marginBottom: "0.875rem" }}>What We Install</h2>
              <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)", lineHeight: 1.6, color: "var(--color-fro-ink-muted)" }}>
                Explore our four engineered solar pathways &mdash; from residential energy resilience to 160 kW industrial power facilities, custom-sized for Davao del Sur &amp; Southern Mindanao.
              </p>
            </div>
          </Reveal>

          {/* Interactive Path Gallery */}
          <Reveal delay={0.08}>
            <WhatWeInstallPathGallery />
          </Reveal>

          {/* 3D Walkthrough Feature Banner */}
          <Reveal delay={0.2}>
            <div className="fro-feature-banner">
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ color: "#ffffff", marginBottom: "0.625rem", fontSize: "clamp(1.15rem, 2.2vw, 1.375rem)", lineHeight: 1.35, fontWeight: 700 }}>
                  Curious how solar panels are installed on your roof?
                </h3>
                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(0.875rem, 1.5vw, 0.95rem)", margin: 0, maxWidth: "62ch", lineHeight: 1.65 }}>
                  Explore our complete 8-phase engineering process &mdash; from 3D roof scanning and heavy-duty racking to live grid energization.
                </p>
              </div>
              <div className="fro-feature-banner-btn">
                <HowItWorksTrigger className="btn-primary w-full" id="services-how-it-works-cta" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" aria-label="About FRO Solar" className="fro-section" style={{ background: "var(--color-fro-white)" }}>
        <div className="fro-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <Reveal>
              <div
                className="rounded-2xl sm:rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[480px] w-full"
                style={{
                  background: "url('/solar-engineer.jpg') center/cover no-repeat",
                  boxShadow: "0 24px 60px rgba(14,75,72,0.12)",
                }}
                role="img"
                aria-label="FRO Solar engineers installing panels on a rooftop in Davao del Sur"
              />
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <div style={{ width: 4, height: 48, background: "var(--color-fro-green)", borderRadius: 2, marginBottom: "1.25rem" }} aria-hidden="true" />
                <h2 style={{ marginBottom: "1.25rem" }}>28 Years of Power,<br />Brought Home</h2>
                <p style={{ marginBottom: "1rem" }}>Our founder spent 17 years as a Project Manager in the Middle East, commissioning power generation facilities across Iraq, Kurdistan, Afghanistan, Lebanon, Saudi Arabia, Israel, and Jordan. Plants up to 175 MW in gas, diesel, HFO, and solar.</p>
                <p style={{ marginBottom: "2rem" }}>Today, FRO Solar brings that same engineering discipline to Davao del Sur: reliable solar energy for homes, businesses, farms, schools, and resorts.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["DTI & TESDA NC II certified", "City of Digos Business Permit 2026", "IOSH Managing Safely"].map((item) => (
                    <span
                      key={item}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        background: "var(--color-fro-off-white)",
                        border: "1px solid var(--color-fro-border)",
                        borderRadius: 9999,
                        padding: "0.35rem 0.85rem",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.78rem",
                        color: "var(--color-fro-ink-muted)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section Bridge: smooth transition into dark Projects */}
      <div className="fro-section-bridge" aria-hidden="true" />

      {/* PROJECTS */}
      <section id="projects" aria-label="Completed solar installations" className="fro-section fro-dot-grid" style={{ background: "var(--color-fro-teal)", paddingTop: "clamp(3rem, 5vw, 4.5rem)" }}>
        <div className="fro-container">
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "clamp(1.75rem, 4vw, 3rem)" }}>
              <div>
                <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Our Installations</h2>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.875rem", maxWidth: "100%" }}>{projects.length} completed projects across Davao del Sur</p>
              </div>
            </div>
          </Reveal>
          <ProjectFilterTabs projects={projects} />
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" aria-label="Licenses and certifications" className="fro-section" style={{ background: "var(--color-fro-surface)" }}>
        <div className="fro-container">
          <Reveal>
            <div style={{ marginBottom: "clamp(2rem, 5vw, 3.5rem)", maxWidth: 520 }}>
              <div className="fro-accent-line" style={{ background: "var(--color-fro-orange)", marginBottom: "1.25rem" }} aria-hidden="true" />
              <h2>Licensed &amp; Certified</h2>
              <p style={{ marginTop: "0.75rem" }}>Every installation backed by verifiable government and industry credentials. Exact numbers, no paraphrasing.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "1.25rem" }}>
            {certifications.map((cert, i) => (
              <Reveal key={cert.name} delay={i * 0.07}>
                <div className="fro-cert-card">
                  <div className="fro-cert-accent" aria-hidden="true" />
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9375rem", color: "var(--color-fro-teal)", marginBottom: "0.5rem", lineHeight: 1.3, letterSpacing: "-0.01em" }}>{cert.name}</h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--color-fro-ink-muted)", maxWidth: "100%", marginBottom: "0.625rem" }}>{cert.detail}</p>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-fro-orange)", fontFamily: "var(--font-display)" }}>{cert.validity}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT + FOOTER */}
      <section id="contact" aria-label="Contact and quote" style={{ background: "var(--color-fro-teal)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", bottom: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: "radial-gradient(ellipse, rgba(141,198,63,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div className="fro-section fro-container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
            <Image src="/fro-logo-transparent.png" alt="FRO Solar Energy Solution" width={240} height={80} style={{ height: "clamp(55px, 9vw, 80px)", width: "auto", objectFit: "contain", filter: "brightness(1.1)" }} />
          </div>
          <h2 style={{ color: "#fff", fontSize: "clamp(1.85rem, 4.5vw, 3.25rem)", marginBottom: "1rem", letterSpacing: "-0.03em" }}>Ready to Go Solar?</h2>
          <p style={{ color: "rgba(255,255,255,0.72)", fontSize: "clamp(0.95rem, 2vw, 1.0625rem)", margin: "0 auto 2.5rem", maxWidth: "46ch", lineHeight: 1.65 }}>
            Talk to our engineers about the right system for your home or business. No obligation, free site assessment.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
              marginBottom: "3.5rem",
            }}
          >
            <a href="tel:+639063665473" className="btn-primary" id="contact-call-cta">
              Call 0906-366-5473
            </a>
            <a href="mailto:frosolar.energysolutions@gmail.com" className="btn-ghost" id="contact-email-cta">
              Email Us
            </a>
          </div>
          <div className="fro-contact-links">
            <ContactLink href="tel:+639063665473" iconName="phone" text="082-272-0011 / 0906-366-5473" />
            <ContactLink href="mailto:frosolar.energysolutions@gmail.com" iconName="email" text="frosolar.energysolutions@gmail.com" />
            <ContactLink href="https://maps.google.com/?q=Sta.+Ana+Road,+Tiguman,+Digos+City,+Davao+del+Sur" iconName="map" text="Sta. Ana Road, Digos City" />
          </div>
        </div>
        <footer style={{ background: "var(--color-fro-teal-dark)", padding: "1.5rem 1.25rem max(1.5rem, env(safe-area-inset-bottom, 1.5rem))", textAlign: "center", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="fro-footer-text">
            Fro Solar Power Installation Services &mdash; Purok Cattleya, Sta. Ana Road, Tiguman, Digos City, Davao del Sur &bull; DTI Reg. No. 5981531 &bull; {new Date().getFullYear()}
          </p>
        </footer>
      </section>
    </>
  );
}