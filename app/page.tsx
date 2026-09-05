import Navbar from "./components/Navbar";
import { ProjectCard, ContactLink } from "./components/InteractiveCards";

/* ─── Data (sourced from company-facts.md) ─── */
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
    description:
      "Connect your home or business to the grid while generating your own clean energy. Reduce your electricity bill from day one.",
    image: "https://picsum.photos/seed/solar-rooftop-davao/600/400",
  },
  {
    id: "hybrid",
    title: "Hybrid + Battery Storage",
    description:
      "Generate, store, and use solar energy on your own schedule. Stay powered through outages and peak-rate hours.",
    image: "https://picsum.photos/seed/solar-battery-wall-system/600/400",
  },
  {
    id: "off-grid",
    title: "Off-Grid Systems",
    description:
      "Complete energy independence for remote sites — schools, farms, resorts, and communities beyond the grid.",
    image: "https://picsum.photos/seed/offgrid-school-rural/600/400",
  },
  {
    id: "electrical",
    title: "Electrical & Civil Works",
    description:
      "Full electrical installation, cabling, and civil works as part of every solar project. One contractor, start to finish.",
    image: "https://picsum.photos/seed/electrician-solar-wiring/600/400",
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
  { name: "Ramyan's Restaurant & Cafe", type: "Hybrid", capacity: "16 kW", iconName: "Buildings" },
  { name: "Leon Evelyn Residence", type: "Hybrid", capacity: "12 kW", iconName: "HouseLine" },
];

const certifications = [
  {
    name: "DTI Business Name Registration",
    detail: "No. 5981531",
    validity: "2024 – 2029",
  },
  {
    name: "City of Digos Business Permit",
    detail: "Permit No. 2026-1102403000-3925",
    validity: "Valid until 31 Dec 2026",
  },
  {
    name: "TESDA NC II — Electrical Installation & Maintenance",
    detail: "Cert No. 24112402018725",
    validity: "2024 – 2029",
  },
  {
    name: "IOSH Managing Safely",
    detail: "Cert No. 9826 — TWI Middle East",
    validity: "Issued 18 Feb 2011",
  },
];

const credentials = [
  "DTI & TESDA NC II certified",
  "City of Digos Business Permit 2026",
  "IOSH Managing Safely — international safety certification",
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        id="home"
        aria-label="FRO Solar hero"
        className="relative flex items-center"
        style={{
          minHeight: "100dvh",
          background: `
            linear-gradient(to bottom, rgba(9,46,44,0.3) 0%, rgba(9,46,44,0.45) 40%, rgba(9,46,44,0.88) 100%),
            url('https://picsum.photos/seed/solar-panels-tropical-roof-philippines/1600/900') center/cover no-repeat
          `,
        }}
      >
        <div
          className="fro-blob"
          aria-hidden="true"
          style={{ width: 520, height: 520, top: -100, right: -100, opacity: 0.07 }}
        />

        <div className="fro-container px-6" style={{ paddingTop: "7rem", paddingBottom: "6rem" }}>
          <div style={{ maxWidth: 680 }}>
            {/* Location chip */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                background: "rgba(141,198,63,0.15)",
                border: "1px solid rgba(141,198,63,0.35)",
                borderRadius: 9999,
                padding: "0.35rem 1rem",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                fontSize: "0.78rem",
                color: "var(--color-fro-green)",
                letterSpacing: "0.04em",
              }}
            >
              <span
                style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--color-fro-green)", display: "inline-block",
                }}
              />
              Digos City, Davao del Sur, Philippines
            </div>

            <h1
              style={{
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 5.5vw, 4.25rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "1.25rem",
              }}
            >
              Power Your Home
              <br />
              <span style={{ color: "var(--color-fro-green)" }}>with the Sun.</span>
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "1.125rem",
                maxWidth: "52ch",
                marginBottom: "2rem",
                lineHeight: 1.65,
                fontFamily: "var(--font-body)",
              }}
            >
              Solar installation across Davao del Sur — by engineers who have
              commissioned power plants up to 175 MW across seven countries.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn-primary" id="hero-cta">
                Request a Quote
              </a>
              <a href="#projects" className="btn-ghost" id="hero-view-work-cta">
                See Our Work
              </a>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 48,
            background: "linear-gradient(to top, #fff 0%, transparent 100%)",
          }}
        />
      </section>

      {/* ═══ STATS ═══ */}
      <section
        aria-label="Company credentials"
        className="fro-dot-grid"
        style={{ background: "var(--color-fro-teal)", padding: "4.5rem 1.5rem" }}
      >
        <div className="fro-container">
          <dl
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "2rem",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  paddingLeft: i > 0 ? "2rem" : 0,
                  borderLeft: i > 0 ? "1px solid rgba(141,198,63,0.28)" : "none",
                }}
              >
                <dt>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                      color: "#fff",
                      lineHeight: 1,
                      display: "block",
                    }}
                  >
                    {s.number}
                    {s.unit && (
                      <span style={{ color: "var(--color-fro-green)", fontSize: "0.55em" }}>
                        {" "}{s.unit}
                      </span>
                    )}
                  </span>
                </dt>
                <dd
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.6)",
                    marginTop: "0.375rem",
                  }}
                >
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section
        id="services"
        aria-label="Our services"
        className="fro-section"
        style={{ background: "var(--color-fro-off-white)" }}
      >
        <div className="fro-container">
          <div style={{ marginBottom: "3rem", maxWidth: 540 }}>
            <h2 style={{ marginBottom: "0.75rem" }}>What We Install</h2>
            <p>
              From a family home to a 160 kW rice processing facility — we size
              and install the right system for your energy needs.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {services.map((svc) => (
              <article
                key={svc.id}
                id={`service-${svc.id}`}
                className="fro-card"
                style={{ border: "1px solid rgba(14,75,72,0.08)" }}
              >
                <div
                  style={{
                    height: 200,
                    background: `url('${svc.image}') center/cover no-repeat`,
                  }}
                />
                <div style={{ padding: "1.25rem 1.5rem 1.5rem" }}>
                  <h3
                    style={{
                      marginBottom: "0.5rem",
                      fontSize: "1.125rem",
                      color: "var(--color-fro-teal)",
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", maxWidth: "100%" }}>
                    {svc.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section
        id="about"
        aria-label="About FRO Solar"
        className="fro-section"
        style={{ background: "var(--color-fro-white)", position: "relative", overflow: "hidden" }}
      >
        <div
          className="fro-blob"
          aria-hidden="true"
          style={{ width: 400, height: 400, top: -80, right: -100, opacity: 0.07 }}
        />
        <div
          className="fro-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <div
              aria-hidden="true"
              style={{
                width: 4, height: 48,
                background: "var(--color-fro-green)",
                borderRadius: 2, marginBottom: "1.5rem",
              }}
            />
            <h2 style={{ marginBottom: "1.25rem" }}>
              28 Years of Power,
              <br />Brought Home
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Our founder spent 17 years as a Project Manager in the Middle East
              — commissioning power generation facilities across Iraq, Kurdistan,
              Afghanistan, Lebanon, Saudi Arabia, Israel, and Jordan. Plants up
              to 175 MW across gas, diesel, HFO, and solar technologies.
            </p>
            <p style={{ marginBottom: "2rem" }}>
              Today, FRO Solar brings that same engineering discipline to Davao
              del Sur: clean, reliable solar energy for homes, businesses, farms,
              schools, and resorts.
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {credentials.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: "var(--color-fro-ink-muted)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: "var(--color-fro-green)",
                      flexShrink: 0, marginTop: 6,
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              minHeight: 420,
              background: `url('https://picsum.photos/seed/solar-engineer-philippines-rooftop-ppe/800/600') center/cover no-repeat`,
            }}
            role="img"
            aria-label="Solar engineer on a rooftop installation"
          />
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section
        id="projects"
        aria-label="Completed solar installations"
        className="fro-section fro-dot-grid"
        style={{ background: "var(--color-fro-teal)" }}
      >
        <div className="fro-container">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <h2 style={{ color: "#fff" }}>Our Installations</h2>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {projects.length} completed projects
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {projects.map((p) => (
              <ProjectCard key={p.name} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CERTIFICATIONS ═══ */}
      <section
        id="certifications"
        aria-label="Licenses and certifications"
        className="fro-section"
        style={{ background: "var(--color-fro-surface)" }}
      >
        <div className="fro-container">
          <div style={{ marginBottom: "3rem", maxWidth: 520 }}>
            <h2>Licensed &amp; Certified</h2>
            <p style={{ marginTop: "0.75rem" }}>
              Every installation is backed by verifiable government and industry
              credentials. Exact numbers — no paraphrasing.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {certifications.map((cert) => (
              <div key={cert.name} className="fro-cert-card">
                <div className="fro-cert-dot" aria-hidden="true" />
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "var(--color-fro-teal)",
                    marginBottom: "0.375rem",
                    lineHeight: 1.35,
                  }}
                >
                  {cert.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-fro-ink-muted)",
                    maxWidth: "100%",
                    marginBottom: "0.5rem",
                  }}
                >
                  {cert.detail}
                </p>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--color-fro-orange)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {cert.validity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA + CONTACT + FOOTER ═══ */}
      <section
        id="contact"
        aria-label="Contact and quote"
        style={{
          background: "var(--color-fro-teal)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="fro-blob"
          aria-hidden="true"
          style={{ width: 500, height: 500, bottom: -150, left: -100, opacity: 0.18 }}
        />

        <div
          className="fro-section fro-container"
          style={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              marginBottom: "1rem",
            }}
          >
            Ready to Go Solar?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "1.125rem",
              margin: "0 auto 2.5rem",
              maxWidth: "48ch",
            }}
          >
            Talk to our engineers about the right system for your home or
            business. No obligation.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            <a href="tel:+6309063665473" className="btn-primary" id="contact-call-cta">
              Call 0906-366-5473
            </a>
            <a
              href="mailto:frosolar.energysolutions@gmail.com"
              className="btn-ghost"
              id="contact-email-cta"
            >
              Email Us
            </a>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "2rem",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingTop: "2rem",
            }}
          >
            <ContactLink
              href="tel:+6309063665473"
              iconName="phone"
              text="082-272-0011 / 0906-366-5473"
            />
            <ContactLink
              href="mailto:frosolar.energysolutions@gmail.com"
              iconName="email"
              text="frosolar.energysolutions@gmail.com"
            />
            <ContactLink
              href="#"
              iconName="map"
              text="Sta. Ana Road, Digos City, Davao del Sur"
            />
          </div>
        </div>

        <footer
          style={{
            background: "var(--color-fro-teal-dark)",
            padding: "1.5rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.4)",
              maxWidth: "100%",
              margin: "0 auto",
            }}
          >
            Fro Solar Power Installation Services &mdash; Purok Cattleya, Sta.
            Ana Road, Tiguman, Digos City, Davao del Sur &bull; DTI Reg. No.
            5981531 &bull; {new Date().getFullYear()}
          </p>
        </footer>
      </section>
    </>
  );
}
