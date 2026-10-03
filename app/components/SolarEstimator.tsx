"use client";

import { useState, useCallback, useMemo, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface Appliance {
  id: string;
  label: string;
  watts: number;
  icon: string;
  category: string;
}

interface ApplianceCount {
  [id: string]: number;
}

type UsageProfile = "day" | "balance" | "night";
type Step = 1 | 2 | 3;

/* ─── Data ───────────────────────────────────────────────────────────────── */
const APPLIANCES: Appliance[] = [
  // Cooling
  { id: "ac1hp",   label: "Aircon 1HP",           watts: 750,   icon: "❄", category: "Cooling" },
  { id: "ac15hp",  label: "Aircon 1.5HP",         watts: 1100,  icon: "❄", category: "Cooling" },
  { id: "ac2hp",   label: "Aircon 2HP",            watts: 1500,  icon: "❄", category: "Cooling" },
  { id: "ac3hp",   label: "Aircon 3HP",            watts: 2200,  icon: "❄", category: "Cooling" },
  { id: "ac4hp",   label: "Aircon 4HP",            watts: 3000,  icon: "❄", category: "Cooling" },
  { id: "fan",     label: "Electric Fan",          watts: 60,    icon: "🌀", category: "Cooling" },
  // Kitchen
  { id: "ref",     label: "Refrigerator",          watts: 150,   icon: "🧊", category: "Kitchen" },
  { id: "chest",   label: "Chest Freezer",         watts: 250,   icon: "🧊", category: "Kitchen" },
  { id: "stove",   label: "Induction Stove",       watts: 2000,  icon: "🍳", category: "Kitchen" },
  { id: "rice",    label: "Rice Cooker",           watts: 700,   icon: "🍚", category: "Kitchen" },
  { id: "micro",   label: "Microwave / Oven",      watts: 1200,  icon: "📡", category: "Kitchen" },
  { id: "fryer",   label: "Air Fryer",             watts: 1500,  icon: "🍟", category: "Kitchen" },
  // Water & Laundry
  { id: "pump",    label: "Water Pump (1HP)",      watts: 750,   icon: "💧", category: "Water & Laundry" },
  { id: "heater",  label: "Water Heater",          watts: 3500,  icon: "🚿", category: "Water & Laundry" },
  { id: "wash",    label: "Washing Machine",       watts: 500,   icon: "👕", category: "Water & Laundry" },
  // TV & Work
  { id: "tv",      label: "TV (LED)",              watts: 100,   icon: "📺", category: "TV & Work" },
  { id: "pc",      label: "Computer / Laptop",     watts: 200,   icon: "💻", category: "TV & Work" },
  { id: "router",  label: "Router / Network",      watts: 30,    icon: "📶", category: "TV & Work" },
  { id: "iron",    label: "Electric Iron",         watts: 1000,  icon: "👔", category: "TV & Work" },
  // Lighting
  { id: "led",     label: "LED Bulb",              watts: 9,     icon: "💡", category: "Lighting" },
  { id: "cfl",     label: "CFL / Fluorescent",     watts: 15,    icon: "💡", category: "Lighting" },
  { id: "incan",   label: "Incandescent Bulb",     watts: 45,    icon: "💡", category: "Lighting" },
];

const CATEGORIES = ["Cooling", "Kitchen", "Water & Laundry", "TV & Work", "Lighting"];

const USAGE_PROFILES: {
  key: UsageProfile;
  label: string;
  badge?: string;
  desc: string;
  dayHours: number;
  nightHours: number;
}[] = [
  {
    key: "day",
    label: "Day User",
    desc: "Home during the day — WFH, homemakers, kids. Minimal use at night.",
    dayHours: 8,
    nightHours: 2,
  },
  {
    key: "balance",
    label: "Balanced User",
    badge: "Most Common",
    desc: "Aircon and appliances running most of the day, some use at night too.",
    dayHours: 10,
    nightHours: 4,
  },
  {
    key: "night",
    label: "Night User",
    desc: "Away during the day, heavy load in the evenings when you come home.",
    dayHours: 2,
    nightHours: 8,
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function calcWatts(counts: ApplianceCount, customAppliances: Appliance[]): number {
  const allAppliances = [...APPLIANCES, ...customAppliances];
  return allAppliances.reduce((sum, a) => sum + (counts[a.id] ?? 0) * a.watts, 0);
}

function formatKW(w: number) {
  if (w >= 1000) return `${(w / 1000).toFixed(1)} kW`;
  return `${w} W`;
}

/* ─── Sub-components ────────────────────────────────────────────────────── */
function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <div className="est-steps" role="progressbar" aria-valuenow={current} aria-valuemax={total} aria-label="Estimator progress">
      {Array.from({ length: total }, (_, i) => {
        const n = (i + 1) as Step;
        const done = n < current;
        const active = n === current;
        return (
          <div key={n} className={`est-step ${done ? "est-step--done" : ""} ${active ? "est-step--active" : ""}`}>
            <span className="est-step__dot">
              {done ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : n}
            </span>
            <span className="est-step__label">
              {n === 1 ? "Appliances" : n === 2 ? "Usage" : "Your Estimate"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Counter({
  value,
  onDecrement,
  onIncrement,
  applianceId,
}: {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  applianceId: string;
}) {
  return (
    <div className="est-counter" role="group" aria-label={`Quantity for ${applianceId}`}>
      <button
        className="est-counter__btn"
        onClick={onDecrement}
        disabled={value === 0}
        aria-label="Decrease quantity"
        id={`dec-${applianceId}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M3 7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
      <span className="est-counter__val" aria-live="polite">{value}</span>
      <button
        className="est-counter__btn est-counter__btn--add"
        onClick={onIncrement}
        aria-label="Increase quantity"
        id={`inc-${applianceId}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

function ApplianceCard({
  appliance,
  count,
  onDecrement,
  onIncrement,
}: {
  appliance: Appliance;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className={`est-card ${count > 0 ? "est-card--active" : ""}`} role="listitem">
      <span className="est-card__icon" aria-hidden="true">{appliance.icon}</span>
      <div className="est-card__info">
        <p className="est-card__label">{appliance.label}</p>
        <p className="est-card__watts">{appliance.watts.toLocaleString()}W each</p>
      </div>
      <Counter
        value={count}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        applianceId={appliance.id}
      />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function SolarEstimator() {
  const [step, setStep] = useState<Step>(1);
  const [counts, setCounts] = useState<ApplianceCount>({});
  const [profile, setProfile] = useState<UsageProfile>("balance");
  const [search, setSearch] = useState("");
  const [customAppliances, setCustomAppliances] = useState<Appliance[]>([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [customWatts, setCustomWatts] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const setCount = useCallback((id: string, delta: 1 | -1) => {
    setCounts((prev) => {
      const cur = prev[id] ?? 0;
      const next = Math.max(0, cur + delta);
      return { ...prev, [id]: next };
    });
  }, []);

  const totalWatts = useMemo(() => calcWatts(counts, customAppliances), [counts, customAppliances]);

  const selectedCount = useMemo(
    () => [...APPLIANCES, ...customAppliances].filter((a) => (counts[a.id] ?? 0) > 0).length,
    [counts, customAppliances]
  );

  const allAppliances = useMemo(() => [...APPLIANCES, ...customAppliances], [customAppliances]);

  const filtered = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return allAppliances.filter((a) => a.label.toLowerCase().includes(q));
  }, [search, allAppliances]);

  const profileData = USAGE_PROFILES.find((p) => p.key === profile)!;
  const dailyKWh = (totalWatts / 1000) * (profileData.dayHours + profileData.nightHours);
  const monthlyKWh = dailyKWh * 30;
  const solarKWp = dailyKWh / 4.5;
  const nightLoad = (totalWatts / 1000) * profileData.nightHours;
  const batteryKWh = nightLoad * 1.25;

  function addCustom() {
    const w = parseInt(customWatts, 10);
    if (!customLabel.trim() || !w || w <= 0) return;
    const id = `custom_${Date.now()}`;
    setCustomAppliances((prev) => [
      ...prev,
      { id, label: customLabel.trim(), watts: w, icon: "⚡", category: "Custom" },
    ]);
    setCustomLabel("");
    setCustomWatts("");
    setShowCustomForm(false);
  }

  return (
    <>
      <style>{STYLES}</style>
      <section className="est-root" id="solar-estimator" aria-label="Solar system estimator">
        {/* Header */}
        <div className="est-header">
          <div className="est-header__badge">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="4" fill="#F7941D"/>
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M11.36 3.22l-1.42 1.42M3.22 11.36l1.42 1.42" stroke="#F7941D" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Free Estimator
          </div>
          <h2 className="est-header__title">Solar System Estimator</h2>
          <p className="est-header__sub">
            Find out what size solar system your home or business needs — in under 2 minutes.
          </p>
        </div>

        <div className="est-body">
          <StepIndicator current={step} total={3} />

          {/* ── Step 1: Appliances ── */}
          {step === 1 && (
            <div className="est-panel" id="step-appliances">
              <div className="est-panel__head">
                <div className="est-panel__icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M3 3h14v10H3zM7 17h6M10 13v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="est-panel__title">Select your appliances</h3>
                  <p className="est-panel__desc">Choose everything that runs in your home or business.</p>
                </div>
              </div>

              {/* Search */}
              <div className="est-search">
                <svg className="est-search__icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <input
                  ref={searchRef}
                  className="est-search__input"
                  type="search"
                  placeholder="Search appliances (e.g. aircon, ref, pump…)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search appliances"
                  id="est-appliance-search"
                />
                {search && (
                  <button className="est-search__clear" onClick={() => setSearch("")} aria-label="Clear search">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>

              {/* Appliance list */}
              <div className="est-appliances">
                {filtered ? (
                  filtered.length === 0 ? (
                    <p className="est-empty">No appliances found. Try a different search term.</p>
                  ) : (
                    <div className="est-category">
                      <p className="est-category__label">Search Results</p>
                      <div className="est-grid" role="list">
                        {filtered.map((a) => (
                          <ApplianceCard
                            key={a.id}
                            appliance={a}
                            count={counts[a.id] ?? 0}
                            onDecrement={() => setCount(a.id, -1)}
                            onIncrement={() => setCount(a.id, 1)}
                          />
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  CATEGORIES.map((cat) => {
                    const items = allAppliances.filter((a) => a.category === cat);
                    return (
                      <div key={cat} className="est-category">
                        <p className="est-category__label">{cat}</p>
                        <div className="est-grid" role="list">
                          {items.map((a) => (
                            <ApplianceCard
                              key={a.id}
                              appliance={a}
                              count={counts[a.id] ?? 0}
                              onDecrement={() => setCount(a.id, -1)}
                              onIncrement={() => setCount(a.id, 1)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Custom appliance */}
              {!showCustomForm ? (
                <button
                  className="est-add-custom"
                  onClick={() => setShowCustomForm(true)}
                  id="est-add-custom-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Add a custom appliance
                </button>
              ) : (
                <div className="est-custom-form" role="form" aria-label="Add custom appliance">
                  <p className="est-custom-form__title">Custom Appliance</p>
                  <div className="est-custom-form__row">
                    <div className="est-custom-form__field">
                      <label htmlFor="custom-label" className="est-custom-form__label">Name</label>
                      <input
                        id="custom-label"
                        className="est-custom-form__input"
                        type="text"
                        placeholder="e.g. Pool Pump"
                        value={customLabel}
                        onChange={(e) => setCustomLabel(e.target.value)}
                      />
                    </div>
                    <div className="est-custom-form__field est-custom-form__field--sm">
                      <label htmlFor="custom-watts" className="est-custom-form__label">Watts</label>
                      <input
                        id="custom-watts"
                        className="est-custom-form__input"
                        type="number"
                        min="1"
                        placeholder="e.g. 800"
                        value={customWatts}
                        onChange={(e) => setCustomWatts(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="est-custom-form__actions">
                    <button className="est-btn est-btn--ghost" onClick={() => { setShowCustomForm(false); setCustomLabel(""); setCustomWatts(""); }}>
                      Cancel
                    </button>
                    <button className="est-btn est-btn--primary" onClick={addCustom} id="est-add-custom-confirm">
                      Add Appliance
                    </button>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="est-footer">
                <div className="est-footer__summary">
                  <span className="est-footer__count">{selectedCount} appliance{selectedCount !== 1 ? "s" : ""} selected</span>
                  <span className="est-footer__watts">{formatKW(totalWatts)} total load</span>
                </div>
                <button
                  className="est-btn est-btn--primary est-btn--lg"
                  onClick={() => setStep(2)}
                  disabled={totalWatts === 0}
                  id="est-step1-next"
                  aria-disabled={totalWatts === 0}
                >
                  Next: Usage Pattern
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2: Usage Profile ── */}
          {step === 2 && (
            <div className="est-panel" id="step-usage">
              <div className="est-panel__head">
                <div className="est-panel__icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.6"/>
                    <path d="M10 4v6l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="est-panel__title">How do you use electricity?</h3>
                  <p className="est-panel__desc">This tells us how much battery storage you might need.</p>
                </div>
              </div>

              <div className="est-profiles" role="radiogroup" aria-label="Usage profile">
                {USAGE_PROFILES.map((p) => (
                  <label
                    key={p.key}
                    className={`est-profile ${profile === p.key ? "est-profile--active" : ""}`}
                    id={`est-profile-${p.key}`}
                  >
                    <input
                      type="radio"
                      name="usage-profile"
                      value={p.key}
                      checked={profile === p.key}
                      onChange={() => setProfile(p.key)}
                      className="est-profile__radio"
                      aria-label={p.label}
                    />
                    <div className="est-profile__header">
                      <span className="est-profile__name">{p.label}</span>
                      {p.badge && <span className="est-profile__badge">{p.badge}</span>}
                    </div>
                    <p className="est-profile__desc">{p.desc}</p>
                    <div className="est-profile__hours">
                      <span>☀ {p.dayHours}h daytime</span>
                      <span>🌙 {p.nightHours}h nighttime</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="est-footer">
                <button className="est-btn est-btn--ghost" onClick={() => setStep(1)} id="est-step2-back">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back
                </button>
                <button className="est-btn est-btn--primary est-btn--lg" onClick={() => setStep(3)} id="est-step2-next">
                  See My Estimate
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── Step 3: Results ── */}
          {step === 3 && (
            <div className="est-panel" id="step-results">
              <div className="est-panel__head">
                <div className="est-panel__icon est-panel__icon--green">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="est-panel__title">Your Estimate</h3>
                  <p className="est-panel__desc">Based on {selectedCount} appliance{selectedCount !== 1 ? "s" : ""} · {profileData.label}</p>
                </div>
              </div>

              {/* Key metrics */}
              <div className="est-results">
                <div className="est-result-card est-result-card--highlight">
                  <p className="est-result-card__label">Recommended Solar Size</p>
                  <p className="est-result-card__value">{solarKWp.toFixed(1)} <span>kWp</span></p>
                  <p className="est-result-card__note">Peak kilowatts of panels</p>
                </div>
                <div className="est-result-card">
                  <p className="est-result-card__label">Daily Energy Use</p>
                  <p className="est-result-card__value">{dailyKWh.toFixed(1)} <span>kWh/day</span></p>
                  <p className="est-result-card__note">≈ {monthlyKWh.toFixed(0)} kWh/month</p>
                </div>
                <div className="est-result-card">
                  <p className="est-result-card__label">Estimated Battery</p>
                  <p className="est-result-card__value">{batteryKWh.toFixed(1)} <span>kWh</span></p>
                  <p className="est-result-card__note">For {profileData.nightHours}h night coverage</p>
                </div>
                <div className="est-result-card">
                  <p className="est-result-card__label">Total Appliance Load</p>
                  <p className="est-result-card__value">{(totalWatts / 1000).toFixed(2)} <span>kW</span></p>
                  <p className="est-result-card__note">{selectedCount} appliance{selectedCount !== 1 ? "s" : ""} combined</p>
                </div>
              </div>

              {/* Appliance breakdown */}
              <div className="est-breakdown">
                <p className="est-breakdown__title">Appliance Breakdown</p>
                <div className="est-breakdown__list" role="list">
                  {allAppliances
                    .filter((a) => (counts[a.id] ?? 0) > 0)
                    .map((a) => {
                      const c = counts[a.id];
                      const w = c * a.watts;
                      const pct = totalWatts > 0 ? (w / totalWatts) * 100 : 0;
                      return (
                        <div key={a.id} className="est-breakdown__item" role="listitem">
                          <span className="est-breakdown__icon" aria-hidden="true">{a.icon}</span>
                          <div className="est-breakdown__info">
                            <div className="est-breakdown__row">
                              <span className="est-breakdown__name">{a.label} ×{c}</span>
                              <span className="est-breakdown__load">{formatKW(w)}</span>
                            </div>
                            <div className="est-breakdown__bar">
                              <div
                                className="est-breakdown__fill"
                                style={{ width: `${pct}%` }}
                                role="img"
                                aria-label={`${pct.toFixed(0)}% of total load`}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="est-disclaimer" role="note">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <p>
                  These figures are estimates based on standard values. A site survey by our team will give you a precise system design and quotation.
                </p>
              </div>

              {/* CTA */}
              <div className="est-cta">
                <div className="est-cta__content">
                  <p className="est-cta__title">Ready to go solar?</p>
                  <p className="est-cta__sub">Get a free, no-obligation site assessment from FRO Solar.</p>
                </div>
                <div className="est-cta__actions">
                  <a
                    href="https://m.me/frosolarenergysolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="est-btn est-btn--primary est-btn--lg"
                    id="est-cta-messenger"
                  >
                    Message Us on Messenger
                  </a>
                  <a
                    href="tel:+639175656071"
                    className="est-btn est-btn--ghost"
                    id="est-cta-call"
                  >
                    Call Us
                  </a>
                </div>
              </div>

              <div className="est-footer" style={{ justifyContent: "flex-start" }}>
                <button className="est-btn est-btn--ghost" onClick={() => { setStep(1); setCounts({}); setProfile("balance"); }} id="est-restart">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8a6 6 0 1 0 1.2-3.6M2 4v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* ─── Styles (scoped via class prefix) ───────────────────────────────────── */
const STYLES = `
.est-root {
  font-family: var(--font-body, system-ui, sans-serif);
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px 80px;
}
.est-header {
  text-align: center;
  padding: 64px 0 40px;
}
.est-header__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #fff7ed;
  color: #F7941D;
  border: 1px solid #ffe4b5;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .04em;
  text-transform: uppercase;
  padding: 5px 14px;
  margin-bottom: 20px;
}
.est-header__title {
  font-size: clamp(26px, 5vw, 38px);
  font-weight: 700;
  color: #0E4B48;
  line-height: 1.2;
  margin-bottom: 12px;
}
.est-header__sub {
  font-size: 16px;
  color: #4A5E4A;
  max-width: 460px;
  margin: 0 auto;
  line-height: 1.6;
}
.est-body {
  background: #fff;
  border-radius: 20px;
  border: 1px solid rgba(14,75,72,0.1);
  box-shadow: 0 4px 40px rgba(14,75,72,0.07);
  overflow: hidden;
}
.est-steps {
  display: flex;
  align-items: center;
  padding: 22px 32px;
  border-bottom: 1px solid rgba(14,75,72,0.08);
  gap: 0;
  overflow: hidden;
}
.est-step {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  color: #9aada9;
  font-size: 13px;
  font-weight: 500;
  position: relative;
}
.est-step:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 140px;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 1px;
  background: rgba(14,75,72,0.12);
}
.est-step__dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1.5px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all .2s;
}
.est-step--active { color: #0E4B48; }
.est-step--active .est-step__dot { background: #0E4B48; border-color: #0E4B48; color: #fff; }
.est-step--done { color: #8DC63F; }
.est-step--done .est-step__dot { background: #8DC63F; border-color: #8DC63F; color: #fff; }
.est-step__label { display: none; }
@media (min-width: 480px) { .est-step__label { display: block; } }
.est-panel { padding: 28px; }
@media (min-width: 640px) { .est-panel { padding: 40px; } }
.est-panel__head {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 24px;
}
.est-panel__icon {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: rgba(14,75,72,0.08);
  color: #0E4B48;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.est-panel__icon--green { background: rgba(141,198,63,0.12); color: #5a9a22; }
.est-panel__title { font-size: 18px; font-weight: 700; color: #0D1A0D; margin-bottom: 4px; }
.est-panel__desc { font-size: 14px; color: #4A5E4A; line-height: 1.5; }
.est-search { position: relative; margin-bottom: 24px; }
.est-search__icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9aada9;
  pointer-events: none;
}
.est-search__input {
  width: 100%;
  height: 46px;
  border: 1.5px solid rgba(14,75,72,0.15);
  border-radius: 12px;
  padding: 0 40px 0 42px;
  font-size: 14px;
  font-family: inherit;
  color: #0D1A0D;
  background: #f8fbf8;
  outline: none;
  transition: border-color .15s, box-shadow .15s;
}
.est-search__input::placeholder { color: #9aada9; }
.est-search__input:focus { border-color: #0E4B48; box-shadow: 0 0 0 3px rgba(14,75,72,0.08); background: #fff; }
.est-search__clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #9aada9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  transition: color .15s;
}
.est-search__clear:hover { color: #0E4B48; }
.est-appliances { display: flex; flex-direction: column; gap: 24px; }
.est-category__label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .08em;
  text-transform: uppercase;
  color: #9aada9;
  margin-bottom: 10px;
}
.est-grid { display: grid; grid-template-columns: 1fr; gap: 8px; }
@media (min-width: 520px) { .est-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 760px) { .est-grid { grid-template-columns: repeat(3, 1fr); } }
.est-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 13px 14px;
  border-radius: 12px;
  border: 1.5px solid rgba(14,75,72,0.1);
  background: #fafcfa;
  transition: border-color .15s, background .15s, box-shadow .15s;
  min-width: 0;
  overflow: hidden;
}
.est-card:hover { border-color: rgba(14,75,72,0.2); background: #f3f8f3; }
.est-card--active { border-color: #8DC63F; background: #f4fbea; box-shadow: 0 0 0 1px rgba(141,198,63,.13); }
.est-card__icon { font-size: 18px; width: 28px; min-width: 28px; text-align: center; flex-shrink: 0; }
.est-card__info { flex: 1; min-width: 0; overflow: hidden; }
.est-card__label { font-size: 12.5px; font-weight: 600; color: #0D1A0D; white-space: normal; word-break: break-word; overflow-wrap: anywhere; line-height: 1.3; }
.est-card__watts { font-size: 11px; color: #4A5E4A; margin-top: 2px; white-space: nowrap; }
.est-counter { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
.est-counter__btn {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1.5px solid rgba(14,75,72,0.2);
  background: #fff;
  color: #0E4B48;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all .15s;
}
.est-counter__btn:hover:not(:disabled) { border-color: #0E4B48; background: rgba(14,75,72,0.06); }
.est-counter__btn:disabled { opacity: .35; cursor: not-allowed; }
.est-counter__btn--add { background: #0E4B48; border-color: #0E4B48; color: #fff; }
.est-counter__btn--add:hover:not(:disabled) { background: #155954 !important; border-color: #155954 !important; }
.est-counter__val { font-size: 14px; font-weight: 700; color: #0D1A0D; min-width: 18px; text-align: center; }
.est-add-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  margin-top: 16px;
  border-radius: 12px;
  border: 1.5px dashed rgba(14,75,72,0.2);
  background: none;
  color: #4A5E4A;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: all .15s;
}
.est-add-custom:hover { border-color: #0E4B48; color: #0E4B48; background: rgba(14,75,72,0.03); }
.est-custom-form {
  margin-top: 16px;
  padding: 20px;
  border-radius: 14px;
  background: #f5f9f5;
  border: 1.5px solid rgba(14,75,72,0.12);
}
.est-custom-form__title { font-size: 13px; font-weight: 700; color: #0E4B48; margin-bottom: 14px; }
.est-custom-form__row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 14px; }
.est-custom-form__field { flex: 1; min-width: 140px; }
.est-custom-form__field--sm { max-width: 110px; }
.est-custom-form__label { display: block; font-size: 12px; font-weight: 600; color: #4A5E4A; margin-bottom: 6px; }
.est-custom-form__input {
  width: 100%;
  height: 40px;
  border: 1.5px solid rgba(14,75,72,0.15);
  border-radius: 9px;
  padding: 0 12px;
  font-size: 13px;
  font-family: inherit;
  color: #0D1A0D;
  background: #fff;
  outline: none;
  transition: border-color .15s;
}
.est-custom-form__input:focus { border-color: #0E4B48; }
.est-custom-form__actions { display: flex; gap: 8px; justify-content: flex-end; }
.est-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(14,75,72,0.08);
}
.est-footer__summary { display: flex; flex-direction: column; gap: 2px; }
.est-footer__count { font-size: 13px; color: #4A5E4A; font-weight: 500; }
.est-footer__watts { font-size: 15px; font-weight: 700; color: #0E4B48; }
.est-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 42px;
  padding: 0 20px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  border: 1.5px solid transparent;
  text-decoration: none;
  transition: all .15s;
  white-space: nowrap;
}
.est-btn--lg { height: 48px; padding: 0 28px; font-size: 14px; }
.est-btn--primary { background: #0E4B48; color: #fff; border-color: #0E4B48; }
.est-btn--primary:hover:not(:disabled) { background: #155954; border-color: #155954; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(14,75,72,0.22); }
.est-btn--primary:disabled { opacity: .4; cursor: not-allowed; transform: none; box-shadow: none; }
.est-btn--ghost { background: transparent; color: #4A5E4A; border-color: rgba(14,75,72,0.2); }
.est-btn--ghost:hover { border-color: #0E4B48; color: #0E4B48; background: rgba(14,75,72,0.04); }
.est-profiles { display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 28px; }
@media (min-width: 560px) { .est-profiles { grid-template-columns: repeat(3, 1fr); } }
.est-profile {
  position: relative;
  border: 1.5px solid rgba(14,75,72,0.12);
  border-radius: 16px;
  padding: 18px;
  cursor: pointer;
  transition: all .18s;
  background: #fafcfa;
  display: block;
}
.est-profile:hover { border-color: rgba(14,75,72,0.25); background: #f3f8f3; }
.est-profile--active { border-color: #F7941D; background: #fffbf5; box-shadow: 0 0 0 3px rgba(247,148,29,0.1); }
.est-profile__radio { position: absolute; opacity: 0; pointer-events: none; }
.est-profile__header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.est-profile__name { font-size: 14px; font-weight: 700; color: #0D1A0D; }
.est-profile__badge { font-size: 9px; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; background: #F7941D; color: #fff; padding: 2px 8px; border-radius: 999px; }
.est-profile__desc { font-size: 12px; color: #4A5E4A; line-height: 1.55; margin-bottom: 12px; }
.est-profile__hours { display: flex; flex-wrap: wrap; gap: 6px; }
.est-profile__hours span { font-size: 11px; font-weight: 600; color: #4A5E4A; background: rgba(14,75,72,0.07); padding: 3px 10px; border-radius: 999px; }
.est-results { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 28px; }
@media (max-width: 480px) { .est-results { grid-template-columns: 1fr; } }
.est-result-card { border-radius: 14px; padding: 18px; background: #f5f9f5; border: 1.5px solid rgba(14,75,72,0.08); }
.est-result-card--highlight { background: #0E4B48; border-color: #0E4B48; grid-column: 1 / -1; }
.est-result-card__label { font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #4A5E4A; margin-bottom: 8px; }
.est-result-card--highlight .est-result-card__label { color: rgba(255,255,255,0.65); }
.est-result-card__value { font-size: 32px; font-weight: 800; color: #0E4B48; line-height: 1; margin-bottom: 4px; }
.est-result-card--highlight .est-result-card__value { color: #fff; }
.est-result-card__value span { font-size: 14px; font-weight: 600; opacity: .7; }
.est-result-card__note { font-size: 12px; color: #4A5E4A; }
.est-result-card--highlight .est-result-card__note { color: rgba(255,255,255,0.6); }
.est-breakdown { margin-bottom: 24px; }
.est-breakdown__title { font-size: 12px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: #9aada9; margin-bottom: 12px; }
.est-breakdown__list { display: flex; flex-direction: column; gap: 8px; }
.est-breakdown__item { display: flex; align-items: center; gap: 10px; }
.est-breakdown__icon { font-size: 16px; flex-shrink: 0; }
.est-breakdown__info { flex: 1; }
.est-breakdown__row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
.est-breakdown__name { font-size: 13px; color: #0D1A0D; font-weight: 500; }
.est-breakdown__load { font-size: 13px; font-weight: 700; color: #0E4B48; }
.est-breakdown__bar { height: 4px; border-radius: 999px; background: rgba(14,75,72,0.1); overflow: hidden; }
.est-breakdown__fill { height: 100%; background: linear-gradient(90deg, #8DC63F, #5a9a22); border-radius: 999px; transition: width .5s cubic-bezier(.4,0,.2,1); }
.est-disclaimer { display: flex; align-items: flex-start; gap: 10px; padding: 14px 16px; border-radius: 10px; background: rgba(247,148,29,0.06); border: 1px solid rgba(247,148,29,0.2); margin-bottom: 28px; color: #7a5e20; }
.est-disclaimer p { font-size: 12.5px; line-height: 1.55; }
.est-cta { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 24px; border-radius: 16px; background: linear-gradient(135deg, #071f1e 0%, #0E4B48 100%); margin-bottom: 28px; }
.est-cta__title { font-size: 17px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.est-cta__sub { font-size: 13px; color: rgba(255,255,255,0.65); }
.est-cta__actions { display: flex; gap: 10px; flex-wrap: wrap; }
.est-cta .est-btn--primary { background: #8DC63F; border-color: #8DC63F; color: #0D1A0D; }
.est-cta .est-btn--primary:hover:not(:disabled) { background: #7ab234; border-color: #7ab234; }
.est-cta .est-btn--ghost { color: rgba(255,255,255,0.8); border-color: rgba(255,255,255,0.25); }
.est-cta .est-btn--ghost:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.5); color: #fff; }
.est-empty { font-size: 14px; color: #9aada9; text-align: center; padding: 32px; }
`;
