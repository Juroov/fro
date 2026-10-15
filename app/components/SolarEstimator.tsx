"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ApplianceGlyph, SolarRoof } from "./estimator/EstimatorArtwork";
import { APPLIANCES, PROFILES, estimateSystem, formatLoad, type Appliance, type ProfileKey } from "./estimator/model";
import s from "./SolarEstimator.module.css";

type Step = 1 | 2 | 3;
const CATEGORIES = ["Everyday", "Cooling", "Kitchen", "Laundry", "Work & TV", "Lighting", "All"];
const EVERYDAY = new Set(["ac1hp", "ac15hp", "fan", "ref", "tv", "led"]);
const STEP_LABELS = ["Appliances", "Daily use", "Your estimate"];

function Quantity({ appliance, value, change }: { appliance: Appliance; value: number; change: (delta: number) => void }) {
  return <div className={s.quantity} role="group" aria-label={`${appliance.label} quantity`}>
    <button type="button" disabled={value === 0} onClick={() => change(-1)} aria-label={`Remove one ${appliance.label}`}><span aria-hidden="true">−</span></button>
    <output aria-label={`${appliance.label} count`}>{value}</output>
    <button type="button" disabled={value >= 99} onClick={() => change(1)} aria-label={`Add one ${appliance.label}`}><span aria-hidden="true">+</span></button>
  </div>;
}

export default function SolarEstimator() {
  const [step, setStep] = useState<Step>(1);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [custom, setCustom] = useState<Appliance[]>([]);
  const [category, setCategory] = useState("Everyday");
  const [search, setSearch] = useState("");
  const [profile, setProfile] = useState<ProfileKey>("balance");
  const [showCustom, setShowCustom] = useState(false);
  const [customLabel, setCustomLabel] = useState("");
  const [customWatts, setCustomWatts] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const customButtonRef = useRef<HTMLButtonElement>(null);
  const previousStep = useRef<Step>(1);

  const appliances = [...APPLIANCES, ...custom];
  const selected = appliances.filter(a => (counts[a.id] ?? 0) > 0);
  const units = selected.reduce((sum, a) => sum + counts[a.id], 0);
  const result = estimateSystem(appliances, counts, profile);
  const profileData = PROFILES.find(p => p.key === profile)!;
  const query = search.trim().toLowerCase();
  const filtered = appliances.filter(a => query
    ? `${a.label} ${a.category} ${a.search ?? ""}`.toLowerCase().includes(query)
    : category === "All" || (category === "Everyday" ? EVERYDAY.has(a.id) : a.category === category));
  const emailBody = [
    "Hello FRO Solar, I would like to discuss a solar system for my property.",
    "", "My preliminary estimator results:",
    ...selected.map(a => `${a.label} × ${counts[a.id]} (${a.watts} W each)`),
    "", `Usage: ${profileData.label} (${profileData.dayHours}h daytime / ${profileData.nightHours}h nighttime)`,
    `Connected load: ${formatLoad(result.totalWatts)}`,
    `Solar capacity: ${result.solarKWp.toFixed(2)} kWp`,
    `Battery capacity: ${result.batteryKWh.toFixed(2)} kWh`,
    "", "These are planning estimates. Please help me confirm the right system and arrange a site assessment.",
  ].join("\n");

  useEffect(() => {
    if (previousStep.current !== step) {
      previousStep.current = step;
      headingRef.current?.focus({ preventScroll: true });
      headingRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    }
  }, [step]);

  useEffect(() => {
    if (showCustom) nameRef.current?.focus();
  }, [showCustom]);

  function changeCount(id: string, delta: number) {
    setCounts(prev => ({ ...prev, [id]: Math.min(99, Math.max(0, (prev[id] ?? 0) + delta)) }));
    setNotice("");
  }

  function closeCustom() {
    setShowCustom(false); setCustomLabel(""); setCustomWatts(""); setError("");
    requestAnimationFrame(() => customButtonRef.current?.focus());
  }

  function addCustom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const watts = Number(customWatts);
    if (!customLabel.trim() || !Number.isFinite(watts) || !Number.isInteger(watts) || watts < 1 || watts > 100000) {
      setError("Enter an appliance name and a whole-number wattage from 1 to 100,000 W.");
      return;
    }
    const appliance: Appliance = { id: `custom-${crypto.randomUUID()}`, label: customLabel.trim(), watts, category: "Custom", glyph: "custom" };
    setCustom(prev => [...prev, appliance]);
    setCounts(prev => ({ ...prev, [appliance.id]: 1 }));
    setCategory("Custom"); setSearch("");
    setNotice(`${appliance.label} added to your selection.`);
    closeCustom();
  }

  function reset() {
    setCounts({}); setCustom([]); setProfile("balance"); setSearch(""); setCategory("Everyday");
    setShowCustom(false); setCustomLabel(""); setCustomWatts(""); setError(""); setNotice(""); setStep(1);
  }

  return <div className={s.root} id="solar-estimator">
    <header className={s.intro}>
      <h2>What would solar look<br className={s.headingBreak} /> like for your home?</h2>
      <p>Start with the appliances you use. Build a rough system estimate, then work through the details with our team.</p>
    </header>

    <div className={s.worksheet}>
      <nav aria-label="Estimator steps" className={s.steps}>
        <ol>{STEP_LABELS.map((label, i) => <li key={label}>
          <button type="button" aria-current={step === i + 1 ? "step" : undefined} disabled={i > 0 && units === 0} onClick={() => setStep((i + 1) as Step)}>
            <span className={s.stepNumber}>{String(i + 1).padStart(2, "0")}</span><span>{label}</span>
          </button>
        </li>)}</ol>
        <span className={s.stepHint}>No signup needed</span>
      </nav>

      <div className={s.workspace}>
        <div className={s.main}>
          <div className={s.panelHeading}>
            <h3 ref={headingRef} tabIndex={-1}>{step === 1 ? "What do you plug in?" : step === 2 ? "When is your home busiest?" : "A starting point for your system."}</h3>
            <p>{step === 1 ? "Add the appliances you want to power, and how many of each." : step === 2 ? "Choose the pattern closest to your routine. This helps estimate energy use and battery storage." : "A planning estimate based on your appliances and daily routine."}</p>
          </div>

          {step === 1 && <>
            <label className={s.searchLabel} htmlFor="est-search">Find an appliance</label>
            <div className={s.search}>
              <input id="est-search" type="search" placeholder="Try aircon, refrigerator, or lights" value={search} onChange={e => setSearch(e.target.value)} />
              {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear appliance search">×</button>}
            </div>
            <div className={s.categories} role="group" aria-label="Appliance categories">
              {[...CATEGORIES, ...(custom.length ? ["Custom"] : [])].map(cat => <button type="button" key={cat} aria-pressed={!query && category === cat} onClick={() => { setCategory(cat); setSearch(""); }}>{cat}</button>)}
            </div>
            <div className={s.listCaption}><span>{query ? `Results for “${search.trim()}”` : category === "Everyday" ? "A few household essentials" : `${category} appliances`}</span><span>Quantity</span></div>
            <ul className={s.appliances} aria-label="Appliances">
              {filtered.map(a => <li key={a.id} className={counts[a.id] > 0 ? s.selectedRow : undefined}>
                <span className={s.applianceGlyph}><ApplianceGlyph kind={a.glyph} /></span>
                <div className={s.applianceName}><strong>{a.label}</strong><span>{a.watts.toLocaleString("en-PH")} W each{a.category === "Custom" ? " / custom" : ""}</span></div>
                <Quantity appliance={a} value={counts[a.id] ?? 0} change={delta => changeCount(a.id, delta)} />
              </li>)}
            </ul>
            {filtered.length === 0 && <div className={s.emptySearch}><strong>No matching appliances</strong><p>Try another name, or add your appliance and its rated wattage below.</p></div>}
            <p className={s.listNote}>Wattages are typical values. Use a custom appliance to enter the rating on your own unit.</p>
            <button ref={customButtonRef} type="button" className={s.customTrigger} aria-expanded={showCustom} aria-controls="est-custom-form" onClick={() => showCustom ? closeCustom() : setShowCustom(true)}><span aria-hidden="true">{showCustom ? "−" : "+"}</span> Add your own appliance</button>
            {showCustom && <form id="est-custom-form" className={s.customForm} onSubmit={addCustom} noValidate>
              <div className={s.customFields}>
                <label htmlFor="est-custom-name">Appliance name<input ref={nameRef} id="est-custom-name" maxLength={60} value={customLabel} placeholder="e.g. Aquarium pump" onChange={e => { setCustomLabel(e.target.value); setError(""); }} aria-describedby={error ? "est-custom-error" : undefined} aria-invalid={!!error} /></label>
                <label htmlFor="est-custom-watts">Rated watts<input id="est-custom-watts" type="number" inputMode="numeric" min={1} max={100000} step={1} value={customWatts} placeholder="e.g. 45" onChange={e => { setCustomWatts(e.target.value); setError(""); }} aria-describedby={error ? "est-custom-error" : undefined} aria-invalid={!!error} /></label>
              </div>
              {error && <p className={s.error} id="est-custom-error" role="alert">{error}</p>}
              <div className={s.customActions}><button type="button" className={s.textButton} onClick={closeCustom}>Cancel</button><button type="submit" className={s.primary}>Add to my appliances</button></div>
            </form>}
            <p className={s.srOnly} role="status">{notice}</p>
          </>}

          {step === 2 && <>
            <fieldset className={s.profiles}>
              <legend className={s.srOnly}>Daily electricity use</legend>
              {PROFILES.map(p => <label key={p.key} className={`${s.profile} ${profile === p.key ? s.activeProfile : ""}`}>
                <input type="radio" name="est-usage" value={p.key} checked={profile === p.key} onChange={() => setProfile(p.key)} />
                <div className={s.profileCopy}><strong>{p.label}</strong><span>{p.description}</span><small>{p.dayHours}h daytime <span aria-hidden="true">/</span> {p.nightHours}h nighttime</small></div>
                <span className={s.routineGlyph}><ApplianceGlyph kind={p.key} /></span>
              </label>)}
            </fieldset>
            <div className={s.routine}>
              <div className={s.routineTitle}><strong>Your assumed daily use</strong><span>{profileData.dayHours + profileData.nightHours} hours</span></div>
              <div className={s.timeBar} aria-hidden="true"><span style={{ flex: profileData.dayHours }} /><span style={{ flex: profileData.nightHours }} /><span style={{ flex: 24 - profileData.dayHours - profileData.nightHours }} /></div>
              <p>The same hours are applied to every selected appliance. Actual use varies, especially for cooling and refrigeration.</p>
            </div>
          </>}

          {step === 3 && <>
            <div className={s.solarResult}>
              <div><span className={s.resultLabel}>Estimated solar capacity</span><p className={s.resultValue}>{result.solarKWp.toFixed(2)}<span>kWp</span></p><p>Panel capacity to discuss with your installer.</p></div>
              <SolarRoof />
            </div>
            <dl className={s.resultMetrics}>
              <div><dt>Daily energy use</dt><dd>{result.dailyKWh.toFixed(2)} <span>kWh</span></dd></div>
              <div><dt>Monthly energy use</dt><dd>{result.monthlyKWh.toFixed(1)} <span>kWh</span></dd></div>
              <div><dt>Estimated battery capacity<small>For {profileData.nightHours} hours of nighttime use</small></dt><dd>{result.batteryKWh.toFixed(2)} <span>kWh</span></dd></div>
            </dl>
            <details className={s.assumptions}>
              <summary>How this estimate is calculated</summary>
              <p>Connected load × {profileData.dayHours + profileData.nightHours} hours gives daily energy use. Monthly use assumes 30 days. Solar capacity divides daily energy by an assumed 4.5 peak sun hours. Battery capacity uses {profileData.nightHours} nighttime hours plus a 25% allowance.</p>
              <p>This simplified model assumes every appliance runs at its listed wattage for the same hours. It does not model duty cycles, starting surges, roof shading, or system losses. A site assessment is needed to confirm equipment sizes.</p>
            </details>
            <div className={s.resultContact}><h4>Let’s check it against your home.</h4><p>Share your appliance list and estimate with FRO Solar to discuss a site assessment.</p><a className={s.primary} href={`mailto:frosolar.energysolutions@gmail.com?subject=${encodeURIComponent("My solar system estimate")}&body=${encodeURIComponent(emailBody)}`}>Email my estimate <span aria-hidden="true">↗</span></a><a className={s.callLink} href="tel:+639063665473">Or call 0906 366 5473</a></div>
          </>}
        </div>

        <aside className={s.summary} aria-label="Your appliance summary">
          <div className={s.summaryHeading}><h4>Your appliance load</h4><span>{units} {units === 1 ? "unit" : "units"}</span></div>
          <div className={s.loadReading} role="status" aria-live="polite" aria-atomic="true"><strong>{result.totalWatts >= 1000 ? (result.totalWatts / 1000).toFixed(2) : result.totalWatts}</strong><span>{result.totalWatts >= 1000 ? "kW" : "W"}</span><p>{units ? "If everything runs at once" : "Add an appliance to begin"}</p></div>
          {units === 0 ? <div className={s.emptySummary}><SolarRoof /><p>A little detail now.<br />A clearer solar plan next.</p><span>Your selected appliances will appear here as you add them.</span></div> : <>
            <ul className={s.selection}>{selected.map(a => <li key={a.id}><span>{a.label}<small> × {counts[a.id]}</small></span><strong>{formatLoad(a.watts * counts[a.id])}</strong></li>)}</ul>
            {step > 1 && <button type="button" className={s.textButton} onClick={() => setStep(1)}>Edit appliances</button>}
            {step === 3 && <div className={s.summaryRoutine}><span>Daily routine</span><strong>{profileData.label}</strong><button type="button" className={s.textButton} onClick={() => setStep(2)}>Change routine</button></div>}
          </>}
          <p className={s.summaryNote}>A useful first estimate. Your roof, actual usage, and backup needs shape the final system.</p>
        </aside>
      </div>

      <footer className={s.footer}>
        {step === 1 ? <p>{units ? `${units} ${units === 1 ? "appliance" : "appliances"} added. Next, tell us when you use them.` : "Choose at least one appliance to continue."}</p> : <button type="button" className={s.textButton} onClick={() => setStep(step === 3 ? 2 : 1)}><span aria-hidden="true">←</span> {step === 3 ? "Adjust daily use" : "Back to appliances"}</button>}
        {step < 3 ? <button type="button" className={s.primary} disabled={!units} onClick={() => setStep((step + 1) as Step)}>{step === 1 ? "Set daily use" : "See my estimate"}<span aria-hidden="true">→</span></button> : <button type="button" className={s.textButton} onClick={reset}>Start a new estimate</button>}
      </footer>
    </div>
  </div>;
}
