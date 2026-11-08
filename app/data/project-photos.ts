import type { ProjectPhoto } from "../components/PhotoGallery";

import photoQuality from "../../content/photo-quality.json";

const versions = new Map(photoQuality.photos.map(item => [item.name, item]));

export const photo = (file: string, alt: string, caption: string): ProjectPhoto => {
  const version = versions.get(file);
  if (!version) throw new Error(`Missing 4K photo: ${file}`);
  return { src: version.src, alt, caption, enhanced: version.enhanced };
};

export const featuredAlbums = [
  { name: "RJL Ricemill", type: "Grid-tied", capacity: "160 kW", description: "A commercial rooftop array paired with a dedicated inverter installation.", photos: [photo("ricemill-rooftop", "Aerial view of the RJL Ricemill roof with solar arrays", "Rooftop array"), photo("ricemill-inverters", "Inverters and electrical equipment installed at RJL Ricemill", "Inverter installation")] },
  { name: "Viacrusis Hospital", type: "Grid-tied", capacity: "100 kW", description: "Solar generation on the hospital roof with an enclosed electrical installation.", photos: [photo("hospital-rooftop", "Solar panels on the Viacrusis Hospital roof", "Hospital rooftop"), photo("hospital-electrical", "Electrical cabinets and inverters at Viacrusis Hospital", "Electrical installation")] },
  { name: "Ultralab", type: "Hybrid", capacity: "32 kW", description: "Rooftop solar and battery storage for a diagnostic facility.", photos: [photo("ultralab-panels", "Installed rooftop solar panels at Ultralab", "Installed array"), photo("ultralab-storage", "Ultralab inverter and battery installation", "Battery storage"), photo("ultralab-installation", "Technicians fitting solar panels on the Ultralab rooftop", "Installation in progress")] },
];

export const projectAlbums = [
  { name: "Ramyan’s Restaurant and Cafe", label: "16 kW · Hybrid", photos: [photo("restaurant-rooftop", "Aerial view of panels being installed at Ramyan’s Restaurant", "Rooftop installation"), photo("restaurant-installation", "Technicians working on electrical equipment outside the restaurant", "Electrical work")] },
  { name: "Residential installation", label: "12 kW · Hybrid", photos: [photo("residential-rooftop", "Technicians lifting a solar panel onto a residential roof", "Rooftop installation"), photo("residential-storage", "Residential hybrid inverters and battery units", "Inverters and storage")] },
  { name: "Bonbon Store", label: "32 kW · Hybrid", photos: [photo("store-rooftop", "Solar array on the Bonbon Store rooftop", "Commercial rooftop"), photo("store-electrical", "Technicians installing electrical equipment at Bonbon Store", "Electrical installation")] },
  { name: "Shyren Bugac Resort", label: "12 kW · Hybrid", photos: [photo("resort-installation", "Technicians mounting an inverter at the resort", "Inverter installation")] },
  { name: "Hybrid installation", label: "15 kW", photos: [photo("hybrid-storage", "Wall-mounted inverters above two battery units", "Hybrid equipment"), photo("hybrid-handover", "Completed hybrid solar and battery installation", "Completed installation")] },
  { name: "Hospital rooftop installation", label: "60 kW", photos: [photo("hospital-60kw-rooftop", "Installer working beside a hospital rooftop solar array", "Rooftop installation"), photo("hospital-60kw-array", "Completed rows of solar panels on a hospital roof", "Installed array")] },
  { name: "Camp Sabros", label: "Hybrid installation", photos: [photo("camp-installation", "Technician connecting a wall-mounted solar inverter at Camp Sabros", "Inverter connections"), photo("camp-electrical", "Electrical installation work at Camp Sabros", "Installation work")] },
  { name: "Malita Elementary School", label: "School installation", photos: [photo("school-installation", "Project photographs showing school rooftop panels and electrical installation", "School project photographs")] },
];

export const fieldPhotos = [
  photo("field-arrays", "Ground-mounted solar arrays photographed during fieldwork", "Ground-mounted arrays"),
  photo("field-engineering", "Engineers checking solar mounting structure connections", "On-site engineering"),
  photo("field-team", "Solar project team wearing hard hats and high-visibility workwear", "The people behind the work"),
  photo("field-structure", "Close view of a bolted solar mounting connection", "Mounting detail"),
  photo("field-inspection", "Project team inspecting a ground-mounted solar installation", "Site inspection"),
  photo("field-connections", "Installer working beneath a ground-mounted solar array", "Work beneath the array"),
];
