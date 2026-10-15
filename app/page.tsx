import Image from "next/image";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Check,
  ClipboardCheck,
  Factory,
  Gauge,
  GraduationCap,
  Grid2X2,
  HardHat,
  Home,
  Mail,
  MapPin,
  Phone,
  PlugZap,
  ShieldCheck,
  Sun,
  Wrench,
  Zap,
} from "lucide-react";
import FloatingCTA from "./components/FloatingCTA";
import IntroAnimationClient from "./components/IntroAnimationClient";
import Navbar from "./components/Navbar";
import SolarEstimator from "./components/SolarEstimator";

const systems = [
  {
    icon: Grid2X2,
    number: "01",
    title: "Grid-tied solar",
    description: "Lower daytime electricity costs with a system designed to work alongside your utility connection.",
    image: "/path-grid-tied.jpg",
    alt: "Grid-tied rooftop solar panel installation",
    bestFor: "Homes, offices, farms, and facilities with reliable grid power",
  },
  {
    icon: BatteryCharging,
    number: "02",
    title: "Hybrid solar + battery",
    description: "Use solar through the day and store energy for evening loads or interruptions.",
    image: "/path-hybrid.jpg",
    alt: "Hybrid solar and battery installation",
    bestFor: "Properties that need savings with dependable backup power",
  },
  {
    icon: Sun,
    number: "03",
    title: "Off-grid systems",
    description: "Independent solar generation and battery storage for sites beyond dependable utility service.",
    image: "/path-offgrid.jpg",
    alt: "Off-grid solar panel system in a rural setting",
    bestFor: "Remote homes, schools, farms, and operational sites",
  },
  {
    icon: PlugZap,
    number: "04",
    title: "Electrical + civil works",
    description: "Coordinated cabling, mounting, site preparation, and related works for a complete installation.",
    image: "/path-electrical-civil.jpg",
    alt: "Electrical and civil works for a solar installation",
    bestFor: "Projects that need one accountable technical team",
  },
];

const featuredProjects = [
  {
    name: "RJL Ricemill",
    type: "Grid-tied",
    capacity: "160 kW",
    image: "/path-grid-tied.jpg",
    alt: "Large commercial grid-tied solar installation",
    icon: Factory,
  },
  {
    name: "Malita Elementary School",
    type: "Off-grid + battery",
    capacity: "50 kW / 107 kWh",
    image: "/path-offgrid.jpg",
    alt: "Off-grid solar installation with battery storage",
    icon: GraduationCap,
  },
  {
    name: "Lt. Col. Solamo Residence",
    type: "Hybrid + battery",
    capacity: "24 kW / 50 kWh",
    image: "/path-hybrid.jpg",
    alt: "Residential hybrid solar and battery installation",
    icon: Home,
  },
];

const otherProjects = [
  ["Viacrusis Hospital", "Grid-tied", "100 kW"],
  ["Ultralab", "Hybrid", "32 kW"],
  ["Camp Sabros", "Hybrid + battery", "32 kW / 32 kWh"],
  ["Kapalong Banana Plantation", "Grid-tied", "30 kW"],
  ["Encar Resort", "Hybrid + battery", "18 kW / 36 kWh"],
  ["Ramyan's Restaurant and Cafe", "Hybrid", "16 kW"],
  ["Leon Evelyn Residence", "Hybrid", "12 kW"],
];

const credentials = [
  {
    icon: Building2,
    title: "DTI registered",
    detail: "Business Name No. 5981531",
    validity: "Valid through 24 Mar 2029",
  },
  {
    icon: ClipboardCheck,
    title: "Digos business permit",
    detail: "No. 2026-1102403000-3925",
    validity: "Valid through 31 Dec 2026",
  },
  {
    icon: Wrench,
    title: "TESDA NC II",
    detail: "Electrical Installation and Maintenance",
    validity: "Valid through 2 Sep 2029",
  },
  {
    icon: HardHat,
    title: "IOSH Managing Safely",
    detail: "TWI Middle East, Cert No. 9826",
    validity: "Issued 18 Feb 2011",
  },
];

const process = [
  ["01", "Site conversation", "We start with your goals, current power use, and the type of property you want to power."],
  ["02", "Technical assessment", "The team reviews the site, available roof or ground area, electrical setup, and load requirements."],
  ["03", "System proposal", "You receive a recommended system direction based on the assessment and your priorities."],
  ["04", "Installation + testing", "FRO Solar installs, tests, and commissions the system before practical handover."],
];

export default function HomePage() {
  return (
    <>
      <IntroAnimationClient />
      <Navbar />
      <FloatingCTA />

      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <Image
            className="hero__image"
            src="/hero-solar.jpg"
            alt="FRO Solar technicians installing panels on a roof"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero__shade" aria-hidden="true" />
          <div className="shell hero__inner">
            <div className="hero__content">
              <p className="eyebrow eyebrow--light"><MapPin size={15} aria-hidden="true" /> Digos City / Davao del Sur</p>
              <h1 id="hero-title">Solar power for homes and businesses.</h1>
              <p className="hero__lead">
                Designed, installed, and commissioned by a local team backed by 28 years of power industry experience.
              </p>
              <div className="hero__actions">
                <a className="button button--primary button--large" href="#contact">
                  Request a site assessment <ArrowRight size={18} aria-hidden="true" />
                </a>
                <a className="button button--outline-light button--large" href="#projects">View installations</a>
              </div>
              <ul className="hero__assurances" aria-label="Company assurances">
                <li><Check size={16} aria-hidden="true" /> DTI registered</li>
                <li><Check size={16} aria-hidden="true" /> TESDA NC II</li>
                <li><Check size={16} aria-hidden="true" /> Residential to industrial</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="FRO Solar experience">
          <div className="shell proof-strip__grid">
            <div><strong>28</strong><span>years in the power industry</span></div>
            <div><strong>175 MW</strong><span>largest plant commissioned</span></div>
            <div><strong>10</strong><span>documented solar projects</span></div>
            <div><strong>7</strong><span>countries of field experience</span></div>
          </div>
        </section>

        <section className="section systems" id="systems" aria-labelledby="systems-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow"><Zap size={15} aria-hidden="true" /> What we install</p>
                <h2 id="systems-title">A system that fits the way you use power.</h2>
              </div>
              <p>
                Start with the outcome you need. We will help determine the right combination of solar, storage, and electrical work after a proper site assessment.
              </p>
            </div>

            <div className="systems-grid">
              {systems.map((system) => {
                const Icon = system.icon;
                return (
                  <article className="system-card" key={system.title}>
                    <div className="system-card__media">
                      <Image src={system.image} alt={system.alt} fill sizes="(max-width: 760px) 100vw, 50vw" />
                      <span className="system-card__number">{system.number}</span>
                    </div>
                    <div className="system-card__body">
                      <div className="system-card__title"><Icon size={21} aria-hidden="true" /><h3>{system.title}</h3></div>
                      <p>{system.description}</p>
                      <div className="system-card__fit"><strong>Best for</strong><span>{system.bestFor}</span></div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section projects" id="projects" aria-labelledby="projects-title">
          <div className="shell">
            <div className="section-heading section-heading--dark">
              <p className="eyebrow eyebrow--light"><Gauge size={15} aria-hidden="true" /> Selected installations</p>
              <h2 id="projects-title">Proven across demanding real-world sites.</h2>
              <p>From a 160 kW ricemill system to remote school battery storage, each project begins with the load and site conditions.</p>
            </div>

            <div className="project-feature-grid">
              {featuredProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <article className="project-feature" key={project.name}>
                    <div className="project-feature__media">
                      <Image src={project.image} alt={project.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
                      <span>{project.capacity}</span>
                    </div>
                    <div className="project-feature__body">
                      <Icon size={20} aria-hidden="true" />
                      <div><h3>{project.name}</h3><p>{project.type}</p></div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="project-list" aria-label="More completed installations">
              {otherProjects.map(([name, type, capacity]) => (
                <div className="project-row" key={name}>
                  <span className="project-row__name">{name}</span>
                  <span>{type}</span>
                  <strong>{capacity}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="shell about__grid">
            <div className="about__media">
              <Image
                src="/solar-engineer.jpg"
                alt="FRO Solar engineer working on a rooftop installation"
                fill
                sizes="(max-width: 860px) 100vw, 48vw"
              />
              <div className="about__caption"><strong>17 years</strong><span>Middle East field experience</span></div>
            </div>
            <div className="about__content">
              <p className="eyebrow"><ShieldCheck size={15} aria-hidden="true" /> Built on field experience</p>
              <h2 id="about-title">Power-plant discipline, brought home to Digos.</h2>
              <p className="about__lead">
                FRO Solar brings 28 years of industry expertise to solar and power-generation projects in the Philippines.
              </p>
              <p>
                That experience includes project management, installation, testing, commissioning, operation, and maintenance across Iraq, Kurdistan, Afghanistan, Lebanon, Saudi Arabia, Israel, and Jordan.
              </p>
              <div className="about__points">
                <div><Check aria-hidden="true" /><span>Hands-on commissioning experience up to 175 MW</span></div>
                <div><Check aria-hidden="true" /><span>Gas, diesel, HFO, and solar technology background</span></div>
                <div><Check aria-hidden="true" /><span>Residential, commercial, and industrial capability</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section process" id="process" aria-labelledby="process-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow"><ClipboardCheck size={15} aria-hidden="true" /> From assessment to handover</p>
                <h2 id="process-title">A practical path to the right system.</h2>
              </div>
              <p>Solar should start with your real loads and site conditions, not a package pulled from a price list.</p>
            </div>
            <ol className="process-grid">
              {process.map(([number, title, description]) => (
                <li key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </li>
              ))}
            </ol>
            <div className="process-cta">
              <p><strong>Not sure where to begin?</strong> The estimator gives you a useful starting point before a site assessment.</p>
              <a className="text-link" href="#estimator">Estimate your system <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section className="estimator-section" id="estimator" aria-label="Solar system estimator">
          <SolarEstimator />
        </section>

        <section className="section credentials" id="credentials" aria-labelledby="credentials-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow"><ShieldCheck size={15} aria-hidden="true" /> Verified credentials</p>
                <h2 id="credentials-title">Qualified, registered, and accountable.</h2>
              </div>
              <p>Credentials are listed with their exact registration details and current validity dates.</p>
            </div>
            <div className="credential-grid">
              {credentials.map((credential) => {
                const Icon = credential.icon;
                return (
                  <article key={credential.title}>
                    <Icon size={23} aria-hidden="true" />
                    <h3>{credential.title}</h3>
                    <p>{credential.detail}</p>
                    <span>{credential.validity}</span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="shell contact__grid">
            <div className="contact__copy">
              <p className="eyebrow eyebrow--light"><Sun size={15} aria-hidden="true" /> Start with a site conversation</p>
              <h2 id="contact-title">Tell us what you want your solar system to do.</h2>
              <p>Share your location, typical electric bill, and whether backup power matters to you. We will help identify the next practical step.</p>
              <div className="contact__actions">
                <a className="button button--primary button--large" href="tel:+639063665473"><Phone size={18} aria-hidden="true" /> Call 0906 366 5473</a>
                <a className="button button--outline-light button--large" href="mailto:frosolar.energysolutions@gmail.com"><Mail size={18} aria-hidden="true" /> Send an email</a>
              </div>
            </div>
            <address className="contact__details">
              <div><Phone size={19} aria-hidden="true" /><span><strong>Phone</strong><a href="tel:+63822720011">082 272 0011</a><a href="tel:+639063665473">0906 366 5473</a></span></div>
              <div><Mail size={19} aria-hidden="true" /><span><strong>Email</strong><a href="mailto:frosolar.energysolutions@gmail.com">frosolar.energysolutions@gmail.com</a></span></div>
              <div><MapPin size={19} aria-hidden="true" /><span><strong>Visit</strong>Sta. Ana Road, Tiguman<br />Digos City, Davao del Sur</span></div>
            </address>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="shell footer__inner">
          <a className="brand brand--footer" href="#home" aria-label="Back to top">
            <span className="brand__mark"><Image src="/fro-logo-transparent.png" alt="" width={48} height={48} sizes="48px" /></span>
            <span className="brand__copy"><strong>FRO Solar</strong><span>Power Installation Services</span></span>
          </a>
          <p>Empowering your home with Sun&apos;s brilliance.</p>
          <p>&copy; {new Date().getFullYear()} FRO Solar. Digos City, Philippines.</p>
        </div>
      </footer>
    </>
  );
}
