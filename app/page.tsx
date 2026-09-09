import Navbar from "./components/Navbar";
import { ProjectCard, ContactLink, Reveal } from "./components/InteractiveCards";
import HowItWorksTrigger from "./components/SolarProcessModal";

const stats = [
  { number: "28", unit: "Yrs", label: "Industry experience" },
  { number: "175", unit: "MW", label: "Largest plant commissioned" },
  { number: "10+", unit: "", label: "Completed installations" },
  { number: "7", unit: "Countries", label: "International field experience" },
];

const services = [
  {
    id: "grid-tied",
    title: "Grid-Tied Solar",
    description: "Connect your home or business to the grid while generating your own clean energy. Reduce your electricity bill from day one.",
    image: "https://picsum.photos/seed/solar-rooftop-davao-city/600/400",
    tag: "Most popular",
  },
  {
    id: "hybrid",
    title: "Hybrid + Battery Storage",
    description: "Generate, store, and use solar energy on your schedule. Stay powered through outages and peak-rate hours.",
    image: "https://picsum.photos/seed/solar-battery-storage-home/600/400",
    tag: "Recommended",
  },
  {
    id: "off-grid",
    title: "Off-Grid Systems",
    description: "Complete energy independence for remote sites - schools, farms, resorts, and communities beyond the grid.",
    image: "https://picsum.photos/seed/offgrid-rural-school-solar/600/400",
    tag: "Remote sites",
  },
  {
    id: "electrical",
    title: "Electrical & Civil Works",
    description: "Full electrical installation, cabling, and civil works included in every solar project. One contractor, start to finish.",
    image: "https://picsum.photos/seed/electrician-solar-panel-wiring/600/400",
    tag: "Turnkey",
  },
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
      <Navbar />

      {/* HERO */}
      <section
        id="home"
        aria-label="FRO Solar hero"
        style={{
          position: "relative",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(to bottom, rgba(7,31,30,0.3) 0%, rgba(7,31,30,0.55) 50%, rgba(7,31,30,0.85) 85%, rgba(7,31,30,0.98) 100%), url('/hero-solar.jpg') center/cover no-repeat",
        }}
      >
        <div className="fro-container px-6" style={{ paddingTop: "7.5rem", paddingBottom: "3rem", flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 640 }}>
            <h1 style={{ color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.75rem, 5.5vw, 4.5rem)", lineHeight: 1.04, letterSpacing: "-0.035em", marginBottom: "1.375rem" }}>
              Power Your Home<br />
              <span style={{ color: "var(--color-fro-green)" }}>with the Sun.</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.78)", fontSize: "1.125rem", maxWidth: "50ch", marginBottom: "2.25rem", lineHeight: 1.7, fontFamily: "var(--font-body)" }}>
              Solar installation across Davao del Sur by engineers who have commissioned power plants up to 175 MW across seven countries.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.875rem", alignItems: "center" }}>
              <a href="#contact" className="btn-primary" id="hero-cta">Request a Quote</a>
              <a href="#projects" className="btn-ghost" id="hero-view-work-cta">See Our Work</a>
              <HowItWorksTrigger id="hero-how-it-works-cta" />
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
            padding: "2rem 1.5rem 2.5rem",
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
                <div key={s.label} className="hero-stat-cell">
                  <dt>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 3.8vw, 3.25rem)", color: "#fff", lineHeight: 1, display: "block", letterSpacing: "-0.04em" }}>
                      {s.number}
                      {s.unit && <span style={{ color: "var(--color-fro-green)", fontSize: "0.52em", letterSpacing: 0 }}>{" "}{s.unit}</span>}
                    </span>
                  </dt>
                  <dd style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.65)", marginTop: "0.375rem", letterSpacing: "0.01em", lineHeight: 1.4 }}>
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" aria-label="Our services" className="fro-section" style={{ background: "var(--color-fro-off-white)" }}>
        <div className="fro-container">
          <Reveal>
            <div style={{ marginBottom: "3.5rem", maxWidth: 520 }}>
              <div className="fro-accent-line" style={{ marginBottom: "1.25rem" }} aria-hidden="true" />
              <h2 style={{ marginBottom: "0.875rem" }}>What We Install</h2>
              <p>From a family home to a 160 kW rice processing facility, we size and install the right system for your energy needs.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {services.map((svc, i) => (
              <Reveal key={svc.id} delay={i * 0.08}>
                <article id={`service-${svc.id}`} className="fro-card" style={{ height: "100%" }}>
                  <div style={{ height: 192, background: `url('${svc.image}') center/cover no-repeat`, position: "relative" }}>
                    <span style={{ position: "absolute", top: "0.875rem", left: "0.875rem", background: "rgba(7,31,30,0.78)", backdropFilter: "blur(6px)", color: "var(--color-fro-green)", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.68rem", padding: "0.25rem 0.625rem", borderRadius: 6, letterSpacing: "0.04em", textTransform: "uppercase" }}>{svc.tag}</span>
                  </div>
                  <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                    <h3 style={{ marginBottom: "0.5rem", fontSize: "1.0625rem", color: "var(--color-fro-teal)", letterSpacing: "-0.015em" }}>{svc.title}</h3>
                    <p style={{ fontSize: "0.875rem", maxWidth: "100%" }}>{svc.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* 3D Walkthrough Feature Banner */}
          <Reveal delay={0.25}>
            <div
              style={{
                marginTop: "3rem",
                padding: "2rem 2.5rem",
                background: "var(--color-fro-teal)",
                borderRadius: "var(--radius-card)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1.5rem",
                boxShadow: "0 16px 40px rgba(14,75,72,0.12)",
              }}
            >
              <div>
                <h3 style={{ color: "#ffffff", marginBottom: "0.35rem", fontSize: "1.25rem" }}>
                  Curious how solar panels are installed on your roof?
                </h3>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9375rem", margin: 0, maxWidth: "60ch" }}>
                  Explore our complete 8-phase engineering process &mdash; from 3D roof scanning and heavy-duty racking to live grid energization.
                </p>
              </div>
              <HowItWorksTrigger className="btn-primary" id="services-how-it-works-cta" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" aria-label="About FRO Solar" className="fro-section" style={{ background: "var(--color-fro-white)" }}>
        <div className="fro-container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "center" }}>
            <Reveal>
              <div style={{ borderRadius: "var(--radius-image)", overflow: "hidden", minHeight: 460, background: "url('/solar-engineer.jpg') center/cover no-repeat", boxShadow: "0 32px 80px rgba(14,75,72,0.14)" }} role="img" aria-label="FRO Solar engineers installing panels on a rooftop in Davao del Sur" />
            </Reveal>
            <Reveal delay={0.12}>
              <div>
                <div style={{ width: 4, height: 52, background: "var(--color-fro-green)", borderRadius: 2, marginBottom: "1.5rem" }} aria-hidden="true" />
                <h2 style={{ marginBottom: "1.25rem" }}>28 Years of Power,<br />Brought Home</h2>
                <p style={{ marginBottom: "1rem" }}>Our founder spent 17 years as a Project Manager in the Middle East, commissioning power generation facilities across Iraq, Kurdistan, Afghanistan, Lebanon, Saudi Arabia, Israel, and Jordan. Plants up to 175 MW in gas, diesel, HFO, and solar.</p>
                <p style={{ marginBottom: "2rem" }}>Today, FRO Solar brings that same engineering discipline to Davao del Sur: reliable solar energy for homes, businesses, farms, schools, and resorts.</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
                  {["DTI & TESDA NC II certified", "City of Digos Business Permit 2026", "IOSH Managing Safely"].map((item) => (
                    <span key={item} style={{ display: "inline-flex", alignItems: "center", background: "var(--color-fro-off-white)", border: "1px solid var(--color-fro-border)", borderRadius: 9999, padding: "0.375rem 0.875rem", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--color-fro-ink-muted)" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" aria-label="Completed solar installations" className="fro-section fro-dot-grid" style={{ background: "var(--color-fro-teal)" }}>
        <div className="fro-container">
          <Reveal>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
              <div>
                <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Our Installations</h2>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", maxWidth: "100%" }}>{projects.length} completed projects across Davao del Sur</p>
              </div>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "0.875rem" }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" aria-label="Licenses and certifications" className="fro-section" style={{ background: "var(--color-fro-surface)" }}>
        <div className="fro-container">
          <Reveal>
            <div style={{ marginBottom: "3.5rem", maxWidth: 520 }}>
              <div className="fro-accent-line" style={{ background: "var(--color-fro-orange)", marginBottom: "1.25rem" }} aria-hidden="true" />
              <h2>Licensed &amp; Certified</h2>
              <p style={{ marginTop: "0.75rem" }}>Every installation backed by verifiable government and industry credentials. Exact numbers, no paraphrasing.</p>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.25rem" }}>
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
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
            <img src="/fro-logo.png" alt="FRO Solar Energy Solution" style={{ height: 80, width: "auto", objectFit: "contain", filter: "brightness(1.1)" }} />
          </div>
          <h2 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3.25rem)", marginBottom: "1rem", letterSpacing: "-0.03em" }}>Ready to Go Solar?</h2>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "1.0625rem", margin: "0 auto 2.5rem", maxWidth: "46ch" }}>Talk to our engineers about the right system for your home or business. No obligation, free site assessment.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <a href="tel:+6309063665473" className="btn-primary" id="contact-call-cta">Call 0906-366-5473</a>
            <a href="mailto:frosolar.energysolutions@gmail.com" className="btn-ghost" id="contact-email-cta">Email Us</a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem" }}>
            <ContactLink href="tel:+6309063665473" iconName="phone" text="082-272-0011 / 0906-366-5473" />
            <ContactLink href="mailto:frosolar.energysolutions@gmail.com" iconName="email" text="frosolar.energysolutions@gmail.com" />
            
          </div>
        </div>
        <footer style={{ background: "var(--color-fro-teal-dark)", padding: "1.25rem 1.5rem", textAlign: "center", position: "relative", zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", maxWidth: "100%", margin: "0 auto", letterSpacing: "0.01em" }}>
            Fro Solar Power Installation Services &mdash; Purok Cattleya, Sta. Ana Road, Tiguman, Digos City, Davao del Sur &bull; DTI Reg. No. 5981531 &bull; {new Date().getFullYear()}
          </p>
        </footer>
      </section>
    </>
  );
}