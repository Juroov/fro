export type Glyph = "aircon" | "fan" | "fridge" | "freezer" | "hob" | "cooker" | "oven" | "fryer" | "pump" | "heater" | "washer" | "tv" | "computer" | "router" | "iron" | "bulb" | "tube" | "custom" | "day" | "balance" | "night";
export interface Appliance { id: string; label: string; watts: number; category: string; glyph: Glyph; search?: string }
export type ProfileKey = "day" | "balance" | "night";

export const APPLIANCES: Appliance[] = [
  { id: "ac1hp", label: "Aircon · 1 HP", watts: 750, category: "Cooling", glyph: "aircon", search: "air conditioning" },
  { id: "ac15hp", label: "Aircon · 1.5 HP", watts: 1100, category: "Cooling", glyph: "aircon", search: "air conditioning" },
  { id: "ac2hp", label: "Aircon · 2 HP", watts: 1500, category: "Cooling", glyph: "aircon" },
  { id: "ac3hp", label: "Aircon · 3 HP", watts: 2200, category: "Cooling", glyph: "aircon" },
  { id: "ac4hp", label: "Aircon · 4 HP", watts: 3000, category: "Cooling", glyph: "aircon" },
  { id: "fan", label: "Electric fan", watts: 60, category: "Cooling", glyph: "fan" },
  { id: "ref", label: "Refrigerator", watts: 150, category: "Kitchen", glyph: "fridge" },
  { id: "chest", label: "Chest freezer", watts: 250, category: "Kitchen", glyph: "freezer" },
  { id: "stove", label: "Induction stove", watts: 2000, category: "Kitchen", glyph: "hob" },
  { id: "rice", label: "Rice cooker", watts: 700, category: "Kitchen", glyph: "cooker" },
  { id: "micro", label: "Microwave / oven", watts: 1200, category: "Kitchen", glyph: "oven" },
  { id: "fryer", label: "Air fryer", watts: 1500, category: "Kitchen", glyph: "fryer" },
  { id: "pump", label: "Water pump · 1 HP", watts: 750, category: "Laundry", glyph: "pump" },
  { id: "heater", label: "Water heater", watts: 3500, category: "Laundry", glyph: "heater" },
  { id: "wash", label: "Washing machine", watts: 500, category: "Laundry", glyph: "washer" },
  { id: "tv", label: "LED television", watts: 100, category: "Work & TV", glyph: "tv", search: "tv" },
  { id: "pc", label: "Computer / laptop", watts: 200, category: "Work & TV", glyph: "computer" },
  { id: "router", label: "Wi-Fi router", watts: 30, category: "Work & TV", glyph: "router", search: "network" },
  { id: "iron", label: "Electric iron", watts: 1000, category: "Laundry", glyph: "iron" },
  { id: "led", label: "LED bulb", watts: 9, category: "Lighting", glyph: "bulb", search: "lights" },
  { id: "cfl", label: "CFL / fluorescent", watts: 15, category: "Lighting", glyph: "tube", search: "lights" },
  { id: "incan", label: "Incandescent bulb", watts: 45, category: "Lighting", glyph: "bulb", search: "lights" },
];

export const PROFILES: { key: ProfileKey; label: string; description: string; dayHours: number; nightHours: number }[] = [
  { key: "day", label: "Mostly daytime", description: "Someone is usually home, with lighter use in the evening.", dayHours: 8, nightHours: 2 },
  { key: "balance", label: "Day and evening", description: "Appliances run through the day and into the evening.", dayHours: 10, nightHours: 4 },
  { key: "night", label: "Mostly evenings", description: "You’re usually out during the day and use more power at night.", dayHours: 2, nightHours: 8 },
];

// Preserve the existing planning model; surface its assumptions in the results UI.
export function estimateSystem(appliances: Appliance[], counts: Record<string, number>, profile: ProfileKey) {
  const usage = PROFILES.find(p => p.key === profile)!;
  const totalWatts = appliances.reduce((sum, a) => sum + a.watts * (counts[a.id] ?? 0), 0);
  const dailyKWh = totalWatts / 1000 * (usage.dayHours + usage.nightHours);
  return { totalWatts, dailyKWh, monthlyKWh: dailyKWh * 30, solarKWp: dailyKWh / 4.5, batteryKWh: totalWatts / 1000 * usage.nightHours * 1.25 };
}

export function formatLoad(watts: number) {
  return watts >= 1000 ? `${(watts / 1000).toFixed(2)} kW` : `${watts.toLocaleString("en-PH")} W`;
}
