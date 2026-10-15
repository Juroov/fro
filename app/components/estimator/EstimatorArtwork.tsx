import type { ReactNode } from "react";
import type { Glyph } from "./model";

// A compact family of appliance drawings, created for the FRO estimator.
// The vent, control-panel, and foot details share a 40px drawing grid.
const drawings: Record<Glyph, ReactNode> = {
  aircon: <><rect x="4" y="8" width="32" height="16" rx="3" /><path d="M5 18h30M9 21h22M12 28v4m8-4v6m8-6v4" /><path d="M28 12h3" stroke="var(--green-600)" /></>,
  fan: <><circle cx="20" cy="16" r="12" /><circle cx="20" cy="16" r="2" /><path d="M20 14c-9-9 5-12 3-2m-1 5c12-2 8 11 0 6m-4-6c-4 11-13 1-5-3M18 28v6m4-6v6M12 35h16" /></>,
  fridge: <><rect x="10" y="3" width="20" height="33" rx="3" /><path d="M10 15h20M14 8v3m0 9v6M14 36v2m12-2v2" /><path d="M23 8h3" stroke="var(--green-600)" /></>,
  freezer: <><rect x="5" y="12" width="30" height="22" rx="2" /><path d="M5 17h30M8 34v3m24-3v3M16 21h8M8 9h24" /><path d="M29 28h2" stroke="var(--green-600)" /></>,
  hob: <><rect x="6" y="5" width="28" height="30" rx="3" /><circle cx="15" cy="14" r="4" /><circle cx="26" cy="24" r="5" /><path d="M12 29h4m10-18h3" stroke="var(--green-600)" /></>,
  cooker: <><path d="M8 15h24v15a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4ZM6 15h28M11 11h18l3 4M17 11V8h6v3M4 20h4m24 0h4M12 34v3m16-3v3" /><rect x="16" y="23" width="8" height="6" rx="1" fill="var(--green-300)" /><path d="M18 4v1m5-2v2" /></>,
  oven: <><rect x="3" y="10" width="34" height="24" rx="3" /><rect x="7" y="14" width="21" height="15" rx="1" /><path d="M31 15h2m-2 5h2m-2 6h2M7 34v3m26-3v3M11 25h13" /><path d="M9 6h22" stroke="var(--green-600)" /></>,
  fryer: <><path d="M10 11a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v21a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3ZM10 18h20" /><rect x="17" y="21" width="6" height="9" rx="2" /><path d="M17 11h6" stroke="var(--green-600)" /></>,
  pump: <><rect x="12" y="14" width="20" height="17" rx="3" /><path d="M12 20H6V9h7M32 20h4v-8M16 18v9m5-9v9m5-9v9M9 34h26M16 31v3m12-3v3" /><path d="M18 10h8" stroke="var(--green-600)" /></>,
  heater: <><rect x="11" y="4" width="19" height="25" rx="4" /><circle cx="20.5" cy="20" r="3" /><path d="M16 29v8m9-8v4h9V19M32 19h4M16 10h9" /><path d="M18 13h5" stroke="var(--green-600)" /></>,
  washer: <><rect x="7" y="4" width="26" height="32" rx="3" /><path d="M7 12h26M11 8h6" /><circle cx="20" cy="24" r="8" /><path d="M14 26q6 4 12-2" stroke="var(--green-600)" /><circle cx="27" cy="8" r="1" /></>,
  tv: <><rect x="3" y="6" width="34" height="24" rx="2" /><path d="M7 26h26M13 30l-3 5m17-5 3 5M9 12l5-3" /><path d="M20 26h3" stroke="var(--green-600)" /></>,
  computer: <><path d="M8 28V8a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v20M4 28h32l2 6H2Z" /><path d="M12 10h16v14H12ZM16 31h8" /><path d="m16 17 3 3 5-6" stroke="var(--green-600)" /></>,
  router: <><rect x="6" y="24" width="28" height="10" rx="3" /><path d="M9 24V11m22 13V11M12 18q8-7 16 0M16 21q4-4 8 0" /><path d="M11 29h2m4 0h2m4 0h2" stroke="var(--green-600)" /></>,
  iron: <><path d="M4 30q7-13 14-13h11l7 15H4ZM16 17l-2-7h10a5 5 0 0 1 5 5v2M24 10V6h8M7 35h28" /><path d="M12 26h2m4 0h2m4 0h2" stroke="var(--green-600)" /></>,
  bulb: <><path d="M14 26c0-4-5-6-5-12a11 11 0 0 1 22 0c0 6-5 8-5 12ZM14 30h12m-11 4h10m-7 3h4M20 26v-9m-4-3 4 3 4-3" /><path d="M15 9q3-3 6-2" stroke="var(--green-600)" /></>,
  tube: <><path d="M14 27V7a3 3 0 0 1 6 0v20m0-20a3 3 0 0 1 6 0v20M12 27h16v6H12Zm5 10h6" /><path d="M17 9v13m6-13v13" stroke="var(--green-600)" /></>,
  custom: <><rect x="6" y="6" width="28" height="28" rx="3" /><path d="M13 13h14v9H13ZM13 27h3m5 0h6M11 34v3m18-3v3" /><path d="M20 16v3m-2-1.5h4" stroke="var(--green-600)" /></>,
  day: <><path d="M4 29h32M9 25a11 11 0 0 1 22 0M20 5v5M6 12l4 4m24-4-4 4M5 34h30" /><path d="M15 24a5 5 0 0 1 10 0" stroke="var(--green-600)" /></>,
  balance: <><path d="M20 4v32M15 10a11 11 0 0 0 0 21M5 6l3 4M2 20h4M5 35l3-4M26 9a11 11 0 0 1 0 22 15 15 0 0 0 0-22Z" /><path d="M32 7h3m-1.5-1.5v3" stroke="var(--green-600)" /></>,
  night: <><path d="M26 5a15 15 0 1 0 9 24A15 15 0 0 1 26 5Z" /><path d="M30 11v6m-3-3h6M18 8h2" stroke="var(--green-600)" /></>,
};

export function ApplianceGlyph({ kind }: { kind: Glyph }) {
  return <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{drawings[kind]}</svg>;
}

export function SolarRoof() {
  return <svg viewBox="0 0 220 150" width="220" height="150" fill="none" aria-hidden="true" focusable="false">
    <g stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round">
      <path d="m24 85 65-40 106 24-65 42Z" fill="currentColor" fillOpacity=".035" />
      <path d="m24 85 3 7 103 25 65-41v-7M43 96v25l86 22 49-31V86M129 117v26" />
      <path d="m60 77 37-23 70 16-37 24Z" fill="var(--green-500)" fillOpacity=".22" />
      <path d="m60 77 37-23 70 16-37 24ZM72 69l70 17M84 62l70 16M83 82l37-23m-14 28 37-23" />
      <path d="m57 105 17 4v21m-17-25v21m91-15 15-9v14l-15 9Z" />
      <circle cx="172" cy="26" r="12" stroke="var(--green-600)" />
      <path d="M172 5V1m0 50v-4m21-21h5m-51 0h5m35-15 4-4m-38 38 4-4m30 0 4 4m-38-38 4 4" stroke="var(--green-600)" />
      <path d="M15 111h13m-7 7h13m148 18h20" opacity=".35" />
    </g>
  </svg>;
}
