import Image from "next/image";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Check,
  ClipboardCheck,
  Grid2X2,
  HardHat,
  Mail,
  MapPin,
  Phone,
  PlugZap,
  Sun,
  Wrench,
  Plus,
  ChevronDown,
} from "lucide-react";
import FloatingCTA from "./components/FloatingCTA";
import Navbar from "./components/Navbar";
import SolarEstimator from "./components/SolarEstimator";
import PhotoGallery from "./components/PhotoGallery";
import { featuredAlbums, projectAlbums, fieldPhotos } from "./data/project-photos";
import SpotlightCard from "./components/react-bits/SpotlightCard";
import CountUp from "./components/react-bits/CountUp";
import { EnquiryProvider, SystemEnquiryLink, EnquiryContactActions } from "./components/SystemEnquiry";

const systems = [
  {
    icon: Grid2X2,
    title: "Grid-tied solar",
    description: "Lower daytime electricity costs with a system designed to work alongside your utility connection.",
    image: "/projects/4k/ricemill-rooftop.webp",
    alt: "Grid-tied rooftop solar panel installation",
    bestFor: "Homes, offices, farms, and facilities with reliable grid power",
  },
  {
    icon: BatteryCharging,
    title: "Hybrid solar + battery",
    description: "Use solar through the day and store energy for evening loads or interruptions.",
    image: "/projects/4k/ultralab-storage.webp",
    alt: "Hybrid solar and battery installation",
    bestFor: "Properties that need savings with dependable backup power",
  },
  {
    icon: Sun,
    title: "Off-grid systems",
    description: "Independent solar generation and battery storage for sites beyond dependable utility service.",
    image: "/projects/4k/field-arrays.webp",
    alt: "Ground-mounted solar arrays photographed during project fieldwork",
    bestFor: "Remote homes, schools, farms, and operational sites",
  },
  {
    icon: PlugZap,
    title: "Electrical + civil works",
    description: "Coordinated cabling, mounting, site preparation, and related works for a complete installation.",
    image: "/projects/4k/field-engineering.webp",
    alt: "Engineers inspecting solar mounting connections on site",
    bestFor: "Projects that need one accountable technical team",
  },
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
    title: "Business permit",
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
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <FloatingCTA />

      <EnquiryProvider>
      <main id="main-content" tabIndex={-1}>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <Image
            quality={90}
            className="hero__image"
            src="/projects/4k/ultralab-installation.webp"
            alt="Technicians installing the Ultralab rooftop solar array"
            fill
            preload
            sizes="100vw"
          />
          <div className="hero__shade" aria-hidden="true" />
          <div className="shell hero__inner">
            <div className="hero__content">
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
              <p className="hero__location"><MapPin size={15} aria-hidden="true" /> Philippines</p>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="FRO Solar experience">
          <div className="shell proof-strip__grid">
            <div><strong><CountUp to={28} /></strong><span>years in the power industry</span></div>
            <div><strong><CountUp to={175} suffix=" MW" /></strong><span>largest plant commissioned</span></div>
            <div><strong><CountUp to={10} /></strong><span>documented solar projects</span></div>
            <div><strong><CountUp to={7} /></strong><span>countries of field experience</span></div>
          </div>
        </section>

        <section className="section systems" id="systems" aria-labelledby="systems-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
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
                  <SpotlightCard className="system-card" key={system.title}>
                    <div className="system-card__media">
                      <Image quality={90} src={system.image} alt={system.alt} fill loading="eager" sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw" />
                    </div>
                    <div className="system-card__body">
                      <div className="system-card__title"><Icon size={21} aria-hidden="true" /><h3>{system.title}</h3></div>
                      <p>{system.description}</p>
                      <div className="system-card__fit"><strong>Best for</strong><span>{system.bestFor}</span></div>
                      <SystemEnquiryLink system={system.title} />
                    </div>
                  </SpotlightCard>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section projects" id="projects" aria-labelledby="projects-title">
          <div className="shell">
            <div className="section-heading section-heading--dark">
              <h2 id="projects-title">Proven across demanding real-world sites.</h2>
              <p>See the rooftops, equipment, and installation work behind our projects. Open a gallery for a closer look.</p>
            </div>

            <div className="project-feature-grid">
              {featuredAlbums.map((project) => (
                <article className="project-feature" key={project.name}>
                  <PhotoGallery photos={project.photos} title={project.name} cover />
                  <div className="project-feature__body">
                    <div><span className="project-spec">{project.capacity} / {project.type}</span><h3>{project.name}</h3><p>{project.description}</p></div>
                  </div>
                </article>
              ))}
            </div>
            <div className="project-archive">
              <div className="project-archive__heading"><h3>More from our project albums</h3><p>Expand an installation to explore its photographs.</p></div>
              {projectAlbums.map((project) => (
                <details className="project-album" name="project-albums" key={project.name}>
                  <summary>
                    <span className="project-album__thumb"><Image quality={90} src={project.photos[0].src} alt="" fill sizes="76px" /></span>
                    <span className="project-album__name"><strong>{project.name}</strong><span>{project.label}</span></span>
                    <span className="project-album__count">{project.photos.length} {project.photos.length === 1 ? "photo" : "photos"}</span><span className="disclosure-plus"><Plus size={20} aria-hidden="true" /></span>
                  </summary>
                  <div className="project-album__content"><PhotoGallery photos={project.photos} title={project.name} /></div>
                </details>
              ))}
              <details className="project-album project-album--records">
                <summary><span className="project-album__name"><strong>Further documented installations</strong><span>Project records</span></span><span className="disclosure-plus"><Plus size={20} aria-hidden="true" /></span></summary>
                <div className="project-album__content project-records"><p>Lt. Col. Solamo Residence <strong>24 kW / 50 kWh · Hybrid + battery</strong></p><p>Kapalong Banana Plantation <strong>30 kW · Grid-tied</strong></p><p>Encar Resort <strong>18 kW / 36 kWh · Hybrid + battery</strong></p><p>Leon Evelyn Residence <strong>12 kW · Hybrid</strong></p></div>
              </details>
            </div>
          </div>
        </section>

        <section className="section about" id="about" aria-labelledby="about-title">
          <div className="shell about__grid">
            <div className="about__media">
              <Image
                quality={90}
                src="/projects/4k/field-team.webp"
                alt="Solar fieldwork team wearing protective equipment on site"
                fill
                sizes="(max-width: 860px) 100vw, 48vw"
              />
              <div className="about__caption"><strong>On site. Hands on.</strong><span>The people behind the work</span></div>
            </div>
            <div className="about__content">
              <h2 id="about-title">Power-plant discipline, brought home to the Philippines.</h2>
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

        <section className="section fieldwork" id="fieldwork" aria-labelledby="fieldwork-title">
          <div className="shell">
            <div className="section-heading section-heading--split"><div><h2 id="fieldwork-title">Good systems start with careful fieldwork.</h2></div><p>A closer look at the people, mounting details, and on-site work in our project photo archive.</p></div>
            <PhotoGallery photos={fieldPhotos} title="Solar fieldwork" />
          </div>
        </section>

        <section className="section process" id="process" aria-labelledby="process-title">
          <div className="shell">
            <div className="section-heading section-heading--split">
              <div>
                <h2 id="process-title">A practical path to the right system.</h2>
              </div>
              <p>Solar should start with your real loads and site conditions, not a package pulled from a price list.</p>
            </div>
            <ol className="process-grid">
              {process.map(([number, title, description], index) => (
                <li key={number}>
                  <div className="process-photo"><Image quality={90} src={fieldPhotos[[4, 1, 3, 5][index]].src} alt={fieldPhotos[[4, 1, 3, 5][index]].alt} fill sizes="(max-width: 760px) 100vw, 25vw" /></div>
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
                    <span>{credential.validity}</span>
                    <details className="credential-details"><summary>View registration details <ChevronDown size={16} aria-hidden="true" /></summary><p>{credential.detail}</p></details>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="shell contact__grid">
            <div className="contact__copy">
              <h2 id="contact-title">Tell us what you want your solar system to do.</h2>
              <p>Share your location, typical electric bill, and whether backup power matters to you. We will help identify the next practical step.</p>
              <EnquiryContactActions />
            </div>
            <address className="contact__details">
              <div><Phone size={19} aria-hidden="true" /><span><strong>Phone</strong><a href="tel:+63822720011">082 272 0011</a><a href="tel:+639063665473">0906 366 5473</a></span></div>
              <div><Mail size={19} aria-hidden="true" /><span><strong>Email</strong><a href="mailto:frosolar.energysolutions@gmail.com">frosolar.energysolutions@gmail.com</a></span></div>
              <div><MapPin size={19} aria-hidden="true" /><span><strong>Location</strong>Philippines</span></div>
            </address>
          </div>
        </section>
      </main>
      </EnquiryProvider>

      <footer className="footer">
        <div className="shell footer__inner">
          <a className="brand brand--footer" href="#home" aria-label="Back to top">
            <span className="brand__mark"><Image quality={90} src="/fro-logo-transparent.png" alt="" width={48} height={48} sizes="48px" /></span>
            <span className="brand__copy"><strong>FRO Solar</strong><span>Power Installation Services</span></span>
          </a>
          <p>Empowering your home with Sun&apos;s brilliance.</p>
          <p>&copy; {new Date().getFullYear()} FRO Solar. Philippines.</p>
        </div>
      </footer>
    </>
  );
}
